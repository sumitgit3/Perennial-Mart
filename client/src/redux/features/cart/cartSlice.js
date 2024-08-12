import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "./cartUtils";

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };



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
                    product._id === item._id ? {...item,qty:item.qty+product.qty} : product
                );
            } else {
                // Add the new item to the cart
                state.cartItems.push(item);
            }
            updateCart(state);
        },
    },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
