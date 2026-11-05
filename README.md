# Registre des opérations maraîchères

> Projet individuel du SAS DFS, brief 1 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte
Le régistre des opérations maraîchères est destiné à la responsable d’une exploitation maraîchère pédagogique. Elle a besoin de remplacer son carnet papier par un outil numérique pour mieux suivre les opérations et réduire les oublis. Elle saisit l’identifiant, la date, la parcelle, la culture, le type d’opération et le coût en FCFA. Le programme affiche les opérations enregistrées et permet de les rechercher et de les trier. Il calcule le total des dépenses, les dépenses par parcelle ainsi que les coûts minimum et maximum. Cependant, il ne permet pas d’enregistrer les revenus ni de calculer la rentabilité de l’exploitation. Il ne vérifie pas non plus si la culture saisie correspond réellement à la parcelle.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-1-registre-maraicher.git
cd brief-1-registre-maraicher
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/operations.json`
- [x] Ajouter une opération, saisies invalides refusées sans arrêter le programme
- [x] Lister les opérations, message si le registre est vide
- [x] Rechercher par identifiant ou par parcelle ; filtrer par culture
- [x] Trier par coût ou par date
- [x] Synthèse : total, nombre et total par parcelle, coût minimum et maximum
- [x] Bonus : supprimer et modifier une opération (choix 6 et 7)
- [x] Bonus : tri par coût décroissant, parcelle la plus coûteuse

## Données

Les données sont enregistrées dans le fichier donnees/operations.json, qui contient 10 opérations fictives. Chaque opération comporte les champs suivants : identifiant (id), date, parcelle, culture, type d’opération et coût (coutFCFA). La date utilise le format AAAA-MM-JJ et les coûts sont exprimés en FCFA. Les informations utilisées sont des exemples fictifs et ne représentent pas les données d’une réelle exploitation maraîchère.

## Limites

Le registre enregistre des dépenses, pas les revenus, il ne mesure donc pas la rentabilité.
Il ne vérifie pas non plus si la culture saisie correspond réellement à la parcelle.
L'id ne suit pas forcément une strusture bien définie.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Lou Freshnelle Marie Joviale Lohouin,jovialelohouin-blip.
J'ai travaillé avec des amis sur app.js ,nous avons collaboré à la mise en place du menu principal,à l'organisation des différentes fonctionnalités et à leur intégration dans l'application.