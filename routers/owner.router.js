const express = require("express");
const {
  getCampsitesByOwnerUsername,
} = require("../controllers/owner.controller");

const ownerRouter = express.Router();

ownerRouter
  .route("/:owner_username/campsites")
  .get(getCampsitesByOwnerUsername);

module.exports = ownerRouter;
