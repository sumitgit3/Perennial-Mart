import {} from '@reduxjs/toolkit/query/react'
import apiSlice from '../api/apiSlice'
import { PRODUCTS_URL } from '../api/constants'


const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
      getProducts : builder.query({
        query : ()=> ({url:PRODUCTS_URL}),
        keepUnusedDataFor: 5
      }),
      getProductDetails : builder.query({
        query : (productId)=> ({url:`${PRODUCTS_URL}/${productId}`}),
        keepUnusedDataFor: 5
      })
    }),
});

export const {useGetProductsQuery,useGetProductDetailsQuery} = productApiSlice;