import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './index';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Card', () => {
  it('renders with title and region role', () => {
    render(
      <Card title="测试卡片">
        <div>内容</div>
      </Card>
    );
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByText('测试卡片')).toBeInTheDocument();
    expect(screen.getByText('内容')).toBeInTheDocument();
  });
});