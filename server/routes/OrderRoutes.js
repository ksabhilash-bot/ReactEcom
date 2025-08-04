import express from 'express';
import { addOrder,deleteOrder,fetchOrder,adminOrderDelete } from "../controllers/auth/shop/OrderController.js"
const router = express.Router()
router.post("/addOrder",addOrder)
router.get("/fetch",fetchOrder);
router.delete("/deleteOrder/:userId/:cartId",deleteOrder);
router.delete("/admindeleteOrder/:orderId",adminOrderDelete);
export const orderR=router;