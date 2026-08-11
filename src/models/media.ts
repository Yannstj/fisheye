export interface MediaData {
  id: number;
  photographerId: number;
  title: string;
  likes: number;
  date: string;
  price: number;
}

interface MediaImageData extends MediaData {
  image: string;
}
interface MediaVideoData extends MediaData {
  video: string;
}

export type MediaDataType = MediaImageData | MediaVideoData;

export class Media implements MediaData {
  id: number;
  photographerId: number;
  title: string;
  likes: number;
  date: string;
  price: number;
  folderName: string;
  type: "image" | "video";
  filename: string;

  constructor(data: MediaDataType, folderName: string) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.folderName = folderName;

    if ("image" in data) {
      this.type = "image";
      this.filename = data.image;
    } else {
      this.type = "video";
      this.filename = data.video;
    }
  }

  get mediaPath() {
    return `assets/photographers/${this.folderName}/${this.filename}`;
  }
}
