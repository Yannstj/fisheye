function createOptionInputs(
  text: string,
  className: string,
): HTMLOptionElement {
  const option = document.createElement("option");
  option.textContent = text;
  option.classList.add(className);
  return option;
}
export function photographerGalleryFilter() {
  const fragment = document.createDocumentFragment();

  const label = document.createElement("label");
  const select = document.createElement("select");

  label.textContent = "Trier par";

  fragment.appendChild(label);
  fragment.appendChild(select);
  select.appendChild(createOptionInputs("Popularité", "popularity"));
  select.appendChild(createOptionInputs("Date", "date"));
  select.appendChild(createOptionInputs("Titre", "title"));
  return fragment;
}
