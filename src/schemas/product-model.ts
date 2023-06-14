import mongoose from "mongoose";
import {Product} from "../models/product";


const productModel = new mongoose.Schema<Product>({
  title: {type: String, required: true},
  price: {type: Number, required: true},
})

export const ProductModel = mongoose.model('Product', productModel);