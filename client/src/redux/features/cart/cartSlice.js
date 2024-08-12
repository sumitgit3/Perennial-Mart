import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };

//Formats a given number to two decimal places and return as string
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

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

            // Calculate prices
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty,0));
            state.shippingPrice = addDecimals(Number(state.itemsPrice) >= 500 ? 0 : 90);
            state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.18);
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            // Update local storage with the new state
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
