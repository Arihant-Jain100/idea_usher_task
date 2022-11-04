const express = require('express');
const router = new express.Router();
const upload = require("../utils/multer");
const productController = require('../controller/product_controller');

router.post("/postProduct", upload.single("image"), productController.postreq);

router.get("/getProducts", productController.getreq);

router.delete("/:id", productController.deletePr);

router.put("/update/:id", upload.single("image"),productController.putreq);

router.get("/show_one/:id", productController.show_one);

module.exports = router;