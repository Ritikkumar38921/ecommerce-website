import React, { useState } from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import {publicRequest} from "../requestMethods";
import {login} from "../redux/apiCalls";
import {useDispatch} from "react-redux";

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
    background-color:white;
    ${mobile({ width : "75%" })}

`;

const Title = styled.h1`
    font-size:24px;
    font-weight:300;
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
    background-color:teal;
    color:white;
    cursor:pointer;
`;


const Register = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    let dispatch = useDispatch();

    const registerUser = async (e) => {
        e.preventDefault();
        try{
            // console.log(username);
            // console.log(password);
            // console.log(email);
            let res = await publicRequest.post("/auth/register",{username,email,password});
            // console.log(res);
            // console.log("user rsign up successfully registered");
            // console.log(res.data);
            localStorage.setItem('userId',JSON.stringify(res.data._id));
            // console.log(res);
            login(dispatch,{username,password});
            window.location.href = "https://ritik-ecommerce-website.herokuapp.com/";
           
        }catch(err){
            window.location.href = "https://ritik-ecommerce-website.herokuapp.com/";
            // console.log("there exist an error........");
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>Create An Account</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="email"  onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <Input placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Agreement>
                            By creating an account, I consent to the processing of my personal
                            data in accordance with the <b>Privacy Policy</b>
                    </Agreement>
                    <Button onClick={registerUser}>Create</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register;