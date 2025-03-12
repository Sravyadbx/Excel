import express from "express";
import {  loginUserOAuthController,handelCallBackUrlController } from "../../Controllers/Users/UserController.js";

const route=express();


route.get("/loginUserToOAuth",loginUserOAuthController)

route.get("/auth/callback",handelCallBackUrlController)



export default route;