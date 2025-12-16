import React, {useState, useEffect} from 'react';

import styled from 'styled-components';

import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import Button from '../ui/Button'

const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    
`;

const CartSession= styled.div`
    width: 90%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    margin-bottom: 50px;
`;



const PaySession= styled.div`

    width: 90%;
    background: white;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid grey;
    padding: 30px;
    
`;



const TitleText = styled.p`
    font-size: 27px;
    font-weight: 600;
    
`;

const DescriptionText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const StyledImage = styled.img`
	width: 300px;
    height: 300px;
    display: inline-block;
    
`;

function CartPage(){

    const {productId} = useParams();
    console.log(productId);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{

        const fetchData = async()=>{
            try {
                setError(null);
                setData(null);
                setLoading(true);
    
                const response = await axios.get(
                    `https://dummyjson.com/products/${productId}`
                );
                console.log(response);
                setData(response.data);
    
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    
       },[]);
       if(loading) return <div>로딩중...</div>
        if(error) return <div>에러가 발생했습니다</div>
        if(!data) return null;
  
    return(
        <Wrapper>
            <CartSession>
                       <StyledImage src={data.thumbnail}></StyledImage>
                    <div>
                       <TitleText>{data.title}</TitleText>
                       <DescriptionText>{data.description}</DescriptionText>
                       <DescriptionText>수량 : 1</DescriptionText>
                    </div>
        
            </CartSession>
            <PaySession>
                    <DescriptionText>총 상품 가격: {data.price}</DescriptionText>
                    <DescriptionText>배송비 : 무료</DescriptionText>
                    <TitleText>총 결제 금액: {data.price}</TitleText>
                    <Button title="결제 하기" onClick={()=>{navigate("/");}}></Button>
            </PaySession>
        </Wrapper>
    );
}


export default CartPage;