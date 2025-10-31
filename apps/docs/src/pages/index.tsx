import React from 'react';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Sun UI 组件库</h1>
      <p>左侧导航仅在文档页面显示。</p>
      <p>
        <a href="/docs">前往组件文档</a>
        {' 或 '}
        <a href="http://localhost:6006/" target="_blank" rel="noopener noreferrer">
          打开 Storybook 进行交互演示
        </a>
      </p>
    </main>
  );
}