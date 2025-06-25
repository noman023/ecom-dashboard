const { login } = require("../controller/auth/loginController");
const { register } = require("../controller/auth/registerController");

const router = require("express").Router();

router.post("/login", login).post("/register", register);

module.exports = router;
