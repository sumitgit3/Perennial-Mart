import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "./cartUtils";

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] , shippingAddress:{},paymentMethod:'Paypal' };



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            // Check if item exists in cart
            const itemExist = state.cartItems.find((product) => product._id === item._id);

            if (itemExist) {
                // Update the existing item's quantity or properties
                state.cartItems = state.cartItems.map((product) =>
                    product._id === item._id ? item : product
                );
            } else {
                // Add the new item to the cart
                state.cartItems.push(item);
            }
            updateCart(state);
        },
        removeFromCart : (state,action)=> {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((product)=>product._id !== id);
            updateCart(state);
        },
        saveShippingAddress : (state,action)=>{
            state.shippingAddress = action.payload;
            updateCart(state);
        },
        savePaymentMethod : (state,action)=>{
            state.paymentMethod = action.payload;
            updateCart(state);
        },
        clearCartItems : (state,action)=>{
            state.cartItems = [];
            updateCart(state);
        }
        
    },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
