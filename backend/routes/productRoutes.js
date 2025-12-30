import express from "express";
import upload from "../utils/multer.js";
import productModel from "../models/product_model.js";

const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  
  const { price, discount, name, category, subCategory } = req.body;
  console.log(price ,discount ,name , category ,subCategory)
  

  try {
    const product = await productModel.create({
      name,
      price,
      discount,
      category,
      subCategory,
      image: req.file.buffer,
    });
    res.json({ message: "Product created successfully", data: product });
  } catch (error) {
    console.log(error);
  }
});
router.get("/sendData", async (req, res) => {
  try {
    const { category, item } = req.query;
    console.log(category,item)

    let filter = {};

    // Handle category
    if (category && category !== "all") {
      filter.category = category;
    }

    // Handle subCategory (item)
    if (item && item !== "all") {
      filter.subCategory = item;
    }

    const products = await productModel.find(filter);

    res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/products/:id", async function (req, res) {
  const id = req.params.id;
  const product = await productModel.findById(id);
});

export default router;
