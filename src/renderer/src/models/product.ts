export type ProdictId = string;

export interface IProduct{
    _id: ProdictId;
    name: string;
    price: number;
    description: string;
    image: string;
}