const loginRouter = require("express").Router();
const { postAccount } = require("../controllers/login.controller");

loginRouter.route("/").post(postAccount);

module.exports = loginRouter;
