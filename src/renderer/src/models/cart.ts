import { IProduct } from "./product"

export type CartId = string;

export interface ICart{
    _id: CartId;
    products: IProduct[];
};