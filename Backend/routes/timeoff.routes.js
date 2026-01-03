const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const ctrl = require("../controllers/timeoff.controller");

/* EMPLOYEE */
router.post("/", auth, ctrl.applyLeave);
router.get("/me", auth, ctrl.myLeaves);

/* HR */
router.get("/all", auth, role("HR"), ctrl.allLeaves);
router.put("/:id", auth, role("HR"), ctrl.updateLeaveStatus);

module.exports = router;
