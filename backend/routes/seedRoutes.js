/*
This code defines a route handler for the `/seed` endpoint, which is used to populate the database with initial data. When the endpoint is hit, it deletes all existing products and users from the database using the `deleteOne()` method of Mongoose, inserts new products and users using the `insertMany()` method, and sends a response indicating the number of products and users created. 

The product and user data are imported from `data.js` file. This is a common practice to create a seed file that contains the initial data to populate the database when the application is first run.
*/
import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteOne({});
  const createdProducts = await Product.insertMany(data.products);
  await User.deleteOne({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});
export default seedRouter; // this is imported by server.js
