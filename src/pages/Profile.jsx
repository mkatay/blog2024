import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import {NotFound} from './NotFound'
import {  uploadFile } from '../utility/uploadFile';
import { BarLoader } from 'react-spinners';
import { useState } from 'react';
import { useEffect } from 'react';
import { Toastify } from '../components/Toastify';
import { Button } from 'reactstrap';
import { buttonStyle, disabledButtonStyle, extractUrlAndId } from '../utility/utils';
import { useConfirm } from 'material-ui-confirm';

const middleStyle={
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidthwidth: 600,
  background:'white',
  padding:'1.5rem',
  borderRadius:'5px',
 
}                                    



export const Profile = () => {
  const { user,updateUser,msg,deleteAccount,logoutUser} = useContext(UserContext);

  const {register,handleSubmit,formState: { errors },reset} = useForm({
    defaultValues: {
      displayName: user?.displayName || '', // Ha van `user.displayName`, azt használja, különben üres lesz.
    }
  });
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarId, setAvatarId] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const confirm = useConfirm();

  useEffect(()=>{
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
    user?.photoURL && setAvatarId(extractUrlAndId(user.photoURL).id)
  },[user])
  
 
  if (!user) return <NotFound />;

  const onSubmit = async (data) => {
    //console.log('data:',data);
    setLoading(true);
    try {
      const file =data?.file ? data.file[0] :null;
      const {url,id}=file? await uploadFile(file):null
      console.log(url,id);  
      //ki kell törölni a régit a Cloudinaryrol
      await deleteFile(avatarId)
      url && setUploaded(true);
      updateUser(data.displayName,url+'/'+id)   
    } catch (error) {
      console.error("Hiba a fájl feltöltése közben", error);
    } finally {
      setLoading(false);
    }
};
                                
console.log(errors);//ebbe az objektumba gyűlnek a hibák

const handleDelete = async () => {
  try {
    await  confirm({ description:'Ez egy visszavonhatatlan művelet!',
                    confirmationText:'igen',
                    cancellationText:'mégsem',
                    title:'Biztosan ki szeretnéd törölni a felhasználói fiókodat?'
           })
    //await deleteProfile(user.uid) 
    await deleteAccount()
    // Kiléptetés a sikeres törlés után
    logoutUser()
  } catch (error) {
      console.log('mégsem:',error);
  }
}

  return (
    <div className="page ">
      <div  style={middleStyle}>
      <h3 className='text-center' style={{color:'var(--col5)'}}>Fiók beállítások</h3>
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
                setAvatar(URL.createObjectURL(e.target.files[0]))
              }
            />
            <p className='err-container'>{errors?.file?.message }</p> 
            </div>
        <div>
          <Button  style={{...buttonStyle,...(loading && disabledButtonStyle)}}  disabled={loading}>Mentés</Button>
        </div>
       </div> 
        {loading && <BarLoader />}
        {uploaded && avatar && <p>Sikeres kép feltöltés!</p>}
      </form>

      {avatar && (
            <div className='d-flex justify-content-center'>
              <img className="img-thumbnail" src={avatar} alt="postPhoto" style={{maxWidth:'200px'}}/>
            </div>       
      )}  
      {msg && <Toastify {...msg} />}  
      </div>
      <button className="btn btn-danger m-2" onClick={handleDelete}>
          Felhasználói fiók törlése
      </button>
    </div>
  )
}


