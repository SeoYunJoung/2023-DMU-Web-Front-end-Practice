import React, {useState, useEffect} from "react";
import styled from 'styled-components';

const Selection = styled.select`
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    margin-top: 10px;
`

function SelectBox(props){

    //const [selected, setSelected] = useState();
    const handleSelect = (e) => {
        //setSelected(e.target.value);
        props.setTagData(e.target.value); //부모에게 데이터 넘기기
      };

    const{tags} = props;

    return(
        <Selection onChange={handleSelect}>
            {tags.map((tag, index)=>{
                return(
                    <option key={index} value={tag}>{tag}</option>
                )
            })}
        </Selection>
    );
}

export default SelectBox;