const express = require("express");
const camping_historyRouter = express.Router();
const { postNewTrip } = require("../controllers/camping_history.controller");

camping_historyRouter.route("/").post(postNewTrip);

module.exports = camping_historyRouter;
