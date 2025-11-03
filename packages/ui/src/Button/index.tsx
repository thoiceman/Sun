import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'variant'> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...rest
}) => {
  const type = variant === 'primary' ? 'primary' : 'default';
  return (
    <AntButton type={type} {...rest}>
      {children}
    </AntButton>
  );
};
