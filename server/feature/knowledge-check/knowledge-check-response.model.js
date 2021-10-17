const { Schema, model } = require("mongoose");

const KnowledgeCheckResponse = new Schema(
  {
    question: { type: Schema.ObjectId, ref: "KnowledgeCheckQuestion" },
    response: { type: Schema.ObjectId, ref: "KnowledgeCheckAnswer" },
    user: { type: Schema.ObjectId, ref: "User" },
  },
  {
    collection: "response",
  }
);

module.exports = model("Response", KnowledgeCheckResponse);
