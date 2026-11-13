'use strict';
/* Banc V139, orchestration fictive indépendante ; les fonctions métier sont dans core-v139.js. */
const SYSTEM_PROFILES={l5r1:{characteristics:[['stamina','Endurance'],['willpower','Volonté'],['strength','Force'],['perception','Perception'],['agility','Agilité'],['intelligence','Intelligence'],['reflexes','Réflexes'],['awareness','Intuition'],['void','Vide']]}};
function l5rRings(characteristics){return {earth:Math.min(Number(characteristics.stamina||2),Number(characteristics.willpower||2)),water:Math.min(Number(characteristics.strength||2),Number(characteristics.perception||2)),fire:Math.min(Number(characteristics.agility||2),Number(characteristics.intelligence||2)),air:Math.min(Number(characteristics.reflexes||2),Number(characteristics.awareness||2)),void:Number(characteristics.void||2)}}
function l5rInsight(characteristics,skills){const rings=l5rRings(characteristics);return Object.values(rings).reduce((a,b)=>a+b*10,0)+Object.values(skills||{}).reduce((a,b)=>a+Number(b||0),0)}
function l5rRankForInsight(insight){const value=Number(insight||0);if(value>=226)return 5;if(value>=201)return 4;if(value>=176)return 3;if(value>=151)return 2;return 1}
function normalizedSystemKey(label){return label==='L5R'?'l5r1':'unknown'}
function profileKeyForCampaign(){return 'l5r1'}
function esc(s){return String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
const state={campaignId:'v139-campaign-test',campaign:{id:'v139-campaign-test',gameSystem:'L5R'},characters:[],session:null,scene:null};
const $=id=>document.getElementById(id);
function log(s,bad=false){$('log').textContent+=`${new Date().toLocaleTimeString('fr-FR')} ${bad?'⚠':'✓'} ${s}\n`}
function showToast(s){log(s)}
const DB_NAME='JDRRecetteV139XP';
const JDRDB=(()=>{let db=null;
 function open(){if(db)return Promise.resolve(db);return new Promise((resolve,reject)=>{const req=indexedDB.open(DB_NAME,1);req.onupgradeneeded=()=>{const d=req.result;for(const name of ['characters','history'])if(!d.objectStoreNames.contains(name))d.createObjectStore(name,{keyPath:'id'})};req.onsuccess=()=>{db=req.result;db.onversionchange=()=>{db.close();db=null};resolve(db)};req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('Ouverture IndexedDB bloquée'))})}
 async function get(store,id){const d=await open();return new Promise((res,rej)=>{const t=d.transaction([store],'readonly'),r=t.objectStore(store).get(id);r.onsuccess=()=>res(r.result||null);r.onerror=()=>rej(r.error)})}
 async function all(store){const d=await open();return new Promise((res,rej)=>{const t=d.transaction([store],'readonly'),r=t.objectStore(store).getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error)})}
 async function atomicPutRowsV106(writes){const d=await open();for(const w of writes)if(!['characters','history'].includes(w.store)||!w.value?.id)throw Error('Magasin ou identifiant invalide');return new Promise((res,rej)=>{const stores=[...new Set(writes.map(w=>w.store))];const t=d.transaction(stores,'readwrite');t.oncomplete=()=>res(writes.length);t.onerror=()=>rej(t.error||Error('Erreur transaction'));t.onabort=()=>rej(t.error||Error('Transaction annulée'));for(const w of writes)t.objectStore(w.store).put(w.value)})}
 async function reset(writes){const d=await open();return new Promise((res,rej)=>{const t=d.transaction(['characters','history'],'readwrite');t.objectStore('characters').clear();t.objectStore('history').clear();for(const w of writes)t.objectStore(w.store).put(w.value);t.oncomplete=()=>res();t.onerror=()=>rej(t.error||Error('Erreur réinitialisation'));t.onabort=()=>rej(t.error||Error('Annulation réinitialisation'))})}
 return {get,all,open,reset,atomicPutRowsV106,get storagePersistent(){return Boolean(db)},nowIso(){return new Date().toISOString()},uuid(prefix){return `${prefix}-${crypto.randomUUID()}`}}})();
async function reloadActiveCampaign(){const c=await JDRDB.get('characters','v139-test-pc');state.characters=c?[c]:[];return c}
function renderWorkspaceModule(){render()}
function render(){const c=state.characters[0];$('status').textContent=c?'IndexedDB actif · PJ fictif chargé':'IndexedDB actif · aucun PJ';$('status').className='tag ok';if(c){let led;try{led=l5rXpLedgerV139(c)}catch(e){led=null;log(e.message,true)}$('character').innerHTML=`<div><strong>${esc(c.name)}</strong> · École fictive, rang ${esc(c.systemData?.schoolRank??1)}</div><p class="subtle">Compétence Kenjutsu ${esc(c.skills?.Kenjutsu)} · Endurance ${esc(c.characteristics?.stamina)} · Insight ${esc(c.systemData?.insight??'initial non recalculé')} · Rang suggéré ${esc(c.systemData?.l5rXpSuggestedRankV139??'—')}.</p>${led?`<ul><li>Solde d'ouverture : <b>${led.openingBalance}</b></li><li>Gagnés : <b>${led.earned}</b></li><li>Dépensés : <b>${led.spent}</b></li><li>Disponibles : <b>${led.available}</b></li></ul>`:''}<p class="subtle">Le rang d'école et les techniques ne sont jamais modifiés automatiquement.</p>`}else $('character').textContent='Aucun PJ fictif créé.';JDRDB.all('history').then(rows=>{const ordered=l5rXpHistoryOrderV140(rows);$('history').innerHTML=ordered.length?ordered.map(x=>`<div class="entry"><strong>${esc(x.summary)}</strong><div class="subtle">${esc(l5rXpEvolutionLabelV140(x.progression))} · Solde ${esc(x.progression?.afterBalance)} XP · ${esc(x.progression?.source||'Récompense')}</div></div>`).join(''):'Aucun historique.'}).catch(e=>log(e.message,true));}
/* V140 : ordre de lecture XP et noms français, sans modifier les anciens enregistrements. */
function l5rXpEvolutionLabelV140(progression){
  if(!progression?.l5rV139||!progression?.change)return progression?.evolution||'';
  const change=progression.change;
  const names=SYSTEM_PROFILES.l5r1.characteristics;
  const label=change.category==='trait'?(names.find(x=>x[0]===change.key)?.[1]||change.key):change.key;
  return `${label} ${change.before} → ${change.after}`;
}
function l5rXpHistoryOrderV140(rows){
  // Ancien → récent. Les opérations déjà sauvegardées ne sont pas modifiées.
  const all=[...rows];
  const ranked=new Map(),groups=new Map();
  for(const entry of all){
    if(!entry.progression?.l5rV139)continue;
    const key=String(entry.campaignId||'')+'|'+String(entry.entityId||'');
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push(entry);
  }
  for(const entries of groups.values()){
    const byDate=new Map();
    for(const e of entries){const date=String(e.createdAt||'');if(!byDate.has(date))byDate.set(date,[]);byDate.get(date).push(e)}
    let seq=0,previousAfter=null;
    for(const date of [...byDate.keys()].sort()){
      const remaining=[...byDate.get(date)].sort((a,b)=>String(a.id||'').localeCompare(String(b.id||'')));
      while(remaining.length){
        // Un ordinal présent dans les archives nouvelles prime. Pour les anciens
        // événements ayant le même horodatage, chaîner solde après → solde avant.
        const indexed=remaining.filter(e=>Number.isSafeInteger(e.progression?.sequence)&&e.progression.sequence>0);
        let chosen;
        if(indexed.length){
          const without=remaining.filter(e=>!Number.isSafeInteger(e.progression?.sequence));
          if(without.length){chosen=pickLegacy(without,previousAfter)}
          else chosen=indexed.sort((a,b)=>a.progression.sequence-b.progression.sequence)[0];
        }else chosen=pickLegacy(remaining,previousAfter);
        ranked.set(chosen,seq++);
        const after=Number(chosen.progression?.afterBalance);
        if(Number.isFinite(after))previousAfter=after;
        remaining.splice(remaining.indexOf(chosen),1);
      }
    }
  }
  function pickLegacy(remaining,previousAfter){
    if(previousAfter!==null){const afterPrevious=remaining.find(e=>Number(e.progression?.beforeBalance)===previousAfter);if(afterPrevious)return afterPrevious}
    const head=remaining.find(e=>!remaining.some(o=>o!==e&&Number(o.progression?.afterBalance)===Number(e.progression?.beforeBalance)));
    return head||remaining[0];
  }
  return all.sort((a,b)=>{
    const cmp=String(a.createdAt||'').localeCompare(String(b.createdAt||''));
    if(cmp)return cmp;
    const ka=String(a.campaignId||'')+'|'+String(a.entityId||'');
    const kb=String(b.campaignId||'')+'|'+String(b.entityId||'');
    if(ka===kb&&ranked.has(a)&&ranked.has(b))return ranked.get(a)-ranked.get(b);
    return String(a.id||'').localeCompare(String(b.id||''));
  });
}

function fixture(){return {id:'v139-test-pc',campaignId:state.campaignId,name:'Personnage fictif V139',type:'PC',skills:{Kenjutsu:2,Enquête:1},characteristics:{stamina:2,willpower:2,strength:2,perception:2,agility:2,intelligence:2,reflexes:2,awareness:2,void:2},systemData:{schoolRank:1,experience:9},xp:9}}
async function guarded(fn){try{await fn()}catch(e){log(e?.message||String(e),true)}}
async function doProgression(input){const c=state.characters[0];if(!c)throw Error('Initialiser le PJ fictif avant les opérations');const output=await l5rXpSaveV139(c,input);log(`Écriture atomique : ${output.entry.action} · ${output.character.xp} XP disponibles.`)}
async function doExport(){const rows={characters:await JDRDB.all('characters'),history:await JDRDB.all('history')};const obj={schema:'JDR_V139_XP_BROWSER_TEST_ONLY',version:'0.20.139',rows,exportedAt:new Date().toISOString()};const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='jdr_v139_xp_test_fictif.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);log(`Export JSON généré : ${rows.characters.length} fiche(s), ${rows.history.length} événement(s). Vérifier le téléchargement.`)}
async function doImport(file){if(!file||file.size>300000)throw Error('Archive absente ou trop volumineuse');let obj;try{obj=JSON.parse(await file.text())}catch{throw Error('Fichier JSON malformé : import annulé.')};if(obj?.schema!=='JDR_V139_XP_BROWSER_TEST_ONLY'||obj?.version!=='0.20.139')throw Error('Archive non issue de la recette V139.');const r=obj.rows;if(!r||!Array.isArray(r.characters)||!Array.isArray(r.history)||r.characters.length!==1||r.history.length>100||r.characters[0].id!=='v139-test-pc'||r.characters[0].campaignId!==state.campaignId||r.history.some(x=>x.entityId!=='v139-test-pc'||x.campaignId!==state.campaignId||!x.id))throw Error('Structure des données incompatible ou non fictive');l5rXpLedgerV139(r.characters[0]);if(!confirm(`Restaurer une fiche fictive et ${r.history.length} événements ?`))return;await JDRDB.reset([...r.characters.map(value=>({store:'characters',value})),...r.history.map(value=>({store:'history',value}))]);await reloadActiveCampaign();render();log('Import atomique effectué : fiche et historique restaurés.')}
async function runDiagnostics(){const results=[];const check=async(label,fn)=>{try{await fn();results.push({label,ok:true})}catch(e){results.push({label,ok:false,error:e.message})}};await check('IndexedDB natif',async()=>{await JDRDB.open()});await check('Fiche présente dans la bonne campagne',async()=>{const c=await JDRDB.get('characters','v139-test-pc');if(!c||c.campaignId!==state.campaignId)throw Error('Fiche absente')});await check('Solde XP cohérent',async()=>{const l=l5rXpLedgerV139(state.characters[0]);if(l.openingBalance+l.earned-l.spent!==l.available)throw Error('Incohérent')});await check('Coût supérieur au solde refusé',async()=>{const l=l5rXpLedgerV139(state.characters[0]);try{l5rXpPlanV139(state.characters[0],{kind:'spend',category:'other',amount:l.available+1,source:'MJ'})}catch{return}throw Error('Coût accepté à tort')});await check('Coût fractionnaire refusé',async()=>{try{l5rXpPlanV139(state.characters[0],{kind:'gain',amount:1.5})}catch{return}throw Error('Montant accepté à tort')});await check('Compétence inconnue refusée',async()=>{try{l5rXpPlanV139(state.characters[0],{kind:'spend',category:'skill',key:'Inconnue',amount:1,source:'MJ'})}catch{return}throw Error('Stat absente acceptée')});await check('Pas de gain automatique de techniques',async()=>{const p=l5rXpPlanV139(state.characters[0],{kind:'spend',category:'skill',key:'Kenjutsu',amount:1,source:'MJ'});if(p.next.systemData.schoolRank!==state.characters[0].systemData.schoolRank||p.next.systemData.techniquesText!==state.characters[0].systemData.techniquesText)throw Error('Changement de rang/technique non désiré')});await check('Historique XP lié et documenté',async()=>{const rows=await JDRDB.all('history');if(rows.some(x=>x.campaignId!==state.campaignId||!x.progression?.l5rV139||!['L5R_XP_GAIN','L5R_XP_SPEND'].includes(x.action)))throw Error('Historique incorrect')});$('diagnostics').textContent=results.map(x=>(x.ok?'✓':'✗')+' '+x.label+(x.error?' — '+x.error:'')).join('\n')+'\n\n'+results.filter(x=>x.ok).length+'/'+results.length+' réussis';log('Diagnostics : '+results.filter(x=>x.ok).length+'/'+results.length);return results}
window.addEventListener('DOMContentLoaded',async()=>{try{await JDRDB.open();await reloadActiveCampaign();render();log('Banc de recette V139 prêt : base IndexedDB dédiée.')}
 catch(e){$('status').textContent='Erreur stockage';$('status').className='tag err';log(e.message,true)}
 $('init').onclick=()=>guarded(async()=>{if(!confirm('Réinitialiser les données exclusivement fictives de ce banc ?'))return;await JDRDB.reset([{store:'characters',value:fixture()}]);await reloadActiveCampaign();render();log('PJ fictif réinitialisé : 9 XP, Kenjutsu 2.')});
 $('gain').onclick=()=>guarded(()=>doProgression({kind:'gain',amount:6,reason:'Récompense de séance fictive'}));
 $('skill').onclick=()=>guarded(()=>doProgression({kind:'spend',category:'skill',key:'Kenjutsu',amount:4,reason:'Entraînement fictif',source:'montant arbitré par le MJ'}));
 $('trait').onclick=()=>guarded(()=>doProgression({kind:'spend',category:'trait',key:'stamina',amount:7,reason:'Entraînement fictif',source:'montant arbitré par le MJ'}));
 $('over').onclick=()=>guarded(()=>doProgression({kind:'spend',category:'other',amount:99,reason:'Doit échouer',source:'MJ'}));
 $('reload').onclick=()=>location.reload();$('tab').onclick=()=>window.open(location.href,'_blank','noopener');$('export').onclick=()=>guarded(doExport);$('import').onchange=()=>guarded(async()=>{try{await doImport($('import').files[0])}finally{$('import').value=''}});$('diag').onclick=()=>guarded(runDiagnostics);
});