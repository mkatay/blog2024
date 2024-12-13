import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { deletePost, readPost } from '../utility/crudUtility';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import './Detail.css'
import { FaPen, FaThumbsUp, FaTrash } from 'react-icons/fa6';
import { UserContext } from '../context/UserContext';
import { confirm } from 'material-ui-confirm';
import { elapsedTime } from '../utility/elapsedTime';

export const Detail = () => {
  const {user}=useContext(UserContext)
  const [post,setPost]=useState(null)
  const params=useParams()
  const navigate=useNavigate()
  console.log(params);

  useEffect(()=>{
    readPost(params.id,setPost)
  },[]) 

  post && console.log(post);

  const handleDelete = async () => {
    try {
      await  confirm({ description:'Ez egy visszavonhatatlan művelet!',
                      confirmationText:'igen',
                      cancellationText:'mégsem',
                      title:'Biztosan ki szeretnéd törölni?'
             })
        deletePost(post.id)
        navigate('/')
    } catch (error) {
        console.error('mégsem');
    }
  }
  
  
  return (
    <div className='page'>
      <button className='btn btn-secondary m-2' onClick={()=>navigate('/posts')}>vissza...</button>
      {post && 
      <>
      
        <div className="row gap-1 p-5">
          <img  className="post-photo col" src={post?.photo['url']} alt={post?.title}   />
          <div className="post-story col d-flex flex-column">
              <h3>{post.title}</h3>
              <p className="timestamp">{elapsedTime(post.timestamp)}</p>
             <p  >{parse(post?.story)}</p>
          </div>
         
        </div>
      </>
      }
      <div className="d-flex justify-content-around">
         <div className='d-flex gap-2 align-items-center'>
            <FaThumbsUp className='  icon' />
            <span>likeok száma...</span>
          </div>
          {(user && post && user.uid==post.userId)   &&
            <div>
              <FaTrash className='text-danger  icon' onClick={handleDelete}/>
              <FaPen className='  icon' style={{color:'var(--col3)'}} />
            </div>
          }
      </div>
      
    </div>
  )
}


