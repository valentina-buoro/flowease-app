const express = require("express");
const clockingRouter = express.Router();
const { authenticate } = require("../middleware/authentication");
const clockin = require("../controllers/clockingControllers.js/clockinController");

clockingRouter.post("/clockin", authenticate, clockin);

module.exports = clockingRouter;
