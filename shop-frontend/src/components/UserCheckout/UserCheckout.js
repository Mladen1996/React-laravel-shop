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

const BillingContainer = styled.div`
padding: 5% 10%;

h2{
    text-align:center;
    margin-bottom:40px;
}
input{
    width:100%;
    height:40px;
    margin-bottom:15px;
}
`;

function UserCheckout() {

    const [data, setData] = useState([]);
    const [total,setTotal]=useState(0);

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem('product-info'));
        setData(products);
        var total=0;
        const totals=data.map((item)=>{
        total=total+parseInt(item.price);
        console.log('Total:'+total);
        return total;
        });

        console.log(totals);
        setTotal(total);
    }, [])

    

    return (
        <>
            <h1>UserCheckout</h1>
            <Container>
                <ProductsTable>
                    <thead>
                        <tr>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Price</td>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            data.map((item) =>
                                <tr key={item.id}>
                                    <td><img src={'http://localhost:8000/' + item.image_path} alt={item.name} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>

                            )
                        }


                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2"> Total </td>
                            <td>{total} RSD</td>
                        </tr>
                    </tfoot>

                </ProductsTable>
                </Container>
                
                <BillingContainer>
                    <h2>Billing information</h2>

                    <input type="text" placeholder="First name" />
                    <br />
                    <input type="text" placeholder="Last name"  />
                    <br />
                    <input type="text" placeholder="Email"/>
                    <br />
                    <input type="text" placeholder="Address"/>
                    <br />
                    <input type="text" placeholder="Postal code" />
                    <br />
                    <input type="text" placeholder="City" />
                    <br />
                    <input type="text" placeholder="Note" />
                    <br />

                    <button className="btn btn-primary">Confirm the order</button>
                </BillingContainer>
            
        </>
    )
}

export default UserCheckout;