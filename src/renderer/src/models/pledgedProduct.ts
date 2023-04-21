export type PledgedProdictId = string;

export interface IPledgedProduct{
    _id: PledgedProdictId;
    name: string;
    price: number;
    description: string;
    image: string;
}