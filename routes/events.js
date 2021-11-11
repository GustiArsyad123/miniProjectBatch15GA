const express = require("express");

// Import validator
const {
  createOrUpadateEventValidator,
} = require("../middlewares/validators/events");

// Import controller
const {
  getAllEvents,
  getStartedEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

// Import router
const router = express.Router();

// Make a router
router.route("/").get(getStartedEvent);

router.route("/event").post(createOrUpadateEventValidator, createEvent);

// Export router
module.exports = router;
