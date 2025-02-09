const Quiz = require("./models/QuizModel");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://quizapp-abdenourdidis-projects.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/api/quiz", async (req, res) => {
  try {
    const count = await Quiz.countDocuments(); // Compte les documents
    const random = Math.floor(Math.random() * count); // Sélectionne un index aléatoire
    const quizzesDB = await Quiz.find().skip(random).limit(20); // Récupère les quiz aléatoires
    console.log("GET");

    res.json(quizzesDB);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Exporte l'application pour Vercel
module.exports = app;

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
