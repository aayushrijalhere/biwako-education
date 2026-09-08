import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// Reuse the client instance across function calls in serverless environments
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  // Set CORS headers
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
    return res
      .status(500)
      .json({ message: "MONGODB_URI environment variable is missing" });
  }

  try {
    const client = await connectToDatabase();
    // Replaces default DB or targets 'biwako' database
    const db = client.db("biwako");
    const collection = db.collection("leads");

    // Extract all expected fields from body
    const { name, phone, email, date, goal, message, interest, source } =
      req.body || {};

    // Map fields cleanly so both forms work properly
    const newLead = {
      name: name || "",
      phone: phone || "",
      email: email || "",
      date: date || "",
      goal: goal || interest || "",
      message: message || "",
      source: source || "unknown",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newLead);

    return res.status(200).json({
      success: true,
      message: "Lead stored successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("MongoDB Insert Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
