/*
The above code defines a Mongoose schema for a User model. The schema contains the following fields:
name: a required string field representing the name of the user.
email: a required string field representing the email of the user. This field is also set as unique, meaning that no two users can have the same email.
password: a required string field representing the password of the user.
isAdmin: a boolean field representing whether the user is an administrator or not. This field has a default value of false and is required.
timestamps: a built-in Mongoose option that automatically adds createdAt and updatedAt fields to the schema.
The User model is then created using the mongoose.model() method and exported. This model can be used to interact with a MongoDB database collection for storing user information.
*/ import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
