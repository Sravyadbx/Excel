import { google } from "googleapis";
import { GoogleSpreadSheetClass } from "../../Utils/GoogleSpreadSheet/GoogleSpreadSheetClass.js";
import { genGoogleAuthUrlAndClient } from "../../Configures/Google/GoogleAuthConf.js";
import GFile from "../../Models/GFile/GFile.js"

const appendDataIntoSpredSheetController = async (req, res) => {
  try {
    // Set the auth data first
    const authData = await genGoogleAuthUrlAndClient();
    const authClient = authData.authClient;

    let { tokens } = req.body;

    

    // Handle the refresh token if available
    if (tokens && tokens.refresh_token) {
      try {
        console.log("rew.body refresh tokens ---------", tokens.refresh_token);

        // Set the refresh token to the auth client
        authClient.setCredentials({
          refresh_token: tokens.refresh_token,
        });

        // Refresh the access token using the refresh token
        const credentials = await authClient.refreshAccessToken();
        console.log("Successfully refreshed access token:", credentials);

        // Set the credentials after refreshing the access token
        // authClient.setCredentials(credentials.credentials);
      } catch (err) {
        console.error("Error refreshing access token:", err);
        return res
          .status(500)
          .json({
            message: "Error refreshing access token",
            error: err.message,
          });
      }
    } else {
      console.error("No refresh token available.");
      return res.status(400).json({ message: "No refresh token available" });
    }

    const { filename, range } = req.body;
    const { id } = req.params;


    console.log("range--------------------",range);
    // Default to "Sheet1!A1" if no range is provided
    const sheetRange = range && range.length > 0 ? "Sheet1!"+range : "Sheet1!A1";

    const spreadSheetValues = GoogleSpreadSheetClass.currReadFileData;
    console.log(
      "filename--------",
      filename,
      id,
      sheetRange,
      // spreadSheetValues
    );

    // Check if there is data to append

    if (
      !spreadSheetValues ||
      spreadSheetValues.length === 0 ||
      spreadSheetValues === undefined
    ) {
      return res.status(400).json({ message: "No data to append." });
    }

    // Initialize Google Sheets API client
    const sheets = google.sheets({ version: "v4", auth: authClient });

    try {
      // Create the spreadsheet if necessary
      const createOption = {
        resource: {
          properties: { title: filename },
        },
      };
      

      const response = await sheets.spreadsheets.create(createOption);

      const spreadSheedtId=response?.data?.spreadsheetId;

      
      // Store the newly created spreadsheet ID
      GoogleSpreadSheetClass.setCurrSpreadSheetID(spreadSheedtId);
      console.log("Created spreadsheet:", spreadSheedtId);

      // check is spred sheet is actually created or not
      
      if (spreadSheedtId) {
        // Prepare the append options

        console.log("apppppenenenendndndnding")
        const appendOption = {
          spreadsheetId: spreadSheedtId,
          range: sheetRange,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: spreadSheetValues,
          },
        };

        // Append the data to the spreadsheet
        const appendResponse = await sheets.spreadsheets.values.append(
          appendOption
        );

        if(appendResponse){
        
          console.log("Data appended:", appendResponse.data);
  
          // Respond with success  to api that have called it
          return res.status(201).json({
            message: "Data is updated into the spreadsheet",
            response: appendResponse.data,
          });
        }

        

        return res.status(500).json({message:"failed in appending the data into spreadsheet"});
      }
    } catch (err) {
      console.error("Error appending data:", err);
      return res.status(500).json({
        message: "Error while appending data into spreadsheet",
        error: err.message,
      });
    }
  } catch (error) {

    console.error("Caught error:", error);
    return res.status(500).json({
      message: "Unexpected error",
      error: error.message,
    });
  }
};

const getAllSpreadSheetsController = async (req, res) => {
  try {
    const { roleId } = req.body; 

    if (!roleId) {
      return res.status(400).json({ message: "roleId is required" });
    }

    const spreadsheets = await GFile.find({ roleId });

    if (spreadsheets.length <= 0) {
      return res.status(404).json({ message: "No spreadsheets found for this role" });
    }
    return res.status(200).json({ spreadsheets });
  } catch (error) {
    console.error("Error fetching spreadsheets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getLastUpdatedSheetTime = async (req, res) => {
  try {
    const { roleId, reportId } = req.body;

    if (!roleId || !reportId) {
      return res.status(400).json({ message: "roleId and reportId are required" });
    }

    // Check if a document with the given roleId and reportId exists
    const existingReport = await GFile.findOne({ roleId, reportId });

    if (!existingReport) {
      return res.status(200).json({ message: "No report found for the given role and report ID" });
    }

    // Format the date into a readable format (e.g., "Nov 19, 2021, 10:30 AM")
    const formattedDate = new Date(existingReport.updatedAt).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    res.status(200).json({ lastUpdatedAt: formattedDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  appendDataIntoSpredSheetController,
  getAllSpreadSheetsController,
  getLastUpdatedSheetTime
};
