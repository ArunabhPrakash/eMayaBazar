/*
The code you provided is a functional component named `LoadingBox`. It renders a loading spinner indicating that the content is being loaded. Let's break it down:
1. The component imports the `Spinner` component from the `react-bootstrap` library.
2. The `LoadingBox` component is exported as the default export.
3. Inside the component, it defines a `Spinner` component.
4. The `Spinner` component has two main props:
   - `animation`: It is set to "border" to specify the type of spinner animation.
   - `role`: It is set to "status" to indicate the purpose or state of the spinner.
5. Inside the `Spinner` component, there is a `span` element with the className "visually-hidden". This element provides a text description of the spinner for screen readers. The text content of this `span` element is set to "Loading..." to inform users that the content is being loaded.
Overall, this component renders a spinning animation indicating that the content is loading. It uses the `Spinner` component from `react-bootstrap` and provides an accessible description for screen readers.
*/
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
