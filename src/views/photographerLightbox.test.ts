import { describe, expect, it } from "vitest";
import { photographerLightbox, renderLightbox } from "./photographerLightbox";

describe("#View", () => {
  it("throws if container missing", () => {
    document.body.innerHTML = "";
    expect(() => renderLightbox()).toThrow(
      "Container .photographer_lightbox introuvable",
    );
  });
  it("carousel injection", () => {
    expect(photographerLightbox()).not.toBeNull();
  });
});
