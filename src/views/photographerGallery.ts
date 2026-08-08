import { Media } from "../models/media.js";

export function photographerGallery(media: Media): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const label = document.createElement("label");
  const input = document.createElement("input");
  const article = document.createElement("article");
  const mediaImage = document.createElement("img");
  mediaImage.setAttribute("src", media.mediaPath);
  article.appendChild(mediaImage);

  fragment.appendChild(article);

  return fragment;
}
