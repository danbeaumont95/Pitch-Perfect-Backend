const camping_history = require("../db/test_data/camping_history");
const { addnewTrip } = require("../models/camping_history.model");

exports.postNewTrip = (req, res, next) => {
  const { username, place_id, votes } = req.body;
  addnewTrip(username, place_id, votes)
    .then((camping_history) => {
      res.status(201).send({ camping_history });
    })
    .catch(next);
};
