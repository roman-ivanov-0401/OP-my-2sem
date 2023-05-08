import { IPledge } from "../../models/pledge";
import { IPledgedProduct } from "../../models/pledgedProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PledgeState {
    pledges: IPledge[];
}

const initialState: PledgeState = {
    pledges: []
};

export type AddProductToPledgePayload = {
    idOfPledge: string;
    product: IPledgedProduct;
};

export type EditProductInPledgePayload = {
    idOfPledge: string;
    idOfProduct: string;
    product: IPledgedProduct;
};

export type DeleteProductInPledgePayload = {
    idOfPledge: string;
    idOfProduct: string;
};

export type EditPledgePayload = Omit<IPledge, "products">;

export const pledgeSlice = createSlice({
    name: "pledge",
    initialState,
    reducers: {
        addPledge(state, action: PayloadAction<IPledge>) {
            state.pledges.push(action.payload);
        },
        deletePledge(state, action: PayloadAction<string>) {
            state.pledges = state.pledges.filter(({ _id }) => action.payload != _id);
        },
        addProductToPledge(state, action: PayloadAction<AddProductToPledgePayload>) {
            const index = state.pledges.findIndex(({ _id }) => action.payload.idOfPledge == _id);
            if (index != -1) {
                state.pledges[index].products.push(action.payload.product);
            }
        },
        editPledge(state, action: PayloadAction<EditPledgePayload>) {
            const indexOfPledge = state.pledges.findIndex(({ _id }) => _id == action.payload._id);
            if (indexOfPledge != -1) {
                state.pledges[indexOfPledge].dataOut = action.payload.dataOut;
                state.pledges[indexOfPledge].dateIn = action.payload.dateIn;
            }
        },
        editProductInPledge(state, action: PayloadAction<EditProductInPledgePayload>) {
            const indexOfPledge = state.pledges.findIndex(
                ({ _id }) => action.payload.idOfPledge == _id
            );
            if (indexOfPledge != -1) {
                const indexOfProduct = state.pledges[indexOfPledge].products.findIndex(
                    ({ _id }) => action.payload.idOfProduct == _id
                );
                if (indexOfProduct != -1) {
                    state.pledges[indexOfPledge].products[indexOfProduct] = action.payload.product;
                }
            }
        },
        deleteProductInPledge(state, action: PayloadAction<DeleteProductInPledgePayload>) {
            const indexOfPledge = state.pledges.findIndex(
                ({ _id }) => action.payload.idOfPledge == _id
            );
            if (indexOfPledge != -1) {
                state.pledges[indexOfPledge].products = state.pledges[
                    indexOfPledge
                ].products.filter(({ _id }) => action.payload.idOfProduct != _id);
            }
        }
    }
});

export default pledgeSlice.reducer;
