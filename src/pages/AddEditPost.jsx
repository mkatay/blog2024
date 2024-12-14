import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DropDown } from '../components/DropDown';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CategContext } from '../context/CategContext';
import { NotFound } from './NotFound';
import { Story } from '../components/Story';
import { uploadFile } from '../utility/uploadFile';
import { addPost, readPost, updatePost } from '../utility/crudUtility';
import { sanitizeHTML } from '../utility/utils';
import { BarLoader } from 'react-spinners';
import { Alerts } from '../components/Alerts';
import {useParams} from 'react-router-dom'

export const AddEditPost=()=> {
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategContext);       
  const {register, handleSubmit,formState: { errors },reset,setValue} = useForm(/*{mode:"onChange"}*/);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [story,setStory]=useState('')
  const [photo, setPhoto] = useState(null);  
  const [loading, setLoading] = useState(false);   
  const [uploaded, setUploaded] = useState(false);
  const [post, setPost] = useState(null); // editáláshoz kell    

  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      readPost(params.id, setPost);
    }
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setValue("title", post?.title);
      setValue("category", post?.category);
      setPhoto(post?.photo['url']);
      setStory(post?.story)
      setSelectedCategory(post?.category)
    }
  }, [post]);

  if (!user) return <NotFound />

 const onSubmit =async (data) => {
    setLoading(true);
    //console.log('data:',data);
    if (params.id) {
      //update esetén
      try {
        console.log('update:',data,story);
        
        updatePost(params.id, { ...data, story });
        setUploaded(true);
      } catch (err) {
        console.error("Hiba update közben", err);
      } finally {
        setLoading(false);
      }
    } else {
      //új post esetén
    
    const newPostData={
      ...data,
      category: selectedCategory,
      story, 
      author: user.displayName,
      userId: user.uid,
      likes:[]            
    }
   
    try {
        const file = data.file[0];
        const {url,id} = await uploadFile(file);
        console.log("Feltöltött fájl URL-je:", url,id);
        delete newPostData.file
        await addPost({...newPostData,photo:{url,id}})
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
}                              
  return (
    <div className="page ">
      <form onSubmit={handleSubmit(onSubmit)}  className='container'>
   
            <div className="d-flex mb-3 gap-2 justify-content-center align-items-center">
              <div style={{maxWidth:300,color:'var(--col1)',paddingTop:'10px'}}>
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

           <Story setStory={setStory} uploaded={uploaded} story={story}/>
            <p className="err-container text-center">{(!story ||sanitizeHTML(story).length==0)  && 'Részletes leírás kötelező!'} </p>
<div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
        <div>
                <input className="form-control" type="file" disabled={params.id}
                  {...register("file", 
                    params.id ? {} // Ha disabled, nincsenek validációs szabályok, update esetén
                    : {                 
                      required: true,
                      validate: (value) => {
                        //console.log(value[0]);
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
              <input  className='btn btn-primary 'type="submit" disabled={!selectedCategory || sanitizeHTML(story).length==0 || loading}/>
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