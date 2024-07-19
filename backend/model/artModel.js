import mongoose from "mongoose";

const artSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        description :{
            type:String,
            require:true
        },
        price:{
            type:Number,
            require:true
        },
        image:{
            type:String,
            require:true
        },
        category:{
            type:String,
            require:true
        }
})

// we need to create the schema once so if it is present it will be good
const artModel = mongoose.model.art || mongoose.model("art" , artSchema);
export default artModel;