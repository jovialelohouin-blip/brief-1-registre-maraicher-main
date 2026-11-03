# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | O03 |
| `date` |date de l'opération |date |date au format AAAA-MM-JJ |- |2026-10-21|
| `parcelle` |identifiant de la parcelle |texte |obligatoire et non vide |- |P1|
| `culture ` |nom de la culture |texte |obligatoire et non vide |- |tomate |
| `operation` |type de travail effectué sur la parcelle |texte |valeur autorisée uniquement |- |arrosage |
| `coutFCFA ` |depense liée à l'opération |nombre |nombre positif ou égal à 0 |FCFA|2000|

**Listes de valeurs autorisées** : Les opérations effectuées sont:semis,arrosage,désherbage,répiquage et récolte.

**Sources** : 
SUJET.md
donnees/operations.json
fiches/2-donnees-json.md

