const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/products", require("./productsRoutes"));
router.use("/cart", require("./cartRoutes"));
router.use("/orders", require("./orderRoutes"));
router.use("/wishlist", require("./wishlistRoutes"));

module.exports = router;
