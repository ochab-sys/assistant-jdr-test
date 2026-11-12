# Assistant JDR — V0.20.131-P0 — Recette navigateur publique expurgée

## Objectif et provenance
Banc de recette technique du module de stockage JavaScript réel extrait de la V0.20.130 corrigée P0 A01/A02 (11 novembre 2026). Le schéma, les appels IndexedDB et la logique de fallback localStorage sont conservés. Seul l'identifiant de la base, la clé localStorage et le verrou ont été renommés pour ne pas accéder aux données existantes du site GitHub Pages. Les fonctions historiques `seedDemoData` et `ensureDemoScenes` (susceptibles de contenir des informations de campagne) ont été retirées. Toute donnée saisie dans cette recette est une donnée d'essai publique ou locale, jamais une campagne personnelle.

**Ce n'est pas une distribution de l'application Assistant JDR complète.** Ce banc permet la vérification P0 du stockage en navigateur réel, pas la validation des écrans L5R, des mécaniques, des PDF ni de la confidentialité de l'architecture MJ/joueurs. La vue joueur est un simple filtrage de l'affichage : elle n'offre **aucune sécurité** contre l'accès aux données sur la même origine.

## Protocole Work recommandé
1. Ouvrir l'URL `/assistant-jdr-test/recette-v131/` avec un profil navigateur privé propre.
2. Noter le backend indiqué : **IndexedDB** est requis pour valider le stockage natif.
3. Cliquer « Créer données fictives », puis « Modifier note test » deux fois ; noter la révision obtenue.
4. Cliquer « Recharger la page », vérifier que la révision n'est pas revenue à zéro.
5. Cliquer « Exécuter les tests » : capturer les résultats (5 tests), le journal et les éventuelles erreurs de console.
6. Exporter le JSON fictif, vérifier qu'un téléchargement réel a lieu et que le contenu est conforme au schéma `JDR_V131_BROWSER_TEST_ONLY`.
7. Modifier la note, puis réimporter le JSON exporté. Vérifier que la révision exportée est restaurée.
8. Ouvrir un second onglet, modifier la note depuis le second, recharger le premier : vérifier la propagation des changements.
9. Ouvrir la vue joueur, noter qu'elle n'affiche qu'une sélection de champs fictifs. **Ne pas déclarer l'isolation des secrets MJ validée** : les données de l'origine restent accessibles depuis les outils de développement.
10. Fournir un rapport distinguant « validé navigateur », « échec », et « non testé ». Ne saisir aucune information réelle.

## Publication
Seulement `index.html`, `app.js`, `db.js`, `README.md` et `MANIFEST.json`, publiés dans un dossier distinct. Aucune source PDF ni référence textuelle aux campagnes d'utilisateur. Pas de changement aux fichiers existants à la racine du dépôt.