// import { mongoose } from "mongoose";

// const GFileSchema = new mongoose.Schema({
//   fileName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   roleId: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   reportId: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   spreadSheetId: {
//     type: String,
//     required: true,
//     trim: true,
//   },
// });

// const GFile = mongoose.model("GFile", GFileSchema);

// export default GFile;




import { mongoose } from "mongoose";

const GFileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    roleId: {
      type: String,
      required: true,
      trim: true,
    },
    reportId: {
      type: String,
      required: true,
      trim: true,
    },
    spreadSheetId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const GFile = mongoose.model("GFile", GFileSchema);

export default GFile;
