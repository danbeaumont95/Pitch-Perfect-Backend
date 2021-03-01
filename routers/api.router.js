const apiRouter = require("express").Router();

const usersRouter = require("../routers/users.router");
const camping_historyRouter = require("./camping_history.router");
const reviewsRouter = require("./reviews.router");
//const router_name = require('router_path')

//apiRouter.use('/endpoint', router_name);

apiRouter.use("/users", usersRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/camping_history", camping_historyRouter);

module.exports = apiRouter;
