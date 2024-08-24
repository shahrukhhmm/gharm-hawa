import deliverie from "../models/deliveries.model.js";

async function getdeliveries(req,res){
    try {
        const deliveries=await deliverie.find();
      res.status(200).send(deliveries);
    } catch (error) {
       return(res.status(500).json({
        success:true,
        msg:error.message
       }));
    }
}

async function postdeliveries(req,res){
    try {
         const{delivery_adderess,order_id}=req.body;
    const deliveries=await deliverie.create(
        {
            delivery_adderess,
            order_id
        }
    )
    deliveries.save();
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

async function updatedeliveries(req,res){
    try {
        const deliveries=await deliverie.findByIdAndUpdate(req.body._id,{order_id:req.body.order_id,delivery_adderess:req.body.delivery_adderess});
    deliveries.save();
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

async function deletedeliveries(req,res){
    try {
        const deliveries=await deliverie.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success:true,
            msg:"deleted succesfully"
        });
    } catch (error) {
        return(res.status(500).json({
            success:true,
            msg:error.message
           }));
    }
}

export default {getdeliveries,postdeliveries,updatedeliveries,deletedeliveries};