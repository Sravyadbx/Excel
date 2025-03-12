import redisClient from "../../Connections/reddis.js";


let pushNotifyKey;
const setSubscriptionToRedis = async (req, res) => {
  try {
    const subscription = req.body;
    const clientIp = req.ip;
     pushNotifyKey = `pushNotify:${clientIp}`;



    const data=await redisClient.get(pushNotifyKey)
    if (data===null)
      await redisClient.set(pushNotifyKey, JSON.stringify(subscription));
   

    console.log("data---",data)
    return res
      .status(201)
      .json({ message: "subscription is set to the redis" });
  } catch (error) {
    console.log("error at push notification",error.message)
    return new Error(error);
  }
};

export { setSubscriptionToRedis,pushNotifyKey };
