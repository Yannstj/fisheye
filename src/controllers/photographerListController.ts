import { fetchFisheyeData } from "../models/api.js";
import { getPhotographers } from "../models/photographerModel.js";
import {
  photographerCard,
  renderPhotographerCard,
} from "../views/photographerCard.js";

export async function initPhotographers() {
  const fisheyeData = await fetchFisheyeData();
  const photographers = getPhotographers(fisheyeData.photographers);
  const template = photographers.map(photographerCard).join(""); //on renvoi ainsi une seul string
  renderPhotographerCard(template);
}
