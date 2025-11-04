import React from 'react';
import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import styles from './style.module.css';

export interface ModalProps
  extends Omit<AntModalProps, 'open' | 'onCancel' | 'onOk'> {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: AntModalProps['onCancel'];
  onOk?: AntModalProps['onOk'];
  locale?: 'zh' | 'en';
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  onCancel,
  onOk,
  locale = 'zh',
  okText,
  cancelText,
  ...rest
}) => {
  const finalOk = okText ?? (locale === 'en' ? 'OK' : '确定');
  const finalCancel = cancelText ?? (locale === 'en' ? 'Cancel' : '取消');

  return (
    <AntModal
      className={styles.modal}
      open={open}
      onCancel={(e) => {
        onCancel?.(e);
        onOpenChange?.(false);
      }}
      onOk={(e) => {
        onOk?.(e);
        onOpenChange?.(false);
      }}
      okText={finalOk}
      cancelText={finalCancel}
      {...rest}
    />
  );
};