const { addProduct } = require("../controller/productsController/addProduct");
const {
  deleteProduct,
} = require("../controller/productsController/deleteProduct");
const { editProduct } = require("../controller/productsController/editProduct");
const {
  getAllProducts,
} = require("../controller/productsController/getAllProducts");
const {
  getSingleProduct,
} = require("../controller/productsController/getSingleProduct");

const { authenticateUser } = require("../middleware/authMiddlware");
const upload = require("../middleware/uploadMiddleware");

const router = require("express").Router();

router
  .get("/", getAllProducts)
  .get("/:id", getSingleProduct)
  .post("/add", authenticateUser, upload.array("image"), addProduct)
  .post("/edit", authenticateUser, upload.array("image"), editProduct)
  .delete("/delete/:id", deleteProduct);

module.exports = router;
