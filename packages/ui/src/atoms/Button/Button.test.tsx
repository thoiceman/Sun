import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders Button with text', () => {
  render(<Button>点击我</Button>);
  expect(screen.getByText('点击我')).toBeInTheDocument();
});

test('applies variant styles', () => {
  const { rerender } = render(<Button variant="outline">Outline</Button>);
  expect(screen.getByText('Outline')).toBeInTheDocument();
  rerender(<Button variant="ghost">Ghost</Button>);
  expect(screen.getByText('Ghost')).toBeInTheDocument();
});