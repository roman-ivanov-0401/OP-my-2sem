import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {PROXY} from "../consts";
import {IPledgedProduct} from "../models/pledgedProduct";
import pledgeSlice from "../store/sliсes/pledgeSlice";

export const pledgedProductApi = createApi({
  reducerPath: "pledgedProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROXY,
    mode: "cors"
  }),
  endpoints: (build) => ({
    getProduct: build.query<IPledgedProduct, string>({
      query: (id) => ({
        url: "api/auth/getPledgedProduct",
        params: {
          id
        }
      })
    }),
    getAllProducts: build.query<IPledgedProduct[], null>({
      query: () => ({
        url: "api/auth/getAllPledgedProducts",
      }),
      async onQueryStarted(args, {queryFulfilled, dispatch}){
        const { data } = await queryFulfilled;
        if(data) dispatch(pledgeSlice.actions.addProducts(data))

      }
    }),
    postProduct: build.mutation<any, IPledgedProduct>({
      query: (product) => ({
        url: "api/auth/setPledgedProduct",
        method: "POST",
        body: product
      })
    }),

    putProduct: build.mutation<any, IPledgedProduct>({
      query: (product) => ({
        url: "api/auth/changePledgedProduct",
        method: "PUT",
        body: product
      })
    }),

    deleteProduct: build.mutation<any, string>({
      query: (id) => ({
        url: "api/auth/deletePledgedProduct",
        method: "DELETE",
        params: {
          id
        }
      })
    }),
  })
})
