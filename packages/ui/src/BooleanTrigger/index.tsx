/**
 * 组件名称：BooleanTrigger（布尔触发器）
 * 开发作者：Thomas
 * 初始开发时间：2025-11-12
 * 最近修改时间：2025-11-12
 * 组件作用：
 *   包装一个触发元素与一个受控元素（如 antd Modal），通过注入布尔属性
 *  （默认 `open`）与事件（`onOk`、`onCancel`、触发器事件 `onClick`）来统一控制
 *   显示与关闭；支持懒加载渲染与命令式方法 `showModal`。
 * 使用说明：
 *   - children 必须包含两个元素：第一个为触发器，第二个为被触发内容
 *   - 默认布尔属性为 `open`，可通过 `booleanPropName` 调整（兼容旧项目可传 `visible`）
 *   - 关闭时可按需销毁（`destroyOnClose` 或兼容拼写 `destoryOnClose`）
 */
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { BooleanTriggerProps, BooleanTriggerHandle } from './types';

export type { BooleanTriggerProps, BooleanTriggerHandle, TriggerProps, ContentProps } from './types';

function isPromise<T = any>(value: any): value is Promise<T> {
  return (
    value && typeof value.then === 'function' && typeof value.catch === 'function'
  );
}

function runPromise<T = any>(
  promise: Promise<T>,
  success?: () => void,
  error?: () => void,
) {
  return new Promise<T>((resolve, reject) => {
    promise
      .then((response) => {
        if (success) success();
        resolve(response);
      })
      .catch((err) => {
        if (error) error();
        reject(err);
      });
  });
}

function runEvent(
  event: ((...args: any[]) => any) | undefined,
  success?: () => void,
  error?: () => void,
  ...args: any[]
) {
  if (!event) {
    if (success) success();
    return undefined;
  }
  const response = event(...args);
  // 返回 false：视为失败，执行 error
  if (response === false) {
    if (error) error();
    return false;
  }
  // 返回 Promise：按结果执行 success/error
  if (isPromise(response)) {
    return runPromise(response, success, error);
  }
  // 其他类型：视为成功
  if (success) success();
  return response;
}

const BooleanTriggerInner = (
  props: BooleanTriggerProps,
  ref: React.Ref<BooleanTriggerHandle>,
) => {
  const {
    children,
    actionName = 'onClick',
    onOkName = 'onOk',
    onCancelName = 'onCancel',
    booleanPropName = 'open',
    destroyOnClose: destroyOnCloseProp = false,
    destoryOnClose,
    renderMode = 'lazy',
  } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [renderModal, setRenderModal] = useState<boolean>(renderMode === 'default');

  const isFirstModalRender = useRef(true);
  const prevVisibleRef = useRef<boolean>(visible);

  const destroyOnClose = useMemo(() => {
    if ('destoryOnClose' in props && typeof destoryOnClose === 'boolean') {
      return destoryOnClose as boolean;
    }
    return destroyOnCloseProp;
  }, [props, destoryOnClose, destroyOnCloseProp]);

  const runEventWithVisibility = (
    event: ((...args: any[]) => any) | undefined,
    nextVisible: boolean,
    ...args: any[]
  ) => {
    if (typeof event === 'function') {
      return runEvent(event, () => setVisible(nextVisible), undefined, ...args);
    }
    setVisible(nextVisible);
    return undefined;
  };

  const showModal = () => {
    const subComponents = React.Children.toArray(children);
    const modalTrigger: any = subComponents[0] || {};
    const onClick = (modalTrigger as any).props?.[actionName];
    runEventWithVisibility(onClick, true);
  };

  useImperativeHandle(ref, () => ({ showModal }), [children, actionName]);

  useEffect(() => {
    const prevVisible = prevVisibleRef.current;
    prevVisibleRef.current = visible;

    if (prevVisible === true && visible === false) {
      if (destroyOnClose) setRenderModal(false);
    }

    if (renderMode === 'lazy') {
      if (prevVisible === false && visible === true) {
        if (isFirstModalRender.current) {
          isFirstModalRender.current = false;
          setRenderModal(true);
        }
      }
    }
  }, [visible, destroyOnClose, renderMode]);

  const subComponents = React.Children.toArray(children);
  if (subComponents.length !== 2) {
    throw new Error('BooleanTrigger必须包含两个元素，第一个是触发元素，第二个是被触发元素！');
  }
  const modalTrigger: any = subComponents[0];
  const modal: any = subComponents[1];

  return (
    <React.Fragment>
      {React.cloneElement(modalTrigger, {
        [actionName]: (...args: any[]) => {
          const onClick = (modalTrigger.props || {})[actionName];
          runEventWithVisibility(onClick, true, ...args);
        },
      })}
      {visible || renderModal
        ? React.cloneElement(modal, {
          [booleanPropName]: visible,
          [onCancelName]: (...args: any[]) => {
            const onCancel = (modal.props || {})[onCancelName];
            return runEventWithVisibility(onCancel, false, ...args);
          },
          [onOkName]: (...args: any[]) => {
            const onOk = (modal.props || {})[onOkName];
            return runEventWithVisibility(onOk, false, ...args);
          },
        })
        : null}
    </React.Fragment>
  );
};

const BooleanTrigger = forwardRef<BooleanTriggerHandle, BooleanTriggerProps>(BooleanTriggerInner);

export { BooleanTrigger };
export default BooleanTrigger;