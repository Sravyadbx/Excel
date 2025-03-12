import constants from "./Constants/constants.js";
import ConnectDB from "./Connections/db.js";
import app from "./app.js";

import ReportRoutes from "./Routes/ReportRoutes/ReportRoutes.js"
import UserRoutes from "./Routes/UserRoutes/UserRoutes.js";
import GoogleSheetRoutes from "./Routes/GoogleSheetRoutes/GoogleSheetRoute.js";
import pushNotificationRoutes from "./Routes/PushNotifications/pushNotification.js";

import redisClient from "./Connections/reddis.js"

app.use(ReportRoutes);
app.use(pushNotificationRoutes);
app.use(UserRoutes);
app.use(GoogleSheetRoutes);


ConnectDB().then(()=>{
    app.listen(constants.PORT,async()=>{
        console.log(`listening on the port ${constants.PORT}`)
        await redisClient.connect();
    })
})


