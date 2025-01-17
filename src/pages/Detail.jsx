import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { deletePost,readPost, toggleLike } from '../utility/crudUtility';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import './Detail.css'
import { FaPen, FaThumbsUp, FaTrash } from 'react-icons/fa6';
import { UserContext } from '../context/UserContext';
import { confirm } from 'material-ui-confirm';
import { elapsedTime } from '../utility/elapsedTime';
import { delPhoto } from '../utility/uploadFile';
import {Alerts} from '../components/Alerts'

export const Detail = () => {
  const {user}=useContext(UserContext)
  const [post,setPost]=useState(null)
  const [txt,setTxt]=useState(null)
  const params=useParams()
  const navigate=useNavigate()
  console.log(params);
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL; 

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
        delPhoto(post.photo['id'])
        navigate('/')
    } catch (error) {
        console.error('mégsem',error);
    }
  }
  const handleLikes=()=>{
    if(!user) setTxt("Csak bejelentkezett felhasználók likeolhatnak!" )
    else toggleLike(post.id,user.uid)
  }
  
  return (
    <div className='details'>
      <button className='btn btn-secondary m-2' style={{position:'fixed',bottom:0,right:0}} onClick={()=>navigate('/posts')}>vissza...</button>
      {post && 
      <div className='container p-3 ' >
      
        <div className='post-container'>
          <img  className="post-photo" src={post?.photo['url']} alt={post?.title}   />
          <div className="post-story ">
              <h3 style={{position:"relative"}}><span>{post.title}</span> <span style={{position:'absolute',top:-10,right:0,fontSize:'0.6rem'}}>szerző:{post.author}</span></h3>
              <p className="timestamp">{elapsedTime(post.timestamp)}</p>
             <p  >{parse(post?.story)}</p>
          </div>
         
        </div>
         <div className="d-flex justify-content-around p-3 border-top mt-3">
         <div className='d-flex gap-2 align-items-center'style={{color:"var(--col5)"}}>
            <FaThumbsUp className='icon' onClick={handleLikes} />
            {post && <span style={{padding:'2px'}}>{post.likes.length}</span>}
          </div>
          {(user && post && (user.uid==post.userId || user.email==adminEmail))   &&
            <div>
              <FaTrash style={{color:'var(--accent)',marginRight:'1rem'}}  className='icon' onClick={handleDelete}/>
              <FaPen className='icon' style={{color:'var(--primary)'}}   onClick={()=>navigate('/update/'+post.id)}/>
            </div>
          }
      </div>
      </div>
      }
     {txt && <Alerts txt={txt} err={false}/> }
      
    </div>
  )
}


