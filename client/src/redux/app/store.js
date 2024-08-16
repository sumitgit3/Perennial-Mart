import  {configureStore} from '@reduxjs/toolkit'
import apiSlice from '../features/api/apiSlice';
import cartReducer from '../features/cart/cartSlice.js'
import authReducer from '../features/users/authSlice.js'
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartReducer,
        auth : authReducer 
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true 
})

export default store;