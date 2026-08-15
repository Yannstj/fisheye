import { getPhotographers } from "../models/photographerModel.js";
import {
  photographerCard,
  renderPhotographerCard,
} from "../views/photographerCard.js";

export async function initPhotographers() {
  const photographers = await getPhotographers();
  const template = photographers.map(photographerCard).join(""); //on renvoi ainsi une seul string
  renderPhotographerCard(template);
}
