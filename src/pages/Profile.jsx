import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import {NotFound} from './NotFound'
import { uploadFile } from '../utility/uploadFile';
import { BarLoader } from 'react-spinners';
import { useState } from 'react';
import { useEffect } from 'react';


export const Profile = () => {
  const { user,updateUser} = useContext(UserContext);

  const {register,handleSubmit,formState: { errors },reset} = useForm({
    defaultValues: {
      displayName: user?.displayName || '', // Ha van `user.displayName`, azt használja, különben üres lesz.
    }
  });
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  useEffect(()=>{
    user?.photoURL && setPhoto(user.photoURL)
  },[user])
 
  if (!user) return <NotFound />;

  const onSubmit = async (data) => {
    //console.log('data:',data);
    setLoading(true);
    try {
      const file =data?.file ? data.file[0] :null;
      const photoURL=file? await uploadFile(file):null
      updateUser(data.displayName,photoURL)   
      setUploaded(true);
    } catch (error) {
      console.error("Hiba a fájl feltöltése közben", error);
    } finally {
      setLoading(false);
    }
      setUploaded(true);
};
                                
console.log(errors);//ebbe az objektumba gyűlnek a hibák

  return (
    <div className="page ">
      <form onSubmit={handleSubmit(onSubmit)}  className='container' style={{maxWidth:'600px'}}>
      <div className="d-flex flex-column justify-content-center mt-2">
        <div>
            <label style={{color:'var(--col1'}}>Felhasználónév</label>
            <input className='form-control' {...register('displayName')}  placeholder="felhasználónév " type="text" />
          </div>
          <div>
            <label style={{color:'var(--col1)'}}>Avatar feltöltése/módosítása:</label>
            <input className="form-control" type="file"
              {...register("file", 
                {
                    validate: (value) => {
                      if (!value[0]) return true; // Ha nincs fájl kiválasztva, nincs hiba.
                      console.log(value[0]);
                      const acceptedFormats = ["jpg", "png"];
                      const fileExtension = value[0]?.name.split(".").pop().toLowerCase();
                      if (!acceptedFormats.includes(fileExtension))
                        return "Invalid file format.";
                      if (value[0].size > 1 * 1000 * 1024)
                        return "Az engedélyezett maximális file méret 1MB.";
                      return true;
                  },
                }
            )}
              onChange={(e) =>
                setPhoto(URL.createObjectURL(e.target.files[0]))
              }
            />
            <p className='err-container'>{errors?.file?.message }</p> 
            </div>
        <div>
          <input  className='btn btn-primary'type="submit" />
        </div>
       </div> 
        {loading && <BarLoader />}
        {uploaded && <p>Sikeres feltöltés!</p>}
      </form>
      {photo && (
            <div className='d-flex justify-content-center'>
              <img className="img-thumbnail" src={photo} alt="postPhoto" style={{maxWidth:'300px'}}/>
            </div>       
      )}    
    </div>
  )
}


