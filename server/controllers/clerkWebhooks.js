import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    console.log("📩 Webhook reçu");
    console.log("Headers reçus:", req.headers);

    // Mode debug pour bypasser la vérification (mettre à false en prod)
    const debugBypassSvix = false;

    let payload;
    if (debugBypassSvix) {
      // Attention : ne pas utiliser en prod ! Ceci ignore la vérification svix
      payload = req.body;
    } else {
      const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

      const headers = {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      };

      if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
        throw new Error("Missing svix headers");
      }

      payload = whook.verify(req.body, headers);
    }

    const { data, type } = payload;

    console.log("📦 Type d’événement Clerk :", type);
    console.log("👤 Données reçues :", data);

    const imageUrl =
      typeof data.image_url === "string" && data.image_url.startsWith("http")
        ? data.image_url
        : "https://example.com/default-image.png";

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: imageUrl,
      recentSearchCities: [],
    };

    switch (type) {
      case "user.created": {
        const existing = await User.findById(data.id);
        if (!existing) {
          await User.create(userData);
          console.log("✅ Utilisateur créé en DB");
        } else {
          console.log("⚠️ Utilisateur déjà existant");
        }
        break;
      }
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        console.log("🔁 Utilisateur mis à jour");
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ Utilisateur supprimé");
        break;
      default:
        console.log(`ℹ️ Événement non géré : ${type}`);
        return res.status(200).json({ success: true, message: `Événement ignoré : ${type}` });
    }

    res.status(200).json({ success: true, message: "✅ Webhook reçu" });
  } catch (error) {
    console.error("❌ Erreur Webhook Clerk :", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
