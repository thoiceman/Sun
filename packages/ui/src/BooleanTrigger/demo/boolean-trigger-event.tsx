/**
 * title: 自定义触发按钮事件
 * description: 自定义触发按钮事件
 */
import React from 'react';
import { Button, Modal } from 'antd';
import { BooleanTrigger } from '@sun-x/ui';

const BooleanTriggerDemo: React.FC = () => {
  return (
    <BooleanTrigger>
      <Button
        type="primary"
        onClick={(event) => {
          alert('触发器');
        }}
      >
        我是一个模态对话框触发器
      </Button>
      <Modal title="我是一个Dialog">我是一个模态对话框</Modal>
    </BooleanTrigger>
  );
};

export default BooleanTriggerDemo;