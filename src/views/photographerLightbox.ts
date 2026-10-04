import { Media } from "../models/media.js";

export function displayLightbox(medias: Media[]): void {
  const container = document.querySelector(".photographer_lightbox");
  if (!container) {
    throw new Error("Container .photographer_lightbox introuvable");
  }
  container.innerHTML = photographerLightboxTemplate(medias);
}

export function carouselItem(media: Media): string {
  return /*html*/ `<li class="carousel-item" aria-hidden="false" id="${media.id}"></li>`;
}

export function photographerLightboxTemplate(medias: Media[]): string {
  return /*html*/ `<ul class="carrousel">
                    ${medias.map((media) => carouselItem(media)).join("")}
                   </ul>`;
}
