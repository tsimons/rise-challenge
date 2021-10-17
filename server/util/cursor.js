const { Buffer } = require("buffer");

exports.toCursor = (obj) =>
  Buffer.from(JSON.stringify(obj), "utf8").toString("base64");

exports.fromCursor = (cursor) =>
  JSON.parse(Buffer.from(cursor, "base64").toString("utf8"));
