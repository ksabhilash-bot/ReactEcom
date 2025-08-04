import { addReview,deleteReview,fetchReviews } from "../controllers/ReviewController.js"
import express from "express"
const router=express.Router()
router.post("/addReview",addReview);
router.get("/fetchReview/:productId",fetchReviews);
router.delete("/deleteReview/:userId/:productId",deleteReview)
export const ReviewRouter = router