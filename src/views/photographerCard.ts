import { Photographer } from "../models/photographer.js";
import { createParagraph } from "../utils/dom.js";

function createAnchor(photographerPath: string) {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", photographerPath);
  return anchor;
}

export function photographerCard(photographer: Photographer) {
  const article = document.createElement("article");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const anchor = createAnchor(`photographer.html?id=${photographer.id}`);

  img.setAttribute("src", photographer.portraitPath);
  img.setAttribute("alt", photographer.name);
  h2.textContent = photographer.name;
  anchor.appendChild(img);
  anchor.appendChild(h2);
  article.appendChild(anchor);
  article.appendChild(createParagraph(photographer.fullLocation, "location"));
  article.appendChild(createParagraph(photographer.tagline, "tagline"));
  article.appendChild(createParagraph(photographer.fullPrice, "price"));
  return article;
}
