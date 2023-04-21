import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./sliсes/authSlice";
import cartReducer from "./sliсes/cartSlice";
import pledgeReducer from "./sliсes/pledgeSlice"
import catalogReducer from "./sliсes/catalogSlice"

const rootReducer = combineReducers({
    authReducer,
    cartReducer,
    pledgeReducer,
    catalogReducer
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']