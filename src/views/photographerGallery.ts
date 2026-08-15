import { Media } from "../models/media.js";

export function renderPhotographerGallery() {
  const galleryContainer = document.querySelector(".photographer_gallery");
  if (!galleryContainer) {
    throw new Error("Container .photographer_gallery introuvable");
  }
}
export function photographerGallery(media: Media): string {
  const mediaImage = `<article>
  <img src="${media.mediaPath}" alt="${media.title}">
  </article>`;
  const mediaVideo = `<article>
  <video>
  <source src="${media.mediaPath}">
  </video>
  </article>`;
  let template = "";
  if (media.type === "video") {
    template = mediaVideo;
  }
  template = mediaImage;
  return template;
}
//template html
