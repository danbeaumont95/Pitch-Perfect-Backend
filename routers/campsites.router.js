const express = require("express");
const campsitesRouter = express.Router();
const {
  getCampsitesByPlaceId,

  patchCampsitesByPlaceId,
} = require("../controllers/campsites.controller");

campsitesRouter
  .route("/:place_id")
  .get(getCampsitesByPlaceId)
  .patch(patchCampsitesByPlaceId);

module.exports = campsitesRouter;
