const { select } = require("../db/connection");
const connection = require("../db/connection");

const selectReviewsByPlaceId = (place_id) => {
  return connection
    .select("*")
    .from("reviews")
    .where({ place_id })
    .then((reviews) => {
      const formattedReviews = reviews.map((review) => {
        return {
          username: review.username,
          review: review.review,
          created_at: review.created_at,
          review_id: review.review_id,
        };
      });
      return formattedReviews;
    });
};

const addReviewByPlaceId = (place_id, username, review) => {
  return connection
    .insert({ place_id, username, review })
    .into("reviews")
    .returning("*")
    .then((review) => {
      return review[0];
    });
};

const removeReviewByPlaceId = (place_id, username, review_id) => {
  return connection("reviews")
    .delete()
    .where({ place_id, username, review_id })
    .then((count) => {
      console.log(count);
      if (count === 0) throw { status: 404, msg: "No review found" };
    });
};

module.exports = {
  selectReviewsByPlaceId,
  addReviewByPlaceId,
  removeReviewByPlaceId,
};
