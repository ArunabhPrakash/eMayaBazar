/*
This is a React component called `ShippingAddressScreen`, which represents the shipping address form for the checkout process. Let's go through the code and explain its functionality:
1. Import statements: The necessary dependencies and components are imported from various libraries, such as React, React Helmet, React Bootstrap, and React Router.
2. Component and state variables: The component is exported as the default export and defined as a functional component. It uses hooks such as `useState`, `useEffect`, and `useContext` for managing state and side effects. The `useState` hook is used to define state variables for the shipping address form fields (fullName, address, city, postalCode, and country). The initial values for these variables are set based on the `shippingAddress` object extracted from the global state.
3. Context and user information: The component accesses the global state and dispatch function from the `Store` context using the `useContext` hook. It also extracts the `userInfo` object and the `shippingAddress` object from the state.
4. useEffect hook: The `useEffect` hook is used to redirect the user to the sign-in page if there is no user information available. It listens for changes in the `userInfo` and `navigate` variables and triggers the redirect when necessary.
5. Form submission handler: The `submitHandler` function is triggered when the form is submitted. It prevents the default form submission behavior and dispatches an action to save the shipping address information in the global state using the `ctxDispatch` function. It also stores the shipping address information in local storage. Finally, it navigates the user to the `/payment` page.
6. Rendered JSX: The component renders a form using the `Form` component from React Bootstrap. The form includes input fields for the user's full name, address, city, postal code, and country. The values of these fields are bound to the corresponding state variables using the `value` and `onChange` attributes. When the user updates the form fields, the state variables are updated accordingly. The form also includes a submit button for continuing to the next step of the checkout process.
7. Helmet component: The `Helmet` component from React Helmet is used to update the document's title, setting it to "Shipping Address."
8. CheckoutSteps component: The `CheckoutSteps` component is a custom component that displays a visual representation of the checkout steps. In this case, it shows that the user is on step 1 and step 2 of the checkout process.
Overall, this component provides a user interface for entering the shipping address information during the checkout process. It retrieves the initial values from the global state, allows the user to update the form fields, and handles form submissions by dispatching actions and navigating to the next step.
*/
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
