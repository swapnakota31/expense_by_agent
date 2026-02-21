const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    const originalMessage = error?.message || "Unknown MongoDB error";
    throw new Error(
      `MongoDB connection failed: ${originalMessage}. If you are using local MongoDB, ensure the MongoDB service is running on port 27017, or update MONGO_URI to your MongoDB Atlas connection string.`
    );
  }
};

module.exports = connectDB;
