import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Stripe from "stripe";
import 'dotenv/config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 
// 
// placing user order from frontend

const placeOrder = async(req,res)=>{

    const frontend_url = 'https://artvendor.onrender.com/'

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save(); // saves order in db

        // to clean users cart DAta
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        // console.log("1");

        const line_items = req.body.items.map(
            (item)=>({
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100*82, // to convert price in ruppees
                },
                quantity:item.quantity
            })
        )
        // console.log("2");
        // delivery charges
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*82
            },
            quantity:1
        })
        // console.log("3");
        
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            payment_method_types:["card"],
            // defining payment fail or success ?
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({
            success:true,
            session_url:session.url
        })


    } catch (error) {
        
        console.log(error.message);
        res.json({
            success:false,
            message:"Error"
        })

    }
}

const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body;
    try {
        if(success == 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({
                success:true,
                message:"Paid"
            })
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success:false,
                message:"Not Paid"
            })
        }
    } 
    catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

// user orders for frontend
const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"error"
        })
    }
}

// to get all orders of all users
// listing orders for admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({
            success:true,
            data:orders
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

// api fro updating order status
const updateStatus = async(req,res)=>{

    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({
            success:true,
            message:"Status Updated!"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
