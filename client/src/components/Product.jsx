import React from "react";
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    transition:all 0.5s ease;
    position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.4);z-index:3;
    display:flex;align-items:center; justify-content:center;
`;

const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height:350px;
    display:flex;align-items:center;justify-content:center;
    background-color:#f5fbfd;
    background-color:white;
    position:relative;

    &:hover ${Info}{
        opacity:1;
    }

`

const Circle = styled.div`
    width:200px;
    height:200px;
    border-radius:50%;
    background-color:white;
    position:absolute;
`;
const Image = styled.img`
    height:75%;
    z-index:2;
`;

const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:10px;
    transition: all 0.5s ease;
    cursor:pointer;
    &:hover{
        background-color:white;
        transform: scale(1.1);
    }
`;

const favourite = (e) => {
    // console.log(e);
    e.target.style.color = "red";
    // e.target.style.backgroundColor = "red";
    // console.log(e.target);
}

// #e9f5f5
const Product = ({item}) => {
    return (<>
        <Container>
            <Circle/>
            { item.img.startsWith("http") && <Image src={item.img }/>}
            { !item.img.startsWith("http") && <Image src={`https://ritik-ecommerce-website.herokuapp.com/${item.img}`} />}
            <Info>
                <Icon>
                    <Link to={'/cart'}>
                        <ShoppingCartOutlined/>
                    </Link>
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined onClick={favourite}/>
                </Icon>
            </Info>
        </Container>
        
        </>
    )
}

export default Product;