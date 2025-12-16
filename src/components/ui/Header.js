import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
    background: black;
    color: #fff;
    height: 100px;
    margin-bottom: 50px;
    font-size: 30px;
    width: 100%;

    display: flex;
    flex-direaction: row;
    align-items: center;
    justify-content: space-around;
`

const MenuText = styled.span`
    color: #fff;
    font-weight: 600;
    display: inline-block;
    cursor: pointer;
`

function Header(){

    const navigate = useNavigate();


    return(
        <StyledHeader>
            <MenuText onClick={()=>{navigate("/");}}>HOME</MenuText>
            <MenuText onClick={()=>{navigate("/cart/1");}}>CART</MenuText>
        </StyledHeader>
    );
}

export default Header;