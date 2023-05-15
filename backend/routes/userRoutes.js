/*
This is a module that defines a userRouter object using Express.js Router. It handles user-related routes for authentication and authorization.
- The '/signin' route handles user login. It accepts a POST request and uses the expressAsyncHandler to wrap the async function that finds the user with the given email and validates their password. If the user exists and the password is valid, it sends back a JSON object containing user details and a token generated with the help of the `generateToken()` function. If the email or password is invalid, it sends a 401 status code with an error message.
- The '/signup' route handles user registration. It accepts a POST request and uses the expressAsyncHandler to wrap the async function that creates a new user object and saves it in the database using the `save()` method. If the user is successfully created, it sends back a JSON object containing user details and a token generated with the help of the `generateToken()` function.
- The '/profile' route handles user profile updates. It accepts a PUT request and uses the `isAuth` middleware to check if the user is authenticated. If authenticated, it uses the `findById()` method to find the user in the database with the given id, updates the user details and saves them to the database. If successful, it sends back a JSON object containing user details and a token generated with the help of the `generateToken()` function. If the user is not found, it sends a 404 status code with an error message.
The `bcryptjs` library is used to hash the user's password before saving it to the database. The `generateToken()` function generates a JSON Web Token (JWT) that contains user details and an expiration date. The `isAuth` middleware checks if the request contains a valid token. If the token is valid, it extracts the user details from the token and adds them to the `req` object, allowing the request to proceed. Otherwise, it sends a 401 status code with an error message.
*/
import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);
export default userRouter; // this is imported by server.js
