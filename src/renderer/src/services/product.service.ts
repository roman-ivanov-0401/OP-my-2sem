import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {PROXY} from "../consts";
import {IProduct} from "../models/product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROXY,
    mode: "cors"
  }),
  endpoints: (build) => ({
    getProduct: build.query<IProduct, string>({
      query: (id) => ({
        url: "api/auth/getProduct",
        params: {
          id
        }
      })
    }),

    postProduct: build.mutation<void, IProduct>({
      query: (product) => ({
        url: "api/auth/setProduct",
        method: "POST",
        body: product
      })
    }),

    putProduct: build.mutation<void, IProduct>({
      query: (product) => ({
        url: "api/auth/changeProduct",
        method: "PUT",
        body: product
      })
    }),

    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: "api/auth/deleteProduct",
        method: "DELETE",
        params: {
          id
        }
      })
    }),
  })
})
