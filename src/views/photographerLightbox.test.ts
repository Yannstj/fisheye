import { describe, expect, it } from "vitest";
import { Media } from "../models/media.js";
import {
  carouselItem,
  displayLightbox,
  getNextMediaId,
  getPreviousMediaId,
  photographerLightboxTemplate,
  setActiveCarouselItem,
} from "./photographerLightbox";

const medias = [
  { id: 1, title: "Photo 1", mediaPath: "a.jpg", type: "image" },
  { id: 2, title: "Photo 2", mediaPath: "b.jpg", type: "image" },
  { id: 3, title: "Video 1", mediaPath: "a.mp4", type: "video" },
] as Media[];

describe("#Lightbox View", () => {
  it("throws if container missing", () => {
    document.body.innerHTML = "";
    expect(() => displayLightbox(medias)).toThrow(
      "Container .photographer_lightbox introuvable",
    );
  });
  it("injects template into container when found", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    displayLightbox(medias);

    const container = document.querySelector(".photographer_lightbox");
    expect(container?.innerHTML).toBe(photographerLightboxTemplate(medias));
  });
  it("renders one carousel item per media", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);
    expect(document.querySelectorAll(".carrousel_item")).toHaveLength(
      medias.length,
    );
  });
  it("sets active class on the matching carousel item", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);

    setActiveCarouselItem(2);

    const items = document.querySelectorAll(".carrousel_item");
    expect(items[0].classList.contains("active")).toBe(false);
    expect(items[1].classList.contains("active")).toBe(true);
  });

  it("moves active class when called again with a different id", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);

    setActiveCarouselItem(1);
    setActiveCarouselItem(2);

    const items = document.querySelectorAll(".carrousel_item");
    expect(items[0].classList.contains("active")).toBe(false);
    expect(items[1].classList.contains("active")).toBe(true);
  });

  it("renders a close button with an aria-label", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);

    const closeButton = document.querySelector(".lightbox_close");
    expect(closeButton).not.toBeNull();
    expect(closeButton?.getAttribute("aria-label")).toBe("Fermer la visionneuse");
  });

  it("hides lightbox and restores aria-hidden on close click", () => {
    document.body.innerHTML = `
      <main id="main" aria-hidden="true"></main>
      <div class="photographer_lightbox"></div>
    `;
    displayLightbox(medias);

    const closeButton = document.querySelector(
      ".lightbox_close",
    ) as HTMLElement;
    closeButton.click();

    const lightbox = document.querySelector(".photographer_lightbox");
    expect(lightbox?.hasAttribute("hidden")).toBe(true);
    expect(document.getElementById("main")?.getAttribute("aria-hidden")).toBe(
      "false",
    );
  });

  it("hides lightbox and restores aria-hidden on Escape keydown", () => {
    document.body.innerHTML = `
      <main id="main" aria-hidden="true"></main>
      <div class="photographer_lightbox"></div>
    `;
    displayLightbox(medias);

    const container = document.querySelector(
      ".photographer_lightbox",
    ) as HTMLElement;
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );

    expect(container.hasAttribute("hidden")).toBe(true);
    expect(document.getElementById("main")?.getAttribute("aria-hidden")).toBe(
      "false",
    );
  });

  it("traps focus: Tab on the last focusable element moves to the first", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    displayLightbox(medias);

    const container = document.querySelector(
      ".photographer_lightbox",
    ) as HTMLElement;
    const closeButton = container.querySelector(
      ".lightbox_close",
    ) as HTMLElement;
    const nextButton = container.querySelector(
      ".carrousel_next",
    ) as HTMLElement;

    nextButton.focus();
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );

    expect(document.activeElement).toBe(closeButton);
  });

  it("traps focus: Shift+Tab on the first focusable element moves to the last", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    displayLightbox(medias);

    const container = document.querySelector(
      ".photographer_lightbox",
    ) as HTMLElement;
    const closeButton = container.querySelector(
      ".lightbox_close",
    ) as HTMLElement;
    const nextButton = container.querySelector(
      ".carrousel_next",
    ) as HTMLElement;

    closeButton.focus();
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true }),
    );

    expect(document.activeElement).toBe(nextButton);
  });

  it("renders an image for image type media", () => {
    const result = carouselItem(medias[0]);

    expect(result).toContain('src="a.jpg"');
    expect(result).toContain('alt="Photo 1"');
  });

  it("renders a video for video type media", () => {
    const result = carouselItem(medias[2]);

    expect(result).toContain('src="a.mp4"');
  });

  it("renders the media title", () => {
    const result = carouselItem(medias[0]);

    expect(result).toContain("Photo 1");
  });

  it("has an aria-label on the carousel list", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);

    const carousel = document.querySelector(".carrousel");
    expect(carousel?.getAttribute("aria-label")).toBe(
      "Visionneuse de médias",
    );
  });

  it("renders prev and next buttons with aria-labels", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);

    const prevButton = document.querySelector(".carrousel_prev");
    const nextButton = document.querySelector(".carrousel_next");

    expect(prevButton?.getAttribute("aria-label")).toBe("Image précédente");
    expect(nextButton?.getAttribute("aria-label")).toBe("Image suivante");
  });

  it("returns the next media id", () => {
    expect(getNextMediaId(medias, 1)).toBe(2);
  });

  it("loops back to the first media id when next is called on the last", () => {
    expect(getNextMediaId(medias, 3)).toBe(1);
  });

  it("returns the previous media id", () => {
    expect(getPreviousMediaId(medias, 2)).toBe(1);
  });

  it("loops back to the last media id when previous is called on the first", () => {
    expect(getPreviousMediaId(medias, 1)).toBe(3);
  });

  it("navigates to next media on next button click", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    displayLightbox(medias);
    setActiveCarouselItem(1);

    const nextButton = document.querySelector(
      ".carrousel_next",
    ) as HTMLElement;
    nextButton.click();

    const items = document.querySelectorAll(".carrousel_item");
    expect(items[0].classList.contains("active")).toBe(false);
    expect(items[1].classList.contains("active")).toBe(true);
  });

  it("navigates to previous media on prev button click", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    displayLightbox(medias);
    setActiveCarouselItem(2);

    const prevButton = document.querySelector(
      ".carrousel_prev",
    ) as HTMLElement;
    prevButton.click();

    const items = document.querySelectorAll(".carrousel_item");
    expect(items[0].classList.contains("active")).toBe(true);
    expect(items[1].classList.contains("active")).toBe(false);
  });

  it("navigates to next media on ArrowRight keydown", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    displayLightbox(medias);
    setActiveCarouselItem(1);

    const container = document.querySelector(
      ".photographer_lightbox",
    ) as HTMLElement;
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );

    const items = document.querySelectorAll(".carrousel_item");
    expect(items[0].classList.contains("active")).toBe(false);
    expect(items[1].classList.contains("active")).toBe(true);
  });

  it("navigates to previous media on ArrowLeft keydown", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    displayLightbox(medias);
    setActiveCarouselItem(2);

    const container = document.querySelector(
      ".photographer_lightbox",
    ) as HTMLElement;
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );

    const items = document.querySelectorAll(".carrousel_item");
    expect(items[0].classList.contains("active")).toBe(true);
    expect(items[1].classList.contains("active")).toBe(false);
  });
});
