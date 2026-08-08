import { getMediaByPhotographerId } from "../models/mediaModel.js";
import { getPhotographers } from "../models/photographerModel.js";
import { photographerGallery } from "../views/photographerGallery.js";

export async function initPhotographerMedia() {
  const container = document.querySelector(".photographer_gallery");
  if (!container) {
    throw new Error("Container .photographer_gallery introuvable");
  }
  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));

  const photographers = await getPhotographers();
  const photographer = photographers.find(
    (photographer) => photographer.id === photographerId,
  );
  if (!photographer) {
    throw new Error("Photographe introuvable");
  }

  const mediaList = await getMediaByPhotographerId(
    photographerId,
    photographers,
  );

  mediaList.forEach((media) => {
    const fragment = photographerGallery(media);
    container.appendChild(fragment);
  });
}
