import type { Meta, StoryObj } from '@storybook/react';
import { Button, ThemeProvider } from '@sun/ui';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: '按钮' },
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Large: Story = { args: { size: 'lg' } };

export const Playground: Story = {
  args: { variant: 'primary', size: 'md', disabled: false, fullWidth: false },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Button fullWidth>Full Width</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider
        theme={{
          colors: { primary: '#10b981', text: '#111827', background: '#ffffff' },
        }}
      >
        <Story />
      </ThemeProvider>
    ),
  ],
  args: { variant: 'primary' },
};