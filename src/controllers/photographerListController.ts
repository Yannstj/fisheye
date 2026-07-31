import { getPhotographers } from "../models/photographerModel.js";
import { photographerCard } from "../views/photographerCard.js";

export async function initPhotographers() {
  const container = document.querySelector(".photographer_section");
  if (!container) {
    throw new Error("Container .photographer_section introuvable");
  }

  const photographers = await getPhotographers();
  photographers.forEach((photographer) => {
    const card = photographerCard(photographer);
    container.appendChild(card);
  });
}
