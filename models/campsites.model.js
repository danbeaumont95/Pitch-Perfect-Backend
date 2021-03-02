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


const updateCampsitesByPlaceId = (place_id, votes) => {
  if (isNaN(votes))
    return Promise.reject({ msg: "votes is not a number", status: 400 });
  return connection("campsites")
    .where({ place_id })
    .increment("votes", votes)
    .returning("*")
    .then((campsite) => {
      return { votes: campsite[0].votes };
    });
};

module.exports = {
  selectCampsitesByPlaceId,
  updateCampsitesByPlaceId,
};

