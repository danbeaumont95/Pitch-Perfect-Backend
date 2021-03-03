const express = require("express");
const reviewsRouter = express.Router();
const {
  getReviewsByPlaceId,
  postReviewsByPlaceId,
  removeReviewByPlaceId,
} = require("../controllers/reviews.controller");

reviewsRouter
  .route("/:place_id")
  .get(getReviewsByPlaceId)
  .post(postReviewsByPlaceId)
  .delete(removeReviewByPlaceId);

module.exports = reviewsRouter;
