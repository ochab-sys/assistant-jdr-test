"use strict";
/* Only synthetic test records. No external requests, personal data or rules catalog. */
(() => {
  const core=window.JDRTattooCoreV137;
  if(!core)throw new Error("Fonctions V137 introuvables.");
  const byId=id=>document.getElementById(id);
  const DB_NAME="JDRRecetteV137Tatouages", STORE="characters", KEY="v137-test-personnage";
  const DIAGNOSTIC_KEY="v137-diagnostic-temporary";
  const SCHEMA="JDR_V137_TATTOOS_PUBLIC_TEST_ONLY",VERSION="0.20.137";
  const TATTOO_TEST="Tatouage TEST ancien hors catalogue";
  const BASE_OPTIONS=[["Araignée","Araignée (exemple)"],["Fleur de cerisier / Sakura","Fleur de cerisier / Sakura"],["Maranta","Maranta (exemple)"]];
  const ALLOWED=new Set(["Araignée","Fleur de cerisier / Sakura","Fleur de cerisier","Maranta",TATTOO_TEST]);
  let db=null,active=null;
  function log(message,bad=false){
    const d=document.createElement("div");d.className=bad?"bad":"";
    d.textContent=new Date().toLocaleTimeString("fr-FR")+" · "+message;
    byId("log").prepend(d);
    if(bad)console.error("JDR-V137-TEST: "+message);
  }
  function failUnless(condition,message){if(!condition)throw new Error(message)}
  function run(fn){return async()=>{try{await fn()}catch(e){log(e?.message||String(e),true)}}}
  function openDB(){
    if(db)return Promise.resolve(db);
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open(DB_NAME,1);
      req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE,{keyPath:"id"})};
      req.onsuccess=()=>{db=req.result;db.onversionchange=()=>{db.close();db=null};resolve(db)};
      req.onerror=()=>reject(req.error||new Error("IndexedDB indisponible."));
      req.onblocked=()=>reject(new Error("IndexedDB bloqué par un autre onglet."));
    });
  }
  async function operation(mode,kind,obj){
    const d=await openDB();
    return new Promise((resolve,reject)=>{
      const tx=d.transaction([STORE],mode),os=tx.objectStore(STORE);
      const req=kind==="get"?os.get(obj):kind==="put"?os.put(obj):os.delete(obj);
      let result;
      req.onsuccess=()=>{result=req.result};
      tx.oncomplete=()=>resolve(result);
      tx.onerror=()=>reject(tx.error||new Error("Transaction refusée."));
      tx.onabort=()=>reject(tx.error||new Error("Transaction annulée."));
    });
  }
  const get=id=>operation("readonly","get",id);
  const put=row=>operation("readwrite","put",row);
  const del=id=>operation("readwrite","delete",id);
  const simpleOptions=tattoos=>core.l5rTattooOptionsPreservingHistoryV137(BASE_OPTIONS,tattoos);
  function makeSeed(scenario){
    const variants={
      legacy:{profession:"togashi_monk",tattoos:["Fleur de cerisier",TATTOO_TEST,"Maranta"]},
      canonical:{profession:"togashi_monk",tattoos:["Fleur de cerisier / Sakura","Maranta"]},
      both:{profession:"togashi_monk",tattoos:["Fleur de cerisier","Fleur de cerisier / Sakura","Maranta"]},
      outside:{profession:"mirumoto_bushi",tattoos:["Fleur de cerisier",TATTOO_TEST]},
      empty:{profession:"togashi_monk",tattoos:[]}
    };
    const pick=variants[scenario]||variants.legacy;
    return {id:KEY,testOnly:true,characterName:"TEST Moine des montagnes",note:"TEST données inventées",profession:pick.profession,l5rTattoos:pick.tattoos,revision:1};
  }
  function validateRow(row){
    failUnless(row&&typeof row==="object"&&!Array.isArray(row)&&row.id===KEY&&row.testOnly===true,"Fiche incompatible avec la recette V137.");
    failUnless(Object.keys(row).every(k=>["id","testOnly","characterName","note","profession","l5rTattoos","revision"].includes(k)),"Champs inattendus dans la fiche fictive.");
    failUnless(typeof row.characterName==="string"&&row.characterName.startsWith("TEST ")&&row.characterName.length<=90,"Utiliser uniquement un nom fictif commençant par TEST.");
    failUnless(typeof row.note==="string"&&row.note.length<=160,"Note fictive invalide.");
    failUnless(["togashi_monk","mirumoto_bushi"].includes(row.profession),"École de test non reconnue.");
    failUnless(Array.isArray(row.l5rTattoos)&&row.l5rTattoos.length<=5&&row.l5rTattoos.every(t=>ALLOWED.has(t))&&new Set(row.l5rTattoos).size===row.l5rTattoos.length,"Valeurs de tatouages hors données fictives autorisées.");
    failUnless(Number.isInteger(row.revision)&&row.revision>=1&&row.revision<=100000,"Révision invalide.");
    return {...row,l5rTattoos:[...row.l5rTattoos]};
  }
  function readSelected(){return Array.from(byId("tattooOptions").querySelectorAll('input[type="checkbox"]:checked'),e=>e.value)}
  function showWarning(){
    if(!active)return;
    const profession=byId("profession").value,tattoos=readSelected();
    const historical=tattoos.filter(x=>!BASE_OPTIONS.some(p=>p[0]===x));
    const messages=[];
    if(historical.length)messages.push("Valeurs historiques conservées dans la fiche ; validation MJ requise.");
    if(profession!=="togashi_monk"&&tattoos.length)messages.push("Tatouages conservés hors voie Togashi : aucun droit mécanique accordé automatiquement.");
    if(tattoos.includes("Fleur de cerisier")&&tattoos.includes("Fleur de cerisier / Sakura"))messages.push("Deux graphies déjà enregistrées : aucune suppression automatique.");
    byId("warning").textContent=messages.join(" ")||"Aucune valeur historique hors catalogue sélectionnée.";
    byId("access").textContent="Accès mécanique de démonstration : "+(core.l5rTattooAccessV02022({profession})?"école Togashi reconnue":"non accordé (aucune capacité ajoutée)");
  }
  function render(row){
    active=row||null;
    const fields=["name","note","profession","tattooOptions","warning","access"];
    if(!row){fields.forEach(id=>{const e=byId(id);if(id==="tattooOptions"||id==="warning"||id==="access")e.replaceChildren();else e.value=""});byId("summary").textContent="Aucune fiche fictive initialisée.";byId("preview").textContent="—";return}
    byId("name").value=row.characterName;byId("note").value=row.note;byId("profession").value=row.profession;
    byId("tattooOptions").replaceChildren();
    const selected=new Set(core.l5rOccupationValues(row.l5rTattoos));
    const options=simpleOptions(row.l5rTattoos);
    for(const [value,label] of options){
      const cell=document.createElement("label");cell.className="check";
      const input=document.createElement("input");input.type="checkbox";input.value=value;input.checked=selected.has(value);input.addEventListener("change",showWarning);
      const text=document.createElement("span");text.textContent=label;
      if(label.includes("validation MJ")){text.className="detail"}
      cell.append(input,text);byId("tattooOptions").append(cell);
    }
    byId("summary").textContent=`Fiche fictive · révision ${row.revision} · ${row.l5rTattoos.length} tatouage(s) enregistrés`;
    byId("preview").textContent=JSON.stringify(row,null,2);
    showWarning();
  }
  async function refresh(){render(await get(KEY));}
  async function seed(){const row=makeSeed(byId("scenario").value);await put(row);await refresh();log("Fiche fictive initialisée à la révision 1.")}
  async function save(){
    failUnless(active,"Initialiser d'abord une fiche fictive.");
    const latest=await get(KEY);
    failUnless(latest&&latest.revision===active.revision,"Fiche modifiée dans un autre onglet : recharger avant d'enregistrer.");
    const row=validateRow({...latest,characterName:byId("name").value.trim(),note:byId("note").value,profession:byId("profession").value,l5rTattoos:readSelected(),revision:latest.revision+1});
    await put(row);await refresh();log("Fiche et tatouages fictifs sauvegardés.");
  }
  async function exportJSON(){
    const row=await get(KEY);failUnless(row,"Aucune fiche fictive à exporter.");
    const json={schema:SCHEMA,version:VERSION,exportedAt:new Date().toISOString(),row};
    const url=URL.createObjectURL(new Blob([JSON.stringify(json,null,2)],{type:"application/json"}));
    const a=document.createElement("a");a.href=url;a.download="jdr_v137_tatouages_test_fictif.json";document.body.append(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),15000);log("Export JSON fictif déclenché : contrôler le téléchargement réel.");
  }
  function parseArchive(text){
    let json;try{json=JSON.parse(text)}catch{throw new Error("Fichier JSON illisible ou malformé : import annulé.")}
    failUnless(json?.schema===SCHEMA&&json?.version===VERSION,"Archive incompatible avec la recette V137.");
    return validateRow(json.row);
  }
  async function importJSON(file){
    failUnless(file&&file.size>0&&file.size<=100000,"Fichier absent ou trop volumineux (100 Ko maximum).");
    const row=parseArchive(await file.text());
    if(!confirm("Restaurer uniquement cette fiche fictive V137 ?"))return;
    await put(row);await refresh();log("Fiche fictive restaurée en une transaction IndexedDB.");
  }
  async function diagnostics(){
    const rows=[];
    async function check(name,fn){try{await fn();rows.push({name,ok:true})}catch(e){rows.push({name,ok:false,error:e.message})}}
    const vals=options=>options.map(v=>v[0]);
    await check("1. IndexedDB natif isolé",async()=>{const d=await openDB();failUnless(d.name===DB_NAME,"Base incorrecte")});
    await check("2. Écriture, lecture et suppression IndexedDB",async()=>{
      const temp={id:DIAGNOSTIC_KEY,testOnly:true};await put(temp);failUnless((await get(DIAGNOSTIC_KEY))?.testOnly,"Lecture échouée");await del(DIAGNOSTIC_KEY);
      failUnless((await get(DIAGNOSTIC_KEY))===undefined,"Suppression échouée");
    });
    await check("3. Sakura ancien conservé sans double case",async()=>{
      const a=simpleOptions(["Fleur de cerisier"]);failUnless(vals(a).filter(x=>x.includes("cerisier")).length===1,"Doublon détecté");failUnless(vals(a).includes("Fleur de cerisier"),"Libellé perdu");
    });
    await check("4. Sakura actuel sans alias ajouté",async()=>{
      const a=simpleOptions(["Fleur de cerisier / Sakura"]);failUnless(vals(a).filter(x=>x.includes("cerisier")).length===1,"Doublon ajouté");
    });
    await check("5. Tatouage historique fictif conservé et signalé",async()=>{
      const a=simpleOptions([TATTOO_TEST]);failUnless(a.some(([v,l])=>v===TATTOO_TEST&&l.includes("validation MJ")),"Valeur perdue ou avertissement absent");
    });
    await check("6. Deux graphies préexistantes préservées",async()=>{
      const a=simpleOptions(["Fleur de cerisier","Fleur de cerisier / Sakura"]);failUnless(vals(a).filter(x=>x.includes("cerisier")).length===2,"Une graphie a disparu");
    });
    await check("7. Catalogue standard inchangé",async()=>{
      const a=simpleOptions(["Maranta"]);failUnless(JSON.stringify(a)===JSON.stringify(BASE_OPTIONS),"Options standard modifiées");
    });
    await check("8. Changement d'école sans effacement",async()=>{
      const fake=makeSeed("legacy"),before=JSON.stringify(fake.l5rTattoos);fake.profession="mirumoto_bushi";
      failUnless(JSON.stringify(fake.l5rTattoos)===before&&vals(simpleOptions(fake.l5rTattoos)).includes(TATTOO_TEST),"Tatouage effacé");
    });
    await check("9. Pas d'accès mécanique hors école Togashi",async()=>{
      failUnless(core.l5rTattooAccessV02022({profession:"mirumoto_bushi"})===false,"Droit donné par erreur");
      failUnless(core.l5rTattooAccessV02022({profession:"togashi_monk"})===true,"Accès école Togashi absent");
    });
    await check("10. Retrait volontaire non annulé",async()=>{
      const next=["Fleur de cerisier","Maranta"].filter(x=>x!=="Fleur de cerisier");
      failUnless(!vals(simpleOptions(next)).includes("Fleur de cerisier"),"Tatouage réintroduit");
    });
    await check("11. Import incompatible refusé avant écriture",async()=>{
      const before=JSON.stringify(await get(KEY));
      let failed=false;try{parseArchive(JSON.stringify({schema:"autre",version:VERSION,row:makeSeed("legacy")}))}catch{failed=true}
      failUnless(failed,"Archive incompatible acceptée");failUnless(JSON.stringify(await get(KEY))===before,"Fiche modifiée après rejet");
    });
    await check("12. Fiche actuelle persistée intacte",async()=>{
      const row=await get(KEY);failUnless(row!==undefined,"Initialiser les données fictives d'abord.");
      failUnless(JSON.stringify(row)===JSON.stringify(validateRow(row)),"Fiche non persistée ou invalide");
    });
    const good=rows.filter(r=>r.ok).length;
    byId("results").textContent=rows.map(r=>`${r.ok?"✓":"✗"} ${r.name}${r.error?" — "+r.error:""}`).join("\n")+`\n\n${good}/${rows.length} contrôles réussis.`;
    byId("results").className="results "+(good===rows.length?"ok":"bad");
    log(`Diagnostics navigateur : ${good}/${rows.length}.`,good!==rows.length);
  }
  async function main(){
    const d=await openDB();byId("storage").textContent="Stockage : IndexedDB actif";byId("storage").className="status success";
    byId("seed").addEventListener("click",run(seed));
    byId("save").addEventListener("click",run(save));
    byId("reread").addEventListener("click",run(refresh));
    byId("reload").addEventListener("click",()=>location.reload());
    byId("secondTab").addEventListener("click",()=>window.open(location.href,"_blank","noopener"));
    byId("profession").addEventListener("change",showWarning);
    byId("export").addEventListener("click",run(exportJSON));
    byId("importFile").addEventListener("change",run(async()=>{const e=byId("importFile");try{await importJSON(e.files[0])}finally{e.value=""}}));
    byId("diagnose").addEventListener("click",run(diagnostics));
    await refresh();log("Banc de recette V137-01 chargé. Base dédiée : "+d.name);
  }
  document.addEventListener("DOMContentLoaded",()=>main().catch(e=>{byId("storage").textContent="Stockage indisponible";byId("storage").className="status fail";log(e.message,true)}));
})();