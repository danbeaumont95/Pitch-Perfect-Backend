const express = require("express");
const campsitesRouter = express.Router();
const {
  getCampsitesByPlaceId,
  updatedCampsitesByPlaceId,
} = require("../controllers/campsites.controller");

campsitesRouter.route("/:place_id").get(getCampsitesByPlaceId);

module.exports = campsitesRouter;
