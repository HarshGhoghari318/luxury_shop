import mongoose  from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subCategory:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: Buffer,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        default: 1
    }
 



   
})

const model=mongoose.model('products',productSchema);
export default model 