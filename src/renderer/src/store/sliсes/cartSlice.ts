import { CartProduct, ICart } from "../../models/cart";
import { IProduct, ProdictId } from "../../models/product"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartState{
    cart: ICart
}


const initialState: CartState = {
    cart: {_id: "", products: [
        {
            product:{
                _id: "",
                name: "name",
                description: "desc",
                image: "src",
                price: 100
            },
            quantity: 3
        }
    ]}
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<ICart>){
            state.cart = action.payload
        },
        addProduct(state, action: PayloadAction<CartProduct>){
            state.cart.products.push(action.payload);
        },
        deleteProduct(state, action: PayloadAction<ProdictId>){
            state.cart.products = state.cart.products
            .filter(({product: { _id }}) => _id != action.payload);
        },
        incrementQuantity(state, action: PayloadAction<ProdictId>){
            const foundProduct = state.cart.products.find(({product: { _id }}) => _id == action.payload);
            const foundIndex = state.cart.products.findIndex(({product: { _id }}) => _id == action.payload);
            if(foundProduct){ 
                foundProduct.quantity++;
                state.cart.products[foundIndex] = foundProduct;
            }
        },
        decrementQuantity(state, action: PayloadAction<ProdictId>){
            const foundProduct = state.cart.products.find(({product: { _id }}) => _id == action.payload);
            const foundIndex = state.cart.products.findIndex(({product: { _id }}) => _id == action.payload);
            if(foundProduct){ 
                foundProduct.quantity--;
                state.cart.products[foundIndex] = foundProduct;
            }
        },
        emptyCart(state){
            state.cart.products = [];
        }
    }
})

export default cartSlice.reducer;