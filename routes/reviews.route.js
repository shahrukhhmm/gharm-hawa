import getreviews from "../controllers/reviews.controller.js";
import admin from "../middlewares/admin.middleware.js";
import express from "express";
import checkRole from "../middlewares/role.middleware.js";

const Router=express.Router();
Router.get("/reviews",getreviews.getreview);
Router.get("/userreview",getreviews.userreviews);
Router.post("/postreview",checkRole,getreviews.postreview);
Router.patch("/updatereview",checkRole,getreviews.updatereview);
Router.delete("/deletereview",checkRole,getreviews.deletereview);

export default Router;