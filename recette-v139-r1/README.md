# Assistant JDR — V139-R1 : correctifs d'affichage XP

Banc HTTPS public **expurgé** dédié aux tests de la progression L5R avec données entièrement fictives. Base IndexedDB `JDRRecetteV139XP`, **partagée avec le banc V139 d'origine** pour permettre le contrôle des événements déjà enregistrés. Réinitialiser l'état fictif si nécessaire. Cette base n'est pas la base privée de l'application complète.

Différences par rapport à la recette V139 :

- Historique toujours présenté du plus ancien au plus récent, y compris lorsque plusieurs opérations ont le même horodatage. Les anciennes opérations sont triées à l'affichage, sans modification de leur stockage.
- Libellés français, notamment **Endurance** pour la clé technique `stamina`.
- Nouveaux événements enrichis de `progression.sequence` pour départager les opérations d'horodatage identique.
- Le schéma d'export JSON reste `JDR_V139_XP_BROWSER_TEST_ONLY` et le format `0.20.139` : les archives fictives V139 restent compatibles. La V140 privée complète n'est pas compatible de ce seul fait.

Échanges de fichiers et de données : exclusivement sur la base fictive du banc. Aucun PDF, corpus L5R, scénario ou donnée privée publiée. Les coûts des améliorations restent des exemples arbitraires du MJ ; ils ne sont pas homologués selon les règles officielles.

Tests attendus dans Work : exécuter la séquence 9 XP initiaux → +6 → −4 Kenjutsu → −7 Endurance, vérifier que l'historique présente **+6, −4, −7** avec « Endurance 2 → 3 » ; recharge / export / import / 2e onglet et 8/8 diagnostics. Tester également un import d'archive fictive V139 précédente.

**Limite :** même une réussite complète ne valide que les fonctions isolées de ce banc ; l'interface complète V140 reste à valider en navigateur local autorisé.