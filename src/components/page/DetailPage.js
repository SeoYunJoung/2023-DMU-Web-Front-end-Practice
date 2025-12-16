import React, {useState, useEffect} from 'react';

import styled from 'styled-components';

import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import Button from '../ui/Button';


const Wrapper = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;

    
`;

const DetailProductSession= styled.div`

    width: 40%;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const PrevNextProductSession= styled.div`

    width: 100%;
   
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
  
    
`;

const ButtonProductSession= styled.button`

    width: 20%;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
    text-align: center;
    cursor: pointer;
    
`;

const TitleText = styled.p`
    font-size: 27px;
    font-weight: 600;
    
`;

const DescriptionText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;
const Categorybanner = styled.p`
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
    padding: 10px;
    border: 2px solid black;
    border-radius: 8px;
    text-align: center;
`;

const StyledImage = styled.img`
	width: 700px;
    height: 700px;
    display: inline-block;
    
`;



function DetailPage(){

   const {productId} = useParams();
   const navigate = useNavigate();

   const [data, setData] = useState(null);
   const [next, setNext] = useState(null);
   const [before, setBefore] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const nextNum = Number(productId)+1;
   const beforeNum = Number(productId)-1;


   useEffect(()=>{

    const fetchData = async()=>{
        try {
            setError(null);
            setData(null);
            setLoading(true);

            const response = await axios.get(
                `https://dummyjson.com/products/${productId}`
            );

            const total = await axios.get(
                'https://dummyjson.com/products?limit=0');
            console.log("토탈"+total.data.total);
            
            
            console.log(nextNum);
            if(nextNum > total.data.total){
                setNext("다음 상품이 없습니다.");
            }else{
                const response2 = await axios.get(
                    `https://dummyjson.com/products/${nextNum}`
                );
                console.log(response2);
                setNext(response2.data.title);
            }

          
           
            if(beforeNum <= 0){
                setBefore("이전 상품이 없습니다.");
            }else{
                const response3 = await axios.get(
                    `https://dummyjson.com/products/${beforeNum}`
                );
                console.log(response3);
                setBefore(response3.data.title);
            }

            console.log(response);
            setData(response.data);

        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }
    fetchData();

   },[productId]);

   if(loading) return <div>로딩중...</div>
   if(error) return <div>에러가 발생했습니다</div>
   if(!data) return null;
   if(!next) console.log("next없음");
   if(!before) console.log("before없음");

  
        return(
      
            <Wrapper>
                <DetailProductSession>
                    <StyledImage src={data.thumbnail}></StyledImage>
                    <Categorybanner>{data.category}</Categorybanner>
                    <TitleText>{data.title}</TitleText>
                    <DescriptionText>{data.description}</DescriptionText>
                    <TitleText>{data.price}</TitleText>
                    <Button title="장바구니 담기" onClick={()=>{navigate(`/cart/${productId}`);}}></Button>
                </DetailProductSession>
                
                <PrevNextProductSession>
                    <ButtonProductSession onClick={()=>{if(before!="이전 상품이 없습니다.") navigate(`/detail/${beforeNum}`);}}>
                        <Categorybanner>PREV</Categorybanner>
                        <TitleText>{before}</TitleText>
                    </ButtonProductSession>
                    <ButtonProductSession onClick={()=>{if(next!="다음 상품이 없습니다.") navigate(`/detail/${nextNum}`);}}>
                        <Categorybanner>NEXT</Categorybanner>
                         <TitleText>{next}</TitleText>
                    </ButtonProductSession>
                </PrevNextProductSession>
                
            </Wrapper>
    
        );
    

    
}

export default DetailPage;