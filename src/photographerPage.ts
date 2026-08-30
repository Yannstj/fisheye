import { initPhotographerDetail } from "./controllers/photographerDetailController.js";
import { initPhotographerMedia } from "./controllers/photographerMediaContoller.js";

async function initPhotographerPage() {
  initPhotographerDetail();
  initPhotographerMedia();
}

initPhotographerPage();
