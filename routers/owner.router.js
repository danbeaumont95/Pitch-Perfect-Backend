const express = require("express");
const {
  getCampsitesByOwnerUsername,
  getAllOwners,
} = require("../controllers/owner.controller");

const ownerRouter = express.Router();

ownerRouter.route("/").get(getAllOwners);

ownerRouter
  .route("/:owner_username/campsites")
  .get(getCampsitesByOwnerUsername);

module.exports = ownerRouter;
