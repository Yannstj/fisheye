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

type MediaDataType = MediaImageData | MediaVideoData;

export class Media implements MediaData {
  id: number;
  photographerId: number;
  title: string;
  likes: number;
  date: string;
  image?: string;
  video?: string;
  price: number;
  folderName: string;

  constructor(data: MediaDataType, folderName: string) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.folderName = folderName;
    if ("image" in data) {
      this.image = data.image;
    } else {
      this.video = data.video;
    }
  }

  get mediaPath() {
    const filename = this.image ?? this.video;
    return `assets/photographers/${this.folderName}/${filename}`;
  }
}
//TODO asap, gerer le media video
