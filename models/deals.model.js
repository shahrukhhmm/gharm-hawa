import mongoose from "mongoose";



const deal=new mongoose.Schema(
    {   image:{
           type:Buffer
    },
        path:{
            type:String,
            required:true
        },
        price:{
            type:Number
        }
    }
)

const deals=mongoose.model("deal",deal);
export default deals;
