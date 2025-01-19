const Quiz = require("./models/QuizModel"); // Assurez-vous que le chemin est correct

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example route
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/api/quiz", async (req, res) => {
  try {
    const quizzesDB = await Quiz.aggregate([
      {
        $sample: { size: 20 },
      },
      // {
      //   $group: {
      //     _id: "$category",
      //     question: { $first: "$$ROOT" }, // Prendre la première question de chaque catégorie
      //   },
      // },
      // { $limit: 20 },
      // {
      //   $project: {
      //     _id: "$question._id",
      //     question: "$question.question",
      //     options: "$question.options",
      //     answer: "$question.answer",
      //     category: "$question.category",
      //     data: "$question.data",
      //   },
      // },
    ]);
    // console.log("Fetched quizzes:", quizzesDB);
    console.log("GET");

    res.json(quizzesDB);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
