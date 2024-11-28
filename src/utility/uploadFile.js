import axios from 'axios';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const apiKey = import.meta.env.VITE_CLOUDINARY_URL
    const response = await axios.post( `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData)
    return response.data.secure_url;
  } catch (error) {
    console.error('Hiba a fájl feltöltése közben:', error);
    throw new Error('Fájl feltöltésének hibája.');
  }
};

