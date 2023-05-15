/*
The code snippet provided defines an object named `data` and exports it as the default export. Here's a breakdown of the code:
The `data` object contains a `products` array that holds multiple product objects. Each product object represents a specific product with properties such as `name`, `slug`, `category`, `image`, `price`, `countInStock`, `brand`, `rating`, `numReviews`, and `description`.
The exported `data` object can be imported in other modules using the `import` statement, and the `products` array can be accessed to retrieve product information.
This code allows you to store and export product data, making it available for use in other parts of your application.
*/
const data = {
  products: [
    {
      name: 'aastin-tshirt',
      slug: 'aastin-tshirt',
      category: 'Shirts',
      image: '/images/aastin_tshirt.jpg', // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: 'AP',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      name: 'Denial-cap',
      slug: 'Denial-cap',
      category: 'Shirts',
      image: '/images/Denial_cap.jpg',
      price: 250,
      countInStock: 20,
      brand: 'AP',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Denial-tshirt',
      slug: 'Denial-tshirt',
      category: 'Shirts',
      image: '/images/Denial_tshirt.jpg',
      price: 25,
      countInStock: 15,
      brand: 'AP',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'sink-tshirt',
      slug: 'sink-tshirt',
      category: 'Shirts',
      image: '/images/sink_tshirt.jpg',
      price: 65,
      countInStock: 5,
      brand: 'AP',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
};
export default data;
