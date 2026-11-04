# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. ✏️
|Parcelle|Nombre d'opérations|Dépenses|
|P1      |4                  |15500   |
|P2      |3                  |9500    |
|P3      |3                  |15000   |
|Total   |10                 |40000   |
.cout minimal:1500 FCFA
.Cout maximal:8000 FCFA

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Ajouter une opération valide |l'opération est ajoutée |Opération O13 ajoutée. Le registre compte 11 opérations |Moi |
| Ajouter un identifiant déjà utilisé |l'opération  est refusé. | Cet identifiant existe déjà |Moi |
| Rechercher un identifiant inexistant|l'opération est introuvable |Opération P15 introuvable. | Moi|
| Trier par cout |du plus petit au plus grand |Les opérations sont affichées par ordre croissant de cout | Moi|
| Trier par date | de la plus ancienne à la plus récente|Les opérations sont affichées dans l'ordre chronologique | Moi|
| Afficher la synthèse|total de 40000 FCFA |Nombre d'opérations : 11. Total des coûts : 45000 FCFA | Moi|

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
