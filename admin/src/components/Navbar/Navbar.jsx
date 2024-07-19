import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <p className='logo'>Art<span className='vendor'>Vendor</span> <p className='portal'>Admin Portal</p></p> 
        
        <img src={assets.profile_image} alt="" className="profile" />
    </div>
  )
}

export default Navbar