import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { Button } from './index';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument();
  });

  it('applies secondary class when variant=secondary', () => {
    const { container } = render(<Button variant="secondary">次要</Button>);
    const btn = container.querySelector('button');
    expect(btn?.className).toMatch(/secondary/);
  });
});
