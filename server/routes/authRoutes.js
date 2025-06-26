const { login } = require("../controller/auth/loginController");
const { register } = require("../controller/auth/registerController");
const upload = require("../middleware/uploadMiddleware");

const router = require("express").Router();

router
  .post("/login", login)
  .post("/register", upload.single("image"), register);

module.exports = router;
