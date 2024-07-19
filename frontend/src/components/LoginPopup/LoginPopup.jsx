import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from'axios'

const LoginPopup = ({setShowLogin}) => {

    const {url , setToken} = useContext(StoreContext);

    const [currState , setCurrState] = useState("Log In");
    const [data , setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData( (prev) =>({
            ...prev,
            [name]:value
        }))
    }

    const onLogin = async(event) =>{
        event.preventDefault();
        let newUrl = url;
        if(currState === "Log In"){
            newUrl += "/api/user/login";
        }
        else {
            newUrl +="/api/user/register"
        }
        const res = await axios.post(newUrl,data);
        // console.log(res.data);
        if(res.data.success){
            setToken(res.data.token);
            // once we get the token we will save it in our local storage /buffer
            localStorage.setItem("token" , res.data.token);
            setShowLogin(false);
        }
        else{
            alert(res.data.message);
        }

    }


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-inputs">
                {currState == "Log In" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" required placeholder='Your name'/>}
                <input type="email"  name='email' onChange={onChangeHandler} value={data.email} required placeholder='your email'/>
                <input type="password" name='password' onChange={onChangeHandler} value = {data.password } required placeholder='your password'/>
            </div>
            <button type='submit'>{currState == "Sign Up" ? "Create Account" : " Log In"} </button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p> By continuing, I agree to the terms of use & privacy policy. </p>
            </div>
            {   currState === "Log In" ? 
                <p>Create a new Account ? <span onClick={() =>setCurrState("Sign Up")} >Click Here </span></p>
                : <p>Already have an account ? <span onClick={() =>setCurrState("Log In")} >Login Here </span></p> 
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopup