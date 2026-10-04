import { describe, expect, it } from "vitest";
import { Media } from "../models/media.js";
import {
  photographerLightboxTemplate,
  renderPhotographerLightbox,
} from "./photographerLightbox";

const medias = [
  { id: 1, title: "Photo 1", mediaPath: "a.jpg", type: "image" },
  { id: 2, title: "Photo 2", mediaPath: "b.jpg", type: "image" },
] as Media[];

describe("#View", () => {
  it("throws if container missing", () => {
    document.body.innerHTML = "";
    expect(() => renderPhotographerLightbox(medias)).toThrow(
      "Container .photographer_lightbox introuvable",
    );
  });
  it("injects template into container when found", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    renderPhotographerLightbox(medias);

    const container = document.querySelector(".photographer_lightbox");
    expect(container?.innerHTML).toBe(photographerLightboxTemplate(medias));
  });
  it("renders one carousel item per media", () => {
    document.body.innerHTML = photographerLightboxTemplate(medias);
    expect(document.querySelectorAll(".carousel-item")).toHaveLength(
      medias.length,
    );
  });
});
