import express from 'express';
//import data from './data.js';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config(); //The main purpose of the Dotenv package is to allow developers to create a . env file that has custom environment files that are added into the process.

/*This code is written in JavaScript using the Mongoose library to connect to a MongoDB database.
The mongoose module is imported and the connect() method is called on it, passing in the value of the MONGODB_URI environment variable.
The connect() method returns a Promise which is handled using then() and catch() methods.
If the connection is successful, the string 'connected to db' is logged to the console. If an error occurs, the error message is logged to the console using console.log(err.message).
Overall, this code is attempting to establish a connection to a MongoDB database using the Mongoose library and provide feedback to the user whether the connection was successful or not.
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
/* This code is written in JavaScript using the Express.js library to create a web application.
The express module is imported and an instance of the express application is created by invoking the exported function. This instance is assigned to the app constant.
The app.use() method is then called twice to configure middleware for the application.
The first middleware that is added using app.use(express.json()) is responsible for parsing incoming JSON payloads in the request body. It adds a body property to the request object containing the parsed JSON data.
The second middleware that is added using app.use(express.urlencoded({ extended: true })) is responsible for parsing incoming URL-encoded payloads in the request body. It adds a body property to the request object containing the parsed URL-encoded data.
By using these two middleware functions, the express application is now capable of accepting and parsing both JSON and URL-encoded data in the request body.*/
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// test
/*
This code is defining a route handler for a GET request to the path /api/keys/paypal.
When a client makes a GET request to this endpoint, the callback function is executed.
The callback function takes two arguments: req and res. req is the request object representing the HTTP request made by the client and res is the response object representing the HTTP response that will be sent back to the client.
The callback function uses the res.send() method to send a response back to the client. The response body is set to the value of the PAYPAL_CLIENT_ID environment variable or 'sb' if the environment variable is not defined.
*/
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
/*
This code is configuring the application to use different routers for different endpoints.
The app.use() method is called four times to register four different routers for different sets of endpoints:
seedRouter is registered for the /api/seed endpoint.
productRouter is registered for the /api/products endpoint.
userRouter is registered for the /api/users endpoint.
orderRouter is registered for the /api/orders endpoint.
Each router is an instance of an Express Router that has been defined in a separate module.
By using routers to group related endpoints, the codebase is organized into smaller, more manageable pieces, making it easier to maintain and develop.
*/
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
