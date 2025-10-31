import type { Meta, StoryObj } from '@storybook/react';
import { BooleanTrigger } from '@sun/ui';
import { Button, Modal } from 'antd';

const meta: Meta<typeof BooleanTrigger> = {
  title: 'Atoms/BooleanTrigger',
  component: BooleanTrigger,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof BooleanTrigger>;

export const Basic: Story = {
  render: () => (
    <BooleanTrigger booleanPropName="open">
      <Button type="primary">打开对话框</Button>
      <Modal title="我是一个Dialog">我是一个模态对话框</Modal>
    </BooleanTrigger>
  ),
};

export const CustomEvents: Story = {
  render: () => (
    <BooleanTrigger booleanPropName="open">
      <Button
        type="primary"
        onClick={() => {
          // 可在此执行预校验或埋点
        }}
      >
        打开对话框（带自定义触发）
      </Button>
      <Modal
        title="自定义事件"
        onOk={() => new Promise((resolve) => setTimeout(resolve, 1000))}
      >
        点击确定后 1s 关闭
      </Modal>
    </BooleanTrigger>
  ),
};
