import { Media, MediaData } from "./media";
import { Photographer, PhotographerData } from "./photographer.js";

export async function fetchFisheyeData() {
  const url: string = "/data/photographers.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Bad request");
    }
    const result = await response.json();
    const photographers = result.photographers.map(
      (data: PhotographerData) => new Photographer(data),
    );
    const media = result.media.map(
      (data: MediaData, folderName: string) => new Media(data, folderName),
    );

    return [photographers, media];
  } catch (error) {
    throw error;
  }
}
