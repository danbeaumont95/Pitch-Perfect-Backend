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

const selectAllOwners = () => {
  return connection("owners")
    .select("*")
    .then((owners) => {
      if (!owners)
        return Promise.reject({ status: 404, msg: "no owners found" });
      const formattedOwners = owners.map((owner) => {
        return {
          owner_username: owner.owner_username,
          firstname: owner.firstname,
          lastname: owner.lastname,
          avatar_url: owner.avatar_url,
        };
      });
      return formattedOwners;
    });
};

module.exports = { selectCampsitesByOwnerUsername, selectAllOwners };
