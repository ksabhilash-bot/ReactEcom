import  express from 'express';
import { addToCart, fetchCartItems, updateCart, deleteCart } from '../../controllers/auth/shop/CartController.js';
const router = express.Router();
router.post('/add',addToCart)
router.get('/fetch/:userId',fetchCartItems)
router.put('/update',updateCart)
router.delete('/delete/:userId/:productId',deleteCart)
export const CartRouter = router;