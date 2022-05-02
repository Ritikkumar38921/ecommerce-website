import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {popularProducts} from "../data";
import Product from "./Product";
import {Link, useParams} from "react-router-dom";
import {publicRequest,userRequest} from "../requestMethods";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import {deleteproduct} from "../redux/cartRedux";

const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
`

const Products = ({cat,filters,sort}) => {
    let cart = useSelector((state) => state.cart);
    let dispatch = useDispatch();
    let isAdmin = useSelector((state) => state.user.currentUser.isAdmin);
    const [products,setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts] = useState([]);

    useEffect(()=>{
        const getProducts = async() => {
            try{
                let res = (cat) ? await publicRequest.get(`products?category=${cat}`) : await publicRequest.get(`products/`);
                setProducts((prev) => [...res.data])
            }catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[])

    // console.log(products);
   
    useEffect(()=> {
   
        cat && setFilteredProducts(products.filter((product) => Object.entries(filters).every(([key,value]) => { product[key].includes(value)})));
   
    },[cat,filters,products]);

    // console.log(filteredProducts);
    useEffect(()=>{
        if(sort === "newest"){
            setFilteredProducts((prev) => [...prev].sort((a,b)=> (a.createdAt - b.createdAt)));
        }else if(sort === 'asc'){
            setFilteredProducts((prev) => [...prev].sort((a,b) => (a.price - b.price)));
        }else{
            setFilteredProducts((prev) => [...prev].sort((a,b) => (b.price - a.price)));

        }
    },[sort]);

    const deleteProduct = async(e,ID) => {
        // console.log("ID : ",ID);
        // console.log(e.target);
        try {
            let p = await userRequest.delete(`products/${ID}`);
            console.log("you successfully delete the product from the database");
            let newArray = [...cart.products];
            dispatch(deleteproduct({ID:ID,products:newArray,quantity:cart.quantity - 1,total:cart.total}));
            
        } catch (error) {
            console.log("you are not able to delete the products .");
            console.log(error);
        }
        window.location.href = "https://ritik-ecommerce-website.herokuapp.com/";
    }

    // console.log(products);
    // console.log(filteredProducts);
    return (
        <Container>
            {  cat ? 
                filteredProducts.map((item) => ( <div key={item._id}>
                <Product key={item._id} item={item}/>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Link to={`/admin/update/${item._id}`}>
                        <button style={{color:"white",backgroundColor:"yellow",padding:"10px",fontWeight:"600",cursor:"pointer",width:"65px",marginRight:"7px"}}>Edit</button>
                    </Link>
                    <button style={{color:"white",backgroundColor:"red",padding:"10px",fontWeight:"600",cursor:"pointer",width:"65px",marginRight:"7px"}} onClick={(e) => deleteProduct(e,item._id)}>Delete</button>
                </div>
                 </div>
                )): products.slice(0,11).map((item) => (<div key={item._id}>
                <Product key={item._id} item={item} />
                {/* {console.log(item._id)} */}
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    { isAdmin && <Link to={`/admin/update/${item._id}`}>
                            <button style={{color:"white",backgroundColor:"yellow",padding:"10px",fontWeight:"600",cursor:"pointer",width:"65px",marginRight:"7px"}}>Edit</button>
                        </Link>
                    }
                    {isAdmin && <button style={{color:"white",backgroundColor:"red",padding:"10px",fontWeight:"600",cursor:"pointer",width:"65px",marginRight:"7px"}} id={`${item.id}`} onClick={(e) => deleteProduct(e,item._id)}>Delete</button>}
                 
                </div>
                </div>
                ))
                
            }
        </Container>
    )
}

export default Products;