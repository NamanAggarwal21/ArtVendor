import React, { useContext ,useEffect,useState} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount , token,art_list,cartItem,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(prev=>({
       ...prev,
      [name]:value
    }))
  }

  const placeOrder = async(e)=>{
    e.preventDefault();
    let orderItems = []; // cartItem related data

    art_list.map((item) =>{
      if(cartItem[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })

    // console.log(orderItems);
    let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2 // delivery
    }

    let res = await axios.post(url+'/api/order/place',orderData,{headers:{token}});
    console.log(res.data);
    if(res.data.success){
        const {session_url} = res.data;
        window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
      if(!token){
        navigate('/cart');
      }
      else if(getTotalCartAmount() === 0){
        navigate('/cart');
      }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' value={data.firstName} onChange={onChangeHandler} type='text' placeholder='first name'/>
          <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='last name' />
        </div>

        <input required type="email" name='email' value={data.email} onChange={onChangeHandler}placeholder='email address' />
        <input required type="text" name='street' value={data.street} onChange={onChangeHandler}placeholder='street' />

        <div className="multi-fields">
          <input required type='text' name='city' value={data.city} onChange={onChangeHandler} placeholder='City'/>
          <input required type="text" name='state' value={data.state} onChange={onChangeHandler} placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required type='text' name='zipcode' value={data.zipcode} onChange={onChangeHandler} placeholder='zip code'/>
          <input required type="text" name='country' value={data.country}  onChange={onChangeHandler} placeholder='country' />
        </div>

        <input required type="text" placeholder='phone' name='phone' value={data.phone} onChange={onChangeHandler}/>

      </div>

      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div >
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>

            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>${getTotalCartAmount() == 0 ? 0 :2}</p>
            </div>
            <hr/>

            <div className="cart-total-details">
              <b>Total</b>
              <p>${getTotalCartAmount() == 0 ? 0 : getTotalCartAmount()+2}</p>
            </div>
          </div>

          <button type='submit' >PROCEED TO PAYMENT</button>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder