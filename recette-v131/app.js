"use strict";
/* V0.20.131-P0: playground synthetic only, isolation via unique DB name in db.js. */
const prefix = "v131-";
const fixed = {
  ca: "v131-campagne-rokugan",
  cb: "v131-campagne-spatial",
  pa: "v131-personnage-akiko",
  pb: "v131-personnage-lia",
  note: "v131-note-essai"
};
let logHost, preview;
function byId(id){return document.getElementById(id)}
function log(message, good=true){
  const line=document.createElement("div");
  line.className="log-line "+(good?"ok":"fail");
  line.textContent=(good?"✓ ":"✕ ")+new Date().toLocaleTimeString("fr-FR")+" — "+message;
  logHost.prepend(line);
}
async function openStorage(){
  await JDRDB.open();
  const backend=JDRDB.backendMode;
  const label=byId("backend");
  label.textContent="Stockage : "+backend;
  label.className="tag "+(backend==="indexeddb"?"good":"bad");
  if(backend!=="indexeddb")log("Attention : IndexedDB absent, secours "+backend+". Les tests IndexedDB sont non validés.",false);
  return backend;
}
const fixtures = [
  {store:"campaigns",value:{id:fixed.ca,name:"Le tournoi du palais (fictif)",system:"l5r",edition:"1e",scenario:"Exercice de recette",testOnly:true}},
  {store:"campaigns",value:{id:fixed.cb,name:"Station Aube (fictif)",system:"ward",edition:"test",scenario:"Exercice de recette",testOnly:true}},
  {store:"characters",value:{id:fixed.pa,campaignId:fixed.ca,name:"Akiko (personnage fictif)",type:"pj",publicDescription:"Une messagère du Dragon",testOnly:true}},
  {store:"characters",value:{id:fixed.pb,campaignId:fixed.cb,name:"Lia (personnage fictif)",type:"pnj",publicDescription:"Technicienne de laboratoire",testOnly:true}},
  {store:"notes",value:{id:fixed.note,campaignId:fixed.ca,text:"Note MJ fictive — uniquement pour test de stockage",revision:0,testOnly:true}}
];
function assertTestRow(row){
  if(!row || typeof row!=="object" || !Object.hasOwn(row,"id") || typeof row.id!=="string" || !row.id.startsWith(prefix) || !row.testOnly)throw new Error("Entrée étrangère à la recette V131.");
}
async function init(){
  await openStorage();
  const writes=[];
  for(const w of fixtures){
    const existing=await JDRDB.get(w.store,w.value.id);
    if(!existing)writes.push(w);
  }
  if(writes.length)await JDRDB.atomicPutRowsV106(writes);
  log(`Données fictives initialisées (${writes.length} nouvelles entrées).`);
  await render();
}
async function modify(){
  const note=await JDRDB.get("notes",fixed.note);
  if(!note)throw new Error("Initialiser les données fictives avant ce test.");
  assertTestRow(note);
  note.revision=(Number(note.revision)||0)+1;
  note.text=`Note MJ fictive — révision ${note.revision} (${new Date().toLocaleTimeString("fr-FR")})`;
  await JDRDB.put("notes",note);
  const stored=await JDRDB.get("notes",fixed.note);
  if(stored.revision!==note.revision)throw new Error("Révision non sauvegardée.");
  log("Modification enregistrée : révision "+note.revision);
  await render();
}
async function onlySynthetic(store){
  const rows=await JDRDB.getAll(store);
  return rows.filter(r=>typeof r?.id==="string" && r.id.startsWith(prefix) && r.testOnly===true);
}
async function snapshot(){
  return {campaigns:await onlySynthetic("campaigns"),characters:await onlySynthetic("characters"),notes:await onlySynthetic("notes")};
}
async function render(){
  const rows=await snapshot();
  preview.textContent=JSON.stringify(rows,null,2);
  const nr=rows.notes.find(r=>r.id===fixed.note)?.revision;
  byId("summary").textContent=`${rows.campaigns.length} campagnes, ${rows.characters.length} personnages, ${rows.notes.length} notes · révision ${nr ?? "absente"}`;
  const player=byId("playerData"); player.replaceChildren();
  // Explicit public field allowlist. WARNING: not a security boundary.
  for(const row of rows.characters){
    const p=document.createElement("p");
    p.textContent=row.name+" — "+(row.publicDescription||"");
    player.append(p);
  }
  if(!rows.characters.length){const p=document.createElement("p");p.textContent="Créer les données fictives depuis la vue MJ.";player.append(p)}
}
async function exportJson(){
  const rows=await snapshot();
  const payload={schema:"JDR_V131_BROWSER_TEST_ONLY",version:"0.20.131",exportedAt:new Date().toISOString(),rows};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download="jdr_v131_recette_fictive.json";document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),15000);
  log("Export JSON fictif créé. Vérifier son téléchargement.");
}
async function importJson(file){
  if(!file || file.size>500_000)throw new Error("Import absent ou fichier trop volumineux (> 500 Ko).");
  const raw=JSON.parse(await file.text());
  if(raw?.schema!=="JDR_V131_BROWSER_TEST_ONLY" || raw?.version!=="0.20.131")throw new Error("Archive non issue de cette recette V131.");
  const writes=[];
  const allowed=["campaigns","characters","notes"];
  if(!raw.rows||typeof raw.rows!=="object"||Object.keys(raw.rows).some(x=>!allowed.includes(x)))throw new Error("Structure JSON non conforme.");
  for(const store of allowed){
    if(!Array.isArray(raw.rows[store])||raw.rows[store].length>30)throw new Error("Magasin invalide : "+store);
    for(const value of raw.rows[store]){assertTestRow(value);writes.push({store,value})}
  }
  if(!writes.length)throw new Error("Archive vide.");
  if(!confirm(`Restaurer ${writes.length} entrées de test dans la base isolée ?`))return;
  await JDRDB.atomicPutRowsV106(writes);
  log(`Import atomique : ${writes.length} entrées restaurées.`);
  await render();
}
async function runTests(){
  const results=[];
  async function check(label,fn){
    try{await fn();results.push([label,true]);log("Test : "+label)}catch(e){results.push([label,false]);log("Test : "+label+" — "+e.message,false)}
  }
  await check("Stockage natif IndexedDB",async()=>{
    if((await openStorage())!=="indexeddb")throw new Error("Secours actif ; pas une validation IndexedDB");
  });
  await check("Écriture / lecture réelle",async()=>{
    const key="v131-test-rw";await JDRDB.put("notes",{id:key,campaignId:fixed.ca,testOnly:true,text:"essai",revision:1});
    const a=await JDRDB.get("notes",key);
    if(a?.text!=="essai")throw new Error("Lecture incorrecte");
    await JDRDB.remove("notes",key);
  });
  await check("Transactions groupées",async()=>{
    const a={id:"v131-test-batch-a",campaignId:fixed.ca,text:"Lot A",testOnly:true};
    const b={id:"v131-test-batch-b",campaignId:fixed.cb,text:"Lot B",testOnly:true};
    await JDRDB.atomicPutRowsV106([{store:"notes",value:a},{store:"notes",value:b}]);
    if((await JDRDB.get("notes",a.id))?.text!==a.text || (await JDRDB.get("notes",b.id))?.text!==b.text)throw new Error("Lot incomplet");
    await JDRDB.remove("notes",a.id);await JDRDB.remove("notes",b.id);
  });
  await check("Filtre par campagne",async()=>{
    await init();
    const [a,b]=await Promise.all([JDRDB.getAllByIndex("characters","campaignId",fixed.ca),JDRDB.getAllByIndex("characters","campaignId",fixed.cb)]);
    if(!a.some(x=>x.id===fixed.pa)||a.some(x=>x.id===fixed.pb)||!b.some(x=>x.id===fixed.pb)||b.some(x=>x.id===fixed.pa))throw new Error("Mélange entre les campagnes");
  });
  await check("Export fictif sérialisable",async()=>{
    const rows=await snapshot();
    const copy=JSON.parse(JSON.stringify(rows));
    if(copy.campaigns.length!==2||copy.characters.length!==2||copy.notes.length!==1)throw new Error("Données manquantes");
  });
  byId("tests").textContent=`${results.filter(r=>r[1]).length}/${results.length} contrôles réussis (navigateur réel). Persistance après rechargement, JSON téléchargé et second onglet : à vérifier séparément.`;
  byId("tests").className=results.every(x=>x[1])?"ok":"fail";
  await render();
}
function handle(fn){return async()=>{try{await fn()}catch(e){log(e?.message||String(e),false)}}}
window.addEventListener("DOMContentLoaded",()=>{
  logHost=byId("log");preview=byId("preview");
  byId("init").addEventListener("click",handle(init));
  byId("modify").addEventListener("click",handle(modify));
  byId("reload").addEventListener("click",()=>location.reload());
  byId("export").addEventListener("click",handle(exportJson));
  byId("import").addEventListener("change",handle(async()=>{const file=byId("import").files[0];await importJson(file);byId("import").value=""}));
  byId("test").addEventListener("click",handle(runTests));
  byId("secondTab").addEventListener("click",()=>window.open(location.href,"_blank","noopener"));
  byId("modePlayer").addEventListener("click",()=>{document.body.classList.add("player-mode");byId("mode").textContent="Mode joueur (démo)";history.replaceState(null,"","?vue=joueur")});
  byId("modeMJ").addEventListener("click",()=>{document.body.classList.remove("player-mode");byId("mode").textContent="Mode MJ (fictif)";history.replaceState(null,"",location.pathname)});
  if(new URLSearchParams(location.search).get("vue")==="joueur"){document.body.classList.add("player-mode");byId("mode").textContent="Mode joueur (démo)"}
  handle(async()=>{await openStorage();await render();log("Application de recette chargée. Base dédiée : "+JDRDB.DB_NAME)})();
});