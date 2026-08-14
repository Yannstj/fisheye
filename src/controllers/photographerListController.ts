import { getPhotographers } from "../models/photographerModel.js";
import { photographerCard } from "../views/photographerCard.js";

export async function initPhotographers() {
  const photographers = await getPhotographers();
  photographers.forEach((photographer) => {
    const card = photographerCard(photographer);
    return card;
  });
}
