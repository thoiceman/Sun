import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Form } from './index';

describe('Form', () => {
  it('submits values', async () => {
    const onSubmit = vi.fn();
    render(<Form onSubmit={onSubmit} />);
    const userInput = screen.getByLabelText('用户名');
    const passInput = screen.getByLabelText('密码');
    fireEvent.change(userInput, { target: { value: 'tom' } });
    fireEvent.change(passInput, { target: { value: '123456' } });
    // AntD 的按钮文案在 DOM 中可能呈现为 "提 交"（含空格）
    fireEvent.click(screen.getByRole('button', { name: /提\s*交/ }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ username: 'tom', password: '123456' });
    });
  });
});