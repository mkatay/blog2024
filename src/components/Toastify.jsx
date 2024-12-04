import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../context/UserContext';


export const Toastify=({signin,signup,err,resetPw,update})=> {
  const {setMsg}=useContext(UserContext)
    const navigate=useNavigate()
    useEffect(() => {
        if (err) {
          toast.error(err, { position: "top-left" });
        } else if (signin || signup) {
          toast.success(signin || signup, { position: "top-center" });
          // Várakozás a navigáció előtt
        signin && setTimeout(() => navigate('/'), 2000); 
    
        }else if(resetPw){
          toast.success(resetPw, { position: "top-center" });
          // Várakozás a navigáció előtt
          setTimeout(() => navigate('/'), 2000); 
        } else if(update){
            toast.success(update,{ position: "top-center" });
        }
        setMsg({});
      }, [signin, signup, err,resetPw,update]); 
    
   return (
      <>
        <ToastContainer />
      </>
    );
}