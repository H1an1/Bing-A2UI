/**
 * A2UI Service - 真正的 Agent-to-UI 服务
 * 
 * 核心能力：
 * 1. 组件组合引擎 - AI 能组合多个特性（timeline + gallery + detail）
 * 2. 动态样式生成 - AI 输出具体的 CSS 值
 * 3. 布局描述语言 - AI 用 JSON 描述任意布局
 */

import { GoogleGenAI } from "@google/genai";
import { A2UIDescriptor, FeatureType, LayoutDescriptor, DynamicStyle } from '../components/A2UIRenderer';

// Gemini API 配置 - 从环境变量读取
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ============================================================================
// AI Prompt - 真正的 A2UI 设计
// ============================================================================

const A2UI_SYSTEM_PROMPT = `你是一个 AI 驱动的 UI 生成引擎。你的任务是为搜索查询设计最佳的 UI 展示方案。

## 核心能力

### 1. 布局描述语言 (Layout Descriptor)
你可以用 JSON 描述任意布局：

\`\`\`typescript
{
  "type": "flex" | "grid" | "stack" | "split" | "absolute",
  "direction": "row" | "column",  // flex 方向
  "gap": "16px",                  // 间距
  "columns": "1fr 2fr",           // grid 列定义
  "rows": "auto 1fr auto",        // grid 行定义
  "areas": ["hero hero", "sidebar main"], // grid 区域
  "splitRatio": "2:1",            // split 比例
  "justify": "start" | "center" | "end" | "between",
  "align": "start" | "center" | "end" | "stretch"
}
\`\`\`

### 2. 动态样式 (Dynamic Style)
你可以为任何元素指定具体的 CSS 值：

\`\`\`typescript
{
  "width": "100%",
  "height": "400px",
  "padding": "24px",
  "margin": "0 0 16px 0",
  "gap": "12px",
  "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "borderRadius": "20px",
  "boxShadow": "0 8px 32px rgba(0,0,0,0.12)",
  "fontSize": "18px",
  "fontWeight": "700",
  "color": "#333"
}
\`\`\`

### 3. 特性组合 (Feature Composition)
你可以组合多个特性来创建独特的、视觉震撼的 UI：

**🎠 轮播类（推荐用于主视觉）：**
- **carousel**: 轮播 - 自动切换的大图轮播，带缩略图导航，适合展示系列作品
- **carousel_3d**: 3D轮播 - 更炫酷的3D效果

**🌟 沉浸式（推荐用于艺术/旅游类）：**
- **hero_immersive**: 沉浸式大图 - 带模糊背景、悬浮效果、标签的震撼大图
- **hero_parallax**: 视差大图 - 滚动时有视差效果
- **hero**: 普通大图 - 简单的大图展示

**🎬 时间轴类（推荐用于历史/演变类）：**
- **timeline_filmstrip**: 胶片式时间轴 - 像电影胶片一样的水平滚动，非常适合艺术作品
- **timeline_horizontal**: 水平时间轴 - 带连线和时间点的优雅时间轴
- **timeline**: 普通时间轴 - 简单的时期切换按钮

**🖼️ 画廊类：**
- **gallery_masonry**: 瀑布流画廊 - Pinterest风格的不规则高度图片墙
- **gallery**: 普通网格 - 规则的图片网格

**💎 卡片类：**
- **cards_glass**: 玻璃态卡片 - 毛玻璃效果的现代卡片
- **cards**: 普通卡片 - 标准卡片布局

**📋 其他：**
- **detail**: 详情描述 - 可展开的文字说明
- **tags**: 标签云 - 点击可搜索的标签
- **list**: 列表 - 可展开的项目列表
- **related**: 相关推荐 - 相关主题按钮
- **tabs**: 标签页 - 分类切换
- **progress**: 进度条 - 步骤进度

## 设计原则

1. **优先使用视觉震撼的特性！**
   - 艺术/绘画类 → **carousel** 或 **timeline_filmstrip** + detail
   - 旅游/风景类 → **hero_immersive** + **gallery_masonry** + tags
   - 历史/演变类 → **timeline_horizontal** + **cards_glass**
   - 人物/产品类 → **hero_immersive** + detail + related
   - 教程/步骤类 → progress + **cards_glass** + list

2. **具体示例：**
   - "Picasso Blue Period" → **carousel** + timeline + detail（轮播展示画作）
   - "Paris attractions" → **hero_immersive** + **gallery_masonry** + tags
   - "iPhone evolution" → **timeline_horizontal** + **cards_glass**
   - "iPhone evolution" → timeline + gallery（时间线+画廊）

2. **动态调整样式**
   - 艺术类查询：使用优雅的圆角、柔和的阴影
   - 科技类查询：使用锐利的边角、现代的配色
   - 旅游类查询：使用大图、鲜艳的色彩

3. **灵活的布局**
   - 复杂查询：使用 grid 布局，分区展示
   - 简单查询：使用 stack 布局，线性展示
   - 对比查询：使用 split 布局，左右对比

## 输出格式

你必须输出一个 JSON 对象：

\`\`\`json
{
  "layout": {
    "type": "grid",
    "columns": "1fr 2fr",
    "rows": "auto 1fr",
    "areas": ["timeline timeline", "detail gallery"],
    "gap": "24px"
  },
  "containerStyle": {
    "padding": "24px",
    "background": "white",
    "borderRadius": "20px",
    "boxShadow": "0 4px 20px rgba(0,0,0,0.08)"
  },
  "features": [
    {
      "type": "timeline",
      "position": "timeline",
      "style": { "marginBottom": "16px" },
      "data": {}
    },
    {
      "type": "detail",
      "position": "detail",
      "style": { "padding": "16px" }
    },
    {
      "type": "gallery",
      "position": "gallery",
      "style": { "gap": "12px", "borderRadius": "16px" }
    }
  ],
  "content": {
    "title": "标题",
    "subtitle": "副标题",
    "description": "详细描述...",
    "items": [
      {
        "id": "1",
        "title": "项目标题",
        "subtitle": "副标题",
        "description": "描述",
        "imageQuery": "用于搜索图片的关键词"
      }
    ],
    "timeline": {
      "periods": ["Period 1", "Period 2"],
      "yearRange": [1900, 2000]
    },
    "tags": ["tag1", "tag2"],
    "categories": [
      { "name": "Category 1", "items": [] }
    ],
    "source": "来源"
  },
  "relatedQueries": ["相关搜索1", "相关搜索2"],
  "reasoning": "我选择这个布局是因为..."
}
\`\`\`

## 重要规则

1. **必须输出有效的 JSON**
2. **features 中的 type 必须是上述列出的特性之一**
3. **imageQuery 要具体**，如 "Picasso The Old Guitarist 1903" 而不是 "painting"
4. **items 至少 4-6 个**
5. **style 中的值必须是有效的 CSS 值**
6. **layout.areas 的行数必须与 layout.rows 匹配**
7. **reasoning 要解释你的设计决策**
`;

// ============================================================================
// AI 调用
// ============================================================================

export async function generateA2UI(query: string): Promise<A2UIDescriptor> {
  console.log('🎨 A2UI: Generating UI for:', query);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{
        role: 'user',
        parts: [{ text: `${A2UI_SYSTEM_PROMPT}\n\n用户搜索查询: "${query}"\n\n请设计最佳的 UI 结构。只输出 JSON，不要其他内容。` }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.8,
        maxOutputTokens: 4096,
      },
    });

    // 正确获取响应文本 - response.text 是属性不是方法
    const content = response.text;
    console.log('🎨 A2UI: Raw response:', content);

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

    const result = JSON.parse(jsonContent) as A2UIDescriptor;
    console.log('🎨 A2UI: Parsed result:', result);

    // 验证和修复
    return validateAndFix(result, query);

  } catch (error: any) {
    console.error('❌ A2UI generation failed:', error);
    return getDefaultA2UI(query);
  }
}

// ============================================================================
// 验证和修复
// ============================================================================

function validateAndFix(result: A2UIDescriptor, query: string): A2UIDescriptor {
  // 确保 layout 存在
  if (!result.layout) {
    result.layout = { type: 'stack', gap: '20px' };
  }
  
  // 确保 features 存在且有效
  if (!result.features || !Array.isArray(result.features)) {
    result.features = [{ type: 'gallery', style: { gap: '12px' } }];
  }
  
  // 验证 feature types - 包含所有视觉化特性
  const validTypes: FeatureType[] = [
    // 基础特性
    'timeline', 'gallery', 'hero', 'list', 'detail', 'tags', 'progress', 'tabs', 'slider', 'cards', 'related',
    // 视觉化特性
    'carousel', 'carousel_3d', 'hero_immersive', 'hero_parallax', 
    'timeline_filmstrip', 'timeline_horizontal', 
    'gallery_masonry', 'cards_glass'
  ];
  result.features = result.features.filter(f => validTypes.includes(f.type as FeatureType));
  
  if (result.features.length === 0) {
    result.features = [{ type: 'gallery', style: { gap: '12px' } }];
  }
  
  // 确保 content 存在
  if (!result.content) {
    result.content = {
      title: query,
      description: `Visual results for "${query}"`,
      items: [{
        id: '1',
        title: query,
        description: `Image for ${query}`,
        imageQuery: query
      }]
    };
  }
  
  // 确保 items 存在
  if (!result.content.items || result.content.items.length === 0) {
    result.content.items = [{
      id: '1',
      title: query,
      description: `Image for ${query}`,
      imageQuery: query
    }];
  }
  
  return result;
}

// ============================================================================
// 默认 UI
// ============================================================================

function getDefaultA2UI(query: string): A2UIDescriptor {
  const lowerQuery = query.toLowerCase();
  
  // 根据查询类型选择默认布局 - 使用视觉化特性
  let features: A2UIDescriptor['features'] = [];
  let layout: LayoutDescriptor = { type: 'stack', gap: '24px' };
  
  if (lowerQuery.includes('period') || lowerQuery.includes('evolution') || lowerQuery.includes('history') || lowerQuery.includes('art')) {
    // 艺术/时间线类查询 - 使用轮播 + 胶片时间轴
    layout = { type: 'stack', gap: '24px' };
    features = [
      { type: 'carousel', style: { borderRadius: '24px' } },
      { type: 'timeline_filmstrip', style: { marginTop: '16px' } }
    ];
  } else if (lowerQuery.includes('how to') || lowerQuery.includes('recipe') || lowerQuery.includes('tutorial')) {
    // 教程类查询 - 使用玻璃卡片
    layout = { type: 'stack', gap: '24px' };
    features = [
      { type: 'progress', style: { marginBottom: '16px' }, data: { current: 1, total: 5 } },
      { type: 'cards_glass', style: { gap: '20px', gridColumns: 3 } }
    ];
  } else if (lowerQuery.includes('visit') || lowerQuery.includes('travel') || lowerQuery.includes('attractions') || lowerQuery.includes('city') || lowerQuery.includes('paris') || lowerQuery.includes('tokyo')) {
    // 旅游类查询 - 使用沉浸式大图 + 瀑布流
    layout = { type: 'stack', gap: '24px' };
    features = [
      { type: 'hero_immersive', style: { borderRadius: '32px' } },
      { type: 'gallery_masonry', style: { gap: '16px' } },
      { type: 'tags', style: { padding: '12px' } }
    ];
  } else {
    // 默认：使用轮播 + 玻璃卡片
    layout = { type: 'stack', gap: '24px' };
    features = [
      { type: 'carousel', style: { borderRadius: '24px' } },
      { type: 'cards_glass', style: { gap: '20px', gridColumns: 3 } }
    ];
  }
  
  return {
    layout,
    containerStyle: {
      padding: '24px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    features,
    content: {
      title: query,
      subtitle: `Discover amazing visual content`,
      description: `Explore visual results for "${query}". This is a fallback layout generated because the AI service was unavailable.`,
      items: [
        { id: '1', title: `${query} - Highlight`, subtitle: 'Featured', description: 'Stunning visual showcase', imageQuery: query },
        { id: '2', title: `${query} - Classic`, subtitle: 'Popular', description: 'Most viewed content', imageQuery: `${query} famous` },
        { id: '3', title: `${query} - Modern`, subtitle: 'Trending', description: 'Latest and trending', imageQuery: `${query} modern` },
        { id: '4', title: `${query} - Art`, subtitle: 'Artistic', description: 'Artistic interpretation', imageQuery: `${query} art` },
        { id: '5', title: `${query} - Collection`, subtitle: 'Gallery', description: 'Curated collection', imageQuery: `${query} collection` },
        { id: '6', title: `${query} - Inspiration`, subtitle: 'Creative', description: 'Creative inspiration', imageQuery: `${query} creative` },
        { id: '7', title: `${query} - Detail`, subtitle: 'Close-up', description: 'Detailed view', imageQuery: `${query} detail` },
        { id: '8', title: `${query} - Overview`, subtitle: 'Wide', description: 'Overview perspective', imageQuery: `${query} overview` }
      ],
      tags: [query, 'explore', 'discover', 'visual', 'gallery'],
      timeline: {
        periods: ['Early', 'Middle', 'Late'],
        yearRange: [1900, 2020]
      },
      tags: [query, 'art', 'visual', 'explore']
    },
    relatedQueries: [`${query} images`, `${query} photos`, `famous ${query}`],
    reasoning: 'Fallback layout (AI unavailable). Using default gallery layout.'
  };
}

export type { A2UIDescriptor };

