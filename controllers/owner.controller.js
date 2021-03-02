const { selectCampsitesByOwnerUsername } = require("../models/owner.model");

exports.getCampsitesByOwnerUsername = (req, res, next) => {
  const { owner_username } = req.params;

  selectCampsitesByOwnerUsername(owner_username)
    .then((campsites) => res.status(200).send({ campsites }))
    .catch(next);
};
