"use strict";
/* V0.20.132-R1: couche de recette fonctionnelle ciblée, créée pour tester le schéma
   de campagnes/personnages/scènes de V130, son vrai stockage et des fonctions
   mécaniques isolées. Cette interface n'est PAS la vraie interface V130. */
const $=q=>document.querySelector(q);
const $$=q=>Array.from(document.querySelectorAll(q));
const esc=v=>String(v??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
const iso=()=>JDRDB.nowIso();
const gameOptions=[{id:"l5r1",name:"L5R 1re",stored:"L5R"},{id:"dnd5",name:"D&D 5e",stored:"D&D"},{id:"vampire2",name:"Vampire V2",stored:"Vampire"},{id:"ward",name:"W.A.R.D.",stored:"WARD"}];
const defaultStats={l5r1:{air:2,earth:2,fire:2,water:2,void:2},dnd5:{strength:10,dexterity:10,constitution:10,intelligence:10,wisdom:10,charisma:10},vampire2:{wits:2,dexterity:2,stamina:2},ward:{will:5,humanity:6,awareness:2}};
const statLabels={air:"Air",earth:"Terre",fire:"Feu",water:"Eau",void:"Vide",strength:"Force",dexterity:"Dextérité",constitution:"Constitution",intelligence:"Intelligence",wisdom:"Sagesse",charisma:"Charisme",wits:"Astuce",stamina:"Vigueur",will:"Volonté",humanity:"Humanité",awareness:"Vigilance"};
const st={campaigns:[],characters:[],scenes:[],campaignId:null,currentTab:"campaigns",editor:null,sheetId:null,sheetMode:"quick"};
const storeNames=["campaigns","characters","scenes"];
const safeId=v=>String(v||"").startsWith("v132-");
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
const active=()=>st.campaigns.find(c=>c.id===st.campaignId)||null;
const game=c=>gameOptions.find(x=>x.id===JDRCore.normalizedSystemKey(c?.gameSystem))||gameOptions[0];
const campaignCharacters=(id=st.campaignId)=>st.characters.filter(c=>c.campaignId===id&&!c.deleted);
const campaignScenes=(id=st.campaignId)=>st.scenes.filter(c=>c.campaignId===id&&!c.deleted);
const labelType=v=>v==="PC"?"PJ":"PNJ";
const note=(msg,error=false)=>{const node=$("#flash");node.textContent=msg;node.classList.toggle("error",error);node.hidden=false;console[error?"error":"info"]("JDR-V132:",msg)};
const log=msg=>{$("#log").textContent=`${new Date().toLocaleTimeString("fr-FR")} ${msg}\n`+$("#log").textContent};
const wrap=fn=>async(...args)=>{try{await fn(...args)}catch(e){note(e?.message||String(e),true);log("ÉCHEC : "+(e?.stack||e))}};
const upsert=async(store,row)=>{assert(safeId(row.id),"Identifiant de recette requis.");assert(row.testOnly===true,"Les entrées réelles sont interdites.");await JDRDB.put(store,row)};
const nowRow=old=>({createdAt:old?.createdAt||iso(),updatedAt:iso(),testOnly:true});
const statsToHtml=(obj={})=>Object.entries(obj).map(([k,v])=>`<div><span>${esc(statLabels[k]||k)}</span><strong>${esc(v)}</strong></div>`).join("");
function optionHtml(current,options){return options.map(([value,label])=>`<option value="${esc(value)}" ${String(current)===String(value)?"selected":""}>${esc(label)}</option>`).join("")}
function field(name,label,value="",kind="text",span=false){return `<label ${span?'class="span2"':''}>${esc(label)}${kind==="textarea"?`<textarea name="${esc(name)}">${esc(value)}</textarea>`:`<input name="${esc(name)}" type="${esc(kind)}" value="${esc(value)}" ${kind==="number"?'step="1"':''}>`}</label>`}
function selectedFormValue(fd,key){return String(fd.get(key)||"").trim()}
function parseSkills(value){const o={};for(const part of String(value||"").split(/[;,\n]+/)){const line=part.trim();if(!line)continue;const i=line.lastIndexOf(":");if(i<1)throw new Error("Compétence : utiliser le format Nom:rang.");const name=line.slice(0,i).trim();const rank=Number(line.slice(i+1).trim());if(!name||name.length>90||!Number.isFinite(rank)||rank<0||rank>30)throw new Error("Compétence invalide : "+line);o[name]=rank}return o}
function skillsText(o={}){return Object.entries(o).map(([k,v])=>`${k}:${v}`).join("; ")}
function checkText(s,max=1500){assert(s.length<=max,`Texte trop long (${max} caractères max).`);return s}
async function refresh(){const values=await Promise.all(storeNames.map(x=>JDRDB.getAll(x)));[st.campaigns,st.characters,st.scenes]=values.map(a=>a.filter(x=>x?.testOnly===true && safeId(x.id)));st.campaigns.sort((a,b)=>a.name.localeCompare(b.name,"fr"));if(!st.campaigns.some(c=>c.id===st.campaignId)) st.campaignId=st.campaigns[0]?.id||null;JDRCore.state.campaign=active();JDRCore.state.selectedSystem=active()?game(active()).id:"l5r1";render()}
function render(){
 const combo=$("#campaignChoice");combo.innerHTML='<option value="">Aucune campagne</option>'+st.campaigns.map(c=>`<option value="${esc(c.id)}" ${c.id===st.campaignId?'selected':''}>${esc(c.name)} (${esc(game(c).name)})</option>`).join("");
 $("#campaignChip").textContent=active()?`${game(active()).name} · ${active().edition||"édition d'essai"}`:"Aucune campagne sélectionnée";
 renderCampaigns();renderCharacters();renderScenes();renderCombat();
 for(const x of ["newCharacter","newScene","beginCombat"]){$("#"+x).disabled=!active()}
}
function selectTab(id){st.currentTab=id;$$('.page').forEach(x=>x.hidden=x.id!==`tab-${id}`);$$("#nav [data-tab]").forEach(x=>x.classList.toggle("active",x.dataset.tab===id));if(id==="combat")renderCombat()}
function renderCampaigns(){const host=$("#campaignList");if(!st.campaigns.length){host.innerHTML='<p class="empty">Aucune campagne fictive. Utiliser « Créer 4 campagnes fictives » pour préparer les essais.</p>';return}host.innerHTML=st.campaigns.map(c=>`<article class="entry ${c.id===st.campaignId?'current':''}"><div><span class="tag">${esc(game(c).name)}</span><span class="tag">${esc(c.status)}</span></div><strong>${esc(c.name)}</strong><p>${esc(c.description||"")}</p><small>${campaignCharacters(c.id).length} personnages · ${campaignScenes(c.id).length} scènes</small><div class="actions"><button data-action="activate" data-id="${esc(c.id)}">Ouvrir</button><button class="secondary" data-action="edit-campaign" data-id="${esc(c.id)}">Modifier</button></div></article>`).join("")}
function renderCharacters(){let rows=campaignCharacters();const q=$("#charSearch").value.trim().toLowerCase(),type=$("#charFilter").value;if(q)rows=rows.filter(c=>(c.name+" "+(c.profession||"")).toLowerCase().includes(q));if(type!=="all")rows=rows.filter(c=>c.type===type);const host=$("#characterList");if(!active()){host.innerHTML='<p class="empty">Choisir une campagne.</p>';return}host.innerHTML=rows.map(c=>`<article class="entry"><span class="tag">${labelType(c.type)}</span><span class="tag">${esc(game(active()).name)}</span><strong style="display:block">${esc(c.name)}</strong><p>${esc(c.profession||"Sans profession")} · ${esc(c.publicDescription||c.description||"")}</p><div class="actions"><button data-action="sheet" data-id="${esc(c.id)}">Fiche</button><button class="secondary" data-action="edit-character" data-id="${esc(c.id)}">Modifier</button><button class="secondary" data-action="archive-character" data-id="${esc(c.id)}">Archiver</button></div></article>`).join("")||'<p class="empty">Aucun personnage pour ce filtre.</p>'}
function renderScenes(){const rows=campaignScenes(),host=$("#sceneList");if(!active()){host.innerHTML='<p class="empty">Choisir une campagne.</p>';return}host.innerHTML=rows.map(s=>{const current=active().currentSceneId===s.id;return `<article class="entry ${current?'current':''}"><span class="tag">${esc(s.status||"préparation")}</span>${current?'<span class="tag">Scène courante</span>':''}<strong style="display:block">${esc(s.title)}</strong><p>${esc(s.gameDate||"")} ${esc(s.startTime||"")} · ${esc(s.locationName||"Lieu non défini")}</p><p>${esc(s.description||"")}</p><small>${(s.characterIds||[]).length} participant(s)</small><div class="actions"><button data-action="edit-scene" data-id="${esc(s.id)}">Modifier</button><button class="secondary" data-action="activate-scene" data-id="${esc(s.id)}">${current?'Réactiver / réparer':'Activer'}</button></div></article>`}).join("")||'<p class="empty">Aucune scène dans cette campagne.</p>'}
/* V132-R1 : la scène courante est la référence de la campagne, pas simplement le statut narratif.
   Le changement est préparé depuis les lignes persistées et appliqué dans UNE transaction. */
async function switchSceneToCurrent(campaignId,sceneId,editedScene=null){
 const campaign=await JDRDB.get("campaigns",campaignId);
 assert(campaign?.testOnly===true&&safeId(campaign?.id),"Campagne fictive introuvable.");
 const stored=await JDRDB.getAllByIndex("scenes","campaignId",campaignId);
 const scenes=stored.filter(s=>s?.testOnly===true&&safeId(s.id)&&s.campaignId===campaignId&&!s.deleted);
 if(editedScene){assert(editedScene.id===sceneId&&editedScene.campaignId===campaignId&&editedScene.testOnly===true&&safeId(editedScene.id)&&!editedScene.deleted,"Scène modifiée invalide.");const i=scenes.findIndex(x=>x.id===editedScene.id);if(i>=0)scenes[i]=editedScene;else scenes.push(editedScene)}
 const selected=scenes.find(s=>s.id===sceneId);
 assert(selected,"Scène inexistante ou appartenant à une autre campagne.");
 const updatedAt=iso(),writes=[{store:"campaigns",value:{...campaign,currentSceneId:selected.id,currentGameTime:selected.startTime||campaign.currentGameTime,updatedAt}}];
 for(const scene of scenes){
   if(scene.id===sceneId||scene.status==="active")writes.push({store:"scenes",value:{...scene,status:scene.id===sceneId?"active":"planned",updatedAt}})
 }
 await JDRDB.atomicPutRowsV106(writes);
 return selected.id;
}
async function saveNonActiveScene(campaignId,row){
 const campaign=await JDRDB.get("campaigns",campaignId);
 assert(campaign?.testOnly===true&&safeId(campaign?.id),"Campagne fictive introuvable.");
 const writes=[{store:"scenes",value:row}];
 if(campaign.currentSceneId===row.id){
   writes.push({store:"campaigns",value:{...campaign,currentSceneId:null,updatedAt:iso()}})
 }
 await JDRDB.atomicPutRowsV106(writes);
}
function openEditor(kind,id=null){
 const c=active();if(kind!=="campaign")assert(c,"Choisir une campagne.");
 const row=id?(kind==="campaign"?st.campaigns:kind==="character"?st.characters:st.scenes).find(x=>x.id===id):null;
 assert(!id||row, "Élément introuvable.");st.editor={kind,id};
 $("#editorTitle").textContent=(row?"Modifier ":"Créer ")+(kind==="campaign"?"une campagne":kind==="character"?"un personnage":"une scène");
 let html="";
 if(kind==="campaign"){
  html+=field("name","Nom de campagne",row?.name||"","text",true);
  html+=`<label>Système<select name="system">${optionHtml(game(row||{gameSystem:"L5R"}).id,gameOptions.map(x=>[x.id,x.name]))}</select></label>`;
  html+=field("edition","Édition",row?.edition||"1e");
  html+=`<label>Statut<select name="status">${optionHtml(row?.status||"preparation",[["preparation","Préparation"],["active","Active"],["completed","Terminée"]])}</select></label>`;
  html+=field("universe","Univers fictif",row?.universe||"Univers de test");
  html+=field("description","Description publique de test",row?.description||"","textarea",true);
 }else if(kind==="character"){
  html+=field("name","Nom du personnage",row?.name||"","text",true);
  html+=`<label>Type<select name="type">${optionHtml(row?.type||"PC",[["PC","PJ"],["NPC","PNJ"]])}</select></label>`;
  html+=field("profession","Profession / concept",row?.profession||"");
  html+=field("playerName","Nom de joueur fictif",row?.playerName||"");
  html+=field("publicDescription","Description visible (démo)",row?.publicDescription||"","textarea",true);
  const keys=Object.keys(defaultStats[game(c).id]);for(const k of keys)html+=field("stat_"+k,statLabels[k]||k,row?.characteristics?.[k]??defaultStats[game(c).id][k],"number");
  html+=field("skills","Compétences (Nom:rang ; Nom:rang)",skillsText(row?.skills||{}),"textarea",true);
  html+=field("healthMax","Santé/PV maximum",row?.systemData?.healthMax??row?.systemData?.hpMax??7,"number");
  html+=field("healthCurrent","Santé/PV actuelle",row?.systemData?.healthCurrent??row?.systemData?.hpCurrent??7,"number");
  html+=field("systemNotes","Particularités du système (données fictives, sans règles)",row?.systemData?.testTraits||"","textarea",true);
  html+=field("biography","Biographie facultative",row?.biography||"","textarea",true);
  html+=field("privateNotes","Notes secrètes du MJ (uniquement dans cette recette fictive)",row?.privateNotes||"","textarea",true);
 }else{
  html+=field("title","Titre de la scène",row?.title||"","text",true);
  html+=field("gameDate","Date dans le jeu",row?.gameDate||"");
  html+=field("startTime","Heure dans le jeu",row?.startTime||"08:00");
  html+=field("locationName","Lieu fictif",row?.locationName||"");
  html+=`<label>Statut<select name="status">${optionHtml(row?.status||"planned",[["planned","Prévue"],["active","Active"],["completed","Terminée"]])}</select></label>`;
  html+=field("description","Résumé visible (fictif)",row?.description||"","textarea",true);
  html+=field("gmObjective","Objectif réservé au MJ",row?.gmObjective||"","textarea",true);
  html+=`<label class="span2">Participants (uniquement campagne active)<div class="checklist">${campaignCharacters().map(ch=>`<label><input type="checkbox" name="participant" value="${esc(ch.id)}" ${(row?.characterIds||[]).includes(ch.id)?'checked':''}> ${esc(ch.name)} (${labelType(ch.type)})</label>`).join("")||'<span>Aucun personnage</span>'}</div></label>`;
 }
 $("#editorBody").innerHTML=html;$("#editor").showModal();$("#editorBody input").focus();
}
async function saveEditor(){
 const {kind,id}=st.editor;const fd=new FormData($("#editorForm"));const old=id?(kind==="campaign"?st.campaigns:kind==="character"?st.characters:st.scenes).find(x=>x.id===id):null;
 if(kind==="campaign"){
  const system=selectedFormValue(fd,"system");assert(gameOptions.some(x=>x.id===system),"Système non reconnu.");
  const name=checkText(selectedFormValue(fd,"name"),90);assert(name,"Nom de campagne requis.");
  if(old&&campaignCharacters(old.id).length&&JDRCore.normalizedSystemKey(old.gameSystem)!==system)throw new Error("Impossible de modifier le système d'une campagne qui comporte des personnages : créer une autre campagne.");
  const row={...old,id:old?.id||JDRDB.uuid("v132-campaign"),name,gameSystem:gameOptions.find(x=>x.id===system).stored,edition:checkText(selectedFormValue(fd,"edition"),25),universe:checkText(selectedFormValue(fd,"universe"),90),status:selectedFormValue(fd,"status"),description:checkText(selectedFormValue(fd,"description")),...nowRow(old)};
  await upsert("campaigns",row);st.campaignId=row.id;localStorage.setItem("jdr-v132-active",row.id);
 }else if(kind==="character"){
  const c=active();assert(c,"Campagne active requise.");const name=checkText(selectedFormValue(fd,"name"),90);assert(name,"Nom requis.");
  const system=game(c).id,stats={};for(const k of Object.keys(defaultStats[system])){const n=Number(fd.get("stat_"+k));assert(Number.isFinite(n)&&n>=0&&n<=100,"Caractéristique invalide : "+k);stats[k]=n}
  const max=Number(fd.get("healthMax")),current=Number(fd.get("healthCurrent"));assert(Number.isFinite(max)&&max>=1&&max<=500,"Maximum de santé invalide.");assert(Number.isFinite(current)&&current>=0&&current<=max,"Santé/PV actuelle invalide.");
  const sd={...old?.systemData,testTraits:checkText(selectedFormValue(fd,"systemNotes")),...(system==="dnd5"?{hpMax:max,hpCurrent:current}:{healthMax:max,healthCurrent:current})};
  const row={...old,id:old?.id||JDRDB.uuid("v132-character"),campaignId:c.id,scope:"campaign",systemKey:system,type:selectedFormValue(fd,"type")==="NPC"?"NPC":"PC",name,profession:checkText(selectedFormValue(fd,"profession"),90),playerName:checkText(selectedFormValue(fd,"playerName"),90),publicDescription:checkText(selectedFormValue(fd,"publicDescription")),description:checkText(selectedFormValue(fd,"publicDescription")),characteristics:stats,skills:parseSkills(selectedFormValue(fd,"skills")),systemData:sd,biography:checkText(selectedFormValue(fd,"biography")),privateNotes:checkText(selectedFormValue(fd,"privateNotes")),generationContext:{systemKey:system},deleted:false,status:"active",initials:name.split(/\s+/).slice(0,2).map(x=>x[0].toUpperCase()).join(""),...nowRow(old)};
  await upsert("characters",row);await JDRDB.history(c.id,"character",row.id,old?"UPDATE":"CREATE",old||null,row,"V132_SYNTHETIC");
 }else{
  const c=active();assert(c,"Campagne active requise.");const title=checkText(selectedFormValue(fd,"title"),90);assert(title,"Titre requis.");
  const charIds=fd.getAll("participant").map(String);const allowed=new Set(campaignCharacters().map(x=>x.id));assert(charIds.every(x=>allowed.has(x)),"Participant extérieur à la campagne.");
  const row={...old,id:old?.id||JDRDB.uuid("v132-scene"),campaignId:c.id,sessionId:null,title,gameDate:checkText(selectedFormValue(fd,"gameDate"),45),startTime:checkText(selectedFormValue(fd,"startTime"),20),locationName:checkText(selectedFormValue(fd,"locationName"),80),description:checkText(selectedFormValue(fd,"description")),gmObjective:checkText(selectedFormValue(fd,"gmObjective")),status:selectedFormValue(fd,"status"),characterIds:charIds,presentCharacterIds:charIds,deleted:false,...nowRow(old)};
  if(row.status==="active")await switchSceneToCurrent(c.id,row.id,row);
  else await saveNonActiveScene(c.id,row);
  await JDRDB.history(c.id,"scene",row.id,old?"UPDATE":"CREATE",old||null,row,"V132_SYNTHETIC");
 }
 $("#editor").close();await refresh();note("Enregistrement effectué dans la base isolée V132.");
}
function renderSheet(){const c=st.characters.find(x=>x.id===st.sheetId);if(!c)return;const mode=st.sheetMode;$("#sheetTitle").textContent=`${c.name} — ${mode==="quick"?'fiche rapide':mode==="full"?'fiche complète':'biographie'}`;let html=`<p><span class="tag">${labelType(c.type)}</span> <span class="tag">${esc(game(st.campaigns.find(x=>x.id===c.campaignId)).name)}</span> ${esc(c.profession||"")}</p>`;
 if(mode==="quick")html+=`<div class="keyvalues">${statsToHtml(c.characteristics||{})}</div><div class="keyvalues">${Object.entries(c.skills||{}).map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}</div><p>${esc(c.publicDescription||"")}</p>`;
 else if(mode==="full")html+=`<h3>Caractéristiques</h3><div class="keyvalues">${statsToHtml(c.characteristics||{})}</div><h3>Compétences</h3><p>${esc(skillsText(c.skills||{}))}</p><h3>Ressources et propriétés de système</h3><pre>${esc(JSON.stringify(c.systemData||{},null,2))}</pre><h3>Notes de jeu (MJ)</h3><p class="readonly">${esc(c.privateNotes||"Aucune note")}</p>`;
 else html+=`<h3>Histoire</h3><p class="readonly">${esc(c.biography||"Biographie non renseignée.")}</p><h3>Contexte</h3><p class="readonly">${esc(c.publicDescription||"")}</p>`;
 $("#sheetBody").innerHTML=html;
}
function openSheet(id,mode="quick"){assert(st.characters.some(x=>x.id===id&&x.campaignId===st.campaignId),"Fiche hors campagne.");st.sheetId=id;st.sheetMode=mode;renderSheet();$("#sheet").showModal()}
async function fixture(){if(st.campaigns.length&&!confirm("Les entrées fictives connues pourront être écrasées. Continuer ?"))return;const rows=[];
 for(const [i,g] of gameOptions.entries()){
  const cid=`v132-camp-${g.id}`,sceneId=`v132-scene-${g.id}`;const chars=[];
  rows.push({store:"campaigns",value:{id:cid,name:`Campagne fictive ${g.name}`,gameSystem:g.stored,edition:g.id==="dnd5"?"2024":g.id==="vampire2"?"V2":"1e",universe:"Univers fictif de recette",description:"Campagne inventée pour vérifier l'isolation des JDR.",status:"active",currentSceneId:sceneId,currentGameTime:"09:00",...nowRow()}});
  for(let j=0;j<2;j++){
   const id=`v132-character-${g.id}-${j+1}`;chars.push(id);
   const npc=j===1,stats={...defaultStats[g.id]};if(g.id==="dnd5")stats.dexterity=j===0?14:12;if(g.id==="vampire2")stats.wits=3;
   const sd=g.id==="dnd5"?{hpMax:j?10:15,hpCurrent:j?10:15,testTraits:"Attribut fictif"}:{healthMax:7,healthCurrent:7,testTraits:g.id==="l5r1"?"Tatouage fictif TEST — non canonique":"Compétence fictive de recette"};
   rows.push({store:"characters",value:{id,campaignId:cid,scope:"campaign",systemKey:g.id,type:npc?"NPC":"PC",name:npc?`Personnage témoin ${i+1}B`:`Personnage témoin ${i+1}A`,profession:npc?"Rôle secondaire fictif":"Rôle principal fictif",publicDescription:"Description fictive destinée à l'écran de recette.",description:"Description fictive destinée à l'écran de recette.",privateNotes:"Information fictive réservée au test MJ.",biography:"Biographie inventée sans référence à une campagne réelle.",characteristics:stats,skills:g.id==="vampire2"?{Vigilance:2}:{Observation:1},systemData:sd,status:"active",deleted:false,...nowRow()}})
  }
  rows.push({store:"scenes",value:{id:sceneId,campaignId:cid,title:`Scène fictive ${i+1}`,locationName:"Lieu de test",gameDate:"Jour fictif 1",startTime:"09:00",description:"Scène inventée sans scénario privé.",gmObjective:"Tester l'activation et les participants.",status:"active",characterIds:chars,presentCharacterIds:chars,deleted:false,...nowRow()}})
 }
 await JDRDB.atomicPutRowsV106(rows);st.campaignId="v132-camp-l5r1";localStorage.setItem("jdr-v132-active",st.campaignId);await refresh();note("Quatre campagnes, huit personnages et quatre scènes fictives ont été créés.")
}
function combatKey(){return `JDRRecetteV132Combat_${st.campaignId||"none"}`}
function getCombat(){try{return JSON.parse(localStorage.getItem(combatKey())||"null")}catch{return null}}
function saveCombat(c){if(c){c.revision=(c.revision||0)+1;c.updatedAt=iso();localStorage.setItem(combatKey(),JSON.stringify(c))}else localStorage.removeItem(combatKey())}
/* Deux corrections de protection ciblées : le code original reste intact dans core.js.
   V130 : 0 HP sur vampire devient 7 ; compétences objet provoquent .find TypeError. */
function correctedHealth(c){const o=JDRCore.combatV2078Health(c);if(JDRCore.profileKeyForCampaign()==="vampire2")o.current=Number(c?.systemData?.healthCurrent??c?.systemData?.health??7);return o}
function correctedInitiative(c){if(JDRCore.profileKeyForCampaign()!=="vampire2")return JDRCore.combatV2078InitiativeDefault(c);let rows=c.skills||[];if(!Array.isArray(rows))rows=Object.entries(rows).map(([name,rank])=>({name,rank}));return JDRCore.combatV2078InitiativeDefault({...c,skills:rows})}
function beginCombat(){const c=active();assert(c,"Choisir une campagne.");if(getCombat()&&!confirm("Remplacer le combat fictif en cours ?"))return;const ss=campaignScenes();const scene=ss.find(x=>x.id===c.currentSceneId)||ss.find(x=>x.status==="active")||ss[0]||null;const all=campaignCharacters(),ids=scene?.presentCharacterIds||scene?.characterIds||null;const members=ids?all.filter(x=>ids.includes(x.id)):all;assert(members.length,"Aucun personnage pour commencer le combat.");JDRCore.state.campaign=c;const rows=members.map(ch=>{const h=correctedHealth(ch);return{id:`char-${ch.id}`,sourceId:ch.id,name:ch.name,side:ch.type==="PC"?"pc":"npc",initiative:correctedInitiative(ch),healthCurrent:h.current,healthMax:h.max,healthLabel:h.label,dead:h.current<=0}});saveCombat({id:JDRDB.uuid("v132-combat"),campaignId:c.id,sceneId:scene?.id||null,systemKey:game(c).id,round:1,turnIndex:0,combatants:rows});renderCombat();note("Combat fictif créé en utilisant les fonctions mécaniques issues de V130.")}
function renderCombat(){const host=$("#combatContent"),c=getCombat();if(!active()){host.innerHTML='<p class="empty">Choisir une campagne.</p>';return}if(!c){host.innerHTML='<p class="empty">Aucun combat en cours dans cette campagne.</p>';return}const list=JDRCore.combatV2078Order(c),now=JDRCore.combatV2078Active(c);host.innerHTML=`<div class="round">Round ${Number(c.round)||1} · ${list.length} combattants · révision ${c.revision||0}</div>`+list.map(r=>`<div class="combatrow ${now?.id===r.id?'active':''}"><div><strong>${esc(r.name)}</strong><small style="display:block;color:var(--muted)">${r.side==='pc'?'PJ':'PNJ'} · ${r.dead?'À zéro':'actif'} ${now?.id===r.id?'· TOUR ACTIF':''}</small></div><label>Initiative<input data-combat="initiative" data-id="${esc(r.id)}" type="number" value="${esc(r.initiative)}"></label><label>${esc(r.healthLabel)}<input data-combat="healthCurrent" data-id="${esc(r.id)}" type="number" min="0" max="${esc(r.healthMax)}" value="${esc(r.healthCurrent)}"></label><button data-action="heal" data-id="${esc(r.id)}" class="secondary">+1 santé</button></div>`).join("")}
function changeCombat(id,patch){const c=getCombat();assert(c,"Combat introuvable.");const r=c.combatants.find(x=>x.id===id);assert(r,"Combattant introuvable.");Object.assign(r,patch);if(patch.healthCurrent!==undefined){r.healthCurrent=Math.max(0,Math.min(Number(r.healthMax)||500,Number(r.healthCurrent)||0));r.dead=r.healthCurrent===0}saveCombat(c);renderCombat()}
function nextTurn(){const c=getCombat();assert(c,"Pas de combat actif.");const rows=JDRCore.combatV2078Order(c);assert(rows.length,"Aucun combattant.");let i=(Number(c.turnIndex)||0)+1;while(i<rows.length&&rows[i].dead)i++;if(i>=rows.length){c.round++;i=0;while(i<rows.length&&rows[i].dead)i++;if(i>=rows.length)i=0}c.turnIndex=i;saveCombat(c);renderCombat()}
async function endCombat(){const c=getCombat();assert(c,"Aucun combat actif.");if(!confirm("Réinjecter les PV/santé fictifs dans les fiches et terminer le combat ?"))return;const system=game(active()).id,writes=[];for(const row of c.combatants){const char=st.characters.find(x=>x.id===row.sourceId&&x.campaignId===st.campaignId);if(!char)continue;const systemData={...(char.systemData||{}),...(system==="dnd5"?{hpCurrent:row.healthCurrent}:{healthCurrent:row.healthCurrent,healthMax:row.healthMax})};writes.push({store:"characters",value:{...char,systemData,updatedAt:iso()}})}if(writes.length)await JDRDB.atomicPutRowsV106(writes);saveCombat(null);await refresh();note("Combat terminé : ressources réinjectées dans les fiches fictives.")}
async function snapshot(){const values=await Promise.all(storeNames.map(x=>JDRDB.getAll(x)));return Object.fromEntries(storeNames.map((k,i)=>[k,values[i].filter(x=>x?.testOnly&&safeId(x.id)).sort((a,b)=>a.id.localeCompare(b.id))]))}
function exportPayload(rows){return{schema:"JDR_V132_FUNCTIONAL_TEST_ONLY",version:"0.20.132",exportedAt:new Date().toISOString(),rows}}
function validatePayload(payload){
 assert(payload&&typeof payload==="object"&&!Array.isArray(payload),"Document JSON incorrect.");
 assert(payload.schema==="JDR_V132_FUNCTIONAL_TEST_ONLY"&&payload.version==="0.20.132","Archive non issue de cette recette V132.");
 assert(payload.rows&&typeof payload.rows==="object"&&!Array.isArray(payload.rows)&&Object.keys(payload.rows).sort().join("|")===storeNames.slice().sort().join("|"),"Structure des magasins incorrecte.");
 const all=[];const ids={};for(const store of storeNames){const arr=payload.rows[store];assert(Array.isArray(arr)&&arr.length<=100,"Magasin non valide : "+store);const set=new Set();for(const value of arr){assert(value&&typeof value==="object"&&!Array.isArray(value)&&safeId(value.id)&&value.testOnly===true,"Donnée étrangère à la recette.");assert(!set.has(value.id),"Identifiant dupliqué : "+value.id);set.add(value.id);assert(JSON.stringify(value).length<=14000,"Entrée trop volumineuse.");all.push({store,value})}ids[store]=set}
 for(const row of payload.rows.campaigns)assert(gameOptions.some(g=>g.stored===row.gameSystem),"Système non reconnu dans une campagne.");
 const gmap=new Map(payload.rows.campaigns.map(c=>[c.id,c]));const pmap=new Map(payload.rows.characters.map(c=>[c.id,c]));
 for(const c of payload.rows.characters){assert(gmap.has(c.campaignId),"Personnage sans campagne dans l'archive.");assert(c.systemKey===JDRCore.normalizedSystemKey(gmap.get(c.campaignId).gameSystem),"Mélange de systèmes dans l'archive.");assert(["PC","NPC"].includes(c.type),"Type de personnage invalide.");assert(typeof c.name==="string"&&c.name.length>0&&c.name.length<=90,"Nom de personnage invalide.")}
 for(const s of payload.rows.scenes){assert(gmap.has(s.campaignId),"Scène sans campagne.");assert(Array.isArray(s.characterIds||[])&&(s.characterIds||[]).every(id=>pmap.get(id)?.campaignId===s.campaignId),"Participant d'une autre campagne détecté.")}
 return all
}
async function exportJson(){const rows=await snapshot();assert(rows.campaigns.length,"Aucune donnée fictive à exporter.");const payload=exportPayload(rows);const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="assistant_jdr_v132_recette_fictive.json";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);$("#exportInfo").textContent=`${blob.size} octets · ${rows.campaigns.length} campagnes · ${rows.characters.length} personnages · ${rows.scenes.length} scènes`;note("Export V132 préparé. Vérifier le téléchargement dans Work.")}
async function importFile(file){assert(file&&file.size<=1_000_000,"Fichier absent ou trop volumineux (> 1 Mo).");let payload;try{payload=JSON.parse(await file.text())}catch{throw new Error("Fichier JSON illisible ou malformé : import annulé.")}const writes=validatePayload(payload);assert(writes.length,"Archive vide.");if(!confirm(`Restaurer ${writes.length} entrées fictives ? Les mêmes identifiants seront écrasés ; les autres lignes resteront.`))return;await JDRDB.atomicPutRowsV106(writes);await refresh();note(`${writes.length} entrées V132 restaurées atomiquement.`)}
async function diagnostics(){const tests=[],prefix=`v132-diag-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,cid=prefix+'-campaign',pid=prefix+'-character',sid=prefix+'-scene';const touched=[],sid2=prefix+'-scene-b';const check=async(label,fn)=>{try{await fn();tests.push({label,ok:true})}catch(e){tests.push({label,ok:false,error:e.message})}};
 await check("Stockage IndexedDB natif",async()=>{assert(JDRDB.backendMode==="indexeddb","Navigateur en mode secours : "+JDRDB.backendMode)});
 await check("Écriture et lecture d'une campagne",async()=>{const row={id:cid,testOnly:true,name:"Contrôle temporaire",gameSystem:"L5R"};await JDRDB.put("campaigns",row);touched.push(["campaigns",cid]);assert((await JDRDB.get("campaigns",cid))?.name===row.name,"Lecture non conforme")});
 await check("Écriture atomique personnage + scène",async()=>{const p={id:pid,campaignId:cid,testOnly:true,type:"PC",systemKey:"l5r1",name:"Témoin temporaire"},s={id:sid,campaignId:cid,testOnly:true,characterIds:[pid],title:"Scène temporaire"};await JDRDB.atomicPutRowsV106([{store:"characters",value:p},{store:"scenes",value:s}]);touched.push(["characters",pid],["scenes",sid]);assert((await JDRDB.get("characters",pid))?.name===p.name,"Personnage absent")});
 await check("Indexation par campagne",async()=>{const rows=await JDRDB.getAllByIndex("characters","campaignId",cid);assert(rows.some(x=>x.id===pid),"Index non cohérent")});
 await check("Bascule atomique scène courante A → B (P1 V132-01)",async()=>{
   const oldC=await JDRDB.get("campaigns",cid);assert(oldC,"Campagne témoin introuvable");
   const sceneA=await JDRDB.get("scenes",sid);assert(sceneA,"Scène témoin A introuvable");
   await JDRDB.atomicPutRowsV106([
     {store:"campaigns",value:{...oldC,currentSceneId:sid,currentGameTime:"09:00"}},
     {store:"scenes",value:{...sceneA,status:"active",startTime:"09:00"}},
     {store:"scenes",value:{id:sid2,campaignId:cid,testOnly:true,title:"Scène témoin B",status:"planned",startTime:"08:00",characterIds:[pid]}}
   ]);touched.push(["scenes",sid2]);
   await switchSceneToCurrent(cid,sid2);
   const c=await JDRDB.get("campaigns",cid),a=await JDRDB.get("scenes",sid),b=await JDRDB.get("scenes",sid2);
   assert(c.currentSceneId===sid2&&c.currentGameTime==="08:00","Pointeur ou heure de campagne non mis à jour");
   assert(a.status!=="active"&&b.status==="active","Plusieurs scènes actives / scène cible inactive");
 });
 await check("Cohérence des scènes persistées de chaque campagne",async()=>{
   const campaigns=(await JDRDB.getAll("campaigns")).filter(x=>x?.testOnly===true&&safeId(x.id));
   const scenes=(await JDRDB.getAll("scenes")).filter(x=>x?.testOnly===true&&safeId(x.id)&&!x.deleted);
   for(const c of campaigns){
     const same=scenes.filter(x=>x.campaignId===c.id),activated=same.filter(x=>x.status==="active");
     if(c.currentSceneId){
       assert(same.some(x=>x.id===c.currentSceneId&&x.status==="active"),`Scène courante absente ou non active : ${c.name}`);
       assert(activated.length===1,`Plusieurs scènes actives : ${c.name}`);
     }else assert(activated.length===0,`Scène active sans pointeur courant : ${c.name}`);
   }
 });
 await check("Isolation de système L5R / D&D / Vampire / WARD",async()=>{for(const g of gameOptions)assert(JDRCore.normalizedSystemKey(g.stored)===g.id,`Normalisation incorrecte ${g.id}`);assert(JDRCore.normalizedSystemKey("D&D")!==JDRCore.normalizedSystemKey("L5R"),"Systèmes mélangés")});
 await check("Ordre d'initiative — source V130",async()=>{const ordered=JDRCore.combatV2078Order({combatants:[{id:"a",initiative:2,side:"npc",name:"A"},{id:"b",initiative:5,side:"pc",name:"B"}]});assert(ordered[0].id==="b","Ordre erroné")});
 await check("Protection santé Vampire à zéro",async()=>{const before=JDRCore.state.campaign;JDRCore.state.campaign={gameSystem:"Vampire"};try{const c={systemData:{healthCurrent:0,healthMax:7}};assert(correctedHealth(c).current===0,"La santé à zéro a été perdue")}finally{JDRCore.state.campaign=before}});
 await check("Protection compétences Vampire enregistrées en objet",async()=>{const before=JDRCore.state.campaign;JDRCore.state.campaign={gameSystem:"Vampire"};try{const n=correctedInitiative({characteristics:{wits:3},skills:{Vigilance:2}});assert(n===5,"Initiative incorrecte : "+n)}finally{JDRCore.state.campaign=before}});
 await check("Rejet archive inter-systèmes sans écriture",async()=>{let rejected=false;try{validatePayload({schema:"JDR_V132_FUNCTIONAL_TEST_ONLY",version:"0.20.132",rows:{campaigns:[{id:"v132-a",testOnly:true,gameSystem:"D&D"}],characters:[{id:"v132-b",testOnly:true,campaignId:"v132-a",systemKey:"l5r1",type:"PC",name:"Témoin"}],scenes:[]}})}catch{rejected=true}assert(rejected,"Import incohérent accepté")});
 for(const [store,id] of touched.reverse())try{await JDRDB.remove(store,id)}catch(e){log("Nettoyage temporaire : "+e.message)}
 const ok=tests.filter(x=>x.ok).length;$("#testResults").innerHTML=`<strong>${ok}/${tests.length} contrôles réussis</strong>`+tests.map(x=>`<div class="${x.ok?'ok':'fail'}">${x.ok?'✓':'✕'} ${esc(x.label)}${x.error?' — '+esc(x.error):''}</div>`).join("");log(`Diagnostic ${ok}/${tests.length} contrôles`);await refresh()
}
function delegate(e){const b=e.target.closest("[data-action]");if(!b)return;const{id,action}=b.dataset;wrap(async()=>{if(action==="activate"){st.campaignId=id;localStorage.setItem("jdr-v132-active",id);JDRCore.state.campaign=active();JDRCore.state.selectedSystem=game(active()).id;render()}else if(action==="edit-campaign")openEditor("campaign",id);else if(action==="edit-character")openEditor("character",id);else if(action==="edit-scene")openEditor("scene",id);else if(action==="sheet")openSheet(id);else if(action==="archive-character"){const c=st.characters.find(x=>x.id===id&&x.campaignId===st.campaignId);assert(c,"Personnage introuvable.");if(confirm("Archiver ce personnage fictif ?")){await upsert("characters",{...c,deleted:true,updatedAt:iso()});await refresh()}}else if(action==="activate-scene"){const s=st.scenes.find(x=>x.id===id&&x.campaignId===st.campaignId);assert(s,"Scène hors campagne.");await switchSceneToCurrent(st.campaignId,s.id);await refresh();note("Scène courante mise à jour avec son heure de jeu.")}else if(action==="heal"){const c=getCombat(),r=c?.combatants.find(x=>x.id===id);assert(r,"Combattant introuvable.");changeCombat(id,{healthCurrent:r.healthCurrent+1})}})()}
async function init(){
 await JDRDB.open();$("#dbdot").classList.toggle("ok",JDRDB.backendMode==="indexeddb");$("#dbstate").textContent=`Stockage ${JDRDB.backendMode}`;st.campaignId=localStorage.getItem("jdr-v132-active");
 $("#nav").addEventListener("click",e=>{const b=e.target.closest("[data-tab]");if(b)selectTab(b.dataset.tab)});
 $("#campaignChoice").addEventListener("change",e=>{st.campaignId=e.target.value||null;localStorage.setItem("jdr-v132-active",st.campaignId||"");JDRCore.state.campaign=active();JDRCore.state.selectedSystem=active()?game(active()).id:"l5r1";render()});
 $("#fixture").addEventListener("click",wrap(fixture));$("#newCampaign").addEventListener("click",()=>openEditor("campaign"));$("#newCharacter").addEventListener("click",()=>openEditor("character"));$("#newScene").addEventListener("click",()=>openEditor("scene"));
 $("#charSearch").addEventListener("input",renderCharacters);$("#charFilter").addEventListener("change",renderCharacters);
 $("#campaignList").addEventListener("click",delegate);$("#characterList").addEventListener("click",delegate);$("#sceneList").addEventListener("click",delegate);$("#combatContent").addEventListener("click",delegate);
 $("#beginCombat").addEventListener("click",wrap(beginCombat));$("#nextTurn").addEventListener("click",wrap(nextTurn));$("#endCombat").addEventListener("click",wrap(endCombat));
 $("#combatContent").addEventListener("change",wrap(async(e)=>{const t=e.target.closest("[data-combat]");if(!t)return;const v=Number(t.value);assert(Number.isFinite(v),"Valeur numérique requise.");changeCombat(t.dataset.id,{[t.dataset.combat]:v})}));
 $("#editorForm").addEventListener("submit",e=>{e.preventDefault();wrap(saveEditor)()});$("#closeEditor").addEventListener("click",()=>$("#editor").close());$("#cancelEditor").addEventListener("click",()=>$("#editor").close());
 $("#closeSheet").addEventListener("click",()=>$("#sheet").close());$("#quickSheet").addEventListener("click",()=>{st.sheetMode="quick";renderSheet()});$("#fullSheet").addEventListener("click",()=>{st.sheetMode="full";renderSheet()});$("#bioSheet").addEventListener("click",()=>{st.sheetMode="bio";renderSheet()});$("#editFromSheet").addEventListener("click",()=>{$("#sheet").close();openEditor("character",st.sheetId)});
 $("#export").addEventListener("click",wrap(exportJson));$("#importFile").addEventListener("change",wrap(async(e)=>{const f=e.target.files[0];try{await importFile(f)}finally{e.target.value=""}}));
 $("#runTests").addEventListener("click",wrap(diagnostics));$("#secondTab").addEventListener("click",()=>window.open(location.href,"_blank","noopener"));
 window.addEventListener("storage",e=>{if(e.key?.startsWith("JDRRecetteV132Combat"))renderCombat()});
 await refresh();log("Ouverture V132. Base : "+JDRDB.DB_NAME);note("Recette V132 prête. Utiliser uniquement des données fictives.")
}
document.addEventListener("DOMContentLoaded",()=>wrap(init)());