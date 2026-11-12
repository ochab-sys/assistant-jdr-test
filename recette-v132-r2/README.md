# Assistant JDR V0.20.132-R2 — correctifs de recette scènes et combats

**Statut :** candidat à la vérification navigateur par Work ; non validé en navigateur réel.

URL : `https://ochab-sys.github.io/assistant-jdr-test/recette-v132-r2/`

**Correctif ciblé V132-01 (P1, rapport Work du 12/11/2026)** : bouton « Activer » sur la scène B désormais lié à la référence `campaign.currentSceneId`, à `campaign.currentGameTime` et au statut des scènes dans **une seule transaction multi-magasins IndexedDB**. L'ancienne scène active passe à « prévue » ; les scènes achevées restent inchangées. La vraie scène courante est clairement identifiée dans la liste.

Le même invariant s'applique lorsqu'une scène est enregistrée avec le statut « Active ». Si l'on édite la scène courante pour la mettre en « Prévue » ou « Terminée », le pointeur `currentSceneId` est vidé atomiquement : l'heure de jeu de campagne n'est pas effacée. Le démarrage d'un combat préfère la référence `currentSceneId` au premier statut « Active », afin de réduire le risque de confusion dans des données anciennes.

Deux nouveaux tests de diagnostic : le premier exécute la bascule A → B, puis relit campagne et scènes depuis le stockage ; le second vérifie la cohérence de **toutes les campagnes fictives déjà enregistrées**. Les diagnostics doivent atteindre **12/12** après réparation des données anciennes. Après clic « Activer », la bascule est aussi vérifiable par rechargement et export JSON. Les archives restent au format `JDR_V132_FUNCTIONAL_TEST_ONLY` / `0.20.132` pour permettre la reprise des données fictives V132.

Cette nouvelle page partage la même base IndexedDB fictive `JDRRecetteV132` que la V132 précédente, si Work l'ouvre dans le même navigateur/origine. **Ne pas saisir de données réelles**. L'ancienne page `/recette-v132/` reste inchangée et conserve le défaut V132-01.

Limites : pas de validation de l'interface réelle V130, des règles officielles, de la sécurité des vues joueurs, ni de deux écritures strictement simultanées ; les tests Node sont des tests de régression simulant le contrat de stockage, pas des essais réels en navigateur. Le stockage de combat demeure limité à la recette.

## Recette Work conseillée

1. Ouvrir le correctif et noter IndexedDB, le nombre de campagnes et les données déjà présentes.
2. Dans L5R, sélectionner la deuxième scène fictive (la créer si elle n'existe pas) et cliquer « Activer / Réactiver ». Vérifier qu'elle seule est active et porte le badge **Scène courante**. Vérifier l'heure courante si la scène a 08:00.
3. Recharger, puis exporter JSON et vérifier `campaign.currentSceneId === sceneB.id`, `currentGameTime === "08:00"`, `sceneA.status !== "active"`, `sceneB.status === "active"`.
4. Basculer vers A, recharger et vérifier la nouvelle cohérence. Vérifier que la scène B garde ses participants et sa description.
5. Modifier une scène non courante pour la rendre « Active » depuis l'éditeur : ce doit être l'unique scène courante après rechargement.
6. Modifier la scène courante en « Terminée » : elle doit perdre le statut courant sans changer les contenus ou participants.
7. Lancer les diagnostics : cible **12/12**. Vérifier les régressions Vampire et un export/import de sauvegarde fictive.
8. Rapporter tout échec, erreur JavaScript et comportement contradictoire, sans modifier GitHub.
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


## Addendum R2 — V132-02 premier tour à zéro

Work a détecté le 12 novembre 2026, lors d'une seconde passe sur **l'ancienne URL `recette-v132/`**, qu'un PJ Vampire à 0/7 santé pouvait être étiqueté « TOUR ACTIF » au round 1 lors d'une égalité d'initiative. La R1 n'était **pas** l'URL réellement utilisée ; cette passe ne permet donc pas de conclure à l'échec de R1 sur la scène courante.

La R2 inclut en plus de la correction P1 R1 :

- Sélection initiale du **premier combattant apte** selon l'ordre d'initiative.
- Même prédicat d'éligibilité lors du premier tour, du rendu et du passage au tour suivant.
- Si le combattant courant tombe à zéro en cours de combat, il n'est plus marqué « TOUR ACTIF » ; le MJ peut passer au tour suivant ou soigner.
- Si tous sont à zéro, le début du combat est refusé avec un message explicite.
- Nouveau diagnostic, pour un total cible de **12/12** contrôles.

**Work doit impérativement ouvrir la nouvelle URL `recette-v132-r2/`, et lire la version R2 dans l'entête avant tout test.**

La base IndexedDB fictive `JDRRecetteV132` est partagée avec V132 et R1. Avant le diagnostic de cohérence des scènes, activer successivement deux scènes dans L5R afin de réparer les anciens statuts actifs. Le format d'archive de recette reste V132 ; ne jamais y injecter des campagnes réelles. L'interface est un banc de recette, pas le produit complet.