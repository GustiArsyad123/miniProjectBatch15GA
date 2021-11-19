const express = require("express");

const {
  createOrUpadateUserValidator,
} = require("../middlewares/validators/users");

const {
  getUserDetail,
  updateUser,
  deleteUser,
  myEvents,
} = require("../controllers/users");

const router = express.Router();

router.get("/myevent", myEvents);
router.get("/:id", getUserDetail);
router.put("/update/", createOrUpadateUserValidator, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
