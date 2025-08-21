import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import clerkRoutes from "./routes/clerk.js";
import { clerkMiddleware } from "@clerk/express";
import hotelRouter from "./routes/hotelRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const startServer = async () => {
  try {
    await connectDB();
    connectCloudinary();
    

    const app = express();
    app.use(cors());

    // 1. Middleware raw pour webhook Clerk (AVANT express.json)
    app.use("/api/clerk/webhook", express.raw({ type: "application/json" }));

    // 2. Route webhook Clerk gérée directement ici (pas dans clerkRoutes)
    app.post("/api/clerk/webhook", clerkWebhooks);

    // 3. Middleware JSON pour toutes les autres routes
    app.use(express.json());

    // 4. Middleware Clerk (authentification) pour protéger les autres routes
    app.use(clerkMiddleware());

    // 5. Routes API Clerk (sans webhook)
    app.use("/api/clerk", clerkRoutes);

    // 6. Route test publique
    app.get("/", (req, res) => {
      res.send("🚀 API is working");

      app.use('/api/user',userRouter)
      app.use('/api/hotels',hotelRouter)
      app.use('/api/rooms',roomRouter)
      app.use('/api/bookings',bookingRouter)
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
  }
};

startServer();
