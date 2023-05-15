/*
This is a React component called `SignupScreen` that represents the sign-up form for user registration. Let's go through the code and explain its functionality:
1. Import statements: The necessary dependencies and components are imported from various libraries, such as React, React Bootstrap, React Router, React Helmet, and others.
2. Component and state variables: The component is exported as the default export and defined as a functional component. It uses hooks such as `useState`, `useEffect`, and `useContext` for managing state and side effects. The `useState` hook is used to define state variables for the name, email, password, and confirmPassword fields. These variables are initialized with empty strings.
3. Context and user information: The component accesses the global state and dispatch function from the `Store` context using the `useContext` hook. It extracts the `userInfo` object from the state.
4. Form submission handler: The `submitHandler` function is triggered when the sign-up form is submitted. It prevents the default form submission behavior. It checks if the password and confirmPassword match. If they don't match, an error toast message is displayed. If they match, a POST request is sent to the `/api/users/signup` endpoint with the name, email, and password as the payload. If the request is successful, the user information is stored in the global state and local storage, and the user is redirected to the specified redirect URL or the home page. If there is an error, a toast message displaying the error is shown.
5. useEffect hook: The `useEffect` hook is used to check if the user is already signed in. If the `userInfo` object is not empty, it means the user is already signed in, so the user is immediately redirected to the specified redirect URL or the home page.
6. Rendered JSX: The component renders a sign-up form using the `Form` component from React Bootstrap. The form includes input fields for the user's name, email, password, and confirmPassword. The values of these fields are bound to the corresponding state variables using the `value` and `onChange` attributes. When the user updates the form fields, the state variables are updated accordingly. The form also includes a submit button for signing up and a link to the sign-in page for users who already have an account.
7. Helmet component: The `Helmet` component from React Helmet is used to update the document's title, setting it to "Sign Up."
8. Container component: The `Container` component from React Bootstrap is used to provide a responsive container for the sign-up form.
Overall, this component provides a user interface for entering the name, email, password, and confirmPassword for user registration. It sends a request to the server to create a new user account, updates the global state with the user information upon successful sign-up, and handles redirection based on the specified redirect URL.
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

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
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
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

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
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
}
