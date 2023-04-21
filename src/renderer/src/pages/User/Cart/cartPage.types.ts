import { ProdictId } from "../../../models/product"

export interface ICartTableRow{
    _id: ProdictId,
    name: string,
    price: number,
    quantity: number
}