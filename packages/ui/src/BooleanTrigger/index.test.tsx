import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BooleanTrigger } from './index';

function FakeModal(props: {
  visible?: boolean;
  onCancel?: (...args: any[]) => any;
  onOk?: (...args: any[]) => any;
  label?: string;
}) {
  const { visible, onCancel, onOk, label = '内容' } = props;
  return (
    <div data-testid="modal-root">
      {visible ? (
        <div>
          <span>{label}</span>
          <button onClick={() => onCancel?.({ type: 'cancel' })}>取消</button>
          <button onClick={() => onOk?.({ type: 'ok' })}>确定</button>
        </div>
      ) : null}
    </div>
  );
}

describe('BooleanTrigger (TS port, parity with src/boolean-trigger)', () => {
  it('throws if children count is not 2', () => {
    expect(() =>
      render(
        // 仅一个子元素，应该抛错
        <BooleanTrigger>
          <button>触发</button>
        </BooleanTrigger>
      )
    ).toThrowError(/必须包含两个元素/);
  });

  it('opens on trigger action and closes on cancel', async () => {
    render(
      <BooleanTrigger>
        <button>打开</button>
        <FakeModal />
      </BooleanTrigger>
    );
    // 打开
    fireEvent.click(screen.getByText('打开'));
    expect(screen.getByText('内容')).toBeInTheDocument();
    // 取消关闭
    fireEvent.click(screen.getByText('取消'));
    await waitFor(() => {
      expect(screen.queryByText('内容')).not.toBeInTheDocument();
    });
  });

  it('closes after onOk resolves when it returns a Promise', async () => {
    render(
      <BooleanTrigger>
        <button>打开</button>
        <FakeModal
          onOk={() =>
            new Promise((resolve) => {
              setTimeout(() => resolve(true), 10);
            })
          }
        />
      </BooleanTrigger>
    );
    fireEvent.click(screen.getByText('打开'));
    expect(screen.getByText('内容')).toBeInTheDocument();
    fireEvent.click(screen.getByText('确定'));
    await waitFor(() => {
      expect(screen.queryByText('内容')).not.toBeInTheDocument();
    });
  });

  it('unmounts modal when destroyOnClose=true after closing', async () => {
    render(
      <BooleanTrigger destroyOnClose>
        <button>打开</button>
        <FakeModal />
      </BooleanTrigger>
    );
    fireEvent.click(screen.getByText('打开'));
    expect(screen.getByTestId('modal-root')).toBeInTheDocument();
    fireEvent.click(screen.getByText('取消'));
    await waitFor(() => {
      expect(screen.queryByTestId('modal-root')).not.toBeInTheDocument();
    });
  });
});