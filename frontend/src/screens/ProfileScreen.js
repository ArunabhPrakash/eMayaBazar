/*
This is a React component called `ProfileScreen`, which represents a user profile page. Let's go through the code and explain its functionality:
1. Import statements: The necessary dependencies and components are imported from various libraries, such as React, React Bootstrap, React Helmet, and Axios.
2. Reducer function: The `reducer` function is a callback function used by the `useReducer` hook. It handles state updates for the loading status during profile updates.
3. ProfileScreen component: This is the main component exported as the default export. It is a functional component that uses hooks such as `useState`, `useContext`, and `useReducer` for managing state and side effects.
4. State variables: The component initializes state variables using the `useState` hook. These variables hold the current values of the user's name, email, password, and confirmPassword.
5. Reducer state: The `useReducer` hook is used to manage loading states related to profile updates. The `loadingUpdate` state variable represents whether the update request is in progress.
6. Context and user information: The component accesses the global state and dispatch function from the `Store` context using the `useContext` hook. It extracts the `userInfo` object from the state, which contains user-related information.
7. Form submission handler: The `submitHandler` function is triggered when the form is submitted. It prevents the default form submission behavior and makes an asynchronous request to update the user's profile using the `axios.put` method. The request includes the updated name, email, and password, along with the user's token for authentication. If the request is successful, it updates the user's information in the global state, stores the updated user information in local storage, and displays a success toast message. If there's an error, it displays an error toast message.
8. Rendered JSX: The component renders a form using the `Form` component from React Bootstrap. The form includes input fields for the user's name, email, password, and confirm password. The form fields are bound to the corresponding state variables using the `value` and `onChange` attributes. When the user updates the form fields, the state variables are updated accordingly. The form also includes a submit button for updating the user's profile.
9. Helmet component: The `Helmet` component from React Helmet is used to update the document's title, setting it to "User Profile."
Overall, this component provides a user interface for updating the user's profile information, handles form submissions, and communicates with the server using Axios. It leverages React hooks and the global state to manage state and trigger updates when necessary.
*/
import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}
