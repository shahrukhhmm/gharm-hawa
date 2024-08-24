import reviews from "../models/reviews.model.js";
import dotenv from "dotenv";

dotenv.config();

async function getreview(req,res){
    try {
        const review=await reviews.find();
        res.status(200).send(review);
    } catch (error) {
       return(
        res.status(500).json({
            success:false,
            msg:error.message
        })
       );
    }
}

async function userreviews(req,res){
    try {
        const id=req.body.id;
        const review=await reviews.find({user_id:id});
        res.status(200).send(review);
   
    } catch (error) {
        res.status(500).send("this is server error");
    }
}

async function postreview(req,res){
    try {

         const{rating,comments,user_id}=req.body;
         console.log(rating,comments);
    const review=await reviews.create(
        {
            user_id,
            rating,
            comments,
        }
    )
    await review.save();
    res.status(200).json({
        success:true,
        msg:"posted succesfully"
    })
    } catch (error) {
        return(res.send(error.message));
    }
       
}

async function updatereview(req,res){
    try {
        const review=await reviews.findByIdAndUpdate(req.body.user_id,{rating:req.body.rating,comments:req.body.comments});
    review.save();
    res.status(200).json({
        success:true,
        msg:"updated succesfully"
    })
    } catch (error) {
        return(res.status(500).send(error.message));
    }
    



}

async function deletereview(req,res){
    try {
        const review=await reviews.findByIdAndDelete(req.body._id);
        res.status(200).json({
            succes:true,
            msg:"the review was deleted succesfully"
        })
    } catch (error) {
        return(res.status(500).send(error.message));
    }
}

export default {getreview,postreview,updatereview,deletereview,userreviews};