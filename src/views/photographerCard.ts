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

function createAnchor(photographerPath: string) {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", photographerPath);
  return anchor;
}

export function photographerCard(data: Photographer) {
  const article = document.createElement("article");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const anchor = createAnchor(`photogpaher.html?id${data.id}`);

  img.setAttribute("src", data.portraitPath);
  img.setAttribute("alt", data.name);
  h2.textContent = data.name;
  anchor.appendChild(img);
  anchor.appendChild(h2);
  article.appendChild(anchor);
  article.appendChild(createParagraph(data.fullLocation, "location"));
  article.appendChild(createParagraph(data.tagline, "tagline"));
  article.appendChild(createParagraph(data.fullPrice, "price"));
  return article;
}

//penser a rendre la fontion create paragraphe global
