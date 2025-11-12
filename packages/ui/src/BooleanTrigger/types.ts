import type React from 'react';

export interface BooleanTriggerProps {
  /**
   * 确认事件名称（用于第二个子元素），例如 `onOk`。
   * @default 'onOk'
   */
  onOkName?: string;
  /**
   * 取消事件名称（用于第二个子元素），例如 `onCancel`。
   * @default 'onCancel'
   */
  onCancelName?: string;
  /**
   * 触发器事件名称（用于第一个子元素），例如 `onClick`。
   * @default 'onClick'
   */
  actionName?: string;
  /**
   * 布尔显示属性名称（用于第二个子元素），例如 `open`。
   * @default 'open'
   */
  booleanPropName?: string;
  /**
   * 关闭时是否销毁元素。
   * @default false
   */
  destroyOnClose?: boolean;
  /**
   * 兼容历史拼写错误的属性（destoryOnClose）。
   * 若同时提供，以该属性值为准。
   */
  destoryOnClose?: boolean;
  /**
   * 控制元素创建时机：`default` 为一开始就创建，`lazy` 为第一次显示时创建。
   * @default 'lazy'
   */
  renderMode?: 'default' | 'lazy';
  /**
   * 子元素，必须包含两个子元素：
   * - 第一个为触发元素（如 Button）
   * - 第二个为被触发元素（如 Modal）
   */
  children: React.ReactNode;
}

// 为了满足根导出文件的类型需求，同时提供以下类型占位符
export type TriggerProps = Record<string, any>;
export type ContentProps = Record<string, any>;

export interface BooleanTriggerHandle {
  showModal: () => void;
}