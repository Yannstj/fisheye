import { Media } from "../models/media.js";

let currentMedias: Media[] = [];

export function displayLightbox(medias: Media[]): void {
  currentMedias = medias;

  const container = document.querySelector(".photographer_lightbox");
  if (!container) {
    throw new Error("Container .photographer_lightbox introuvable");
  }
  container.innerHTML = photographerLightboxTemplate(medias);

  function closeLightbox(): void {
    container?.setAttribute("hidden", "");
    document.getElementById("main")?.setAttribute("aria-hidden", "false");
    container?.dispatchEvent(new Event("lightbox:close"));
  }

  container
    .querySelector(".lightbox_close")
    ?.addEventListener("click", closeLightbox);

  function getCurrentMediaId(): number {
    const active = container?.querySelector(".carrousel_item.active");
    return Number(active?.id);
  }

  function goToNext(): void {
    setActiveCarouselItem(getNextMediaId(currentMedias, getCurrentMediaId()));
  }

  function goToPrevious(): void {
    setActiveCarouselItem(
      getPreviousMediaId(currentMedias, getCurrentMediaId()),
    );
  }

  container
    .querySelector(".carrousel_prev")
    ?.addEventListener("click", goToPrevious);
  container
    .querySelector(".carrousel_next")
    ?.addEventListener("click", goToNext);

  const containerElement = container as HTMLElement;
  if (!containerElement.dataset.keydownBound) {
    containerElement.addEventListener("keydown", (event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === "ArrowRight") goToNext();
      if (keyboardEvent.key === "ArrowLeft") goToPrevious();
      if (keyboardEvent.key === "Escape") closeLightbox();
      if (keyboardEvent.key === "Tab") trapFocus(keyboardEvent);
    });
    containerElement.dataset.keydownBound = "true";
  }

  function trapFocus(event: KeyboardEvent): void {
    const focusableElements = container!.querySelectorAll<HTMLElement>(
      ".lightbox_close, .carrousel_prev, .carrousel_next",
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

export function getNextMediaId(medias: Media[], currentId: number): number {
  const index = medias.findIndex((media) => media.id === currentId);
  const nextIndex = (index + 1) % medias.length;
  return medias[nextIndex].id;
}

export function getPreviousMediaId(medias: Media[], currentId: number): number {
  const index = medias.findIndex((media) => media.id === currentId);
  const previousIndex = (index - 1 + medias.length) % medias.length;
  return medias[previousIndex].id;
}

export function carouselItem(media: Media): string {
  const isVideo = media.type === "video";
  const mediaElement = isVideo
    ? /*html*/ `<video controls=""><source src="${media.mediaPath}"></video>`
    : /*html*/ `<img src="${media.mediaPath}" alt="${media.title}">`;
  return /*html*/ `<li class="carrousel_item" aria-hidden="false" id="${media.id}">
    ${mediaElement}
    <p class="carrousel_item_title">${media.title}</p>
  </li>`;
}

export function photographerLightboxTemplate(medias: Media[]): string {
  return /*html*/ `<div class="carrousel_wrapper">
                     <button class="lightbox_close" aria-label="Fermer la visionneuse">×</button>
                     <button class="carrousel_prev" aria-label="Image précédente"></button>
                     <ul class="carrousel" aria-label="Visionneuse de médias">
                      ${medias.map((media) => carouselItem(media)).join("")}
                     </ul>
                     <button class="carrousel_next" aria-label="Image suivante"></button>
                   </div>`;
}

export function setActiveCarouselItem(id: number): void {
  const items = document.querySelectorAll<HTMLElement>(".carrousel_item");
  items.forEach((item) => {
    item.classList.toggle("active", item.id === String(id));
  });
}
