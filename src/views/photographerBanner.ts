import { Photographer } from "../models/photographer.js";

function createParagraph(
  text: string,
  className: string,
): HTMLParagraphElement {
  const p = document.createElement("p");
  p.textContent = text;
  p.classList.add(className);
  return p;
}

export function photographerBanner(data: Photographer) {
  const fragment = document.createDocumentFragment();
  const h1 = document.createElement("h1");
  const button = document.createElement("button");
  const img = document.createElement("img");

  h1.textContent = data.name;
  fragment.appendChild(h1);
  return fragment;
}

//penser a rendre la fontion create paragraphe global
