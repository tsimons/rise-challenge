const router = require("express").Router();
const {
  knowledgeCheckRoute,
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
    res.send({ error: getError(err) });
  }
});

module.exports = router;
