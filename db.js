const JDRDB = (() => {
  const DB_NAME = "JDRCampaignDB";
  const DB_VERSION = 2;
  let db = null;
  let backendMode = "indexeddb";
  let fallbackState = null;
  const FALLBACK_STORAGE_KEY = "JDRCampaignDB_Fallback_V2";

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

  function loadFallbackState() {
    if (fallbackState) return fallbackState;

    if (canUseLocalStorage()) {
      try {
        const raw = localStorage.getItem(FALLBACK_STORAGE_KEY);
        fallbackState = raw ? JSON.parse(raw) : emptyFallbackState();
        backendMode = "localstorage";
      } catch {
        fallbackState = emptyFallbackState();
        backendMode = "memory";
      }
    } else {
      fallbackState = emptyFallbackState();
      backendMode = "memory";
    }

    for (const storeName of Object.keys(stores)) {
      if (!fallbackState[storeName] || typeof fallbackState[storeName] !== "object") {
        fallbackState[storeName] = {};
      }
    }

    return fallbackState;
  }

  function saveFallbackState() {
    if (!fallbackState || backendMode !== "localstorage") return;
    try {
      localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(fallbackState));
    } catch (err) {
      // If localStorage becomes unavailable or reaches quota, keep the current
      // session alive in memory instead of crashing the application.
      backendMode = "memory";
      console.warn("Assistant JDR: bascule du stockage local vers la mémoire.", err);
    }
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
    const state = loadFallbackState();
    if (!state[storeName]) state[storeName] = {};

    const keyPath = fallbackKeyPath(storeName);
    const key = value?.[keyPath];
    if (key === undefined || key === null || key === "") {
      return Promise.reject(new Error(`Clé manquante pour ${storeName}.${keyPath}`));
    }

    if (failIfExists && Object.prototype.hasOwnProperty.call(state[storeName], key)) {
      return Promise.reject(new Error(`La clé ${key} existe déjà dans ${storeName}.`));
    }

    state[storeName][key] = cloneValue(value);
    saveFallbackState();
    return Promise.resolve(cloneValue(value));
  }

  function fallbackGet(storeName, key) {
    const state = loadFallbackState();
    const value = state[storeName]?.[key];
    return Promise.resolve(value === undefined ? null : cloneValue(value));
  }

  function fallbackGetAll(storeName) {
    const state = loadFallbackState();
    return Promise.resolve(
      Object.values(state[storeName] || {}).map(cloneValue)
    );
  }

  function fallbackGetAllByIndex(storeName, indexName, value) {
    const state = loadFallbackState();
    const rows = Object.values(state[storeName] || {}).filter(row => row?.[indexName] === value);
    return Promise.resolve(rows.map(cloneValue));
  }

  function fallbackRemove(storeName, key) {
    const state = loadFallbackState();
    if (state[storeName]) delete state[storeName][key];
    saveFallbackState();
    return Promise.resolve(true);
  }

  function fallbackCount(storeName) {
    const state = loadFallbackState();
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

  async function seedDemoData() {
    const campaignCount = await count("campaigns");
    if (campaignCount > 0) return false;

    const campaignId = "campaign_l5r_demo";
    const locationId = "location_shiro_kitsuki";
    const sessionId = "session_12";
    const sceneId = "scene_breakfast";

    await put("campaigns", {
      id: campaignId,
      name: "Le Tournoi d’Otosan Uchi",
      gameSystem: "L5R",
      edition: "1E",
      universe: "Rokugan",
      description: "Campagne de démonstration du prototype.",
      status: "active",
      currentGameDate: "16 Lièvre",
      currentGameTime: "08:30",
      currentLocationId: locationId,
      currentSessionId: sessionId,
      currentSceneId: sceneId,
      currentGameTheme: "l5r",
      createdAt: nowIso(),
      updatedAt: nowIso()
    });

    const locationRows = [
      ["location_rokugan", "Rokugan", "world", null],
      ["location_dragon", "Territoires du Clan du Dragon", "region", "location_rokugan"],
      [locationId, "Shiro Kitsuki", "castle", "location_dragon"],
      ["location_dojo", "Dojo", "room", locationId],
      ["location_library", "Bibliothèque", "room", locationId],
      ["location_courtyard", "Cour principale", "area", locationId],
      ["location_road_otosan", "Route vers Otosan Uchi", "road", "location_dragon"]
    ];

    for (const [id, name, type, parentLocationId] of locationRows) {
      await put("locations", {
        id, campaignId, name, type, parentLocationId,
        description: "",
        canonicalStatus: "CANON",
        deleted: false,
        createdAt: nowIso(),
        updatedAt: nowIso()
      });
    }

    const chars = [
      ["character_ren", "PC", "Mirumoto Ren", "Bushi Mirumoto", 5, "MR"],
      ["character_tadamori", "NPC", "Agasha Tadamori", "Shugenja", 3, "AT"],
      ["character_sayuri", "NPC", "Kitsuki Sayuri", "Clan du Dragon", 3, "KS"],
      ["character_tatsukaki", "NPC", "Kitsuki Tatsukaki", "Fils du daimyō", 4, "KT"]
    ];

    for (const [id, type, name, profession, importance, initials] of chars) {
      await put("characters", {
        id, campaignId, type, name, alias: "",
        portrait: null,
        gender: null, age: null, species: "Humain",
        profession, rank: null,
        description: "",
        status: "active",
        importance,
        factionIds: [],
        currentLocationId: locationId,
        playerName: type === "PC" ? "Joueur" : null,
        characteristics: {},
        skills: {},
        biography: "",
        motivations: "",
        objectives: "",
        initials,
        canonicalStatus: "CANON",
        deleted: false,
        createdAt: nowIso(),
        updatedAt: nowIso()
      });
    }

    await put("sessions", {
      id: sessionId,
      campaignId,
      number: 12,
      title: "Préparatifs du départ",
      realDate: new Date().toISOString().slice(0,10),
      gameDateStart: "16 Lièvre",
      gameDateEnd: null,
      realStartTime: null,
      realEndTime: null,
      characterIds: chars.map(c => c[0]),
      summary: "",
      status: "active",
      createdAt: nowIso(),
      updatedAt: nowIso()
    });

    await put("scenes", {
      id: sceneId,
      campaignId,
      scenarioId: null,
      sessionId,
      title: "Petit déjeuner",
      description: "Discussion sur le voyage vers Otosan Uchi.",
      locationId,
      gameDate: "16 Lièvre",
      startTime: "08:10",
      endTime: null,
      characterIds: chars.map(c => c[0]),
      status: "active",
      gmObjective: "",
      createdAt: nowIso(),
      updatedAt: nowIso()
    });

    const demoEvents = [
      ["08:10", "Ren rejoint Tadamori", "Shiro Kitsuki · Salle commune"],
      ["08:17", "Sayuri rejoint la discussion", "Séance 12 · Scène 4"],
      ["08:23", "Le voyage vers la capitale est évoqué", "Intrigue : Tournoi impérial"],
      ["08:30", "Discussion sur les montures", "Canon · en cours"]
    ];

    for (const [time, title, description] of demoEvents) {
      await put("events", {
        id: uuid("event"),
        campaignId,
        sessionId,
        sceneId,
        title,
        description,
        gameDate: "16 Lièvre",
        gameTime: time,
        realTimestamp: nowIso(),
        locationId,
        characterIds: chars.map(c => c[0]),
        factionIds: [],
        plotIds: [],
        eventType: "narrative",
        importance: 2,
        visibility: "GM_ONLY",
        canonicalStatus: "CANON",
        deleted: false,
        createdAt: nowIso()
      });
    }

    const plotRows = [
      ["plot_tournament", "Tournoi impérial", "Préparer le départ vers Otosan Uchi", 5],
      ["plot_visits", "Visites mystérieuses", "Quelqu’un entre régulièrement dans la chambre de Ren", 4],
      ["plot_birthday", "Invitation de Tatsukaki", "Anniversaire dans trois jours", 2]
    ];

    for (const [id, title, description, priority] of plotRows) {
      await put("plots", {
        id, campaignId, title, description,
        status: "active", priority,
        characterIds: [], factionIds: [], locationIds: [],
        clueIds: [], eventIds: [],
        startDate: null, endDate: null,
        canonicalStatus: "CANON",
        deleted: false
      });
    }

    await setSetting("activeCampaignId", campaignId);
    return true;
  }


  async function ensureDemoScenes(campaignId = "campaign_l5r_demo") {
    if (campaignId !== "campaign_l5r_demo") return;

    const sessionId = "session_12";
    const rows = [
      {
        id: "scene_breakfast",
        campaignId,
        scenarioId: null,
        sessionId,
        title: "Petit déjeuner",
        description: "Discussion sur le voyage vers Otosan Uchi.",
        locationId: "location_shiro_kitsuki",
        gameDate: "16 Lièvre",
        startTime: "08:10",
        endTime: null,
        characterIds: ["character_ren","character_tadamori","character_sayuri","character_tatsukaki"],
        status: "active",
        gmObjective: "",
        createdAt: nowIso(),
        updatedAt: nowIso()
      },
      {
        id: "scene_departure_prep",
        campaignId,
        scenarioId: null,
        sessionId,
        title: "Préparatifs du départ",
        description: "Choix des montures et préparation des affaires.",
        locationId: "location_courtyard",
        gameDate: "16 Lièvre",
        startTime: "09:00",
        endTime: null,
        characterIds: ["character_ren","character_tadamori","character_sayuri"],
        status: "planned",
        gmObjective: "",
        createdAt: nowIso(),
        updatedAt: nowIso()
      },
      {
        id: "scene_library",
        campaignId,
        scenarioId: null,
        sessionId,
        title: "Dernière consultation à la bibliothèque",
        description: "Vérification de l’itinéraire vers Otosan Uchi.",
        locationId: "location_library",
        gameDate: "16 Lièvre",
        startTime: "10:00",
        endTime: null,
        characterIds: ["character_ren","character_tadamori"],
        status: "planned",
        gmObjective: "",
        createdAt: nowIso(),
        updatedAt: nowIso()
      },
      {
        id: "scene_road",
        campaignId,
        scenarioId: null,
        sessionId,
        title: "Départ vers Otosan Uchi",
        description: "Le groupe quitte Shiro Kitsuki.",
        locationId: "location_road_otosan",
        gameDate: "17 Lièvre",
        startTime: "06:00",
        endTime: null,
        characterIds: ["character_ren","character_tadamori","character_sayuri"],
        status: "planned",
        gmObjective: "",
        createdAt: nowIso(),
        updatedAt: nowIso()
      }
    ];

    for (const row of rows) {
      const existing = await get("scenes", row.id);
      if (!existing) await put("scenes", row);
    }
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
    remove,
    count,
    setSetting,
    getSetting,
    history,
    seedDemoData,
    ensureDemoScenes
  };
})();