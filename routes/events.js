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
  searchEvent,
  getAllEventsByToday,
  getAllEventsByTomorrow,
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

router.get("/cari", searchEvent);

router.get("/cat/:id", getEventByCategory);

router.get("/tody", getAllEventsByToday);

router.get("/tomorrow", getAllEventsByTomorrow);

router.get("/we", getAllEventsByWeek);

router.get("/month", getAllEventsByMonth);

router.get("/year", getAllEventsByYear);

router.put("/:id", createOrUpadateEventValidator, updateEvent);

router.delete("/:id", deleteEvent);

router.get("/:id", getDetailEvent);

// Export router
module.exports = router;
