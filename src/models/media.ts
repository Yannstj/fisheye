export interface MediaData {
  id: number;
  photographerId: number;
  title: string;
  image: string;
  likes: number;
  date: string;
  price: number;
}

export class Media implements MediaData {
  id: number;
  photographerId: number;
  title: string;
  image: string;
  likes: number;
  date: string;
  price: number;
  folderName: string;

  constructor(data: MediaData, folderName: string) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.folderName = folderName;
  }

  get mediaPath() {
    return `assets/photographers/${this.folderName}/${this.image}`;
  }
}
//TODO asap, gerer le media video
