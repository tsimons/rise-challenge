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

  const existingResponse = await Response.findOne({
    user: userId,
    answer: answerId,
    knowledgeCheck: knowledgeCheckId,
  });

  if (existingResponse) {
    throw new Error("Response to this knowledge check already exists");
  }

  const response = new Response({
    answer: answerId,
    user: userId,
    knowledgeCheck: knowledgeCheckId,
  });

  return await response.save();
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
