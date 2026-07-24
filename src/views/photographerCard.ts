import { Photographer } from "../models/photographer.js";

function createParagraph(text: string): HTMLParagraphElement {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

export function photographerCard(data: Photographer) {
  const article = document.createElement("article");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");

  img.setAttribute("src", data.portraitPath);
  img.setAttribute("alt", data.altDescription);
  h2.textContent = data.name;
  article.appendChild(img);
  article.appendChild(h2);
  article.appendChild(createParagraph(data.fullLocation));
  article.appendChild(createParagraph(data.tagline));
  article.appendChild(createParagraph(data.fullPrice));
  return article;
}
