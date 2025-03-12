
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

// Store active requests
const activeRequests = new Map();

// Mock function to simulate calling the status API
const CallStatusApi = async (payload) => {
  const { addInToken, report_id } = payload;

  try {
    const response = await fetch(
      `https://reports.qa.darwinbox.io/ms/reportapi/reports/statuses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addInToken,
          report_id,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    return new Error(error);
  }
};

// Endpoint to start long-polling
app.post("/check-status", (req, res) => {
  const { reportId, requestId } = req.body;

  if (!requestId) {
    return res.status(400).send("Request ID is required");
  }

  // Store the response object for this request
  activeRequests.set(requestId, res);

  const longPolling = async () => {
    if (!activeRequests.has(requestId)) {
      console.log(`Request ${requestId} aborted or completed`);
      return;
    }

    console.log(`Polling for status (request: ${requestId})...`);
    const statusResponse = await CallStatusApi({
      addInToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMzA5NTciLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY3MzAyLCJleHAiOjE3NDU4NDMzMDJ9.wv5HZP8TVefN-kuVZFw_t2N95v243Iv85enhAsFZcW0",
      report_id: "1924ca8dcfa17c",
    });

    if (statusResponse) {
      console.log("Status response:", statusResponse);

      if (
        statusResponse?.status === 200 &&
        statusResponse?.message?.status === "Done"
      ) {
        if (activeRequests.has(requestId)) {
          activeRequests.get(requestId).status(200).json({ status: "Done", data: statusResponse });
          activeRequests.delete(requestId); // Clean up
        }
      } else if (
        statusResponse?.status === 200 &&
        statusResponse?.message?.status === "No Data"
      ) {
        if (activeRequests.has(requestId)) {
          activeRequests.get(requestId).status(200).json({ status: "No Data", data: statusResponse });
          activeRequests.delete(requestId); // Clean up
        }
      } else {
        // Continue polling after 1 second
        setTimeout(longPolling, 1000);
      }
    }
  };

  // Start long-polling
  longPolling();
});

// Endpoint to abort a request
app.post("/abort-request", (req, res) => {
  const { requestId } = req.body;

  if (!requestId) {
    return res.status(400).send("Request ID is required");
  }

  if (activeRequests.has(requestId)) {
    console.log(`Aborting request: ${requestId}`);
    activeRequests.get(requestId).status(499).send("Request aborted by user");
    activeRequests.delete(requestId); // Clean up
    res.status(200).send("Request aborted successfully");
  } else {
    res.status(404).send("Request not found");
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});