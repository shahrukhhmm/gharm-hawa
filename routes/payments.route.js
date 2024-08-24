import getpayments from "../controllers/payments.controller.js";
import express from "express";
import admin from "../helpers/multer.helper.js";
import checkRole from "../middlewares/role.middleware.js";
const Router=express.Router();
Router.get("/getpayments",admin,getpayments.getpayment);
Router.post("/postpayments",checkRole,getpayments.postpayment);
Router.patch("/updatepayments",admin,getpayments.updatepayment);
Router.delete("/deletepayments",admin,getpayments.deletepayment);

export default Router;