const connection = require("../db/connection");

const addnewTrip = (username, place_id, votes) => {
  return connection
    .insert({ username, place_id, votes })
    .into("camping_history")
    .returning("*")
    .then((trips) => {
      return trips[0];
    });
};

module.exports = { addnewTrip };
