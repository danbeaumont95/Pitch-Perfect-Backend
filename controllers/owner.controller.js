const {
  selectCampsitesByOwnerUsername,
  selectAllOwners,
} = require("../models/owner.model");

exports.getCampsitesByOwnerUsername = (req, res, next) => {
  const { owner_username } = req.params;

  selectCampsitesByOwnerUsername(owner_username)
    .then((campsites) => res.status(200).send({ campsites }))
    .catch(next);
};

exports.getAllOwners = (req, res, next) => {
  selectAllOwners()
    .then((owners) => {
      res.status(200).send({ owners });
    })
    .catch(next);
};
