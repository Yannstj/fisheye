import { fetchFisheyeData } from "../models/api.js";
import { getMediaByPhotographerId } from "../models/mediaModel.js";
import { getPhotographers } from "../models/photographerModel.js";
import { renderPhotographerGallery } from "../views/photographerGallery.js";

export async function initPhotographerMedia() {
  const fisheyeData = await fetchFisheyeData();
  const mediaData = fisheyeData.media;
  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));
  const photographers = getPhotographers(fisheyeData.photographers);
  const photographer = photographers.find((p) => p.id === photographerId);
  if (!photographer) {
    throw new Error("Photographe introuvable");
  }
  const media = getMediaByPhotographerId(
    photographer.id,
    mediaData,
    photographer,
  );

  renderPhotographerGallery(media);
}
