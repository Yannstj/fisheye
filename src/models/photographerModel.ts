import { Photographer, PhotographerData } from "./photographer.js";

export function getPhotographers(
  photographers: PhotographerData[],
): Photographer[] {
  return photographers.map((data: PhotographerData) => new Photographer(data));
}
