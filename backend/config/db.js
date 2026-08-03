import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};