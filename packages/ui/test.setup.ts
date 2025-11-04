// Vitest setup: jsdom 环境下为 antd 提供 matchMedia polyfill
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => {
    return {
      matches: false,
      media: query,
      // Deprecated listeners for some libs; keep no-op for compatibility
      addListener: () => {},
      removeListener: () => {},
      // Standard event listeners
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList;
  };
}

// 解决 antd 某些组件对 ResizeObserver 的潜在依赖（如有需要）
if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  (window as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}