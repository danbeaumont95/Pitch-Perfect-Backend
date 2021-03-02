const connection = require("../db/connection");

const selectCampsitesByPlaceId = (place_id) => {
  return connection
    .select("*")
    .from("campsites")
    .where({ place_id })
    .then((campsite) => {
      return campsite[0];
    });
};

const updateCampsitesByPlaceId = () => {};

module.exports = { selectCampsitesByPlaceId, updateCampsitesByPlaceId };
