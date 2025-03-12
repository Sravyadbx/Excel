import express from "express";
import { appendDataIntoSpredSheetController , getAllSpreadSheetsController, getLastUpdatedSheetTime} from "../../Controllers/GoogleSheets/GoogleSheetController.js";
const route = express.Router();

route.post("/appendDataIntoSpreadSheet/:id",appendDataIntoSpredSheetController)
route.post("/getAllSpreadSheets",getAllSpreadSheetsController);
route.post("/gsheetLastUpdated",getLastUpdatedSheetTime);
export default route;
