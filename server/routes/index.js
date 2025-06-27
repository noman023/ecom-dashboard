const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/products", require("./productsRoutes"));
router.use("/cart", require("./cartRoutes"));
router.use("/orders", require("./orderRoutes"));

module.exports = router;
