import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { UserContext } from '../context/UserContext';
import { middleStyle } from '../utility/utils';
import { Toastify } from '../components/Toastify';
import { useEffect } from 'react';

export const PwReset = () => {
  const navigate=useNavigate()
  const {resetPassword,msg,setMsg}=useContext(UserContext)

  useEffect(()=>{
    setMsg({...msg,err:null,resetPw:null})
  },[])


  const handleSubmit=(e)=>{
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    resetPassword(data.get('email'))
    setMsg()
    if(msg?.resetPw) navigate('/auth/in')
  }

  return (
    <div className='page'>
       <div  style={middleStyle}>
      <h3 className='text-center' style={{color:'var(--col1'}}>Jelszó módosítás</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label style={{color:'var(--col1'}}>Add meg az email címed:</Label>
          <Input   name="email"  placeholder="email"  type="email" />
        </FormGroup>
       
        <Button >Új jelszó igénylése</Button>
      </Form>
      
      {msg && <Toastify {...msg}/>}
  
      </div>
    </div>
  )
}

