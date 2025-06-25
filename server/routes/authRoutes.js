const { login } = require("../controller/auth/loginController");
const { register } = require("../controller/auth/registerController");

const router = require("express").Router();

router.get("/login", login).get("/register", register);

module.exports = router;
