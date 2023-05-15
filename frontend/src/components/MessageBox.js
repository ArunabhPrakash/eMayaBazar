/*
The code you provided is a functional component named `MessageBox`. It renders an alert message box with optional variant styling. Let's break it down:
1. The component imports the `Alert` component from the `react-bootstrap` library.
2. The `MessageBox` component is exported as the default export.
3. Inside the component, it defines an `Alert` component.
4. The `Alert` component has one main prop:
   - `variant`: It specifies the visual style of the alert. If `variant` prop is provided, it is used as the variant. Otherwise, the variant is set to 'info' by default.
5. The content to be displayed inside the alert box is passed as `props.children`.
6. The `MessageBox` component renders the `Alert` component, passing the `variant` prop (or 'info' by default) and the content as `props.children`.
Overall, this component provides a convenient way to display alert messages with different visual styles using the `Alert` component from `react-bootstrap`. It allows customization of the variant and the content of the message box.
*/
import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}
