import orderitems from "../models/orderitems.model.js";

async function getorderitem(req,res){
    try {
        const orderitem=await orderitems.find();
       res.status(200).send(orderitem);
    } catch (error) {
       return( console.log(error.message));
    }
}

async function postorderitem(req,res){
    try {
         const{quantity,price,order_id, menu_item_id}=req.body;
    const orderitem=await orderitems.create(
        {
           quantity,
           price,
           order_id, 
           menu_item_id
        }
    )
    orderitem.save();
    res.status(200).send(orderitem);
    } catch (error) {
        return(res.status(500).send(error.message));
    }
   
}

async function updateorderitem(req,res){
    try {
        const orderitem=await orderitems.findByIdAndUpdate(req.body._id,{quantity:req.body.quantity,price:req.body.price,order_id:req.body.order_id, menu_item_id:req.body.menu_item_id});
    orderitem.save();
    res.status(200).json({success:true,
        msg:"the orderitems was deleted succesfully"});
    } catch (error) {
        return(res.status(500).send(error.message));
    }
    



}

async function deleteorderitem(req,res){
    try {
        const orderitem=await orderitems.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success:true,
            msg:"the orderitems was deleted succesfully"
        }).send(orderitem);
    } catch (error) {
        return(res.status(500).send(error.message));
    }
}

export default {getorderitem,postorderitem,updateorderitem,deleteorderitem};