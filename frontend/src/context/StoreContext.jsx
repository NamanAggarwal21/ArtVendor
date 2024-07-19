import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

    const [cartItem , setCartItem] = useState({});
    const url = "http://localhost:4000";
    const [token,setToken] = useState("");
    const [art_list,setArtList] = useState([]);

    const addToCart = async (itemId) =>{
        if(!cartItem[itemId]){
            setCartItem((prev) =>({...prev , [itemId]:1 }))
        }
        else{
            setCartItem((prev) =>({...prev , [itemId]: prev[itemId]+1 }))
        }

        // after backend updation---
        if(token){
            // to add product in db i.e. in addCart
            await axios.post(url+"/api/cart/add" , {itemId} ,{headers : {token}} )
        }
    } 
    const removeFromCart = async(itemId) =>{
        setCartItem((prev) =>({...prev , [itemId]: prev[itemId]-1 }))
        if(token){
            // to remove product in db i.e. in removeCart
            await axios.post(url+"/api/cart/remove" , {itemId} ,{headers : {token}} )
        }
    }

    const loadCartData = async(token)=>{
        const response =  await axios.post(url+"/api/cart/get" , {} ,{headers : {token}} )
        
        setCartItem(response.data.cartData);
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item] > 0 ){
                let itemInfo = art_list.find((product) =>product._id === item);
                totalAmount += itemInfo.price*cartItem[item];
            }
        }
        return totalAmount;
    }

    const fetchArtList = async() =>{
        const response = await axios.get(url+"/api/art/list");
        setArtList(response.data.data);
    }

    // to prevent logging by reloading if we are logged in
    useEffect(()=>{
        async function loadData(){
            await fetchArtList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem('token'));
            }
        }
        loadData();
    },[])

    const ContextValue = {
        art_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    
    return ( 
        <StoreContext.Provider value={ContextValue}> 
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider