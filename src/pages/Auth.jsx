import React from 'react'
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Toastify } from '../components/Toastify';
import { background } from '@cloudinary/url-gen/qualifiers/focusOn';
import { BiBorderRadius } from 'react-icons/bi';

const middleStyle={
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  background:'var(--col4)',
  padding:'1rem',
  borderRadius:'5px',
  boxShadow:'0 0 5px var(--col3)'
}                                    



export const Auth = () => {
  const {signInUser,signUpUser,msg,user,setMsg}=useContext(UserContext)
console.log(msg);

  const location = useLocation(); // Kinyerjük az aktuális útvonalat
  const isSignIn = location.pathname === '/auth/in';
  const navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isSignIn) {
      //console.log('Sign In:', data.get('email'), data.get('password'));
      signInUser(data.get('email'), data.get('password'));
      user && navigate('/')
    } else {
      //console.log('Sign Up:', data.get('email'), data.get('password'));
      signUpUser(data.get('email'), data.get('password'));
    }
    
  };

  return (
    <div className="page">
      <div  style={middleStyle}>
      <h3 className='text-center' style={{color:'var(--col1'}}>{isSignIn? 'Sign IN':'Sign UP'}</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label style={{color:'var(--col1'}}>Email</Label>
          <Input   name="email"  placeholder="email"  type="email" />
        </FormGroup>
        <FormGroup>
          <Label style={{color:'var(--col1'}}>Password</Label>
          <Input  name="password"   placeholder="password " type="password" />
        </FormGroup>
        <Button style={{color:'var(--col5',backgroundColor:'var(--col1'}}>{isSignIn? 'Sign IN':'Sign UP'} </Button>
      </Form>
      {msg && <Toastify {...msg}/>}
  
      </div>
  </div>
  )
}


