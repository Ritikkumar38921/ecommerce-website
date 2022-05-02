import React from "react";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import {mobile} from "../responsive";
// import {RestoreFromTrash} from "@material-ui/icons"
import {deleteOrder} from "../redux/ordersRedux";
import {Link} from "react-router-dom"; 
import {publicRequest} from "../requestMethods";

const Image = styled.img`
    width:12%;
    ${mobile({width:"26%"})}
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

`;

const ProductDetail = styled.div`
    flex:3;
    display:flex;
    width:200px;
    ${mobile({width:"300px"})}

`;

const Orders = () => {
    let orders = useSelector((state) => state.orders);
    let dispatch = useDispatch();

    const deleteorder = (e,indx) => {
        dispatch(deleteOrder({index:indx}));
    }

    return <>
    <Link to={'/'} style={{}}>
        <button style={{padding:"10px",color:"white",backgroundColor:"red",borderRadius:"10px",cursor:"pointer",margin:"10px"}}>Home</button>
    </Link>
    <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{textAlign:"center",height:"60px",backgroundColor:"blue",color:"white" }}>
            <h1>Your Orders</h1>
        </div>
        <div style={{width:"100vw",height:"100%",overflowY:"scroll",scrollBehavior:"smooth"}}>
            {
               orders.products.length > 0 && orders.products.map((product,index) => {
                   return <div key={index} style={{backgroundColor:"aliceblue",padding:"50px",display:"flex",flexDirection:"column",marginBottom:"6px"}}>   
                                <div style={{textAlign:"end"}}>
                                    <button style={{color:"white",backgroundColor:"red",padding:"7px",borderRadius:"10px",cursor:"pointer"}} onClick={(e) => deleteorder(e,index)}>Delete Order</button>
                                </div>
                                {product.products.map((item,index) => (<div style={{display:"flex",justifyContent:"space-between"}} key={index}>
                                    <ProductDetail>
                                        <Image src={item.img} />
                                        <Details>
                                            <ProductName><b>Product:</b> {item.title}</ProductName>
                                            <ProductId><b>ID:</b> {item._id}</ProductId>
                                            <ProductColor color={item.color} />
                                            <ProductSize><b>Size:</b> {item.size}</ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    </div>
                                ))
                                // <div> </div>
                            }
                            <div style={{textAlign:"end"}}>
                                <div style={{fontSize:"23px",color:"green"}}>price : {product.total}</div>
                                <div style={{fontSize:"19px",color:"blue"}}>Quantity : {product.quantity}</div>
                            </div>
                   </div>
               })
            }
        </div>
    </div>
    </>
};

export default Orders;