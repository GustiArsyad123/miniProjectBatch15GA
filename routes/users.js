const express = require("express");

// Import validator

// Import controller
const {
  signUp,
  signIn,
  myEvents,
  saveEvents,
} = require("../controllers/users");

// Import router
const router = express.Router();

// Make a router
router.post("/signup", signUp);

// Export router
module.exports = router;
