
import deal from "../models/deals.model.js";



const getall=async(req,res)=>{
   const deals =await deal.find();
  res.status(200).send(deals.map(item=>({
    price:item.price,
     path:`http://localhost:3000/${item.path}`,
  })));
    
   
}

async function postdeal(req,res){
    try {
        console.log(req.body);
         let price=req.body.price;
         let path=req.file.path;
        
    const deals=await deal.create(
        {
            price,
            path
        }
    ) 
    console.log(price,path);
    deals.save();
    res.status(200).json({
        success:true,
        msg:"created succesfully"
    });
    } catch (error) {
        return(res.status(500).json({
            success:true,
            msg:error.message
           }));
    }
   
}

async function updatedeals(req,res){
    try {
        const deals=await deal.findByIdAndUpdate(req.body._id,{price:req.body.price,path:req.file.path});
    deals.save();
    res.status(200).json({
        success:true,
        msg:"updated succesfully"
    });
    } catch (error) {
        return(res.status(500).json({
            success:true,
            msg:error.message
           }));
    }
    



}


const deletedeal=async(req,res)=>{
    const deals=await deal.find(req.body._id);
    res.status(200).json({
        succes:true,
        msg:"deleted succesfully"
    })
}

export default {getall,deletedeal,postdeal,updatedeals};