import userModel from "../model/userModel.js";

// 1. add to cart 
// 2. get from cart
// 3. remove from cart

// 1.

const addToCart = async (req,res) =>{

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // console.log("hello");
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
            // console.log("created");
        }
        else{
            cartData[req.body.itemId]+=1;
            // console.log("+1");
        }
        await userModel.findByIdAndUpdate(req.body.userId , {cartData});
        res.json({
            success:true,
            message:"Added to Cart"
        })

    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.json({
            success:false,
            message:'Error in adding'
        })
    }
}

//3.
const removeFromCart = async(req,res)=>{

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success:true,
            message:"Removed from Cart"
        })

    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.json({
            success:false,
            message:'Error in removing'
        })
    }
}

//2.
const getCart = async(req,res) =>{

    try {
        let userData = await userModel.findById(req.body.userId);
        // console.log("userdata" , userData);
        let cartData = await userData.cartData;
        res.json({
            success:true,
            cartData
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error in getting cart Items"
        })
    }
}

export {addToCart,removeFromCart,getCart};