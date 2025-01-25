const Quiz = require("./models/QuizModel");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/api/quiz", async (req, res) => {
  try {
    const quizzesDB = await Quiz.aggregate([
      { $sample: { size: 5 } },
      { $project: { question: 1, options: 1 } }, // Remplace par les champs nécessaires
    ]);
    res.json(quizzesDB);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Exporte l'application pour Vercel
module.exports = app;

// Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
