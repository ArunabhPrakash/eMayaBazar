/*
The code you provided defines a functional component named `HomeScreen`, which represents the home screen of an e-commerce application. Here's an explanation of how it works:
1. The component imports necessary dependencies and custom components from various libraries.
2. It defines a reducer function named `reducer` to handle state updates based on different action types. The reducer function takes the current state and an action object and returns the new state based on the action type.
3. Inside the component, it initializes state variables using the `useReducer` hook. The `products` variable represents the array of products, the `loading` variable indicates whether the data is being fetched, and the `error` variable holds any error message.
4. The component defines an effect hook using the `useEffect` hook. This effect is responsible for fetching the product data from the server when the component mounts. It dispatches actions to the reducer to update the state based on the fetch status and result.
5. The component renders the home screen layout using Bootstrap components and custom components:
   - It uses the `<Helmet>` component from the `react-helmet-async` library to set the page title.
   - It renders a heading for the featured products section.
   - Inside a `<div>` with the class name "products", it checks the loading state. If the data is still loading, it renders a `<LoadingBox>` component.
   - If there is an error during the fetch, it renders a `<MessageBox>` component with the error message.
   - If the data has been successfully fetched, it renders a `<Row>` component to display the products.
   - Each product is rendered as a `<Col>` component using the `<Product>` component. The `product` prop is passed to the `<Product>` component for rendering the product details.
6. Finally, the `HomeScreen` component is exported as the default export.
This component provides a user interface for displaying featured products on the home screen. It fetches the product data from the server, handles loading and error states, and renders the products when the data is available.

Certainly! Let's go through each case in the `reducer` function of the `HomeScreen` component:
1. Case `'FETCH_REQUEST'`:
   - This case is triggered when the fetch request is initiated.
   - It returns a new state object with the `loading` property set to `true`, indicating that the data is being fetched.
2. Case `'FETCH_SUCCESS'`:
   - This case is triggered when the fetch request is successful and the data is received.
   - It returns a new state object with the following properties:
     - `products`: It is set to the `action.payload`, which represents the fetched product data.
     - `loading`: It is set to `false`, indicating that the data fetching is completed.
     - `error`: It is cleared by setting it to an empty string.
3. Case `'FETCH_FAIL'`:
   - This case is triggered when there is an error during the fetch request.
   - It returns a new state object with the following properties:
     - `loading`: It is set to `false`, indicating that the data fetching is completed.
     - `error`: It is set to the `action.payload`, which represents the error message.
4. Default case:
   - This case is triggered when none of the above action types match.
   - It returns the current state without making any changes.
These cases handle different stages of the fetch request, allowing the component to update the state accordingly. The `'FETCH_REQUEST'` case sets the loading state to `true` to indicate that the data is being fetched. The `'FETCH_SUCCESS'` case updates the state with the fetched product data and sets the loading state to `false`. The `'FETCH_FAIL'` case sets the loading state to `false` and updates the error state with the error message. The default case ensures that the state remains unchanged if none of the specified action types are matched.
Overall, this reducer function helps manage the state of the `HomeScreen` component during the fetch request, loading, and error handling processes.
*/
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import logger from 'use-reducer-logger';
// import data from '../data';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>eMayaBazar</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
