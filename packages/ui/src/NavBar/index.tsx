import React, { useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styles from './style.module.css';

export interface NavItem {
  key: string;
  label: React.ReactNode;
  href?: string;
}

export interface NavBarProps {
  items: NavItem[];
  onSelect?: (key: string) => void;
  locale?: 'zh' | 'en';
  className?: string;
  style?: React.CSSProperties;
  menuProps?: Partial<MenuProps>;
}

export const NavBar: React.FC<NavBarProps> = ({
  items,
  onSelect,
  locale = 'zh',
  className,
  style,
  menuProps,
}) => {
  const [open, setOpen] = useState(false);
  const ariaLabel = locale === 'en' ? 'Main Navigation' : '主导航';

  const menuItems: MenuProps['items'] = items.map((i) => ({
    key: i.key,
    label: i.href ? (
      <a href={i.href} onClick={() => onSelect?.(i.key)}>
        {i.label}
      </a>
    ) : (
      <span onClick={() => onSelect?.(i.key)}>{i.label}</span>
    ),
  }));

  return (
    <nav className={`${styles.nav} ${className ?? ''}`} style={style} aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.toggle}
        aria-label={locale === 'en' ? 'Toggle navigation' : '切换导航'}
        onClick={() => setOpen((o) => !o)}
      >
        <MenuOutlined />
      </button>
      <Menu
        mode="horizontal"
        selectable={false}
        className={`${styles.menu} ${open ? styles.open : ''}`}
        items={menuItems}
        {...menuProps}
      />
    </nav>
  );
};