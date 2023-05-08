import { IUser, Roles } from "../../models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    user: IUser;
    users: IUser[];
}

const initialState: AuthState = {
    user: {
        login: "",
        password: "",
        roles: [],
        _id: "",
        balance: 0,
        basket: "",
        email: "",
        pledge: ""
    },
    users: [{
        _id: String(Math.random() * 1000),
        balance: 0,
        basket: "",
        email: "admin@admin.com",
        login: "admin",
        password: "admin",
        pledge: "",
        roles: [Roles.USER, Roles.ADMIN]
    }]
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        logOut(state) {
            state.user = {
                _id: "",
                balance: 0,
                basket: "",
                email: "",
                login: "",
                password: "",
                pledge: "",
                roles: []
            };
        },
        addUser(state, action: PayloadAction<IUser>) {
            state.users.push(action.payload);
        },
        editUser(state, action: PayloadAction<IUser>) {
            state.users = state.users.map((user) =>
                user._id == action.payload._id ? action.payload : user
            );
        },
        deleteUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter((user) => user._id != action.payload);
        }
    }
});
