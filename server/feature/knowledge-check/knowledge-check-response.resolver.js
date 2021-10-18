const Response = require("./knowledge-check-response.model");
const KnowledgeCheck = require("./knowledge-check.model");

/**
 * Get responses for a single user to a knowledge check KnowledgeCheck
 *
 * @param {String} userId
 * @returns {Response}
 */
exports.getResponsesByUser = async (userId) =>
  await Response.find({ user: userId });

/**
 *
 * @param {String} userId
 * @returns {Response}
 */
exports.getResponseForKnowledgeCheckByUser = async (userId, knowledgeCheckId) =>
  await Response.findOne({ user: userId, knowledgeCheck: knowledgeCheckId });

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
      user: userId,
      knowledgeCheck: knowledgeCheckId,
    },
    {
      user: userId,
      answer: answerId,
    },
    {
      lean: true,
      upsert: true,
    }
  );
};

exports.removeAnswer = async (knowledgeCheckId, userId) => {
  if (!(await KnowledgeCheck.findById(knowledgeCheckId)))
    throw new Error(
      `Knowledge check with id ${knowledgeCheckId} does not exist`
    );

  return await Response.findOneAndRemove({
    user: userId,
    knowledgeCheck: knowledgeCheckId,
  });
};
