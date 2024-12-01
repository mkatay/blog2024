import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const Alerts=({txt,err})=> {
    useEffect(() => {
        if (err) {
          toast.error(err, { position: "top-left" });
        } else {
          toast.success(txt, { position: "top-center" });
          
        }
      }, [txt, err]); 
    
   return (
      <>
        <ToastContainer />
      </>
    );
}