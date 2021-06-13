import { useState, useEffect } from 'react';
import styled from 'styled-components';

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

function OrderHistory(){

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem('order-history'));
        setOrders(orders);
    }, [])


    return(
        <>
        <h1>Order history</h1>
        <Container>
            <ProductsTable>
            <thead>
                        <tr>
                            <td>Order id</td>
                            <td>Date and time</td>
                            <td>Items</td>
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
                                    <td>{order.totalPrice} RSD</td>
                                </tr>

                            )
                        }
                </tbody>
                
            </ProductsTable>
        </Container>       
 </>
    )
}

export default OrderHistory;