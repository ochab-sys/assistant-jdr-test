"use strict";
// Fonctions EXACTES extraites de V136, avec définitions de catalogue factices.
// Données fictives : ce n'est PAS le catalogue L5R. N'inclut aucun effet de sort.
const L5R_SPELL_CATALOG = Object.freeze([
  {name:"Sensation", element:"Commun", mastery:1},
  {name:"TEST_SORT_CATALOGUE", element:"Air", mastery:1}
]);
const L5R_SPELL_BY_NAME = Object.fromEntries(L5R_SPELL_CATALOG.map(x=>[x.name,x]));
const L5R_SPELL_START_RULES = Object.freeze({test_shugenja:{common:["Sensation"],counts:{Air:1}}});

function l5rOccupationValues(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value === null || value === undefined || value === "") return [];
  return [value];
}

function l5rIsIshikenSchool(profession){ return profession==="isawa_ishiken"; }

function l5rSpellAccessAllowed(spell, profession){
  if(!spell) return true;
  if(spell.access==="ishiken") return l5rIsIshikenSchool(profession);
  if(spell.access==="kuni") return profession==="kuni_shugenja";
  if(spell.access==="mj") return false;
  return true;
}

function l5rSpellStartAllowedElementsV02035(profession){
 const r=L5R_SPELL_START_RULES?.[profession];
 if(r?.counts)return new Set(["Commun",...Object.keys(r.counts)]);
 if(r?.flex)return new Set(["Commun","Terre","Eau","Feu","Air"]);
 if(r?.ishiken)return new Set(["Commun","Vide","Terre","Eau","Feu","Air"]);
 return null;
}

function l5rSpellOptions(baseOptions, profession, schoolRank=1, selectedValues=[], acquisitionMode="creation"){
  const merged=new Map(),allowed=acquisitionMode==="creation"?l5rSpellStartAllowedElementsV02035(profession):null;
  for(const spell of L5R_SPELL_CATALOG){
    const selected=new Set(l5rOccupationValues(selectedValues));
    if(!l5rSpellAccessAllowed(spell,profession) && !selected.has(spell.name)) continue;
    const outsideCreation=allowed && !allowed.has(spell.element);
    if(outsideCreation && !selected.has(spell.name)) continue;
    // Important : la Maîtrise n'est PAS comparée au rang d'école.
    // Un sort déjà enregistré reste visible lors d'un changement de mode afin d'éviter toute perte silencieuse.
    const restriction=spell.restriction?` · ${spell.restriction}`:"";
    const retained=outsideCreation?" · conservé (hors répartition de création)":"";
    merged.set(spell.name,[spell.name,`${spell.name} — ${spell.element}${spell.mastery?` · Maîtrise ${spell.mastery}`:""}${restriction}${retained}`]);
  }
  // V136 — ne jamais perdre silencieusement un sort déjà attribué à un personnage.
  // La bibliothèque historique ne contient pas encore tous les noms du grimoire V130.
  // Ces noms hérités restent affichés, mais n'acquièrent AUCUNE mécanique de résolution.
  for(const oldName of l5rOccupationValues(selectedValues)){
    if(typeof oldName!=="string" || !oldName.trim() || merged.has(oldName)) continue;
    merged.set(oldName,[oldName,`${oldName} — conservé dans la fiche (absent de la bibliothèque de jeu ; validation MJ requise)`]);
  }
  const order={Commun:0,Terre:1,Eau:2,Feu:3,Air:4,Vide:5};
  return [...merged.values()].sort((a,b)=>{
    const A=L5R_SPELL_BY_NAME[a[0]],B=L5R_SPELL_BY_NAME[b[0]];
    return (order[A?.element]??9)-(order[B?.element]??9)||(A?.mastery??99)-(B?.mastery??99)||a[0].localeCompare(b[0],"fr");
  });
}

function l5rSpellSelectionStatus(profession,names,ctx={}){
  const rule=L5R_SPELL_START_RULES[profession];
  if(!rule) return {ok:true,text:"Aucun quota de départ documenté pour cette école dans le registre actuel."};
  const selected=new Set(names||[]), missing=(rule.common||[]).filter(x=>!selected.has(x));
  const counts={Terre:0,Eau:0,Feu:0,Air:0,Vide:0,Commun:0};
  for(const n of selected){ const sp=L5R_SPELL_BY_NAME[n]; if(sp&&counts[sp.element]!==undefined) counts[sp.element]++; }
  const problems=[];
  // V136 — ne pas déclarer un quota conforme lorsqu'un nom non lié au catalogue
  // est présent : il reste mémorisé mais non homologué / non comptabilisé.
  const unavailable=[...selected].filter(x=>!L5R_SPELL_BY_NAME[x]);
  if(unavailable.length) problems.push(`sorts hérités absents de la bibliothèque de jeu (conservés, non comptabilisés, à vérifier) : ${unavailable.join(", ")}`);
  if(missing.length) problems.push(`obligatoires manquants : ${missing.join(", ")}`);
  if(rule.counts) for(const [el,n] of Object.entries(rule.counts)) if(counts[el]!==n) problems.push(`${el} : ${counts[el]}/${n}`);
  if(rule.flex){
    const vals=[counts.Terre,counts.Eau,counts.Feu,counts.Air].filter(n=>n>0).sort((a,b)=>b-a);
    if(vals.length!==3 || vals[0]!==3 || vals[1]!==2 || vals[2]!==1) problems.push(`Isawa : répartition élémentaire attendue 3/2/1 sur trois éléments différents (actuel ${vals.join("/")||"0"})`);
  }
  if(rule.tensai){
    const primary=ctx.l5rTensaiElement||"", elemental=["Terre","Eau","Feu","Air"];
    if(!elemental.includes(primary)) problems.push("Tensai : choisir l’élément de spécialisation");
    else {
      if(counts[primary]!==2) problems.push(`Tensai ${primary} : ${counts[primary]}/2 sorts de l’élément primaire`);
      const sec=elemental.filter(el=>el!==primary&&counts[el]>0);
      if(sec.length!==1||sec.reduce((n,el)=>n+counts[el],0)!==1) problems.push("Tensai : choisir exactement 1 sort d’un élément secondaire");
    }
  }
  if(rule.ishiken){
    const nonVoid=[counts.Terre,counts.Eau,counts.Feu,counts.Air].filter(n=>n>0).sort((a,b)=>b-a);
    if(nonVoid.length!==2 || nonVoid[0]!==2 || nonVoid[1]!==1) problems.push(`Ishiken : 2 sorts d’un élément + 1 d’un troisième élément (actuel ${nonVoid.join("/")||"0"})`);
  }
  return {ok:problems.length===0,text:problems.length?`Sélection de départ à vérifier — ${problems.join(" ; ")}`:"Sélection de départ conforme au quota documenté de l’école."};
}

window.V136Core=Object.freeze({l5rSpellOptions,l5rSpellSelectionStatus,l5rOccupationValues});