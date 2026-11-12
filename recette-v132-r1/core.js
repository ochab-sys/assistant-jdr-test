/* V0.20.132 — fonctions sélectionnées du vrai code V0.20.130 (js/app.js),
   sans corpus, profils de personnages, ni texte de règles.
   Signatures/fonctions reproduites sans changement ; enveloppe de test V132 ajoutée. */
const JDRCore = (() => {
  const state = { campaign:null, selectedSystem:"l5r1" };
function normalizedSystemKey(value){
  const system=String(value||"").toLowerCase();
  if(system.includes("l5r")||system.includes("l5a")||system.includes("legend")||system.includes("cinq anneaux")) return "l5r1";
  // V0.20.97 — D&D devient l’unique famille active : les anciennes valeurs AD&D sont migrées vers D&D.
  if(system.includes("ad&d")||system.includes("adnd")||system.includes("advanced dungeons")) return "adnd";
  if(system.includes("d&d")||system.includes("dnd")||system.includes("dungeons")) return "dnd5";
  if(system.includes("vampire")) return "vampire2";
  if(system.includes("ward")||system.includes("w.a.r.d")) return "ward";
  return "l5r1";
}

function selectedSystemKey(){ return state.selectedSystem || normalizedSystemKey(state.campaign?.gameSystem); }

function campaignMatchesSelectedSystem(c){ return normalizedSystemKey(c?.gameSystem)===selectedSystemKey(); }

function profileKeyForCampaign(campaign = state.campaign) {
  if (!campaign) return selectedSystemKey();
  const raw=String(campaign?.gameSystem||"");
  if(!raw.trim()) return selectedSystemKey();
  return normalizedSystemKey(raw);
}

function combatV2078Health(c){
  const sd=c?.systemData||{};
  if(profileKeyForCampaign()==="dnd5") return {current:Number(sd.hpCurrent??sd.hpMax??0)||0,max:Number(sd.hpMax??sd.hpCurrent??0)||0,label:"PV"};
  if(profileKeyForCampaign()==="vampire2") return {current:Number(sd.healthCurrent??sd.health??7)||7,max:Number(sd.healthMax??7)||7,label:"Santé"};
  const max=Number(sd.healthMax??sd.hpMax??c.healthMax??10)||10;
  return {current:Number(sd.healthCurrent??sd.hpCurrent??c.healthCurrent??max),max,label:"Santé"};
}

function combatV2078InitiativeDefault(c){
  const key=profileKeyForCampaign(), ch=c?.characteristics||{};
  if(key==="dnd5") return Math.floor(((Number(ch.dexterity)||10)-10)/2);
  if(key==="vampire2") return (Number(ch.wits)||0)+(Number((c.skills||[]).find(x=>String(x.name||x.skill||"").toLowerCase().includes("vigilance"))?.rank)||0);
  return 0;
}

function combatV2078Order(c){
  return [...(c.combatants||[])].filter(x=>!x.removed).sort((a,b)=>(Number(b.initiative)||0)-(Number(a.initiative)||0)||((a.side==="pc")?-1:1)-((b.side==="pc")?-1:1)||String(a.name).localeCompare(String(b.name),"fr"));
}

function combatV2078Active(c){
  const rows=combatV2078Order(c); if(!rows.length)return null;
  c.turnIndex=Math.max(0,Math.min(Number(c.turnIndex)||0,rows.length-1));
  return rows[c.turnIndex]||null;
}

  return {state,normalizedSystemKey,selectedSystemKey,campaignMatchesSelectedSystem,profileKeyForCampaign,
          combatV2078Health,combatV2078InitiativeDefault,combatV2078Order,combatV2078Active};
})();