import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo : localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
}
// keep the credentials in sync with local storage
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials : (state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
        },
        clearCredentials: (state,action)=>{
            state.userInfo = null;
            localStorage.clear('userInfo');
        }
    }
});

export default authSlice.reducer;
export const authActions = authSlice.actions;