import type { Meta, StoryObj } from '@storybook/react';
import { AntdButton } from '@sun/ui';
import { PlusOutlined } from '@ant-design/icons';

const meta: Meta<typeof AntdButton> = {
  title: 'Antd/Button',
  component: AntdButton,
  args: { children: '按钮' },
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['primary', 'default', 'dashed', 'link', 'text'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['small', 'middle', 'large'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    iconPosition: {
      control: { type: 'inline-radio' },
      options: ['start', 'end'],
    },
    autoLoading: { control: 'boolean' },
    preventDoubleClick: { control: 'boolean' },
    preventMs: { control: { type: 'number' } },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof AntdButton>;

export const Primary: Story = { args: { type: 'primary' } };
export const Default: Story = { args: { type: 'default' } };
export const Dashed: Story = { args: { type: 'dashed' } };
export const Link: Story = { args: { type: 'link' } };
export const Text: Story = { args: { type: 'text' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <AntdButton size="small">Small</AntdButton>
      <AntdButton size="middle">Middle</AntdButton>
      <AntdButton size="large">Large</AntdButton>
    </div>
  ),
};

export const IconPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <AntdButton icon={<PlusOutlined />} iconPosition="start">图标在前</AntdButton>
      <AntdButton icon={<PlusOutlined />} iconPosition="end">图标在后</AntdButton>
    </div>
  ),
};

export const AutoLoading: Story = {
  args: {
    type: 'primary',
    autoLoading: true,
  },
  render: (args) => (
    <AntdButton
      {...args}
      onClick={async () => {
        await new Promise((r) => setTimeout(r, 1200));
      }}
    >
      异步操作（自动 loading）
    </AntdButton>
  ),
};

export const PreventDoubleClick: Story = {
  args: { type: 'primary', preventDoubleClick: true, preventMs: 800 },
  render: (args) => (
    <AntdButton
      {...args}
      onClick={() => {
        // Storybook actions 面板可见一次点击触发
      }}
    >
      防重复点击（800ms）
    </AntdButton>
  ),
};