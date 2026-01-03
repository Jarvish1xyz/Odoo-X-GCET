// routes/attendance.route.js
const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  checkIn,
  checkOut,
  getAllAttendance,
  getMyAttendance,
} = require("../controllers/attendance.controller");

router.post("/check-in", auth, checkIn);
router.post("/check-out", auth, checkOut);

// HR dashboard
router.get("/all", auth, role("HR"), getAllAttendance);
router.get("/me", auth, getMyAttendance);

module.exports = router;
