import { fetchFisheyeData } from "../models/api.js";
import { getPhotographers } from "../models/photographerModel.js";
import { renderPhotographerBanner } from "../views/photographerBanner.js";

export async function initPhotographerDetail() {
  const fisheyeData = await fetchFisheyeData();
  const photographers = getPhotographers(fisheyeData.photographers);
  renderPhotographerBanner(photographers);
}
