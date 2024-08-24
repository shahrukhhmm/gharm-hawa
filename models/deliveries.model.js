import mongoose from "mongoose";


const deliveries=new mongoose.Schema({
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
    ref:"orders"
    },
   delivery_adderess:{
    type:String,
    required:true
   }
},{
    timestamps: true
  });

const delivery=mongoose.model("deliveries",deliveries);

export default delivery;
