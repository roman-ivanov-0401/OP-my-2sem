import { IPledgedProduct } from "./pledgedProduct"

export type PledgeId = string;


export interface IPledge{
    _id: PledgeId;
    products: IPledgedProduct[];
    dateIn: string;
    dataOut: string;
}