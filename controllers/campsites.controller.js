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

exports.updateCampsitesByPlaceId = (req, res, next) => {};
