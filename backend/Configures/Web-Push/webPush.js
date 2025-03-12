import webpush from "web-push";
import constants from "../../Constants/constants.js";

webpush.setVapidDetails(
  "mailto:test@test.com",
  constants.web_push_publicKey,
  constants.web_push_privateKey
);

const sendPushNotification = async (subscription, message) => {
  const payload = JSON.stringify({
    message: message || "You have a new message!",
  });

  try {
    await webpush.sendNotification(subscription, payload);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

export { webpush, sendPushNotification };
