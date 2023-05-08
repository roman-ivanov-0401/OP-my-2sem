import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {PROXY} from "../consts";
import {RegisterFormFields} from "../pages/Auth/Register";
import {IUser} from "../models/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROXY,
    mode: "cors"
  }),
  endpoints: (build) => ({
    registerUser: build.mutation<void, RegisterFormFields>({
      query: (user) =>  ({
        url: "api/auth/register",
        method: "POST",
        body: user
      })
    }),
    login: build.query<null, {email: string, password: string}>({
      query: ({email, password}) => ({
        url: "api/auth/authorization",
        params: {
          login: email,
          password
        }
      })
    }),
    putUser: build.mutation<void, IUser>({
      query: (user) => ({
        url: "api/auth/changeUser",
        method: "PUT",
        body: user
      })
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: "api/auth/deleteUser",
        method: "DELETE",
        params: {
          id
        }
      })
    }),
    getUser: build.query<IUser, string>({
      query: (_id) => ({
        url: "api/auth/getUser",
        params: {
          id: _id
        },
      })
    })

  })
})
