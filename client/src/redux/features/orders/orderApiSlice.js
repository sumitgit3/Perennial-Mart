import apiSlice from "../api/apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../api/constants";

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
        }),
        payOrderById:builder.mutation({
            query : ({orderId,details})=>({
                url:`${ORDERS_URL}/${orderId}/pay`,
                method:'PUT',
                body:{...details}
            })
        }),
        getPayPalClientId:builder.query({
            query:()=>({
                url:PAYPAL_URL,
            }),
            keepUnusedDataFor:5
        }),
        getMyOrders:builder.query({
            query:()=>({
                url:`${ORDERS_URL}/myorders`,
            }),
            keepUnusedDataFor:5
        }),
        getAllOrders:builder.query({
            query:()=>({
                url:`${ORDERS_URL}`,
            }),
            keepUnusedDataFor:5
        }),
        deliverOrder:builder.mutation({
            query : (orderId)=>({
                url:`${ORDERS_URL}/${orderId}/delivered`,
                method:'PUT',
            })
        }),
    })
});

export const {useCreateOrderMutation,
        useGetOrderByIdQuery,
        useGetPayPalClientIdQuery,
        usePayOrderByIdMutation,
        useGetMyOrdersQuery,
        useGetAllOrdersQuery,
        useDeliverOrderMutation
} = orderApiSlice;