import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItem, art_list, removeFromCart , getTotalCartAmount ,url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr />
        {
          art_list.map((item,index) =>{
            if(cartItem[item._id]>0){
              {
                return (
                  <div>
                      <div className="cart-items-title cart-items-item">
                        <img src={url+"/images/"+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        
                        <p>{cartItem[item._id]}</p>
                        <p>${item.price * cartItem[item._id]}</p>
                        <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                      </div>

                      <hr />

                  </div>
                  
                )
              }
            }
          })
        }
      </div>
      <div className="cart-bottom">
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

          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>

        </div>
        
        <div className='cart-promocode'>
            <div>
              <p>If you have a promo code , enter it!</p>
              <div className='cart-promocode-input'>
                  <input type="text" placeholder='PROMOCODE' />
                  <button >Submit</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart