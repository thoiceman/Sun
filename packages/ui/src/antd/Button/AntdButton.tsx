import React, { useCallback, useRef, useState } from 'react';
import { Button as AntdButtonBase } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';
import styled from '@emotion/styled';

export type AntdButtonExtraProps = {
  /** 自动管理点击触发的异步任务的 loading 状态（当 onClick 返回 Promise 时生效） */
  autoLoading?: boolean;
  /** 图标位置，默认在文本前 */
  iconPosition?: 'start' | 'end';
  /** 防重复点击（点击后在冷却时间内忽略后续点击） */
  preventDoubleClick?: boolean;
  /** 防重复点击冷却时间（毫秒） */
  preventMs?: number;
};

export type AntdButtonPropsCompat = AntdButtonProps & AntdButtonExtraProps;

const StyledAntdButton = styled(AntdButtonBase)`
  && {
    border-radius: var(--radius-md);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  &&:not(:disabled):hover {
    filter: brightness(1.03);
  }
  &&:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
    outline: none;
  }
`;

export const AntdButton: React.FC<AntdButtonPropsCompat> = ({
  icon,
  iconPosition = 'start',
  autoLoading = true,
  preventDoubleClick = false,
  preventMs = 600,
  onClick,
  loading,
  children,
  ...rest
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const cooldownRef = useRef(false);

  const mergedLoading = loading !== undefined ? loading : internalLoading;

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      if (rest.disabled) return;
      if (preventDoubleClick) {
        if (cooldownRef.current) return;
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, preventMs);
      }
      const result = onClick?.(e);
      // 自动管理 loading：当 onClick 返回 Promise 且未显式传入 loading 时处理
      if (autoLoading && loading === undefined && result && typeof (result as any).then === 'function') {
        try {
          setInternalLoading(true);
          await (result as Promise<any>);
        } finally {
          setInternalLoading(false);
        }
      }
    },
    [preventDoubleClick, preventMs, onClick, autoLoading, loading, rest.disabled]
  );

  // 当 iconPosition 为 end 时，将 icon 置于文本之后；否则使用 antd 的原生 icon 渲染
  const content = iconPosition === 'end' && icon ? (
    <>
      {children}
      <span className="anticon">{icon}</span>
    </>
  ) : (
    children
  );

  return (
    <StyledAntdButton
      {...rest}
      icon={iconPosition === 'start' ? icon : undefined}
      loading={mergedLoading}
      onClick={handleClick}
    >
      {content}
    </StyledAntdButton>
  );
};