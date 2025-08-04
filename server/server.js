import express from 'express';
import mongoose, { get } from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import {authRouter} from './routes/auth-routes.js'
import { AdminProductRouter } from './routes/admin/productRoutes.js';
import { ProductFilterRouter } from './routes/shop/product-routes.js';
import { CartRouter } from './routes/shop/cartroute.js'
import { AddressRouter } from './routes/addressRoutes.js';
import { orderR } from './routes/OrderRoutes.js'
import { ReviewRouter } from './routes/ReviewRoute.js';

dotenv.config();

const app = express();
app.use(express.json())

const dbUser = process.env.USER;
const dbPass = encodeURIComponent(process.env.WEEK); 

try {
  await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.g3jqvlu.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log('✅ Database connection successfull');
} catch (error) {
  console.error('❌MongoDB connection error:', error);
}
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:[
        "Content-Type","Authorization",'Cache-Control','Expires','pragma'
    ],
    credentials:true
}))
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/admin/products',AdminProductRouter)
app.use('/api/shop/products',ProductFilterRouter)
app.use('/api/shop/cart',CartRouter)
app.use('/api/shop/address',AddressRouter)
app.use('/api/order',orderR)
app.use('/api/shop/review',ReviewRouter)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Running at http://localhost:${PORT}`);
});
