const router = require("express").Router();
const {
  knowledgeCheckRoute,
  answerKnowledgeCheck,
  removeAnswerFromKnowledgeCheck,
} = require("../../feature/bff/knowledge-check.bff");
const getError = require("../../util/get-error");

router.get("/knowledge-checks", async (req, res) => {
  try {
    const response = await knowledgeCheckRoute();

    res.status(200);
    res.send(response);
  } catch (err) {
    res.status(500);
    console.error(err);
    res.send({ error: getError(err).toString() });
  }
});

router.put("/answer-knowledge-check", async (req, res) => {
  try {
    const { userId, knowledgeCheckId, answerId } = req.body;

    if (!userId || !knowledgeCheckId || !answerId) {
      res.status(400);
      return res.send({
        error: getError(
          new Error(
            "PUT /answer-knowledge-check called without required parameters: `userId` `knowledgeCheckId` `answerId`"
          )
        ).toString(),
      });
    }

    const knowledgeCheck = await answerKnowledgeCheck(
      knowledgeCheckId,
      answerId,
      userId
    );

    res.status(200);
    res.send({ knowledgeCheck });
  } catch (err) {
    res.status(500);
    console.error(err);
    res.send({ error: getError(err).toString() });
  }
});

router.delete("/remove-knowledge-check-response", async (req, res) => {
  try {
    const { userId, knowledgeCheckId } = req.body;

    const knowledgeCheck = await removeAnswerFromKnowledgeCheck(
      knowledgeCheckId,
      userId
    );

    res.status(200);
    res.send({ knowledgeCheck });
  } catch (err) {
    res.status(500);
    res.send({ error: getError(err).toString() });
  }
});

module.exports = router;
