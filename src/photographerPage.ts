import { initPhotographerDetail } from "./controllers/photographerDetailController.js";
import { initPhotographerMedia } from "./controllers/photographerMediaContoller.js";
import { fetchFisheyeData } from "./models/api.js";
import { getPhotographers } from "./models/photographerModel.js";

async function initPhotographerPage() {
  //ici on trie les datas por facilité la creation de la page,
  //avec le bon photographe(discutable)
  const fisheyeData = await fetchFisheyeData();
  const mediaData = fisheyeData.media;
  const params = new URLSearchParams(window.location.search);
  const photographerId = Number(params.get("id"));
  const photographers = getPhotographers(fisheyeData.photographers);
  const photographer = photographers.find((p) => p.id === photographerId);
  if (!photographer) {
    throw new Error("Photographe introuvable");
  }
  initPhotographerDetail(photographer); //passe le bon photographer
  initPhotographerMedia(photographer, mediaData); // bon photographer and array d'obj qui correspond
}

initPhotographerPage();
