import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action) => {
            console.log(state.products);
            console.log(action.payload);
            state.quantity +=  1;
            // state.quantity = 0;
            console.log(action.payload.price);
            console.log(action.payload.quantity);
            state.total  += Number(action.payload.price) * Number(action.payload.quantity);
            state.products.push(action.payload);
            // console.log(state.total);
            // state.products = [];
            // state.total = 0;
            console.log(state.products);
            
        },

        updateCart:(state,action) => {
            // console.log(state);
            // console.log(action.payload);
            state.products = action.payload.products;
            state.quantity = action.payload.quantity;
            if(action.payload.total < 0){
                state.total = 0;
            }else{
                state.total = action.payload.total;
            }
        },

        increment:(state,action) => {
            console.log(state);
            console.log(action.payload);
            let index = action.payload.products.findIndex((item) => {
                return (item._id === action.payload.ID);
            });
            console.log(index);

            let prod = Number(action.payload.products[index].quantity) + 1;
            let response = [...action.payload.products];
            console.log(response[index]);
            let newSlice = response.map((item,indx) => {
                let newitem = {...item};
                if(index === indx){
                    newitem.quantity = prod;
                }
                return newitem;
            });
            console.log(newSlice);
            state.products = newSlice;
            state.quantity = Number(action.payload.quantity);
            state.total = Number(action.payload.total) + Number(action.payload.products[index].price);
            
        },
        decrement:(state,action) => {
            let index = action.payload.products.findIndex((item) => {
                return (item._id === action.payload.ID);
            });
            let prod = action.payload.products[index].quantity - 1;
            let Price = Number(action.payload.products[index].price);
            let response = [...action.payload.products];
            console.log(response);
            if(prod !== 0){
                let newSlice = response.map((item,indx) => {
                    let newitem = {...item};
                    if(indx === index){
                        newitem.quantity = prod;
                    }
                    return newitem;
                });
                console.log(newSlice);
                state.products = newSlice;
                state.quantity = Number(action.payload.quantity);
            }else{
                let new_state = response.filter((item,indx) => {
                    if(indx !== index){
                        return item;
                    }
                });
                if(new_state === undefined){
                    state.products = [];
                    state.quantity = action.payload.quantity - 1;
                }else{
                    state.products = new_state;
                    state.quantity = action.payload.quantity - 1;

                }
            }
            state.total = Number(state.total) - Number(Price);
        },

        deleteproduct:(state,action) => {
            let index = action.payload.products.findIndex((item) => {
                return (item._id === action.payload.ID);
            });
            let Price = Number(action.payload.products[index].price);
            let Quantity = Number(action.payload.products[index].quantity);
            let response = [...action.payload.products];
            let new_state = response.filter((item,indx) => {
                if(indx !== index){
                    return item;
                }
            });

            state.products = new_state;
            state.quantity = action.payload.quantity;
            state.total = Number(action.payload.total) - (Quantity*Price);
        },

        updateproduct:(state,action) => {
            let index = action.payload.products.findIndex((item) => {
                return (item._id === action.payload.ID);
            });
            let Price = Number(action.payload.products[index].price);
            let Quantity = Number(action.payload.products[index].quantity);
            let response = [...action.payload.products];
            let new_state = response.map((item,indx) => {
                let newItem = {...item};
                if(indx === index){
                    newItem.price = Number(action.payload.price);
                    console.log(newItem.price);
                    newItem.color = action.payload.color;
                    newItem.inStock = action.payload.inStock;
                    newItem.size = action.payload.size;
                }
                return newItem;
            });

            let newPrice = Number(action.payload.price);
            state.products = new_state;
            state.quantity = action.payload.quantity;
            state.total = Number(action.payload.total) - (Price * Quantity) + (newPrice * Quantity);
        }
    }
});

export const { addProduct,updateCart,increment,decrement,deleteproduct,updateproduct } = cartSlice.actions;
export default cartSlice.reducer;
