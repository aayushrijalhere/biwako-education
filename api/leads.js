import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  // Set CORS headers (important)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  if (!uri) {
    return res.status(500).json({ message: "MONGODB_URI is missing" });
  }

  const client = new MongoClient(uri);

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!data.name || !data.phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    await client.connect();
    const db = client.db("biwako");
    const collection = db.collection("leads");

    const lead = {
      name: data.name,
      phone: data.phone,
      email: data.email || "",
      interest: data.interest || "",
      goal: data.goal || "",
      date: data.date || "",
      message: data.message || "",
      source: data.source || "website",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(lead);

    return res.status(200).json({
      success: true,
      message: "Lead saved successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to save lead",
    });
  } finally {
    await client.close();
  }
}
