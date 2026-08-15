import { getPhotographers } from "../models/photographerModel.js";
import {
  photographerBanner,
  renderPhotographerBanner,
} from "../views/photographerBanner.js";

export async function initPhotographerDetail() {
  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));

  const photographers = await getPhotographers();
  const photographer = photographers.find(
    (photographer) => photographer.id === photographerId,
  );
  if (!photographer) {
    throw new Error("Photographe introuvable");
  }
  const template = photographerBanner(photographer);
  renderPhotographerBanner(template);
}
