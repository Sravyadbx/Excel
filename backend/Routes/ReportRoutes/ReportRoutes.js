import express from "express";
import {
  abortPolling,
  checkStatusOfReportGenerationController,
  generateDownloadUrlController,
} from "../../Controllers/Reports/ReportsController.js";

import rateLimtterMiddleware from "../../Middleware/RateLimitMiddleware.js";
const route = express.Router();

route.post("/checkReportStatus",rateLimtterMiddleware, checkStatusOfReportGenerationController);

route.post("/generateDownloadUrl", generateDownloadUrlController);
route.post("/abort-request",abortPolling)
export default route;


// import express from "express";
// import {
//   checkStatusOfReportGenerationController,
//   generateDownloadUrlController,
// } from "../../Controllers/Reports/ReportsController.js";

// import rateLimtterMiddleware from "../../Middleware/RateLimitMiddleware.js";
// const route = express.Router();

// route.post("/checkReportStatus",rateLimtterMiddleware, checkStatusOfReportGenerationController);

// route.post("/generateDownloadUrl", generateDownloadUrlController);
// export default route;
