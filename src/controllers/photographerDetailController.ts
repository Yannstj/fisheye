import { fetchFisheyeData } from "../models/api.js";
import {
  getMediaByPhotographerId,
  sortMedia,
  SortCriteria,
} from "../models/mediaModel.js";
import {
  getPhotographerById,
  getPhotographers,
} from "../models/photographerModel.js";
import {
  displayMedia,
  renderDetailPhotographerPage,
} from "../views/photographerDetailPageView.js";

export async function initPhotographerPage(): Promise<void> {
  const fisheyeData = await fetchFisheyeData();
  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));
  const photographers = getPhotographers(fisheyeData.photographers);
  const photographer = getPhotographerById(photographers, photographerId);
  if (!photographer) {
    throw new Error("Photographe introuvable");
  }

  let media = getMediaByPhotographerId(
    photographer.id,
    fisheyeData.media,
    photographer,
  );

  function handleSortChange(criteria: SortCriteria): void {
    media = sortMedia(media, criteria);
    displayMedia(media);
  }

  renderDetailPhotographerPage(photographer, media, handleSortChange);
}
