import React, { useState } from "react";
import styled from "styled-components";
import {mobile} from "../../responsive";
import {userRequest,BASE_URL} from "../../requestMethods";
import {useDispatch} from "react-redux";
import {create} from "../../redux/apiCalls"

const Container = styled.div`
    width:100vw; 
    height:100vh;
    background:linear-gradient(rgba(255,255,255,0.5)) url() center;
    background-size:cover;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const Wrapper = styled.div`
    width:40%;
    padding:20px;
    background-color:skyblue;
    ${mobile({ width : "75%" })}
    border-radius:10px;
`;

const Title = styled.h1`
    font-size:24px;
    font-weight:600;
    text-align:center;
    color:red;

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
    font-size:${props => props.name === "myfile" && "18px"};
    cursor:${props => props.name === "myfile" && "pointer"};
`;

const Agreement = styled.span`
    font-size:12px;
    margin:20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
`;


const CreatePost = () => {
    let dispatch = useDispatch();
    let [file,setFile] = useState("");
    let [title,setTitle] = useState('');
    let [desc,setDesc] = useState('');
    let [categories,setCategories] = useState('');
    let [size,setSize] = useState('');
    let [color,setColor] = useState('');
    let[price,setPrice] = useState(0);
    let [inStock,setInStock] = useState('true');
  
    const handleClick = (e) => {
        e.preventDefault();
        const fdata = document.querySelector("#form");
    
        // let product = {file:file.name,title,desc,categories,size,color,price,inStock};
        // console.log(product.file);
        // console.log(product.inStock);

        let formdata = new FormData(fdata);

        create(formdata);
        window.location.href = "https://ritik-ecommerce-website.herokuapp.com/";
        
    }

    return (
        <Container>
            <Wrapper>
                <Title>Create Post</Title>
                <form id="form" name="Form"  encType="multipart/form-data" style={{display:"flex",flexWrap:"wrap"}} onSubmit={handleClick}>
                    <Input type={"file"} placeholder="choose a image" name={"myfile"} onChange={(e) => setFile(e.target.files[0].name)}></Input>
                    <Input placeholder="description" name="desc" onChange={(e) => setDesc(e.target.value)} />
                    <Input placeholder="title" name="title" onChange={(e) => setTitle(e.target.value)}></Input>
                    <select name="categories" style={{flex:"1",minWidth:"40%",margin:"20px 10px 0px 0px",padding:"10px"}} onChange={(e) => setCategories(e.target.value)}>
                        <option value={"jeans"}>jeans</option>
                        <option value={"coat"}>coat</option>
                        <option value={"women"}>women</option>
                    </select>
                    <select name="size" style={{flex:"1",minWidth:"40%",margin:"20px 10px 0px 0px",padding:"10px"}} onChange={(e) => setSize(e.target.value)}>
                        <option value={"XS"}>Small</option>
                        <option value={"M"}>Medium</option>
                        <option value={"XL"}>Large</option>
                    </select>
                    <Input placeholder="color split by space" name="color" onChange={(e) => setColor(e.target.value)}></Input>
                    <Input placeholder="price" name="price" onChange={(e) => setPrice(e.target.value)}></Input>
                    <select name="inStock" style={{flex:"1",minWidth:"40%",margin:"20px 10px 0px 0px",padding:"10px"}}  onChange={(e) => setInStock(e.target.value)}>
                        <option value={"true"}>true</option>
                        <option value={"false"}>false</option>
                    </select>
                    <div style={{display:"block",width:"100%",textAlign:"center",margin:"5px 0px"}}>
                        <button type="submit" style={{width:"100%" ,padding:"5px",backgroundColor:"blue",fontWeight:"600",color:"white",fontSize:"28px",cursor:"pointer"}}>Create Post</button>
                    </div>
                </form>
            </Wrapper>
        </Container>
    )
}

export default CreatePost;