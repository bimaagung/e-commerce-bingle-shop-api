var express = require("express");
var router = express.Router();
const { register, login } = require("../controllers/users.controller");

router.post("/", login);
router.post("/register", register);

module.exports = router;
