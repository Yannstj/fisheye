import { Media } from "../models/media";

export function photographerGallery(media: Media): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const mediaImage = document.createElement("img");
  mediaImage.setAttribute("src", media.mediaPath);

  fragment.appendChild(mediaImage);

  return fragment;
}
