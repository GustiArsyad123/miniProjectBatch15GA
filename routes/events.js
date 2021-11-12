const express = require("express");

// Import validator
const {
  createOrUpadateEventValidator,
} = require("../middlewares/validators/events");

// Import controller
const {
  getStartedEvent,
  getAllEvents,
  getEventByCategory,
  getAllEventsByWeek,
  getAllEventsByMonth,
  getAllEventsByYear,
  getDetailEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

// Import router
const router = express.Router();

// Make a router
router.route("/").get(getStartedEvent);

router
  .route("/event")
  .get(getAllEvents)
  .post(createOrUpadateEventValidator, createEvent);

router.put("/event/:id", createOrUpadateEventValidator, updateEvent);

router.delete("/event/:id", deleteEvent);

router.get("/event/category/:id", getEventByCategory);

router.get("/event/week", getAllEventsByWeek);

router.get("/event/month", getAllEventsByMonth);

router.get("/event/year", getAllEventsByYear);

router.get("/event/:id", getDetailEvent);

// Export router
module.exports = router;
