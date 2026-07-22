export function photographerCardTemplate(data) {
    const { name, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        // TODO: reprendre la logique de l'ancien scripts/templates/photographer.js
        // (créer <article>, <img src={picture}>, <h2>{name}</h2>, les assembler, les retourner)
    }
    return { name, picture, getUserCardDOM };
}
