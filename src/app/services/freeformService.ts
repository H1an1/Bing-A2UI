/**
 * Freeform Dynamic View Service
 * 
 * AI 完全自由生成 HTML/CSS
 * - 无预定义组件限制
 * - 使用 ACF Design Tokens
 * - 返回可直接渲染的 HTML
 */

import { GoogleGenAI } from "@google/genai";

// Gemini API 配置 - 从环境变量读取
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ============================================================================
// Types
// ============================================================================

export interface FreeformView {
  html: string;
  css: string;
  reasoning: string;
  title?: string;
  interactions?: InteractionConfig[];
}

export interface InteractionConfig {
  selector: string;
  event: 'click' | 'hover' | 'change';
  action: 'toggle' | 'show' | 'hide' | 'switch' | 'expand';
  target?: string;
  data?: Record<string, any>;
}

// ============================================================================
// ACF Design Tokens (供 AI 使用)
// ============================================================================

const ACF_TOKENS_REFERENCE = `
## ACF Design Tokens (必须使用这些 CSS 变量)

### 颜色
--smtc-foreground-content-neutral-primary    /* 主文字 */
--smtc-foreground-content-neutral-secondary  /* 次要文字 */
--bing-smtc-foreground-content-neutral-tertiary /* 三级文字 */
--bing-smtc-foreground-content-white         /* 深色背景上的文字 */
--smtc-foreground-content-accent-primary     /* 强调色文字 */

--smtc-background-container-primary          /* 主背景 */
--smtc-background-container-secondary        /* 次要背景 */
--smtc-background-card-on-primary-default-rest /* 卡片背景 */

--smtc-stroke-content-neutral-secondary      /* 边框线 */

### 间距
--smtc-gap-between-content-x-small   /* 4px */
--smtc-gap-between-content-small     /* 8px */
--smtc-gap-between-content-medium    /* 16px */
--smtc-gap-between-content-x-large   /* 24px */
--smtc-gap-between-content-xx-large  /* 32px */

### 圆角
--smtc-corner-ctrl-rest   /* 8px - 按钮/输入框 */
--smtc-corner-card-rest   /* 12px - 卡片 */

### 字体
--bing-smtc-text-family: 'Roboto', -apple-system, sans-serif

--bing-smtc-text-display1-size: 54px
--bing-smtc-text-title1-size: 36px
--bing-smtc-text-title2-size: 24px
--bing-smtc-text-subtitle1-strong-size: 20px
--bing-smtc-text-body2-size: 16px
--bing-smtc-text-body3-size: 14px
--bing-smtc-text-caption1-size: 13px

### 阴影
--acf-elevation-1: 0 2px 8px rgba(0,0,0,0.08)
--acf-elevation-2: 0 4px 16px rgba(0,0,0,0.12)

### 动画
--acf-transition-base: 200ms
--acf-transition-ease: cubic-bezier(0.4, 0, 0.2, 1)
`;

// ============================================================================
// System Prompt
// ============================================================================

const FREEFORM_SYSTEM_PROMPT = `你是一个前端 UI 艺术家。你可以完全自由地创作任何你认为最适合用户查询的界面。

## 🎨 你的能力

你可以生成**任何** HTML 和 CSS：
- 任何布局（grid, flex, absolute, 甚至 3D transform）
- 任何动画效果
- 任何创意设计
- 不受任何预定义组件限制

## 🎯 你的目标

根据用户的查询，创造一个：
1. **信息丰富** - 真正回答用户的问题
2. **视觉惊艳** - 不是普通的列表，要有设计感
3. **可交互** - 用户可以点击、切换、探索
4. **独特** - 每次都应该是独特的设计，不是模板

${ACF_TOKENS_REFERENCE}

## 📦 输出格式

返回 JSON：
\`\`\`json
{
  "title": "页面标题",
  "reasoning": "为什么选择这个设计...",
  "css": "完整的 CSS 样式（使用 ACF tokens）",
  "html": "完整的 HTML 结构",
  "interactions": [
    {
      "selector": ".tab-btn",
      "event": "click",
      "action": "switch",
      "target": "[data-panel]"
    }
  ]
}
\`\`\`

## ⚠️ 规则

1. **必须使用 ACF Design Tokens** - 颜色、间距、字体都用 CSS 变量
2. **不要用 <script>** - 交互通过 interactions 配置定义
3. **HTML 必须完整** - 包含所有需要的元素
4. **CSS 必须完整** - 包含所有样式，使用 .freeform-root 作为根选择器
5. **内容要真实** - 不要用 Lorem ipsum，要真正的信息

## 💡 创意启发

你可以创造：
- 📊 数据可视化（SVG 图表、进度条、比较图）
- 🗺️ 空间布局（地图式、星图式、思维导图）
- 📱 App 式界面（底部导航、卡片滑动、抽屉菜单）
- 🎬 杂志式排版（大图、引言、多栏）
- 🎮 游戏化界面（成就系统、进度追踪、卡牌式）
- 🌐 3D 效果（透视卡片、旋转展示）

## 🔧 交互类型

interactions 数组中可用的 action：
- toggle: 切换 class (如 .active)
- show: 显示元素
- hide: 隐藏元素  
- switch: 切换 tab/panel (配合 data-* 属性)
- expand: 展开/折叠

示例：点击 .tab-1 时显示 #panel-1
\`\`\`json
{
  "selector": ".tab-1",
  "event": "click", 
  "action": "switch",
  "target": "#panel-1"
}
\`\`\`
`;

// ============================================================================
// Generate Freeform View
// ============================================================================

export async function generateFreeformView(query: string, images: string[] = []): Promise<FreeformView> {
  console.log('🎨 FreeformService: Generating for query:', query);
  
  const imageContext = images.length > 0 
    ? `\n\n用户提供了 ${images.length} 张图片，请在设计中考虑图片的展示。图片 URL: ${images.slice(0, 6).join(', ')}`
    : '';
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ 
            text: `${FREEFORM_SYSTEM_PROMPT}\n\n用户查询: "${query}"${imageContext}\n\n请发挥你的创意，设计一个独特的交互式界面。返回完整的 JSON。` 
          }]
        }
      ],
      config: {
        temperature: 0.9, // 更高的温度 = 更多创意
        maxOutputTokens: 16384,
      }
    });
    
    const text = response.text || '';
    console.log('🎨 FreeformService: Raw response length:', text.length);
    
    // Extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn('🎨 FreeformService: No JSON found, using fallback');
      return createFallbackView(query);
    }
    
    const parsed = JSON.parse(jsonMatch[0]) as Partial<FreeformView>;
    
    // Validate
    if (!parsed.html || !parsed.css) {
      console.warn('🎨 FreeformService: Missing html or css, using fallback');
      return createFallbackView(query);
    }
    
    // Ensure CSS is scoped
    let css = parsed.css;
    if (!css.includes('.freeform-root')) {
      css = scopeCSS(css);
    }
    
    const result: FreeformView = {
      html: sanitizeHTML(parsed.html),
      css: css,
      reasoning: parsed.reasoning || 'AI generated creative design',
      title: parsed.title,
      interactions: parsed.interactions || [],
    };
    
    console.log('🎨 FreeformService: Generated view:', {
      htmlLength: result.html.length,
      cssLength: result.css.length,
      interactions: result.interactions.length,
    });
    
    return result;
    
  } catch (error) {
    console.error('🎨 FreeformService: Generation failed:', error);
    return createFallbackView(query);
  }
}

// ============================================================================
// Helpers
// ============================================================================

function scopeCSS(css: string): string {
  // Add .freeform-root prefix to all selectors
  return css.replace(/([^\{\}]+)\{/g, (match, selector) => {
    const scoped = selector
      .split(',')
      .map((s: string) => `.freeform-root ${s.trim()}`)
      .join(', ');
    return `${scoped} {`;
  });
}

function sanitizeHTML(html: string): string {
  // Remove script tags for safety
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '') // Remove inline event handlers
    .replace(/javascript:/gi, ''); // Remove javascript: URLs
}

function createFallbackView(query: string): FreeformView {
  return {
    html: `
      <div class="fallback-container">
        <div class="fallback-icon">✨</div>
        <h1 class="fallback-title">${query}</h1>
        <p class="fallback-text">AI is exploring creative possibilities...</p>
        <div class="fallback-loader"></div>
      </div>
    `,
    css: `
      .freeform-root .fallback-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        padding: var(--smtc-gap-between-content-xx-large);
        text-align: center;
        font-family: var(--bing-smtc-text-family);
      }
      .freeform-root .fallback-icon {
        font-size: 48px;
        margin-bottom: var(--smtc-gap-between-content-medium);
      }
      .freeform-root .fallback-title {
        font-size: var(--bing-smtc-text-title2-size);
        color: var(--smtc-foreground-content-neutral-primary);
        margin: 0 0 var(--smtc-gap-between-content-small);
      }
      .freeform-root .fallback-text {
        font-size: var(--bing-smtc-text-body3-size);
        color: var(--smtc-foreground-content-neutral-secondary);
        margin: 0;
      }
      .freeform-root .fallback-loader {
        width: 40px;
        height: 40px;
        border: 3px solid var(--smtc-stroke-content-neutral-secondary);
        border-top-color: var(--smtc-foreground-content-accent-primary);
        border-radius: 50%;
        margin-top: var(--smtc-gap-between-content-x-large);
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `,
    reasoning: 'Fallback view while AI generates creative content',
    interactions: [],
  };
}

export default generateFreeformView;




