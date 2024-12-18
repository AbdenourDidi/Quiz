const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Quiz", QuizSchema);