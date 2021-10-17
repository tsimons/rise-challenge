const router = require("express").Router();
const {
  getKnowledgeChecks,
  getKnowledgeCheck,
  chooseAnswer,
} = require("../../feature/knowledge-check/knowledge-check.resolver");
const getError = require("../../util/get-error");
const { fromCursor, toCursor } = require("../../util/cursor");

/**
 * GET knowledge-checks
 * Retrieve knowledge checks from the db
 *
 * @param {Number} req.query.page
 * @param {Number} req.query.qty
 * @param {String} req.query.cursor
 */
router.get("/", async (req, res) => {
  try {
    const { cursor, page, qty } = req.query;

    const parsedCursor = cursor ? fromCursor(cursor) : {};
    const options = {
      ...parsedCursor,
      page,
      qty,
    };

    const checks = await getKnowledgeChecks(options.qty, options.page);

    res.status(200);
    res.send({
      meta: {
        cursor: toCursor({
          ...options,
          page: options.page + 1,
        }),
      },
      payload: checks,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send({ error: getError(err) });
  }
});

/**
 * GET knowledge-check
 * Retrieve a single knowledge check from the db
 *
 * @param req.params.id  string  The ID of the knowledge check block
 */
router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400);

      return res.send({
        error: getError(
          new Error(
            "GET /knowledge-check/:id requested without required parameter: `id`"
          )
        ),
      });
    }

    const check = await getKnowledgeCheck(req.params.id);

    if (!check) {
      res.status(404);
      res.send({});
      return;
    }

    res.status(200);
    res.send(JSON.stringify(check));
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify({ error: getError(error) }));
  }
});

/**
 * Respond to a knowledge check
 *
 * @param {String} req.param.id knowledge check id
 * @param {Response} req.body
 */
router.post("/:id/response", async (req, res) => {
  try {
    if (!req.body.userId || !req.body.answerId) {
      res.status(400);

      return res.send({
        error: getError(
          new Error(
            "POST /knowledge-check/:id/response is missing required paramaters in body: `userId` `answerId`"
          )
        ),
      });
    }

    const response = await chooseAnswer(
      req.param.id.req.body.answerId,
      req.body.userId
    );

    res.status(200);
    res.send(response);
  } catch (err) {
    res.status(500);
    res.send({ error: getError(err) });
  }
});

module.exports = router;
