const {
  getKnowledgeChecks,
  getKnowledgeCheck,
  getResponseForKnowledgeCheckByUser,
} = require("../knowledge-check/knowledge-check.resolver");
const { getUser } = require("../user/user.resolver");

exports.knowledgeCheckRoute = async () => {
  const user = await getUser();
  const knowledgeChecks = await getKnowledgeChecks();

  if (!user) {
    throw new Error("No user found");
  }

  return await Promise.all(
    knowledgeChecks.map(async (kc) => {
      const response = await getResponseForKnowledgeCheckByUser(
        user._id,
        kc._id
      );

      return {
        ...kc,
        hasResponded: !!response,
        answers: kc.answers.map((a) => ({
          ...a,
          selected: response ? response.answerId === a._id : false,
        })),
      };
    })
  );
};
