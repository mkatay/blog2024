import React from 'react'
import { MyCard } from './MyCard'

export const CardsContainer = ({posts}) => {

  return (
    <div className="container mt-2">
      <div className="d-flex gap-1 flex-wrap justify-content-center">
      {posts.map(obj=><MyCard key={obj.id} {...obj} />)}
      </div>
    </div>
  )
}
 
