import { Photographer } from "../models/photographer.js";
import { renderPhotographerBanner } from "../views/photographerBanner.js";

export async function initPhotographerDetail(photographer: Photographer) {
  renderPhotographerBanner(photographer);
}
