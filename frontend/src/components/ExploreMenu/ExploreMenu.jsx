import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category , setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore </h1>
        <p className='explore-menu-text'>Select and choose among the various options provided by ArtVendor. Discover an unparalleled selection of art by artists from around the world to suit all budgets, styles, and spaces. </p>
        <div className="explore-menu-list">
            {
            menu_list.map((item,index)=>{
                return( 
                <div onClick={()=>setCategory(prev =>prev === item.menu_name ? "All" : item.menu_name)} 
                key={index} className='explore-menu-list-item'> 
                    <img className={category===item.menu_name ? "active" : "" } src={item.menu_image} />
                    <p>{item.menu_name}</p>
                </div>)
            })
        }
        </div>
        {/* horizontal Ruler */}
        <hr/>

    </div>
  )
}

export default ExploreMenu