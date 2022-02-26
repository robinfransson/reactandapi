import { rejects } from "assert";
import { Url } from "url";

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

export interface CreateUserResult {
  message: string;
}

export interface CreateUserCommand {
  username: string;
  email: string;
  password: string;
}

class APIRequest {
  constructor() {}

  async Post<T, T2>(url: string, data: T): Promise<T2> {
    return await fetch(`${BASE_URL}${url}`, {
      method: "Post",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  async Get<T, T2>(path: string, data: T): Promise<T2> {
    const params = new URLSearchParams(data ?? {}).toString();
    const requestUrl = `${BASE_URL}${path}?${params}`;
    return await fetch(requestUrl)
      .then((res) => res.json())
      .catch(Promise.reject);
  }

  async GetNoData<T>(path: string): Promise<T> {
    const requestUrl = `${BASE_URL}${path}`;
    return await fetch(requestUrl)
      .then((res) => res.json())
      .catch(Promise.reject);
  }
}

export class API {
  private static instance = new APIRequest();

  public static async createUser(
    data: CreateUserCommand
  ): Promise<CreateUserResult> {
    return await API.instance.Post<CreateUserCommand, CreateUserResult>(
      "/api/User/Create",
      data
    );
  }

  public static async getProducts(): Promise<ProductData[]> {
    return await this.instance.GetNoData<ProductData[]>("/api/Home/Products");
  }

  public static async getHomeData(): Promise<HomeData> {
    return await this.instance.GetNoData<HomeData>("/api/Home");
  }
}
