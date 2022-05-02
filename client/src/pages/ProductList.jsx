import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {mobile} from "../responsive";
import { useParams } from "react-router-dom";


const Container = styled.div``;

const Title = styled.h1`
    margin:20px;
`;

const FilterContainer = styled.div`
    display:flex; justify-content:space-between;
`;

const Filter = styled.div`
    margin:20px;
    ${mobile({margin:"0px 20px",display:"flex",flexDirection:"column"})}
`;

const FilterText = styled.span`
    font-size:20px;
    font-weight:600;
    margin-right:20px;
    ${mobile({marginRight : "0px"})}

`;

const Select = styled.select`
    padding:10px;
    margin-right:20px;
    ${mobile({margin : "10px 0px"})}

`;

const Option = styled.option``;

const ProductList = () => {
    const {category} = useParams();
    // console.log(category);
    let [filters,setFilters] = useState({});
    let [sort,setSort] = useState("newest");
    // console.log(filters);
    // console.log(sort);
    const handleFilters = (e) => {
        let value = e.target.value;
        setFilters((prev) => {
        return {...filters,[e.target.name]:value}});
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>{category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products: </FilterText>
                    <Select name={"color"} onChange={handleFilters}>
                        <Option defaultValue={"color"}>Color</Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select> 
                    <Select name={"size"} onChange={handleFilters}>
                        <Option defaultValue={"size"}>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>    
                        <Option>M</Option>    
                        <Option>L</Option>    
                        <Option>XL</Option>    

                    </Select>   
                </Filter>
                <Filter>
                    <FilterText>Sort Products: </FilterText>
                    <Select onChange={(e) => setSort((prev) => e.target.value)}>
                        <Option value={"newest"}>Newest</Option>
                        <Option value={"asc"}>Price (asc)</Option>
                        <Option value={"desc"}>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={category} filters={filters} sort={sort}/>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default ProductList;