import React from 'react'
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Toastify } from '../components/Toastify';

const middleStyle={
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
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
      <h3 className='text-center'>{isSignIn? 'Sign IN':'Sign UP'}</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            name="email"
            placeholder="email"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            name="password"
            placeholder="password "
            type="password"
          />
        </FormGroup>
        <Button>{isSignIn? 'Sign IN':'Sign UP'} </Button>
      </Form>
      {msg && <Toastify {...msg}/>}
  
      </div>
  </div>
  )
}


