import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputField } from './index';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('InputField', () => {
  it('renders with label and default zh placeholder', () => {
    render(<InputField label="姓名" required status="error" />);
    const input = screen.getByLabelText(/姓名/);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect((input as HTMLInputElement).placeholder).toBe('请输入');
  });

  it('supports en placeholder', () => {
    render(<InputField label="Name" locale="en" />);
    const input = screen.getByLabelText('Name');
    expect((input as HTMLInputElement).placeholder).toBe('Please input');
  });
});