/*
The Product model defines the schema for a collection in MongoDB and represents a product in an e-commerce application. Here's a breakdown of the properties in the productSchema:
name: A required string property representing the name of the product.
slug: A required string property representing a unique identifier for the product.
image: A required string property representing the image URL for the product.
brand: A required string property representing the brand of the product.
category: A required string property representing the category of the product.
description: A required string property representing the description of the product.
price: A required number property representing the price of the product.
countInStock: A required number property representing the quantity of the product currently in stock.
rating: A required number property representing the rating of the product.
numReviews: A required number property representing the number of reviews for the product.
The timestamps option is also used to automatically add createdAt and updatedAt fields to each product document.
This Product model can be used with Mongoose methods to create, read, update, and delete products in the connected MongoDB database.*/
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
