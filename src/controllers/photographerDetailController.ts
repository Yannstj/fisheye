import { fetchFisheyeData } from "../models/api.js";
import { getPhotographers } from "../models/photographerModel.js";
import { renderPhotographerBanner } from "../views/photographerBanner.js";

export async function initPhotographerDetail() {
  const fisheyeData = await fetchFisheyeData();
  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));
  const photographers = getPhotographers(fisheyeData.photographers);
  const photographer = photographers.find((p) => p.id === photographerId);
  if (!photographer) {
    throw new Error("Photographe introuvable");
  }
  renderPhotographerBanner(photographer);
}
