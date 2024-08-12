import  {configureStore} from '@reduxjs/toolkit'
import apiSlice from '../features/api/apiSlice';
import cartReducer from '../features/cart/cartSlice.js'
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true 
})

export default store;