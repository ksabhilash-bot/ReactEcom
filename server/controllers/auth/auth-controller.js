import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {User} from '../../models/User.js'
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({email})
    if(checkUser) return res.json({success:false,message:"User already exist with the same Email"})
    const hashedpassword=await bcrypt.hash(password,12);
    const newUser = new User({
        username,email,password:hashedpassword
    });
    await newUser.save();
    res.status(200).json({success:true,
        registration:"Successfull registration"
    })

  } catch (error) {
    console.log("Error:",error);
    res.status(500).json({success:false,
        message:"Some Error Occured"
    })
  }
};

const loginUser = async (req, res) => {
  const {email, password } = req.body;
  try {
    const checkUser = await User.findOne({email})
    if(!checkUser) return res.json({success:false,message:"User doesn't exist"})
    const checkPassword=await bcrypt.compare(password,checkUser.password);
  if(!checkPassword){
    return res.json({success:false,message:"Incorrect Password"})
  }
  const token = jwt.sign({id:checkUser._id,role:checkUser.role,email:checkUser.email,username:checkUser.username},'CLIENT_SECRET_KEY',{expiresIn:"30m"})
  res.cookie('token',token,{httpOnly:true,secure:false}).json({success:true,message:"LoggedIn",user:{email:checkUser.email,username:checkUser.username,role:checkUser.role,id:checkUser._id}})

  } catch (error) {
    console.log("Error:",error);
    res.status(500).json({success:false,
        message:"Some Error Occured"
    })
  }
};
const logout=async(req,res)=>{
  res.clearCookie('token').json({
    success:true,
    message:"Logged Out"
  })

}
//auth middleware
const authMiddleware=async(req,res,next)=>{
const token =req.cookies.token;
if(!token){return res.json({success:false,message:"Unauthorized User"})}
try {
  const decoded= jwt.verify(token,'CLIENT_SECRET_KEY');
  req.user=decoded;
  next()
} catch (error) {
  res.status(401).json({success:false,message:"Unauthorized User"})
}
}
export { registerUser, loginUser,logout,authMiddleware};


