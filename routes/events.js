const express = require("express");

// Import controller
const {
  getAllEvents,
  searchEvent,
  getDetailEvent,
} = require("../controllers/events");

// Import router
const router = express.Router();

router.get("/", getAllEvents);

router.get("/cari", searchEvent);

router.get("/:id", getDetailEvent);

// Export router
module.exports = router;
