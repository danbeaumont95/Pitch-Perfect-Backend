const express = require("express");
const homePageRouter = require("./routers/homepageRouter");
const apiRouter = require("./routers/api.router.js");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/", homePageRouter);

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  next({
    status: 404,
    msg: "please go to https://pitch-perfect-api.herokuapp.com/api",
  });
});

app.use((err, req, res, next) => {
  // handle custom error
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  // handle sql/database error
  if (err.code) {
    res.status(400).send({ msg: err.detail });
  }
});
app.use((err, req, res, next) => {
  // handle server error
  res.sendStatus(500);
});

module.exports = app;
