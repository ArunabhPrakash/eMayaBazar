/*
The code snippet provided is the entry point of a React application. Here's an overview of what it does:
1. It imports necessary dependencies and CSS files.
2. It imports the main `App` component from './App'.
3. It renders the React application using `ReactDOM.render()` method, passing the root component `App` to be rendered and the target DOM element with the id 'root' where the app will be mounted.
4. It wraps the `App` component with several providers for global state management, PayPal script loading, and helmet (for managing document head tags).
5. The `React.StrictMode` component is used to enable additional strict checks and warnings for development mode.
6. The `StoreProvider` component is used to provide global state management using the `Store` context.
7. The `HelmetProvider` component is used to wrap the app and manage the document head tags (title, meta tags, etc.) asynchronously.
8. The `PayPalScriptProvider` component is used to defer loading of the PayPal JavaScript SDK until needed.
9. The `App` component is rendered as the root component inside the providers, ensuring that it has access to the global state, helmet features, and PayPal script.
10. The rendered app is mounted into the DOM element with the id 'root'.
Additionally, there's a comment mentioning the `reportWebVitals` function, which can be used to measure and log performance metrics of the app.
Overall, this code sets up the necessary configurations and providers to render and manage a React application, including global state management, PayPal integration, and document head management.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './Store';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
