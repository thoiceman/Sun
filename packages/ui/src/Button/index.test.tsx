import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { Button } from './index';

describe('Button (antd wrapped)', () => {
  it('renders children', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument();
  });

  it('maps variant=primary to ant-btn-primary', () => {
    const { container } = render(<Button variant="primary">主要</Button>);
    const btn = container.querySelector('button');
    expect(btn?.className).toMatch(/ant-btn/);
    expect(btn?.className).toMatch(/ant-btn-primary/);
  });

  it('maps variant=secondary to default (no ant-btn-primary)', () => {
    const { container } = render(<Button variant="secondary">次要</Button>);
    const btn = container.querySelector('button');
    expect(btn?.className).toMatch(/ant-btn/);
    expect(btn?.className).not.toMatch(/ant-btn-primary/);
  });
});
