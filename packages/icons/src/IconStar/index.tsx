import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
  color?: string;
}

export const IconStar: React.FC<IconProps> = ({
  size = 16,
  color = 'currentColor',
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    {...rest}
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);
