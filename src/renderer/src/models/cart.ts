import { IProduct } from "./product"

export type CartId = string;

export interface CartProduct{
    product: IProduct;
    quantity: number;
}

export interface ICart{
    _id: CartId;
    products: CartProduct[];
};