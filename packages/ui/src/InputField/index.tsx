import React, { useId } from 'react';
import { Input } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import styles from './style.module.css';

export interface InputFieldProps extends AntInputProps {
  label?: React.ReactNode;
  help?: React.ReactNode;
  required?: boolean;
  locale?: 'zh' | 'en';
}

const placeholders: Record<'zh' | 'en', string> = {
  zh: '请输入',
  en: 'Please input',
};

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  help,
  required = false,
  locale = 'zh',
  status,
  placeholder,
  ...rest
}) => {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const labelId = `${inputId}-label`;
  const finalPlaceholder = placeholder ?? placeholders[locale];

  return (
    <div className={styles.field}>
      {label && (
        <label id={labelId} htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <Input
        id={inputId}
        aria-labelledby={label ? labelId : undefined}
        aria-required={required}
        aria-invalid={status === 'error'}
        status={status}
        placeholder={finalPlaceholder}
        {...rest}
      />
      {help && (
        <div className={styles.help} role="note">
          {help}
        </div>
      )}
    </div>
  );
};