const BASE_URL: string = "";

export enum ViewStyle {
  Grid = 0,
  Row = 1,
}

export interface HomeData {
  title: string;
  preamble: string;
  products: Array<ProductData>;
}

export interface ProductData {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
}

class APIRequest {
  constructor() {}

  async getHomeData(): Promise<HomeData> {
    try {
      const response = await fetch(BASE_URL + "/api/Home");
      let res = await response.json();
      return res;
    } catch (err) {
      return Promise.reject();
    }
  }
  async getProducts(): Promise<ProductData[]> {
    try {
      const response = await fetch(BASE_URL + "/api/Home/Products");
      let res = await response.json();
      console.log(res);
      return res;
    } catch (err) {
      return Promise.reject();
    }
  }
}

export class API {
  private static _instance = new APIRequest();

  static get instance() {
    return this._instance;
  }
}
