import { Media } from "../models/media.js";

export function renderLightbox(medias: Media[]): void {
  const container = document.querySelector(".photographer_lightbox");
  if (!container) {
    throw new Error("Container .photographer_lightbox introuvable");
  }
  container.innerHTML = medias
    .map((media) => photographerLightbox(media))
    .join("");
}

export function photographerLightbox(media: Media): string {
  return /*html*/ `<ul class="carrousel">
                    <li class="carrousel-item" aria-hidden="false" id=${media.id}></li>
                   </ul>`;
}
