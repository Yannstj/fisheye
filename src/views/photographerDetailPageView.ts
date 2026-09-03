import { Media } from "../models/media.js";
import { Photographer } from "../models/photographer.js";

export function renderDetailPhotographerPage(
  photographer: Photographer,
  medias: Media[],
): void {
  displayHeader(photographer);
  displayDropDown();
  displayMedia(medias);
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
  <button>Contactez-moi</button>
  <img src="${photographer.portraitPath}" alt="${photographer.name}" class="photographer_banner_image">`;
}

function displayDropDown() {
  const container = document.querySelector(".photographer_filter");
  if (!container) {
    throw new Error("Container .photographer_filter introuvable");
  }
  container.innerHTML = photographerFilter();
}

function photographerFilter() {
  return ` <button aria-haspopup="listbox" aria-expanded="false" aria-controls="dropdown">Trier par</button>
  <ul id="dropdown" role="listbox" class="dropdown-content" hidden>
    <li role="option" data-sort="popularity">Popularité</li>
    <li role="option" data-sort="date">Date</li>
    <li role="option" data-sort="title">Titre</li>
  </ul>`;
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
