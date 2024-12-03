import React from 'react'
import './SmallCard.css'

export const SmallCard= ({id,title,story,photoURL,onClick,category,author}) => {
  return (
    <div className='smallCard' onClick={onClick} >
      <img  alt={title}  src={photoURL} className='img-fluid' style={{maxWidth:'100px'}}/>
      <div>
        <h6 className='border-bottom'>  {title}</h6> 
        <p className='author'>Szerző: {author}</p> 
      </div>
      <p className='category'>{category}</p>
  </div>
  )
}

