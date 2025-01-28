import express from "express";
import upload from "../utils/multer.js";
import productModel from "../models/product_model.js";

const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  const { price, discount, name, category } = req.body;

  try {
    const product = await productModel.create({
      name,
      price,
      discount,
      category,
      image: req.file.buffer,
    });
    res.json({ message: "Product created successfully", data: product });
  } catch (error) {
    console.log(error);
  }
});
router.get("/sendData", async (req, res) => {
  const { category } = req.query;

  if (category === "all") {
    let products = await productModel.find();
    res.json({ data: products });
  } else if (category === "men") {
    let products = await productModel.find({ category: "men" });
    res.json({ data: products });
  } else if (category === "women") {
    let products = await productModel.find({ category: "women" });
    res.json({ data: products });
  } else {
    if (category === "kids") {
      let products = await productModel.find({ category: "kids" });
      res.json({ data: products });
    }
  }
});
router.get("/products/:id", async function (req, res) {
  const id = req.params.id;
  const product = await productModel.findById(id);
});

export default router;
