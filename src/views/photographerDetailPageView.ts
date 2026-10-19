import { Media } from "../models/media.js";
import {
  sortMediaByDate,
  sortMediaByPopularity,
  sortMediaByTitle,
} from "../models/mediaModel.js";
import { Photographer } from "../models/photographer.js";
import {
  displayLightbox,
  setActiveCarouselItem,
} from "./photographerLightbox.js";
import { trapFocus } from "./focusTrap.js";

const likedMediaIds = new Set<number>(); // Assure 1 like par media
let lastTriggerElement: HTMLElement | null = null;
let currentPhotographer: Photographer;
let currentMedias: Media[] = [];

export function renderDetailPhotographerPage(
  photographer: Photographer,
  medias: Media[],
): void {
  displayHeader(photographer);
  displayDropDown();
  displayFilter(photographer, medias);
  displayMedia(photographer, medias);
  displayModal(photographer);
  displayLightbox(medias);
  displayTotalLikes(photographer, medias);

  const lightbox = document.querySelector(".photographer_lightbox");
  lightbox?.addEventListener("lightbox:close", () => {
    lastTriggerElement?.focus();
  });
}

function displayHeader(photographer: Photographer): void {
  const container = document.querySelector(".photographer_banner");
  if (!container) {
    throw new Error("Container .photographer_banner introuvable");
  }
  container.innerHTML = photographerBanner(photographer);
}

function photographerBanner(photographer: Photographer): string {
  return /*html*/ `
  <div class="photographer_banner_details">
  <h1>${photographer.name}</h1>
  <p class="location">${photographer.fullLocation}</p>
  <p class="tagline">${photographer.tagline}</p>
  </div>
  <button id="contact_button">Contactez-moi</button>
  <img src="${photographer.portraitPath}" alt="${photographer.name}" class="photographer_banner_image">`;
}

function displayModal(photographer: Photographer) {
  const modal = document.querySelector<HTMLElement>(".photographer_modal");
  if (!modal) {
    throw new Error("Container .photographer_modal introuvable");
  }
  modal.innerHTML = photographerModal(photographer);

  const contactButton = document.getElementById("contact_button");
  const main = document.getElementById("main");

  function openModal(): void {
    modal?.removeAttribute("hidden");
    main?.setAttribute("aria-hidden", "true");
    modal?.querySelector<HTMLElement>("#prenom")?.focus();
  }

  function closeModal(): void {
    modal?.setAttribute("hidden", "");
    main?.setAttribute("aria-hidden", "false");
    contactButton?.focus();
  }

  contactButton?.addEventListener("click", openModal);
  modal
    .querySelector(".modal_close")
    ?.addEventListener("click", closeModal);
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
    if (event.key === "Tab") trapFocus(event, modal);
  });
}

function photographerModal(photographer: Photographer): string {
  return /*html*/ `
  <div class="modal">
   <header>
   <h2 id="modal_title">Contactez-moi<br>${photographer.name}</h2>
   <button type="button" class="modal_close" aria-label="Fermer la modale">
     <img src="assets/icons/close.svg" alt="">
   </button>
   </header>
     <form action="" method="">
       <div>
         <label for="prenom">Prénom</label>
         <input type="text" id="prenom" name="prenom" required>
       </div>
      <div>
        <label for="nom">Nom</label>
        <input type="text" id="nom" name="nom" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
     <div>
        <label for="message">Votre message</label>
        <textarea class="modal_message" id="message" rows="5" name="message" required></textarea>
     </div>
       <button type="submit">Envoyer</button>
    </form>
  </div>`;
}

const SORT_OPTIONS = [
  { value: "popularity", label: "Popularité" },
  { value: "date", label: "Date" },
  { value: "title", label: "Titre" },
];

function displayDropDown() {
  const container = document.querySelector(".photographer_filter");
  if (!container) {
    throw new Error("Container .photographer_filter introuvable");
  }
  container.innerHTML = photographerFilter();
}

function photographerFilter() {
  return /*html*/ `
  <span class="filter_label" id="filter_label">Trier par</span>
  <div class="dropdown_wrapper">
    <button aria-haspopup="listbox" aria-expanded="false" aria-controls="dropdown" id="dropdown_button">
      <span class="dropdown_selected">${SORT_OPTIONS[0].label}</span>
      <span class="dropdown_arrow"></span>
    </button>
    <ul id="dropdown" role="listbox" aria-labelledby="filter_label" class="dropdown-content" hidden>
      ${dropdownOptions(SORT_OPTIONS[0].value)}
    </ul>
  </div>`;
}

function dropdownOptions(selectedValue: string): string {
  return SORT_OPTIONS.filter((option) => option.value !== selectedValue)
    .map(
      (option) =>
        /*html*/ `<li role="option" tabindex="-1" aria-selected="false" data-sort="${option.value}">${option.label}</li>`,
    )
    .join("");
}

function displayFilter(photographer: Photographer, medias: Media[]) {
  const dropdownButton = document.getElementById("dropdown_button");
  const dropdown = document.getElementById("dropdown");
  if (!dropdownButton) {
    throw new Error("Button .dropdown_button introuvable");
  }
  if (!dropdown) {
    throw new Error("Unordored list .dropdown introuvable");
  }

  function getOptions(): HTMLElement[] {
    return Array.from(dropdown!.querySelectorAll<HTMLElement>("[data-sort]"));
  }

  function openDropdown(): void {
    dropdown!.removeAttribute("hidden");
    dropdownButton!.setAttribute("aria-expanded", "true");
    getOptions()[0]?.focus();
  }

  function closeDropdown(): void {
    dropdown!.setAttribute("hidden", "");
    dropdownButton!.setAttribute("aria-expanded", "false");
  }

  function selectOption(option: HTMLElement): void {
    const sortBy = option.dataset.sort;
    let sortedMedias: Media[];

    if (sortBy === "popularity") {
      sortedMedias = sortMediaByPopularity(medias);
    } else if (sortBy === "date") {
      sortedMedias = sortMediaByDate(medias);
    } else {
      sortedMedias = sortMediaByTitle(medias);
    }

    displayMedia(photographer, sortedMedias);
    displayLightbox(sortedMedias);
    closeDropdown();

    const selectedLabel = dropdownButton!.querySelector(".dropdown_selected");
    if (selectedLabel) selectedLabel.textContent = option.textContent;

    if (sortBy) dropdown!.innerHTML = dropdownOptions(sortBy);
    dropdownButton!.focus();
  }

  dropdownButton.addEventListener("click", () => {
    if (dropdown.hasAttribute("hidden")) openDropdown();
    else closeDropdown();
  });

  dropdownButton.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openDropdown();
    }
    if (event.key === "Escape") closeDropdown();
  });

  dropdown.addEventListener("click", (event) => {
    const option = (event.target as HTMLElement).closest(
      "[data-sort]",
    ) as HTMLElement | null;
    if (option) selectOption(option);
  });

  dropdown.addEventListener("keydown", (event) => {
    const options = getOptions();
    const index = options.indexOf(document.activeElement as HTMLElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      options[(index + 1) % options.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      options[(index - 1 + options.length) % options.length]?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (index >= 0) selectOption(options[index]);
    } else if (event.key === "Escape") {
      closeDropdown();
      dropdownButton.focus();
    } else if (event.key === "Tab") {
      closeDropdown();
    }
  });
}

function displayMedia(photographer: Photographer, medias: Media[]): void {
  currentPhotographer = photographer;
  currentMedias = medias;

  const container = document.querySelector(".photographer_gallery");
  if (!container) {
    throw new Error("Container .photographer_gallery introuvable");
  }
  container.innerHTML = medias
    .map((media) => photographerGalleryFactory(media))
    .join("");

  const containerElement = container as HTMLElement;
  if (containerElement.dataset.clickBound) return;
  containerElement.dataset.clickBound = "true";

  containerElement.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const article = target.closest("[data-id]") as HTMLElement;
    if (!article) return;

    if (target.closest(".like_button")) {
      likeMedia(article);
      return;
    }

    if (target.closest(".media_trigger")) {
      openLightbox(article);
    }
  });
}

function openLightbox(article: HTMLElement): void {
  const mediaId = Number(article.dataset.id);
  lastTriggerElement = article.querySelector<HTMLElement>(".media_trigger");

  const lightbox = document.querySelector(".photographer_lightbox");
  const main = document.getElementById("main");
  lightbox?.removeAttribute("hidden");
  main?.setAttribute("aria-hidden", "true");
  setActiveCarouselItem(mediaId);

  const closeButton = lightbox?.querySelector(".lightbox_close") as HTMLElement;
  closeButton?.focus();
}

function likeMedia(article: HTMLElement): void {
  const mediaId = Number(article.dataset.id);
  if (likedMediaIds.has(mediaId)) return;

  const media = currentMedias.find((candidate) => candidate.id === mediaId);
  if (!media) return;

  likedMediaIds.add(mediaId);
  media.likes += 1;

  article.querySelector(".like_button")?.setAttribute("aria-pressed", "true");

  const likesCount = article.querySelector(".likes_count");
  if (likesCount) likesCount.textContent = String(media.likes);

  displayTotalLikes(currentPhotographer, currentMedias);
}

function displayTotalLikes(photographer: Photographer, medias: Media[]): void {
  const container = document.querySelector(".photographer_infos");
  if (!container) {
    throw new Error("Container .photographer_infos introuvable");
  }
  const totalLikes = medias.reduce((total, media) => total + media.likes, 0);
  container.innerHTML = photographerInfos(photographer, totalLikes);
}

function photographerInfos(
  photographer: Photographer,
  totalLikes: number,
): string {
  return /*html*/ `
  <p class="total_likes">${totalLikes} <img src="assets/icons/like-dark.svg" alt="likes" class="likes_icon"></p>
  <p class="price">${photographer.fullPrice}</p>`;
}

function photographerGalleryFactory(media: Media): string {
  const isVideo = media.type === "video";
  const mediaElement = isVideo
    ? /*html*/ `<video><source src="${media.mediaPath}"></video>`
    : /*html*/ `<img src="${media.mediaPath}" alt="${media.title}">`;
  const html =
    /*html*/
    `<article data-id="${media.id}">
      <button class="media_trigger" aria-label="Voir ${media.title} en grand">
        ${mediaElement}
      </button>
      <div class="media_footer">
        <h3>${media.title}</h3>
        <p class="likes">
          <span class="likes_count">${media.likes}</span>
          <button class="like_button" aria-label="Liker ${media.title}" aria-pressed="${likedMediaIds.has(media.id)}">
            <img src="assets/icons/like.svg" alt="" class="like_icon">
          </button>
        </p>
      </div>
     </article>`;
  return html;
}
