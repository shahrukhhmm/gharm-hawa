import getmenu from "../controllers/menu.controller.js";
import multerfile from "../helpers/multer.helper.js"; 
import express from "express";

const Router=express.Router();
Router.get("/getmenu",getmenu.getmenu);
Router.post("/postmenu",multerfile("menu"),getmenu.postmenu);
Router.patch("/updatemenu",multerfile("menu"),getmenu.updatemenu);
Router.delete("/deletemenu",getmenu.deletemenu);

export default Router;