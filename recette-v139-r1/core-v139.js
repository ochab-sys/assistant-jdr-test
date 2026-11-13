/* V0.20.139 — L5R 1re : registre XP manuel, écritures atomiques.
   AUCUN tarif officiel de traits/compétences n'est supposé par ce module.
   Les anciennes valeurs deviennent un solde d'ouverture explicite ; aucune migration destructive. */
function l5rXpLedgerV139(character){
  if(!character || typeof character!=="object")throw new Error("Personnage introuvable.");
  const previous=character.systemData?.l5rXpLedgerV139;
  if(previous){
    const opening=Number(previous.openingBalance),earned=Number(previous.earned),spent=Number(previous.spent),available=Number(previous.available);
    if(![opening,earned,spent,available].every(v=>Number.isSafeInteger(v)&&v>=0) || opening+earned-spent!==available){
      throw new Error("Registre XP incohérent : aucune écriture effectuée. Vérification MJ nécessaire.");
    }
    return {version:1,openingBalance:opening,earned,spent,available};
  }
  const raw=character.xp ?? character.systemData?.experience ?? character.systemData?.xp ?? 0;
  const balance=Number(raw);
  if(!Number.isSafeInteger(balance)||balance<0)throw new Error("Solde XP initial invalide : vérification MJ nécessaire.");
  return {version:1,openingBalance:balance,earned:0,spent:0,available:balance};
}
function l5rXpPlanV139(character,{kind,amount,category="other",key="",reason="",source=""}){
  if(!["gain","spend"].includes(kind))throw new Error("Type de progression XP invalide.");
  const n=Number(amount);
  if(!Number.isSafeInteger(n)||n<=0)throw new Error("Le montant XP doit être un entier strictement positif.");
  const old=l5rXpLedgerV139(character);
  if(kind==="spend"&&old.available<n)throw new Error(`XP insuffisants : ${old.available} disponibles pour ${n} demandés.`);
  if(kind==="gain"&&category!=="other")throw new Error("Un gain d'XP ne modifie pas de caractéristique.");
  if(kind==="spend"&&!["skill","trait","other"].includes(category))throw new Error("Catégorie de dépense invalide.");
  if(kind==="spend"&&!String(source).trim())throw new Error("Indique la source du coût ou « montant arbitré par le MJ ».");
  const next={...character,systemData:{...(character.systemData||{})},characteristics:{...(character.characteristics||{})},skills:{...(character.skills||{})}};
  let change=null;
  if(kind==="spend"&&category!=="other"){
    const map=category==="skill"?next.skills:next.characteristics;
    const allowed=category==="skill"?Object.keys(next.skills):SYSTEM_PROFILES.l5r1.characteristics.map(x=>x[0]);
    if(!allowed.includes(key)||!Object.hasOwn(map,key))throw new Error("Compétence ou trait absent de la fiche : pas d'amélioration implicite.");
    const prior=Number(map[key]);
    if(!Number.isSafeInteger(prior)||prior<0||prior>=10)throw new Error("Rang de compétence ou trait invalide pour une augmentation.");
    map[key]=prior+1;
    change={category,key,before:prior,after:prior+1};
  }
  const ledger={...old,earned:old.earned+(kind==="gain"?n:0),spent:old.spent+(kind==="spend"?n:0)};
  ledger.available=ledger.openingBalance+ledger.earned-ledger.spent;
  if(![ledger.earned,ledger.spent,ledger.available].every(Number.isSafeInteger)||ledger.available<0)throw new Error("Dépassement de capacité des compteurs XP.");
  next.xp=ledger.available;
  next.systemData.experience=ledger.available;
  next.systemData.l5rXpLedgerV139=ledger;
  if(change){
    next.systemData.insight=l5rInsight(next.characteristics,next.skills);
    // Le rang d'école reste sous contrôle du MJ. L'Insight proposé est enregistré.
    next.systemData.l5rXpSuggestedRankV139=l5rRankForInsight(next.systemData.insight);
  }
  return {next,ledger,change,amount:n,kind,reason:String(reason).trim(),source:String(source).trim(),category};
}
async function l5rXpSaveV139(character,inputs){
  if(!state.campaignId||!state.campaign||normalizedSystemKey(state.campaign.gameSystem)!=="l5r1")throw new Error("Une campagne L5R 1re édition active est obligatoire.");
  if(character.campaignId!==state.campaignId)throw new Error("Personnage situé dans une autre campagne.");
  if(!JDRDB.storagePersistent)throw new Error("Stockage non persistant : export préalable et navigateur autorisé nécessaires.");
  // Relecture pour éviter d'appliquer un changement à un état de fiche périmé.
  const persisted=await JDRDB.get("characters",character.id);
  if(!persisted||persisted.deleted||persisted.campaignId!==state.campaignId)throw new Error("Personnage introuvable ou archivé.");
  if(JSON.stringify(persisted)!==JSON.stringify(character))throw new Error("Cette fiche a changé ailleurs : recharge la campagne avant toute dépense.");
  const previousEvents=(await JDRDB.all('history')).filter(e=>e.entityId===character.id&&e.progression?.l5rV139);
  const sequence=Math.max(previousEvents.length,...previousEvents.map(e=>Number.isSafeInteger(e.progression?.sequence)?e.progression.sequence:0))+1;
  const plan=l5rXpPlanV139(persisted,inputs),now=JDRDB.nowIso();
  plan.next.updatedAt=now;
  const isGain=plan.kind==="gain";
  const title=isGain?`+${plan.amount} XP gagnés`:`−${plan.amount} XP dépensés`;
  const entry={id:JDRDB.uuid("history"),campaignId:state.campaignId,entityType:"progression",entityId:character.id,
    action:isGain?"L5R_XP_GAIN":"L5R_XP_SPEND",summary:`${character.name} : ${title}`,details:plan.reason,
    progression:{currency:"XP",amount:isGain?plan.amount:-plan.amount,evolution:plan.change?l5rXpEvolutionLabelV140({l5rV139:true,change:plan.change}):(isGain?"Récompense XP":"Dépense libre validée MJ"),category:plan.category,source:plan.source,l5rV139:true,
      beforeBalance:plan.ledger.available+(isGain?-plan.amount:plan.amount),afterBalance:plan.ledger.available,change:plan.change,sequence},
    sessionId:state.session?.id||null,sceneId:state.scene?.id||null,gameDate:state.campaign?.currentGameDate||null,
    createdAt:now,updatedAt:now,deleted:false};
  await JDRDB.atomicPutRowsV106([{store:"characters",value:plan.next},{store:"history",value:entry}]);
  await reloadActiveCampaign();
  renderWorkspaceModule("progression");
  showToast(`${title} — solde ${plan.ledger.available} XP. Coût saisi/validé par le MJ.`);
  return {entry,character:plan.next};
}
function l5rXpBalanceHtmlV139(){
  if(profileKeyForCampaign()!=="l5r1")return "";
  const pcs=(state.characters||[]).filter(c=>!c.deleted&&(c.type==="PC"||c.characterType==="PJ"||c.type==="PJ"));
  return `<div class="system-derived"><strong>L5R 1re — suivi XP (coûts manuels MJ, non homologués automatiquement)</strong>${pcs.map(c=>{
    try{const l=l5rXpLedgerV139(c);return `<div class="row-sub">${esc(c.name)} : ouverture ${l.openingBalance} · gagnés ${l.earned} · dépensés ${l.spent} · <b>${l.available} XP disponibles</b> · Insight ${esc(c.systemData?.insight??"—")} · Rang école ${esc(c.systemData?.schoolRank??"—")}${c.systemData?.l5rXpSuggestedRankV139?` · rang suggéré ${esc(c.systemData.l5rXpSuggestedRankV139)} (à valider MJ)`:""}</div>`;}
    catch(e){return `<div class="row-sub">${esc(c.name)} : ⚠ ${esc(e.message)}</div>`;}
  }).join("") || "<div class='row-sub'>Aucun PJ disponible.</div>"}<div class="system-note">Le solde initial provient de la fiche existante et reste à vérifier. Les tarifs et les techniques d'école ne sont pas appliqués automatiquement. Les dépenses sont écrites avec la fiche dans une transaction.</div></div>`;
}
async function v139L5rCreateProgression(){
  const choices=(state.characters||[]).filter(c=>!c.deleted&&(c.type==="PC"||c.type==="PJ"||c.characterType==="PJ"||c.isPlayerCharacter===true)).map(c=>({id:c.id,label:c.name||"PJ"}));
  if(!choices.length){showToast("Aucun PJ L5R actif dans la campagne.");return;}
  const id=await v191Pick("PJ L5R",choices);if(!id)return;
  const character=state.characters.find(c=>c.id===id);
  let ledger;try{ledger=l5rXpLedgerV139(character)}catch(e){showToast(e.message);return;}
  const menu=prompt(`Progression L5R — ${character.name} · ${ledger.available} XP disponibles
1. Gain XP
2. Dépense : compétence existante (+1)
3. Dépense : trait existant (+1)
4. Dépense libre (note sans modification de statistique)`,"1");
  if(menu===null)return;
  const modes={"1":["gain","other"],"2":["spend","skill"],"3":["spend","trait"],"4":["spend","other"]};
  const [kind,category]=modes[menu]||[];if(!kind){showToast("Choix de progression invalide.");return;}
  let key="";
  if(category==="skill"||category==="trait"){
    const labels=category==="skill"?Object.keys(character.skills||{}):SYSTEM_PROFILES.l5r1.characteristics.map(([k,label])=>k);
    const opts=labels.map(k=>({id:k,label:`${k} (actuel ${category==="skill"?Number(character.skills?.[k]??0):Number(character.characteristics?.[k]??0)})`}));
    if(category==="skill"&&!opts.length){showToast("Aucune compétence existante disponible dans la fiche.");return;}
    key=await v191Pick("Statistique à augmenter (+1)",opts);if(!key)return;
  }
  const raw=prompt(kind==="gain"?"XP gagnés (entier positif)":"Coût XP confirmé par le MJ (entier positif)","1");
  if(raw===null)return;
  const amount=Number(raw.trim());if(!Number.isSafeInteger(amount)||amount<=0){showToast("Montant entier strictement positif requis.");return;}
  const reason=prompt("Motif, séance ou évolution (historique)","");if(reason===null)return;
  const source=kind==="spend"?prompt("Source du coût (ouvrage/page ou « montant arbitré par le MJ »)","montant arbitré par le MJ"):"";
  if(source===null)return;
  let plan;try{plan=l5rXpPlanV139(character,{kind,category,key,amount,reason,source})}catch(e){showToast(e.message);return;}
  const change=plan.change?`
${plan.change.key}: ${plan.change.before} → ${plan.change.after}`:"";
  if(!confirm(`${character.name}
${kind==="gain"?"Gain":"Dépense"} ${amount} XP${change}
Nouveau solde : ${plan.ledger.available} XP.
Coût soumis à validation MJ ; pas de technique accordée automatiquement.
Confirmer l'écriture atomique fiche + historique ?`))return;
  try{await l5rXpSaveV139(character,{kind,category,key,amount,reason,source});}
  catch(e){console.error("L5R V139 progression refusée",e);showToast("Progression non enregistrée : "+e.message);}
}
