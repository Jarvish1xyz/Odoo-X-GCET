const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const ctrl = require("../controllers/salary.controller");

/* HR */
router.post("/", auth, role("HR"), ctrl.createSalary);
router.get("/all", auth, role("HR"), ctrl.allSalaries);

/* EMPLOYEE */
router.get("/me", auth, ctrl.mySalary);

module.exports = router;
