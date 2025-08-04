import express from 'express'
import { handleImageUpload,addProduct,deleteProduct,fetchAllProduct,editProduct } from '../../controllers/auth/admin/product-controller.js'
import { upload } from '../../cloudinary/cloudinary.js'
const router=express.Router();
router.post('/upload-image',upload.single('my_file'),handleImageUpload)
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/get',fetchAllProduct)
export const AdminProductRouter = router;