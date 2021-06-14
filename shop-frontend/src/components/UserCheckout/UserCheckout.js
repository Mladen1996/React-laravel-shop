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

const Heading=styled.h1`
text-align:center;
`;

function UserCheckout() {

    const [data, setData] = useState([]);
    const [total,setTotal]=useState(0);

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [address,setAddress]=useState("");
    const [postalCode,setPostalCode]=useState("");
    const [city,setCity]=useState("");
    const [note,setNote]=useState("");

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
    }, [total])

    function confirmTheOrder(){

        var today = new Date();

        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var currentDateTime=date+' '+time;

        const billingInformation={
            firstName:firstName,
            lastName:lastName,
            email:email,
            address:address,
            postalCode:postalCode,
            city:city,
            note:note
        }
        const orderData=[{
            items:data,
            totalPrice:total,
            dateAndTime:currentDateTime,
            billingInformation:billingInformation
        }];

        if(localStorage.getItem('order-history')){
            const items=JSON.parse(localStorage.getItem('order-history'));
            const itemData1={
                items:data,
                totalPrice:total,
                dateAndTime:currentDateTime,
                billingInformation:billingInformation
            };
            console.log(items);
            items.push(itemData1);
            localStorage.setItem('order-history',JSON.stringify(items));
        }
        else{
            localStorage.setItem('order-history',JSON.stringify(orderData));
        }
    }
    

    return (
        <>
            <Heading>User Checkout</Heading>
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
                                    <td>{item.price} RSD</td>
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

                    <input type="text" placeholder="First name" onChange={(e)=>setFirstName(e.target.value)}/>
                    <br />
                    <input type="text" placeholder="Last name"  onChange={(e)=>setLastName(e.target.value)}/>
                    <br />
                    <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <br />
                    <input type="text" placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
                    <br />
                    <input type="text" placeholder="Postal code" onChange={(e)=>setPostalCode(e.target.value)}/>
                    <br />
                    <input type="text" placeholder="City" onChange={(e)=>setCity(e.target.value)}/>
                    <br />
                    <input type="text" placeholder="Note" onChange={(e)=>setNote(e.target.value)}/>
                    <br />

                    <button className="btn btn-primary"  onClick={confirmTheOrder}>Confirm the order</button>
                </BillingContainer>
            
        </>
    )
}

export default UserCheckout;