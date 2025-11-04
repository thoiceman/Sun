import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavBar } from './index';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('NavBar', () => {
  it('renders items and triggers onSelect', () => {
    const onSelect = vi.fn();
    render(
      <NavBar
        items={[
          { key: 'home', label: '首页' },
          { key: 'docs', label: '文档' },
        ]}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByText('首页'));
    expect(onSelect).toHaveBeenCalledWith('home');
  });
});