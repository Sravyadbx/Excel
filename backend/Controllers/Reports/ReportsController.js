

import {
  CallStatusApi,
  CallGenReportApi,
  CallDownUrl,
} from "../../Utils/Reports/ReportsUtils.js";
import fetch from "node-fetch";

import { genGoogleAuthUrlAndClient } from "../../Configures/Google/GoogleAuthConf.js";
import { google } from "googleapis";

import GFileModel from "../../Models/GFile/GFile.js";

import { appendDataToGSheet } from "../../Utils/GoogleSpreadSheet/FileRelated.js";

import { sendPushNotification } from "../../Configures/Web-Push/webPush.js";
const activeRequests = new Map();
let setTimeOutId;
const checkStatusOfReportGenerationController = async (req, res) => {
  let {
    addInToken,
    report_id,
    timeOut,
    tokens,
    range, 
    role_id,
    requestId,
    pushNotifuSubscription,
  } = req.body;
  if (!requestId) {
    return res.status(400).send("Request ID is required");
  }
  activeRequests.set(requestId, res);
  const timeLimit = timeOut || 100000;
  console.log(tokens);

  tokens = JSON.parse(tokens);
  const generateReportResponse = await CallGenReportApi({
    addInToken,
    id: report_id,
  });

  // let setTimeOutId;
  let responseSent = false; // Declare only once

  const longPolling = async () => {
    if (!activeRequests.has(requestId)) {
      console.log(`Request ${requestId} aborted or completed`);
      return;
    }
    console.log(`Polling for status (request: ${requestId})...`);
    const statusResponse = await CallStatusApi({
      addInToken,
      report_id,
    });

    if (statusResponse) {
      console.log(statusResponse);
      if (
        statusResponse?.status === 200 &&
        statusResponse?.message?.status === "Done"
      ) {
        clearTimeout(setTimeOutId);
        if (activeRequests.has(requestId)) {
          // activeRequests.get(requestId).status(200).json({ status: "Done", data: statusResponse });
          activeRequests.delete(requestId); // Clean up
        }

        const getDownloadUrlResponse = await fetch(
          "http://localhost:8080/generateDownloadUrl",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              addInToken,
              report_id,
              tokens,
              range,
              role_id,
              pushNotifuSubscription,
            }),
          }
        );

        if (getDownloadUrlResponse) {
          const downloadData = await getDownloadUrlResponse.json();

          if (!responseSent) {
            responseSent = true;
            return res.status(200).json(downloadData);
          }
        }
      } else if (
        statusResponse?.status === 200 &&
        statusResponse?.message?.status === "No Data"
      ) {
        clearTimeout(setTimeOutId);  // Stop timeout
        if (activeRequests.has(requestId)) {
          // activeRequests.get(requestId).status(200).json({ status: "No Data", data: statusResponse });
          activeRequests.delete(requestId); // Clean up
        }
        if (!responseSent) {
          responseSent = true;
          // console.log("no data")
          await sendPushNotification(
            JSON.parse(pushNotifuSubscription),
            "No Data"
          );
          return res
            .status(200)
            .json({ message: "No data found", statusResponse });
        }
      } else {
        if (activeRequests.has(requestId)) {
          setTimeOutId = setTimeout(longPolling, 1000); // Continue polling only if not aborted
        }
      }
    }
  };

  try {
    if (generateReportResponse) {
       await longPolling();

      // setTimeout(() => {
      //   if (!responseSent) {
      //     responseSent = true;
      //     console.log("timeout error")
      //     return res.status(408).json({
      //       message: `Timeout for checking status of report generation, report_id = ${report_id}`,
      //     });
      //   }
      // }, timeLimit);

      setTimeOutId = setTimeout(() => {
        if (!responseSent && activeRequests.has(requestId)) {
          responseSent = true;
          activeRequests.delete(requestId);
          console.log("Timeout error");
          // clearTimeout(setTimeOutId);
          return res.status(408).json({
            message: `Timeout for checking status of report generation, report_id = ${report_id}`,
          });
        }
      }, timeLimit);
      
    }
  } catch (error) {
    console.log(error.message);
    if (!responseSent) {
      responseSent = true;
      return res.status(500).json({ message: error.message });
    }
  }
};

const abortPolling =async(req,res)=>
{
  const { requestId ,pushNotifuSubscription,} = req.body;

  if (!requestId) {
    return res.status(400).send("Request ID is required");
  }

  if (activeRequests.has(requestId)) {
    console.log(`Aborting request: ${requestId}`);
    clearTimeout(setTimeOutId);
    
    // activeRequests.get(requestId).status(499).send("Request aborted by user");
    activeRequests.delete(requestId); // Clean up
     await sendPushNotification(
      JSON.parse(pushNotifuSubscription),
      "Report Generation Aborted!"
    );
    res.status(200).json({message :"Request aborted successfully"});
  } else {
    res.status(404).send({message :"Request not found"});
  }
}

const generateDownloadUrlController = async (req, res) => {
  try {
    let {
      addInToken,
      report_id,
      tokens,
      range,
      role_id,
      pushNotifuSubscription,
    } = req.body;

    const response = await CallDownUrl({ addInToken, report_id });
    // console.log(response);
    // const response = "https://people.sc.fsu.edu/~jburkardt/data/csv/airtravel.csv"
    if (!response ||!response.message) {
      return res
        .status(500)
        .json({ message: "Failed to get a valid URL from the service." });
    }

    const downloadUrl = response.message;
    const downloadResponse = await fetch(downloadUrl);
    // const downloadResponse = await fetch(response)

    if (!downloadResponse.ok) {
      return res.status(500).json({
        message: `Failed to download file. Status: ${downloadResponse.status} - ${downloadResponse.statusText}`,
      });
    }

    const authData = await genGoogleAuthUrlAndClient();
    const authClient = authData.authClient;

    if (tokens && tokens.refresh_token) {
      try {
        authClient.setCredentials({
          refresh_token: tokens.refresh_token,
        });
        await authClient.refreshAccessToken();
      } catch (err) {
        console.error("Error refreshing access token:", err);
        return res.status(500).json({
          message: "Error refreshing access token",
          error: err.message,
        });
      }
    } else {
      console.error("No refresh token available.");
      return res.status(400).json({ message: "No refresh token available" });
    }

    const sheets = google.sheets({ version: "v4", auth: authClient });
    const fileName = role_id + report_id;
    const filePresent = await GFileModel.find({ fileName });

    if (filePresent.length > 0) {
      const spreadSheetId = filePresent[0]?.spreadSheetId;
      const sheetRange = range && range.length > 0 ? "Sheet1!" + range : "Sheet1!A1";
      console.log("sheetRange", sheetRange);

      const appendResponse = await appendDataToGSheet({
        spreadSheetId,
        fileName,
        downloadResponse,
        sheets,
        sheetRange,
        pushNotifuSubscription
      });

      if (appendResponse) {
        await GFileModel.findOneAndUpdate(
          { fileName },
          { $set: { updatedAt: new Date() } }
        );
        await sendPushNotification(
          JSON.parse(pushNotifuSubscription),
          "Spreadsheet has been updated!"
        );
        return res
          .status(201)
          .json({ message: "GSheet updated successfully", appendResponse });
      }
      await sendPushNotification(
        JSON.parse(pushNotifuSubscription),
        "Failed in appending data to Gsheet"
      );
      return res
        .status(500)
        .json({ message: "Failed in appending data to GSheet" });
    } else {
      const createOption = {
        resource: { properties: { title: fileName } },
      };

      const createSpreadSheet = await sheets.spreadsheets.create(createOption);
      const spreadSheetId = createSpreadSheet?.data?.spreadsheetId;

      await GFileModel.create({
        fileName,
        roleId: role_id,
        reportId: report_id,
        spreadSheetId,
      });

      const sheetRange = range && range.length > 0 ? "Sheet1!" + range : "Sheet1!A1";

      const appendResponse = await appendDataToGSheet({
        spreadSheetId,
        fileName,
        downloadResponse,
        sheets,
        sheetRange,
      });

      console.log("pushNotifuSubscription--", pushNotifuSubscription);
      if (appendResponse !== false) {
        await sendPushNotification(
          JSON.parse(pushNotifuSubscription),
          "Spreadsheet has been updated!"
        );

        return res.status(201).json({
          message: "GSheet created successfully",
          data: appendResponse?.appendResponse,
        });
      }
      await sendPushNotification(
        JSON.parse(pushNotifuSubscription),
        "Failed in appending data to Gsheet"
      );
      return res
        .status(500)
        .json({ message: "Failed in appending data to GSheet" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export {
  checkStatusOfReportGenerationController,
  generateDownloadUrlController,
  abortPolling
};
