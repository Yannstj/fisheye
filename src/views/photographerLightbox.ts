import { Media } from "../models/media.js";

export function displayLightbox(medias: Media[]): void {
  const container = document.querySelector(".photographer_lightbox");
  if (!container) {
    throw new Error("Container .photographer_lightbox introuvable");
  }
  container.innerHTML = photographerLightboxTemplate(medias);

  const closeButton = container.querySelector(".lightbox_close");
  closeButton?.addEventListener("click", () => {
    container.setAttribute("hidden", "");
    document.getElementById("main")?.setAttribute("aria-hidden", "false");
  });
}

export function carouselItem(media: Media): string {
  return /*html*/ `<li class="carousel-item" aria-hidden="false" id="${media.id}"></li>`;
}

export function photographerLightboxTemplate(medias: Media[]): string {
  return /*html*/ `<button class="lightbox_close" aria-label="Fermer la visionneuse">×</button>
                   <ul class="carrousel">
                    ${medias.map((media) => carouselItem(media)).join("")}
                   </ul>`;
}

export function setActiveCarouselItem(id: number): void {
  const items = document.querySelectorAll<HTMLElement>(".carousel-item");
  items.forEach((item) => {
    item.classList.toggle("active", item.id === String(id));
  });
}
