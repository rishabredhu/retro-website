import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../src/components/hero/Hero';

test('renders Hero component', () => {
  // Create a mock ref object to pass instead of null
  const mockRef = React.createRef<HTMLElement>();
  
  render(<Hero scrollContainer={mockRef} />); // Use the mock ref
  const titleElement = screen.getByText(/Rishab/i); // Adjust based on your titles
  expect(titleElement).toBeInTheDocument();
});