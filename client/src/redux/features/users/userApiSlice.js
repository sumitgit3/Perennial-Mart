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
    })
});

export const {useLoginMutation} = userApiSlice;