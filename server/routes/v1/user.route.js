const router = require("express").Router();
const { getUser, getUsers } = require("../../feature/user/user.resolver");
const getError = require("../../util/get-error");

/**
 * Get many users
 */
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200);
    res.send({
      meta: {},
      payload: users,
    });
  } catch (err) {
    res.status(500);
    res.send({ error: getError(err) });
  }
});

/**
 * Get a single user
 *
 * @param {String} req.params.id
 */
router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error(
        "GET user/:id requested without required parameter: `id`"
      );
    }

    const user = await getUser(req.param.id);
    res.status(200);
    res.send(user);
  } catch (err) {
    res.status(500);
    res.send({ error: getError(err) });
  }
});

module.exports = router;
