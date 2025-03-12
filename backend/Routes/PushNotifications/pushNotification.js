import express from "express";
import { setSubscriptionToRedis } from "../../Controllers/WebPush/webPushController.js";
const router=express.Router();


router.post("/sendTokenForWebPush",setSubscriptionToRedis);


export default router;