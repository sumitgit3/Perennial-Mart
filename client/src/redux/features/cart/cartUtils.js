//Formats a given number to two decimal places and return as string
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state)=>{
    // Calculate prices
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty,0));
    state.shippingPrice = addDecimals(Number(state.itemsPrice) >= 500 ? 0 : 90);
    state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.18);
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    // Update local storage with the new state
    localStorage.setItem('cart', JSON.stringify(state));
}