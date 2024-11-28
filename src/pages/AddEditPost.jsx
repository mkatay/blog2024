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

export const AddEditPost=()=> {
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategContext);       
  const {register, handleSubmit,formState: { errors },} = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [story,setStory]=useState('')
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
      } catch (error) {
        console.error("Hiba a fájl feltöltése közben", error);
      } finally {
        setLoading(false);
      }
    

   // e.target.reset(); // reset after form submit
  };
                                  

  
//console.log(postData);

  return (
    <div className="page ">
      <form onSubmit={handleSubmit(onSubmit)}  className='container'>
   
            <div className="d-flex mb-3 gap-2 justify-content-center align-items-center">
              <div style={{maxWidth:300}}>
                <label >A bejegyzés címe:</label>
                <input className='form-control' {...register('title', { required: true })} />
                {errors.title && <p>A címet kötelezeő megadni!</p>}
              </div>  
              <DropDown categories={categories} 
                setSelectedCategory={setSelectedCategory} 
                selectedCategory={selectedCategory}
                />
            </div>

            <Story setStory={setStory}/>
<div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
        <div>
                <input className="form-control" type="file"
                  {...register("file", {required: true,
                    validate: (value) => {
                      //console.log(value[0]);
                      const acceptedFormats = ["jpg", "png"];
                      const fileExtension = value[0]?.name.split(".").pop().toLowerCase();
                      if (!acceptedFormats.includes(fileExtension))
                        return "Invalid file format.";
                      if (value[0].size > 1 * 1000 * 1024)
                        return "File with maximum size of 1MB is allowed";
                      return true;
                    },
                  })}
                  onChange={(e) =>
                    setPhoto(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <p>{errors?.file?.message}</p>               
            </div>
    
       <input  className='btn btn-primary 'type="submit" />
 
</div>   
    </form>
    {photo && (
            <div className='d-flex justify-content-center'>
              <img className="img-thumbnail" src={photo} alt="postPhoto" />
            </div>
              
            )}     
    </div>
    
  );
}