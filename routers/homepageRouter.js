const homePageRouter = require("express").Router();
const { getWelcomeMessage } = require("../controllers/api.controller");

homePageRouter.get("/", getWelcomeMessage);

module.exports = homePageRouter;
