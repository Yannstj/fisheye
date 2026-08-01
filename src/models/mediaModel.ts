import { fetchFisheyeData } from "./api.js";
import { Media, MediaData } from "./media.js";
import { Photographer } from "./photographer.js";

export async function getMediaByPhotographerId(
  photographerId: number,
  photographers: Photographer[],
): Promise<Media[]> {
  const fisheyeData = await fetchFisheyeData();
  const filteredMedia = fisheyeData.media.filter(
    (media: MediaData) => media.photographerId === photographerId, //photographerId est le params passer a la fonction
  );
  const foundPhotographer = photographers.find(
    (photographer) => photographer.id === photographerId,
  );
  if (!foundPhotographer) {
    throw new Error("Aucun photographe coresspondant");
  }
  const mediaList = filteredMedia.map(
    (data: MediaData) => new Media(data, foundPhotographer.mediaFolderName), //mediaFolderName getter de Photographer
  );

  return mediaList;
}
