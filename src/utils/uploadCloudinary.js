const cloud_name = 'dewlqsdjt';
const upload_preset = 'caRabite';


const uploadImageCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', upload_preset);
    formData.append('cloud_name', cloud_name);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const imageData = await response.json();
      console.log('Image uploaded successfully:', imageData);
      return imageData;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  export default uploadImageCloudinary;