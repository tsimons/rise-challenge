const {
  getKnowledgeChecks,
  getKnowledgeCheck,
} = require("../knowledge-check/knowledge-check.resolver");
const {
  getResponseForKnowledgeCheckByUser,
  chooseAnswer,
  removeAnswer,
} = require("../knowledge-check/knowledge-check-response.resolver");
const { getUser } = require("../user/user.resolver");

const hydrateKnowledgeCheck = (kc, response, showAnswer = false) => ({
  ...kc,
  hasResponded: !!response,
  isCorrect: response
    ? kc.answers.find((a) => response.answer.equals(a._id)).isCorrect
    : null,
  answers: kc.answers.map((a) => ({
    _id: a._id,
    isCorrect: showAnswer ? a.isCorrect : undefined,
    text: a.text,
    selected: response ? response.answer.equals(a._id) : false,
  })),
});

const knowledgeCheckRoute = async () => {
  const user = await getUser();
  const knowledgeChecks = await getKnowledgeChecks(undefined, undefined);

  if (!user) {
    throw new Error("No user found");
  }

  const hydratedKnowledgeChecks = await Promise.all(
    knowledgeChecks.map(async (kc) => {
      const response = await getResponseForKnowledgeCheckByUser(
        user._id,
        kc._id
      );

      return hydrateKnowledgeCheck(kc, response);
    })
  );

  return {
    user,
    knowledgeChecks: hydratedKnowledgeChecks,
  };
};

const getHydratedKnowledgeCheck = async (id, showAnswer = false) => {
  const user = await getUser();
  const knowledgeCheck = await getKnowledgeCheck(id);
  const response = await getResponseForKnowledgeCheckByUser(
    user._id,
    knowledgeCheck._id
  );

  return hydrateKnowledgeCheck(knowledgeCheck, response, showAnswer);
};

const answerKnowledgeCheck = async (knowledgeCheckId, answerId, userId) => {
  await chooseAnswer(knowledgeCheckId, answerId, userId);

  return await getHydratedKnowledgeCheck(knowledgeCheckId, true);
};

const removeAnswerFromKnowledgeCheck = async (knowledgeCheckId, userId) => {
  await removeAnswer(knowledgeCheckId, userId);

  return await getHydratedKnowledgeCheck(knowledgeCheckId);
};

exports.knowledgeCheckRoute = knowledgeCheckRoute;
exports.getKnowledgeCheck = getHydratedKnowledgeCheck;
exports.answerKnowledgeCheck = answerKnowledgeCheck;
exports.removeAnswerFromKnowledgeCheck = removeAnswerFromKnowledgeCheck;
