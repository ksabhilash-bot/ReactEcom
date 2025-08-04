import express from 'express'
const router = express.Router();
import { registerUser,loginUser,logout,authMiddleware } from '../controllers/auth/auth-controller.js';

router.post("/register",registerUser)
router.post("/login",loginUser);
router.post("/logout",logout);
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({success:true,message:"Authenticated User",user})
})

export const authRouter =router;