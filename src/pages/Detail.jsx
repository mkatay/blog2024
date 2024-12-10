import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { readPost } from '../utility/crudUtility';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Detail = () => {
  const [post,setPost]=useState(null)
  const params=useParams()
  const navigate=useNavigate()
  console.log(params);
  useEffect(()=>{
    readPost(params.id,setPost)
  },[]) 

  post && console.log(post);
  
  
  return (
    <div className='page'>
      <h3>{post && post.title}</h3>
      <button className='btn btn-secondary' onClick={()=>navigate('/posts')}>vissza...</button>
    </div>
  )
}


