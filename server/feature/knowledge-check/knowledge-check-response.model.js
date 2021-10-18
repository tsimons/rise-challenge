const { Schema, model } = require("mongoose");

const KnowledgeCheckResponse = new Schema(
  {
    knowledgeCheck: { type: Schema.ObjectId, ref: "KnowledgeCheckQuestion" },
    answer: { type: Schema.ObjectId, ref: "KnowledgeCheckAnswer" },
    user: { type: Schema.ObjectId, ref: "User" },
  },
  {
    collection: "response",
  }
);

module.exports = model("Response", KnowledgeCheckResponse);
