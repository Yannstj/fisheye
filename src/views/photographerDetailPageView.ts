import { Media } from "../models/media.js";
import { Photographer } from "../models/photographer.js";

export function renderDetailPhotographerPage(
  photographer: Photographer,
  medias: Media[],
): void {
  displayHeader(photographer);
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

function displayMedia(medias: Media[]): void {
  const container = document.querySelector(".photographer_gallery");
  if (!container) {
    throw new Error("Container .photographer_gallery introuvable");
  }
  container.innerHTML = medias
    .map((media) => photographerGallery(media))
    .join("");
}

function photographerGallery(media: Media): string {
  const isVideo = media.type === "video";
  return isVideo
    ? `<article><video><source src="${media.mediaPath}"></video></article>`
    : `<article><img src="${media.mediaPath}" alt="${media.title}"></article>`;
}
