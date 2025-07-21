// ✅ Charger les variables d'environnement
import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// Vérifier la variable d'environnement
console.log("🧪 MONGO_URI:", process.env.MONGO_URI);

const startServer = async () => {
  try {
    await connectDB(); // Connexion MongoDB

    const app = express();
    app.use(cors());

    // ✅ Webhook Clerk — doit être AVANT express.json()
    app.post("/webhook", express.raw({ type: "application/json" }), clerkWebhooks);

    // ✅ Ensuite seulement, middleware JSON
    app.use(express.json());

    // ✅ Middleware Clerk (auth, etc.)
    app.use(clerkMiddleware());

    // ✅ Test route
    app.get("/", (req, res) => {
      res.send("🚀 API is working");
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
