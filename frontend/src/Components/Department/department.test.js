import { render, screen } from '@testing-library/react';
import Department from './department';

test('renders learn react link', () => {
  render(<Department />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
