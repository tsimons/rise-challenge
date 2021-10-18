const KnowledgeCheck = require("./knowledge-check.model");
const Response = require("./knowledge-check-response.model");

/**
 * Get multiple knowledge checks from the db
 *
 * @param {Number} qty
 * @param {Number} page
 * @returns
 */
exports.getKnowledgeChecks = async (qty = 10, page = 0, showCorrect = true) => {
  const query = KnowledgeCheck.find(null, null, {
    limit: qty,
    skip: qty * page,
  }).lean();

  if (!showCorrect) {
    query.select({ answers: { isCorrect: 0 } });
  }

  return await query;
};

/**
 * Get a single knowledge check from the db
 *
 * @param {String} id
 */
exports.getKnowledgeCheck = async (id) => {
  return await KnowledgeCheck.findById(id).lean();
};
