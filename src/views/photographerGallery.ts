import { Media } from "../models/media.js";

export function renderPhotographerGallery(medias: Media[]): void {
  const galleryContainer = document.querySelector(".photographer_gallery");
  if (!galleryContainer) {
    throw new Error("Container .photographer_gallery introuvable");
  }
  galleryContainer.innerHTML = medias
    .map((media) => photographerGallery(media))
    .join("");
}

export function photographerGallery(media: Media): string {
  const isVideo = media.type === "video";
  return isVideo
    ? `<article><video><source src="${media.mediaPath}"></video></article>`
    : `<article><img src="${media.mediaPath}" alt="${media.title}"></article>`;
}
