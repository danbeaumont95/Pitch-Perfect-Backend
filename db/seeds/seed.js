const dbData = require("../index");

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("users").insert(dbData["usersData"]))
    .then(() => {
      return knex("owners").insert(dbData["ownersData"]);
    })
    .then(() => {
      return knex("campsites").insert(dbData["campsitesData"]);
    })
    .then(() => {
      const camping_history = [
        ...dbData["camping_historyData"],
      ].map((camping) => ({ ...camping, date: new Date(camping.date) }));

      return knex("camping_history").insert(camping_history);
    })
    .then(() => {
      const reviews = [...dbData["reviewsData"]].map((review) => ({
        ...review,
        date: new Date(review.created_at),
      }));
      return knex("reviews").insert(reviews);
    });
};
