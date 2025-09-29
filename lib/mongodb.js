const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_STRING || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("❌ MongoDB connection string is missing");
  }

  try {
    await mongoose.connect(uri, { maxPoolSize: 5 });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

module.exports = { connectDB };
