import { Photographer } from "../models/photographer.js";

export function renderPhotographerBanner(photographer: Photographer): void {
  const container = document.querySelector(".photographer_banner");
  if (!container) {
    throw new Error("Container .photographer_banner introuvable");
  }
  const photographerDetails = photographerBanner(photographer);
  container.innerHTML = photographerDetails;
}
export function photographerBanner(photographer: Photographer): string {
  return `<div class="photographer_banner_details">
  <h1>${photographer.name}</h1>
  <p class="location">${photographer.fullLocation}</p>
  <p class="tagline">${photographer.tagline}</p>
  </div>
  <button>Contactez-moi</button>
  <img src="${photographer.portraitPath}" alt="${photographer.name}" class="photographer_banner_image">`;
}
