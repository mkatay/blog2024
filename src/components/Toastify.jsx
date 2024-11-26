import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const Toastify=({signin,signup,err})=> {
    const navigate=useNavigate()
    useEffect(() => {
        if (err) {
          toast.error(err, { position: "top-left" });
        } else if (signin || signup) {
          toast.success(signin || signup, { position: "top-center" });
          // Várakozás a navigáció előtt
        signin && setTimeout(() => navigate('/'), 2000); 
    
        }
      }, [signin, signup, err]); 
    
   return (
      <>
        <ToastContainer />
      </>
    );
}