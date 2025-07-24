import mongoose from "mongoose";

const DetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    website: {
      type: String,
      required: [true, "Website is required"],
    },
    ipaddress: {
      type: String,
    },
  },
  { timestamps: true }
);
const Detail = mongoose.model("Detail", DetailsSchema);
export default Detail;
