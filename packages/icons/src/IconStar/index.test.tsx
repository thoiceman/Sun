import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { IconStar } from './index';

describe('IconStar', () => {
  it('renders svg', () => {
    const { container } = render(<IconStar />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
