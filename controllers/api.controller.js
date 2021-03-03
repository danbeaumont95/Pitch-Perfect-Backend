const apis = require("../routes.json");

exports.getAllAPIS = (req, res, next) => {
  res.status(200).send({ apis });
};
