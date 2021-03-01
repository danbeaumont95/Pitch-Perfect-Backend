const connection = require("../db/connection");
const { findIndex } = require("../db/test_data/camping_history");

const selectAllUsers = () => {
  return connection
    .select("*")
    .from("camping_history")
    .leftJoin("users", "users.username", "camping_history.username")
    .leftJoin("campsites", "campsites.place_id", "camping_history.place_id")
    .then((data) => {
      const campingHistory = [];
      let ifExists = 0;
      for (let i = 0; i < data.length; i++) {
        campingHistory.forEach((camping) => {
          if (camping.username === data[i].username) {
            ifExists++;
          }
        });
        if (ifExists === 0) {
          campingHistory.push({
            username: data[i].username,
            camping_history: [
              {
                date: data[i].date,
                campsite_name: data[i].campsite_name,
                votes: data[i].votes,
              },
            ],
          });
        } else {
          const index = campingHistory.findIndex((camping) => {
            return camping.username === data[i].username;
          });
          campingHistory[index].camping_history.push({
            date: data[i].date,
            campsite_name: data[i].campsite_name,
            votes: data[i].votes,
          });
        }
      }
      return campingHistory;
    });
};

const createNewUser = (username, password, firstname, lastname) => {
  console.log("model");
  return connection
    .insert({ username, password, firstname, lastname })
    .into("users")
    .returning("*")
    .then((users) => {
      return users[0];
    });
};

const selectUserById = (user_id) => {
  return selectAllUsers().then((campingHistory) => {
    const user = campingHistory.filter((camping) => {
      return camping.username === user_id;
    });
    console.log(user[0]);
    if (user.length === 0) {
      return Promise.reject({ msg: "No user was found", status: 400 });
    } else {
      return user[0];
    }
  });
};

module.exports = { selectAllUsers, createNewUser, selectUserById };
