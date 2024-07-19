import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import artRouter from './routes/artRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config';
import dotenv from 'dotenv'

const app = express();
const PORT_NO = process.env.PORT || 4000;

// middlewares
app.use(express.json()); // parses request from frontend to backend
app.use(cors());

connectDB();
// mounting '/api/art' path on localhost and then rendering our artRouter
app.use('/api/art' , artRouter);
app.use('/images' , express.static('uploads')); // by using express.static we could use to access static files like images,videos
app.use('/api/user' , userRouter);
app.use('/api/cart' , cartRouter);
app.use('/api/order' , orderRouter);

app.get("/" , (req,res) =>{
    res.status(200).send("API WORKING")
})

app.listen(PORT_NO , (req,res)=>{
    console.log(`App running at port on http://localhost:${PORT_NO}`);
})
