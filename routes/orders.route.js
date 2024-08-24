import orders from "../controllers/orders.controller.js";
import express from "express";
import admin from "../middlewares/admin.middleware.js";
import checkRole from "../middlewares/role.middleware.js";

const Router=express.Router();
Router.get("/getorder",orders.getOrders);
Router.post("/postorder",orders.createOrder);
Router.patch("/updateorder",orders.updateOrder);
Router.delete("/deleteorder",orders.deleteOrder);

export default Router;