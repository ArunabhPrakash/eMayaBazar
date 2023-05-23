import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => { //used to define func in js
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
/*
In this test case, you are testing whether the "learn react" link is rendered in the App component.
Here's how the test works:
The render function from @testing-library/react is used to render the App component.
The screen.getByText function is used to find an element with the text content that matches the provided regular expression /learn react/i. The i flag makes the search case-insensitive.
The expect function is used to make an assertion about the existence of the linkElement.
The toBeInTheDocument matcher is chained with expect to assert that the linkElement is present in the document.
If the "learn react" link is found in the rendered App component, the test will pass. Otherwise, it will fail.
This test ensures that the App component renders the "learn react" link correctly.
 */
