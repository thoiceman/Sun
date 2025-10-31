import React, { PropsWithChildren, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import '../styles/tokens.css';

export type Theme = {
  colors: {
    primary: string;
    text: string;
    background: string;
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
};

const defaultTheme: Theme = {
  colors: {
    primary: 'var(--color-primary)',
    text: 'var(--color-text)',
    background: 'var(--color-bg)',
  },
  spacing: {
    sm: 'var(--space-sm)',
    md: 'var(--space-md)',
    lg: 'var(--space-lg)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
  },
};

export const ThemeProvider = ({ children, theme }: PropsWithChildren<{ theme?: Partial<Theme> }>) => {
  const merged = { ...defaultTheme, ...theme } as Theme;

  useEffect(() => {
    const root = document.documentElement;
    if (theme?.colors?.primary) root.style.setProperty('--color-primary', theme.colors.primary);
    if (theme?.colors?.text) root.style.setProperty('--color-text', theme.colors.text);
    if (theme?.colors?.background) root.style.setProperty('--color-bg', theme.colors.background);
  }, [theme]);

  return <EmotionThemeProvider theme={merged}>{children}</EmotionThemeProvider>;
};