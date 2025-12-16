import React from "react";
import styled from 'styled-components';
import ProductListItem from "./ProductListItem";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    align-items: stretch;
    align-content: space-around;
    justify-content: space-around;
`

function ProductList(props){

    const {products, onClickItem} = props;

    const lis = [];

    {products.map((product, index)=>{
        if(props.tagData == product.category){
            lis.push(<ProductListItem
                key={product.id}
                product={product}
                onClick={()=>{onClickItem(product)}}
                ></ProductListItem>)
        }
        
    })}

    return(
        <Wrapper>
            {lis}
        </Wrapper>
    );
}

export default ProductList;