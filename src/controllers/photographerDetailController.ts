import { fetchFisheyeData } from "../models/api.js";
import { getMediaByPhotographerId } from "../models/mediaModel.js";
import {
  getPhotographerById,
  getPhotographers,
} from "../models/photographerModel.js";
import { renderDetailPhotographerPage } from "../views/photographerDetailPageView.js";

export async function initPhotographerPage(): Promise<void> {
  const fisheyeData = await fetchFisheyeData();
  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));
  const photographers = getPhotographers(fisheyeData.photographers);
  const photographer = getPhotographerById(photographers, photographerId);
  if (!photographer) {
    throw new Error("Photographe introuvable");
  }

  const media = getMediaByPhotographerId(
    photographer.id,
    fisheyeData.media,
    photographer,
  );
  renderDetailPhotographerPage(photographer, media);
}
