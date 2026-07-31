export interface PhotographerData {
  name: string;
  id: number;
  city: string;
  country: string;
  tagline: string;
  price: number;
  portrait: string;
}

export class Photographer implements PhotographerData {
  name: string;
  id: number;
  city: string;
  country: string;
  tagline: string;
  price: number;
  portrait: string;

  constructor(data: PhotographerData) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  get portraitPath(): string {
    return `assets/photographers/Photographers_Photos/${this.portrait}`;
  }

  get fullLocation(): string {
    return `${this.city}, ${this.country}`;
  }

  get fullPrice(): string {
    return `${this.price}€/jour`;
  }

  get mediaFolderName(): string {
    let name = this.name;
    let formattedName = name
      .replace("-", " ")
      .split(" ")
      .slice(0, -1)
      .join(" ");
    //split cree un tableau d'elements a chaque espace rencontré
    // ici on suppose que le derniere element de slice est toujours le nom de famille
    return formattedName;
  }
}
