import { render, screen } from '@testing-library/react';
import Course from './instructor_info';

test('renders learn react link', () => {
  render(<Course />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});