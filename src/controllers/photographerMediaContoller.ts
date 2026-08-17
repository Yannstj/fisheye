//import { getMediaByPhotographerId } from "../models/mediaModel.js";
import { Photographer } from "../models/photographer.js";
import { fetchFisheyeData } from "../models/api.js";
import { getPhotographers } from "../models/photographerModel.js";
import { getMediaByPhotographerId } from "../models/mediaModel.js";
//import { photographerGallery } from "../views/photographerGallery.js";
//import { photographerGalleryFilter } from "../views/photographerGalleryFilter.js";

export async function initPhotographerMedia() {
//photographers: Photographer, ,
  const fisheyeData = await fetchFisheyeData();
}
