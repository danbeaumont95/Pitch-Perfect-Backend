const {
  selectReviewsByPlaceId,
  addReviewByPlaceId,
  deleteReviewByPlaceId
} = require("../models/reviews.model");

exports.getReviewsByPlaceId = (req, res, next) => {
  const { place_id } = req.params;
  selectReviewsByPlaceId(place_id)
    .then((reviews) => {
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

exports.removeReviewByPlaceId = (req, res, next) => {
  const { place_id } = req.params;
  const { username, review_id } = req.body;
  deleteReviewByPlaceId(
    place_id,
    username,
    review_id
  )
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
}
