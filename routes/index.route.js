const router = require("express").Router();
const auth = require('../middlewares/token')

router.use("/api/users",require("../controllers/users.controller"));
router.use("/api/roles", require("../controllers/roles.controller"));

module.exports = router;