import { Media } from "../models/media.js";

export function photographerGallery(media: Media): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const article = document.createElement("article");
  if (media.type === "video") {
    const mediaVideo = document.createElement("video");
    const sourceVideo = document.createElement("source");
    sourceVideo.setAttribute("src", media.mediaPath);
    mediaVideo.appendChild(sourceVideo);
    article.appendChild(mediaVideo);
  } else {
    const mediaImage = document.createElement("img");
    mediaImage.setAttribute("src", media.mediaPath);
    mediaImage.setAttribute("alt", media.title);
    article.appendChild(mediaImage);
  }

  fragment.appendChild(article);

  return fragment;
}
