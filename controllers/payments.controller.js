import payments from "../models/payments.model.js";


async function getpayment(req,res){
    try {
        const payment=await payments.find();
       res.status(200).send(payment);
    } catch (error) {
       return(
        res.status(500).json({
          success:false,
          msg:error.message  
        })
       );
    }
}
async function personpayment(req,res){
    try {
        const id=req.body.id;
        const payment=await payments.find({id});
       res.status(200).send(payment);
    } catch (error) {
       return(
        res.status(500).json({
          success:false,
          msg:error.message  
        })
       );
    }
}
async function postpayment(req,res){
    try {
         const{amount,paymentmethod,paymentstatus,order_id}=req.body;
    const payment=await payments.create(
        {
            amount,
            paymentmethod,
            paymentstatus,
            order_id
        }
    )
       payment.save();
    res.status(200).json({
        success:true,
        msg:"payment succesfully"
    })
    } catch (error) {
        return(res.send(error.message));
    }
   
}

async function updatepayment(req,res){
    try {
        const payment=await payments.findByIdAndUpdate(req.body._id,{amount:req.body.amount,paymentmethod:req.body.paymentmethod,paymentstatus:req.body.paymentstatus});
    payment.save();
    res.status(200).json({
        success:true,
        msg:"updated succesfully"
    })
    } catch (error) {
        return(res.send(error.message));
    }
}

async function deletepayment(req,res){
    try {
        const payment=await payments.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success:true,
            msg:"deleted succesfully"
        })
    } catch (error) {
        return(res.send(error.message));
    }
}


export default {getpayment,postpayment,updatepayment,deletepayment,personpayment};