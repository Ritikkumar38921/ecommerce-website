import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import {Badge} from "@material-ui/core";
import React from 'react';
import styled from 'styled-components';
import {mobile,smallmobile} from "../responsive";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Container = styled.div`
    height:60px;
    background-color:gray;
    color:white;
    ${mobile({ height : "50px" })}
`

const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content:space-between;
    ${mobile({ padding : "3px 0px",alignItems:"center" })}

`

const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    `

const Language = styled.span`
    font-size:14px;
    cursor:pointer;
    ${mobile({ display : "none" })}

`

const SearchContainer = styled.div`
    border:0.5px solid gray;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding:5px;
`

const Input = styled.input`
    border:none;
    outline:none;
    font-size:18px;
    ${mobile({ width:"40px" })}

`





const Center = styled.div`
    flex:1;
    text-align:center;
`;

const Logo = styled.h1`
    font-weight:bold;
    cursor:pointer;
    ${mobile({ fontSize : "17px" })}

`

const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    ${mobile({flex:4, justifyContent:"center",padding:"0px 12px"})}

`
const Div = styled.div`
    margin-left:0px;
    display:flex;
    justify-content:center;
    align-items:center;
    
`;

const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    text-decoration:none;
    color:white;
    margin:0px 1px;
    ${mobile({ fontSize : "12px", marginLeft:"10px" })}
    
`



const Navbar = () => {
    let quantity = useSelector(state => state.cart.quantity);
    let isAdmin = useSelector(state => state.user.currentUser.isAdmin);
    // console.log(isAdmin);
    // console.log()
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search'/> 
                        <Search style={{color:"black",cursor:"pointer",marginLeft:"2px",fontSize:"22px"}}/>
                    </SearchContainer>
                </Left>
                <Center><Logo>Ecommerce</Logo></Center>
                <Right>
                    <Div>
                        { isAdmin && <Link to={`/admin/createpost`}><MenuItem >Createpost</MenuItem></Link>}
                        <Link to={"/login"}><MenuItem>Sign In</MenuItem></Link>
                    </Div>
                    <Div>
                        <Link to={"/cart"}>
                        <MenuItem>
                                <Badge badgeContent={quantity} color="primary"  >
                                    <ShoppingCartOutlined style={{cursor:"pointer"}}/>
                                </Badge>
                        </MenuItem>
                        </Link>
                    </Div>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;