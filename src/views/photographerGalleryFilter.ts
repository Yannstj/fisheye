export function photographerGalleryFilter() {
  const fragment = document.createDocumentFragment();

  const label = document.createElement("label");
  const input = document.createElement("input");
  label.textContent = "Trier par";

  fragment.appendChild(label);
  fragment.appendChild(input);
  console.log(fragment);

  return fragment;
}
