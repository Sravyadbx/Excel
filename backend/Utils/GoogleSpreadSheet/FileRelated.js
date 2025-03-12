// import readline from "readline";
// import { Stream } from "stream";
// import { sendPushNotification } from "../../Configures/Web-Push/webPush.js";


// const appendDataToGSheet = async (data) => {
//   const {
//     downloadResponse,
//     sheets,
//     spreadSheetId,
//     sheetRange,
//     pushNotifuSubscription,
//   } = data;

//   return new Promise((resolve, reject) => {
//     const rl = readline.createInterface({
//       input: downloadResponse.body,
//       output: new Stream.Writable(),
//       terminal: false,
//     });

//     const appendData = [];

//     const rowThreshould = 100;

//     let rowCnt = 0;
//     rl.on("line", (line) => {
//       const row = line.split(",");
//       appendData.push(row);
//       rowCnt++;
//     });

//     rl.on("close", async () => {
//       try {
//         if (rowCnt >= rowThreshould) {
//           try {
//             await sendPushNotification(
//               JSON.parse(pushNotifuSubscription),
//               "data is to large to append in spreadShee it requires some time"
//             );
//           } catch (error) {
//             console.error(error)
//           }
//         }
//         console.log(`🔹 Target Range: ${sheetRange}`);

//         // Extract column letter and row number from "Sheet1!AP10"
//         const rangeMatch = sheetRange.match(/!([A-Z]+)(\d+)/);
//         if (!rangeMatch) {
//           throw new Error(`Invalid sheetRange format: ${sheetRange}`);
//         }
//         const rangeColumnLetter = rangeMatch[1]; // Extracted column letters (e.g., "AP")
//         const rangeRowIndex = parseInt(rangeMatch[2], 10); // Extracted row number (e.g., 10)
//         const rangeColumnIndex = letterToColumnIndex(rangeColumnLetter); // Convert column to number

//         console.log(`Extracted Column: ${rangeColumnLetter}, Row: ${rangeRowIndex}`);
//         console.log(`Converted Column Index: ${rangeColumnIndex}`);

//         // Get sheet metadata
//         const sheetMetadata = await sheets.spreadsheets.get({
//           spreadsheetId: spreadSheetId,
//         });

//         const sheet = sheetMetadata.data.sheets.find(
//           (s) => s.properties.title === "Sheet1"
//         );

//         if (!sheet) {
//           throw new Error("Sheet1 does not exist in the spreadsheet.");
//         }

//         const lastColIndex = sheet.properties.gridProperties.columnCount;
//         const lastRowIndex = sheet.properties.gridProperties.rowCount;

//         console.log(`Sheet Info - Last Column: ${lastColIndex}, Last Row: ${lastRowIndex}`);

//         // Get CSV Data Dimensions
//         const csvRowCount = appendData.length;
//         const csvColCount = Math.max(...appendData.map((row) => row.length)); // Max column count

//         console.log(`CSV Data - Rows: ${csvRowCount}, Columns: ${csvColCount}`);

//         // Determine if CSV Overlaps with Existing Data**
//         const endRowIndex = rangeRowIndex + csvRowCount - 1;
//         const endColumnIndex = rangeColumnIndex + csvColCount - 1;

//         console.log(`CSV Data will be placed from Row ${rangeRowIndex} to ${endRowIndex}`);
//         console.log(`CSV Data will be placed from Column ${rangeColumnLetter} to ${columnIndexToLetter(endColumnIndex)}`);

//         const overlapRange = `Sheet1!${rangeColumnLetter}${rangeRowIndex}:${columnIndexToLetter(endColumnIndex)}${endRowIndex}`;

//         if (endRowIndex <= lastRowIndex && endColumnIndex <= lastColIndex) {
//           console.log(`Overlapping range detected: ${overlapRange}, clearing existing data.`);

//           // Clear only overlapping range**
//           await sheets.spreadsheets.values.clear({
//             spreadsheetId: spreadSheetId,
//             range: overlapRange,
//           });
//         } else {
//           console.log(`No overlapping data detected. Skipping clear operation.`);
//         }

//         // Append new data**
//         const appendResponse = await sheets.spreadsheets.values.update({
//           spreadsheetId: spreadSheetId,
//           range: sheetRange,
//           valueInputOption: "RAW",
//           requestBody: {
//             values: appendData,
//           },
//         });
//         console.log(appendResponse);
//         resolve({ message: "Data successfully updated in GSheet", appendResponse });
//       } catch (error) {
//         console.error("Error while updating Google Sheet:", error);
//         reject({ error: error.message });
//       }
//     });

//     rl.on("error", (err) => {
//       reject({ error: err.message });
//     });
//   });
// };

// // Convert Column Letter to Index
// const letterToColumnIndex = (letter) => {
//   let column = 0;
//   for (let i = 0; i < letter.length; i++) {
//     column = column * 26 + (letter.charCodeAt(i) - "A".charCodeAt(0) + 1);
//   }
//   return column;
// };

// //Convert Index to Column Letter
// const columnIndexToLetter = (index) => {
//   let letter = "";
//   while (index > 0) {
//     index--;
//     letter = String.fromCharCode((index % 26) + 65) + letter;
//     index = Math.floor(index / 26);
//   }
//   return letter;
// };


// export { appendDataToGSheet };






import readline from "readline";
import { Stream } from "stream";
import { sendPushNotification } from "../../Configures/Web-Push/webPush.js";

const appendDataToGSheet = async (data) => {
  const {
    downloadResponse,
    sheets,
    spreadSheetId,
    sheetRange,
    pushNotifuSubscription,
  } = data;

  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: downloadResponse.body,
      output: new Stream.Writable(),
      terminal: false,
    });

    const appendData = [];
    const rowThreshould = 100;
    let rowCnt = 0;

    rl.on("line", (line) => {
      const row = line.split(",");
      appendData.push(row);
      rowCnt++;
    });

    rl.on("close", async () => {
      try {
        if (rowCnt >= rowThreshould) {
          try {
            await sendPushNotification(
              JSON.parse(pushNotifuSubscription),
              "Data is too large to append in the spreadsheet; it requires some time."
            );
          } catch (error) {
            console.error(error);
          }
        }

        console.log(`🔹 Target Range: ${sheetRange}`);

        // Extract column letter and row number from "Sheet1!AP10"
        const rangeMatch = sheetRange.match(/!([A-Z]+)(\d+)/);
        if (!rangeMatch) {
          throw new Error(`Invalid sheetRange format: ${sheetRange}`);
        }
        const rangeColumnLetter = rangeMatch[1]; // Extracted column letters (e.g., "AP")
        const rangeRowIndex = parseInt(rangeMatch[2], 10); // Extracted row number (e.g., 10)
        const rangeColumnIndex = letterToColumnIndex(rangeColumnLetter); // Convert column to number

        console.log(`Extracted Column: ${rangeColumnLetter}, Row: ${rangeRowIndex}`);
        console.log(`Converted Column Index: ${rangeColumnIndex}`);

        // Get sheet metadata
        const sheetMetadata = await sheets.spreadsheets.get({
          spreadsheetId: spreadSheetId,
        });

        const sheet = sheetMetadata.data.sheets.find(
          (s) => s.properties.title === "Sheet1"
        );

        if (!sheet) {
          throw new Error("Sheet1 does not exist in the spreadsheet.");
        }

        let lastColIndex = sheet.properties.gridProperties.columnCount;
        let lastRowIndex = sheet.properties.gridProperties.rowCount;

        console.log(`Sheet Info - Last Column: ${lastColIndex}, Last Row: ${lastRowIndex}`);

        // Get CSV Data Dimensions
        const csvRowCount = appendData.length;
        const csvColCount = Math.max(...appendData.map((row) => row.length)); // Max column count

        const endRowIndex = rangeRowIndex + csvRowCount - 1;
        const endColumnIndex = rangeColumnIndex + csvColCount - 1;

        console.log(`CSV Data will be placed from Row ${rangeRowIndex} to ${endRowIndex}`);
        console.log(`CSV Data will be placed from Column ${rangeColumnLetter} to ${columnIndexToLetter(endColumnIndex)}`);

        // **Expand rows if needed**
        if (endRowIndex > lastRowIndex) {
          console.log(`Expanding rows to ${endRowIndex}...`);
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId: spreadSheetId,
            requestBody: {
              requests: [
                {
                  updateSheetProperties: {
                    properties: {
                      sheetId: sheet.properties.sheetId,
                      gridProperties: {
                        rowCount: endRowIndex, // Set new row count
                      },
                    },
                    fields: "gridProperties.rowCount",
                  },
                },
              ],
            },
          });
          lastRowIndex = endRowIndex; // Update the row count
        }

        // **Expand columns if needed**
        if (endColumnIndex > lastColIndex) {
          console.log(`Expanding columns to ${columnIndexToLetter(endColumnIndex)}...`);
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId: spreadSheetId,
            requestBody: {
              requests: [
                {
                  updateSheetProperties: {
                    properties: {
                      sheetId: sheet.properties.sheetId,
                      gridProperties: {
                        columnCount: endColumnIndex, // Set new column count
                      },
                    },
                    fields: "gridProperties.columnCount",
                  },
                },
              ],
            },
          });
          lastColIndex = endColumnIndex; // Update the column count
        }

        // Append new data
        const appendResponse = await sheets.spreadsheets.values.update({
          spreadsheetId: spreadSheetId,
          range: sheetRange,
          valueInputOption: "RAW",
          requestBody: {
            values: appendData,
          },
        });

        console.log(appendResponse);
        resolve({ message: "Data successfully updated in GSheet", appendResponse });
      } catch (error) {
        console.error("Error while updating Google Sheet:", error);
        reject({ error: error.message });
      }
    });

    rl.on("error", (err) => {
      reject({ error: err.message });
    });
  });
};

// Convert Column Letter to Index
const letterToColumnIndex = (letter) => {
  let column = 0;
  for (let i = 0; i < letter.length; i++) {
    column = column * 26 + (letter.charCodeAt(i) - "A".charCodeAt(0) + 1);
  }
  return column;
};

// Convert Index to Column Letter
const columnIndexToLetter = (index) => {
  let letter = "";
  while (index > 0) {
    index--;
    letter = String.fromCharCode((index % 26) + 65) + letter;
    index = Math.floor(index / 26);
  }
  return letter;
};

export { appendDataToGSheet };
