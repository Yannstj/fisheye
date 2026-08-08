export function createParagraph(
  text: string,
  className: string,
): HTMLParagraphElement {
  const p = document.createElement("p");
  p.textContent = text;
  p.classList.add(className);
  return p;
}
