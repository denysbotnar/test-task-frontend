import React from 'react';
import { render } from '@testing-library/react';
import Home from './App';

test('Check text "App Wed View"', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/App Wed View/i);
  expect(linkElement).toBeInTheDocument();
});
