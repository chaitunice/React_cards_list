import { render, screen } from '@testing-library/react';
import App from './App.js';

test('renders app component', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /Click Here/i });
  expect(buttonElement).toBeInTheDocument();
});
