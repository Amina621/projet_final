// ✅ Charger les variables d'environnement
import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// ✅ Vérification temporaire de la variable MONGO_URI
console.log("🧪 MONGO_URI:", process.env.MONGO_URI);

// ✅ Démarrage asynchrone
const startServer = async () => {
  try {
    await connectDB(); // Connexion MongoDB

    const app = express();
    app.use(cors());
    app.use(express.json());


    app.use(express.json())
    app.use(clerkMiddleware())

    //api to listen to clerk webhooks
    app.use("/api/clerk",clerkWebhooks);

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
