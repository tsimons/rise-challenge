const router = require("express").Router();
const knowledgeRouter = require("./knowledge-check.route");
const userRouter = require("./user.route");
const bffRouter = require("./bff");

router.use("/knowledge-checks", knowledgeRouter);
router.use("/user", userRouter);
router.use("/bff", bffRouter);

module.exports = router;
