import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';

const Container = styled.div` 
display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5% 10%;

img{
    width:100px;
}
`;

const ProductsTable = styled.table`
width:100%;
border-collapse: collapse;

td{
border: 1px solid #ddd;
  padding: 8px;
}

thead td, tfoot td:first-child{
    background-color:#00a1f1;
    color:white;
}

`;

const Heading=styled.h1`
text-align:center;
`;

function OrderHistory(){

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem('order-history'));
        setOrders(orders);
    }, [])


    return(
        <>
        <Header />
        <Heading>Order history</Heading>
        <Container>
            

            {
                orders!=null ?
                <ProductsTable>
                <thead>
                <tr>
                    <td>Order id</td>
                    <td>Date and time</td>
                    <td>Items</td>
                    <td>Delivery details</td>
                    <td>Total price</td>
                    
                </tr>
            </thead>
        <tbody>
        {           
                   
                    orders.map((order,index) =>
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{order.dateAndTime}</td>
                            <td>{
                                order.items.map((product)=>
                                    <p>{product.name} <span>{product.price} RSD</span></p>
                                )
                                
                                }</td>
                            <td>
                                <p>{ order.billingInformation.firstName}</p>
                                <p>{ order.billingInformation.lastName}</p>
                                <p>{ order.billingInformation.email}</p>
                                <p>{ order.billingInformation.postalCode}</p>
                                <p>{ order.billingInformation.city}</p>
                                <p>{ order.billingInformation.address}</p>
                                <p>{ order.billingInformation.note}</p>
                                
                            </td>
                            <td>{order.totalPrice} RSD</td>
                        </tr>

                    ) 
                }
        </tbody>  </ProductsTable> :
            <h3>No orders</h3>
            }
           
                
           
        </Container>       
 </>
    )
}

export default OrderHistory;