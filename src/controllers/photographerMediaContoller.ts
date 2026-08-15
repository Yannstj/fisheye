//import { getMediaByPhotographerId } from "../models/mediaModel.js";
import { getPhotographers } from "../models/photographerModel.js";
//import { photographerGallery } from "../views/photographerGallery.js";
//import { photographerGalleryFilter } from "../views/photographerGalleryFilter.js";

export async function initPhotographerMedia(photographer, photographerMedia) {
  // if (!filterContainer) {
  //   throw new Error("Container .photographer_filter introuvable");
  // }
  // const filterFragment = photographerGalleryFilter();
  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));

  // const photographers = await getPhotographers();
  // const photographer = photographers.find(
  //   (photographer) => photographer.id === photographerId,
  // );
  // if (!photographer) {
  //   throw new Error("Photographe introuvable");
  // }
  // filterContainer.appendChild(filterFragment);
  // const mediaList = await getMediaByPhotographerId(
  //   photographerId,
  //   photographers,
  // );

  // mediaList.forEach((media) => {
  //   const fragment = photographerGallery(media);
  //   galleryContainer.appendChild(fragment);
  // });
}
