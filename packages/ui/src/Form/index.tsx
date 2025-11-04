import React from 'react';
import { Form as AntForm, Input, Button as AntButton } from 'antd';
import styles from './style.module.css';

export interface FormValues {
  username: string;
  password: string;
}

export interface FormProps {
  onSubmit?: (values: FormValues) => void;
  locale?: 'zh' | 'en';
  submitText?: string;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  locale = 'zh',
  submitText,
}) => {
  const t = {
    username: locale === 'en' ? 'Username' : '用户名',
    password: locale === 'en' ? 'Password' : '密码',
    submit: locale === 'en' ? 'Submit' : '提交',
    uMsg: locale === 'en' ? 'Please enter username' : '请输入用户名',
    pMsg: locale === 'en' ? 'Please enter password' : '请输入密码',
  };

  return (
    <AntForm
      className={styles.form}
      layout="vertical"
      onFinish={(values) => onSubmit?.(values as FormValues)}
      aria-label={locale === 'en' ? 'Form' : '表单'}
    >
      <AntForm.Item name="username" label={t.username} rules={[{ required: true, message: t.uMsg }]}> 
        <Input aria-label={t.username} />
      </AntForm.Item>
      <AntForm.Item name="password" label={t.password} rules={[{ required: true, message: t.pMsg }]}> 
        <Input.Password aria-label={t.password} />
      </AntForm.Item>
      <AntForm.Item>
        <AntButton type="primary" htmlType="submit">
          {submitText ?? t.submit}
        </AntButton>
      </AntForm.Item>
    </AntForm>
  );
};