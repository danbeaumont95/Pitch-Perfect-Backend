const express = require("express");
const reviewsRouter = express.Router();
const {
  getReviewsByPlaceId,
  postReviewsByPlaceId,
} = require("../controllers/reviews.controller");

reviewsRouter
  .route("/:place_id")
  .get(getReviewsByPlaceId)
  .post(postReviewsByPlaceId);

module.exports = reviewsRouter;
