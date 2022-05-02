import React, { useState } from "react";
import styled from "styled-components";
import {mobile} from "../../responsive";
import { useParams } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import {useSelector,useDispatch} from "react-redux";
import {updateproduct} from "../../redux/cartRedux";

const Container = styled.div`
    width:100vw; 
    height:100vh;
    background:linear-gradient(rgba(255,255,255,0.5)) url() center;
    background-color:aliceblue;
    background-size:cover;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const Wrapper = styled.div`
    width:40%;
    padding:20px;
    background-color:green;
    ${mobile({ width : "75%" })}

`;

const Title = styled.h1`
    font-size:24px;
    font-weight:300;
    color:white;
    font-weight:650;
    text-align:center;
`;

const Form = styled.form`
    display:flex;
    flex-wrap:wrap;
`;


const Input = styled.input`
    flex:1;
    min-width:40%;
    margin:20px 10px 0px 0px;
    padding:10px;
`;

const Agreement = styled.span`
    font-size:12px;
    margin:20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border:none;
    padding:15px 20px;
    background-color:blue;
    color:white;
    cursor:pointer;
    margin-top:11px;
    
`;

// categories:{type:Array},
//     size:{type:Array},
//     color:{type:Array},
//     price:{type:Number,required:true},
//     inStock:{type:Boolean,default:true}


const UpdateProduct = () => {
    let {id} = useParams();
    let dispatch = useDispatch();
    let cart = useSelector((state) => state.cart);
    console.log(id);
    const [size,setSize] = useState("");
    const [color,setColor] = useState('');
    const [inStock,setInStock] = useState('');
    const [price,setPrice] = useState(0);

    const update = async(e) => {
        e.preventDefault();
        try{
            let up_prod = await userRequest.put(`products/${id}`,{size,color,inStock,price});
            console.log(up_prod);
            let newArray = [...cart.products];
            dispatch(updateproduct({products:newArray,quantity:cart.quantity,total:cart.total,ID:id,price:price}));
            
        }catch(err){
            console.log("something went wrong while updating the product by admin");
            console.log(err);
        }
        window.location.href = "https://ritik-ecommerce-website.herokuapp.com/";
    }

    return (
    <Container>
    <Wrapper>
        <Title>Update Product</Title>
        <Form>
            <Input placeholder="size" onChange={(e) => setSize(e.target.value)}/>
            <Input placeholder="color" onChange={(e) => setColor(e.target.value)} />
            <Input placeholder="inStock" onChange={(e) => setInStock(e.target.value)}/>
            <Input placeholder="price" onChange={(e) => setPrice(e.target.value)} />
            <div style={{textAlign:"center",width: "100%"}}>
                <Button onClick={update}>Update Product</Button>
            </div>
        </Form>
    </Wrapper>
    </Container>
)};

export default UpdateProduct;