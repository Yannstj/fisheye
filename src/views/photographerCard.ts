import { Photographer } from "../models/photographer.js";

export function photographerCard(photographer: Photographer) {
  const container = document.querySelector(".photographer_section");
  if (!container) {
    return;
  }
  container.innerHTML = `<article>
  <a href="photographer.html?id=${photographer.id}">
  <img src="${photographer.portraitPath}"alt="${photographer.name}">
  <h2>${photographer.name}</h2>
  </a>
  <p class="location">${photographer.fullLocation}</p>
  <p class="tagline">${photographer.tagline}</p>
  <p class="price">${photographer.fullPrice}</p>
  </article>`;
}
