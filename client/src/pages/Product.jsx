import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove ,DeleteForever} from "@material-ui/icons";
import {mobile} from "../responsive";
import { useParams } from "react-router-dom";
import {publicRequest,userRequest} from "../requestMethods";
import {useDispatch, useSelector} from "react-redux";
import { addProduct } from "../redux/cartRedux";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
    padding:50px;
    display:flex;
    ${mobile({padding:'10px',flexDirection:'column'})}
    
`;

const ImgContainer = styled.div`
    flex:1;
`;

const Image = styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({height:'40vh'})}

`;

const InfoContainer = styled.div`
    flex:1;
    padding:0px 50px;
    ${mobile({padding : '10px'})}

`;

const Title = styled.h1`
    font-weight:200;
`;

const Desc = styled.p`
    margin:20px 0px;
`;

const Price = styled.span`
    font-weight:100;
    font-size:40px;
`;

const FilterContainer = styled.div`
    width:50%;
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    ${mobile({width : "100%"})}

`;

const Filter = styled.div`
    display:flex;align-items:center;
`;

const FilterTitle = styled.span`
    font-size:20px;
    font-weight:200;
`;

const FilterColor = styled.div`
    width:20px;height:20px;border-radius:50%;background-color:${props => props.color};
    margin:0px 5px;
    cursor:pointer;
`;

const FilterSize = styled.select`
    margin-left:10px;
    padding:5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width:50%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    ${mobile({width : "100%"})}

`;

const AmountContainer = styled.div`
    display:flex;
    align-items:center;
    font-weight:700;
`;

const Amount = styled.span`
    width:30px;
    height:30px;border-radius:10px;
    border:1px solid teal;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0px 5px;
`;

const Button = styled.button`
    padding:15px;
    border:2px solid teal;
    background-color:white;
    cursor:pointer;
    font-weight:500;

    &:hover{
        background-color:#f8f4f4;
    }
`;

const Product = () => {
    let {id} = useParams();
    // console.log(id);
    // console.log("hey");
    let cart = useSelector((state) => state.cart);
    const [product,setProduct] = useState({});
    const [quantity,setQuantity] = useState(1);
    const [color,setColor] = useState("");
    const [s,setSize] = useState("");
    let dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async() => {
            try {
                // console.log("hey ritik are you learning the web development");
        
                
               
                
                // window.location.href = "http://localhost:3000/"
                var prod = await publicRequest.get(`products/find/${id}`);
                // console.log(prod);
               setProduct(prod.data);
            } catch (error) {
                window.location.href = "https://ritik-ecommerce-website.herokuapp.com/";
                // console.log(error); 
            }
        }

        getProduct();

    },[id]);

    // console.log(product);

    const handleQuantity = (type) => {
        if(type === "dec"){
            setQuantity((prev) => {
                if(prev > 1){
                    return prev - 1;
                }else{
                    return prev;
                }
            })
        }else{
            setQuantity((prev) => {
                return (prev + 1);
            })
        }
    }

    const handleClick = async(e) => {
        // console.log("hello ");
        dispatch(addProduct({...product,quantity,color,size:s}));

    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                {/* "https://th.bing.com/th/id/OIP.SuxQ56eYHb9SiaArITanZAHaG_?pid=ImgDet&rs=1" */}
                    {/* <Image src={product.img || ""}/> */}
                    {product.img &&  product.img.startsWith("http") && <Image src={product.img }/>}
            {product.img && !product.img.startsWith("http") && <Image src={`https://ritik-ecommerce-website.herokuapp.com/${product.img}`} />}
                </ImgContainer>
                <InfoContainer>
                    <Title>{product?.title || "cloths"}</Title>
                    <Desc>{product?.desc || "cloth"}</Desc>
                    <Price>$ {product.price || "0"}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {
                                product.color?.map((col,index) => (
                                    <FilterColor color={col} key={index} onClick={()=> setColor(col)}/>
                                ))
                            }
                            {/* <FilterColor color="black"/>
                            <FilterColor color="darkblue"/>
                            <FilterColor color="gray"/> */}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize>
                                {
                                    product.size?.map((sz,index) => (
                                        <FilterSizeOption key={index} onClick={() => setSize((prev)=>sz)}>{sz}</FilterSizeOption>
                                    ))
                                }
                                {/* <FilterSizeOption>XS</FilterSizeOption>
                                <FilterSizeOption>S</FilterSizeOption>
                                <FilterSizeOption>M</FilterSizeOption>
                                <FilterSizeOption>L</FilterSizeOption>
                                <FilterSizeOption>XL</FilterSizeOption> */}
                            </FilterSize>
                        </Filter>
                        <Filter></Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove style={{cursor:"pointer"}} onClick={() => handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <Add style={{cursor:"pointer"}} onClick={() => handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>Add To Cart</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            {/* <div style={{padding:"14px",width:"100%",display:"flex"}}>
                <DeleteForever style={{flex:"1",display:"flex",justifyContent:"center",position:"absolute",top:"50%",margin:"0px 6px",right:"0",alignItems:"center",fontSize:"35px",color:"red",cursor:"pointer"}} onClick={deleteProduct}/>
            </div> */}
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default Product;