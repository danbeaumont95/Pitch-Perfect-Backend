const express = require("express");
const reviewsRouter = express.Router();
const {
  getReviewsByPlaceId,
  postReviewsByPlaceId,
  deleteReviewByPlaceId,
} = require("../controllers/reviews.controller");

reviewsRouter
  .route("/:place_id")
  .get(getReviewsByPlaceId)
  .post(postReviewsByPlaceId)
  .delete(deleteReviewByPlaceId);

module.exports = reviewsRouter;
