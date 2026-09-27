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
  displayModale();
}

function displayHeader(photographer: Photographer): void {
  const container = document.querySelector(".photographer_banner");
  if (!container) {
    throw new Error("Container .photographer_banner introuvable");
  }
  container.innerHTML = photographerBanner(photographer);
}

function photographerBanner(photographer: Photographer): string {
  return `<div class="photographer_banner_details">
  <h1>${photographer.name}</h1>
  <p class="location">${photographer.fullLocation}</p>
  <p class="tagline">${photographer.tagline}</p>
  </div>
  <button id="contact_modale">Contactez-moi</button>
  <img src="${photographer.portraitPath}" alt="${photographer.name}" class="photographer_banner_image">`;
}

function displayModale() {
  const container = document.querySelector(".photographer_modale");
  if (!container) {
    throw new Error("Container .photographer_modale introuvable");
  }
  container.innerHTML = photographerModale();
}

function photographerModale(): string {
  const contactButton = document.getElementById("contact_modale");
  const modaleTemplate = contactButton?.addEventListener("click", () => {
    console.log("hehh");
  });
  return `<div class="modal" aria-hidden="true" role="dialog" hidden>
   <div>
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
   </div>
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
  return ` <button aria-haspopup="listbox" aria-expanded="false" aria-controls="dropdown" id="dropdown_button">Trier par</button>
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
    ? `<video><source src="${media.mediaPath}"></video>`
    : `<img src="${media.mediaPath}" alt="${media.title}">`;
  const html = `<article>
    ${mediaElement}
    <h3>${media.title}</h3>
    <p class="likes"></p>
  </article>`;
  return html;
}
