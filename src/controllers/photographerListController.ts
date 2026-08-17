import { fetchFisheyeData } from "../models/api.js";
import { getPhotographers } from "../models/photographerModel.js";
import { renderPhotographerCards } from "../views/photographerCard.js";

export async function initPhotographers() {
  const fisheyeData = await fetchFisheyeData();
  const photographers = getPhotographers(fisheyeData.photographers);
  renderPhotographerCards(photographers);
}
