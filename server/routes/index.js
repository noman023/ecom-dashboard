const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/products", require("./productsRoutes"));

module.exports = router;
