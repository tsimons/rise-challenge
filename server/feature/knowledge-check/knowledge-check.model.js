const { Schema, model } = require("mongoose");

const KnowledgeCheckAnswer = new Schema({
  text: String,
  isCorrect: Boolean,
});

const KnowledgeCheck = new Schema(
  {
    question: {
      text: String,
      media: {
        type: { type: String },
        url: String,
      },
    },
    answers: [KnowledgeCheckAnswer],
    feedback: String,
  },
  {
    collection: "knowledge-check",
  }
);

model("KnowledgeCheckAnswer", KnowledgeCheckAnswer);
module.exports = model("KnowledgeCheck", KnowledgeCheck);
