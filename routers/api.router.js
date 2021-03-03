const apiRouter = require("express").Router();
const { getAllAPIS } = require("../controllers/api.controller");
const usersRouter = require("../routers/users.router");
const camping_historyRouter = require("./camping_history.router");
const campsitesRouter = require("./campsites.router");
const reviewsRouter = require("./reviews.router");
const loginRouter = require("./login.router");
const ownerRouter = require("./owner.router");

//apiRouter.use('/endpoint', router_name);

apiRouter.get("/", getAllAPIS);

apiRouter.use("/login", loginRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/owners", ownerRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/camping_history", camping_historyRouter);

apiRouter.use("/campsites", campsitesRouter);

module.exports = apiRouter;
