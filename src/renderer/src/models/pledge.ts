import { IPledgedProduct } from "./pledgedProduct"

export type PledgeId = string;

export interface IPledge{
    _id: PledgeId;
    products: IPledgedProduct[];
    //TODO После реализации контроллеров поменять тип даты
    dateIn: string;
    dataOut: string;
}