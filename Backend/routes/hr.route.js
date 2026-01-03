const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { createEmployee, getAllEmployees} = require("../controllers/hr.controller");

router.get("/employees", auth, role("HR"), getAllEmployees);
router.post("/register", auth, role("HR"), createEmployee);

module.exports = router;
