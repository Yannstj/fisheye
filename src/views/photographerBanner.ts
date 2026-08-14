import { Photographer } from "../models/photographer.js";
import { createParagraph } from "../utils/dom.js";

export function photographerBanner(photographer: Photographer) {
  const fragment = document.createDocumentFragment();
  const containerDetails = document.createElement("div");
  const h1 = document.createElement("h1");
  const button = document.createElement("button");
  const img = document.createElement("img");

  containerDetails.setAttribute("class", "photographer_banner_details");
  img.setAttribute("src", photographer.portraitPath);
  img.setAttribute("alt", photographer.name);
  img.setAttribute("class", "photographer_banner_image");
  h1.textContent = photographer.name;
  button.textContent = "Contactez-moi";
  containerDetails.appendChild(h1);
  containerDetails.appendChild(
    createParagraph(photographer.fullLocation, "location"),
  );
  containerDetails.appendChild(
    createParagraph(photographer.tagline, "tagline"),
  );
  fragment.appendChild(containerDetails);
  fragment.appendChild(button);
  fragment.appendChild(img);
  return fragment;
}
// templating
