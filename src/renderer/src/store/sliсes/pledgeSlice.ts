import { IPledge } from "../../models/pledge";
import { IPledgedProduct } from "../../models/pledgedProduct"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PledgeState{
    pledge: IPledge
}

const initialState: PledgeState = {
    pledge: {products: [], _id: "", dataOut: "", dateIn: ""}
}

export const authSlice = createSlice({
    name: "pledge",
    initialState,
    reducers: {
        setPledge(state, action: PayloadAction<IPledge>){
            state.pledge = action.payload
        },
        addProduct(state, action: PayloadAction<IPledgedProduct>){
            state.pledge.products.push(action.payload);
        },
    }
})

export default authSlice.reducer;