import express from 'express';
import ownerModel from '../models/owner_model.js'
import bcrypt from 'bcrypt'
import userModel from '../models/user_model.js'
const router=express.Router()

router.post('/create', async (req, res) => {
    try {
        const { ownername, email, password } = req.body;
        const owner = await ownerModel.findOne({ email: email });
        if (owner) {
            res.status(400).json({ message: "Owner already exists" });
          
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async function (err, hash) {
              let user = await ownerModel.create({
                ownername,
                email,
                password: hash,
              });
              res.status(200).json({"message":"success", "data":user}); 
            });
          });
        }   
    } catch (error) {
        console.error(error)
    }
})
router.get("/allusers", async (req, res) => {
  try {
    const alluser = await userModel.find(); // Fetch all users
     // Log users to the console (for debugging)
    res.status(200).json(alluser); // Send user data as JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});



export default router