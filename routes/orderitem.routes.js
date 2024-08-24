import getorderitem from "../controllers/orderitems.controller";
import checkRole from "../middlewares/admin.middleware.js";
import adminrole from "../middlewares/admin.middleware.js";
import express from "express";

const Router=express.Router();
Router.get("/orderitems",adminrole,getorderitem.getorderitem);
Router.post("/postorder",checkRole,getorderitem.postorderitem);
Router.patch("/updateorder",adminrole,getorderitem.getorderitem);
Router.delete("/deleteorder",adminrole,getorderitem.deleteorderitem);

export default Router;