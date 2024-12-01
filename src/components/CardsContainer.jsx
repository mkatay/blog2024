import React from 'react'
import { useState } from 'react'
import { SmallCard } from './SmallCard'
import { BigCard } from './BigCard'

export const CardsContainer = ({posts}) => {
    const [selectedPost,setSelectedPost]=useState(posts[0])

    console.log(posts);
    console.log(selectedPost);
    
  return (
    <div className="container mt-2">
    <div className='row'>
        <div className="col-md-8 ">
             <BigCard {...selectedPost}/>
        </div>
       <div className="col-md-4 d-flex gap-2 flex-column">
         {posts.map(obj=><SmallCard key={obj.id} {...obj}  onClick={() =>setSelectedPost(obj)}/>)}
       </div>  
    </div>
    </div>
  )
}
 
