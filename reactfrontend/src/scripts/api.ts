import React from 'react';
import { authContext } from '../components/AuthContext';
import { useAuth } from './auth';

const BASE_URL: string = '';

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
    status: number;
    token?: string | null;
}

export interface CreateUserCommand {
    username: string;
    email: string;
    password: string;
}
export interface SigninUserCommand {
    username: string;
    password: string;
}

class APIRequest {
    constructor() {}

    async Post<T, T2>(url: string, data: T): Promise<T2> {
        return await fetch(`${BASE_URL}${url}`, {
            method: 'Post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then((res) => {
            if (res.headers.get('Auth-token')) {
                window.sessionStorage.setItem(
                    'token',
                    res.headers.get('Auth-token') ?? ''
                );
            }
            return res.json();
        });
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

    async VerifyToken(): Promise<boolean> {
        if (sessionStorage.getItem('token') != null) {
            const token = sessionStorage.getItem('token') ?? undefined;
            const response = await fetch(`${BASE_URL}/api/User/Verify`, {
                method: 'GET',
                headers: [['Auth-token', token!]],
            });
            if (response.status === 200) {
                return true;
            } else if (response.status === 401) {
                console.log('user is not authenticated');
            } else {
                console.log('another error was caught: ', response.status);
            }
        }
        return false;
    }
}

export class API {
    private static instance = new APIRequest();

    public static async verify(): Promise<boolean> {
        return await API.instance.VerifyToken();
    }

    public static async createUser(
        data: CreateUserCommand
    ): Promise<CreateUserResult> {
        return await API.instance.Post<CreateUserCommand, CreateUserResult>(
            '/api/User/Create',
            data
        );
    }

    public static async signinUser(
        data: SigninUserCommand
    ): Promise<CreateUserResult> {
        return {
            ...(await API.instance.Post<SigninUserCommand, CreateUserResult>(
                '/api/User/Signin',
                data
            )),
            token: sessionStorage.getItem('token'),
        };
    }

    public static async getProducts(): Promise<ProductData[]> {
        return await this.instance.GetNoData<ProductData[]>(
            '/api/Home/Products'
        );
    }

    public static async getHomeData(): Promise<HomeData> {
        return await this.instance.GetNoData<HomeData>('/api/Home');
    }
}
