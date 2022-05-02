import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Add, Remove, StayPrimaryPortraitRounded,DeleteForever } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import {updateCart , increment, decrement} from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest, userRequest,stripeRequest } from "../requestMethods";
import {Navigate,Link} from "react-router-dom";
import {addOrder} from "../redux/ordersRedux";
import axios from "axios";

let Key = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
    padding:20px;
    ${mobile({padding : "10px"})}
`;

const Title = styled.h1`
    font-weight:300;text-align:center;
`;

const Top = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
`;

const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    min-width:10%;
    border:${props => props.type === "filled" && "none"};
    background-color:${props => props.type === "filled" ? "black" : "transparent"};
    color:${props => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({display : "none"})}
`;
const TopText = styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;
`;

// const Button = styled.div`
//     display:flex;
//     justify-content:space-between;
// `;

const Info = styled.div`
    flex:3;
`;

const Product = styled.div`
    display:flex;
    flex:3,
    justify-content:space-between;
    alignItems:center;
    ${mobile({ flexDirection : "column" })}

`;
const ProductDetail = styled.div`
    flex:2;
    display:flex;
    width:200px;
    ${mobile({width:"300px"})}

`;
const Image = styled.img`
    width:22%;
    ${mobile({width:"50%"})}
`;
const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;
const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color: ${props => props.color}
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex:1;display:flex;flex-direction:column;
    align-items:center;justify-content:center;

`

const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;
`;

const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({ margin : "5px 15px" })}

`;

const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
    ${mobile({ marginBottom : "20px" })}

`;

const Hr = styled.hr`
    background-color:#eee;
    border:none;
    height:1px;
`;

const Summary = styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:50vh;
`;

const SummaryTitle = styled.h1`
    font-weight:200;
`;
const SummaryItem = styled.div`
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    font-weight:${props => props.type === "total" && "500"};
    font-size:${props => props.type === "total" && "24px"}
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    font-weight:600;
`;


const Bottom = styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection : "column" })}
`;

const Cart = () => {
    var ele;
    let dispatch = useDispatch();
    const [Data,setData] = useState({});
    let cart = useSelector(state => state.cart);
    // console.log(cart);
    // const [stripeToken,setStripeToken] = useState(null);

    const onToken = (token) => {
        // console.log("Token : " , token);
        const body = {
            token,
            product : {amount : cart.total},
        }

        const headers = {
            "Content-Type" : "application/json"
        }

        return fetch(`https://ritik-ecommerce-website.herokuapp.com/api/payment`,{
            method : "POST",
            headers,
            body : JSON.stringify(body)
        }).then((response) => {
            let newObj = {...cart};
            // console.log(newObj);
            // console.log("success");
            console.log(response)
            dispatch(addOrder(newObj));
        }).catch((err) => window.location.href = "https://ritik-ecommerce-website.herokuapp.com/");

        
    }

    // useEffect(()=>{
    //     const makeRequest = async() => {
    //         console.log("hey ritik");
    //         try {
    //             console.log("rajat");
    //             console.log(cart.total)

    //             fetch('')


    //             const res = await axios.post("http://localhost:3003/api/checkout/payment",{
    //                 token:stripeToken,
    //                 product:{amount : cart.total},
    //             },{
    //                 headers:{Authorization: `Bearer ${process.env.REACT_APP_STRIPE}`,
    //             password:"7876008092"
    //             }
    //             });
    //             let values = {...cart};
    //             console.log(values);
    //             console.log("awesome");
    //             // console.log();
    //             // dispatch(addOrder({}))

    //         } catch (error) {
    //             console.log("error occur in makeRequest");
    //             console.log(error);
    //         }
    //     }
    //     if(stripeToken !== null)
    //         makeRequest();
    // },[stripeToken]);
   

    const deleteProduct = (e,ID) => {
        // console.log(ID);
        let total = 0;

        let newState = cart.products.filter((item) => {
            if(item._id === ID){
                console.log(item.price);
                console.log(item.quantity);
                total = Number(item.price) * Number(item.quantity);
            }else{
                return item;
            }
        });
        // console.log(total);
        newState = {products:newState,quantity:cart.quantity - 1,total:Number(cart.total) - (total)};
        // console.log(newState);
        dispatch(updateCart(newState));
    }


  

    const handleChange = (type,ID) => {
        let total = 0;
        let newArray = [...cart.products];
        // console.log(newArray);

        // let newState = cart.products.filter((item) => {
        //     if(item._id === ID){
        //         console.log(item.price);
        //         console.log(item.quantity);
        //         total = Number(item.price);
        //         if(item.quantity === 1){
        //             console.log(item);
                    
        //             return item;
        //         }else{
        //             return item;
        //         }

                
        //     }else{
        //         console.log("1");
        //         return item;
        //     }
        // });

        // console.log(newState);
            
            if(type === "inc"){
                dispatch(increment({products:newArray,quantity:cart.quantity,total:cart.total,ID : ID}));
            }else{
                dispatch(decrement({products:newArray,quantity:cart.quantity,total:cart,total,ID:ID}));
            }
        }

        const goTOHomePage = () => {
            // console.log("go to home page" );
            window.location.href = "https://ritik-ecommerce-website.herokuapp.com/";
        }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>

                    <TopButton onClick={goTOHomePage}>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts>
                    <Link to={`/user/orders`}>
                        <TopButton type="filled">Orders</TopButton>
                    </Link>
                </Top>
                <Bottom>
                    <Info>
                        { cart.products.map((item,index) => (
                        <div style={{position:"relative"}} key={index}>  
                            <Product>
                                <ProductDetail>
                                    <Image src={item.img} />
                                    <Details>
                                        <ProductName><b>Product:</b> {item.title}</ProductName>
                                        <ProductId><b>ID:</b> {item._id}</ProductId>
                                        <ProductColor color={item.color} />
                                        <ProductSize><b>Size:</b> {item.size}</ProductSize>

                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add onClick={() => handleChange("inc",item._id)} style={{cursor:"pointer"}}/>
                                        <ProductAmount>{item.quantity}</ProductAmount>
                                        <Remove onClick={() => handleChange("dec",item._id)} style={{cursor:"pointer"}}/>
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        $ {item.price}
                                    </ProductPrice>
                                </PriceDetail>
                                <DeleteForever style={{flex:"1",display:"flex",justifyContent:"center",position:"absolute",top:"50%",margin:"0px 6px",right:"0",alignItems:"center",fontSize:"35px",color:"red",cursor:"pointer"}} onClick={(e) => deleteProduct(e,item._id)}/>
                            </Product> <Hr />
                        </div>
                    ))}
                        
                    </Info>
                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Lama Shop"
                            // image="https://avatars.githubusercontent.com/u/1486366?v=4</Summary>"
                            billingAddress
                            shippingAddress
                            description={`your total is ${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={Key}
                        >
                            <Button style={{cursor:"pointer"}}>Checkout Now</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )};

export default Cart;