import express from "express";
import cors from "cors";
import "dotenv/config";
import getGeminiAPIResponse from "./utils/gemini.js";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

app.post("/test", async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await getGeminiAPIResponse(message);

    console.log("User:", message);
    console.log("Gemini:", reply);

    res.json({
      message: reply,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

const connectDB = async () => {
  try {
    console.log("Mongo URI loaded:", !!process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with DB", err);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});