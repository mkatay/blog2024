import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap'
import parse from 'html-react-parser'
import './BigCard.css'

export const BigCard = ({id,title,story,photoURL}) => {
      console.log(photoURL);
      
  return (
    <Card className="w-100 h-auto  mt-3 bigCard" style={{ boxShadow: 'none', transform: 'none'}}>
    <CardImg  alt={title} src={photoURL} style={{ height: 'auto' }} top width="100%" />
    <CardBody>
      <CardTitle tag="h5">{title}</CardTitle>
      <main className='text-white'>
      {parse(story)}
      </main>
      <CardText>
        <small className="text-muted">
          Last updated 3 mins ago
        </small>
      </CardText>
    </CardBody>
  </Card>
  )
}

