//import { getMediaByPhotographerId } from "../models/mediaModel.js";
//import { Photographer } from "../models/photographer.js";
import { MediaDataType } from "../models/media.js";
import { getMediaByPhotographerId } from "../models/mediaModel.js";
import { Photographer } from "../models/photographer.js";
import { renderPhotographerGallery } from "../views/photographerGallery.js";
//import { getPhotographers } from "../models/photographerModel.js";
//import { getMediaByPhotographerId } from "../models/mediaModel.js";
//import { photographerGallery } from "../views/photographerGallery.js";
//import { photographerGalleryFilter } from "../views/photographerGalleryFilter.js";

export async function initPhotographerMedia(
  photographer: Photographer,
  mediaData: MediaDataType[],
) {
  const media = getMediaByPhotographerId(
    photographer.id,
    mediaData,
    photographer,
  );
  renderPhotographerGallery(media);
}
