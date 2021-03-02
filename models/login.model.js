const connection = require("../db/connection");

const validateAccount = (username, password, isUser) => {
  return connection(isUser ? "users" : "owners")
    .select("*")
    .where(isUser ? "username" : "owner_username", username)
    .then((user) => {
      if (user.length === 0)
        return Promise.reject({ msg: "account not match", status: 400 });
      if (user[0].password !== password)
        return Promise.reject({ msg: "password not match", status: 400 });
      else return user;
    });
};

module.exports = { validateAccount };
