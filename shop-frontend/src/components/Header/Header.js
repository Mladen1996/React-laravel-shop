import React,{useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';


const Container=styled.div` 
background-color:#00a1f1;
display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10%;
`;
const Logo=styled.div` 
h1{
    color:white;
}
a{
    text-decoration:none;
}
`;
const Nav=styled.div` 
display:flex;
align-items:center;
a{
    text-decoration: none;
    padding: 15px;
    color: white;
}
span{
    background-color: black;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    vertical-align: top;
    margin-left: 2px;
}
`;


function Header(props){

    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem('product-info'));
        if(products!=null){
            setTotalItems(products.length);
        }
        else{
            setTotalItems(0);
        }

    }, [totalItems])

    return(
        <Container>
        <Logo>
            <NavLink to="/">
            <h1>Shoe store</h1>
            </NavLink>
        </Logo>
        <Nav>
        <NavLink to="/">Home</NavLink>
        
        <NavLink to="/order-history">Order history</NavLink>

        <NavLink to="/user-checkout">
            <img src="images/shopping-cart.png" alt="cart-icon"/>
            <span>{props.counter ? props.counter: totalItems}</span>
        </NavLink>
        </Nav>
        
        </Container>

    )
}

export default Header;