# Assistant JDR — Recette V136-01 (sorts historiques), **banc HTTPS expurgé**

## Pourquoi ce banc existe

Work n'a pas pu ouvrir le fichier complet privé `Assistant_JDR_V0_20_136_LOCALE_MJ_PORTABLE.html` : `file://` est rejeté avant exécution du JavaScript. Un second essai Chromium local a également été refusé par l'environnement. Ce refus ne démontre pas de défaut de l'application.

La recette ci-présente **n'est pas l'application complète**. Elle est une page Web distincte, ne contenant que six fonctions extraites du véritable `js/app.js` V136 (empreintes SHA-256 dans `SOURCE_MAP.json`), **deux enregistrements de catalogue fictifs** et une fiche PJ inventée. Elle n'embarque ni corpus officiel, ni sort officiel avec effet, ni PDF, ni historique réel, ni sauvegarde de campagne privée.

## Fonctionnalités

- V136-01 : `l5rSpellOptions` conserve le nom déjà sélectionné « Essence de la Terre » lorsqu'il n'est pas dans le petit catalogue de recette ; l'option mentionne `conservé dans la fiche` et `validation MJ requise`.
- `l5rSpellSelectionStatus` avertit qu'un sort inconnu est conservé, **non comptabilisé**. Les règles de quota utilisées par ce banc sont inventées, non canoniques.
- Fiche synthétique limitée : nom, note et cases de sorts. Enregistrement dans IndexedDB sous le nom isolé `JDRRecetteV136Sorts`, persistance au rechargement et entre deux onglets.
- Export/import JSON strictement réservé à ce seul banc de test (`JDR_V136_SPELLS_SYNTHETIC_ONLY`). Aucun export V130/V136 réel ne peut être importé.
- 9 diagnostics intégrés à exécuter dans Work. Ils ne couvrent pas l'intégration du formulaire PJ original.

## Protocole Work

1. Ouvrir l'URL HTTPS dédiée à la recette V136-01, contrôler le titre de la page.
2. Cliquer **Créer / réinitialiser les données fictives** et **Exécuter les contrôles** : attendre 9/9.
3. Contrôler que « Essence de la Terre » est cochée, indique `conservé dans la fiche`, `validation MJ requise`, et est signalée comme non comptabilisée.
4. Modifier le nom fictif, sans modifier les cases cochées ; enregistrer, recharger, contrôler que le sort historique reste enregistré et affiché.
5. Exporter le JSON réellement téléchargé, modifier le nom, réimporter l'export, recharger et retrouver le nom et la liste de sorts d'origine.
6. Tenter un JSON malformé ou incompatible et contrôler l'absence de mutation du PJ.
7. Vérifier qu'une désélection **explicite** du sort historique est respectée après enregistrement, sans réintroduction lors de l'édition suivante.
8. Deuxième onglet : réactiver le sort après désélection sur le premier, enregistrer ; recharger le second, retrouver le changement.
9. Remettre les données fictives à leur état initial si utile ; rapporter succès/échec et logs console.

## Limitations impératives

- Le navigateur Work ne teste **pas** la véritable interface complète V136 : ses écoles, tatouages, sauvegardes globales, combats et toutes les règles restent à tester en environnement privé autorisé.
- La règle et les enregistrements de catalogue du banc sont artificiels ; le test ne valide aucune mécanique officielle L5R ni correspondance bibliographique.
- Il ne faut jamais saisir ou importer de données personnelles dans ce banc **public**.
- Les fonctions source exactes proviennent du code privé, sans embarquer les données documentaires et personnelles de l'application.
- Aucun dépôt GitHub privé ni archive de référence ne doit être modifié par Work.