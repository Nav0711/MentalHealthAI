import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  const { message } = req.body;

  try {
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "You are a supportive mental health copilot. Avoid giving any diagnosis or medical advice. Encourage mindfulness, gratitude, calm breathing, and positive thinking."
              }
            ]
          },
          {
            role: "user",
            parts: [{ text: message }]
          }
        ]
      })
    });

    try {
        const data = await geminiRes.json();
        console.log("Gemini raw response:", JSON.stringify(data, null, 2));
      
        // Access the text response from Gemini
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
        // If the reply is empty or undefined, return an error
        if (!reply) {
          return res.status(500).json({ error: "No valid response from Gemini." });
        }
      
        // Return the reply to the client
        res.json({ reply });
      } catch (err) {
        console.error("Gemini API error:", err);
        res.status(500).json({ error: "Something went wrong while processing your request." });
      }
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      res.status(500).json({ error: "Something went wrong while processing your request." });
    }
  }); // Close the app.post block

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



app.get("/", (req, res) => {
    res.send("Gemini mental health API is running ✅");
  });
  
