/*
This is a module that defines the product router for the web application. It exports an Express router instance that handles HTTP requests related to products. 
- The first route responds to GET requests to the root path `/` and returns an array of all products in the database using the `Product.find()` method.
- The second route responds to GET requests with a parameter `slug`, which is used to find a product with the given slug. It uses the `Product.findOne()` method to search the database for a product with a matching `slug` property. If the product is found, it is sent back in the response. If not, a 404 Not Found response is sent.
- The third route responds to GET requests with a parameter `id`, which is used to find a product with the given `_id`. It uses the `Product.findById()` method to search the database for a product with a matching `_id` property. If the product is found, it is sent back in the response. If not, a 404 Not Found response is sent.
This module is imported and used by the `server.js` file to handle product-related requests.

In the above code, async is used as a keyword before the callback function of each route handler in the productRouter. It allows the function to use await inside it to wait for asynchronous operations to complete. When an asynchronous operation is awaited, the function is paused until the operation completes and then resumes its execution.
By using async in the route handlers, we can write code that looks synchronous and is easier to read and understand, while still allowing for asynchronous operations such as database queries using Mongoose.
*/
import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: { $eq: req.params.slug } });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter; // this is imported by server.js
