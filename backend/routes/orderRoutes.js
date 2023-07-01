/*
This is an Express router that handles HTTP requests related to orders. It imports the `Order` model from `../models/orderModel.js` and the `isAuth` middleware function from `../utils.js`.
The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.
The router defines the following endpoints:
- `POST /`: Creates a new order. The request must be authenticated, so the `isAuth` middleware is used. The request body must contain the following properties: `orderItems`, `shippingAddress`, `paymentMethod`, `itemsPrice`, `shippingPrice`, `taxPrice`, and `totalPrice`. The `orderItems` property is an array of objects, each representing an item in the order, with properties such as `name`, `quantity`, `price`, and `product`. The `product` property is a reference to the `_id` property of a product. The router creates a new `Order` instance based on the request body, saves it to the database, and sends a response with status code `201` and the created order.
- `GET /mine`: Gets all orders for the authenticated user. The request must be authenticated, so the `isAuth` middleware is used. The router finds all orders in the database where the `user` property matches the `_id` property of the authenticated user, and sends the orders as a response.
- `GET /:id`: Gets a specific order by its ID. The request must be authenticated, so the `isAuth` middleware is used. The router finds the order with the given ID in the database and sends it as a response. If the order is not found, the router sends a response with status code `404` and an error message.
- `PUT /:id/pay`: Updates an order to indicate that it has been paid. The request must be authenticated, so the `isAuth` middleware is used. The request body must contain the following properties: `id`, `status`, `update_time`, and `email_address`. The router finds the order with the given ID in the database, sets its `isPaid` property to `true`, sets its `paidAt` property to the current date and time, and sets its `paymentResult` property to an object based on the request body. The router saves the updated order to the database and sends a response with the updated order. If the order is not found, the router sends a response with status code `404` and an error message.

The `expressAsyncHandler` is a middleware function used in the Express framework for handling asynchronous errors in an express route handler function. 
It helps to handle errors thrown from async/await functions inside a route handler function by catching the error and passing it to the next middleware, which is usually the error-handling middleware.
In the code snippet you provided, `expressAsyncHandler` is used to wrap the asynchronous route handler functions of the `orderRouter` to handle any errors that might be thrown by the `await` keyword.
For example, in the `POST /` route handler, the `expressAsyncHandler` function is used to wrap the route handler function that creates a new order. If there is an error thrown during the execution of the route handler, it will be caught by the `expressAsyncHandler` and passed to the next middleware, which will then handle the error and send an appropriate response to the client.
Overall, using `expressAsyncHandler` in the route handlers helps to avoid the need for try-catch blocks and simplifies error handling in asynchronous route handlers.
*/
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter; // this is imported by server.js
