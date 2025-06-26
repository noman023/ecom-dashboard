const { addProduct } = require("../controller/productsController/addProduct");
const upload = require("../middleware/uploadMiddleware");

const router = require("express").Router();

router.post("/add", upload.array("image"), addProduct);

module.exports = router;
