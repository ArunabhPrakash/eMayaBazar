/*
This code exports a Mongoose model named Order that represents a schema for an order in an e-commerce application.
The mongoose module is imported at the beginning of the file.
A new schema is defined using the mongoose.Schema() constructor, which takes an object describing the fields and their types for the schema.
The orderSchema object contains the following fields:
orderItems: An array of objects containing information about the products ordered. Each object includes a slug, name, quantity, image, price, and product field. The product field is a reference to the Product model using the mongoose.Schema.Types.ObjectId type.
shippingAddress: An object that includes the full name, address, city, postal code, and country of the shipping address.
paymentMethod: A string indicating the payment method used for the order.
paymentResult: An object containing information about the payment, including the payment ID, status, update time, and email address.
itemsPrice: The total price of the ordered items.
shippingPrice: The shipping price.
taxPrice: The tax price.
totalPrice: The total price of the order, including items, shipping, and tax.
user: A reference to the User model using the mongoose.Schema.Types.ObjectId type.
isPaid: A boolean indicating whether the order has been paid or not.
paidAt: The date and time at which the order was paid.
isDelivered: A boolean indicating whether the order has been delivered or not.
deliveredAt: The date and time at which the order was delivered.
The second argument to the mongoose.Schema() constructor is an object that specifies additional options for the schema. In this case, the timestamps option is set to true, which automatically adds createdAt and updatedAt fields to the schema.
Finally, the Order model is defined by calling mongoose.model() with the name of the model and the schema object. The Order model is then exported as the default export of the module.
*/
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
