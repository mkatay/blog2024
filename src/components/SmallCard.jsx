import React from 'react'
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'

export const SmallCard= ({id,title,story,photoURL,onClick}) => {
  return (
    <div className=' mt-3 w-100 d-flex gap-1 border-bottom border-bottom-light p-2' onClick={onClick} >
      <img  alt={title}  src={photoURL} className='img-fluid' style={{maxWidth:'100px'}}/>
      <h6>  {title}</h6>  
  </div>
  )
}

