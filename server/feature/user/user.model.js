const { model, Schema } = require("mongoose");

const User = new Schema(
  {
    name: String,
  },
  {
    collection: "user",
  }
);

module.exports = model("User", User);
