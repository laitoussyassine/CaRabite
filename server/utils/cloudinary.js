import  { config }  from 'dotenv';
config();
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIkey,
    api_secret: process.env.APISecret,
});
export default cloudinary;