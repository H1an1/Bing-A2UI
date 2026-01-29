/**
 * Semantic A2UI Service - AI 驱动的语义化 UI 生成服务
 * 
 * 核心理念：
 * - 给 AI 最大的创作自由度
 * - 通过 Token 约束保证设计一致性
 * - AI 可以自由组合语义块，创造任何布局
 */

import { GoogleGenAI } from "@google/genai";
import { 
  SemanticA2UIDescriptor, 
  SemanticBlock,
  SemanticIntent,
  SemanticLayout,
} from '../components/semantic/types';
import { validateSemanticA2UI, getComplianceReport } from '../components/semantic/validator';

// Gemini API 配置 - 从环境变量读取
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ============================================================================
// AI System Prompt - Token-first, Maximum Freedom
// ============================================================================

const SEMANTIC_A2UI_PROMPT = `你是一个创意 UI 设计师，使用 ACF 设计系统。你有完全的自由度来创造独特的布局！

## 🎨 你的自由度（尽情发挥！）

### 布局自由
- 可以使用任意 grid/flex 布局
- 可以创造任意嵌套结构
- 可以决定信息密度
- 可以设计独特的视觉层次

### 组合自由
- 可以混合任意语义块
- 可以创造复杂的卡片结构
- 可以设计独特的图片展示方式
- 可以自定义任何视觉效果

### 创意自由
- 杂志风格、画廊风格、沉浸式、信息密集型...任何风格都可以
- 可以根据查询内容设计独特的呈现方式
- 鼓励创新和突破！

## 🔒 唯一的约束（必须遵守的 ACF Token）

### 颜色（必须使用这些 Token）
\`\`\`
前景色:
- var(--acf-color-fore-neutral-primary)     // 主要文字 - 黑色
- var(--acf-color-fore-neutral-secondary)   // 次要文字 - 80% 黑
- var(--acf-color-fore-neutral-tertiary)    // 第三级文字 - 75% 黑
- var(--acf-color-fore-neutral-quaternary)  // 最淡文字 - 60% 黑
- var(--acf-color-fill-accent-primary)      // 强调色 - 蓝色

背景色:
- var(--acf-color-back-neutral-primary)     // 主背景 - 白色
- var(--acf-color-back-neutral-secondary)   // 次背景 - 浅灰
- var(--acf-color-back-accent-primary)      // 强调背景 - 浅蓝

描边:
- var(--acf-color-stroke-neutral-secondary) // 边框 - 浅灰
- var(--acf-color-stroke-accent-primary)    // 强调边框 - 蓝色
\`\`\`

### 间距（必须使用这些 Token）
\`\`\`
- var(--acf-spacing-2xs)  // 4px
- var(--acf-spacing-xs)   // 8px
- var(--acf-spacing-s)    // 12px
- var(--acf-spacing-m)    // 16px
- var(--acf-spacing-l)    // 20px
- var(--acf-spacing-xl)   // 24px
- var(--acf-spacing-2xl)  // 36px
\`\`\`

### 圆角（必须使用这些 Token）
\`\`\`
- var(--acf-radius-s)        // 4px
- var(--acf-radius-m)        // 8px
- var(--acf-radius-l)        // 16px
- var(--acf-radius-xl)       // 24px
- var(--acf-radius-infinite) // 9999px (药丸形)
\`\`\`

### 字体大小（必须使用这些 Token）
\`\`\`
- var(--acf-text-title1-size)    // 36px - 大标题
- var(--acf-text-title2-size)    // 24px - 中标题
- var(--acf-text-subtitle1-size) // 20px - 小标题
- var(--acf-text-body2-size)     // 16px - 正文
- var(--acf-text-body3-size)     // 14px - 小正文
- var(--acf-text-caption1-size)  // 13px - 标注
\`\`\`

### 阴影（推荐使用）
\`\`\`
- var(--acf-elevation-0) // 无阴影
- var(--acf-elevation-1) // 轻阴影
- var(--acf-elevation-2) // 中阴影
- var(--acf-elevation-3) // 重阴影
\`\`\`

## 📦 语义块类型

你可以使用以下语义块，自由组合：

\`\`\`typescript
type SemanticBlockType =
  | 'hero'           // 主视觉大图
  | 'title'          // 标题
  | 'subtitle'       // 副标题
  | 'body'           // 正文
  | 'image'          // 单图
  | 'image-grid'     // 图片网格
  | 'image-carousel' // 图片轮播
  | 'metadata'       // 元数据
  | 'tags'           // 标签
  | 'action'         // 按钮
  | 'divider'        // 分隔线
  | 'spacer'         // 间隔
  | 'card'           // 卡片容器（可嵌套其他块）
  | 'list'           // 列表
  | 'quote'          // 引用
  | 'stat'           // 统计数字
  | 'custom';        // 自定义容器（可嵌套）
\`\`\`

## 📝 输出格式

输出一个 JSON 对象：

\`\`\`json
{
  "version": "1.0",
  "intent": {
    "primary": "immersive-visual | information-dense | gallery-showcase | comparison | step-by-step | editorial | freeform",
    "mood": "dramatic | clean | playful | professional | artistic | cozy",
    "focus": "image-first | text-first | balanced",
    "reasoning": "解释你的设计决策"
  },
  "layout": {
    "type": "grid | flex | stack",
    "gridTemplate": "1fr 2fr 1fr",
    "gridTemplateAreas": ["hero hero sidebar", "content content sidebar"],
    "gap": "var(--acf-spacing-l)",
    "padding": "var(--acf-spacing-xl)",
    "maxWidth": "1208px"
  },
  "containerStyle": {
    "backgroundColor": "var(--acf-color-back-neutral-primary)",
    "borderRadius": "var(--acf-radius-xl)",
    "padding": "var(--acf-spacing-xl)"
  },
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "gridArea": "hero",
      "style": {
        "height": "400px",
        "borderRadius": "var(--acf-radius-l)"
      },
      "content": {
        "imageUrl": "",
        "title": "标题",
        "subtitle": "副标题",
        "overlay": true
      }
    }
  ],
  "relatedQueries": ["相关搜索1", "相关搜索2"]
}
\`\`\`

## 🎯 设计原则

1. **创意优先**: 不要拘泥于传统布局，大胆创新！
2. **视觉层次**: 确保信息有清晰的层次结构
3. **适应内容**: 根据查询类型设计最合适的呈现方式
4. **Token 约束**: 颜色、间距、圆角、字体必须使用 ACF Token

## 🌟 示例场景

- "Picasso Blue Period" → 艺术画廊风格，大图 + 时间线 + 作品网格
- "Tokyo travel guide" → 沉浸式旅游杂志，大图 hero + 地点卡片 + 标签
- "iPhone 15 vs Samsung S24" → 对比布局，左右分栏 + 规格对比
- "How to make pasta" → 步骤引导，编号列表 + 过程图片
- "Machine learning explained" → 信息密集型，统计数字 + 引用 + 列表

记住：你是设计师，有完全的创作自由！只需要确保使用 ACF Token。
`;

// ============================================================================
// AI Generation
// ============================================================================

export async function generateSemanticA2UI(query: string): Promise<SemanticA2UIDescriptor> {
  console.log('🎨 SemanticA2UI: Generating UI for:', query);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{
        role: 'user',
        parts: [{ 
          text: `${SEMANTIC_A2UI_PROMPT}\n\n用户搜索查询: "${query}"\n\n请设计一个独特的、视觉吸引力强的 UI。发挥你的创意！只输出 JSON，不要其他内容。` 
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.9, // 高温度，鼓励创意
        maxOutputTokens: 4096,
      },
    });

    const content = response.text;
    console.log('🎨 SemanticA2UI: Raw response received');

    if (!content) {
      throw new Error('No content in response');
    }

    // 清理 JSON
    let jsonContent = content.trim();
    if (jsonContent.startsWith('```json')) {
      jsonContent = jsonContent.slice(7);
    }
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.slice(3);
    }
    if (jsonContent.endsWith('```')) {
      jsonContent = jsonContent.slice(0, -3);
    }
    jsonContent = jsonContent.trim();

    const result = JSON.parse(jsonContent) as SemanticA2UIDescriptor;
    console.log('🎨 SemanticA2UI: Parsed result:', result.intent);

    // 验证并自动修复
    const validation = validateSemanticA2UI(result, { autoFix: true });
    
    if (!validation.valid) {
      console.warn('⚠️ SemanticA2UI: Validation issues found, auto-fixing...');
      console.log(getComplianceReport(validation));
    }
    
    // 确保基本字段存在
    const fixedResult = validation.fixedDescriptor || result;
    return ensureRequiredFields(fixedResult, query);

  } catch (error: any) {
    console.error('❌ SemanticA2UI generation failed:', error);
    return getDefaultSemanticA2UI(query);
  }
}

// ============================================================================
// Ensure Required Fields
// ============================================================================

function ensureRequiredFields(descriptor: SemanticA2UIDescriptor, query: string): SemanticA2UIDescriptor {
  // 确保版本
  if (!descriptor.version) {
    descriptor.version = '1.0';
  }
  
  // 确保 intent
  if (!descriptor.intent) {
    descriptor.intent = {
      primary: 'freeform',
      mood: 'clean',
      focus: 'balanced',
      reasoning: 'Default intent',
    };
  }
  
  // 确保 layout
  if (!descriptor.layout) {
    descriptor.layout = {
      type: 'stack',
      gap: 'var(--acf-spacing-l)',
      padding: 'var(--acf-spacing-xl)',
      maxWidth: '1208px',
    };
  }
  
  // 确保 blocks
  if (!descriptor.blocks || descriptor.blocks.length === 0) {
    descriptor.blocks = [
      {
        id: 'hero-default',
        type: 'hero',
        style: {
          height: '360px',
          borderRadius: 'var(--acf-radius-l)',
        },
        content: {
          imageUrl: '',
          title: query,
          subtitle: `Discover ${query}`,
          overlay: true,
        },
      } as any,
      {
        id: 'body-default',
        type: 'body',
        style: {
          padding: 'var(--acf-spacing-m)',
        },
        content: {
          text: `Explore visual content related to "${query}".`,
        },
      } as any,
    ];
  }
  
  // 确保 relatedQueries
  if (!descriptor.relatedQueries || descriptor.relatedQueries.length === 0) {
    descriptor.relatedQueries = [
      `${query} images`,
      `${query} photos`,
      `famous ${query}`,
    ];
  }
  
  return descriptor;
}

// ============================================================================
// Default UI (Fallback)
// ============================================================================

function getDefaultSemanticA2UI(query: string): SemanticA2UIDescriptor {
  const lowerQuery = query.toLowerCase();
  
  // 根据查询类型选择默认模式
  let intent: SemanticIntent;
  let layout: SemanticLayout;
  let blocks: SemanticBlock[];
  
  // 艺术/视觉类
  if (/art|painting|design|photo|image|visual/.test(lowerQuery)) {
    intent = {
      primary: 'gallery-showcase',
      mood: 'artistic',
      focus: 'image-first',
      reasoning: 'Art/Visual query - using gallery showcase layout',
    };
    layout = {
      type: 'stack',
      gap: 'var(--acf-spacing-l)',
      padding: 'var(--acf-spacing-xl)',
      maxWidth: '1208px',
    };
    blocks = [
      {
        id: 'hero',
        type: 'hero',
        style: {
          height: '400px',
          borderRadius: 'var(--acf-radius-l)',
        },
        content: {
          imageUrl: '',
          title: query,
          subtitle: 'Explore the visual world',
          overlay: true,
        },
      } as any,
      {
        id: 'gallery',
        type: 'image-grid',
        style: {
          borderRadius: 'var(--acf-radius-m)',
        },
        content: {
          images: [],
          columns: 4,
          aspectRatio: '1',
        },
      } as any,
      {
        id: 'tags',
        type: 'tags',
        content: {
          tags: [query, 'art', 'visual', 'gallery', 'explore'],
          variant: 'subtle',
        },
      } as any,
    ];
  }
  // 旅游/地点类
  else if (/travel|city|visit|tour|place|destination/.test(lowerQuery)) {
    intent = {
      primary: 'immersive-visual',
      mood: 'dramatic',
      focus: 'image-first',
      reasoning: 'Travel query - using immersive visual layout',
    };
    layout = {
      type: 'grid',
      gridTemplate: '2fr 1fr',
      gridTemplateAreas: ['hero sidebar', 'content sidebar'],
      gap: 'var(--acf-spacing-l)',
      padding: 'var(--acf-spacing-xl)',
      maxWidth: '1208px',
    };
    blocks = [
      {
        id: 'hero',
        type: 'hero',
        gridArea: 'hero',
        style: {
          height: '300px',
          borderRadius: 'var(--acf-radius-l)',
        },
        content: {
          imageUrl: '',
          title: query,
          subtitle: 'Discover amazing destinations',
          overlay: true,
        },
      } as any,
      {
        id: 'sidebar',
        type: 'card',
        gridArea: 'sidebar',
        style: {
          padding: 'var(--acf-spacing-l)',
        },
        content: {
          variant: 'elevated',
          children: [
            {
              id: 'sidebar-title',
              type: 'title',
              content: { text: 'Quick Info', level: 3 },
            },
            {
              id: 'sidebar-list',
              type: 'list',
              content: {
                variant: 'compact',
                items: [
                  { title: 'Best Time to Visit', subtitle: 'Spring & Fall' },
                  { title: 'Popular Attractions', subtitle: '10+ landmarks' },
                  { title: 'Local Cuisine', subtitle: 'Must try dishes' },
                ],
              },
            },
          ],
        },
      } as any,
      {
        id: 'content',
        type: 'image-grid',
        gridArea: 'content',
        content: {
          images: [],
          columns: 3,
          aspectRatio: '4/3',
        },
      } as any,
    ];
  }
  // 产品/对比类
  else if (/vs|compare|review|product|best/.test(lowerQuery)) {
    intent = {
      primary: 'comparison',
      mood: 'professional',
      focus: 'balanced',
      reasoning: 'Comparison query - using side-by-side layout',
    };
    layout = {
      type: 'grid',
      gridTemplate: '1fr 1fr',
      gap: 'var(--acf-spacing-l)',
      padding: 'var(--acf-spacing-xl)',
      maxWidth: '1208px',
    };
    blocks = [
      {
        id: 'title',
        type: 'title',
        style: {
          gridColumn: '1 / -1',
          textAlign: 'center',
          marginBottom: 'var(--acf-spacing-l)',
        },
        content: { text: query, level: 1 },
      } as any,
      {
        id: 'left',
        type: 'card',
        style: {
          padding: 'var(--acf-spacing-l)',
        },
        content: {
          variant: 'elevated',
          children: [
            { id: 'left-image', type: 'image', content: { url: '', aspectRatio: '16/9' } },
            { id: 'left-title', type: 'title', content: { text: 'Option A', level: 3 } },
            { id: 'left-body', type: 'body', content: { text: 'Description for option A...' } },
          ],
        },
      } as any,
      {
        id: 'right',
        type: 'card',
        style: {
          padding: 'var(--acf-spacing-l)',
        },
        content: {
          variant: 'elevated',
          children: [
            { id: 'right-image', type: 'image', content: { url: '', aspectRatio: '16/9' } },
            { id: 'right-title', type: 'title', content: { text: 'Option B', level: 3 } },
            { id: 'right-body', type: 'body', content: { text: 'Description for option B...' } },
          ],
        },
      } as any,
    ];
  }
  // 教程/步骤类
  else if (/how to|tutorial|guide|step|make|cook/.test(lowerQuery)) {
    intent = {
      primary: 'step-by-step',
      mood: 'clean',
      focus: 'text-first',
      reasoning: 'Tutorial query - using step-by-step layout',
    };
    layout = {
      type: 'stack',
      gap: 'var(--acf-spacing-l)',
      padding: 'var(--acf-spacing-xl)',
      maxWidth: '1208px',
    };
    blocks = [
      {
        id: 'hero',
        type: 'hero',
        style: {
          height: '280px',
          borderRadius: 'var(--acf-radius-l)',
        },
        content: {
          imageUrl: '',
          title: query,
          subtitle: 'Step-by-step guide',
          overlay: true,
        },
      } as any,
      {
        id: 'steps',
        type: 'list',
        style: {
          padding: 'var(--acf-spacing-m)',
        },
        content: {
          variant: 'detailed',
          items: [
            { title: 'Step 1: Preparation', subtitle: 'Gather all necessary materials' },
            { title: 'Step 2: Process', subtitle: 'Follow the main instructions' },
            { title: 'Step 3: Finish', subtitle: 'Complete and review' },
          ],
        },
      } as any,
      {
        id: 'gallery',
        type: 'image-grid',
        content: {
          images: [],
          columns: 4,
          aspectRatio: '1',
        },
      } as any,
    ];
  }
  // 默认
  else {
    intent = {
      primary: 'freeform',
      mood: 'clean',
      focus: 'balanced',
      reasoning: 'General query - using balanced default layout',
    };
    layout = {
      type: 'stack',
      gap: 'var(--acf-spacing-l)',
      padding: 'var(--acf-spacing-xl)',
      maxWidth: '1208px',
    };
    blocks = [
      {
        id: 'hero',
        type: 'hero',
        style: {
          height: '360px',
          borderRadius: 'var(--acf-radius-l)',
        },
        content: {
          imageUrl: '',
          title: query,
          subtitle: `Explore ${query}`,
          overlay: true,
        },
      } as any,
      {
        id: 'body',
        type: 'body',
        style: {
          padding: 'var(--acf-spacing-m)',
        },
        content: {
          text: `Discover visual content related to "${query}". This is a fallback layout generated because the AI service was unavailable.`,
          truncate: 200,
        },
      } as any,
      {
        id: 'gallery',
        type: 'image-grid',
        content: {
          images: [],
          columns: 4,
          aspectRatio: '1',
        },
      } as any,
      {
        id: 'tags',
        type: 'tags',
        content: {
          tags: [query, 'explore', 'discover', 'visual'],
          variant: 'subtle',
        },
      } as any,
    ];
  }
  
  return {
    version: '1.0',
    intent,
    layout,
    containerStyle: {
      backgroundColor: 'var(--acf-color-back-neutral-primary)',
      borderRadius: 'var(--acf-radius-xl)',
      padding: 'var(--acf-spacing-xl)',
      boxShadow: 'var(--acf-elevation-1)',
    },
    blocks,
    relatedQueries: [
      `${query} images`,
      `${query} photos`,
      `famous ${query}`,
      `${query} examples`,
    ],
  };
}

export type { SemanticA2UIDescriptor };




