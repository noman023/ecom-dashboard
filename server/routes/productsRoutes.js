const { addProduct } = require("../controller/productsController/addProduct");
const {
  deleteProduct,
} = require("../controller/productsController/deleteProduct");
const { editProduct } = require("../controller/productsController/editProduct");
const {
  getAllProducts,
} = require("../controller/productsController/getAllProducts");
const {
  getSellerProducts,
} = require("../controller/productsController/getSellerProducts");
const {
  getSingleProduct,
} = require("../controller/productsController/getSingleProduct");

const { authenticateUser } = require("../middleware/authMiddlware");
const upload = require("../middleware/uploadMiddleware");

const router = require("express").Router();

router
  .get("/", getAllProducts)
  .get("/seller", authenticateUser, getSellerProducts)
  .get("/:id", getSingleProduct)
  .post("/add", authenticateUser, upload.array("image"), addProduct)
  .put("/edit/:id", authenticateUser, upload.array("image"), editProduct)
  .delete("/delete/:id", deleteProduct);

module.exports = router;
