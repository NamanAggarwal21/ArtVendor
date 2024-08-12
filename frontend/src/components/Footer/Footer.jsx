import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">

            <div className="footer-content-left">
                <p className='logo'>Art<span className='vendor'>Vendor</span></p>
                <ul>
                    <li>Our 14 day stisfaction guarantee allows you to buy with confidence. If you're not staisfied , return it and we'll help you find a work you love</li>
                    <li>Explore an unparalleled selection of paintings, abstract and more by thousands of artist around the world</li>
                </ul>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy-Policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 - 8375859989</li>
                    <li>+91 - 7290811616</li>
                    <li>contact@artvendor.in</li>
                </ul>
            </div>

        </div>

        <hr/>
        <p className='footer-copyright'>Copyright 2024 - All rights reserved</p>
    </div>
  )
}

export default Footer
