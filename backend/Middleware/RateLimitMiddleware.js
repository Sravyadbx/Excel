import redisClient from "../Connections/reddis.js";
import { sendPushNotification } from "../Configures/Web-Push/webPush.js";
const rateLimitMiddleware = async (req, res, next) => {
  const clientIp = req.ip;
  let { pushNotifuSubscription } = req.body;
  const rateLimitKey = `rateLimit:${clientIp}`;
  const limit = 100;
  const expiry = 60 * 60;
  try {
    const rateLimitData = await redisClient.get(rateLimitKey);

    if (rateLimitData === null) {
      const data = {
        hitCount: 1,
        firstRequestTime: Date.now(),
      };

      await redisClient.set(rateLimitKey, JSON.stringify(data), "EX", expiry);
      return next();
    } else {
      const parsedData = JSON.parse(rateLimitData);
      console.log("data--", parsedData);

      // chek for  the expiry time is passed then set the cnt=0 and new timestamp
      const currTime = Date.now();

      if (currTime - parsedData.firstRequestTime >= 3600000) {
        const data = {
          hitCount: 1,
          firstRequestTime: Date.now(),
        };

        await redisClient.set(rateLimitKey, JSON.stringify(data), "EX", expiry);
        return next();
      }

      if (parsedData.hitCount < limit) {
        parsedData.hitCount += 1;
        await sendPushNotification(
          JSON.parse(pushNotifuSubscription),
          `you have ${limit - parsedData?.hitCount} attempts remaining!`
        );
        await redisClient.set(
          rateLimitKey,
          JSON.stringify(parsedData),
          "EX",
          expiry
        );
        return next();
      } else {
        await sendPushNotification(
          JSON.parse(pushNotifuSubscription),
          "Rate limit exceeded. Please try again later."
        );
        return res.status(429).json({
          message: "Rate limit exceeded. Please try again later.",
        });
      }
    }
  } catch (error) {
    console.error("Error in rate limiting:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  } finally {
   
  }
};

export default rateLimitMiddleware;
