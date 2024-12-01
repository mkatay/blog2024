import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DropDown } from '../components/DropDown';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CategContext } from '../context/CategContext';
import { NotFound } from './NotFound';
import { Story } from '../components/Story';
import { uploadFile } from '../utility/uploadFile';
import { addPost } from '../utility/crudUtility';
import { sanitizeHTML } from '../utility/utils';
import { BarLoader } from 'react-spinners';
import { Alerts } from '../components/Alerts';

export const AddEditPost=()=> {
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategContext);       
  const {register, handleSubmit,formState: { errors },reset} = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [story,setStory]=useState(null)
  const [photo, setPhoto] = useState(null);  
  const [loading, setLoading] = useState(false);   
  const [uploaded, setUploaded] = useState(false);    

  if (!user) return <NotFound />

 const onSubmit =async (data) => {
    setLoading(true);
    console.log('data:',data);
    
    const newPostData={
      ...data,
      category_id: selectedCategory.id,
      story, 
      author: user.displayName,
      userId: user.uid,
      likes:[]            
    }
    //console.log('postdata:',newPostData);
   
    try {
        const file = data.file[0];
        const photoURL = await uploadFile(file);
        console.log("Feltöltött fájl URL-je:", photoURL);
        delete newPostData.file
        await addPost({...newPostData,photoURL})
        setUploaded(true);
        reset()
        setStory(null)
        setPhoto(null)
      } catch (error) {
        console.error("Hiba a fájl feltöltése közben", error);
      } finally {
        setLoading(false);
      }
        setUploaded(true);
  };
                                  
//console.log(errors);//ebbe az objektumba gyűlnek a hibák
//console.log(story);

  return (
    <div className="page ">
      <form onSubmit={handleSubmit(onSubmit)}  className='container'>
   
            <div className="d-flex mb-3 gap-2 justify-content-center align-items-center">
              <div style={{maxWidth:300}}>
                <label >A bejegyzés címe:</label>
                <input className='form-control' {...register('title', { required: true })} />
                <p className='err-container'>{errors.title && 'A címet kötelező megadni!'}</p>
              </div>  
              <div>
              <DropDown categories={categories} 
                setSelectedCategory={setSelectedCategory} 
                selectedCategory={selectedCategory}
                />
               <p className="err-container">{!selectedCategory?.id && 'A kategória kiválasztása kötelező!'} </p>
              </div>
            </div>

            <Story setStory={setStory} uploaded={uploaded}/>
            <p className="err-container text-center">{(!story ||sanitizeHTML(story).length==0)  && 'Részletes leírás kötelező!'} </p>
<div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
        <div>
                <input className="form-control" type="file"
                  {...register("file", 
                    {
                      required: true,
                      validate: (value) => {
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
               {
                <p className='err-container'>{errors?.file?.message }</p>  ||
                <p className='err-container'>  {errors?.file && 'Fotó feltöltése kötelező!'}</p>
                }
           
            </div>
            <div>
              <input  className='btn btn-primary 'type="submit" disabled={!selectedCategory?.id || sanitizeHTML(story).length==0}/>
            </div>
            {loading && <BarLoader />}
            {uploaded && <Alerts txt="Sikeres feltöltés!" />}
</div>   
    </form>
    {photo && (
            <div className='d-flex justify-content-center'>
              <img className="img-thumbnail" src={photo} alt="postPhoto" style={{maxWidth:'300px'}}/>
            </div>
              
            )}     
    </div>
    
  );
}