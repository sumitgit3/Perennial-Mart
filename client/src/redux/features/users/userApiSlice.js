import apiSlice from "../api/apiSlice";
import { USERS_URL } from "../api/constants";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        //sending credentials too so mutation instead of query
        login:builder.mutation({                
            query:(data)=>({
                url :`${USERS_URL}/login`,
                method:'POST',
                body:data
            }),
        }),
        register:builder.mutation({                
            query:(data)=>({
                url :`${USERS_URL}`,
                method:'POST',
                body:data
            }),
        }),
        logout:builder.mutation({                
            query:(data)=>({
                url :`${USERS_URL}/logout`,
                method:'POST',
            }),
        }),
    })
});

export const {useLoginMutation,useLogoutMutation,useRegisterMutation} = userApiSlice;