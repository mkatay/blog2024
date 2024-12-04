import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap'
import parse from 'html-react-parser'
import './BigCard.css'

export const BigCard = ({id,title,story,photoURL}) => {
      console.log(photoURL);
      
  return (
    <Card className=" bigCard" style={{ boxShadow: 'none', transform: 'none'}}>
    <CardImg  alt={title} src={photoURL}  top width="100%" />
    <CardBody className='cardBody'>
      <CardTitle tag="h5">{title}</CardTitle>
      <main >
        <div className='story'>
           {parse(story)}
        </div>
        <div className='info'>egyéb infók...</div>
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

