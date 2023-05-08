import { IProduct, ProdictId } from "../../models/product"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { mockProducts } from "../../pages/User/Catalog/catalog.mock"

export interface CatalogState{
    products: IProduct[]
}

interface EditPayload{
    id: ProdictId,
    newProduct: IProduct
}

const initialState: CatalogState = {
    products: mockProducts
}

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<IProduct[]>){
            state.products = action.payload
        },
        addProduct(state, action: PayloadAction<IProduct>){
            state.products.push(action.payload);
        },
        editProduct(state, action: PayloadAction<EditPayload>){
            const index = state.products.findIndex(({_id}) => _id == action.payload.id);
            state.products[index] = action.payload.newProduct;
        },
        deleteProduct(state, action: PayloadAction<ProdictId>){
            state.products = state.products.filter(({_id}) => _id != action.payload);
        }
    }
})

export default catalogSlice.reducer;
