import express from "express";
import cors from "cors";
import "dotenv/config";
import getGeminiAPIResponse from "./utils/gemini.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});