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
        updateProfile:builder.mutation({                
            query:(data)=>({
                url :`${USERS_URL}/profile`,
                method:'PUT',
                body:data
            }),
        }),
        getAllUsers:builder.query({                
            query:()=>({
                url :USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
        deleteUser:builder.mutation({                
            query:(userId)=>({
                url :`${USERS_URL}/${userId}`,
                method:'DELETE',
            }),
            invalidatesTags : ['User']
        }),
        getUser:builder.query({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
                method:'GET',
            }),
            keepUnusedDataFor:5
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data.userId}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['User']
        })
    })
});

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateProfileMutation,useGetAllUsersQuery,useDeleteUserMutation,useGetUserQuery,useUpdateUserMutation} = userApiSlice;