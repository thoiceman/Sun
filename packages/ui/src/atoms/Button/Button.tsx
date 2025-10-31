import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

const sizes = {
  sm: { font: '0.875rem', padY: '0.375rem', padX: '0.75rem' },
  md: { font: '1rem', padY: '0.5rem', padX: '1rem' },
  lg: { font: '1.125rem', padY: '0.75rem', padX: '1.25rem' },
};

const Base = styled.button<{ $variant: string; $size: keyof typeof sizes; $fullWidth?: boolean }>`
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  width: ${(p) => (p.$fullWidth ? '100%' : 'auto')};
  font-weight: 600;

  ${(p) => css`
    font-size: ${sizes[p.$size].font};
    padding: ${sizes[p.$size].padY} ${sizes[p.$size].padX};
  `}

  ${(p) =>
    p.$variant === 'primary' &&
    css`
      background-color: var(--color-primary);
      color: white;
      &:hover {
        filter: brightness(1.05);
      }
      &:active {
        filter: brightness(0.95);
      }
    `}
  ${(p) =>
    p.$variant === 'outline' &&
    css`
      background: transparent;
      color: var(--color-primary);
      border-color: var(--color-primary);
      &:hover {
        background-color: color-mix(in srgb, var(--color-primary) 8%, transparent);
      }
    `}
  ${(p) =>
    p.$variant === 'ghost' &&
    css`
      background: transparent;
      color: var(--color-text);
      &:hover {
        background-color: color-mix(in srgb, var(--color-text) 6%, transparent);
      }
    `}
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  ...rest
}) => {
  return <Base $variant={variant} $size={size} $fullWidth={fullWidth} {...rest} />;
};