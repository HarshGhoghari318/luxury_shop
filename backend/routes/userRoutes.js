import express from "express";
import userModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import ownerModel from "../models/owner_model.js";
import mongoose from "mongoose";


const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password,sex,address,mobile} = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      res.json({ message: "User already exists", data: null });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async function (err, hash) {
          let user = await userModel.create({
            username,
            email,
            password: hash,
            sex,
            address,
            mobileNo:mobile,
          });
          res.json({ message: "success", data: user });
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
});
router.get("/user", async (req, res) => {
  const user = await userModel.findOne({ email: req.query.email }).populate(["cart","order"])
  res.json({ message: "success", data: user });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body; 
  const user = await userModel.findOne({ email: email });
  const owner = await ownerModel.findOne({ email: email });
  try {
    if (owner && (await bcrypt.compare(password, owner.password))) {
      res.json({ message: "owner", data: owner });
    } else if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ message: "user", data: user });
    } else {
      res.json({ message: "Invalid credentials", data: null });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/addtoCart", async (req, res) => {
 
   
  try {
    const user = await userModel.findOne({ email: req.body.email });

    const isItemInCart = user.cart.some(
      (item) => item.toString() === req.body.id
    );
    // console.log(isItemInCart);

    if (!isItemInCart) {
      user.cart.push(new mongoose.Types.ObjectId(req.body.id));
      await user.save();
      console.log("Addtocat:",user.cart);
      res.status(200).json({ message: "Item added to cart successfully!" });
    } else {
      res.status(400).json({ message: "Item is already in the cart." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding to the cart." });
  }
});
router.post("/removeFCart", async (req, res) => {
  // console.log(req.body);
  const user = await userModel.findOne({ email: req.body.email });
  const idx = user.cart.indexOf(new mongoose.Types.ObjectId(req.body.id));
  user.cart.splice(idx,1);
  console.log("afterremove",user.cart)
  await user.save();
 
});

router.post('/pmngQuantity', async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email }).populate("cart");

  const idx = user.cart.findIndex((item) => item._id.toString() === req.body.id);
  // console.log(idx)

  if (idx !== -1) {
    user.cart[idx].quantity += user?.cart[idx].quantity;
    // console.log(user.cart[idx].quantity)
    await user.save();
    res.status(200).json({ message: "Quantity incremented", updatedCart: user.cart });
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
});

router.post('/orders', async (req, res) => {
  try {
    // Find user by email
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Add items to order
    req.body.data.forEach((item) => {
      user.order.push(new mongoose.Types.ObjectId(item._id));
    });

    // Clear cart
    await userModel.findOneAndUpdate(
      { email: req.body.email },  // Find by email
      { $set: { cart: [] } },     // Set cart to empty
      { new: true }               // Return updated user
    );

    // Save user with updated order
    await user.save();

    console.log('Updated user order:', user.order);
    console.log('Updated user cart:', user.cart);

    res.status(200).send('Order placed and cart cleared');
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/Eprofile', async (req, res) => {
  // console.log(req.body)
    try {
      const user = await userModel.findOneAndUpdate(
        { email: req.query.email },  
        { 
          $set: {                      
            username: req.body.username,
            sex: req.body.sex,
            address: req.body.address,
            mobileNo: req.body.mobileNo
          } 
        },        
        { new: true }               
      );
      // console.log(user)
      res.status(200).json({ message: 'profile update successfully', data: user });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('Internal server error');
    }
  });




export default router;
