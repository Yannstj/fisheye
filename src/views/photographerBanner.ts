import { Photographer } from "../models/photographer.js";
import { createParagraph } from "../utils/dom.js";

export function photographerBanner(photographer: Photographer) {
  const fragment = document.createDocumentFragment();
  const h1 = document.createElement("h1");
  const button = document.createElement("button");
  const img = document.createElement("img");

  img.setAttribute("src", photographer.portraitPath);
  img.setAttribute("alt", photographer.name);
  img.setAttribute("class", "bannerImage");
  h1.textContent = photographer.name;
  button.textContent = "Contactez-moi";
  fragment.appendChild(h1);
  fragment.appendChild(createParagraph(photographer.fullLocation, "location"));
  fragment.appendChild(createParagraph(photographer.tagline, "tagline"));
  fragment.appendChild(button);
  fragment.appendChild(img);
  return fragment;
}
