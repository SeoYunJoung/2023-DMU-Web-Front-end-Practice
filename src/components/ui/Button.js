import React from "react";
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 20px 16px;
    font-size: 20px;
    border-width 0px;
    border-radious: 8px;
    cursor: pointer;
    background: black;
    color: #fff;
    width: 100%;
    margin-bottom: 30px;
`

function Button(props){
    const {title, onClick} = props;

    return(
        <StyledButton onClick={onClick}>{title || '주문하기'}</StyledButton>
    );
}

export default Button;