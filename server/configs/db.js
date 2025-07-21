import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
         throw new Error("❌ MONGO_URI is not defined in your .env file");
    }

    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI); // ✅ plus d'options nécessaires

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
