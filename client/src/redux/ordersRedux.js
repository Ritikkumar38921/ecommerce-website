import {createSlice} from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:"orders",

    initialState:{
        products:[],
    },

    reducers : {
        
        addOrder : (state,action) => {
            let obj = {...action.payload};
            console.log(obj);
            let newArray = [...state.products,obj];
            state.products = newArray;
        },

        deleteOrder : (state,action) => {
            let obj = [...state.products];
            let newArray = obj.filter((item,index) => {
                if(index !== action.payload.index){
                    return item;
                }
            });
            state.products = newArray;
        }
    }
});

export const {addOrder,deleteOrder} = orderSlice.actions;
export default orderSlice.reducer;