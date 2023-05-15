//long comment so below code
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container className="mt-3">
              <LinkContainer to="/">
                <Navbar.Brand>eMayaBazar</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />}></Route>
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>

              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

/*
The provided code represents the main component of a React application using the React Router library for routing and several other dependencies for building a responsive e-commerce website.
Here's a breakdown of the code:
1. Import statements: The code imports various modules and components required for the application, including React Router, Bootstrap components, and custom screen components.
2. Functional component `App`: This is the main component of the application. It uses the `useContext` hook to access the global state and dispatch functions from the `Store` context. It also retrieves the `cart` and `userInfo` values from the global state.
3. `signoutHandler` function: This function handles the signout functionality. It dispatches a 'USER_SIGNOUT' action to update the user's state, removes user-related data from localStorage, and redirects the user to the signin page.
4. `BrowserRouter`: This component is imported from React Router and wraps the entire application, enabling client-side routing.
5. Application layout: The code defines the layout structure with a header, main content, and footer.
6. Header: The header section contains a Bootstrap Navbar component. It displays the site logo, navigation links, and user-related actions (Cart, User Profile, Order History, Sign Out) based on the user's authentication status and the number of items in the cart.
7. Main content: The main section renders different screens based on the current route using the React Router's `Route` and `Routes` components. Each `Route` component specifies a path and the corresponding screen component to render.
8. Footer: The footer section displays a simple copyright message.
9. Export: The `App` component is exported as the default component for the file.
Overall, this code sets up the main structure of the application, including routing, navigation, and rendering different screens based on the current route. It also handles user authentication, cart functionality, and some basic UI elements using Bootstrap components.

In the provided code, the following components and concepts have specific roles:
1. `Badge` (from `react-bootstrap/Badge`): The `Badge` component is used to display the number of items in the cart. It visually represents the quantity of items in a visually appealing manner, such as a small circular badge with a number. In the code, it is conditionally rendered when there are items in the cart, and the number displayed is calculated using the `reduce` method on the `cartItems` array.
2. `Container` (from `react-bootstrap/Container`): The `Container` component is a layout component from the React Bootstrap library. It provides a responsive container to wrap the content of the application. It helps ensure proper spacing, alignment, and responsiveness of the content within the container. In the code, it is used to wrap the main content of the application.
3. `LinkContainer` (from `react-router-bootstrap/LinkContainer`): The `LinkContainer` component is a wrapper component provided by the `react-router-bootstrap` library. It is used to create a navigation link that integrates with React Router. It provides a convenient way to create links that navigate to different routes defined in the application. In the code, it is used to wrap the navigation links in the header component, enabling navigation to different screens when the links are clicked.
4. `useContext`: The `useContext` hook is a built-in React hook used for consuming values from a context. In the code, it is used to access the global state and dispatch functions from the `Store` context. By using `useContext(Store)`, the component can access the state and dispatch functions defined in the context, allowing it to read and update the global state. In this case, it is used to retrieve the `cart` and `userInfo` values from the global state.
These components and concepts play important roles in the application:
- The `Badge` component helps display the cart item count visually.
- The `Container` component provides a responsive layout for the main content.
- The `LinkContainer` component enables navigation to different screens when the links are clicked.
- The `useContext` hook allows the component to access and interact with the global state.

In the context of the provided code, a "wrapper component" refers to the `LinkContainer` component from the `react-router-bootstrap` library that wraps around the navigation links (`<Nav.Link>` elements) in the header component.
A wrapper component is a component that surrounds or encapsulates other components, providing additional functionality or behavior to those components. In this case, the `LinkContainer` component acts as a wrapper around the navigation links, enhancing them with the ability to navigate to different routes defined in the application using React Router.
By using the `LinkContainer` component, the navigation links `<Nav.Link>` become aware of the routing configuration and can trigger navigation to the specified routes when clicked. It integrates the functionality of React Router with the Bootstrap navigation components (`<Nav.Link>`), allowing navigation to be handled seamlessly within the application.
In summary, the `LinkContainer` acts as a wrapper component that augments the navigation links, enabling them to navigate to different routes defined in the application.

In the provided code, the `useContext` hook is used to access the global state managed by the `Store` context. The global state refers to a centralized state that can be accessed and modified by multiple components throughout the application.
The `Store` context is created using the `createContext` function from React, and it provides a way to share state data across different components without the need for prop drilling (passing data through intermediate components). The `Store` context typically includes a state object and a dispatch function to modify the state.
By using the `useContext` hook with the `Store` context, components can access and consume the global state values stored in the `state` object. In the provided code, the following line extracts the `state` object and the `dispatch` function from the `Store` context:
```jsx
const { state, dispatch: ctxDispatch } = useContext(Store);
```
The `state` object contains properties such as `cart` and `userInfo`, representing different aspects of the application state. Components can access and utilize these state values as needed. For example, the `cart` property is used to display the number of items in the cart in the navigation bar:
```jsx
{cart.cartItems.length > 0 && (
  <Badge pill bg="danger">
    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
  </Badge>
)}
```
The `useContext` hook allows components to access the global state easily without passing down props explicitly, making it convenient to share and manage application-wide data.
Overall, the ToastContainer and react-toastify library provide a convenient way to show informative and visually appealing notifications to the user in response to different events or actions in the application.
The ToastContainer component is responsible for rendering the toast notifications within the application. It needs to be placed at the root level of the component hierarchy to ensure that it covers the entire application and can display notifications from any part of the application.
You would typically use the functions provided by the react-toastify library, such as toast.success() or toast.error(). 
*/
