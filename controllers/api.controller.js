const apis = require("../routes.json");
const welcome = require("../homepage.json");

exports.getWelcomeMessage = (req, res, next) => {
  res.status(200).send({ welcome });
};

exports.getAllAPIS = (req, res, next) => {
  res.status(200).send({ apis });
};
