const { login } = require("../controller/authController/login");
const { register } = require("../controller/authController/register");
const upload = require("../middleware/cloudinaryMiddleware");

const router = require("express").Router();

router
  .post("/login", login)
  .post("/register", upload.single("image"), register);

module.exports = router;
