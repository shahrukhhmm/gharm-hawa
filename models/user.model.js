import mongoose from "mongoose";


const user=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
    },
    password:{
        type:String,
        required:true
    }
    ,
    role:{
        type:String,
        enum:["admin","customer"],
        default:"customer",
    }
},{
    timestamps: true
  });

const users=mongoose.model("user",user);

export default users;