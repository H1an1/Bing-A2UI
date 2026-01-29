/**
 * Creative Canvas - 渲染 AI 生成的任意 HTML/CSS/JS
 * 
 * 使用 Shadow DOM 确保样式隔离和安全
 */

import React, { useRef, useEffect, useState } from 'react';
import { generateCreativeExperience, CreativeOutput } from '../services/creativeAIService';

// ============================================================================
// Loading - 扇形卡牌
// ============================================================================

function CreativeLoading({ query }: { query: string }) {
  const [activeCard, setActiveCard] = useState(0);
  const [thinking, setThinking] = useState(0);
  const cardCount = 7;
  
  const thoughts = [
    'Understanding the essence...',
    'Imagining possibilities...',
    'Designing the experience...',
    'Creating something unique...',
  ];
  
  useEffect(() => {
    const cardTimer = setInterval(() => setActiveCard(c => (c + 1) % cardCount), 500);
    const thinkTimer = setInterval(() => setThinking(t => (t + 1) % thoughts.length), 1500);
    return () => { clearInterval(cardTimer); clearInterval(thinkTimer); };
  }, []);

  return (
    <div style={{
      minHeight: '70vh',
      background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* 扇形卡牌 */}
      <div style={{ position: 'relative', width: '280px', height: '180px', marginBottom: '50px' }}>
        {Array.from({ length: cardCount }, (_, i) => {
          const angle = (i - Math.floor(cardCount / 2)) * 12;
          const isActive = i === activeCard;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '0',
                width: '100px',
                height: '140px',
                borderRadius: '10px',
                background: '#ffffff',
                boxShadow: isActive 
                  ? '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.3)'
                  : '0 8px 25px rgba(0,0,0,0.3)',
                transform: `translateX(-50%) rotate(${angle}deg) translateY(${isActive ? -25 : 0}px) scale(${isActive ? 1.1 : 1})`,
                transformOrigin: 'bottom center',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: isActive ? 10 : cardCount - Math.abs(i - activeCard),
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '10px',
                background: 'linear-gradient(145deg, #fff 0%, #f5f5f7 100%)',
              }} />
              <div style={{
                position: 'absolute',
                inset: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '6px',
                background: '#fafafa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e8e8e8 0%, #f0f0f0 100%)',
                }} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 思考文字 */}
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '12px', opacity: 0.9 }}>
          {thoughts[thinking]}
        </div>
        <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '1px' }}>
          "{query}"
        </div>
      </div>
      
      {/* 底部指示器 */}
      <div style={{ position: 'absolute', bottom: '30px', display: 'flex', gap: '6px' }}>
        {Array.from({ length: cardCount }, (_, i) => (
          <div
            key={i}
            style={{
              width: i === activeCard ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === activeCard ? '#fff' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Shadow DOM Renderer
// ============================================================================

function ShadowRenderer({ html, css, js }: { html: string; css: string; js: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // 创建 Shadow DOM（如果不存在）
    if (!shadowRef.current) {
      shadowRef.current = containerRef.current.attachShadow({ mode: 'open' });
    }
    
    const shadow = shadowRef.current;
    
    // 清理
    shadow.innerHTML = '';
    
    // 添加基础样式
    const baseStyle = document.createElement('style');
    baseStyle.textContent = `
      :host {
        display: block;
        width: 100%;
        min-height: 500px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      @keyframes spark {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(3); opacity: 0; }
      }
    `;
    shadow.appendChild(baseStyle);
    
    // 添加 AI 生成的 CSS
    const aiStyle = document.createElement('style');
    aiStyle.textContent = css;
    shadow.appendChild(aiStyle);
    
    // 添加 HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    shadow.appendChild(wrapper);
    
    // 执行 JS（安全沙箱）
    if (js && js.trim()) {
      try {
        // 简单的 XSS 防护
        const safeJs = js
          .replace(/fetch\s*\(/g, '(() => {})(')
          .replace(/eval\s*\(/g, '(() => {})(')
          .replace(/Function\s*\(/g, '(() => {})(')
          .replace(/localStorage/g, '{}')
          .replace(/sessionStorage/g, '{}')
          .replace(/document\.cookie/g, '""');
        
        const script = new Function('document', 'shadowRoot', `
          const originalDocument = document;
          const document = {
            querySelector: (s) => shadowRoot.querySelector(s),
            querySelectorAll: (s) => shadowRoot.querySelectorAll(s),
            getElementById: (id) => shadowRoot.getElementById(id),
            createElement: (tag) => originalDocument.createElement(tag),
            body: shadowRoot,
          };
          ${safeJs}
        `);
        
        script(document, shadow);
      } catch (e) {
        console.warn('JS execution failed:', e);
      }
    }
  }, [html, css, js]);

  return <div ref={containerRef} style={{ width: '100%', minHeight: '500px' }} />;
}

// ============================================================================
// 主组件
// ============================================================================

interface Props {
  query: string;
  onImageClick?: (url: string) => void;
}

export function CreativeCanvas({ query }: Props) {
  const [output, setOutput] = useState<CreativeOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    setOutput(null);
    
    generateCreativeExperience(query)
      .then(result => {
        setOutput(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return <CreativeLoading query={query} />;
  }

  if (error) {
    return (
      <div style={{
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ fontSize: '14px', color: '#ef4444', marginBottom: '16px' }}>{error}</div>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            generateCreativeExperience(query)
              .then(setOutput)
              .catch(e => setError(e.message))
              .finally(() => setLoading(false));
          }}
          style={{
            padding: '10px 24px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!output) return null;

  return (
    <div style={{ position: 'relative' }}>
      {/* AI 思考展示 */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(90deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderBottom: '1px solid #bae6fd',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <span style={{ fontSize: '18px' }}>🧠</span>
          <span style={{ fontSize: '13px', color: '#0369a1', fontWeight: 500 }}>AI Understanding</span>
        </div>
        <div style={{ fontSize: '14px', color: '#0c4a6e', marginBottom: '8px' }}>
          {output.understanding}
        </div>
        <div style={{ fontSize: '13px', color: '#0284c7', fontStyle: 'italic' }}>
          💡 {output.concept}
        </div>
      </div>

      {/* 渲染 AI 生成的内容 */}
      <ShadowRenderer html={output.html} css={output.css} js={output.js} />

      {/* Debug 按钮 */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '11px',
          cursor: 'pointer',
          opacity: 0.5,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
      >
        {showDebug ? 'Hide Code' : 'View Code'}
      </button>

      {/* Debug 面板 */}
      {showDebug && (
        <div style={{
          padding: '16px',
          background: '#1e1e1e',
          color: '#d4d4d4',
          fontFamily: 'Monaco, monospace',
          fontSize: '11px',
          maxHeight: '400px',
          overflow: 'auto',
        }}>
          <div style={{ color: '#569cd6', marginBottom: '8px' }}>// HTML</div>
          <pre style={{ marginBottom: '16px', whiteSpace: 'pre-wrap' }}>{output.html}</pre>
          <div style={{ color: '#569cd6', marginBottom: '8px' }}>// CSS</div>
          <pre style={{ marginBottom: '16px', whiteSpace: 'pre-wrap' }}>{output.css}</pre>
          {output.js && (
            <>
              <div style={{ color: '#569cd6', marginBottom: '8px' }}>// JavaScript</div>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{output.js}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CreativeCanvas;




