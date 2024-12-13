import React from 'react'
import { Categories } from '../components/Categories'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { readPosts } from '../utility/crudUtility'
import { CardsContainer } from '../components/CardsContainer'

export const Posts = () => {
  const [posts,setPosts]=useState([])
  let [searchParams] = useSearchParams();
  console.log(searchParams.get('sel'));   
  const [selectedCateg,setSelectedCateg]=useState( searchParams.get('sel') ? [searchParams.get('sel')] : [])
  
  console.log(selectedCateg);
  
  useEffect(() => {
    readPosts(setPosts, selectedCateg);  
   }, [selectedCateg]);

  
  return (
    <div className='page'>
      <Categories selectedCateg={selectedCateg} setSelectedCateg={setSelectedCateg}/>
      {posts.length>0 && <CardsContainer posts={posts}/>}

    </div>
  )
}


