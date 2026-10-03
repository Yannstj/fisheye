import { describe, expect, it } from "vitest";
import { photographerLightbox, renderLightbox } from "./photographerLightbox";

describe("#View", () => {
  it("throws if container missing", () => {
    document.body.innerHTML = "";
    expect(() => renderLightbox()).toThrow(
      "Container .photographer_lightbox introuvable",
    );
  });
  it("injects template into container when found", () => {
    document.body.innerHTML = '<div class="photographer_lightbox"></div>';
    renderLightbox();

    const container = document.querySelector(".photographer_lightbox");
    expect(container?.innerHTML).toBe(photographerLightbox());
  });
  it("renders one carousel item per media", () => {
    const medias = [""];
    //document.body.innerHTML = photographerLightbox(medias);
    expect(document.querySelectorAll(".carousel-item")).toHaveLength(
      medias.length,
    );
  });
});
