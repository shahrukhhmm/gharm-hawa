import getdelivery from "../controllers/deliveries.controller.js";
import express from "express";

const Router=express.Router();
Router.get("/delivery",getdelivery.getdeliveries);
Router.post("/postdelivery",getdelivery.postdeliveries);
Router.patch("/updatedelivery",getdelivery.updatedeliveries);
Router.delete("/deletedelivery",getdelivery.deletedeliveries);

export default Router;