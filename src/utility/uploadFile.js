import { Cloudinary } from '@cloudinary/url-gen/index';
import axios from 'axios';
// Require the Cloudinary library
/*import cloudinary from 'cloudinary'
 
cloudinary.config({
  cloud_name: meta.env.VITE_APP_CLOUD_NAME,
  api_key: meta.env.VITE_APP_API_KEY,
  api_secret: meta.env.VITE_APP_API_SECRET
});

*/
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const apiKey = import.meta.env.VITE_CLOUDINARY_URL
    const response = await axios.post( `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData)
    return {url:response.data.secure_url,id:response.data.public_id};
  } catch (error) {
    console.error('Hiba a fájl feltöltése közben:', error);
    throw new Error('Fájl feltöltésének hibája.');
  }
};


export const deleteFile = async (id) => {

    cloudinary.v2.uploader.destroy(id, function(error,result) {
      console.log(result, error) })
      .then(resp => console.log(resp))
      .catch(_err=> console.log("Something went wrong, please try again later."));
}