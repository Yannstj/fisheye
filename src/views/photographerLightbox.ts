export function renderLightbox(): void {
  const container = document.querySelector("photographer_lightbox");
  if (!container) {
    throw new Error("Container .photographer_lightbox introuvable");
  }
  container.innerHTML = photographerLightbox();
}

export function photographerLightbox(): string {
  return /*html*/ `<ul>
  <li>test</li>
  </ul>`;
}
