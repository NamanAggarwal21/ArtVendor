import React, { useContext } from 'react'
import './ArtItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';


const ArtItem = ({id,name,price,description,image}) => {

    const {cartItem ,addToCart , removeFromCart ,url} = useContext(StoreContext);

  return (
    <div className='art-item'>
        <div className="art-item-img-container">
            <img className='art-item-image' src={url+"/images/"+image} alt="" />
            {
                !cartItem[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} />
                : <div className='art-item-counter'> 
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
                        <p>{cartItem[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green}/>
                </div>
            }
        </div>

        <div className="art-item-info">
            <div className="art-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='art-item-desc'>{description}</p>
            <p className='art-item-price'>${price}</p>
        </div>
    </div>
  )
}

export default ArtItem