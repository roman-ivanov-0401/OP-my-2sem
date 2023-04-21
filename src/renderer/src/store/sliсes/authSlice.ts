import { IUser, Roles} from "../../models/user"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    user: IUser
}

const initialState: AuthState = {
    user: {login: "",
    password: "",
    role: [Roles.USER, Roles.ADMIN],
    _id: "",
    balance: 0,
    basket: "",
    email: "",
    predges: ""
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>){
            state.user = action.payload;
        },
        logOut(state){
            state.user = {
                _id: "",
                balance: 0,
                basket: "",
                email: "",
                login: "",
                password: "",
                predges: "",
                role: [] 
            }
        }
    }
})

export default authSlice.reducer;