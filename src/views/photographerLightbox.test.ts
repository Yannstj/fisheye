import { describe, expect, it } from "vitest";
import { Media } from "../models/media.js";
import {
  displayLightbox,
  photographerLightboxTemplate,
  setActiveCarouselItem,
} from "./photographerLightbox";

const medias = [
  { id: 1, title: "Photo 1", mediaPath: "a.jpg", type: "image" },
  { id: 2, title: "Photo 2", mediaPath: "b.jpg", type: "image" },
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
    expect(document.querySelectorAll(".carousel-item")).toHaveLength(
      medias.length,
    );
  });
  it("sets active class on the matching carousel item", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);

    setActiveCarouselItem(2);

    const items = document.querySelectorAll(".carousel-item");
    expect(items[0].classList.contains("active")).toBe(false);
    expect(items[1].classList.contains("active")).toBe(true);
  });

  it("moves active class when called again with a different id", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);

    setActiveCarouselItem(1);
    setActiveCarouselItem(2);

    const items = document.querySelectorAll(".carousel-item");
    expect(items[0].classList.contains("active")).toBe(false);
    expect(items[1].classList.contains("active")).toBe(true);
  });

  it("renders a close button with an aria-label", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);

    const closeButton = document.querySelector(".lightbox_close");
    expect(closeButton).not.toBeNull();
    expect(closeButton?.getAttribute("aria-label")).toBe("Fermer la visionneuse");
  });
});
