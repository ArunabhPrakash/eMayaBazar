/*
The code you provided is a functional component named `Product`. It renders a product card using the `Card` component from `react-bootstrap`. Let's break it down:
1. The component imports several dependencies:
   - `Card` and `Button` components from `react-bootstrap`
   - `Link` component from `react-router-dom`
   - `Rating` component from a local file named `Rating`
   - `axios` for making HTTP requests
   - `useContext` hook from React
   - `Store` context from a local file named `Store`
2. The `Product` component is exported as the default export.
3. Inside the component, it receives the `product` object as a prop.
4. It uses the `useContext` hook to access the global state and dispatch function from the `Store` context.
5. It destructures the `cartItems` array from the global state.
6. The `addToCartHandler` function is defined to handle the action of adding a product to the cart. It checks if the product already exists in the cart and increments the quantity if it does. Then, it makes a GET request to fetch the product details and checks if the available quantity is sufficient. If not, it shows an alert message. Finally, it dispatches an action to add the product to the cart with the updated quantity.
7. The component renders a `Card` component from `react-bootstrap`.
8. Inside the card, it uses the `Link` component to wrap the product image, name, and title, creating a link to the individual product page.
9. The product image is displayed using the `img` tag with the `src` set to `product.image` and the `alt` attribute set to `product.name`.
10. The product name is rendered as the `Card.Title` component within the `Link` component.
11. The `Rating` component is rendered, passing the `product.rating` and `product.numReviews` as props.
12. The product price is rendered as `Card.Text`, displaying the price with a dollar sign.
13. Depending on the `product.countInStock` value, it renders either a disabled `Button` with the "Out of stock" label or a clickable `Button` labeled "Add to cart". The `addToCartHandler` function is called when the "Add to cart" button is clicked, passing the `product` as an argument.
Overall, this component represents a product card with its image, name, rating, price, and an option to add it to the cart. It utilizes various components from `react-bootstrap` and interacts with the global state using the `useContext` hook and the `Store` context.
*/

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
