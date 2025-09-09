import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiry: {
      type: Date,
    },
  },
  { versionKey: false }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
