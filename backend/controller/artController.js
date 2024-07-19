import artModel from '../model/artModel.js'
import fs from 'fs'


const addArt = async (req,res) =>{
     
    let image_filename = `${req.file.filename}`;
    const art = new artModel({
        name:req.body.name,
        description :req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    })
    try {
        await art.save();
        res.json({
            success:true,
            message:"ART ADDED"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Sorry! something went wrong"
        })
    }

}
// showcasing the list of art items
const listArt = async(req,res)=>{
    try{
        const art_list = await artModel.find({});
        res.status(200).json({
            success:"true",
            data:art_list
        })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            success:"false",
        })
    }
}
// deleting the art items (both from db and uploads folder)
const removeArt = async(req,res)=>{
   try{
        const art = await artModel.findById(req.body.id);
        fs.unlink(`uploads/${art.image}` , ()=>{});
        await artModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true , message:"ITEM DELETED"})
   }
   catch(e){
        console.log(e);
        res.status(400).json({
            success:false,
            message:"Unable to Delete"
        })
   }
}
export  {addArt,listArt,removeArt};