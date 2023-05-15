/*
The code you provided defines a functional component named `CartScreen`, which represents the shopping cart screen of an e-commerce application. Here's an explanation of how it works:
1. The component imports necessary dependencies and custom components from various libraries.
2. It imports the `useContext` hook from React to access the global state and dispatch functions from the `Store` context.
3. Inside the component, it initializes variables using the `useContext` hook to extract the `cartItems` array from the global state.
4. The component defines several event handler functions:
   - `updateCartHandler`: Handles the updating of cart items by dispatching a `CART_ADD_ITEM` action with the updated item quantity.
   - `removeItemHandler`: Handles the removal of a cart item by dispatching a `CART_REMOVE_ITEM` action with the item to be removed.
   - `checkoutHandler`: Handles the checkout process by navigating to the sign-in page.
5. The component renders the shopping cart screen layout using Bootstrap components and custom components:
   - It uses the `<Helmet>` component from the `react-helmet-async` library to set the page title.
   - It renders a heading for the shopping cart page.
   - Inside a `<Row>` component, it checks if the cart is empty. If it is, it displays a message and provides a link to go back to shopping.
   - If the cart is not empty, it renders a `<ListGroup>` component to display the cart items.
   - Each cart item is rendered as a `<ListGroup.Item>` component.
   - The item details, including the image, name, quantity, price, and remove button, are displayed in a grid layout using `<Row>` and `<Col>` components.
   - The quantity of each item can be increased or decreased using the plus and minus buttons.
   - The subtotal and checkout button are displayed in a separate `<Col>` component.
   - The subtotal is calculated by reducing the cart items array to the sum of the item prices multiplied by their quantities.
   - The checkout button is disabled if the cart is empty.
6. Finally, the `CartScreen` component is exported as the default export.
This component provides a user interface for managing the shopping cart, updating item quantities, removing items, and proceeding to checkout.
 */
import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
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
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
