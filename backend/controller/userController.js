import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";

const createToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET)
}

// Login User
const loginUser = async(req,res)=>{
    const {email , password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"Sorry , User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const token = createToken(user._id);
        res.json({
            success:true,
            token
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:"Error while Logging In"
        })
    }
}


// register user
const registerUser = async(req,res) =>{
    const {name,password,email} = req.body;
    try {
        const exist = await userModel.findOne({email});
        // if user alrady exists
        if(exist){
            return res.json({
                success:false,
                message:"User Already exist"
            })
        }

        //else the user is new so we validate user
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter valid Email"
            })
        }
        // if users email is valid we now check for the password

        if(password.length <8){
            return res.json({
                success:false,
                message:"Password not strong enough "
            })
        }
        // now if both email and password are valid we now do encryption
        // blowfish Cipher
        const salt = await bcrypt.genSalt(10);   // (10)->rounds required to generate salt 
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,

        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({
            success:true,
            token
        })


    } catch (error) {
        console.log(console.error());
        res.json({
            success:false,
            message:"Error"

        })
    }
}

export {loginUser , registerUser};
