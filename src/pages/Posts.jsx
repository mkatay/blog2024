import React from 'react'
import { Categories } from '../components/Categories'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { readPosts } from '../utility/crudUtility'
import { CardsContainer } from '../components/CardsContainer'
import { SearchBox } from '../components/SearchBox'


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
      <div className='d-flex flex-wrap gap-1 justify-content-around pt-4' >
        <Categories selectedCateg={selectedCateg} setSelectedCateg={setSelectedCateg}/>
        {posts && <SearchBox items={posts.map(obj=>({id:obj.id,name:obj.title}))}/>}
      </div>
        
      
      
      {posts.length>0 && <CardsContainer posts={posts}/>}
  
    </div>
  )
}


