import {} from '@reduxjs/toolkit/query/react'
import apiSlice from '../api/apiSlice'
import { PRODUCTS_URL } from '../api/constants'

//doing async fetch through react toolkit
//instead of directly writing in apiSlice endpoint ,we are using injectEndpoints function of the slice
const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
      getProducts : builder.query({
        query : ()=> ({url:PRODUCTS_URL}),
        keepUnusedDataFor: 5    //will the data unused data cached for 5 second
      }),
      getProductDetails : builder.query({
        query : (productId)=> ({url:`${PRODUCTS_URL}/${productId}`}),
        keepUnusedDataFor: 5
      })
    }),
});
//naming convention use${endpointName}Query
export const {useGetProductsQuery,useGetProductDetailsQuery} = productApiSlice;