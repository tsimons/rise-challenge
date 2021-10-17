const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const QuestionModel = require("../../feature/knowledge-check/knowledge-check-question.model");
const UserModel = require("../../feature/user/user.model");
const seed = require("../../../db/seed");

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
module.exports = async () => {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);
  await this.clearDatabase();
  await QuestionModel.insertMany(seed.questions);
  await UserModel.insertMany([seed.user]);
};

/**
 * Drop database, close the connection and stop mongod.
 */
exports.closeDatabase = async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
exports.clearDatabase = async function clearDatabase() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
