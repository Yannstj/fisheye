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
