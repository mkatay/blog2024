import React from 'react'
import { PostCard } from './PostCard'

export const CardsContainer = ({posts}) => {

  return (
    <div className="container mt-2">
      <div className="d-flex gap-2 flex-wrap justify-content-center p-3">
      {posts && posts.map(obj=><PostCard key={obj.id} {...obj} />)}
      </div>
    </div>
  )
}
 
