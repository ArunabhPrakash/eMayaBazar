/*
The code you provided is a functional component named `CheckoutSteps`. It renders a set of steps for the checkout process. Let's break it down:
1. The component imports `React`, `Row` and `Col` components from the `react-bootstrap` library.
2. The `CheckoutSteps` component is exported as the default export.
3. Inside the component, it takes `props` as input.
4. The component renders a `Row` component with the className "checkout-steps". This will create a row to contain the individual steps.
5. Inside the `Row` component, there are four `Col` components representing each step of the checkout process. The className of each `Col` component is conditionally set based on the respective `props.stepX` value. If the prop is `true`, it adds the className 'active', indicating that the step is currently active.
6. The text content of each `Col` component represents the name of the step. For example, the first `Col` component has the text "Sign-In", the second one has "Shipping", and so on.
Overall, this component provides a visual representation of the checkout steps, with each step highlighted as active based on the props passed to it.
*/
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
    </Row>
  );
}
