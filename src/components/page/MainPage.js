import React, {useState, useEffect} from "react";
import styled from 'styled-components';

import Header from '../ui/Header';
import ProductList from "../list/ProductList";
import SelectBox from "../ui/SelectBox";

import axios from 'axios';

import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

function MainPage(){

    const [data, setData] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tagData, setTagData] = useState("beauty"); //SelectBox의 태그 데이터 받기

    const navegate = useNavigate();
    

    useEffect(()=>{

        const fetchData=async()=>{
            try {
                setError(null);
                setLoading(true);

                const response = await axios.get(
                    'https://dummyjson.com/products?limit=0');
                const response2 = await axios.get(
                    'https://dummyjson.com/products/category-list');

                console.log(response.data.products);
                setData(response.data.products);
                console.log("태그 데이터",response2.data);
                setCategory(response2.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return null;
    
    return(
        <Wrapper>
            <Header></Header>
            <SelectBox tags={category}  setTagData={setTagData}></SelectBox>
            <ProductList products={data} tagData={tagData} 
                    onClickItem = {(item)=>{navegate(`/detail/${item.id}`)}}></ProductList>
        </Wrapper>
    );
}

export default MainPage;