# Assistant JDR V0.20.132 — recette fonctionnelle ciblée (publique et expurgée)

**Date :** 12 novembre 2026. **Statut :** candidature au test Work ; aucune validation d'ensemble.

Site GitHub Pages : `https://ochab-sys.github.io/assistant-jdr-test/recette-v132/`

## Ce qui est réellement repris de V130

- `db.js` est le moteur de stockage V131-P0 déjà passé en recette navigateur, dérivé du code V130 : **17 magasins IndexedDB** (nom de base isolée `JDRRecetteV132`). Les exemples d'amorçage L5R privés sont retirés.
- `core.js` contient **huit fonctions exactes de V130** : normalisation du système, contexte de campagne, santé/initiative, ordre et tour actif du combat. Liste des signatures et SHA256 dans `SOURCE_MAP.json`.
- Les enregistrements utilisent **les noms de magasins et les principaux champs des fiches V130** : `campaigns`, `characters`, `scenes`, `campaignId`, `systemKey`, `type`, `characteristics` et `skills` sous forme d'objet, `systemData`, `characterIds`.
- La présente interface `index.html`, `style.css` et l'orchestration `app.js` sont **nouvellement écrites pour la recette**, elles ne représentent pas les écrans originaux V130.

## Fonctionnalités testables

1. Amorcer quatre campagnes fictives L5R, D&D, Vampire, WARD (huit personnages et quatre scènes).
2. Sélectionner la campagne et constater la séparation des fiches/scènes.
3. Créer, modifier, archiver des PJ/PNJ ; consulter fiche rapide, fiche détaillée et biographie.
4. Créer/modifier/activer des scènes et choisir les personnages présents.
5. Démarrer un combat avec les participants, modifier santé et initiative, passer les tours et réinjecter les états dans les fiches lors de la clôture.
6. Exporter et restaurer un JSON **V132 seulement**, tester les refus d'archives invalides ou mélangeant deux systèmes.
7. Exécuter les contrôles techniques intégrés ; recharger ; utiliser un second onglet.

## Anomalies détectées dans le code d'origine V130

La fonction V130 `combatV2078Health` utilise `Number(... ) || 7` pour Vampire ; une santé nulle repasse artificiellement à 7. La fonction `combatV2078InitiativeDefault` appelle `.find()` sur `c.skills`, alors que `readSkillsEditor` renvoie un objet — ce qui provoque une erreur sur Vampire. La V132 utilise un **adaptateur de protection explicite** dans `app.js`, sans modifier la fonction d'origine conservée dans `core.js`. Ces défauts doivent être corrigés et testés sur l'application complète.

## Limitations et précautions

- Aucun PDF, corpus, liste officielle de sorts, texte de techniques, tatouage officiel, scénario, PNJ personnel ou sauvegarde privée n'est inclus. Le « tatouage fictif TEST » n'est pas une règle L5R.
- **Ne jamais saisir ni importer des données de campagne réelles** sur cette version publique.
- Les tests V132 **ne prouvent pas la sécurité d'une vue joueur**. Tous les champs fictifs sont sur la même origine de navigateur, et ne seraient pas cloisonnés contre un utilisateur ayant accès aux outils de développement.
- Les archives V132 ne sont **pas compatibles V130**, et l'export porte uniquement sur campagnes, personnages et scènes : ni le combat en cours ni l'historique technique n'y figurent.
- L'import V132 écrase les entrées portant des identifiants existants, mais ne supprime pas les entrées locales absentes de l'archive.
- Les écritures réellement simultanées inter-onglets, l'utilisation hors ligne, la compatibilité multi-versions et les règles de jeu restent hors périmètre.
- L'environnement local Chromium de l'assistant bloque toute navigation (`ERR_BLOCKED_BY_ADMINISTRATOR`), même sur URL `data:` : **tests navigateur réels à réaliser via Work**.

## Protocole Work souhaité

1. Ouvrir l'URL V132, vérifier l'absence d'erreur JS et le statut IndexedDB.
2. Cliquer **Créer 4 campagnes fictives**, puis effectuer les opérations des sept points ci-dessus sur chaque système.
3. Vérifier les statistiques et compétences persistantes après rechargement, notamment un Vampire avec 0 Santé et Vigilance:2.
4. Démarrer/terminer un combat, changer les PV, confirmer leur réinjection dans la fiche après rechargement.
5. Exporter JSON, modifier une fiche, réimporter, constater la restauration ; tester un JSON malformé et un mélange inter-systèmes ; vérifier absence de mutation après refus.
6. Ouvrir un second onglet et vérifier le comportement. Les changements instantanés inter-onglets ne sont pas garantis ; tester après rechargement du premier onglet.
7. Rapporter réussites, échecs, anomalies console, captures et limites. Ne modifier aucun dépôt.

**Rapport attendu :** *recette ciblée V132* uniquement, jamais validation globale de l'application Assistant JDR.