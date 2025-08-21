import express from "express";
import clerkWebhooks from "../controllers/clerkWebhooks.js";

const router = express.Router();

// Route webhook Clerk (POST)
// Important : dans ton serveur, tu dois utiliser express.raw() sur cette route
router.post("/webhook", clerkWebhooks);

export default router;
