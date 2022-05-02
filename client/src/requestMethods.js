import axios from "axios";


export const BASE_URL = "https://ritik-ecommerce-website.herokuapp.com/api";
const TokenSig = JSON.parse(localStorage.getItem("userLogin"));
let Token;
if(TokenSig === null){
    Token = undefined;
}else{
    Token = TokenSig.signature;
}
console.log("getting token from the localStorage ");

export const publicRequest = axios.create({
    baseURL:BASE_URL,
    
});


export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers:{ token : `Bearer ${Token}`}
});

export const stripeRequest = axios.create({
    baseURL:BASE_URL,
    headers:{'Authorization': `Bearer ${process.env.REACT_APP_STRIPE}`},
})

export const uploadImageReques = axios.create({
    baseURL : BASE_URL,
    headers:{ token : `Bearer ${Token}`,"Content-Type":"multipart/form-data"},

});

