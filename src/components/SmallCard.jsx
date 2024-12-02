import React from 'react'
import './SmallCard.css'

export const SmallCard= ({id,title,story,photoURL,onClick,category}) => {
  return (
    <div className='smallCard' onClick={onClick} >
      <img  alt={title}  src={photoURL} className='img-fluid' style={{maxWidth:'100px'}}/>
      <h6>  {title}</h6>  
      <p className='category'>{category}</p>
  </div>
  )
}

