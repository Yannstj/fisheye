import { fetchFisheyeData } from "../models/api.js";
import { Photographer } from "../models/photographer.js";
import { getPhotographers } from "../models/photographerModel.js";
import { renderPhotographerBanner } from "../views/photographerBanner.js";

export async function initPhotographerDetail(photographer: Photographer) {
  renderPhotographerBanner(photographer);
}
