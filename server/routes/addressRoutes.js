import express from 'express';
import { addAddress, fetchAddress, editAddress, deleteAddress } from '../controllers/auth/shop/AddressController.js';
const router = express.Router();
router.post('/add', addAddress);
router.get('/get/:userId', fetchAddress);
router.put('/update/:userId/:addressId',editAddress);
router.delete('/delete/:userId/:addressId', deleteAddress);
export const AddressRouter = router;