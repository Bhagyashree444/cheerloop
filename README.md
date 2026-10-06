# 💛 CheerLoop

**A personalized encouragement companion that remembers what matters to you.**

CheerLoop is a memory-powered encouragement app built for the buildathon. Instead of giving generic motivation, CheerLoop uses information you've previously shared to make encouragement feel more personal and relevant.

## ✨ How It Works

1. You share something about your goals, challenges, or experiences.
2. **Mem0** stores important information as memory.
3. When you need encouragement later, CheerLoop searches your relevant memories.
4. CheerLoop uses those memories to create a personalized cheer.

### Example

You previously shared:

> "I'm training for my first 5K and I'm nervous about finishing."

Later you say:

> "I'm feeling discouraged today."

Instead of generic encouragement, CheerLoop can remember your 5K journey and respond with context that is meaningful to you.

## 🧠 Why Mem0?

CheerLoop uses **Mem0 as its memory layer**.

Mem0 is not used as the application's general-purpose database. Instead, it stores meaningful user context that can be retrieved later when it is relevant to an interaction.

This allows CheerLoop to maintain continuity across conversations and make encouragement more personalized.

## 🏗️ Architecture

```text
User
  ↓
React Frontend
  ↓
Node.js + Express Server
  ↓
Mem0 Memory
  ↓
Relevant Memories
  ↓
Personalized Cheer
```

## 🛠️ Tech Stack

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Memory:** Mem0
* **API:** Mem0 JavaScript SDK
* **Styling:** CSS

## 📁 Project Structure

```text
CheerLoop/
├── client/
│   ├── src/
│   └── ...
├── server/
│   ├── index.js
│   ├── package.json
│   └── ...
└── README.md
``
```
