import mongoose from "mongoose";


const menu=new mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    categories:{
        type:String,
        enum:["HotFries","HotWitches","Salads","HotTenders"],
        required:true
    }
},{
    timestamps: true
  });

const menus=mongoose.model("menu",menu);

export default menus;