const {
  selectReviewsByPlaceId,
  addReviewByPlaceId,
} = require("../models/reviews.model");

exports.getReviewsByPlaceId = (req, res, next) => {
  const { place_id } = req.params;
  selectReviewsByPlaceId(place_id)
    .then((reviews) => {
      console.log(reviews, "in review controller");
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.postReviewsByPlaceId = (req, res, next) => {
  const { place_id } = req.params;
  const { username, review } = req.body;
  addReviewByPlaceId(place_id, username, review)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch(next);
};
