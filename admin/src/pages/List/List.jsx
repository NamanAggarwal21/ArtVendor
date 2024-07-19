import React, { useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({url}) => {

    
    const [list,setList] = useState([]);
    const fetchlist = async() =>{
        const response = await axios.get(`${url}/api/art/list`);
        // console.log(response.data);
        if(response.data.success){
            setList(response.data.data);
        }
        else{
            toast.error("Error !");
        }
    }

    const removeArt = async(artID)=>{
        const response = await axios.post(`${url}/api/art/remove`,{id:artID});
        await fetchlist();
        if(response.data.success){
            toast.success(response.data.message);
        }
        else{
            toast.error("Error !");
        }
    }

    useEffect(()=>{
        fetchlist();
    },[]);

  return (

    <div className='list add flex-col'>
        <p>All ArtVendor collections</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Image</b>
                <b>Art</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {
                list.map((item,index) =>{
                    return (
                        <div key = {index} className='list-table-format'>
                            <img src={`${url}/images/`+item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p onClick={()=>removeArt(item._id)} className='cursor'>X</p>
                        </div>
                    )
                })
            }
        </div>
        
    </div>
  )
}

export default List