/*
The code you provided is a common pattern for creating a global state management using the Context API and useReducer hook in React.
1. The code exports a `Store` context object using `createContext()` from the React library. This context will be used to share the global state across components.
2. The `initialState` object defines the initial state of the application. It includes `userInfo` and `cart` properties. The initial values are retrieved from the `localStorage` if they exist, or set to default values.
3. The `reducer` function is a reducer function that handles different actions dispatched to modify the state. It takes the current state and an action object as parameters and returns the new state based on the action type.
4. The `StoreProvider` component is created using the `useReducer` hook. It takes the `reducer` function and `initialState` as arguments to create the state and dispatch function.
5. The `value` variable is created as an object containing the `state` and `dispatch` from the useReducer hook. This object will be passed as the value to the `Store.Provider` component, making the state and dispatch function available to all child components that consume the `Store` context.
6. Finally, the `Store.Provider` component is rendered with the `value` prop and the `props.children`. This allows any components wrapped within the `StoreProvider` to access the global state and dispatch actions to modify the state.
By wrapping components with the `StoreProvider`, you can access the global state using the `useContext(Store)` hook and dispatch actions to modify the state using the `dispatch` function provided by the `useReducer` hook.

Sure! Let's go through the `initialState` object and each case in the `reducer` function:
1. `initialState`:
   - `userInfo`: It stores information about the user. If there is a `userInfo` value stored in the `localStorage`, it is parsed from JSON format; otherwise, it is set to `null`.
   - `cart`: It contains information related to the shopping cart.
     - `shippingAddress`: It stores the user's shipping address. If there is a `shippingAddress` value stored in the `localStorage`, it is parsed from JSON format; otherwise, it is set to an empty object.
     - `paymentMethod`: It stores the selected payment method. If there is a `paymentMethod` value stored in the `localStorage`, it is retrieved; otherwise, it is set to an empty string.
     - `cartItems`: It stores an array of items in the cart. If there are `cartItems` stored in the `localStorage`, they are parsed from JSON format; otherwise, it is set to an empty array.
2. Cases in the `reducer` function:
   - `CART_ADD_ITEM`: It handles the action of adding an item to the cart. If the item already exists in the cart, it updates the existing item with the new item information. Otherwise, it adds the new item to the `cartItems` array. The updated `cartItems` are stored in the `localStorage`, and the state is updated accordingly.
   - `CART_REMOVE_ITEM`: It handles the action of removing an item from the cart. It filters out the item with the matching ID from the `cartItems` array. The updated `cartItems` are stored in the `localStorage`, and the state is updated accordingly.
   - `CART_CLEAR`: It handles the action of clearing the cart. It sets the `cartItems` array to an empty array. The updated `cartItems` are stored in the `localStorage`, and the state is updated accordingly.
   - `USER_SIGNIN`: It handles the action of signing in a user. It updates the `userInfo` with the user information received as the action payload.
   - `USER_SIGNOUT`: It handles the action of signing out a user. It resets the `userInfo` to `null` and clears the `cartItems`, `shippingAddress`, and `paymentMethod` in the cart. The updated values are stored in the `localStorage`, and the state is updated accordingly.
   - `SAVE_SHIPPING_ADDRESS`: It handles the action of saving the shipping address. It updates the `shippingAddress` in the cart with the address received as the action payload.
   - `SAVE_PAYMENT_METHOD`: It handles the action of saving the payment method. It updates the `paymentMethod` in the cart with the method received as the action payload.
These cases define how the state should be modified based on the corresponding actions. The state is updated accordingly, and in some cases, the updated values are stored in the `localStorage` for persistence.
*/
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
