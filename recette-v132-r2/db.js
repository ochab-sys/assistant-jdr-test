
const JDRDB = (() => {
  const DB_NAME = "JDRRecetteV132";
  const DB_VERSION = 2;
  let db = null;
  let backendMode = "indexeddb";
  let fallbackState = null;
  const FALLBACK_STORAGE_KEY = "JDRRecetteV132_Fallback";
  const FALLBACK_LOCK_NAME = "JDRRecetteV132_Fallback_write";

  const stores = {
    campaigns: { keyPath: "id" },
    characters: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["type", "type", { unique: false }],
      ["name", "name", { unique: false }],
      ["currentLocationId", "currentLocationId", { unique: false }]
    ]},
    locations: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["parentLocationId", "parentLocationId", { unique: false }],
      ["name", "name", { unique: false }]
    ]},
    factions: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["name", "name", { unique: false }]
    ]},
    relations: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["sourceId", "sourceId", { unique: false }],
      ["targetId", "targetId", { unique: false }]
    ]},
    plots: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["status", "status", { unique: false }]
    ]},
    scenarios: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }]
    ]},
    scenes: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["sessionId", "sessionId", { unique: false }],
      ["status", "status", { unique: false }]
    ]},
    sessions: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["number", "number", { unique: false }]
    ]},
    events: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["sessionId", "sessionId", { unique: false }],
      ["sceneId", "sceneId", { unique: false }],
      ["gameDate", "gameDate", { unique: false }],
      ["locationId", "locationId", { unique: false }]
    ]},
    notes: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["sessionId", "sessionId", { unique: false }],
      ["processed", "processed", { unique: false }]
    ]},
    informations: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }]
    ]},
    items: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["ownerCharacterId", "ownerCharacterId", { unique: false }],
      ["locationId", "locationId", { unique: false }]
    ]},
    documents: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }]
    ]},
    rules: { keyPath: "id", indexes: [
      ["system", "system", { unique: false }],
      ["edition", "edition", { unique: false }]
    ]},
    settings: { keyPath: "key" },
    history: { keyPath: "id", indexes: [
      ["campaignId", "campaignId", { unique: false }],
      ["entityType", "entityType", { unique: false }],
      ["timestamp", "timestamp", { unique: false }]
    ]}
  };


  function cloneValue(value) {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value));
  }

  function emptyFallbackState() {
    const state = {};
    for (const storeName of Object.keys(stores)) state[storeName] = {};
    return state;
  }

  function canUseLocalStorage() {
    try {
      const key = "__jdr_storage_test__";
      localStorage.setItem(key, "1");
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  function normalizeFallbackState(state) {
    if (!state || typeof state !== "object" || Array.isArray(state)) {
      throw new Error("Sauvegarde de secours invalide : export manuel requis.");
    }
    for (const storeName of Object.keys(stores)) {
      if (!state[storeName] || typeof state[storeName] !== "object" || Array.isArray(state[storeName])) {
        state[storeName] = {};
      }
    }
    return state;
  }

  function loadFallbackState(forceRefresh = false) {
    if (fallbackState && !forceRefresh) return fallbackState;
    if (backendMode === "memory" && fallbackState) return fallbackState;
    // Même si le quota est plein, lire d'abord une éventuelle sauvegarde existante.
    if (backendMode === "localstorage" || backendMode === "indexeddb") {
      if (typeof localStorage !== "undefined") {
        let raw;
        try { raw = localStorage.getItem(FALLBACK_STORAGE_KEY); }
        catch (error) {
          // Un accès refusé ne prouve pas qu'aucune sauvegarde n'existe.
          throw new Error("Stockage local illisible : ouverture bloquée pour éviter toute perte de données.", { cause: error });
        }
        if (raw !== null || backendMode === "localstorage" || canUseLocalStorage()) {
          try {
            fallbackState = normalizeFallbackState(raw ? JSON.parse(raw) : emptyFallbackState());
            backendMode = "localstorage";
            return fallbackState;
          } catch (error) {
            throw new Error("Impossible de lire le stockage de secours sans risque de perte de données.", { cause: error });
          }
        }
      }
    }
    if (!fallbackState) fallbackState = emptyFallbackState();
    backendMode = "memory";
    return fallbackState;
  }

  async function withFallbackWrite(mutator) {
    const perform = () => {
      const base = loadFallbackState(backendMode === "localstorage");
      const next = cloneValue(base);
      const result = mutator(next);
      if (backendMode === "localstorage") {
        // Écriture d'abord ; l'état visible n'est modifié qu'après succès durable.
        localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(next));
      }
      fallbackState = next;
      return result;
    };
    if (typeof navigator !== "undefined" && navigator.locks?.request) {
      return navigator.locks.request(FALLBACK_LOCK_NAME, { mode: "exclusive" }, perform);
    }
    // Sans Web Locks : relecture systématique, mais pas de garantie absolue inter-onglets.
    return perform();
  }

  function activateFallback(reason = null) {
    db = null;
    const state = loadFallbackState();
    if (reason) {
      console.warn(`Assistant JDR: IndexedDB indisponible, stockage ${backendMode} utilisé.`, reason);
    }
    return Promise.resolve({ backend: backendMode, fallback: true, state });
  }

  function fallbackKeyPath(storeName) {
    return stores[storeName]?.keyPath || "id";
  }

  function fallbackPut(storeName, value, failIfExists = false) {
    return withFallbackWrite(state => {
      const keyPath = fallbackKeyPath(storeName);
      const key = value?.[keyPath];
      if (key === undefined || key === null || key === "") {
        throw new Error(`Clé manquante pour ${storeName}.${keyPath}`);
      }
      if (failIfExists && Object.prototype.hasOwnProperty.call(state[storeName], key)) {
        throw new Error(`La clé ${key} existe déjà dans ${storeName}.`);
      }
      state[storeName][key] = cloneValue(value);
      return cloneValue(value);
    });
  }

  function fallbackGet(storeName, key) {
    const state = loadFallbackState(true);
    const value = state[storeName]?.[key];
    return Promise.resolve(value === undefined ? null : cloneValue(value));
  }

  function fallbackGetAll(storeName) {
    const state = loadFallbackState(true);
    return Promise.resolve(Object.values(state[storeName] || {}).map(cloneValue));
  }

  function fallbackGetAllByIndex(storeName, indexName, value) {
    const state = loadFallbackState(true);
    const rows = Object.values(state[storeName] || {}).filter(row => row?.[indexName] === value);
    return Promise.resolve(rows.map(cloneValue));
  }

  function fallbackRemove(storeName, key) {
    return withFallbackWrite(state => {
      delete state[storeName][key];
      return true;
    });
  }

  function fallbackCount(storeName) {
    const state = loadFallbackState(true);
    return Promise.resolve(Object.keys(state[storeName] || {}).length);
  }

  function uuid(prefix = "id") {
    if (crypto?.randomUUID) return `${prefix}_${crypto.randomUUID()}`;
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function open() {
    if (backendMode !== "indexeddb") {
      return activateFallback();
    }
    if (db) return Promise.resolve(db);

    if (typeof indexedDB === "undefined") {
      return activateFallback(new Error("IndexedDB non disponible."));
    }

    return new Promise((resolve) => {
      let request;
      try {
        request = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (err) {
        activateFallback(err).then(resolve);
        return;
      }

      let settled = false;
      const fallback = (reason) => {
        if (settled) return;
        settled = true;
        activateFallback(reason).then(resolve);
      };

      request.onupgradeneeded = (event) => {
        try {
          const upgradeDb = event.target.result;

          for (const [storeName, config] of Object.entries(stores)) {
            let store;
            if (!upgradeDb.objectStoreNames.contains(storeName)) {
              store = upgradeDb.createObjectStore(storeName, { keyPath: config.keyPath });
            } else {
              store = event.target.transaction.objectStore(storeName);
            }

            for (const idx of (config.indexes || [])) {
              const [indexName, keyPath, options] = idx;
              if (!store.indexNames.contains(indexName)) {
                store.createIndex(indexName, keyPath, options);
              }
            }
          }
        } catch (err) {
          console.warn("Assistant JDR: erreur de migration IndexedDB.", err);
        }
      };

      request.onsuccess = () => {
        if (settled) {
          try { request.result?.close(); } catch {}
          return;
        }
        settled = true;
        db = request.result;
        backendMode = "indexeddb";
        db.onversionchange = () => {
          db.close();
          db = null;
        };
        resolve(db);
      };

      request.onerror = () => fallback(request.error || new Error("Erreur IndexedDB."));
      request.onblocked = () => fallback(new Error("IndexedDB bloquée par le navigateur."));
    });
  }

  async function tx(storeName, mode = "readonly") {
    await open();
    if (backendMode !== "indexeddb") return null;
    return db.transaction(storeName, mode).objectStore(storeName);
  }

  async function put(storeName, value) {
    await open();
    if (backendMode !== "indexeddb") return fallbackPut(storeName, value, false);

    const store = db.transaction(storeName, "readwrite").objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.put(value);
      request.onsuccess = () => resolve(value);
      request.onerror = () => reject(request.error);
    });
  }

  async function add(storeName, value) {
    await open();
    if (backendMode !== "indexeddb") return fallbackPut(storeName, value, true);

    const store = db.transaction(storeName, "readwrite").objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.add(value);
      request.onsuccess = () => resolve(value);
      request.onerror = () => reject(request.error);
    });
  }

  async function get(storeName, key) {
    await open();
    if (backendMode !== "indexeddb") return fallbackGet(storeName, key);

    const store = db.transaction(storeName, "readonly").objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  }

  async function getAll(storeName) {
    await open();
    if (backendMode !== "indexeddb") return fallbackGetAll(storeName);

    const store = db.transaction(storeName, "readonly").objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async function getAllByIndex(storeName, indexName, value) {
    await open();
    if (backendMode !== "indexeddb") return fallbackGetAllByIndex(storeName, indexName, value);

    const store = db.transaction(storeName, "readonly").objectStore(storeName);
    return new Promise((resolve, reject) => {
      const index = store.index(indexName);
      const request = index.getAll(IDBKeyRange.only(value));
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async function remove(storeName, key) {
    await open();
    if (backendMode !== "indexeddb") return fallbackRemove(storeName, key);

    const store = db.transaction(storeName, "readwrite").objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async function count(storeName) {
    await open();
    if (backendMode !== "indexeddb") return fallbackCount(storeName);

    const store = db.transaction(storeName, "readonly").objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.count();
      request.onsuccess = () => resolve(request.result || 0);
      request.onerror = () => reject(request.error);
    });
  }

  async function setSetting(key, value) {
    return put("settings", { key, value, updatedAt: nowIso() });
  }

  async function getSetting(key, fallback = null) {
    const row = await get("settings", key);
    return row ? row.value : fallback;
  }

  async function history(campaignId, entityType, entityId, action, previousValue, newValue, source = "USER") {
    return put("history", {
      id: uuid("history"),
      campaignId,
      entityType,
      entityId,
      action,
      previousValue,
      newValue,
      source,
      timestamp: nowIso()
    });
  }

  /* Données de démonstration locales retirées de la recette web publique. */

  /* V0.20.106 - import groupé, atomique sur IndexedDB et fallback. */
  async function atomicPutRowsV106(writes) {
    await open();
    if (!Array.isArray(writes) || !writes.length) throw new Error('Import vide.');
    const names = [...new Set(writes.map(w => w.store))];
    for (const w of writes) {
      if (!w || !stores[w.store]) throw new Error('Magasin inconnu durant l’import.');
      const k=stores[w.store].keyPath;
      if (!w.value || typeof w.value !== 'object' || w.value[k] === undefined || w.value[k] === null || w.value[k] === '') throw new Error('Clé invalide durant l’import.');
    }
    if(backendMode !== 'indexeddb') {
      return withFallbackWrite(next => {
        for(const w of writes) next[w.store][w.value[stores[w.store].keyPath]]=cloneValue(w.value);
        return writes.length;
      });
    }
    return new Promise((resolve,reject)=>{
      let txn;
      try {
        txn=db.transaction(names,'readwrite');
        txn.oncomplete=()=>resolve(writes.length);
        txn.onerror=()=>reject(txn.error||new Error('Échec de transaction.'));
        txn.onabort=()=>reject(txn.error||new Error('Transaction annulée.'));
        for(const w of writes) txn.objectStore(w.store).put(w.value);
      }catch(error){
        try{txn?.abort();}catch(e){}
        reject(error);
      }
    });
  }

  return {
    DB_NAME,
    DB_VERSION,
    get backendMode() { return backendMode; },
    get storagePersistent() { return backendMode !== "memory"; },
    uuid,
    nowIso,
    open,
    put,
    add,
    get,
    getAll,
    getAllByIndex,
    atomicPutRowsV106,
    remove,
    count,
    setSetting,
    getSetting,
    history,
    /* aucun seed privé */
  };
})();