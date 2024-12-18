import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword,
  sendSignInLinkToEmail,deleteUser,sendPasswordResetEmail,updateProfile} from 'firebase/auth';
import { auth } from '../utility/firebaseApp';



const urlRedirect='https://kamsblog.netlify.app/auth/in' /*'http://localhost:5173/auth/in'*/

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg,setMsg]=useState({})


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  const logoutUser=async ()=>{
    await signOut(auth)    
    setMsg({});
  }

  const signInUser=async (email,password)=>{
    try{
      await signInWithEmailAndPassword(auth,email,password)  
      setMsg({});
      setMsg({signin:'Sikeres bejelntkezés!'})
     }catch(err){
        setMsg({err:err.message})
       } 
  }

  const sendEmailLink = async (email) => {
    try {
      await sendSignInLinkToEmail(auth, email, {
        // this is the URL that we will redirect back to after clicking on the link in mailbox
        url:urlRedirect,
        handleCodeInApp: true,//the email verification link or password reset link should be handled by your application
      });
      setMsg({});
      setMsg({signup:'Az email címre egy aktiváló link érkezett!'})  
    } catch (err) {
      setMsg({err:err.message})
    }
  };

   const signUpUser =async (email, password,displayName) => {
    try{
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {displayName})
      setMsg({});
      sendEmailLink(email)
      logoutUser()
    }catch(err){
      setMsg({err:err.message})
    }
  };

  const updateUser =async (displayName,photoURL) => {
    try{
      if(displayName && photoURL) await updateProfile(auth.currentUser, {displayName,photoURL})
      else if (displayName) await updateProfile(auth.currentUser, {displayName})
      else if(photoURL) await updateProfile(auth.currentUser, {photoURL})
      setMsg({});
      setMsg({update:'Sikeres módosítás!'})  
    }catch(err){
        setMsg({err:err.message})
    }
  };
     
  const resetPassword =async (email) => {
    try{
      await sendPasswordResetEmail(auth, email);
      setMsg({});
      //console.log('A jelszóvisszaállítási email elküldve.');
      setMsg({resetPw:'A jelszóvisszaállítási email elküldve.'})
    }catch(err){
      setMsg({err:err.message})

    }
  }
  const deleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      console.log('Felhasználói fiók törölve.');
    } catch (error) {
      console.error('Hiba történt a fiók törlésekor:', error);
    }
  };

    return (
    <UserContext.Provider value={{ user,msg,logoutUser,signInUser,resetPassword,setMsg,
                                    sendEmailLink,deleteAccount,signUpUser,updateUser}}>
                                     
      {children}
    </UserContext.Provider>
  );
};
