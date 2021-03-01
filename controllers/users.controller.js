const {
  selectAllUsers,
  createNewUser,
  selectUserById,
} = require("../models/users.model");

exports.getAllUsers = (req, res, next) => {
  selectAllUsers().then((campingHistory) => {
    res.send({ campingHistory }).status(200);
  });
};

exports.addNewUser = (req, res, next) => {
  const { username, password, firstname, lastname } = req.body;
  console.log("controller");
  createNewUser(username, password, firstname, lastname)
    .then((user) => {
      console.log(user);
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  const { user_id } = req.params;
  selectUserById(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
