import React,{useState,useEffect} from 'react';
import styled from 'styled-components';

const Container=styled.div` 
display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5% 10%;

img{
    width:100%;
}
`;

const ProductCard=styled.div` 
padding-right:20px;
`;

const CartButton=styled.button` 
background-color:#00a1f1;
border: none;
padding: 12px;
color: white;
cursor:pointer;
`;

function ProductList(){
    const [data,setData]=useState([]);

    useEffect(()=>{
        getData();
    },[])

    async function getData(){
        let result=await fetch("http://localhost:8000/api/list");
        result=await result.json();
        setData(result);
    }

    function addToCart(item){
        console.log(item.name);
        const itemData=[{
            name:item.name,
            price:item.price,
            image_path:item.image_path,
        }];

        if(localStorage.getItem('product-info')){
            const items=JSON.parse(localStorage.getItem('product-info'));
            const itemData1={
                name:item.name,
                price:item.price,
                image_path:item.image_path,
            };
            console.log(items);
            items.push(itemData1);
            localStorage.setItem('product-info',JSON.stringify(items));
        }
        else{
            localStorage.setItem('product-info',JSON.stringify(itemData));
        }
        
    }

    return(
        <Container>
        {
            data.map((item)=>
            <ProductCard key={item.id}>
                <img src={'http://localhost:8000/'+item.image_path} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price} RSD</p>
                 <CartButton onClick={()=>addToCart(item)}>Add to cart</CartButton>
            </ProductCard>
         
            )
        }
        </Container>
    )
}

export default ProductList;