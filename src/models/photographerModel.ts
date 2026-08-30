import { Photographer, PhotographerData } from "./photographer.js";

export function getPhotographers(
  photographers: PhotographerData[],
): Photographer[] {
  return photographers.map((data: PhotographerData) => new Photographer(data));
}

export function getPhotographerById(
  photographers: Photographer[],
  id: number,
): Photographer | undefined {
  return photographers.find((p) => p.id === id);
}
