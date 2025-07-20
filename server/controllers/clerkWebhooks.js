import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // 1. Créer l'instance webhook avec ta clé secrète
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // 2. Préparer les headers requis pour validation
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };

    // 3. Vérification de la signature avec le raw body
    const payload = whook.verify(req.body, headers);

    // 4. Extraction des infos utilisateur
    const { data, type } = payload;

    // 5. Préparation des données utilisateur
    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url
    };

    // 6. Gérer les différents types d'événements Clerk
    switch (type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${type}`);
    }

    res.status(200).json({ success: true, message: "✅ Webhook received" });

  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
