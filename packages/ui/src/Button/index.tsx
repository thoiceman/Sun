import React from 'react';
import styles from './style.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...rest }) => {
  const className = `${styles.btn} ${variant === 'primary' ? styles.primary : styles.secondary}`;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};