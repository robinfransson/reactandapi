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

export interface ModalOptions {
    toggle: () => void;
}
