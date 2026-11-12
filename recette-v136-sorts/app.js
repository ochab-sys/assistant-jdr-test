"use strict";
// Interface fictive NOUVELLE de recette; les deux fonctions de métier sont dans core-v136.js.
// Rien ne dépend d'un serveur distant ou d'une campagne utilisateur.
const DB_NAME = "JDRRecetteV136Sorts", STORE = "characters", ID = "v136-test-pj", VERSION = 1;
const SCHEMA = "JDR_V136_SPELLS_SYNTHETIC_ONLY", HISTORICAL = "Essence de la Terre";
const $ = id => document.getElementById(id);
let dbHandle, record=null;
function log(message,error=false) {
 const d=document.createElement("div");d.className=error?"error":"";d.textContent=new Date().toLocaleTimeString("fr-FR")+" — "+message;
 $("log").prepend(d);if(error) console.error("JDR-V136-RECETTE: "+message);
}
function openDb() {
 if(dbHandle) return Promise.resolve(dbHandle);
 return new Promise((resolve,reject)=>{
  const req=indexedDB.open(DB_NAME,VERSION);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE,{keyPath:"id"})};
  req.onsuccess=()=>{dbHandle=req.result;dbHandle.onversionchange=()=>{dbHandle.close();dbHandle=null};resolve(dbHandle)};
  req.onerror=()=>reject(req.error);
 });
}
async function read(id=ID) {
 const db=await openDb();return new Promise((resolve,reject)=>{
  const tr=db.transaction(STORE,"readonly"), req=tr.objectStore(STORE).get(id);
  req.onsuccess=()=>resolve(req.result||null); req.onerror=()=>reject(req.error);tr.onerror=()=>reject(tr.error);
 });
}
async function write(value) {
 const db=await openDb();return new Promise((resolve,reject)=>{
  const tr=db.transaction(STORE,"readwrite");tr.objectStore(STORE).put(value);
  tr.oncomplete=()=>resolve(); tr.onerror=()=>reject(tr.error); tr.onabort=()=>reject(tr.error||new Error("Transaction annulée"));
 });
}
function seedRecord() {return {id:ID,testOnly:true,profession:"test_shugenja",name:"PJ FICTIF V136",note:"Note inventée",spells:["Sensation","TEST_SORT_CATALOGUE",HISTORICAL],revision:1}}
function validateData(value) {
 if(!value||typeof value!=="object"||Array.isArray(value)||value.id!==ID||value.testOnly!==true||value.profession!=="test_shugenja")throw Error("Archive non issue du banc V136.");
 if(typeof value.name!=="string"||value.name.length>80||typeof value.note!=="string"||value.note.length>120) throw Error("Données de fiche incompatibles.");
 if(!Array.isArray(value.spells)||value.spells.length>10||value.spells.some(s=>typeof s!=="string"||!["Sensation","TEST_SORT_CATALOGUE",HISTORICAL].includes(s))||new Set(value.spells).size!==value.spells.length)throw Error("Liste de sorts non autorisée.");
 if(!Number.isSafeInteger(value.revision)||value.revision<1)throw Error("Révision invalide.");
 return value;
}
function render() {
 $("summary").textContent=record?`${record.name} · révision ${record.revision} · ${record.spells.length} sorts · ${DB_NAME}`:"Aucune fiche fictive enregistrée.";
 $("charName").value=record?.name||"";$("charNote").value=record?.note||"";
 $("spellList").replaceChildren();$("preview").textContent=record?JSON.stringify(record,null,2):"—";
 $("warning").textContent="";
 if(!record)return;
 const all=V136Core.l5rSpellOptions([],record.profession,1,record.spells,"creation");
 for(const [name,label] of all) {
  const tag=document.createElement("label"),cb=document.createElement("input"),span=document.createElement("span");
  cb.type="checkbox";cb.value=name;cb.checked=record.spells.includes(name);span.textContent=label;tag.append(cb,span);$("spellList").append(tag);
 }
 const status=V136Core.l5rSpellSelectionStatus(record.profession,record.spells);
 $("warning").textContent=status.ok?"Statut (démonstration) : conforme.":status.text;
}
async function reread(){record=await read();render();log("Fiche relue depuis IndexedDB.")}
async function seed(){const value=seedRecord();validateData(value);await write(value);record=await read();render();log("Données entièrement fictives initialisées.")}
async function save(){if(!record)throw Error("Créer d'abord le PJ fictif.");
 const selected=[...$("spellList").querySelectorAll('input[type="checkbox"]:checked')].map(x=>x.value);
 const next=validateData({...record,name:$("charName").value,note:$("charNote").value,spells:selected,revision:record.revision+1});
 await write(next);record=await read();render();log("Fiche enregistrée et relue depuis IndexedDB.")}
async function exportJson(){if(!record)throw Error("Initialiser les données fictives.");
 const payload={schema:SCHEMA,version:"0.20.136-test",exportedAt:new Date().toISOString(),character:record};
 const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));
 const a=document.createElement("a");a.href=url;a.download="jdr_v136_sorts_fictifs.json";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);
 log("Export JSON demandé. Vérifier le fichier téléchargé dans le navigateur.")}
async function importJson(file){if(!file||file.size>200000)throw Error("Fichier absent ou supérieur à 200 Ko.");
 let payload;try{payload=JSON.parse(await file.text())}catch{throw Error("Fichier JSON illisible ou malformé : import annulé.")}
 if(payload?.schema!==SCHEMA||payload?.version!=="0.20.136-test"||!payload.character)throw Error("Archive incompatible avec la recette V136.");
 const next=validateData(payload.character);if(!confirm("Restaurer la fiche fictive du banc de test V136 ?"))return;
 await write(next);record=await read();render();log("Import JSON fictif restauré dans IndexedDB.")}
async function tests(){const outcomes=[];
 async function ck(label,fn){try{if(!(await fn()))throw Error("assertion fausse");outcomes.push([true,label])}catch(e){outcomes.push([false,label+" — "+e.message])}}
 await ck("IndexedDB natif actif",async()=>!!indexedDB && (await openDb()).objectStoreNames.contains(STORE));
 await ck("Fiche fictive présente dans IndexedDB",async()=>!!(await read())?.testOnly);
 await ck("Sort hors catalogue présent dans la fiche",async()=>!!(await read())?.spells.includes(HISTORICAL));
 await ck("V136-01 : option historique visible",()=>V136Core.l5rSpellOptions([],"test_shugenja",1,[HISTORICAL],"creation").some(([name])=>name===HISTORICAL));
 await ck("V136-01 : mention validation MJ",()=>V136Core.l5rSpellOptions([],"test_shugenja",1,[HISTORICAL],"creation").some(([n,l])=>n===HISTORICAL&&l.includes("conservé dans la fiche")&&l.includes("validation MJ")));
 await ck("V136-01 : sort absent non proposé spontanément",()=>!V136Core.l5rSpellOptions([],"test_shugenja",1,[],"creation").some(([name])=>name===HISTORICAL));
 await ck("V136-01 : avertissement de sélection non validée",()=>{const s=V136Core.l5rSpellSelectionStatus("test_shugenja",["Sensation","TEST_SORT_CATALOGUE",HISTORICAL]);return !s.ok&&s.text.includes(HISTORICAL)&&s.text.includes("non comptabilisés")});
 await ck("Aucun effet mécanique pour le sort absent",()=>{const options=V136Core.l5rSpellOptions([],"test_shugenja",1,[HISTORICAL],"creation");return options.some(([n])=>n===HISTORICAL)&&!options.some(([n,l])=>n===HISTORICAL&&/\bND\s*\d+|dégâts\s*\d+/i.test(l))});
 await ck("Retrait explicite non réintroduit",()=>!V136Core.l5rSpellOptions([],"test_shugenja",1,["Sensation"],"creation").some(([n])=>n===HISTORICAL));
 const ok=outcomes.filter(x=>x[0]).length;$("testResults").textContent=`${ok}/${outcomes.length} contrôles réussis\n`+outcomes.map(([pass,label])=>(pass?"✅ ":"❌ ")+label).join("\n");
 log("Diagnostics : "+ok+"/"+outcomes.length+(ok===outcomes.length?" réussis.":" — échec(s), voir détail."),ok!==outcomes.length)
}
function wrap(fn){return async(...args)=>{try{await fn(...args)}catch(e){log(e.message||String(e),true)}}}
window.addEventListener("DOMContentLoaded",()=>{
 $("seed").addEventListener("click",wrap(seed));$("reload").addEventListener("click",()=>location.reload());$("refresh").addEventListener("click",wrap(reread));
 $("save").addEventListener("click",wrap(save));$("export").addEventListener("click",wrap(exportJson));$("diagnose").addEventListener("click",wrap(tests));
 $("secondTab").addEventListener("click",()=>window.open(location.href,"_blank","noopener"));
 $("importFile").addEventListener("change",wrap(async()=>{const file=$("importFile").files[0];await importJson(file);$("importFile").value=""}));
 wrap(async()=>{await openDb();$("storage").textContent="IndexedDB actif";record=await read();render();log("Banc V136 initialisé avec base isolée.")})()
});