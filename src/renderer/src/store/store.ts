import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {authSlice} from "./sliсes/authSlice";
import cartReducer from "./sliсes/cartSlice";
import pledgeReducer from "./sliсes/pledgeSlice"
import catalogReducer from "./sliсes/catalogSlice"
import {userApi} from "../services/user.service";
import {productApi} from "../services/product.service";
import {pledgedProductApi} from "../services/pledgedProduct.service";

const rootReducer = combineReducers({
    authReducer: authSlice.reducer,
    cartReducer,
    pledgeReducer,
    catalogReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [pledgedProductApi.reducerPath]: pledgedProductApi.reducer

})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(userApi.middleware)
          .concat(productApi.middleware)
          .concat(pledgedProductApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
