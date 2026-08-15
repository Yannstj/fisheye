import { fetchFisheyeData } from "./api.js";
import { Photographer, PhotographerData } from "./photographer.js";

export async function getPhotographers(): Promise<Photographer[]> {
  const fisheyeData = await fetchFisheyeData();
  return fisheyeData.photographers.map(
    (data: PhotographerData) => new Photographer(data),
    console.log(fisheyeData),
  );
}
