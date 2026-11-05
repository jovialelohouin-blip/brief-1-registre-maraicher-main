// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
// 1. IMPORTS
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';
import { modifierOperation, parcelleLaPlusCouteuse, supprimerOperation, trierParCoutDecroissant } from './src/bonus.js';

// 2. CONSTANTES
const FICHIER_DONNEES = 'donnees/operations.json';

// 3. FONCTIONS D'AIDE (évitent de répéter le même code)

// Pose plusieurs questions à la suite et retourne les réponses dans un tableau.
// Retourne null dès que la saisie est fermée
async function demanderChamps(questions) {
    const reponses = [];
    for (const question of questions) {
        const reponse = await demander(question);
        if (reponse === null) return null;
        reponses.push(reponse);
    }
    return reponses;
}

// Affiche une liste d'opérations, avec un titre facultatif.
function afficherResultats(liste, titre) {
    if (titre) console.log(titre);
    console.log(listerOperations(liste));
}

// Affiche les erreurs d'un refus (ajout ou modification).
function afficherErreurs(titre, erreurs) {
    console.log(titre);
    for (const erreur of erreurs) {
        console.log(`  - ${erreur}`);
    }
}

// 4. FONCTIONS D'ACTION (une fonction = une action du menu)

// Affiche le menu principal (appelée avant chaque choix).
function afficherMenu() {
    console.log('\n--------------------- MENU ---------------------');
    console.log('1. Ajouter une opération');
    console.log('2. Lister les opérations');
    console.log('3. Rechercher (identifiant, parcelle, culture)');
    console.log('4. Trier (coût, date)');
    console.log('5. Synthèse des dépenses');
    console.log('6. Supprimer une opération');
    console.log('7. Modifier une opération');
    console.log('0. Quitter');
}

// Action 1 : demande les champs, valide, ajoute et enregistre l'opération.
async function ajouter(operations) {
    console.log('\n--- Ajouter une opération ---');

    const reponses = await demanderChamps([
        'Identifiant (ex. O11) : ',
        'Date (AAAA-MM-JJ) : ',
        'Parcelle (ex. P1) : ',
        'Culture (ex. tomate) : ',
        `Opération (${OPERATIONS.join(', ')}) : `,
        'Coût en FCFA : '
    ]);
    if (reponses === null) return false;

    const [id, date, parcelle, culture, operation, coutFCFA] = reponses;

    // Normalisation des informations saisies
    const saisie = {
        id: id.toUpperCase(),
        date,
        parcelle: parcelle.toUpperCase(),
        culture: culture.toLowerCase(),
        operation: operation.toLowerCase(),
        coutFCFA
    };

    // Vérification et ajout
    const erreurs = ajouterOperation(operations, saisie);

    if (erreurs.length > 0) {
        afficherErreurs('Opération refusée :', erreurs);
        console.log(`Le registre compte toujours ${operations.length} opération(s).`);
    } else {
        await enregistrerJson(FICHIER_DONNEES, operations);
        console.log(
            `Opération ${saisie.id} ajoutée. Le registre compte ${operations.length} opération(s).`
        );
    }
    return true;
}

// Action 2 : affiche toutes les opérations du registre.
function lister(operations) {
    afficherResultats(operations, `\n--- Liste des opérations (${operations.length}) ---`);
}

// Action 3 : sous-menu de recherche (par identifiant, parcelle ou culture).
async function rechercher(operations) {
    console.log('\n--- Rechercher ---');
    console.log('1. Par identifiant');
    console.log('2. Par parcelle');
    console.log('3. Les opérations d’une culture');

    const choix = await demander('Votre choix : ');
    if (choix === null) return false;

    switch (choix) {

        // Une seule opération, par son identifiant
        case '1': {
            const id = await demander('Identifiant : ');
            if (id === null) return false;
            const resultat = trouverParId(operations, id.toUpperCase());
            console.log(
                resultat ? formaterOperation(resultat) : `Opération ${id.toUpperCase()} introuvable.`
            );
            break;
        }

        // Toutes les opérations d'une parcelle
        case '2': {
            const saisie = await demander('Parcelle : ');
            if (saisie === null) return false;
            const parcelle = saisie.toUpperCase();
            const resultats = filtrerParParcelle(operations, parcelle);
            afficherResultats(resultats, `${resultats.length} opération(s) sur la parcelle ${parcelle} :`);
            break;
        }

        // Toutes les opérations d'une culture
        case '3': {
            const saisie = await demander('Culture : ');
            if (saisie === null) return false;
            const culture = saisie.toLowerCase();
            const resultats = filtrerParCulture(operations, culture);
            afficherResultats(resultats, `${resultats.length} opération(s) pour la culture ${culture} :`);
            break;
        }

        default:
            console.log('Choix inconnu : retour au menu.');
    }
    return true;
}

// Action 4 : sous-menu de tri (coût croissant, date, coût décroissant).
async function trier(operations) {
    console.log('\n--- Trier ---');
    console.log('1. Par coût croissant');
    console.log('2. Par date, de la plus ancienne à la plus récente');
    console.log('3. Par coût décroissant');

    const choix = await demander('Votre choix : ');
    if (choix === null) return false;

    switch (choix) {
        case '1': afficherResultats(trierParCout(operations)); break;
        case '2': afficherResultats(trierParDate(operations)); break;
        case '3': afficherResultats(trierParCoutDecroissant(operations)); break;
        default: console.log('Choix inconnu : retour au menu.');
    }
    return true;
}

// Action 5 : affiche la synthèse des dépenses (total, par parcelle, min/max).
function afficherSynthese(operations) {
    console.log('\n--- Synthèse des dépenses enregistrées ---');
    console.log(`Nombre d'opérations : ${operations.length}`);
    console.log(`Total des coûts : ${totalCouts(operations)} FCFA`);

    // Détail par parcelle
    console.log('Par parcelle :');
    for (const [parcelle, resultat] of Object.entries(syntheseParParcelle(operations))) {
        console.log(`  ${parcelle} : ${resultat.nombre} opération(s), ${resultat.total} FCFA`);
    }

    // Coût minimum et maximum
    const minMax = coutMinMax(operations);
    if (minMax === null) {
        console.log('Coût minimum et maximum : aucune donnée');
    } else {
        console.log(`Coût minimum : ${minMax.min} FCFA · Coût maximum : ${minMax.max} FCFA`);
    }

    // Parcelle la plus coûteuse (bonus)
    const couteuse = parcelleLaPlusCouteuse(operations);
    if (couteuse !== null) {
        console.log(`Parcelle la plus coûteuse : ${couteuse.parcelle} (${couteuse.total} FCFA)`);
    }

    console.log('Rappel : ce sont des dépenses. Sans les revenus, elles ne mesurent pas la rentabilité.');
}

// Action 6 : supprime une opération à partir de son identifiant, puis enregistre.
async function supprimer(operations) {
    const id = await demander('Identifiant : ');
    if (id === null) return false;

    const identifiant = id.toUpperCase();

    if (supprimerOperation(operations, identifiant) === undefined) {
        console.log(`Opération ${identifiant} introuvable.`);
    } else {
        await enregistrerJson(FICHIER_DONNEES, operations);
        console.log(
            `Opération ${identifiant} supprimée. Le registre compte ${operations.length} opération(s).`
        );
    }
    return true;
}

// Action 7 : modifie un champ d'une opération, puis enregistre.
async function modifier(operations) {
    const reponses = await demanderChamps([
        'Identifiant : ',
        'Champ à modifier (date, parcelle, culture, operation, coutFCFA) : ',
        'Nouvelle valeur : '
    ]);
    if (reponses === null) return false;

    const [id, champ, valeur] = reponses;
    const identifiant = id.toUpperCase();

    // Normalisation de la valeur selon le champ
    let valeurNormalisee = valeur;
    if (champ === 'parcelle') valeurNormalisee = valeur.toUpperCase();
    if (champ === 'culture' || champ === 'operation') valeurNormalisee = valeur.toLowerCase();

    const erreurs = modifierOperation(operations, identifiant, champ, valeurNormalisee);

    if (erreurs.length > 0) {
        afficherErreurs('Modification refusée :', erreurs);
    } else {
        await enregistrerJson(FICHIER_DONNEES, operations);
        console.log(`Opération ${identifiant} modifiée.`);
    }
    return true;
}
// 5. PROGRAMME PRINCIPAL
async function main() {

    // --- Démarrage : ouverture de la saisie et accueil ---
    ouvrirSaisie();

    console.log('==================================================');
    console.log('   REGISTRE DES OPÉRATIONS MARAÎCHÈRES');
    console.log('   Exploitation maraîchère pédagogique');
    console.log('==================================================');

    // --- Chargement des données depuis le fichier JSON ---
    let operations = [];
    try {
        operations = await chargerJson(FICHIER_DONNEES);
        console.log(`${operations.length} opération(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
    } catch (erreur) {
        console.log(
            `Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le registre démarre vide.`
        );
    }

    // --- Boucle du menu : affichage, choix, action ---
    let continuer = true;
    while (continuer) {
        afficherMenu();
        const choix = await demander('Votre choix : ');

        // Saisie fermée (Ctrl+D) : on sort de la boucle
        if (choix === null) break;

        // --- Gestion des erreurs autour de chaque action ---
        try {
            switch (choix) {
                case '1': continuer = await ajouter(operations); break;
                case '2': lister(operations); break;
                case '3': continuer = await rechercher(operations); break;
                case '4': continuer = await trier(operations); break;
                case '5': afficherSynthese(operations); break;
                case '6': continuer = await supprimer(operations); break;
                case '7': continuer = await modifier(operations); break;
                case '0':
                    console.log('Au revoir !');
                    continuer = false;
                    break;
                default:
                    console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
            }
        } catch (erreur) {
            if (erreur.message.startsWith('TODO')) {
                console.log(`À compléter : ${erreur.message}`);
            } else {
                console.log(`Erreur inattendue : ${erreur.message}`);
            }
        }
    }

    // --- Fermeture de la saisie ---
    fermerSaisie();
}

main();
