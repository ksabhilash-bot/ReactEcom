import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
cloudinary.config({
    cloud_name:'djgkfjytn',api_key:'527284345142799',api_secret:'kVL-571Kpa__WJPZWc9uUqvT59s'
});
const storage=new multer.memoryStorage();
async function imageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })
    return result;
}
const upload = multer({storage});
export {upload,imageUploadUtil}