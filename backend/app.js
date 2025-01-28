import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'
import ownerRouter from './routes/ownerRoutes.js'
import productRouter from './routes/productRoutes.js'
import dotenv from 'dotenv'

dotenv.config(); 
const app = express();
app.use(cors({  
    origin:"http://localhost:5173",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: '10mb' }))

app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes)
app.use('/owner', ownerRouter)
app.use('/product', productRouter)



try {
  mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected successfully"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

} catch (error) {
  console.log(error);
}


const port = 3000;
app.listen(port, () => console.log(`listening on http//localhost:${port}`));
