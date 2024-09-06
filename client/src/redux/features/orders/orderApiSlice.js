import apiSlice from "../api/apiSlice";
import { ORDERS_URL, PAYMENT_URL } from "../api/constants";

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
        createPaymentOrder:builder.mutation({
            query:(orderId)=>({
                url:`${PAYMENT_URL}/${orderId}`,
                method:'POST'
            })
        }),
        getRazorPayKeyId:builder.query({
            query:()=>({
                url:PAYMENT_URL,
            }),
            keepUnusedDataFor:5
        }),
        verifyPayment:builder.mutation({
            query:(data)=>({
                url:`${PAYMENT_URL}/verify`,
                method:'POST',
                body:data
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
        useDeliverOrderMutation,
        //razor pay
        useCreatePaymentOrderMutation,
        useGetRazorPayKeyIdQuery,
        useVerifyPaymentMutation
} = orderApiSlice;