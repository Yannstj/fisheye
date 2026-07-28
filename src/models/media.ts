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

  constructor(data: MediaData) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }

  //   get mediaPath() {
  //     return `assets/photographers/.../${this.image}`;
  //   }
}
