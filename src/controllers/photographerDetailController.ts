import { getMediaByPhotographerId } from "../models/mediaModel";
import { photogpaherBanner } from "../views/photographerBanner";

export async function initPhotographersDetails() {
  const container = document.querySelector(".photographer_banner");
  if (!container) {
    throw new Error("Container .photographer_banner introuvable");
  }

  const photographersDetails = await getMediaByPhotographerId();
}
