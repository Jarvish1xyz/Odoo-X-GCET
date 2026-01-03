const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getProfile, updateProfile } = require("../controllers/profile.controller");

router.get("/", auth, getProfile);
router.put("/update", auth, updateProfile);
module.exports = router;
