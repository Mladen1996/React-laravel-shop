import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import {useHistory} from 'react-router-dom';

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
    padding:5px;
}

.button-group{
    text-align:center;
}
`;

const Heading=styled.h1`
text-align:center;
`;

const ConfirmButton=styled.button`
background-color:#00a1f1;
border: none;
padding: 12px;
color: white;
cursor:pointer;
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

    const history=useHistory();

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem('product-info'));
        setData(products);

        if(data!=null){
            var total=0;
        const totals=data.map((item)=>{
        total=total+parseInt(item.price);
        return total;
        });
        console.log(totals);
        console.log(totals[totals.length-1]);
        setTotal(totals[totals.length-1]);
        }
        
    }, [total])

    function confirmTheOrder(){

        localStorage.removeItem('product-info');

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

        history.push("/order-history");
        alert('The order has been confirmed');
    }
    

    return (
        <>
            <Header />
            <Heading>User Checkout</Heading>

            {
                    data!=null ?
                    <>
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
                    <h2>Delivery details</h2>

                    <input type="text" placeholder="First name" onChange={(e)=>setFirstName(e.target.value)}/>
                   
                    <input type="text" placeholder="Last name"  onChange={(e)=>setLastName(e.target.value)}/>
                   
                    <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                 
                    <input type="text" placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
                   
                    <input type="text" placeholder="Postal code" onChange={(e)=>setPostalCode(e.target.value)}/>
                   
                    <input type="text" placeholder="City" onChange={(e)=>setCity(e.target.value)}/>
                   
                    <input type="text" placeholder="Note" onChange={(e)=>setNote(e.target.value)}/>
                   
                    <div className="button-group">
                    <ConfirmButton  onClick={confirmTheOrder}>Confirm the order</ConfirmButton>
                    </div>
                    
                </BillingContainer>
                    </> :
                    <Container>
                        <h3>No items in cart</h3>
                    </Container>
                    

            }

           
            
        </>
    )
}

export default UserCheckout;