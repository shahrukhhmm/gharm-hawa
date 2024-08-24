import multer from "multer";
import deal from "../controllers/deals.controllers.js";
import adminrole from "../middlewares/admin.middleware.js";
import express from "express";
import multerfile from "../helpers/multer.helper.js";

const Router=express.Router();
Router.get("/getalldeal",deal.getall);
Router.post("/postdeal",multerfile("deals"),deal.postdeal);
Router.patch("/updatedeal",multerfile("deals"),deal.updatedeals);
Router.delete("/deletedeal",adminrole,deal.deletedeal);

export default Router;