import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;

    // Basic validation
    if (!data.name || !data.phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    await client.connect();
    const db = client.db("biwako"); // database name
    const collection = db.collection("leads"); // collection name

    const lead = {
      ...data,
      createdAt: new Date(),
      source: data.source || "website",
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
      message: "Failed to save lead",
    });
  }
}
