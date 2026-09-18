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

export type SortCriteria = "popularity" | "date" | "title";

export function sortMedia(media: Media[], criteria: SortCriteria): Media[] {
  const sortedMedia = [...media];

  if (criteria === "popularity") {
    sortedMedia.sort(function (mediaA, mediaB) {
      return mediaB.likes - mediaA.likes;
    });
  } else if (criteria === "date") {
    sortedMedia.sort(function (mediaA, mediaB) {
      const dateA = new Date(mediaA.date).getTime();
      const dateB = new Date(mediaB.date).getTime();
      return dateB - dateA;
    });
  } else if (criteria === "title") {
    sortedMedia.sort(function (mediaA, mediaB) {
      return mediaA.title.localeCompare(mediaB.title);
    });
  }

  return sortedMedia;
}
