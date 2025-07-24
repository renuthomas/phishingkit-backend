import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error("Please define the DB_URI environment variable inside .env");
}

const connecttoDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB connected successfully`);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export default connecttoDB;
