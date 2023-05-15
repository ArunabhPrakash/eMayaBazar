/*
The code you provided is for the `PaymentMethodScreen` component. Here's an explanation of the code:
1. Import statements:
   - The necessary dependencies and components are imported, including React, hooks, components from `react-bootstrap`, and `react-helmet-async`.
   - The `CheckoutSteps` component is imported from '../components/CheckoutSteps'.
   - The `Store` context is imported.
2. `PaymentMethodScreen` component:
   - The component is defined as a function component.
   - The `useNavigate` hook is used to get the navigation object for routing.
   - The `useContext` hook is used to access the global state from the `Store` context and the dispatch function from the context.
   - The `paymentMethod` and `shippingAddress` are destructured from the state.
   - The `paymentMethodName` state is initialized with the value of `paymentMethod` from the state or 'PayPal' as the default value.
   - An effect hook is used to check if the `shippingAddress` is available. If not, the user is redirected to the shipping page.
   - The `submitHandler` function is defined to handle the form submission.
   - In the `submitHandler`, the `SAVE_PAYMENT_METHOD` action is dispatched with the `paymentMethodName` as the payload.
   - The `paymentMethodName` is also stored in the local storage for persistence.
   - After dispatching the action and storing the payment method, the user is navigated to the '/placeorder' route.
   - The component JSX is rendered:
     - The `CheckoutSteps` component is rendered with the 'step1', 'step2', and 'step3' props.
     - The container, page title, and form are rendered.
     - Two radio buttons are provided for selecting the payment method: PayPal and Paytm.
     - The `paymentMethodName` state is used to determine the checked status of each radio button.
     - The `setPaymentMethod` function is used to update the selected payment method.
     - The form is submitted by clicking the 'Continue' button, which triggers the `submitHandler` function.

The `useEffect` hook in the code you provided is responsible for checking whether the `shippingAddress` is available. If the `shippingAddress` is not available, it means the user has not yet entered their shipping address, so the user is redirected to the `/shipping` page.
Here's how the `useEffect` hook works in this code:
The `useEffect` hook takes a function as its first argument and an array of dependencies as its second argument. In this case, the function is responsible for checking the `shippingAddress` and navigating the user to the `/shipping` page if the address is not available.
The dependencies array `[shippingAddress, navigate]` specifies that the effect should be re-run whenever the values of `shippingAddress` or `navigate` change. This ensures that the effect is triggered whenever the shipping address is updated or the navigation object changes.
By using this effect, the code ensures that the user is redirected to the `/shipping` page if they try to access the `PaymentMethodScreen` component without entering their shipping address first.
*/
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paytm"
              label="Paytm"
              value="Paytm"
              checked={paymentMethodName === 'Paytm'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
