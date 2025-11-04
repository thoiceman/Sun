import React from 'react';
import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import styles from './style.module.css';

export interface CardProps extends AntCardProps {
  ariaLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  hoverable = true,
  title,
  ariaLabel,
  children,
  ...rest
}) => {
  const label = ariaLabel ?? (typeof title === 'string' ? title : undefined);
  return (
    <div className={styles.card} role="region" aria-label={label}>
      <AntCard hoverable={hoverable} title={title} {...rest}>
        {children}
      </AntCard>
    </div>
  );
};