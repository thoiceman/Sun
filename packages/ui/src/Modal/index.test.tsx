import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './index';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Modal', () => {
  it('renders open and triggers ok/cancel', () => {
    const onOpenChange = vi.fn();
    render(
      <Modal open title="标题" onOpenChange={onOpenChange}>
        内容
      </Modal>
    );
    expect(screen.getByText('标题')).toBeInTheDocument();
    expect(screen.getByText('内容')).toBeInTheDocument();
    // AntD 的按钮文案在 DOM 中可能包含分隔空格，如 "确 定"
    fireEvent.click(screen.getByRole('button', { name: /确\s*定/ }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});