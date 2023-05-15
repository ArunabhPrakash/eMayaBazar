/*
This is a React component called `SigninScreen` that represents the sign-in form for the user authentication process. Let's go through the code and explain its functionality:
1. Import statements: The necessary dependencies and components are imported from various libraries, such as React, React Bootstrap, React Router, React Helmet, and others.
2. Component and state variables: The component is exported as the default export and defined as a functional component. It uses hooks such as `useState`, `useEffect`, and `useContext` for managing state and side effects. The `useState` hook is used to define state variables for the email and password fields. These variables are initialized with empty strings.
3. Context and user information: The component accesses the global state and dispatch function from the `Store` context using the `useContext` hook. It extracts the `userInfo` object from the state.
4. Form submission handler: The `submitHandler` function is triggered when the sign-in form is submitted. It prevents the default form submission behavior and sends a POST request to the `/api/users/signin` endpoint with the email and password as the payload. If the request is successful, the user information is stored in the global state and local storage, and the user is redirected to the specified redirect URL or the home page. If there is an error, a toast message displaying the error is shown.
5. useEffect hook: The `useEffect` hook is used to check if the user is already signed in. If the `userInfo` object is not empty, it means the user is already signed in, so the user is immediately redirected to the specified redirect URL or the home page.
6. Rendered JSX: The component renders a sign-in form using the `Form` component from React Bootstrap. The form includes input fields for the user's email and password. The values of these fields are bound to the corresponding state variables using the `value` and `onChange` attributes. When the user updates the form fields, the state variables are updated accordingly. The form also includes a submit button for signing in and a link to the sign-up page for new customers.
7. Helmet component: The `Helmet` component from React Helmet is used to update the document's title, setting it to "Sign In."
8. Container component: The `Container` component from React Bootstrap is used to provide a responsive container for the sign-in form.
Overall, this component provides a user interface for entering the email and password for signing in. It sends a request to the server to authenticate the user, updates the global state with the user information upon successful sign-in, and handles redirection based on the specified redirect URL.
*/
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
