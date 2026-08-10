import { Media } from "../models/media.js";

export function photographerGallery(media: Media): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const article = document.createElement("article");
  const mediaImage = document.createElement("img");
  mediaImage.setAttribute("src", media.mediaPath);
  mediaImage.setAttribute("alt", media.title);
  article.appendChild(mediaImage);
  fragment.appendChild(article);

  return fragment;
}
