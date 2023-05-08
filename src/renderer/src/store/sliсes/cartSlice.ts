import { ICart } from "../../models/cart";
import { IProduct } from "../../models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    carts: ICart[];
}

const initialState: CartState = {
    carts: []
};

export type AddProductToCartPayload = {
    product: IProduct;
    cartId: string;
};

export type EditProductInCartPayload = {
    product: IProduct;
    cartId: string;
};
export type DeleteProductInCartPayload = {
    cartId: string;
    productId: string;
};

export type IncrementQuantityOfProductPayload = {
    cartId: string
    productId: string
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart(state, action: PayloadAction<ICart>) {
            state.carts.push(action.payload);
        },
        addProductToCart(state, action: PayloadAction<AddProductToCartPayload>) {
            const indexOfCart = state.carts.findIndex(({ _id }) => _id == action.payload.cartId);
            if (indexOfCart != -1) {
                state.carts[indexOfCart].products.push(action.payload.product);
            }
        },
        editProductInCart(state, action: PayloadAction<EditProductInCartPayload>) {
            const indexOfCart = state.carts.findIndex(({ _id }) => _id == action.payload.cartId);
            if (indexOfCart != -1) {
                const indexOfProduct = state.carts[indexOfCart].products.findIndex(
                    ({ _id }) => _id == action.payload.product._id
                );
                if (indexOfCart != -1) {
                    state.carts[indexOfCart].products[indexOfProduct] = action.payload.product;
                }
            }
        },
        deleteProductInCart(state, action: PayloadAction<DeleteProductInCartPayload>) {
            const indexOfCart = state.carts.findIndex(({ _id }) => _id == action.payload.cartId);
            if (indexOfCart != -1) {
                state.carts[indexOfCart].products = state.carts[indexOfCart].products.filter(
                    ({ _id }) => _id != action.payload.productId
                );
            }
        },
        incrementQuantity(state, action: PayloadAction<IncrementQuantityOfProductPayload>){
            const indexOfCart = state.carts.findIndex(({ _id }) => _id == action.payload.cartId);
            if(indexOfCart != -1){
                const indexOfProduct = state.carts[indexOfCart].products.findIndex(
                    ({ _id }) => _id == action.payload.productId
                );
                if(indexOfProduct != -1){
                    state.carts[indexOfCart].products[indexOfProduct].quantity++
                }
            }
        },
        decrementQuantity(state, action: PayloadAction<IncrementQuantityOfProductPayload>){
            const indexOfCart = state.carts.findIndex(({ _id }) => _id == action.payload.cartId);
            if(indexOfCart != -1){
                const indexOfProduct = state.carts[indexOfCart].products.findIndex(
                    ({ _id }) => _id == action.payload.productId
                );
                if(indexOfProduct != -1){
                    state.carts[indexOfCart].products[indexOfProduct].quantity--
                }
            }
        },
    }
});

export default cartSlice.reducer;
