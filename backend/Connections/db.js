import mongoose from "mongoose";
import constants from "../Constants/constants.js";


const ConnectDB = async () => {
  await mongoose.connect(constants.DBURI);
  console.log("connected to db");
};

export default ConnectDB;
