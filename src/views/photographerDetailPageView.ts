import { Media } from "../models/media.js";
import { SortCriteria } from "../models/mediaModel.js";
import { Photographer } from "../models/photographer.js";

export function renderDetailPhotographerPage(
  photographer: Photographer,
  medias: Media[],
  onSortChange: (criteria: SortCriteria) => void,
): void {
  displayHeader(photographer);
  displayDropDown(onSortChange);
  displayMedia(medias);
  displayContactModal(photographer);
}

function displayHeader(photographer: Photographer): void {
  const container = document.querySelector(".photographer_banner");
  if (!container) {
    throw new Error("Container .photographer_banner introuvable");
  }
  container.innerHTML = photographerBanner(photographer);
}

function photographerBanner(photographer: Photographer): string {
  return `<div class="photographer_banner_details">
  <h1>${photographer.name}</h1>
  <p class="location">${photographer.fullLocation}</p>
  <p class="tagline">${photographer.tagline}</p>
  </div>
  <button class="contact_button">Contactez-moi</button>
  <img src="${photographer.portraitPath}" alt="${photographer.name}" class="photographer_banner_image">`;
}

// faire un onSortchange de criteria
function displayDropDown(onSortChange: (criteria: SortCriteria) => void) {
  const container = document.querySelector(".photographer_filter");
  if (!container) {
    throw new Error("Container .photographer_filter introuvable");
  }
  container.innerHTML = photographerFilter();

  const toggleButton = container.querySelector("button");
  const dropdownList = container.querySelector("#dropdown");

  if (toggleButton && dropdownList) {
    toggleButton.addEventListener("click", function () {
      const isHidden = dropdownList.hasAttribute("hidden");

      if (isHidden) {
        dropdownList.removeAttribute("hidden");
        toggleButton.setAttribute("aria-expanded", "true");
      } else {
        dropdownList.setAttribute("hidden", "");
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  const sortOptions = container.querySelectorAll("li[data-sort]");
  sortOptions.forEach(function (sortOption) {
    sortOption.addEventListener("click", function () {
      const criteria = sortOption.getAttribute("data-sort");

      if (criteria === "popularity") {
        onSortChange("popularity");
      } else if (criteria === "date") {
        onSortChange("date");
      } else if (criteria === "title") {
        onSortChange("title");
      }
    });
  });
}

function photographerFilter() {
  return ` <button aria-haspopup="listbox" aria-expanded="false" aria-controls="dropdown">Trier par</button>
  <ul id="dropdown" role="listbox" class="dropdown-content" hidden>
    <li role="option" data-sort="popularity">Popularité</li>
    <li role="option" data-sort="date">Date</li>
    <li role="option" data-sort="title">Titre</li>
  </ul>`;
}

function displayContactModal(photographer: Photographer): void {
  document.body.insertAdjacentHTML(
    "beforeend",
    contactModalTemplate(photographer),
  );

  const modal = document.querySelector("#contact_modal");
  const openButton = document.querySelector(
    ".photographer_banner .contact_button",
  );
  const closeButton = modal?.querySelector(".modal_close");
  const form = modal?.querySelector("form");

  if (!modal || !openButton || !closeButton || !form) {
    throw new Error("Élément(s) de la modale de contact introuvable(s)");
  }

  openButton.addEventListener("click", function () {
    modal.removeAttribute("hidden");
  });

  closeButton.addEventListener("click", function () {
    modal.setAttribute("hidden", "");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = (
      form.querySelector(".modal_firstname") as HTMLInputElement
    ).value;
    const lastName = (form.querySelector(".modal_lastname") as HTMLInputElement)
      .value;
    const email = (form.querySelector(".modal_email") as HTMLInputElement)
      .value;
    const message = (
      form.querySelector(".modal_message") as HTMLTextAreaElement
    ).value;

    console.log({ firstName, lastName, email, message });

    form.reset();
    modal.setAttribute("hidden", "");
  });
}

function contactModalTemplate(photographer: Photographer): string {
  return `<div id="contact_modal" hidden>
  <div class="modal">
    <header>
      <h2>Contactez-moi<br>${photographer.name}</h2>
      <img src="assets/icons/close.svg" alt="Fermer la modale" class="modal_close">
    </header>
    <form>
      <div>
        <label for="firstname">Prénom</label>
        <input id="firstname" class="modal_firstname" type="text" required>
      </div>
      <div>
        <label for="lastname">Nom</label>
        <input id="lastname" class="modal_lastname" type="text" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" class="modal_email" type="email" required>
      </div>
      <div>
        <label for="message">Votre message</label>
        <textarea id="message" class="modal_message" rows="5" required></textarea>
      </div>
      <button type="submit" class="contact_button">Envoyer</button>
    </form>
  </div>
</div>`;
}

export function displayMedia(medias: Media[]): void {
  const container = document.querySelector(".photographer_gallery");
  if (!container) {
    throw new Error("Container .photographer_gallery introuvable");
  }
  container.innerHTML = medias
    .map((media) => photographerGalleryFactory(media))
    .join("");
}

function photographerGalleryFactory(media: Media): string {
  const isVideo = media.type === "video";
  const mediaElement = isVideo
    ? `<video><source src="${media.mediaPath}"></video>`
    : `<img src="${media.mediaPath}" alt="${media.title}">`;
  const html = `<article>
    ${mediaElement}
    <h3>${media.title}</h3>
    <p class="likes"></p>
  </article>`;
  return html;
}
