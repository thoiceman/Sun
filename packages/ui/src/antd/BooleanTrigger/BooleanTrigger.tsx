import React from 'react';

export interface BooleanTriggerProps {
  /**
   * @description 确认事件名称
   * @default onOk
   */
  onOkName?: string;
  /**
   * @description 取消事件名称
   * @default onCancel
   */
  onCancelName?: string;
  /**
   * @description 触发按钮的事件名称
   * @default onClick
   */
  actionName?: string;
  /**
   * @description 显示属性名称
   * @default visible
   */
  booleanPropName?: string;
  /**
   * @description 关闭时是否销毁元素
   * @default false
   */
  destroyOnClose?: boolean;
  /**
   * @description 用于控制元素创建时机，'default'为一开始就创建，'lazy'为第一次显示时创建
   * @default lazy
   */
  renderMode?: 'default' | 'lazy';
  /**
   *@description 子元素，必须包含两个子元素，第一个为触发元素，第二个为类 Modal 元素
   */
  children: React.ReactNode;
}

interface BooleanTriggerState {
  visible: boolean;
  renderModal: boolean;
}

function isPromise(promise: any) {
  return promise && typeof promise.then === 'function' && typeof promise.catch === 'function';
}

function runPromise(promise: Promise<any>, success?: () => void, error?: () => void) {
  return new Promise((resolve, reject) => {
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

function invokeEvent(event: (...args: any[]) => any, success?: () => void, error?: () => void, ...args: any[]) {
  const response = event(...args);
  // 返回 false 表示失败
  if (response === false) {
    if (error) error();
    return false;
  }
  // 返回 promise，获取结果
  if (isPromise(response)) {
    return runPromise(response, success, error);
  }
  // 其他类型视为成功
  if (success) success();
  return response;
}

export class BooleanTrigger extends React.Component<BooleanTriggerProps, BooleanTriggerState> {
  static defaultProps: Partial<BooleanTriggerProps> = {
    actionName: 'onClick',
    onOkName: 'onOk',
    onCancelName: 'onCancel',
    booleanPropName: 'visible',
    destroyOnClose: false,
    renderMode: 'lazy',
  };

  private isFirstModalRender = true;

  constructor(props: BooleanTriggerProps) {
    super(props);
    this.state = {
      visible: false,
      renderModal: props.renderMode === 'default',
    };
  }

  render() {
    const {
      children,
      actionName = 'onClick',
      onOkName = 'onOk',
      onCancelName = 'onCancel',
      booleanPropName = 'visible',
    } = this.props;
    const { visible, renderModal } = this.state;

    const subComponents = React.Children.toArray(children);

    if (subComponents.length !== 2) {
      throw new Error('BooleanTrigger必须包含两个元素，第一个是触发元素，第二个是被触发元素！');
    }

    const modalTrigger: any = subComponents[0];
    const modal: any = subComponents[1];

    return (
      <React.Fragment>
        {React.cloneElement(modalTrigger as React.ReactElement, {
          [actionName]: (...args: any[]) => {
            const onClick = (modalTrigger.props || {})[actionName];
            this.runEvent(onClick, true, ...args);
          },
        })}
        {visible || renderModal
          ? React.cloneElement(modal as React.ReactElement, {
              [booleanPropName]: visible,
              [onCancelName]: (...args: any[]) => {
                const onCancel = (modal.props || {})[onCancelName];
                return this.runEvent(onCancel, false, ...args);
              },
              [onOkName]: (...args: any[]) => {
                const onOk = (modal.props || {})[onOkName];
                return this.runEvent(onOk, false, ...args);
              },
            })
          : null}
      </React.Fragment>
    );
  }

  showModal = () => {
    const { children, actionName = 'onClick' } = this.props;
    const subComponents = React.Children.toArray(children);
    const modalTrigger: any = subComponents[0] || {};
    const onClick = (modalTrigger.props || {})[actionName];
    this.runEvent(onClick, true, null);
  };

  componentDidUpdate(prevProps: Readonly<BooleanTriggerProps>, prevState: Readonly<BooleanTriggerState>) {
    let { destroyOnClose = false, renderMode = 'lazy' } = this.props;
    if (prevState.visible === true && this.state.visible === false) {
      // 兼容历史错误拼写
      if ((this.props as any)['destoryOnClose'] !== undefined) {
        destroyOnClose = (this.props as any)['destoryOnClose'] as boolean;
      }
      if (destroyOnClose) this.setState({ renderModal: false });
    }
    if (renderMode === 'lazy') {
      if (prevState.visible === false && this.state.visible === true) {
        if (this.isFirstModalRender) {
          this.isFirstModalRender = false;
          this.setState({ renderModal: true });
        }
      }
    }
  }

  runEvent = (event: any, visible: boolean, ...args: any[]) => {
    if (typeof event === 'function') {
      return invokeEvent(event, this._showModal.bind(this, visible), undefined, ...args);
    } else this._showModal(visible);
  };

  private _showModal = (visible: boolean) => {
    this.setState({ visible });
  };
}

export default BooleanTrigger;