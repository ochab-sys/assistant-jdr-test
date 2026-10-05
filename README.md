## V0.20.40 — Préparation recette navigateur / Work

Cette version ne modifie pas les règles de jeu : elle fige la V0.20.38 comme base de recette et ajoute au README le protocole de test navigateur V0.20.40. Le plan complet est également livré séparément pour être utilisé comme instruction de travail dans Work.

# Assistant JDR — Plan de recette Work — V0.20.40

## Objectif
Tester réellement l'application dans un navigateur, en interaction, avec contrôle fonctionnel et visuel. Ne pas se limiter à vérifier que la page s'ouvre.

## Règles de test
- Ouvrir d'abord l'HTML portable.
- Tester ensuite `jdr-assistant/index.html` extrait du ZIP.
- Ne pas modifier les données de référence avant d'avoir reproduit un défaut.
- Pour chaque anomalie : noter système, écran, action exacte, résultat obtenu, résultat attendu, gravité, et faire une capture.
- Refaire le test après chaque correction.
- Vérifier qu'une correction L5R ne casse pas D&D, AD&D, Vampire ou W.A.R.D.
- Contrôler au minimum une largeur bureau normale et une fenêtre de navigateur plus étroite.

## 1. Démarrage et navigation générale
1. Ouvrir l'application sans campagne.
2. Vérifier l'affichage initial, le système sélectionné et tous les boutons principaux.
3. Changer successivement de système : D&D5, D&D5.5, AD&D, Vampire V2, L5R 1e, W.A.R.D.
4. Vérifier que les modules disponibles suivent le système choisi.
5. Créer une campagne, la fermer, puis revenir au JDR : le système sélectionné doit rester cohérent.
6. Recharger la page et vérifier la persistance.
7. Tester Diagnostic Assistant JDR.
8. Vérifier qu'aucune erreur JavaScript visible ne survient pendant les parcours.

## 2. Fenêtres, panneaux et ergonomie
Pour chaque écran et modale :
- ouverture et fermeture ;
- bouton Retour ;
- bouton Annuler ;
- validation ;
- ascenseurs verticaux/horizontaux ;
- aucun contenu hors fenêtre ;
- aucun bouton inaccessible ;
- aucune superposition de texte ;
- labels alignés avec les champs ;
- champs longs utilisables ;
- listes déroulantes entièrement visibles ;
- comportement après redimensionnement de la fenêtre ;
- conservation des données lors d'une réouverture.

## 3. Création et modification de personnages
Pour chaque système :
1. Créer un PJ.
2. Créer un PNJ.
3. Modifier chaque personnage.
4. Fermer puis rouvrir la fiche.
5. Vérifier que toutes les valeurs enregistrées reviennent correctement.
6. Tester portrait/photo si disponible.
7. Tester génération aléatoire des traits si disponible.
8. Vérifier caractéristiques, compétences, avantages/désavantages, équipement et champs propres au système.
9. Vérifier qu'un changement de profession/école ne détruit pas silencieusement des données déjà validées.
10. Vérifier les fiches complète et compacte.

## 4. L5R 1e — priorité haute
### Personnages
- Clan, famille, école/profession et rang d'école.
- Honneur, Gloire, Réputation et Statut.
- Anneaux et Traits.
- Compétences et spécialisations.
- Avantages/désavantages.
- Tatouages Ise Zumi uniquement lorsque l'accès est autorisé.
- Chronologie et disponibilité historique.

### Sorts à la création
Tester au minimum Agasha, Asahina, Kuni, Kitsu, Iuchi, Soshi/Yogo, Isawa et Ishiken.
- La Maîtrise du sort ne doit jamais être utilisée comme `rang d'école minimum`.
- Agasha : Sensation, Communion, Invocation + 3 Feu, 2 Terre, 1 Air.
- Asahina : 3 Air, 2 Terre, 1 Eau.
- Kuni : 3 Terre, 2 Feu, 1 Eau.
- Kitsu/Iuchi : 3 Eau, 2 Feu, 1 Terre.
- Soshi/Yogo : 3 Air, 2 Eau, 1 Feu.
- Isawa : 3/2/1 sur trois éléments différents.
- Ishiken : appliquer sa règle spécifique.
- Vérifier les messages de quota incomplet/complet.
- Vérifier qu'un changement d'école actualise immédiatement les choix.

### Apprentissage / recherche de sorts
1. Passer `Gestion des sorts` de Création à Progression.
2. Vérifier que les quotas de création disparaissent.
3. Vérifier que la liste n'est pas filtrée par le rang d'école.
4. Vérifier les restrictions réelles d'école/tradition : Ishiken, Kuni, etc.
5. Vérifier l'indication de recherche : bibliothèque appropriée et ND de base = Maîtrise × 10.
6. Revenir en mode Création et vérifier que les quotas reviennent sans perdre silencieusement les sorts enregistrés.

### Bibliothèque PNJ
1. Ouvrir `Règles et corpus > PNJ des livres L5R 1e`.
2. Tester filtre par Clan.
3. Tester recherche par nom.
4. Tester `Profil 1e récupéré`, `Ancêtres / profils spéciaux`, `À extraire`.
5. Ouvrir plusieurs fiches.
6. Vérifier source/page, école/rang, Honneur/Gloire, Anneaux, Traits, compétences, avantages/désavantages, sorts et notes de versions lorsqu'ils existent.
7. Vérifier que les profils ultérieurs ne remplacent pas silencieusement le profil 1e.
8. Tester Retour aux PNJ et Retour aux règles.
9. Vérifier les avertissements chronologiques avec une campagne datée.
10. Vérifier qu'un PNJ hors période reste consultable mais clairement signalé.

## 5. Séance / scène
1. Ajouter PJ et PNJ à une scène.
2. Cliquer chaque participant.
3. Ouvrir fiche complète/compacte.
4. Pour un shugenja, ouvrir ses sorts depuis la séance.
5. Vérifier détail du sort, cible, portée, zone, résistance, dégâts, augmentations, concentration et restrictions.
6. Changer scène, lieu, jour et heure.
7. Vérifier que les participants et données ne sont pas réinitialisés de façon inattendue.

## 6. Autres systèmes
### D&D5 / D&D5.5
Tester niveau, classe, espèce/race selon version, multiclassage, PV par niveau, sorts/emplacements, équipement et armes à feu si disponibles.

### AD&D
Tester classe/niveau, PV, limite de sorts appris et emplacements.

### Vampire V2
Tester génération, Volonté, Humanité, Disciplines, profession et répartition automatique.

### W.A.R.D.
Tester civil sans agence, membre d'agence, faction, extraterrestre, Volonté, Humanité, santé mentale, expertise, compétences et progression.

## 7. Données et persistance
- IndexedDB.
- Rechargement navigateur.
- Export JSON.
- Import JSON.
- Reprise d'une campagne.
- Vérifier qu'un import n'écrase pas des champs récents.
- Tester le fallback localStorage si réalisable.
- Vérifier les caractères accentués.

## 8. Contrôle visuel
Rechercher systématiquement :
- fenêtres dépassant l'écran ;
- panneaux plus hauts que leur conteneur ;
- boutons sous un autre panneau ;
- textes coupés ;
- colonnes trop étroites ;
- listes de sorts interminables sans défilement pratique ;
- fiches PNJ trop longues sans hiérarchie ;
- mauvais alignement des formulaires ;
- zones vides disproportionnées ;
- contraste insuffisant ;
- incohérences avec l'esthétique papier/japonaise L5R ;
- régression vers une apparence trop science-fiction pour les écrans génériques.

## 9. Rapport attendu de Work
Produire un tableau avec :
`ID | Système | Écran | Étapes de reproduction | Résultat observé | Résultat attendu | Gravité | Capture | Correction proposée | Retest`.

Gravité :
- BLOQUANT : empêche le parcours ou perte de données.
- MAJEUR : règle erronée, fonctionnalité inutilisable, mauvaise donnée.
- MOYEN : ergonomie ou affichage gênant.
- MINEUR : cosmétique.

À la fin, fournir :
1. anomalies bloquantes/majeures ;
2. anomalies moyennes/mineures ;
3. parcours testés sans défaut ;
4. captures avant/après pour les corrections visuelles ;
5. liste exacte des fichiers modifiés ;
6. résultats des retests.

## Instruction de correction
Ne jamais reconstruire l'application depuis zéro. Partir de la V0.20.40. Conserver exactement les chemins internes :
- `jdr-assistant/index.html`
- `jdr-assistant/README.md`
- `jdr-assistant/css/app.css`
- `jdr-assistant/js/app.js`
- `jdr-assistant/js/db.js`

Après corrections : incrémenter la version, reconstruire l'HTML portable, exécuter `node --check` sur `app.js`, `db.js` et tous les scripts embarqués, puis vérifier réellement les parcours corrigés dans le navigateur.


## V0.20.40 — Consolidation massive PNJ 1e

Nouveaux profils 1e vérifiés et intégrés :
- Doji Shizue — The Way of the Crane p.84.
- Matsu Agetoki — The Way of the Lion p.72.
- Ikoma Ujiaki — The Way of the Lion pp.68-69.
- Shinjo Hanari — The Way of the Unicorn p.66.

La bibliothèque distingue maintenant trois états de source : `Profil mécanique 1e récupéré`, `Ancêtre / profil spécial`, `Entrée nominative — bloc mécanique à récupérer`.
Les variantes postérieures (Clan War, Time of the Void, Hidden Emperor, éditions ultérieures) ne remplacent jamais le bloc du livre de clan 1e.

Les recherches de cette passe ont aussi confirmé que certaines entrées restantes sont documentées narrativement dans les livres de clan mais que les résultats disponibles ne fournissent pas encore leur bloc RPG 1e complet. Elles restent donc volontairement sans statistiques.

## V0.20.40 — Passe massive PNJ 1e

Ajout de profils mécaniques 1e supplémentaires vérifiés :
Doji Hoturi (Way of the Crane p.78), Doji Kuwanan (p.80), Kakita Yoshi (p.85), Asahina Tamako (pp.88-89), Daidoji Uji (p.90), Bayushi Aramoro (Way of the Scorpion p.52), Bayushi Kachiko (p.53), Bayushi Shoju (p.56), Isawa Tomo (Way of the Phoenix p.76), Shiba Ujimitsu (p.86).

Les fiches comprennent les données disponibles : école/rang, Honneur/Gloire, Anneaux/Traits, avantages/désavantages, compétences et sorts lorsqu’ils sont explicitement listés.
Les personnages possédant plusieurs blocs historiques ont maintenant un avertissement : le profil du livre de clan 1e est conservé séparément des versions Clan War, Hidden Emperor, Time of the Void ou éditions ultérieures.
La bibliothèque PNJ ajoute un filtre `Profil : Tous / Profil 1e récupéré / À extraire` et affiche le nombre de profils récupérés.

La passe n’invente toujours aucune statistique lorsqu’un bloc source fiable n’a pas été retrouvé.

## V0.20.40 — PNJ 1e supplémentaires + apprentissage des sorts séparé

PNJ : ajout de cinq blocs mécaniques 1e vérifiés :
- Akodo Toturi — The Way of the Lion p.64.
- Ikoma Tsanuri — The Way of the Lion p.67.
- Kitsu Motso — The Way of the Lion p.70.
- Shiba Tsukune — The Way of the Phoenix p.84.
- Ide Tadaji — The Way of the Unicorn p.70.
Les profils d’éditions/époques ultérieures ne remplacent pas ces profils 1e.

Sorts :
- nouveau choix `Gestion des sorts` : `Création — parchemins de départ` ou `Progression — apprentissage / recherche`;
- en création, quotas et éléments de l’école restent appliqués ;
- en progression, les quotas de création sont désactivés ;
- la progression rappelle qu’un sort doit être obtenu en jeu par une méthode autorisée ;
- recherche : bibliothèque de l’école requise et ND de base = Maîtrise × 10, avant modificateurs ;
- la Maîtrise du sort n’est jamais transformée en prérequis de rang d’école.

## V0.20.40 — Correctif sélection des sorts de départ L5R 1e

- Correction de la régression visible dans l’éditeur de shugenja.
- Le rang d’école n’est plus utilisé pour autoriser/interdire un sort selon sa Maîtrise.
- La liste de création respecte maintenant les éléments permis par la répartition de départ de l’école.
- Agasha : Sensation, Communion et Invocation automatiques ; sélection 3 Feu + 2 Terre + 1 Air.
- Asahina : 3 Air + 2 Terre + 1 Eau ; Kuni : 3 Terre + 2 Feu + 1 Eau ; Kitsu/Iuchi : 3 Eau + 2 Feu + 1 Terre ; Soshi/Yogo : 3 Air + 2 Eau + 1 Feu.
- Isawa : 3/2/1 sur trois éléments distincts ; Ishiken : règle spéciale conservée.
- L’interface précise maintenant explicitement que `Maîtrise N` décrit le niveau de Maîtrise du sort et n’est pas un prérequis `rang d’école >= N`.
- Les quotas restent contrôlés par `l5rSpellSelectionStatus`.
- Correction annexe du nom d’export `L5R_ITEM_EVIDENCE_V02030`.

Important : cette passe corrige la sélection de création. L’apprentissage ultérieur d’un sort reste un flux distinct (bibliothèque/recherche/enseignement) et ne doit pas être confondu avec les parchemins de départ.

## V0.20.40 — Fiches mécaniques PNJ 1e + tri par Clan

Première passe de récupération des blocs mécaniques vérifiés dans les suppléments 1e :
- Doji Satsume — The Way of the Crane p.76.
- Kakita Toshimoko — The Way of the Crane p.87.
- Matsu Tsuko — The Way of the Lion pp.76-77.
- Isawa Tadaka — The Way of the Phoenix p.75.
- Otaku Kamoko — The Way of the Unicorn pp.67-68.

Pour ces fiches : école/rang, Honneur, Gloire, Anneaux, Traits, compétences, avantages, désavantages et sorts lorsqu’ils sont indiqués sont enregistrés.
La bibliothèque PNJ possède maintenant un filtre par Clan et une recherche par nom.
Les autres PNJ restent visibles avec la mention `profil à extraire`; aucune statistique n’est extrapolée.

## V0.20.40 — L5R 1e — PNJ Lion, Phénix et Licorne + accès global

- Extraction nominative du chapitre `Who's Who` de The Way of the Lion : 18 entrées.
- Extraction nominative du chapitre `Who's Who` de The Way of the Phoenix : 19 entrées.
- Extraction nominative du chapitre `Who's Who in the Unicorn Clan` : 20 entrées.
- Les ancêtres explicitement signalés dans les sommaires sont marqués comme tels.
- Ajout d’une carte `PNJ des livres L5R 1e` dans `Règles et corpus`, donnant un accès transversal aux PNJ déjà indexés.
- Depuis chaque livre de clan, les noms connus restent également cliquables.
- Les statistiques détaillées ne sont toujours pas inventées : une fiche sans bloc extrait indique seulement sa source et son statut.
- Dragon reste à extraire nominativement depuis une source 1e suffisamment précise.

## V0.20.40 — L5R 1e — Réouverture des PNJ des livres

- Les entrées nominatives déjà indexées dans les livres de clan sont maintenant cliquables.
- Grue : Doji Satsume, Doji Hoturi, Doji Kuwanan, Doji Ameiko, Doji Shizue, Kakita Yoshi, Kakita Toshimoko, Asahina Tamako et Daidoji Uji.
- Scorpion : Bayushi Aramoro, Bayushi Kachiko et Bayushi Shoju.
- Une fiche source s’ouvre depuis le livre et conserve le retour vers le corpus.
- Lorsqu’un PNJ possède déjà une entrée dans le registre historique, la fiche réutilise cette entrée et affiche ses fonctions documentées.
- Un PNJ hors période reste consultable : l’interface affiche `Indisponible en XXXX — fiche historique consultable` au lieu de le supprimer.
- Aucun bloc de caractéristiques absent de la source structurée n’est inventé.
- Les livres Dragon, Lion, Phénix et Licorne qui ne contiennent encore qu’une mention générique `Personnalités du chapitre` restent à extraire nominativement avant d’exposer de fausses fiches.

## V0.20.40 — Vérification croisée des sources

- Heaume d’Isawa : source corrigée vers Magic of Rokugan p.79 et Prayers and Treasures p.150 ; pouvoir confirmé (immunité aux sorts affectant l’esprit sauf Maîtres Élémentaires) ; adaptation 1e validée.
- Masque de Yojiro : source corrigée vers Secrets of the Scorpion p.19 ; pouvoir confirmé (aptitude de cour exceptionnelle + immunité spéciale à la divination) ; adaptation 1e validée.
- Chousen : Book of Earth p.142 ; description/pouvoir narratif confirmé ; adaptation 1e validée avec armure légère souple, accès rapide aux petites armes et compulsion à affronter des adversaires remarquables.
- Mempo du Vide : existence et création dans la série des cinq Nemuranai élémentaires confirmées par Time of the Void ; le pouvoir RPG détaillé reste non récupéré, donc aucune conversion chiffrée n’est figée.
- La fiche d’objet peut désormais afficher `Effet source vérifié` séparément de la conversion 1e.
- Les autres entrées ne sont pas promues sans description de pouvoir vérifiable.

## V0.20.40 — L5R 1e — Audit de preuve des Nemuranai restants

- Ajout d’un statut distinct pour `Existence`, `Pouvoir source` et `Conversion`.
- Un objet cité dans le sommaire de Book of Earth est désormais clairement `existence confirmée`, sans que cela valide automatiquement son pouvoir.
- Les objets dont le texte de pouvoir n’a pas été récupéré sont marqués `conversion bloquée`.
- Les objets dont une partie seulement de l’effet est connue restent `à finaliser`.
- Les conversions déjà étayées par un effet source exploitable restent `validées`.
- Cette séparation empêche une donnée de provenance ou un simple nom de devenir accidentellement une mécanique de jeu.

## V0.20.40 — L5R 1e — Poursuite des Nemuranai

- Armure de Toturi : effet source retrouvé et conversion 1e validée.
- Traduction retenue : immunité à la Peur ordinaire, +1g1 contre la Peur surnaturelle/exceptionnelle, +1g0 aux jets de Stratégie/Tactique militaires, et ralliement des alliés 1 fois/scène contre dépense de Vide.
- Cette conversion dérive directement des trois fonctions documentées : acuité tactique de Toturi, absence de peur et courage inspiré aux compagnons.
- Référence de l’Armure de Toturi : The Book of Earth pp.150-151.
- Référence du Bouclier de Moto Gaheris corrigée : The Book of Earth p.150.
- Les autres objets dont la recherche ne fournit encore que le nom ou la localisation restent `Proposition MJ — conversion à finaliser` ; aucune mécanique n’est créée sans pouvoir source exploitable.

## V0.20.40 — L5R 1e — Conversion ciblée des Nemuranai restants

- Correction des pages Book of Earth grâce au sommaire détaillé : Armure de Terre p.138, Armure des Cinq p.139, Samouraï Doré pp.140-141, outils Kaiu p.145, kote Daidoji p.146, Machimasu pp.146-147, Cœur d’Ouno p.147, armure Shosuro et Sting p.149, Toturi pp.150-151, Tsunetomo p.151, etc.
- Quatre conversions supplémentaires passent en `Adaptation 1e validée` parce que leur fonction source est suffisamment documentée : Armure de Terre, Armure du Samouraï Doré, Kote du Daimyō Daidoji et Machimasu.
- Chaque nouvelle conversion enregistre désormais une `Base de conversion` expliquant le lien entre l’effet source et le levier mécanique 1e retenu.
- Les objets dont seuls le nom, l’existence ou la provenance sont établis restent à finaliser : aucune mécanique n’est inventée sans effet source exploitable.
- Les adaptations validées précédentes restent inchangées.

## V0.20.40 — L5R 1e — Validation des adaptations d’objets

- Corpus audité : 58 objets issus d’éditions ultérieures.
- 36 conversions disposent déjà d’une traduction mécanique suffisamment déterminée pour être classées **Adaptation 1e validée**.
- 22 restent **Proposition MJ — conversion à finaliser**, parce que le bloc d’effet source complet ou un équivalent 1e fiable manque encore.
- Une adaptation validée reste explicitement distincte du canon 1e : la source de l’objet et le statut de la conversion sont affichés séparément.
- Méthode : préserver la fonction source, puis convertir vers les leviers 1e (XgY, ND, Augmentations, Anneaux/Traits, Vide, Blessures, Avantages, fréquence/coût/durée).
- Aucune valeur n’est créée uniquement à partir du nom d’un objet ou de son appartenance de clan.
- Les références 4e dont la page reste inconnue conservent l’étiquette `page à confirmer` même lorsque leur conversion mécanique est jouable.

### Conversions restant à finaliser
adapt_isawas_helm, adapt_yojiro_mask, adapt_emmao_amulet, adapt4_agasha_kitsuki_armor, adapt4_armor_earth, adapt4_golden_samurai_armor, adapt4_kaiu_smithing_tools, adapt4_daidoji_kote, adapt4_machimasu, adapt4_shield_moto_gaheris, adapt4_tsunetomo_dai_tsuchi, adapt4_armor_five, adapt4_chousen, adapt4_destinys_anvil, adapt4_ikoma_anvil, adapt4_indomitable_mutsuhito, adapt4_ounos_heart, adapt4_shosuro_blackened_armor, adapt4_sting_tsuruchi_kabuto, adapt4_toturi_armor, adapt4_void_mask, adapt4_void_crystal

## V0.20.40 — Audit sorts et objets adaptés

- Contrôle du corpus des sorts : les champs structurels sont distingués des champs conditionnels (portée, zone, résistance et dégâts ne s’appliquent pas nécessairement à tous les sorts).
- Ajout d’un audit opérationnel qui signale les véritables champs centraux encore manquants sans inventer les champs non applicables.
- Audit de 58 objets actuellement marqués `adapted-1e`.
- Les objets issus d’une édition ultérieure affichent désormais séparément la qualité de la source et le statut de leur mécanique convertie.
- Toute conversion de mécanique 4e/édition ultérieure est explicitement marquée `Proposition MJ` et n’est plus présentée comme canon 1e.
- Les références `Book of Air/Water/Fire` avec pages restent identifiées ; les références Earth/Void sans page précise sont signalées `page à confirmer`.
- Heaume d’Isawa et Masque de Bayushi Yojiro : ouvrage ultérieur identifié mais page à confirmer.
- Amulette d’Emma-O : provenance exacte encore à confirmer ; sa mécanique reste narrative/proposition MJ.

## V0.20.40 — L5R 1e — Fiches de résolution opérationnelles

- Complète les métadonnées du corpus de base avec cible, portée/zone lorsqu’elles sont définies, résistance, dégâts, concentration, augmentations, rituel, usage unique et restrictions.
- La fiche de séance affiche désormais systématiquement les champs opérationnels ; lorsqu’une donnée n’est pas donnée par le référentiel, elle est explicitement signalée « Non documentée » au lieu d’être inventée.
- Les sorts des suppléments conservent les mécaniques déjà consolidées dans V0.20.12–V0.20.17 ; le résolveur V0.20.40 les fusionne avec le catalogue et les compléments du livre de base.
- La provenance/statut du sort est affichée dans la fiche MJ.

## V0.20.40 — L5R 1e — Effets des 128 sorts consolidés

- Audit du catalogue : 128 sorts, dont seulement 4 portaient directement un champ `effect`; les fiches mécaniques séparées en documentaient déjà 95 autres.
- Consolidation des fiches mécaniques V0.20.12 à V0.20.17 dans un résolveur unique.
- Ajout des 29 effets encore absents depuis le référentiel maître L5R 1e v5.0, sans inventer de mécanique manquante.
- À l’exécution, les 128 entrées du catalogue disposent désormais d’un effet exploitable par la bibliothèque et la fiche de séance.
- La fiche de séance utilise maintenant le résolveur unifié au lieu de ne consulter que l’ancien bloc V0.20.12.

## V0.20.40 — L5R — Fiche standard + accès de séance

- Les participants affichés sur une scène sont maintenant cliquables.
- Un clic ouvre une fiche de séance compacte PJ/PNJ sans passer par l’éditeur.
- Pour un shugenja, ses sorts/parchemins connus sont accessibles directement ; un clic sur un sort ouvre sa fiche de résolution MJ.
- La fiche complète reste distincte et conserve la présentation papier L5R avec identité, cinq Anneaux, réputation, blessures, compétences, école, équipement et informations spéciales.
- Bouton « Fiche de séance » depuis la fiche complète et « Fiche complète » depuis la vue de séance.

## V0.20.40 — L5R 1e — Correction sorts et tatouages

- Corrige une erreur de règle : le niveau de Maîtrise d’un sort 1e n’est plus utilisé comme filtre simple `Maîtrise ≤ rang d’école` dans les listes de parchemins de départ.
- Les sorts de départ sont contrôlés par la répartition propre à l’école (Agasha : communs + 3 Feu, 2 Terre, 1 Air, etc.).
- Supprime les anciennes options de sorts statiques absentes du catalogue structuré, qui produisaient des entrées sans niveau/provenance.
- Les tatouages Ise Zumi sont maintenant complètement absents du formulaire sauf école Togashi, ou accès exceptionnel « trait historique / validation MJ ».
- Règle Ise Zumi : 1 tatouage au rang 1, +1 à chaque rang ; jusqu’à 2 tatouages supplémentaires à 8 PP chacun uniquement à la création ; plafond total = Anneau du Vide.

## V0.20.40 — L5R 1e — Correctif runtime et fiche shugenja

- Corrige l’erreur runtime `Identifier 'L5R_SHUGENJA_STARTING_SPELL_RULES_V02019' has already been declared` du HTML portable : les patches déjà intégrés à `app.js` ne sont plus exécutés une seconde fois.
- Branche le rang réel du champ système « Rang d’École / Insight » sur le filtre des sorts, dans Créer un PNJ comme Modifier le PNJ.
- Un changement de rang reconstruit immédiatement la liste des sorts accessibles.
- Sur la fiche d’un shugenja, le bloc « Techniques d’école » vide est remplacé par « Sorts / parchemins » et affiche les sorts réellement enregistrés.

## V0.20.40 — L5R 1e — Filtrage UI création ET modification PNJ

- Corrige le branchement réel de l’interface : la liste « Sorts / parchemins connus » est maintenant filtrée dans le rendu commun utilisé par Créer un PNJ et Modifier le PNJ.
- Le filtre applique le rang de Maîtrise au catalogue avant de construire les cases à cocher.
- Les sorts dont la Maîtrise est supérieure au rang ne sont plus proposés dans ces formulaires.
- Le changement de rang déclenche un nouveau rendu de la liste lorsqu’un champ de rang est présent dans le contexte.

## V0.20.40 — L5R 1e — Sorts réellement lançables

- Le choix de lancement combine désormais rang de Maîtrise, école/tradition, accès au Vide et liste des sorts réellement connus/parchemins du personnage.
- Si la liste des sorts connus n’est pas renseignée, aucun sort n’est proposé automatiquement au lancement : la bibliothèque reste consultable.
- Ajoute les répartitions de départ documentées pour Iuchi, Agasha, Asahina, Kitsu, Isawa, Soshi, Yogo et Ishiken.
- Sépare les sorts pouvant être appris (rang/école) des sorts effectivement lançables (connus par le personnage).

## V0.20.40 — L5R 1e — Sorts proposés selon le rang

- Le sélecteur de sorts peut désormais ne proposer que les sorts dont le niveau de Maîtrise est inférieur ou égal au rang de Maîtrise du shugenja.
- Un sort sans niveau de Maîtrise documenté n’est pas proposé automatiquement : il reste consultable dans la bibliothèque et doit être validé par le MJ.
- Les sorts trop élevés sont classés comme verrouillés et peuvent rester visibles dans une vue de référence, mais pas dans la liste normale de choix/lancement.
- Le filtrage conserve les restrictions d’accès déjà connues, notamment Kuni/Crabe.

## V0.20.40 — L5R 1e — Kuni/Crabe et contexte shugenja

- Intègre les sorts Kuni/Crabe documentés : Armure, Liens mineur/majeur, Mur de Terre, Derniers sacrements et Peur.
- Ajoute la règle territoriale des Désolations Kuni : +10 ND aux non-Kuni, avec l’exception documentée des demeures Kuni.
- Ajoute un instantané de lancement lié à la fiche shugenja : Anneau, Maîtrise, pool XgY, éligibilité par Maîtrise et tentatives quotidiennes indicatives.
- Les restrictions de vrai nom, Souillure, consentement et rituel restent visibles pour le MJ.

## V0.20.40 — L5R 1e — Recherche et création de sorts

- Ajoute un moteur MJ de calcul du ND de recherche : Maîtrise ×10 + modificateurs documentés.
- Vérifie l’éligibilité selon le rang de Maîtrise du shugenja et affiche le pool Élément + Maîtrise / garder Élément.
- Intègre les modificateurs d’école, bibliothèque étrangère, ronin/sans permission, durée d’étude, affinité élémentaire et nombre de sorts connus.
- Ajoute les règles de propriété/transmission et les restrictions de recherche, sans automatiser les décisions politiques ou la maho.
- Conserve Prison de cristal comme exemple de recherche et non comme sort scolaire standard.

## V0.20.40 — L5R 1e — Sorts collectés Eau, Feu et Air

- Étend la console MJ aux sorts collectés d’Eau, de Feu et d’Air documentés dans le référentiel.
- Ajoute zones, portées, résistances, VD, rituels et restrictions lorsqu’ils sont explicitement fournis.
- Conserve la contradiction de durée du Rempart de Feu comme point à valider au lieu de la résoudre arbitrairement.
- Bibliothèque complète et console MJ continuent de partager les mêmes données.

## V0.20.40 — L5R 1e — Vide complémentaire et sorts collectés de Terre

- Ajoute les six sorts complémentaires Ishiken documentés à la console MJ.
- Ajoute les principales fiches mécaniques des sorts de Terre collectés, sans reconstruire le fragment non identifié.
- Conserve bibliothèque et console MJ sur une base commune.
- Les restrictions, oppositions, zones et formules restent source-grounded.

## V0.20.40 — L5R 1e — Air complet et magie du Vide/Ishiken

- Complète les fiches MJ des derniers sorts d’Air du livre de base.
- Intègre les sorts fondamentaux du Vide à la console MJ avec leurs ND dynamiques, restrictions et effets opérationnels.
- Les sorts du Vide utilisent le pool Vide + Maîtrise / garder Vide dans le helper de résolution.
- La bibliothèque complète reste conservée et partage la même base avec la console MJ.
- Aucune donnée mécanique absente n’est inventée.

## V0.20.40 — L5R 1e — fiches mécaniques MJ

Enrichissement de la console MJ avec cible, portée/zone, résistance, dégâts, rituel/usage unique et résumés mécaniques source-grounded pour un premier lot de sorts du livre de base Terre/Eau/Feu/Air. La bibliothèque permanente est conservée et utilise le même catalogue. Les données non documentées restent explicitement à compléter.

## V0.20.40 — Bibliothèque de sorts permanente + console MJ L5R
- La bibliothèque de sorts L5R reste un module permanent et indépendant de la console MJ ; les deux utilisent exactement `L5R_SPELL_CATALOG`.
- Ajout de filtres par recherche, élément, Maîtrise et provenance, avec fiche détaillée par sort.
- Ajout d’une console MJ de résolution : pool Anneau + rang de Maîtrise / garder Anneau, ND final avec augmentations et accélération, suivi indicatif des tentatives par élément.
- Rappels opérationnels 1e intégrés : +5 ND par augmentation, +5 ND par action d’incantation retirée, augmentation gratuite si le temps est doublé, limites de concentration.
- Les quatre sorts communs reçoivent un premier résumé d’effet, concentration et augmentations vérifiés ; les entrées non encore détaillées affichent explicitement « à documenter » au lieu d’inventer un effet.
- La bibliothèque est accessible depuis Règles L5R ; la console MJ est accessible depuis la bibliothèque et depuis la carte de règles.
- Conservation de toutes les fonctions et données de la V0.20.10.

## V0.20.10 — Sorts L5R 1e : catalogue étendu et contrôle d’école
- Catalogue étendu à l’ensemble des sorts explicitement structurés dans les sections 27.4B, 27.5, 27.6 et au bloc Kuni/Crabe du référentiel 1e actuellement disponible.
- Distinction de provenance : livre de base 1e, suppléments 1e, tradition Kuni/Crabe, Vide/Ishiken et exemple de recherche MJ.
- Restrictions : sorts du Vide réservés aux Ishiken ; sorts Kuni/Crabe réservés au shugenja Kuni dans la sélection normale ; exemples de recherche non proposés automatiquement.
- Correction des niveaux de Maîtrise des sorts du Vide d’après le référentiel (notamment Sentir le Vide M2 et Drainer le Vide M4).
- Contrôle interactif des sorts de départ pour Agasha, Asahina, Kuni, Kitsu, Iuchi, Soshi, Isawa et Ishiken selon les répartitions documentées.
- Conservation de toutes les fonctions de la V0.20.09 et de la chronologie L5R existante.

## V0.20.09 — Catalogue de sorts L5R 1e

- Première passe structurée du catalogue de sorts L5R à partir du référentiel 1e consolidé du projet.
- Ajout de métadonnées exploitables : élément, rang de Maîtrise, ND, temps d’incantation, durée et restriction d’accès lorsqu’elles sont documentées.
- Les quatre sorts communs sont identifiés : Sensation, Communion, Invocation et Contre-sort.
- Extension du sélecteur avec des sorts documentés de Terre, Eau, Feu et Air sans supprimer les entrées déjà présentes.
- Ajout de l’école Ishiken Isawa depuis le corpus 1e : Vide +1, compétences et sorts de départ documentés.
- Les sorts du Vide sont désormais masqués dans la création normale pour les shugenja non-Ishiken ; ils restent accessibles aux Ishiken.
- Aucun sort non documenté n’est inventé et les sorts déjà présents mais pas encore complètement structurés sont conservés.
- Prépare la passe suivante : restrictions par clan/école, parchemins de départ, validation des quotas de sorts et fiche détaillée de sort.

## V0.20.08 — Chronologie des lieux L5R

- Ajoute un registre temporel séparé `L5R_HISTORICAL_LOCATIONS`.
- Le moteur de lieux accepte désormais les états destruction, reconstruction, occupation, changement de contrôle et changement de nom sans confondre ces dimensions.
- Premiers repères prudents : Otosan Uchi, Shiro Kitsuki, Shiro Mirumoto, Kyuden Togashi, Shiro Matsu, Shiro Shiba et Ryoko Owari.
- Aucune date de destruction, occupation ou transfert n'est inventée lorsque le corpus local ne la documente pas : ces lieux restent `reference-only`.
- Les lieux de campagne portant un nom reconnu reçoivent automatiquement un `timelineKey`; le gestionnaire affiche leur état à l'année de campagne L5R.
- Prépare la prochaine passe : corpus et gestion des sorts L5R 1e.

## V0.20.07 — Extension chronologique des trésors L5R

- Extension du registre temporel aux Nemuranai déjà présents des Grands Clans et aux objets impériaux/ronin documentés.
- Ajout d’états historiques explicites : perdu, dispersé, distribué et garde incertaine.
- Itsuwari tient compte de la dissolution du Scorpion : garde institutionnelle normale avant 1124 et après 1128, garde précise laissée ouverte pendant l’exil.
- Ofushikai est rattachée à la fonction de Champion du Phénix sans inventer l’identité du porteur dans la fiche objet.
- Coup de Tonnerre conserve son état « perdu dans l’Outremonde » sans inventer la date de perte.
- Origine, possession, localisation et corruption restent des dimensions distinctes.
- Aucune borne chronologique n’est créée lorsque le corpus ne fournit pas de date.
- Conservation de toutes les fonctions de la V0.20.06.

## V0.20.06 — Chronologie des Nemuranai L5R

- Ajout d’un état temporel détaillé pour une première série de Nemuranai documentés.
- Distinction visible : origine, détenteur/gardien, lieu connu, corruption et état à l’année de campagne.
- Le Miroir d’Agasha suit le basculement Dragon → Phénix à partir de 1131 déjà établi dans le registre institutionnel.
- Les objets dont les dates exactes restent inconnues conservent des bornes ouvertes ; aucune date artificielle n’est créée.
- Conservation de toutes les fonctions de la V0.20.05.

## V0.20.05 — Clans Mineurs et filtrage chronologique de création L5R

Base : V0.20.04.

- Ajout des allégeances Mante, Renard, Blaireau et Mille-Pattes dans la création L5R.
- Les Clans Mineurs dont le corpus mécanique n'est pas encore suffisamment documenté utilisent volontairement une formation neutre « corpus mécanique à documenter » : aucune école ni technique n'est inventée.
- Le Clan du Scorpion est désormais filtré dans la création normale pendant son intervalle institutionnel de dissolution (1124–1127 dans le registre courant).
- Le statut de la Mante est relié au registre historique : Clan Mineur / Alliance avant le passage au Grand Clan, puis Grand Clan à partir de la borne déjà enregistrée.
- Renard, Blaireau et Mille-Pattes sont ajoutés comme repères `reference-only` sans dates artificielles.
- Le filtrage historique des écoles tient désormais compte du statut du clan avant le statut propre de la famille/école.
- Les données historiques restent consultables dans le corpus ; le filtrage concerne les propositions normales de création.

Structure interne et fonctionnement portable inchangés.
