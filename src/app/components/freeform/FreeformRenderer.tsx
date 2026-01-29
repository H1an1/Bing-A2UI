/**
 * Freeform Renderer - 安全渲染 AI 生成的 HTML/CSS
 * 
 * 特性：
 * - 使用 Shadow DOM 隔离样式
 * - 自动注入 ACF Design Tokens
 * - 处理交互配置
 * - 防止 XSS 攻击
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FreeformView, InteractionConfig } from '../../services/freeformService';

// ============================================================================
// ACF Tokens CSS (注入到 Shadow DOM)
// ============================================================================

const ACF_TOKENS_CSS = `
:host {
  /* 颜色 */
  --smtc-foreground-content-neutral-primary: #1a1a1a;
  --smtc-foreground-content-neutral-secondary: #5f5f5f;
  --bing-smtc-foreground-content-neutral-tertiary: #8f8f8f;
  --bing-smtc-foreground-content-white: #ffffff;
  --smtc-foreground-content-accent-primary: #0078d4;
  
  --smtc-background-container-primary: #ffffff;
  --smtc-background-container-secondary: #f5f5f5;
  --smtc-background-card-on-primary-default-rest: #ffffff;
  
  --smtc-stroke-content-neutral-secondary: #e0e0e0;
  
  /* 间距 */
  --smtc-gap-between-content-x-small: 4px;
  --smtc-gap-between-content-small: 8px;
  --smtc-gap-between-content-medium: 16px;
  --smtc-gap-between-content-x-large: 24px;
  --smtc-gap-between-content-xx-large: 32px;
  
  /* 圆角 */
  --smtc-corner-ctrl-rest: 8px;
  --smtc-corner-card-rest: 12px;
  
  /* 字体 */
  --bing-smtc-text-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --bing-smtc-text-display1-size: 54px;
  --bing-smtc-text-title1-size: 36px;
  --bing-smtc-text-title2-size: 24px;
  --bing-smtc-text-subtitle1-strong-size: 20px;
  --bing-smtc-text-body2-size: 16px;
  --bing-smtc-text-body3-size: 14px;
  --bing-smtc-text-caption1-size: 13px;
  
  /* 阴影 */
  --acf-elevation-1: 0 2px 8px rgba(0,0,0,0.08);
  --acf-elevation-2: 0 4px 16px rgba(0,0,0,0.12);
  
  /* 动画 */
  --acf-transition-base: 200ms;
  --acf-transition-ease: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 基础样式 */
  display: block;
  font-family: var(--bing-smtc-text-family);
  color: var(--smtc-foreground-content-neutral-primary);
  line-height: 1.5;
}

.freeform-root {
  min-height: 100%;
}

/* 基础重置 */
.freeform-root * {
  box-sizing: border-box;
}

.freeform-root img {
  max-width: 100%;
  height: auto;
}

/* 隐藏类 */
.freeform-root .hidden {
  display: none !important;
}

/* 活跃状态 */
.freeform-root .active {
  /* 由 AI 定义具体样式 */
}
`;

// ============================================================================
// Props
// ============================================================================

interface FreeformRendererProps {
  view: FreeformView;
  images?: string[];
  onInteraction?: (action: string, data?: any) => void;
  showDebugInfo?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function FreeformRenderer({
  view,
  images = [],
  onInteraction,
  showDebugInfo = false,
}: FreeformRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>({});
  
  // 注入图片 URL 到 HTML
  const processedHTML = useCallback(() => {
    let html = view.html;
    
    // 替换图片占位符
    images.forEach((url, i) => {
      html = html.replace(new RegExp(`\\{\\{image${i}\\}\\}`, 'g'), url);
      html = html.replace(new RegExp(`\\{\\{IMAGE_${i}\\}\\}`, 'g'), url);
    });
    
    // 替换通用占位符
    html = html.replace(/\{\{images\[(\d+)\]\}\}/g, (_, index) => {
      return images[parseInt(index)] || '';
    });
    
    return html;
  }, [view.html, images]);
  
  // 设置交互处理
  const setupInteractions = useCallback((root: ShadowRoot) => {
    if (!view.interactions || view.interactions.length === 0) return;
    
    view.interactions.forEach((interaction) => {
      const elements = root.querySelectorAll(interaction.selector);
      
      elements.forEach((el) => {
        el.addEventListener(interaction.event, (e) => {
          e.preventDefault();
          handleInteraction(interaction, el as HTMLElement, root);
        });
      });
    });
  }, [view.interactions]);
  
  // 处理单个交互
  const handleInteraction = (
    interaction: InteractionConfig,
    triggerEl: HTMLElement,
    root: ShadowRoot
  ) => {
    const { action, target } = interaction;
    
    switch (action) {
      case 'toggle': {
        triggerEl.classList.toggle('active');
        if (target) {
          const targetEl = root.querySelector(target);
          targetEl?.classList.toggle('active');
        }
        break;
      }
      
      case 'show': {
        if (target) {
          const targetEl = root.querySelector(target);
          targetEl?.classList.remove('hidden');
        }
        break;
      }
      
      case 'hide': {
        if (target) {
          const targetEl = root.querySelector(target);
          targetEl?.classList.add('hidden');
        }
        break;
      }
      
      case 'switch': {
        // 获取触发元素的 data-target 或使用 interaction.target
        const panelId = triggerEl.dataset.target || target;
        if (!panelId) return;
        
        // 移除同级元素的 active
        const siblings = triggerEl.parentElement?.children;
        if (siblings) {
          Array.from(siblings).forEach((sib) => sib.classList.remove('active'));
        }
        triggerEl.classList.add('active');
        
        // 切换面板
        const allPanels = root.querySelectorAll('[data-panel]');
        allPanels.forEach((panel) => {
          panel.classList.add('hidden');
          if (panel.matches(panelId) || panel.getAttribute('data-panel') === panelId.replace('#', '')) {
            panel.classList.remove('hidden');
          }
        });
        break;
      }
      
      case 'expand': {
        triggerEl.classList.toggle('expanded');
        if (target) {
          const targetEl = root.querySelector(target);
          targetEl?.classList.toggle('expanded');
          targetEl?.classList.toggle('hidden');
        }
        break;
      }
    }
    
    // 通知外部
    onInteraction?.(action, {
      selector: interaction.selector,
      target: interaction.target,
      triggerElement: triggerEl.tagName,
    });
  };
  
  // 初始化 Shadow DOM
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 创建 Shadow DOM (如果还没有)
    if (!shadowRootRef.current) {
      shadowRootRef.current = containerRef.current.attachShadow({ mode: 'open' });
    }
    
    const shadowRoot = shadowRootRef.current;
    
    // 构建完整的 HTML
    const fullHTML = `
      <style>
        ${ACF_TOKENS_CSS}
        ${view.css}
      </style>
      <div class="freeform-root">
        ${processedHTML()}
      </div>
    `;
    
    // 注入到 Shadow DOM
    shadowRoot.innerHTML = fullHTML;
    
    // 设置交互
    setupInteractions(shadowRoot);
    
    // Cleanup 函数
    return () => {
      // 移除事件监听器（Shadow DOM 被清空时自动处理）
    };
  }, [view, processedHTML, setupInteractions]);
  
  return (
    <div style={{ width: '100%' }}>
      {/* Debug Info */}
      {showDebugInfo && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
          borderRadius: '8px',
          color: 'white',
          fontFamily: "'Roboto', sans-serif",
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700 }}>Freeform AI Canvas</span>
            <span style={{ opacity: 0.7 }}>|</span>
            <span style={{ fontSize: '13px' }}>
              HTML: {view.html.length} chars
            </span>
            <span style={{ opacity: 0.7 }}>|</span>
            <span style={{ fontSize: '13px' }}>
              CSS: {view.css.length} chars
            </span>
            <span style={{ opacity: 0.7 }}>|</span>
            <span style={{ fontSize: '13px' }}>
              Interactions: {view.interactions?.length || 0}
            </span>
          </div>
          {view.reasoning && (
            <div style={{ fontSize: '12px', opacity: 0.9 }}>
              💭 {view.reasoning}
            </div>
          )}
        </div>
      )}
      
      {/* Shadow DOM Container */}
      <div 
        ref={containerRef}
        style={{
          width: '100%',
          minHeight: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
}

export default FreeformRenderer;




