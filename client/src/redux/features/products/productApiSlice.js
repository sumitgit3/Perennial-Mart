import {} from '@reduxjs/toolkit/query/react'
import apiSlice from '../api/apiSlice'
import { PRODUCTS_URL, UPLOAD_URL } from '../api/constants'

//doing async fetch through react toolkit
//instead of directly writing in apiSlice endpoint ,we are using injectEndpoints function of the slice
const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
      getProducts : builder.query({
        query : ()=> ({url:PRODUCTS_URL}),
        keepUnusedDataFor: 5,    //will the data unused data cached for 5 second
        providesTags:['Product']
      }),
      getProductDetails : builder.query({
        query : (productId)=> ({url:`${PRODUCTS_URL}/${productId}`}),
        keepUnusedDataFor: 5
      }),
      createProduct:builder.mutation({
        query:()=>({
          url:PRODUCTS_URL,
          method:'POST',
        }),
        invalidatesTags:['Product'] //After the mutation completes, any cached data associated with the 'Product' tag is invalidated, causing relevant queries to refetch their data.
      }),
      updateProduct:builder.mutation({
        query:(data)=>({
          url:`${PRODUCTS_URL}/${data._id}`,
          method:'PUT',
          body:data
        }),
        invalidatesTags:['Product'] //After the mutation completes, any cached data associated with the 'Product' tag is invalidated, causing relevant queries to refetch their data.
      }),
      uploadProductImage:builder.mutation({
        query:(data)=>({
          url:UPLOAD_URL,
          method:'POST',
          body:data
        })
      }),
      deleteProduct:builder.mutation({
        query:(id)=>({
          url:`${PRODUCTS_URL}/${id}`,
          method:'DELETE'
        })
      })
    }),
});
//naming convention use${endpointName}Query
export const {useGetProductsQuery,
              useGetProductDetailsQuery,
              useCreateProductMutation,
              useUpdateProductMutation,
              useUploadProductImageMutation,
              useDeleteProductMutation
            } = productApiSlice;