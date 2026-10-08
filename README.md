# Assistant JDR — V0.20.90

## V0.20.90 — Corrections recette Work V0.20.89

Version corrective uniquement, issue du compte rendu de recette Work des 7–8 octobre 2026.

### Corrections bloquantes / majeures
- V2089-01 : restauration de la sauvegarde PJ/PNJ. `systemDataToSave` est désormais construit depuis l’éditeur système avant l’écriture en base.
- D&D : la sauvegarde conserve les variantes d’édition 2014/2024 et le brouillon d’une fiche non encore enregistrée survit à un aller-retour 2014 → 2024 → 2014.
- V2089-02 : `incrementGameDate()` gère maintenant les dates `AAAA-MM-JJ`, les dates `JJ/MM/AAAA`, les fins de mois, les fins d’année et les années anciennes utilisées en JDR. Une date narrative inconnue n’est plus modifiée arbitrairement.
- Fin de combat : remplacement de l’appel inexistant `loadCampaignData()` par le rechargement réel de la campagne active.

### Corrections moyennes
- V2089-03 : le panneau « PNJ de référence L5R » est rendu de façon idempotente ; recherches et changements de filtre ne cumulent plus les anciens panneaux.
- V2089-04 : grille du combat ramenée à deux colonnes sur bureau, une colonne lorsque l’espace se réduit ; champs, noms longs et contrôles restent contenus dans leurs cartes.
- V2089-05 : pour L5R, « Dégâts subis » est recalculé depuis santé restante / maximum. Le changement d’initiative réordonne immédiatement la liste tout en conservant le combattant actif.
- V2089-06 : les 14 objets de créatures accidentellement inclus dans l’ancien tableau d’objets magiques D&D ne sont plus proposés comme équipements anonymes. Le catalogue utilisable comporte 33 objets magiques nommés.
- V2089-07 : les services et niveaux de confiance V34 sont traduits dans l’interface (`Hébergement`, `Relais`, `Écurie`, `Ravitaillement`, `Appui officiel`, etc.).

### Clarifications de voyage
- Une proposition d’incident indique explicitement la journée concernée.
- « Terminer maintenant » avant la fin d’un voyage demande une confirmation unique et précise que les journées restantes ne sont pas ajoutées silencieusement au calendrier.
- Une fin anticipée est enregistrée comme décision MJ dans l’historique du voyage.

### Contrôles réalisés
- Création de personnages L5R, D&D 2014, Vampire V2 et W.A.R.D. : OK.
- Coexistence D&D 2014 / 2024 dans la même campagne : OK.
- Aller-retour non enregistré D&D 2014 → 2024 → 2014 : choix conservés.
- Persistance simulée par rechargement localStorage : personnages des quatre systèmes retrouvés.
- Export de campagne D&D avec personnages 2014 et 2024 : données d’édition conservées.
- Fin de combat L5R : blessures réinjectées, combat effacé, rechargement sans `loadCampaignData`.
- Dates : 1120-04-03 +1, fin de mois, fin d’année, année bissextile, format français et compteur « Jour N » contrôlés.
- Panneau PNJ répété et filtré : un seul panneau.
- Combat à deux noms longs en 1363×936 : aucun débordement horizontal de carte.
- Plan quotidien Rokugan : métadonnées techniques brutes absentes de l’affichage.
- `node --check` requis avant livraison sur `app.js`, `db.js` et les scripts embarqués.



## V0.20.57 — L5R 1e : fiches complètes des Kiho de La Voie de Shinsei
- Complète les 39 Kiho déjà catalogués depuis *The Way of Shinsei* avec une règle mécanique paraphrasée exploitable en jeu : activation, Vide, jets/oppositions, durée, limitations et effets chiffrés lorsqu’ils sont attestés.
- Conserve Anneau, type, Maîtrise et réductions de Maîtrise par clan.
- Les règles officielles PJ et la génération simplifiée PNJ restent strictement séparées.
- Le Cœur perçant reste une attribution automatique du Bushi Kakita Rang 2 ; sa mécanique détaillée n’est pas inventée tant qu’une source vérifiée ne la fournit pas.
# Assistant JDR — V0.20.47

## V0.20.47 — L5R 1e — Scorpion complet et audit Dragon

- Scorpion : 10/10 entrées du Who’s Who disposent désormais d’un bloc mécanique 1e relié.
- Ajouts : Bayushi Tangen (p.57), Soshi Bantaro (p.62), Yogo Junzo (p.63), Yogo Asami (pp.64-65).
- Les profils postérieurs de Bantaro, Junzo et Asami restent séparés des valeurs de The Way of the Scorpion.
- Dragon : correction du roster Who’s Who avec Togashi Yama, absent de l’index précédent ; Togashi Mitsu est conservé.
- Les profils Dragon non suffisamment récupérés restent « profil à extraire » : aucune statistique Clan War/édition ultérieure n’est substituée.
- Audit : absence de doublons et contrôle du rattachement profil ↔ entrée nominative.

## L5R 1e — poursuite des profils PNJ vérifiés

- Dragon : ajout du bloc mécanique 1e de Togashi Gaijutsu (Way of the Dragon, pp.58-59).
- Lion : ajout du bloc mécanique 1e de Matsu Hiroru (Way of the Lion, p.73), sans reprendre son adaptation 4e.
- Scorpion : ajout des blocs 1e de Shosuro Hametsu (pp.53-54) et Shosuro Taberu (p.54).
- Les valeurs absentes ou illisibles dans les sources exploitées ne sont pas inventées.
- Les corrections d’errata restent distinguées des valeurs imprimées ; aucune correction silencieuse n’est appliquée à un profil non vérifié.
- Les profils postérieurs restent séparés des profils des livres de clan 1e.

# Assistant JDR — V0.20.42

## V0.20.42 — L5R 1e — consolidation nominative des sept Grands Clans

- Dragon : 14 entrées du chapitre Who’s Who indexées nominativement ; les ancêtres sont distingués des contemporains.
- Crabe : 19 entrées du Who’s Who intégrées à la bibliothèque PNJ commune ; le corpus Crabe séparé est aligné sur cette liste.
- Grue : 18 entrées vérifiées ; les 9 ancêtres qui manquaient à l’index global sont ajoutés.
- Lion : contrôle croisé, 18/18 entrées déjà présentes ; aucune duplication ajoutée.
- Phénix : contrôle croisé, 19/19 entrées déjà présentes ; aucune duplication ajoutée.
- Scorpion : 10 entrées vérifiées ; ajout de Tangen, Yojiro, Hametsu, Taberu, Bantaro, Junzo et Asami.
- Licorne : contrôle croisé, 20/20 entrées déjà présentes ; aucune duplication ajoutée.
- Les profils mécaniques détaillés ne sont pas extrapolés : une entrée sans bloc 1e récupéré reste « profil à extraire ».
- Les contrôles intermédiaires vérifient pour chaque clan le nombre d’entrées et l’absence de doublons.

## V0.20.41 — Préparation recette navigateur / Work

Cette version ne modifie pas les règles de jeu : elle fige la V0.20.38 comme base de recette et ajoute au README le protocole de test navigateur V0.20.41. Le plan complet est également livré séparément pour être utilisé comme instruction de travail dans Work.

# Assistant JDR — Plan de recette Work — V0.20.41

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
Ne jamais reconstruire l'application depuis zéro. Partir de la V0.20.41. Conserver exactement les chemins internes :
- `jdr-assistant/index.html`
- `jdr-assistant/README.md`
- `jdr-assistant/css/app.css`
- `jdr-assistant/js/app.js`
- `jdr-assistant/js/db.js`

Après corrections : incrémenter la version, reconstruire l'HTML portable, exécuter `node --check` sur `app.js`, `db.js` et tous les scripts embarqués, puis vérifier réellement les parcours corrigés dans le navigateur.


## V0.20.41 — Consolidation massive PNJ 1e

Nouveaux profils 1e vérifiés et intégrés :
- Doji Shizue — The Way of the Crane p.84.
- Matsu Agetoki — The Way of the Lion p.72.
- Ikoma Ujiaki — The Way of the Lion pp.68-69.
- Shinjo Hanari — The Way of the Unicorn p.66.

La bibliothèque distingue maintenant trois états de source : `Profil mécanique 1e récupéré`, `Ancêtre / profil spécial`, `Entrée nominative — bloc mécanique à récupérer`.
Les variantes postérieures (Clan War, Time of the Void, Hidden Emperor, éditions ultérieures) ne remplacent jamais le bloc du livre de clan 1e.

Les recherches de cette passe ont aussi confirmé que certaines entrées restantes sont documentées narrativement dans les livres de clan mais que les résultats disponibles ne fournissent pas encore leur bloc RPG 1e complet. Elles restent donc volontairement sans statistiques.

## V0.20.41 — Passe massive PNJ 1e

Ajout de profils mécaniques 1e supplémentaires vérifiés :
Doji Hoturi (Way of the Crane p.78), Doji Kuwanan (p.80), Kakita Yoshi (p.85), Asahina Tamako (pp.88-89), Daidoji Uji (p.90), Bayushi Aramoro (Way of the Scorpion p.52), Bayushi Kachiko (p.53), Bayushi Shoju (p.56), Isawa Tomo (Way of the Phoenix p.76), Shiba Ujimitsu (p.86).

Les fiches comprennent les données disponibles : école/rang, Honneur/Gloire, Anneaux/Traits, avantages/désavantages, compétences et sorts lorsqu’ils sont explicitement listés.
Les personnages possédant plusieurs blocs historiques ont maintenant un avertissement : le profil du livre de clan 1e est conservé séparément des versions Clan War, Hidden Emperor, Time of the Void ou éditions ultérieures.
La bibliothèque PNJ ajoute un filtre `Profil : Tous / Profil 1e récupéré / À extraire` et affiche le nombre de profils récupérés.

La passe n’invente toujours aucune statistique lorsqu’un bloc source fiable n’a pas été retrouvé.

## V0.20.41 — PNJ 1e supplémentaires + apprentissage des sorts séparé

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

## V0.20.41 — Correctif sélection des sorts de départ L5R 1e

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

## V0.20.41 — Fiches mécaniques PNJ 1e + tri par Clan

Première passe de récupération des blocs mécaniques vérifiés dans les suppléments 1e :
- Doji Satsume — The Way of the Crane p.76.
- Kakita Toshimoko — The Way of the Crane p.87.
- Matsu Tsuko — The Way of the Lion pp.76-77.
- Isawa Tadaka — The Way of the Phoenix p.75.
- Otaku Kamoko — The Way of the Unicorn pp.67-68.

Pour ces fiches : école/rang, Honneur, Gloire, Anneaux, Traits, compétences, avantages, désavantages et sorts lorsqu’ils sont indiqués sont enregistrés.
La bibliothèque PNJ possède maintenant un filtre par Clan et une recherche par nom.
Les autres PNJ restent visibles avec la mention `profil à extraire`; aucune statistique n’est extrapolée.

## V0.20.41 — L5R 1e — PNJ Lion, Phénix et Licorne + accès global

- Extraction nominative du chapitre `Who's Who` de The Way of the Lion : 18 entrées.
- Extraction nominative du chapitre `Who's Who` de The Way of the Phoenix : 19 entrées.
- Extraction nominative du chapitre `Who's Who in the Unicorn Clan` : 20 entrées.
- Les ancêtres explicitement signalés dans les sommaires sont marqués comme tels.
- Ajout d’une carte `PNJ des livres L5R 1e` dans `Règles et corpus`, donnant un accès transversal aux PNJ déjà indexés.
- Depuis chaque livre de clan, les noms connus restent également cliquables.
- Les statistiques détaillées ne sont toujours pas inventées : une fiche sans bloc extrait indique seulement sa source et son statut.
- Dragon reste à extraire nominativement depuis une source 1e suffisamment précise.

## V0.20.41 — L5R 1e — Réouverture des PNJ des livres

- Les entrées nominatives déjà indexées dans les livres de clan sont maintenant cliquables.
- Grue : Doji Satsume, Doji Hoturi, Doji Kuwanan, Doji Ameiko, Doji Shizue, Kakita Yoshi, Kakita Toshimoko, Asahina Tamako et Daidoji Uji.
- Scorpion : Bayushi Aramoro, Bayushi Kachiko et Bayushi Shoju.
- Une fiche source s’ouvre depuis le livre et conserve le retour vers le corpus.
- Lorsqu’un PNJ possède déjà une entrée dans le registre historique, la fiche réutilise cette entrée et affiche ses fonctions documentées.
- Un PNJ hors période reste consultable : l’interface affiche `Indisponible en XXXX — fiche historique consultable` au lieu de le supprimer.
- Aucun bloc de caractéristiques absent de la source structurée n’est inventé.
- Les livres Dragon, Lion, Phénix et Licorne qui ne contiennent encore qu’une mention générique `Personnalités du chapitre` restent à extraire nominativement avant d’exposer de fausses fiches.

## V0.20.41 — Vérification croisée des sources

- Heaume d’Isawa : source corrigée vers Magic of Rokugan p.79 et Prayers and Treasures p.150 ; pouvoir confirmé (immunité aux sorts affectant l’esprit sauf Maîtres Élémentaires) ; adaptation 1e validée.
- Masque de Yojiro : source corrigée vers Secrets of the Scorpion p.19 ; pouvoir confirmé (aptitude de cour exceptionnelle + immunité spéciale à la divination) ; adaptation 1e validée.
- Chousen : Book of Earth p.142 ; description/pouvoir narratif confirmé ; adaptation 1e validée avec armure légère souple, accès rapide aux petites armes et compulsion à affronter des adversaires remarquables.
- Mempo du Vide : existence et création dans la série des cinq Nemuranai élémentaires confirmées par Time of the Void ; le pouvoir RPG détaillé reste non récupéré, donc aucune conversion chiffrée n’est figée.
- La fiche d’objet peut désormais afficher `Effet source vérifié` séparément de la conversion 1e.
- Les autres entrées ne sont pas promues sans description de pouvoir vérifiable.

## V0.20.41 — L5R 1e — Audit de preuve des Nemuranai restants

- Ajout d’un statut distinct pour `Existence`, `Pouvoir source` et `Conversion`.
- Un objet cité dans le sommaire de Book of Earth est désormais clairement `existence confirmée`, sans que cela valide automatiquement son pouvoir.
- Les objets dont le texte de pouvoir n’a pas été récupéré sont marqués `conversion bloquée`.
- Les objets dont une partie seulement de l’effet est connue restent `à finaliser`.
- Les conversions déjà étayées par un effet source exploitable restent `validées`.
- Cette séparation empêche une donnée de provenance ou un simple nom de devenir accidentellement une mécanique de jeu.

## V0.20.41 — L5R 1e — Poursuite des Nemuranai

- Armure de Toturi : effet source retrouvé et conversion 1e validée.
- Traduction retenue : immunité à la Peur ordinaire, +1g1 contre la Peur surnaturelle/exceptionnelle, +1g0 aux jets de Stratégie/Tactique militaires, et ralliement des alliés 1 fois/scène contre dépense de Vide.
- Cette conversion dérive directement des trois fonctions documentées : acuité tactique de Toturi, absence de peur et courage inspiré aux compagnons.
- Référence de l’Armure de Toturi : The Book of Earth pp.150-151.
- Référence du Bouclier de Moto Gaheris corrigée : The Book of Earth p.150.
- Les autres objets dont la recherche ne fournit encore que le nom ou la localisation restent `Proposition MJ — conversion à finaliser` ; aucune mécanique n’est créée sans pouvoir source exploitable.

## V0.20.41 — L5R 1e — Conversion ciblée des Nemuranai restants

- Correction des pages Book of Earth grâce au sommaire détaillé : Armure de Terre p.138, Armure des Cinq p.139, Samouraï Doré pp.140-141, outils Kaiu p.145, kote Daidoji p.146, Machimasu pp.146-147, Cœur d’Ouno p.147, armure Shosuro et Sting p.149, Toturi pp.150-151, Tsunetomo p.151, etc.
- Quatre conversions supplémentaires passent en `Adaptation 1e validée` parce que leur fonction source est suffisamment documentée : Armure de Terre, Armure du Samouraï Doré, Kote du Daimyō Daidoji et Machimasu.
- Chaque nouvelle conversion enregistre désormais une `Base de conversion` expliquant le lien entre l’effet source et le levier mécanique 1e retenu.
- Les objets dont seuls le nom, l’existence ou la provenance sont établis restent à finaliser : aucune mécanique n’est inventée sans effet source exploitable.
- Les adaptations validées précédentes restent inchangées.

## V0.20.41 — L5R 1e — Validation des adaptations d’objets

- Corpus audité : 58 objets issus d’éditions ultérieures.
- 36 conversions disposent déjà d’une traduction mécanique suffisamment déterminée pour être classées **Adaptation 1e validée**.
- 22 restent **Proposition MJ — conversion à finaliser**, parce que le bloc d’effet source complet ou un équivalent 1e fiable manque encore.
- Une adaptation validée reste explicitement distincte du canon 1e : la source de l’objet et le statut de la conversion sont affichés séparément.
- Méthode : préserver la fonction source, puis convertir vers les leviers 1e (XgY, ND, Augmentations, Anneaux/Traits, Vide, Blessures, Avantages, fréquence/coût/durée).
- Aucune valeur n’est créée uniquement à partir du nom d’un objet ou de son appartenance de clan.
- Les références 4e dont la page reste inconnue conservent l’étiquette `page à confirmer` même lorsque leur conversion mécanique est jouable.

### Conversions restant à finaliser
adapt_isawas_helm, adapt_yojiro_mask, adapt_emmao_amulet, adapt4_agasha_kitsuki_armor, adapt4_armor_earth, adapt4_golden_samurai_armor, adapt4_kaiu_smithing_tools, adapt4_daidoji_kote, adapt4_machimasu, adapt4_shield_moto_gaheris, adapt4_tsunetomo_dai_tsuchi, adapt4_armor_five, adapt4_chousen, adapt4_destinys_anvil, adapt4_ikoma_anvil, adapt4_indomitable_mutsuhito, adapt4_ounos_heart, adapt4_shosuro_blackened_armor, adapt4_sting_tsuruchi_kabuto, adapt4_toturi_armor, adapt4_void_mask, adapt4_void_crystal

## V0.20.41 — Audit sorts et objets adaptés

- Contrôle du corpus des sorts : les champs structurels sont distingués des champs conditionnels (portée, zone, résistance et dégâts ne s’appliquent pas nécessairement à tous les sorts).
- Ajout d’un audit opérationnel qui signale les véritables champs centraux encore manquants sans inventer les champs non applicables.
- Audit de 58 objets actuellement marqués `adapted-1e`.
- Les objets issus d’une édition ultérieure affichent désormais séparément la qualité de la source et le statut de leur mécanique convertie.
- Toute conversion de mécanique 4e/édition ultérieure est explicitement marquée `Proposition MJ` et n’est plus présentée comme canon 1e.
- Les références `Book of Air/Water/Fire` avec pages restent identifiées ; les références Earth/Void sans page précise sont signalées `page à confirmer`.
- Heaume d’Isawa et Masque de Bayushi Yojiro : ouvrage ultérieur identifié mais page à confirmer.
- Amulette d’Emma-O : provenance exacte encore à confirmer ; sa mécanique reste narrative/proposition MJ.

## V0.20.41 — L5R 1e — Fiches de résolution opérationnelles

- Complète les métadonnées du corpus de base avec cible, portée/zone lorsqu’elles sont définies, résistance, dégâts, concentration, augmentations, rituel, usage unique et restrictions.
- La fiche de séance affiche désormais systématiquement les champs opérationnels ; lorsqu’une donnée n’est pas donnée par le référentiel, elle est explicitement signalée « Non documentée » au lieu d’être inventée.
- Les sorts des suppléments conservent les mécaniques déjà consolidées dans V0.20.12–V0.20.17 ; le résolveur V0.20.41 les fusionne avec le catalogue et les compléments du livre de base.
- La provenance/statut du sort est affichée dans la fiche MJ.

## V0.20.41 — L5R 1e — Effets des 128 sorts consolidés

- Audit du catalogue : 128 sorts, dont seulement 4 portaient directement un champ `effect`; les fiches mécaniques séparées en documentaient déjà 95 autres.
- Consolidation des fiches mécaniques V0.20.12 à V0.20.17 dans un résolveur unique.
- Ajout des 29 effets encore absents depuis le référentiel maître L5R 1e v5.0, sans inventer de mécanique manquante.
- À l’exécution, les 128 entrées du catalogue disposent désormais d’un effet exploitable par la bibliothèque et la fiche de séance.
- La fiche de séance utilise maintenant le résolveur unifié au lieu de ne consulter que l’ancien bloc V0.20.12.

## V0.20.41 — L5R — Fiche standard + accès de séance

- Les participants affichés sur une scène sont maintenant cliquables.
- Un clic ouvre une fiche de séance compacte PJ/PNJ sans passer par l’éditeur.
- Pour un shugenja, ses sorts/parchemins connus sont accessibles directement ; un clic sur un sort ouvre sa fiche de résolution MJ.
- La fiche complète reste distincte et conserve la présentation papier L5R avec identité, cinq Anneaux, réputation, blessures, compétences, école, équipement et informations spéciales.
- Bouton « Fiche de séance » depuis la fiche complète et « Fiche complète » depuis la vue de séance.

## V0.20.41 — L5R 1e — Correction sorts et tatouages

- Corrige une erreur de règle : le niveau de Maîtrise d’un sort 1e n’est plus utilisé comme filtre simple `Maîtrise ≤ rang d’école` dans les listes de parchemins de départ.
- Les sorts de départ sont contrôlés par la répartition propre à l’école (Agasha : communs + 3 Feu, 2 Terre, 1 Air, etc.).
- Supprime les anciennes options de sorts statiques absentes du catalogue structuré, qui produisaient des entrées sans niveau/provenance.
- Les tatouages Ise Zumi sont maintenant complètement absents du formulaire sauf école Togashi, ou accès exceptionnel « trait historique / validation MJ ».
- Règle Ise Zumi : 1 tatouage au rang 1, +1 à chaque rang ; jusqu’à 2 tatouages supplémentaires à 8 PP chacun uniquement à la création ; plafond total = Anneau du Vide.

## V0.20.41 — L5R 1e — Correctif runtime et fiche shugenja

- Corrige l’erreur runtime `Identifier 'L5R_SHUGENJA_STARTING_SPELL_RULES_V02019' has already been declared` du HTML portable : les patches déjà intégrés à `app.js` ne sont plus exécutés une seconde fois.
- Branche le rang réel du champ système « Rang d’École / Insight » sur le filtre des sorts, dans Créer un PNJ comme Modifier le PNJ.
- Un changement de rang reconstruit immédiatement la liste des sorts accessibles.
- Sur la fiche d’un shugenja, le bloc « Techniques d’école » vide est remplacé par « Sorts / parchemins » et affiche les sorts réellement enregistrés.

## V0.20.41 — L5R 1e — Filtrage UI création ET modification PNJ

- Corrige le branchement réel de l’interface : la liste « Sorts / parchemins connus » est maintenant filtrée dans le rendu commun utilisé par Créer un PNJ et Modifier le PNJ.
- Le filtre applique le rang de Maîtrise au catalogue avant de construire les cases à cocher.
- Les sorts dont la Maîtrise est supérieure au rang ne sont plus proposés dans ces formulaires.
- Le changement de rang déclenche un nouveau rendu de la liste lorsqu’un champ de rang est présent dans le contexte.

## V0.20.41 — L5R 1e — Sorts réellement lançables

- Le choix de lancement combine désormais rang de Maîtrise, école/tradition, accès au Vide et liste des sorts réellement connus/parchemins du personnage.
- Si la liste des sorts connus n’est pas renseignée, aucun sort n’est proposé automatiquement au lancement : la bibliothèque reste consultable.
- Ajoute les répartitions de départ documentées pour Iuchi, Agasha, Asahina, Kitsu, Isawa, Soshi, Yogo et Ishiken.
- Sépare les sorts pouvant être appris (rang/école) des sorts effectivement lançables (connus par le personnage).

## V0.20.41 — L5R 1e — Sorts proposés selon le rang

- Le sélecteur de sorts peut désormais ne proposer que les sorts dont le niveau de Maîtrise est inférieur ou égal au rang de Maîtrise du shugenja.
- Un sort sans niveau de Maîtrise documenté n’est pas proposé automatiquement : il reste consultable dans la bibliothèque et doit être validé par le MJ.
- Les sorts trop élevés sont classés comme verrouillés et peuvent rester visibles dans une vue de référence, mais pas dans la liste normale de choix/lancement.
- Le filtrage conserve les restrictions d’accès déjà connues, notamment Kuni/Crabe.

## V0.20.41 — L5R 1e — Kuni/Crabe et contexte shugenja

- Intègre les sorts Kuni/Crabe documentés : Armure, Liens mineur/majeur, Mur de Terre, Derniers sacrements et Peur.
- Ajoute la règle territoriale des Désolations Kuni : +10 ND aux non-Kuni, avec l’exception documentée des demeures Kuni.
- Ajoute un instantané de lancement lié à la fiche shugenja : Anneau, Maîtrise, pool XgY, éligibilité par Maîtrise et tentatives quotidiennes indicatives.
- Les restrictions de vrai nom, Souillure, consentement et rituel restent visibles pour le MJ.

## V0.20.41 — L5R 1e — Recherche et création de sorts

- Ajoute un moteur MJ de calcul du ND de recherche : Maîtrise ×10 + modificateurs documentés.
- Vérifie l’éligibilité selon le rang de Maîtrise du shugenja et affiche le pool Élément + Maîtrise / garder Élément.
- Intègre les modificateurs d’école, bibliothèque étrangère, ronin/sans permission, durée d’étude, affinité élémentaire et nombre de sorts connus.
- Ajoute les règles de propriété/transmission et les restrictions de recherche, sans automatiser les décisions politiques ou la maho.
- Conserve Prison de cristal comme exemple de recherche et non comme sort scolaire standard.

## V0.20.41 — L5R 1e — Sorts collectés Eau, Feu et Air

- Étend la console MJ aux sorts collectés d’Eau, de Feu et d’Air documentés dans le référentiel.
- Ajoute zones, portées, résistances, VD, rituels et restrictions lorsqu’ils sont explicitement fournis.
- Conserve la contradiction de durée du Rempart de Feu comme point à valider au lieu de la résoudre arbitrairement.
- Bibliothèque complète et console MJ continuent de partager les mêmes données.

## V0.20.41 — L5R 1e — Vide complémentaire et sorts collectés de Terre

- Ajoute les six sorts complémentaires Ishiken documentés à la console MJ.
- Ajoute les principales fiches mécaniques des sorts de Terre collectés, sans reconstruire le fragment non identifié.
- Conserve bibliothèque et console MJ sur une base commune.
- Les restrictions, oppositions, zones et formules restent source-grounded.

## V0.20.41 — L5R 1e — Air complet et magie du Vide/Ishiken

- Complète les fiches MJ des derniers sorts d’Air du livre de base.
- Intègre les sorts fondamentaux du Vide à la console MJ avec leurs ND dynamiques, restrictions et effets opérationnels.
- Les sorts du Vide utilisent le pool Vide + Maîtrise / garder Vide dans le helper de résolution.
- La bibliothèque complète reste conservée et partage la même base avec la console MJ.
- Aucune donnée mécanique absente n’est inventée.

## V0.20.41 — L5R 1e — fiches mécaniques MJ

Enrichissement de la console MJ avec cible, portée/zone, résistance, dégâts, rituel/usage unique et résumés mécaniques source-grounded pour un premier lot de sorts du livre de base Terre/Eau/Feu/Air. La bibliothèque permanente est conservée et utilise le même catalogue. Les données non documentées restent explicitement à compléter.

## V0.20.41 — Bibliothèque de sorts permanente + console MJ L5R
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


## V0.20.41 — consolidation L5R 1e
- Corrige l'application de la chronologie aux fiches PNJ des livres : utilisation du contexte historique réel de la campagne.
- Corrige le bouton « Retour aux PNJ » depuis une fiche globale : retour à la bibliothèque PNJ et non à l'accueil des règles.
- Sécurise le passage Progression ↔ Création des sorts : un sort déjà enregistré hors répartition de création reste visible et sélectionné, avec l'indication « conservé (hors répartition de création) », afin d'éviter une perte silencieuse à l'enregistrement.
- La Maîtrise d'un sort reste une donnée du sort et n'est pas réintroduite comme prérequis général de rang d'école.
- Aucun profil PNJ Dragon n'est inventé : les entrées sans bloc mécanique vérifié restent signalées comme à extraire.



## V0.20.45 — poursuite profils PNJ 1e, vérification clan par clan

- Nouvelle passe documentaire effectuée clan par clan, sans conversion silencieuse depuis les éditions ultérieures.
- Lion : ajout du profil mécanique 1e d’Akodo Kage (The Way of the Lion, p.74).
- Phénix : ajout du profil mécanique 1e d’Isawa Uona (The Way of the Phoenix, pp.74-75).
- Licorne : ajout des profils mécaniques 1e d’Iuchi Karasu (pp.72-73) et Horiuchi Shoan (p.75).
- Dragon, Crabe, Grue et Scorpion : recontrôlés dans cette passe ; aucun nouveau bloc mécanique complet n’est intégré sans source 1e suffisamment lisible. Les entrées restent explicitement à extraire plutôt que d’être reconstruites.
- Les profils postérieurs (Clan War, Time of the Void, Secrets/Great Clans, éditions 3e/4e/5e) restent distincts et ne remplacent pas les fiches 1e.

## V0.20.45 — PNJ mécaniques 1e, contrôle clan par clan

- Dragon contrôlé en premier : ajout des blocs 1e de Togashi Mitsu (p.54), Mirumoto Hitomi (p.63) et Agasha Tamori (p.65).
- Crabe contrôlé ensuite : ajout de Hida Kisada (p.60), Hida Yakamo (p.63), Hida Sukune (p.65), Kuni Yori (p.70) et Yasuki Taka (p.73).
- Grue et Lion : contrôle des profils déjà présents et correction structurelle de Doji Shizue, Matsu Agetoki et Ikoma Ujiaki.
- Phénix : ajout d’Isawa Kaede (p.72).
- Scorpion : ajout de Bayushi Yojiro (pp.58-59).
- Licorne : ajout d’Iuchi Daiyu (pp.73-74).
- Correction structurelle : Doji Shizue, Matsu Agetoki, Ikoma Ujiaki et Shinjo Hanari étaient accidentellement rangés dans les notes de version ; ils sont replacés dans le registre des profils mécaniques.
- Les incarnations Clan War, Time of the Void, Hidden Emperor et éditions ultérieures restent distinctes et ne remplacent pas les profils des livres de clan 1e.
- Les entrées sans bloc mécanique 1e vérifié restent volontairement « à extraire ».


## V0.20.45 — poursuite profils PNJ L5R 1e
- Dragon : ajoute le profil mécanique 1e de Togashi Hoshi (The Way of the Dragon, pp.60-61).
- Dragon : réintègre Togashi Mitsu dans l’index permanent des PNJ ; son profil mécanique existait déjà mais n’était pas exposé par l’index.
- Les profils postérieurs (Time of the Void, Hidden Emperor, éditions ultérieures) restent séparés et ne remplacent pas les blocs 1e.
- Les PNJ dont le bloc complet n’est pas vérifié restent volontairement « à extraire ».


## V0.20.48 — Ancêtres L5R 1e séparés des PNJ

- Nouvelle bibliothèque permanente Ancêtres, distincte des PNJ historiques/contemporains.
- 16 Ancêtres avec coût et effet vérifiés dans le référentiel maître : 6 Dragon et 10 Licorne.
- Les autres entrées déjà marquées Ancêtre dans les livres de clan restent visibles mais non sélectionnables tant que leur mécanique 1e n’est pas vérifiée.
- Les Ancêtres vérifiés sont proposés comme avantages dans la création/modification PJ et PNJ L5R ; ils sont exclus de la génération aléatoire.
- La bibliothèque PNJ et ses compteurs excluent désormais les Ancêtres.
- Règle conservée : Ancêtre acheté à la création en PP ; pas d’achat par XP par défaut, sauf décision exceptionnelle du MJ.


## V0.20.49 — Ancêtres des sept grands clans

- Extension de la bibliothèque Ancêtres aux clans Crabe, Grue, Lion, Phénix et Scorpion, en plus du Dragon et de la Licorne.
- Coûts, restrictions, effets et contreparties issus du référentiel maître L5R 1e v5.0.
- Les Ancêtres restent distincts des PNJ historiques et sont exclus des compteurs de profils PNJ à extraire.
- Les entrées vérifiées deviennent sélectionnables à la création/modification PJ et PNJ ; les entrées non vérifiées restent visibles mais non sélectionnables.
- Gestion d’un coût contextuel pour Soshi Saibankan (4 PP magistrat / 5 PP autre Scorpion).
- Les coûts négatifs d’Ancêtres néfastes sont conservés tels quels conformément au référentiel maître.

## V0.20.50 — Budget PP et table d’historique L5R 1e

- Ajout d’un suivi des points de personnage (PP) dans la création/modification L5R 1e.
- Pour les PJ, le contrôle du budget est obligatoire ; pour les PNJ, il est optionnel et désactivé par défaut.
- Le budget reste modifiable par le MJ ; l’assistant propose 25 PP par défaut sans présenter cette valeur comme une règle verrouillée du référentiel.
- Les coûts numériques des Avantages, Désavantages et Ancêtres sélectionnés sont intégrés au solde ; les coûts variables sont signalés pour validation MJ.
- Les Ancêtres à coût négatif restent négatifs et augmentent donc le solde disponible conformément au référentiel consolidé.
- Soshi Saibankan conserve son coût contextuel : 4 PP pour un magistrat, 5 PP pour un autre Scorpion.
- Rappel intégré du barème 1e : Trait +1 = 8 PP ; Vide +1 = 12 PP ; Compétence +1 = 1 PP ; Honneur +1 = 3 PP ; Honneur -1 rapporte 2 PP.
- Ajout de champs « autres dépenses PP » et « autres gains PP » pour les dépenses que le formulaire ne peut pas déduire avec certitude.
- Ajout de la Table d’historique / héritage familial dans l’éditeur L5R, avec premier jet d’orientation 1d10 pour Crabe, Grue, Dragon, Lion, Phénix, Scorpion et Licorne.
- Le résultat et les notes de sous-table sont conservés dans `systemData` du personnage.
- Les effets complexes des sous-tables ne modifient pas automatiquement le budget : ils restent sous validation du MJ afin de ne pas transformer à tort un avantage gratuit d’historique en dépense de PP.


## V0.20.51 — Historique guidé et PP gratuits

- Base directe : V0.20.50 budget PP / historique.
- Les champs du budget PP et de l’historique sont désormais explicitement persistés dans `systemData` lors de la réouverture d’une fiche L5R.
- La création L5R conserve l’orientation, la sous-table appelée, le jet de sous-table, le résultat final, les notes et l’état de validation MJ.
- Ajout d’un bouton de jet de sous-table pendant la création.
- Ajout du champ « PP d’achats gratuits par l’historique » : il neutralise le coût d’un Avantage/Ancêtre accordé gratuitement par une table sans générer de PP dépensables.
- Les effets sur Honneur, Gloire, équipement, relations ou école restent soumis à validation explicite du MJ ; aucune mécanique absente du référentiel n’est inventée.
- Pour les PJ, le contrôle du budget reste obligatoire ; pour les PNJ, il reste optionnel.


## V0.20.53 — Application sûre des effets d’historique L5R

- Base consolidée : branche V0.20.51 « budget PP + historique guidé », sans suppression des acquis Ancêtres.
- Ajout d’un bouton « Appliquer les effets sûrs » pour les résultats finaux d’historique L5R.
- Application automatique limitée aux effets déterministes : Honneur, Gloire, Réputation/Insight, compétences reconnues et avantages/désavantages explicitement gratuits.
- Conversion canonique de saisie : 1 point d’Honneur/Gloire = 0,1 rang ; 1 rang = 1,0.
- Les effets structurels ou à choix (rōnin, école, relations, ennemis, secrets, équipement, sorts, objets, obligations, etc.) restent sous validation MJ.
- Les avantages/désavantages accordés par l’historique sont enregistrés à 0 PP afin de ne pas fausser le budget de création.
- Signature d’application empêchant la double application lors d’une réédition ou d’un nouvel enregistrement.
- Annulation contrôlée : restaure les valeurs automatiques précédentes sans écraser une compétence modifiée manuellement après application.
- Les scans/résultats incomplets restent « à vérifier » ; aucune règle manquante n’est inventée.


## V0.20.54 — Kiho L5R 1e

- Ajout d’un catalogue de 39 Kiho issus de *The Way of Shinsei* (1e), classés par Anneau, type et Maîtrise.
- Règles d’accès des moines et non-moines intégrées à la création, avec limites par Anneau et Rang.
- Réductions de Maîtrise de clan intégrées lorsque la source les indique.
- Les achats de Kiho sont intégrés au contrôle PP : 3 Kiho de départ gratuits pour un moine, puis 2 × Maîtrise PP pour les achats supplémentaires à la création ; non-moines 2 × Maîtrise PP/XP.
- Persistance des Kiho sélectionnés dans systemData.
- Tatouages Ise Zumi conservés comme système distinct des Kiho.
- Source : *The Way of Shinsei*, pp. 52–65.


## V0.20.55 — Kiho : traitement identique aux sorts

- Les Kiho disposent désormais d’un mode **Création** / **Progression**, comme les sorts.
- Les Kiho explicitement accordés par une technique d’école sont injectés automatiquement, gratuits et hors quota normal.
- Le Bushi Kakita reçoit automatiquement **Le Cœur perçant** à partir du Rang 2, conformément à « La frappe éclair ».
- Les Kiho gratuits de moine sont distingués des acquisitions payantes ; les acquisitions supplémentaires de création alimentent le budget PP, tandis que le mode progression n’impute pas le budget initial.
- Pour un moine créé directement à un Rang supérieur, le quota acquis suit la progression documentée : 3 Kiho au Rang 1 puis +2 par Rang supplémentaire.
- Les Kiho d’école ne sont pas soumis aux prérequis génériques d’apprentissage des non-moines.
- Une baisse/changement d’école retire l’ancien Kiho automatique d’école au lieu de le laisser silencieusement sur la fiche.
- La fiche mécanique complète de **Le Cœur perçant** n’est pas inventée : le référentiel confirme son acquisition Kakita Rang 2, mais l’effet détaillé reste indiqué comme à consulter dans la source.


## V0.20.56 — Séparation stricte PJ / PNJ

- **PJ L5R 1e** : règles officielles complètes obligatoires pour la création et la progression. Les Kiho utilisent les règles de *The Way of Shinsei* et les acquisitions explicites des écoles.
- **PNJ L5R 1e** : nouveau mode par défaut **Génération simplifiée MJ**. Les quotas, coûts PP, prérequis et automatismes d’école ne bloquent pas la génération ; le catalogue reste disponible comme aide.
- Un PNJ peut être basculé en **Règles complètes — comme un PJ** ; dans ce mode, il reçoit exactement les mêmes validations et automatismes que le PJ.
- Le barème interne « moine Rang 2 : 1 Kiho / Rang 3 : 1 à 3 » reste une aide d’équilibrage PNJ et n’est jamais présenté comme une règle officielle.
- Le Bushi Kakita Rang 2 reçoit **Le Cœur perçant** automatiquement uniquement lorsque les règles complètes sont actives.
- Cette séparation devient le principe d’architecture : PJ = règles canoniques du système ; PNJ = simplification autorisée, avec option règles complètes.


## V0.20.58 — corrections recette Work
- REC-01 : conservation des sorts possédés lors des changements Création/Progression confirmée et préservée.
- REC-02 : fiches L5R lisent désormais avantages/désavantages au niveau réellement sauvegardé et chargent l’équipement persistant du personnage.
- REC-03 : retour de la bibliothèque globale PNJ vers la liste maintenu ; filtres restaurés dans la même vue lors du retour.
- REC-04 : sorts communs des écoles de shugenja réellement auto-attribués sans effacer les sorts acquis.
- REC-05 : école de Shugenja Yogo exposée dans le sélecteur Scorpion, avec répartition 3 Air / 2 Eau / 1 Feu déjà documentée.
- REC-06 : suppression des alertes de démonstration et remplacement des compteurs/contexte statiques par les données de la campagne active, avec états vides.
- REC-07 : les fiches de sorts dont les champs mécaniques restent non documentés portent maintenant le statut visible « Fiche incomplète ». Aucun chiffre manquant n’est inventé.
- Garde-fou : aucune restriction générale Maîtrise du sort ≤ rang d’école n’a été ajoutée.


## V0.20.89 — Kiho des suppléments L5R 1e : La Voie de la Grue
- Base : V0.20.58 (corrections recette Work).
- Le Cœur perçant est catalogué comme Kiho officiel de supplément accordé automatiquement au Bushi Kakita au Rang 2.
- Acquisition d'école gratuite et hors quota de Kiho ordinaires ; aucune Maîtrise ni mécanique non documentée n'est inventée.
- La fiche affiche un statut documentaire lorsque la mécanique complète reste à vérifier dans la source.
- Mizu-dō reste distinct des Kiho : aucune manœuvre Mizu-dō n'est reclassée comme Kiho sans source explicite.
- Les 39 Kiho de The Way of Shinsei et la séparation PJ RAW / PNJ simplifié restent inchangés.


## V0.20.89 — Kiho et suppléments de clan
- Recoupement des suppléments Dragon, Phénix, Scorpion, Licorne, Crabe et Lion.
- Pas de duplication artificielle du catalogue des 39 Kiho de *The Way of Shinsei*.
- Ajout d’un registre de provenance/accès pour Ise Zumi, Henshin, Sodan-Senzo et Tsukai-Sagasu.
- Les capacités propres de ces voies restent distinctes des Kiho.
- Les affinités de clan des Kiho de Shinsei sont conservées comme réductions de Maîtrise.
- Le Cœur perçant reste le cas d’octroi d’école Kakita Rang 2, gratuit et hors quota.


## V0.20.89 — Écoles et voies spéciales L5R 1e
- Sélecteurs : Tensai Isawa, Henshin Asako, Sodan-Senzo Kitsu, Chasseur de sorciers Kuni.
- Ise Zumi : règles de tatouages renforcées.
- Tensai : élément, quota 2+1 et spécialisation.
- Henshin : non-shugenja et mystères élémentaires distincts aux rangs 1–4.
- Sodan-Senzo : Kitsu sang pur, magie ancestrale séparée.
- Chasseur Kuni : non-shugenja, équipement et rang 1 documentés.
- HTML portable resynchronisé avec app.js et db.js.


## V0.20.89 — Progression des voies spéciales L5R 1e
- Chasseur Kuni : techniques rangs 1 à 5.
- Tensai : progression calculée des augmentations gratuites et du malus de ND.
- Henshin : mystères rangs 1 à 4, énigmes et Fushihai rang 5.
- Sodan-Senzo : invocation des ancêtres, ND, durée et limites.
- Ise Zumi : acquisition des tatouages par rang et limites.
- Ishiken : progression séparée du Tensai ; aucune technique absente des sources n'est inventée.


## V0.20.89 — Familles impériales L5R 1e
- Miya : bonus familial Intelligence +1, particularité de Statut social, école des shisha, compétences, équipement et Honneur.
- Shisha Miya : techniques rangs 1 à 5 intégrées dans la progression et les fiches.
- Seppun et Otomo restent sélectionnables comme familles impériales ; leurs mécaniques non encore suffisamment documentées sont explicitement marquées « Fiche incomplète » au lieu d’être inventées.
- Réductions impériales documentées : Invitation à la cour 1 PP pour Miya/Otomo/Seppun ; Inoffensif 2 PP pour Miya.

## V0.20.89 — Corrections prioritaires recette Work V0.20.58
- V58-01 : PJ/PNJ et équipement enregistrables dans la bibliothèque globale sans campagne.
- V58-02 : fiches D&D 2014/2024, Vampire V2 et W.A.R.D. enrichies avec leurs données de jeu et équipement.
- D&D 2024 : classes/niveaux du multiclassage visibles en consultation.
- Vampire V2 : Génération, Humanité/Voie, Volonté, Sang et Disciplines visibles.
- W.A.R.D. : agence/statut, expertise, Volonté actuelle/permanente, Humanité, SM actuelle/référence, RM, stress et PV visibles.
- V58-03 : quotas de sorts L5R bloquants uniquement en création réglementée PJ ; dérogation MJ persistante avec motif obligatoire.
- V58-04 : section Ancêtre L5R masquée explicitement hors L5R.

## V0.20.89 — Fin des corrections Work + D&D 2024 + retour AD&D
- V58-05 : les sorts sans mécanique structurée sont explicitement marqués « Fiche incomplète ».
- V58-06 : suppression de l’injection automatique de scènes de démonstration.
- V58-07 : éditions par défaut corrigées pour D&D 2014, D&D 2024/5.5, Vampire et AD&D.
- V58-08 : hors campagne, le bouton portant le nom du JDR ouvre la Bibliothèque JDR ; en campagne il ouvre les séances.
- D&D 2024 : sous-classe conservée pour chaque classe du multiclassage et blocage au-delà de 20 niveaux.
- AD&D 2e : système de nouveau visible dans les sélecteurs et profil structurel restauré. Le module reste marqué en reprise jusqu’à réintégration des classes, PV, limites de sorts appris et emplacements.

## V0.20.89 — AD&D 2e fonctionnel
- Classes cœur : Guerrier, Rôdeur, Paladin, Magicien, Magicien spécialiste, Clerc, Druide, Voleur et Barde.
- Races cœur sélectionnables : Humain, Nain, Elfe, Gnome, Demi-elfe et Halfelin.
- PV : dé de vie propre au groupe/classe, jet aléatoire mémorisé par niveau, bonus de Constitution, puis gain fixe après la limite de dés de vie.
- THAC0 calculé par groupe et niveau.
- Magie : tables d’emplacements Magicien, Prêtre, Barde, Paladin et Rôdeur jusqu’au niveau 20.
- Magicien : niveau maximal de sort, chance d’apprentissage et maximum de sorts connus par niveau selon Intelligence.
- Distinction explicite entre sorts connus dans le grimoire et emplacements mémorisables.
- Fiche de consultation AD&D avec classe, niveau, PV, THAC0, magie et historique des PV.


## V0.20.89 — L5R voies spéciales et audit impérial
- Le résumé d’accès Kiho des voies spéciales est maintenant affiché dans la fiche L5R.
- Chasseur de sorciers Kuni : rappel sourcé d’Intuition +1, Honneur 1,5, Athlétisme ou Discrétion et deux compétences de bugei au choix.
- Progression Miya Shisha existante maintenant affichée dans la fiche personnage.
- Invitation à la cour : coût impérial réduit explicité.
- Seppun et Otomo restent explicitement marqués incomplets ; aucune mécanique non sourcée n’est inventée.


## V0.20.89 — normalisation multi-systèmes
- Correction du classement AD&D : AD&D est désormais détecté avant D&D dans la normalisation canonique.
- `profileKeyForCampaign()` réutilise la normalisation centrale au lieu de maintenir une seconde logique divergente.
- `systemDefaultTheme()` réutilise également cette normalisation ; AD&D conserve volontairement le thème fantasy D&D sans devenir un profil D&D 5e.
- Ajout d’un contexte de lieu propre à la clé AD&D afin d’éviter le repli sur le contexte générique.
- Audit statique transversal ajouté : profils, contextes personnage/lieu, thèmes, fiches et sélecteurs des cinq systèmes.


## V0.20.89 — L5R audit documentaire impérial et clans mineurs
- Ajout d’un référentiel structuré des avantages impériaux documentés.
- Invitation à la cour : 2 PP, coût réduit à 1 PP pour Otomo, Seppun ou Miya ; invitation pour le personnage et jusqu’à six membres de sa suite.
- Protection impériale : 10 PP, Honneur initial ≥ 3 et validation MJ ; effets d’Honneur/Gloire documentés affichés sans extrapolation.
- Les informations impériales vérifiées sont affichées dans les fiches Miya, Seppun et Otomo.
- Registre des lacunes étendu aux clans mineurs Mante, Renard, Blaireau et Mille-Pattes.
- Les écoles Seppun/Otomo et les formations mécaniques des quatre clans mineurs restent volontairement incomplètes tant qu’un bloc 1e exploitable n’est pas disponible.


## V0.20.89 — audit documentaire sorts et PNJ L5R
- Ajout d’un audit calculé du catalogue de sorts : nombre total, effets documentés et effets réellement manquants.
- Les champs conditionnels (portée, zone, résistance, dégâts) ne sont pas faussement comptés comme obligatoires.
- Ajout d’un audit calculé des PNJ des livres : profils mécaniques 1e récupérés, ancêtres/profils spéciaux et blocs encore à extraire.
- Correction du filtre PNJ `À extraire` : l’état interne est désormais `missing`, conforme à la valeur du filtre UI.
- Le bandeau de la bibliothèque PNJ affiche les trois compteurs documentaires.
- Les profils déjà présents, notamment Hida Kisada et Mirumoto Hitomi, sont conservés sans modification.
- Aucun nouveau profil PNJ et aucune mécanique de sort non présente dans les sources du projet n’ont été inventés.


## V0.20.89 — backlog PNJ L5R 1e
- Audit des entrées PNJ restant sans bloc mécanique complet : 22 entrées à la base de cette passe.
- Ajout d’un backlog calculé, trié par clan, qui conserve nom, livre, section et niveau de documentation disponible.
- Documentation partielle vérifiée intégrée pour Hida O-Ushi, Hida Amoro, Hida Tsuru, Hiruma Kage et Kaiu Utsu.
- Hida Amoro est documenté comme Hida/berserker rang 3 ; Hiruma Kage comme Hiruma rang 4 ; Kaiu Utsu comme Kaiu rang 5.
- Ces informations partielles apparaissent dans leur fiche sans être présentées comme des profils mécaniques complets.
- Les 17 autres entrées restent explicitement en attente d’un bloc RPG 1e exploitable.
- Aucun Anneau, Trait, Honneur, Gloire, compétence, avantage ou désavantage manquant n’est extrapolé.


## V0.20.89 — D&D unifié, édition par personnage
- La campagne possède désormais un seul système `D&D` : l’édition n’est plus fixée au niveau de la campagne.
- Chaque PJ D&D enregistre `rulesEdition` : `2014` (D&D 5e) ou `2024` (D&D 5.5).
- Chaque PNJ D&D utilise le même mécanisme ; le MJ peut choisir 2014 ou 2024 sur sa fiche sans créer deux PNJ.
- Les règles communes restent dans le profil D&D partagé ; les branches 2014/2024 existantes sont sélectionnées par `rulesEdition`.
- AD&D 2e est retiré des sélecteurs de JDR et de campagne.
- Les anciennes campagnes/données identifiées AD&D sont routées vers la famille D&D afin d’éviter une rupture d’accès ; aucune nouvelle campagne AD&D ne peut être créée.
- Lors de l’enregistrement d’une campagne D&D, `gameSystem` est normalisé à `D&D` et le champ d’édition de campagne est vidé.


## V0.20.89 — D&D hybride 5e / 5.5 sans perte de données
- Un même PJ ou PNJ D&D conserve un noyau commun et deux variantes internes `2014` / `2024`.
- Le changement d’édition sauvegarde les choix propres à l’édition quittée puis restaure ceux de l’édition choisie.
- Sont isolés par édition notamment : sous-classe, sorts, données 2024 de multiclassage/origine/maîtrises d’armes et modèle de créature 2014.
- Les caractéristiques, compétences, identité, profession, équipement et données communes restent partagés.
- La fiche de consultation détermine désormais l’édition depuis le personnage consulté, et non depuis l’état de l’éditeur courant.
- Le PNJ reste une seule entité : le MJ peut le basculer 2014 ↔ 2024 sans duplication.


## V0.20.89 — consolidation persistance et contexte
- Correction d’une régression : l’enregistrement d’une campagne ne lit plus l’éditeur système d’un personnage.
- Les actions strictement liées à une campagne (note rapide, événement, temps/date et lieu courant) sont maintenant protégées lorsque seule la bibliothèque JDR est ouverte.
- L’archivage/restauration d’un personnage de bibliothèque fonctionne sans campagne active.
- Export campagne porté au format 1.1 avec métadonnées de schéma ; une campagne D&D est exportée sous le système unique `D&D`.
- À l’import, les anciennes campagnes D&D/AD&D sont normalisées vers `D&D` et les personnages hérités reçoivent une édition 2014 par défaut, sauf indication explicite 2024/5.5.
- Les messages de sauvegarde de notes/événements reflètent le backend réellement utilisé (IndexedDB, localStorage ou mémoire).


## V0.20.89 — déroulement de partie : séance, scène, lieu et temps
- Une scène enregistrée avec le statut `Active` devient réellement la scène courante et synchronise son lieu/date/heure lorsqu’ils sont renseignés.
- Lors d’un changement de scène, l’ancienne scène active est terminée et reçoit une heure de fin ; la nouvelle scène est rattachée à la séance active.
- L’activation d’une séance repositionne la date de campagne sur sa date de début lorsqu’elle est renseignée et élimine une scène courante appartenant à une autre séance.
- Terminer une séance termine aussi la scène active et nettoie `currentSessionId` et `currentSceneId`.
- Au rechargement, les références courantes vers séance/scène terminée, archivée ou lieu inexistant sont automatiquement nettoyées.
- Le sélecteur de changement de scène masque les scènes terminées/abandonnées et trie les scènes disponibles.


## V0.20.89 — présence et déplacements dans une scène
- Une scène distingue désormais les participants prévus (`characterIds`) des personnages réellement présents (`presentCharacterIds`).
- À l’activation, les participants prévus deviennent présents ; si le lieu est synchronisé, leur localisation est mise à jour.
- La scène active propose des commandes rapides `Arrivée` / `Départ` pour chaque participant prévu.
- Une arrivée place le personnage dans le lieu de la scène ; un départ le retire de la présence sans supprimer sa participation prévue.
- Si la fiche d’un personnage le déplace vers un autre lieu, il est automatiquement retiré de la présence de la scène active.
- Le tableau de bord affiche les personnages réellement présents dans la scène, et non plus simplement tous les participants prévus.
- Au rechargement, la présence est réconciliée avec les personnages archivés et leur localisation réelle.


## V0.20.89 — journal automatique de scène et socle Combat
- Ajout d’un enregistreur central d’événements structurés dans le journal de campagne.
- Types prévus : narration, début/fin de scène, arrivée/départ, déplacement, temps, rencontre, découverte et événements de combat.
- Activation/fin de scène, arrivée/départ de personnage, déplacement du groupe et changements de date/heure génèrent désormais automatiquement des événements.
- La fin de séance génère également son événement chronologique avant nettoyage du contexte courant.
- La saisie manuelle d’événement utilise le même format structuré.
- Chaque événement peut porter séance, scène, lieu, personnages, source, importance et futur `combatId`.
- L’export 1.1 déclare désormais `structuredTimeline` et `combatEventReady` pour préparer l’intégration du gestionnaire de combats.


## V0.20.89 — première intégration du gestionnaire de combat
- Nouveau moteur de combat commun accessible depuis `Combats`, sans créer une seconde bibliothèque de personnages.
- Une rencontre peut être lancée depuis les personnages réellement présents dans la scène active.
- Initiative persistante et modifiable, ordre déterministe avec priorité PJ en cas d’égalité, round et tour actif.
- Santé/PV courant et maximum séparés ; combattants à 0 marqués hors combat et sautés au passage de tour.
- Ajout en cours de combat d’un PJ/PNJ existant ou d’un adversaire libre.
- Fenêtre Joueurs séparée : ordre, portraits, noms et tour actif, sans exposer les contrôles MJ ni les valeurs techniques de santé.
- La fenêtre Joueurs suit les révisions du combat via stockage local.
- Fin de combat : réinjection de l’état de santé dans les personnages de campagne et création d’un événement `combat_end`.
- Début de combat et nouveaux rounds alimentent le journal structuré V0.20.77 avec `combatId`.
- Le constructeur D&D 2014 historique est conservé dans le code ; cette version pose le moteur multisystème commun avant adaptation fine des règles D&D, Vampire, L5R et W.A.R.D.


## V0.20.89 — adaptateurs de combat par système
- D&D : PV et initiative DEX raccordés ; édition 2014/2024 lue sur chaque personnage.
- L5R 1e : blessures converties en réserve restante pour le suivi puis reconverties en dégâts subis à la fin ; initiative existante/Réflexes utilisée sans inventer une nouvelle règle.
- Vampire V2 : Santé, Sang et Volonté suivis séparément ; initiative basée sur les données déjà présentes (Astuce + Vigilance).
- W.A.R.D. : PV, Volonté et Santé mentale suivis ; initiative laissée manuelle tant qu’aucune formule canonique explicite n’est intégrée.
- Fin de combat : chaque ressource modifiée est réinjectée dans la fiche du personnage correspondant.
- Les événements structurés de début/round/fin de combat restent liés au combat, à la scène et à la séance.


## V0.20.89 — récupération automatique du combat depuis la scène
- Le lancement d’un combat depuis une scène active récupère automatiquement les PJ et PNJ réellement présents.
- Les créatures/adversaires explicitement rattachés à la scène sont également intégrables via `scene.creatures` / `scene.combatCreatures`.
- Pour D&D, une composition de rencontre associée à la scène (`scene.dndEncounter`) est prioritaire ; à défaut, le constructeur de rencontre D&D courant peut alimenter le lancement.
- Les combattants sont dédupliqués lors de la synchronisation.
- Un combat déjà actif propose `Ajouter les nouveaux présents` afin d’intégrer les arrivées et renforts de la scène sans réinitialiser rounds, PV ou initiative.
- Les personnages présents dans la scène restent distincts des combattants engagés : une fois le combat lancé, le roster du combat est autonome jusqu’à une synchronisation volontaire.


## V0.20.89 — composition détaillée des scènes et préparation du combat
- Chaque PJ/PNJ de scène dispose maintenant d’un statut de présence, d’un indicateur `Combat` et d’un camp (PJ/allié, adversaire, neutre).
- Présence et engagement sont distincts : un témoin, diplomate, otage ou PNJ neutre peut rester dans la scène sans entrer dans l’initiative.
- L’éditeur de scène accepte des créatures/adversaires propres à la scène avec nom/profil, quantité, camp, groupe et statut engagé.
- Le lancement du combat importe uniquement les PJ/PNJ/créatures marqués engagés.
- Les camps et groupes des créatures sont transmis au gestionnaire de combat.
- Les scènes existantes restent compatibles : par défaut les PJ sont engagés ; les PNJ sans configuration explicite restent neutres et non engagés.


## V0.20.89 — structure des lieux et déplacements
- Nouvelle vue arborescente des lieux fondée sur `parentLocationId`, avec profondeur et nombre de personnages présents par lieu.
- Déplacement de groupe vers un lieu depuis la vue Lieux.
- Trois sources de déplacement : personnages présents dans la scène, tous les PJ actifs, ou sélection manuelle PJ/PNJ.
- Bouton rapide `Déplacer le groupe ici` sur chaque lieu.
- Chaque personnage conserve son `currentLocationId`; aucun stockage parallèle n’est créé.
- Un déplacement hors du lieu de la scène retire automatiquement le personnage de la présence effective de cette scène.
- Chaque déplacement produit un événement structuré `movement` avec origine(s), destination et personnages concernés.
- Ce socle est volontairement générique et prépare l’intégration ultérieure d’un module cartographique/itinéraires sans prétendre reprendre un code source externe qui n’a pas été retrouvé.


## V0.20.89 — moteur de voyage Rokugan V34 + socle multi-univers
- Intégration réelle d’un noyau de `rokugan-map-tool-v34-regions-pdf-audit.zip`, retrouvé dans le dossier Drive L5R.
- 394 segments du réseau routier V34 sont embarqués sous forme de graphe réduit ; 93 destinations nommées sont exposées.
- Calibration conservée : `0,093587 km/pixel`.
- Les profils V34 de vitesse de groupe, multiplicateurs de type de route, rythmes et météo sont conservés.
- Calcul d’itinéraire par Dijkstra pondéré sur le temps estimé ; restitution distance, durée, nombre de segments et étapes nommées.
- L’intégration sépare le moteur des données d’univers : le réseau Rokugan n’est activé que pour L5R.
- Pour D&D, Vampire, W.A.R.D. et les autres systèmes, un calculateur générique configurable (distance, vitesse, coefficient terrain/conditions) est disponible sans imposer les hypothèses de Rokugan.
- La carte raster, les plans architecturaux, le mobilier 3D et les données documentaires V34 ne sont pas encore embarqués dans Assistant JDR : cette version porte d’abord le moteur de voyage.


## V0.20.89 — adaptateur Monde/Voyage
- Nouvelle interface interne `WORLD_TRAVEL_ADAPTERS_V2084` : Assistant JDR appelle un moteur de voyage adapté au système au lieu de coder le monde directement dans la campagne.
- L5R utilise l’adaptateur `rokugan-v34`, raccordé au réseau et aux règles réellement extraits de Rokugan Map Tool V34.
- Les autres univers utilisent l’adaptateur générique en attendant un module spécialisé ; ils ne reçoivent aucune hypothèse géographique de Rokugan.
- Un résultat de voyage normalisé peut maintenant être appliqué à la campagne : destination, voyageurs, distance, durée et horloge.
- L’application d’un voyage déplace les personnages, met à jour le lieu courant de campagne, avance la date/heure et journalise déplacement + temps de voyage.
- Une destination Rokugan absente de la campagne est créée comme lieu importé par le module de voyage, ce qui permet de raccorder progressivement le monde externe à la structure locale.
- Si l’arrivée correspond au lieu de la scène active, les voyageurs sont réintégrés à sa présence effective.


## V0.20.89 — voyage journalier Rokugan
- Exploitation supplémentaire du véritable Rokugan Map Tool V34 : 173 infrastructures de voyage avec position, services, niveau de confiance et caractère approximatif.
- Plan journalier d'un itinéraire calculé : nombre de jours, distance moyenne quotidienne, météo et étape utile proche.
- Météo quotidienne générable selon les pondérations saisonnières V34 (printemps, été, automne, hiver) ou conservée fixe.
- Affichage des risques météo V34 et des services d'étape : hébergement, ravitaillement, écurie, relais, soutien officiel et cols/passes.
- Les services inférés/probables restent explicitement signalés comme aides MJ ; ils ne sont pas transformés en faits canoniques.
- Le résultat journalier reste attaché au résultat normalisé de voyage : cette couche pourra être remplacée par une infrastructure moderne pour W.A.R.D. et Vampire sans modifier le cœur de campagne.


## V0.20.89 — voyage interactif persistant
- Un voyage peut désormais être démarré puis progressé journée par journée.
- L’état courant est enregistré directement dans la campagne (`activeTravelV2086`) : destination, voyageurs, jour atteint, kilomètres parcourus/restants, plan quotidien, statut, date/heure de départ.
- Commandes : démarrer, journée suivante, interrompre pour une scène, reprendre et terminer.
- Chaque journée validée avance l’horloge de campagne et produit un événement de temps ; l’arrivée déplace réellement les voyageurs vers la destination.
- Les risques météo, contrôles, relais et incidents sont présentés comme propositions MJ. Ils ne créent aucune scène ni événement canonique automatiquement.
- `Interrompre pour une scène` suspend le voyage puis ouvre le sélecteur de scène ; le voyage reste reprenable après la scène.
- Le modèle persistant est volontairement générique et pourra être alimenté par un futur adaptateur Monde moderne W.A.R.D./Vampire.


## V0.20.89 — étapes jouables et continuité de voyage
- Les voyageurs possèdent maintenant un état de transit persistant : `travelStateV2087`, affiché comme « En voyage » avec étape/destination.
- Chaque journée atteinte peut être rattachée à une halte V34 ; une étape absente de la campagne est créée comme lieu de voyage avec provenance et caractère approximatif conservés.
- Les propositions d’incident disposent de trois actions MJ : ignorer, valider comme événement, ou créer une scène.
- Ignorer ne crée aucun événement canonique. Valider crée explicitement un événement de rencontre. Créer une scène suspend le voyage et préremplit l’éditeur avec date, heure, voyageurs, lieu/halte et proposition.
- Le voyage conserve un historique interne : départ, journées terminées, propositions ignorées, incidents validés, demandes de scène, reprises et arrivée.
- Après une scène, le voyage suspendu reste disponible et peut être repris sans perdre sa progression.
- À l’arrivée, l’état « en voyage » est retiré et les personnages sont placés à destination par le mécanisme V0.20.86.


## V0.20.89 — audit de régression Rokugan et référentiels

Cette version corrige une régression réelle apparue lors de l’intégration du voyage.

### Voyage Rokugan
- Le moteur V0.20.83 n’exposait que 93 lieux nommés et son graphe de 394 segments / 246 nœuds était réparti en 14 composantes déconnectées. Certaines paires départ/destination pouvaient donc ne produire aucun itinéraire.
- Le planificateur utilise désormais les 329 lieux du corpus Rokugan Map Tool V34 : 326 lieux officiels et 3 lieux de campagne.
- Les lieux hors nœud routier sont raccordés au réseau par des connecteurs locaux assistés.
- Les composantes routières disjointes peuvent être reliées par des « liaisons non cartographiées à confirmer », pénalisées et explicitement signalées comme approximatives. Elles restent une aide MJ et non un fait canonique.
- Le gestionnaire final du bouton « Calculer l’itinéraire » remplace la chaîne de listeners superposés V0.20.83–V0.20.87 afin d’éviter les doubles traitements.

### Lieux et plans
- Le gestionnaire de lieux L5R propose un référentiel V34 séparé et recherchable de 329 lieux.
- Un lieu de référence peut être ajouté à la campagne sans transformer sa provenance en donnée inventée.
- 74 noms/alias sont identifiés dans le moteur V34 comme disposant d’un plan spécifique. Les autres lieux peuvent recevoir un plan adaptatif dans le projet cartographique V34.
- L’Assistant permet de mémoriser l’URL ou le chemin local du projet Rokugan Map Tool V34 puis de l’ouvrir lorsque le plan détaillé est nécessaire. Le projet V34 ne supportant pas actuellement de deep-link de lieu, l’ouverture se fait sur son interface générale.

### PNJ
- Audit statique V0.20.66 → V0.20.87 : les constantes PNJ historiques de l’Assistant n’avaient pas été supprimées, mais plusieurs référentiels n’étaient plus visibles dans l’interface.
- 51 PNJ de référence L5R sont désormais exposés à partir des registres PNJ campagne/univers, du registre Dragon v1.2, des fiches/dossiers de la délégation Dragon et du registre PNJ du Rokugan Map Tool V34.
- Ces références ne deviennent des PNJ de campagne qu’après import explicite.

### Règles
- Le référentiel Drive L5R de règles de base v6 est de nouveau visible en complément de la bibliothèque L5R déjà intégrée.
- Le référentiel maître L5R 1e v5.0 est identifié comme source maître et peut être ouvert depuis l’écran Règles.
- Les écrans Règles D&D, Vampire V2 et W.A.R.D. ne restent plus de simples pages vides : ils exposent les référentiels/profils déjà intégrés dans le moteur.
- Aucun corpus manquant n’est inventé.

### Factions W.A.R.D.
- Le Drive W.A.R.D. a été recontrôlé avant restauration.
- Autorités vérifiées au 5 octobre 2026 : Livre V29.123 ; Standard de développement des factions V1.11 ; Bible factions V1.90 ; Registre des factions validées V1.7.
- Le registre V1.7 distingue notamment France / DAE, Consortium Obsidienne et Vatican / CUSTODIA comme VALIDÉ(E)S — PROTÉGÉ(E)S, et Vael’na comme TERMINÉE — GEL STRUCTUREL / CHRONOLOGIE CONTRÔLÉE en attente de réintégration.
- La vue Factions affiche la liste actuellement câblée dans l’Assistant tout en indiquant explicitement que le corpus W.A.R.D. complet reste gouverné par les référentiels maîtres du Drive.

- Les boutons de la vue W.A.R.D. permettent d’ouvrir directement le Standard factions V1.11, la Bible factions V1.90 et le Registre validé V1.7 pour consulter le corpus complet sans le recopier partiellement dans l’application.


## V0.20.89 — consolidation après contrôle de régression

### Routage Rokugan
- Le moteur n’assemble plus systématiquement les 14 composantes routières V34 avant le calcul.
- Il cherche d’abord un trajet sur le réseau réellement connecté.
- Si départ et destination restent séparés, une seule liaison assistée est créée entre leurs deux composantes, par la paire de nœuds géographiquement la plus proche. Cela évite les chaînes de ponts virtuels traversant des composantes sans rapport.
- Le planificateur propose maintenant deux modes explicites : « Réseau V34 recommandé » et « Direct / hors réseau (estimation MJ) ».
- Le mode direct est signalé comme estimation : il ne garantit ni route, ni col, ni pont, ni droit de passage.
- Le résultat routier affiche systématiquement l’alternative directe indicative. Un facteur de détour supérieur à 2,75 déclenche un avertissement invitant le MJ à contrôler la carte.
- Shinden Yuisho reste volontairement non calculable automatiquement tant que le corpus V34 ne lui fournit pas de coordonnées.

### Plans Rokugan
- Les lieux de campagne correspondant à un lieu disposant d’un plan spécifique V34 reçoivent directement un bouton « ★ Plan détaillé V34 ».
- Ce bouton ouvre le projet Rokugan Map Tool V34 configuré par l’utilisateur. Le projet V34 ne disposant pas actuellement d’un deep-link stable vers un lieu précis, l’ouverture se fait sur son interface générale.
- Le référentiel des 329 lieux et les 74 noms/alias de plans spécifiques sont conservés.

### W.A.R.D. — factions et autorités
- Le dossier Drive « factions validées » a été relu le 7 octobre 2026 : 73 fichiers, représentant 61 factions distinctes à leur version numérique maximale.
- Les 61 factions sont maintenant indexées localement dans l’écran Factions avec recherche, version et bouton vers le dossier source.
- La liste de sélection « Appartenance factionnelle » de création/modification W.A.R.D. contient désormais ces 61 factions, tout en préservant les identifiants historiques W.A.R.D., MAJESTIC, DAE, CUSTODIA, KAGAMI et Consortium Obsidienne.
- Autorités courantes contrôlées : Livre de base V29.130 ; Standard Factions V1.11 ; Registre factions V1.9 ; Bible factions V1.90 ; État de reprise global V1.63.
- L’écran Règles W.A.R.D. ouvre directement chacune de ces autorités.

### D&D 5e / 5.5
- L’écran Règles expose désormais les référentiels réellement présents dans l’application : éditions 2014/2024, 11 espèces 2024, 16 historiques, 12 classes, sous-classes 2014 et 2024, sorts par classe et niveau, équipement, bestiaire et objets magiques.
- Le choix 2014 / 2024 reste propre à chaque personnage.

### Vampire V2
- L’écran Règles expose désormais les 7 clans intégrés et leurs Disciplines, les 10 Disciplines, les 9 voies/Humanité, les niveaux de santé, les professions/couvertures, archétypes rapides et niveaux de PNJ déjà utilisés par le moteur.

### Version affichée
- Le titre de l’application a été remis en cohérence : « Assistant JDR — V0.20.89 — Consolidation Rokugan & référentiels ».
