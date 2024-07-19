import React, { useContext } from 'react'
import './ArtDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import ArtItem from '../ArtItem/ArtItem'

const ArtDisplay = ({category}) => {
    
    const {art_list} = useContext(StoreContext)
  return (
    <div className='art-display' id='art-display'>
        <h2>Top ART picks for you... </h2>
        <div className='art-display-list'>
            {
                art_list.map((item,index)=>{
                    if(category === 'All' || category === item.category){
                        return <ArtItem key={index} id={item._id} name ={item.name} description={item.description} price={item.price} image={item.image}  />
                    }
                    
                })
            }
        </div>
    </div>
  )
}

export default ArtDisplay