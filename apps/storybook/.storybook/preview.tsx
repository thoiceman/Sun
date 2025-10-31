import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@sun/ui';
import '@sun/ui/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;