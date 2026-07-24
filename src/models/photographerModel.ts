import { Photographer, PhotographerData } from "./photographer.js";

async function getPhotographers(): Promise<Photographer[]> {
  const url: string = "/data/photographers.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Bad request");
    }
    const result = await response.json();
    return result.photographers.map(
      (data: PhotographerData) => new Photographer(data),
    );
  } catch (error) {
    throw error;
  }
}

getPhotographers().then((photographers) => console.log(photographers));
