/**
 * title: 基本用法
 * description: 这是一个简单的按钮绑定一个Modal的事例
 */
import React from 'react';
import { BooleanTrigger } from '@sun-x/ui';
import { Button, Modal } from 'antd';

const BooleanTriggerDemo: React.FC = () => {
  return (
    <BooleanTrigger destoryOnClose>
      <Button type="primary">我是一个模态对话框触发器</Button>
      <Modal title="我是一个Dialog">我是一个模态对话框</Modal>
    </BooleanTrigger>
  );
};

export default BooleanTriggerDemo;