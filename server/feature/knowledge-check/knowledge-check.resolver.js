const KnowledgeCheck = require("./knowledge-check.model");
const Response = require("./knowledge-check-response.model");

/**
 * Get multiple knowledge checks from the db
 *
 * @param {Number} qty
 * @param {Number} page
 * @returns
 */
exports.getKnowledgeChecks = async (qty = 10, page = 0) => {
  return await KnowledgeCheck.find(null, null, {
    limit: qty,
    skip: qty * page,
    lean: true,
  });
};

/**
 * Get a single knowledge check from the db
 *
 * @param {String} id
 */
exports.getKnowledgeCheck = async (id) => {
  return await KnowledgeCheck.findById(id);
};

/**
 * Get responses for a single user to a knowledge check KnowledgeCheck
 *
 * @param {String} userId
 * @returns {Response}
 */
exports.getResponsesByUser = async (userId) => await Response.find({ userId });

/**
 *
 * @param {String} userId
 * @returns {[Response]}
 */
exports.getResponseForKnowledgeCheckByUser = async (userId, knowledgeCheckId) =>
  await Response.findOne({ userId, knowledgeCheckId });

/**
 *
 * @param {String} KnowledgeCheckId
 * @param {String} answerId
 * @param {String} userId
 */
exports.chooseAnswer = async (knowledgeCheckId, answerId, userId) => {
  if (!(await KnowledgeCheck.findById(knowledgeCheckId)))
    throw new Error(
      `Knowledge check with id ${knowledgeCheckId} does not exist`
    );

  return await Response.findOneAndUpdate(
    {
      userId,
      knowledgeCheckId,
    },
    {
      userId,
      answerId,
    },
    {
      lean: true,
      upsert: true,
    }
  );
};
