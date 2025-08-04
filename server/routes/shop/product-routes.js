import express from 'express'
import { getFilteredProducts,getProductDetails } from '../../controllers/auth/shop/productController.js'
const router=express.Router();

router.get('/get',getFilteredProducts)
router.get('/get/:id',getProductDetails)
export const ProductFilterRouter = router;