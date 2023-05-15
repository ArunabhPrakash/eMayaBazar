/*
The code you provided represents a React functional component called `ProductScreen`. This component is responsible for rendering the details of a single product. Let's go through the code step by step:
1. The required dependencies and components are imported from various libraries and local files.
2. A reducer function is defined using the `useReducer` hook. This reducer handles the state updates for fetching the product details.
3. The `ProductScreen` component is defined as a function. Inside the component, the `useNavigate` and `useParams` hooks are used to get the navigation function and the URL parameters, respectively.
4. The `useReducer` hook is used to initialize the state and dispatch function based on the provided reducer. The initial state sets the `product` property as an empty array, `loading` property as `true`, and `error` property as an empty string.
5. An effect is used to fetch the product details when the component mounts or the `slug` parameter changes. Inside the effect, an asynchronous function `fetchData` is defined. It dispatches an action to set the loading state to `true`. It then makes a GET request to the `/api/products/slug/${slug}` endpoint to fetch the product details based on the `slug` parameter. If the request is successful, it dispatches an action to set the product details in the state. If there is an error, it dispatches an action to set the error message in the state. The effect runs whenever the `slug` parameter changes.
6. The `useContext` hook is used to access the state and dispatch function from the `Store` context.
7. The `addToCartHandler` function is an asynchronous function responsible for adding the product to the cart. It checks if the product already exists in the cart and updates the quantity accordingly. It then makes a GET request to the `/api/products/${product._id}` endpoint to get the latest information about the product, including the stock count. If the product is out of stock, an alert message is shown to the user. Otherwise, it dispatches an action to add the product to the cart with the updated quantity and navigates the user to the cart page.
8. The component's return statement defines the JSX that will be rendered. It includes a loading box if the `loading` state is `true`, an error message if the `error` state is not empty, and the product details if both `loading` and `error` states are `false`. The product details include an image, name, rating, price, description, and status. If the product is in stock, an "Add to Cart" button is displayed.
9. Inside the JSX, the product details are rendered using Bootstrap components.
Overall, this component fetches and displays the details of a single product, allows the user to add the product to the cart, and handles navigation to different pages.
 */
import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ProductScreen;
