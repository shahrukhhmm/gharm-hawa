import getuser from "../controllers/user.controller.js";
import adminrole from "../middlewares/admin.middleware.js";
import express from "express";
import multerfiles from "../helpers/multer.helper.js";
import checkrole from "../middlewares/role.middleware.js";

const Router=express.Router();
Router.get("/getuser",adminrole,getuser.allUsers);
Router.post("/newuser",multerfiles("user"),getuser.userRegister);
Router.post("/login",getuser.login);
Router.patch("/updateuser",getuser.userUpdate);
Router.delete("/deleteuser",checkrole,getuser.userDelete);

export default Router;