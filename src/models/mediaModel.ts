import { Media, MediaDataType } from "./media.js";
import { Photographer } from "./photographer.js";

export function getMediaByPhotographerId(
  photographerId: number,
  mediaData: MediaDataType[],
  photographer: Photographer,
): Media[] {
  return mediaData
    .filter((media) => media.photographerId === photographerId)
    .map((data) => new Media(data, photographer.mediaFolderName));
}

export function sortMediaByPopularity(medias: Media[]): Media[] {
  // copie car .sort() trie en place, on ne veut pas muter le tableau reçu
  const sortedMedias = [...medias];
  // b - a plutôt que a - b : on veut le plus de likes en premier (décroissant)
  sortedMedias.sort((mediaA, mediaB) => mediaB.likes - mediaA.likes);
  return sortedMedias;
}

export function sortMediaByDate(medias: Media[]): Media[] {
  const sortedMedias = [...medias];
  sortedMedias.sort((mediaA, mediaB) => {
    const dateA = new Date(mediaA.date);
    const dateB = new Date(mediaB.date);
    // deux Date ne se soustraient pas directement, getTime() les ramène en nombre
    return dateB.getTime() - dateA.getTime();
  });
  return sortedMedias;
}

export function sortMediaByTitle(medias: Media[]): Media[] {
  const sortedMedias = [...medias];
  sortedMedias.sort((mediaA, mediaB) => mediaA.title.localeCompare(mediaB.title));
  return sortedMedias;
}
