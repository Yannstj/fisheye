import { Photographer } from "../models/photographer.js";

export function renderPhotographerCard(html: string): void {
  const container = document.querySelector(".photographer_section");
  if (!container) {
    throw new Error("Container .photographer_section introuvable");
  }
  container.innerHTML = html;
}

export function photographerCard(photographer: Photographer): string {
  return `
    <article>
      <a href="photographer.html?id=${photographer.id}">
        <img src="${photographer.portraitPath}" alt="${photographer.name}">
        <h2>${photographer.name}</h2>
      </a>
      <p class="location">${photographer.fullLocation}</p>
      <p class="tagline">${photographer.tagline}</p>
      <p class="price">${photographer.fullPrice}</p>
    </article>
  `;
}
