const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const MemoryClient = require("mem0ai").default;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mem0 = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "CheerLoop server is running!" });
});

// Save a memory
app.post("/api/memory", async (req, res) => {
  try {
    const { userId, message } = req.body;

    const result = await mem0.add([
    {
      role: "user",
      content: message,
    },
  ],
  {
    userId: userId,
  });

    res.json({
      success: true,
      memory: result,
    });
  } catch (error) {
    console.error("Mem0 error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Search memories
app.post("/api/memory/search", async (req, res) => {
  try {
    const { userId, query } = req.body;

    const results = await mem0.search(query, {
      filters: {
    user_id: userId,
  },
    });

    res.json({
      success: true,
      memories: results,
    });
  } catch (error) {
    console.error("Mem0 search error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Generate a personalized cheer using memories
app.post("/api/cheer", async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Find memories relevant to what the user is going through
    const memoryResults = await mem0.search(message, {
      filters: {
        user_id: userId,
      },
    });

    const memories = memoryResults.results || [];

    // For now, create a simple personalized cheer
    const memoryText = memories
      .map((item) => item.memory)
      .join(" ");

    const cheer = memoryText
      ? `I remember that ${memoryText}. Whatever you're facing right now, keep going — you've got this! 💛`
      : `Whatever you're facing right now, keep going — you've got this! 💛`;

    res.json({
      success: true,
      cheer: cheer,
      memories: memories,
    });
  } catch (error) {
    console.error("Cheer error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`CheerLoop server running on http://localhost:${PORT}`);
});