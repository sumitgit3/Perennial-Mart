import apiSlice from "../api/apiSlice";
import { ORDERS_URL } from "../api/constants";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({                
            query:(order)=>({
                url :`${ORDERS_URL}`,
                method:'POST',
                body:{...order}
            }),
        }),
        getOrderById:builder.query({
            query: (orderId)=>({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor:5
        })
    })
});

export const {useCreateOrderMutation,useGetOrderByIdQuery} = orderApiSlice;