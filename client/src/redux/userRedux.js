import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser : null,
        isFetching : false,
        error : false,
    },
    reducers : {
        loginStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess : (state,action) => {
            console.log(action.payload);
            state.isFetching = false;
            state.currentUser = action.payload;
            localStorage.setItem("userLogin",JSON.stringify(state.currentUser));
            window.location.href = "https://ritik-ecommerce-website.herokuapp.com/";
        },
        loginFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {loginStart,loginFailure,loginSuccess} = userSlice.actions;
export default userSlice.reducer;