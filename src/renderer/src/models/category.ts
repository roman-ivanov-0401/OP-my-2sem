import { IProduct } from "./product"

export type CategoryId = string;

export interface ICategory{
    _id: CategoryId;
    name: string;
    products: IProduct;
}