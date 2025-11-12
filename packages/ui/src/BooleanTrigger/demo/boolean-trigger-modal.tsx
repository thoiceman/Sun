/**
 * title: 自定义Modal的onCancel和onOk事件
 * description: 自定义 Modal 的 onCancel 和 onOk 事件
 */
import React, { useState } from 'react';
import { BooleanTrigger } from '@sun-x/ui';
import { Button, Modal } from 'antd';

type MyModalProps = {
  open?: boolean;
  onCancel?: (...args: any[]) => any;
  onOk?: (...args: any[]) => Promise<any> | any;
};

const MyModal: React.FC<MyModalProps> = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      confirmLoading={loading}
      open={props.open}
      title="我是一个Dialog"
      onCancel={props.onCancel}
      onOk={() => {
        setLoading(true);
        const result = props.onOk?.('我是一个返回结果');
        if (result && typeof (result as Promise<any>).then === 'function') {
          (result as Promise<any>).then(() => {
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }}
    >
      我是一个模态对话框
    </Modal>
  );
};

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
      <MyModal
        onOk={(response) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 3000);
          });
        }}
      />
    </BooleanTrigger>
  );
};

export default BooleanTriggerDemo;