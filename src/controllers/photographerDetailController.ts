import { getPhotographers } from "../models/photographerModel.js";
import { getMediaByPhotographerId } from "../models/mediaModel.js";
import { photographerBanner } from "../views/photographerBanner.js";

export async function initPhotographerDetail() {
  const container = document.querySelector(".photographer_banner");
  if (!container) {
    throw new Error("Container .photographer_banner introuvable");
  }

  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));

  const photographers = await getPhotographers();
  const photographer = photographers.find(
    (photographer) => photographer.id === photographerId,
  );
  if (!photographer) {
    throw new Error("Photographe introuvable");
  }

  const mediaList = await getMediaByPhotographerId(
    photographerId,
    photographers,
  );

  const fragment = photographerBanner(photographer);
  container.appendChild(fragment);
}
