import { Media } from "../models/media.js";
import { Photographer } from "../models/photographer.js";

export function renderDetailPhotographerPage(
  photographer: Photographer,
  medias: Media[],
): void {
  displayHeader(photographer);
  displayDropDown();
  displayFilter();
  displayMedia(medias);
  displayModal();
}

function displayHeader(photographer: Photographer): void {
  const container = document.querySelector(".photographer_banner");
  if (!container) {
    throw new Error("Container .photographer_banner introuvable");
  }
  container.innerHTML = photographerBanner(photographer);
}

function photographerBanner(photographer: Photographer): string {
  return /*html*/ `
  <div class="photographer_banner_details">
  <h1>${photographer.name}</h1>
  <p class="location">${photographer.fullLocation}</p>
  <p class="tagline">${photographer.tagline}</p>
  </div>
  <button id="contact_modal">Contactez-moi</button>
  <img src="${photographer.portraitPath}" alt="${photographer.name}" class="photographer_banner_image">`;
}

function displayModal() {
  const container = document.querySelector(".photographer_modal");
  if (!container) {
    throw new Error("Container .photographer_modal introuvable");
  }
  container.innerHTML = photographerModal();
}

function photographerModal(): string {
  const contactButton = document.getElementById("contact_modal");
  const modalTemplate = contactButton?.addEventListener("click", () => {});
  return /*html*/ `
  <div class="modal" aria-hidden="true" role="dialog" hidden>
   <header>
   <h2>Contactez-moi</h2>
   </header>
    <form action="" method="">
  <label for="prenom">Prénom</label>
  <input type="text" id="prenom" name="prenom" required>
  <label for="nom">Nom</label>
  <input type="text" id="nom" name="nom" required>
  <label for="message">Votre message</label>
  <input type="text" id="message" name="message" required>
  <button type="submit">Envoyer</button>
</form>
</div>`;
}

function displayDropDown() {
  const container = document.querySelector(".photographer_filter");
  if (!container) {
    throw new Error("Container .photographer_filter introuvable");
  }
  container.innerHTML = photographerFilter();
}

function photographerFilter() {
  return /*html*/ ` 
  <button aria-haspopup="listbox" aria-expanded="false" aria-controls="dropdown" id="dropdown_button">Trier par</button>
  <ul id="dropdown" role="listbox" class="dropdown-content" hidden>
    <li role="option" data-sort="popularity">Popularité</li>
    <li role="option" data-sort="date">Date</li>
    <li role="option" data-sort="title">Titre</li>
  </ul>`;
}

function displayFilter() {
  const dropdownButton = document.getElementById("dropdown_button");
  const dropdown = document.getElementById("dropdown");
  if (!dropdownButton) {
    throw new Error("Button .dropdown_button introuvable");
  }
  if (!dropdown) {
    throw new Error("Unordored list .dropdown introuvable");
  }
  dropdownButton.addEventListener("click", () => {
    dropdown.toggleAttribute("hidden");
  });
}

function displayMedia(medias: Media[]): void {
  const container = document.querySelector(".photographer_gallery");
  if (!container) {
    throw new Error("Container .photographer_gallery introuvable");
  }
  container.innerHTML = medias
    .map((media) => photographerGalleryFactory(media))
    .join("");
}

function photographerGalleryFactory(media: Media): string {
  const isVideo = media.type === "video";
  const mediaElement = isVideo
    ? /*html*/ `<video><source src="${media.mediaPath}"></video>`
    : /*html*/ `<img src="${media.mediaPath}" alt="${media.title}">`;
  const html =
    /*html*/
    `<article>
    ${mediaElement}
    <h3>${media.title}</h3>
    <p class="likes"></p>
  </article>`;
  return html;
}
