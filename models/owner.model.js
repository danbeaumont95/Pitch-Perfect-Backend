const connection = require("../db/connection");

const selectCampsitesByOwnerUsername = (owner_username) => {
  return connection("campsites")
    .select("*")
    .where({ owner_username })
    .then((campsites) => {
      if (campsites.length === 0)
        return Promise.reject({ status: 404, msg: "no campsite found" });
      return campsites;
    });
};

module.exports = { selectCampsitesByOwnerUsername };
