"use strict";
/* Exact function excerpts from the user's V0.20.137 source. Synthetic public test only. */
(() => {
function l5rOccupationValues(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value === null || value === undefined || value === "") return [];
  return [value];
}

function l5rIsTogashiSchool(profession){ return profession==="togashi_monk"; }

function l5rTattooOptionsPreservingHistoryV137(baseOptions, savedValues=[]) {
  const originals=Array.isArray(baseOptions)?baseOptions:[];
  const saved=[...new Set(l5rOccupationValues(savedValues).map(String).filter(Boolean))];
  const present=new Set(saved);
  const legacySakura="Fleur de cerisier", currentSakura="Fleur de cerisier / Sakura";
  const hasLegacy=present.has(legacySakura), hasCurrent=present.has(currentSakura);
  const out=originals.map(([value,label])=>{
    if(value===currentSakura && hasLegacy && !hasCurrent)
      return [legacySakura,`${label} — libellé historique conservé, validation MJ`];
    if(value===currentSakura && hasLegacy && hasCurrent)
      return [value,`${label} — autre graphie historique également enregistrée, validation MJ`];
    return [value,label];
  });
  const seen=new Set(out.map(([value])=>value));
  for(const value of saved){
    if(seen.has(value))continue;
    out.push([value,`${value} — valeur historique hors catalogue, validation MJ`]);
    seen.add(value);
  }
  return out;
}

function l5rTattooAccessV02022(ctx={}){
  return l5rIsTogashiSchool(ctx.profession)||ctx.l5rTattooHistoricalAccess==="historical";
}
window.JDRTattooCoreV137=Object.freeze({l5rOccupationValues,l5rIsTogashiSchool,l5rTattooOptionsPreservingHistoryV137,l5rTattooAccessV02022});
})();