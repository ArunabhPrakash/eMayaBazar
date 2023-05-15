/*
The code you provided is for the `OrderHistoryScreen` component. Here's an explanation of the code:
1. Import statements:
   - The necessary dependencies and components are imported, including React, hooks, components from `react-bootstrap`, `Helmet` from `react-helmet-async`, and utility functions.
2. Reducer function:
   - The `reducer` function handles different actions related to fetching order history.
   - It updates the state based on the action type:
     - `'FETCH_REQUEST'`: Sets the `loading` property to `true`.
     - `'FETCH_SUCCESS'`: Sets the `orders` property to the fetched order data and sets `loading` to `false`.
     - `'FETCH_FAIL'`: Sets the `loading` property to `false` and updates the `error` property with the error message.
     - Default case: Returns the current state.
3. `OrderHistoryScreen` component:
   - The component is defined as a function component.
   - The `useContext` hook is used to access the global state from the `Store` context.
   - The `useNavigate` hook is used to navigate to different routes.
   - The `useReducer` hook is used to manage the component's state with the `reducer` function.
   - The initial state is set with `loading` set to `true` and `error` set to an empty string.
   - An effect hook is used to fetch the order history when the `userInfo` changes.
   - Within the effect, the `fetchData` function is defined to handle the fetch request.
   - The `FETCH_REQUEST` action is dispatched to set the loading state to `true`.
   - The order data is fetched using an asynchronous `axios.get` request, including the user's token in the request headers for authentication.
   - If the request is successful, the `FETCH_SUCCESS` action is dispatched with the fetched data.
   - If there is an error, the `FETCH_FAIL` action is dispatched with the error message.
   - The return statement renders the component JSX based on the state:
     - If `loading` is true, a `LoadingBox` component is rendered.
     - If `error` is present, a `MessageBox` component with a danger variant is rendered with the error message.
     - Otherwise, a table is rendered with the order history data mapped to table rows.
     - Each order's details, such as ID, date, total, paid status, delivered status, and actions, are displayed.
     - The order details button allows the user to navigate to the order details page.
Overall, this component fetches and displays the order history for the authenticated user. It uses the reducer pattern to manage the loading, error, and order data states.
*/
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
