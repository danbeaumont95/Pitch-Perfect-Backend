const {
  selectCampsitesByPlaceId,
  updateCampsitesByPlaceId,
} = require("../models/campsites.model");

exports.getCampsitesByPlaceId = (req, res, next) => {
  const { place_id } = req.params;
  selectCampsitesByPlaceId(place_id)
    .then((campsite) => {
      res.status(200).send({ campsite });
    })
    .catch(next);
};


exports.patchCampsitesByPlaceId = (req, res, next) => {
  const { place_id } = req.params;
  const { votes } = req.body;

  updateCampsitesByPlaceId(place_id, votes)
    .then((votes) => res.status(201).send({ votes }))
    .catch((err) => {
      next(err);
    });
};

