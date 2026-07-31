import { fetchFisheyeData } from "./api.js";
import { Photographer, PhotographerData } from "./photographer.js";

export async function getPhotographers(): Promise<Photographer[]> {
  const photographersData = await fetchFisheyeData();
  return photographersData.photographers.map(
    (data: PhotographerData) => new Photographer(data),
  );
}
