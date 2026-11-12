# Assistant JDR — Banc HTTPS V137-01 : conservation des tatouages historiques L5R

Date : 12 novembre 2026. **Candidat à une recette navigateur Work, non validé en navigateur.**

Adresse prévue : `https://ochab-sys.github.io/assistant-jdr-test/recette-v137-tatouages/`

## Périmètre réel

- **4 fonctions exactes extraites du code privé V0.20.137** dans `core-v137.js` ; leurs empreintes SHA256 sont consignées dans `SOURCE_MAP.json`.
- L'interface `index.html`, le contrôleur `app.js` et le CSS sont **nouveaux, spécifiques au banc**. Ils ne reproduisent pas les formulaires de l'application complète.
- Une seule fiche fictive ; **trois options de catalogue simplifiées**, et un tatouage inventé hors catalogue. Aucun effet mécanique, PDF, corpus, personnalité de la campagne ni import d'archives privées.
- IndexedDB isolé `JDRRecetteV137Tatouages` avec un magasin `characters`. Seuls les objets marqués `testOnly: true` et portant l'identifiant fixe de test sont écrits/importés.
- Export JSON `JDR_V137_TATTOOS_PUBLIC_TEST_ONLY`, **incompatible avec les sauvegardes de l'application complète**.
- Aucune authentification : site public, **ne pas saisir de données réelles**. La démo est une vérification du comportement des fonctions et de la persistance, pas de la sécurité des secrets MJ.

## Reprise des tests

1. Vérifier l'en-tête **V137-01** et la base IndexedDB active.
2. Initialiser le scénario **Ancien Sakura + tatouage TEST hors catalogue**.
3. Vérifier trois tatouages cochés : `Fleur de cerisier`, `Tatouage TEST ancien hors catalogue`, `Maranta`. Les deux anciens portent un avertissement MJ ; **ne pas ajouter** une seconde case `Fleur de cerisier / Sakura`.
4. Lancer les diagnostics intégrés **12/12**.
5. Modifier uniquement le nom (toujours `TEST ...`), enregistrer, recharger : vérifier les trois tatouages intacts et la révision incrémentée.
6. Changer l'école en `Mirumoto`, enregistrer, recharger : les tatouages restent dans la fiche mais l'accès mécanique est explicitement non accordé.
7. Revenir à `Togashi`, puis **retirer volontairement** le tatouage ancien Sakura. Sauver et recharger : il ne réapparaît pas.
8. Tester le scénario **Deux graphies Sakura déjà présentes** : vérifier que les deux enregistrements existants sont préservés, **sans les dédupliquer silencieusement**.
9. Exporter réellement un JSON, modifier la fiche, réimporter, recharger et comparer les enregistrements (hors date d'export).
10. Tenter un JSON malformé et un JSON d'autre schéma : vérifier refus sans modification des données.
11. Modifier nom/note depuis un **second onglet** et vérifier la propagation après rechargement du premier. Ce n'est pas un test d'écritures strictement simultanées.
12. Contrôler la console JS et distinguer erreurs de validation attendues, erreurs d'extension et erreurs applicatives inattendues.

**Rapport :** par test, réussi / échoué / non réalisable, valeurs observées, erreur console et capture si disponible. Ne pas annoncer une validation de la V137 complète.

## Tests techniques préparatoires

- `node --test l5r-tattoo-history-v137.test.cjs` sur les sources privées : **16/16** réussis.
- `node --test fixture.test.cjs` sur le banc : **12/12** réussis.
- `node --check` sur les deux JS du banc : syntaxe conforme.

L'intégration complète des fiches PJ/PNJ, écoles, droits, styles, import V136/V137, confidentialité et autres jeux reste non validée en navigateur.