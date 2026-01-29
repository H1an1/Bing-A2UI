# Interactive Dynamic View - 项目进展

> 本文件记录所有开发进展，每次修改前先写计划，完成后更新状态

---

## 📋 项目概述

**目标**：创建一个类似 Gemini Dynamic View 的交互式 UI 系统
- AI **理解** query 的本质和用户意图
- AI **策划** 最有价值的信息结构
- AI **设计** 美观的视觉呈现
- 文字 + 图片 = 完整的信息体验

---

## 🎯 当前架构：AI Information Architect

### AI 思考过程

```
Step 1: UNDERSTAND (理解)
├── 用户到底在问什么？
├── Intent: learn / buy / explore / compare / plan / create
└── Key Questions: 用户可能想知道的问题

Step 2: PLAN (规划)
├── 什么信息最重要？
├── 什么上下文有帮助？
└── 什么能给用户惊喜？

Step 3: DESIGN (设计)
├── 如何组织信息视觉化？
├── 什么文字辅助图片理解？
└── 如何做到美观 + 有价值？
```

### 输出结构

```typescript
{
  understanding: {
    query: string,
    intent: 'learn' | 'buy' | 'explore' | 'compare' | 'plan',
    context: string,
    key_questions: string[]
  },
  
  content: {
    headline: string,           // 主标题
    subheadline: string,        // 副标题
    intro: string,              // 简介
    sections: [{
      title: string,            // 章节标题
      description: string,      // 章节描述
      images: number,           // 图片数量
      labels: string[],         // 图片标签
      highlight: string         // 💡 关键提示
    }],
    facts: string[],            // ✨ 有趣知识
    closing: string             // 结尾语
  },
  
  design: {
    mood: 'educational' | 'luxurious' | 'playful' | 'dramatic' | 'minimal' | 'warm' | 'nostalgic',
    layout: 'hero-sections' | 'magazine' | 'cards' | 'timeline' | 'comparison' | 'mosaic' | 'spotlight' | 'polaroid' | 'bento',
    colors: { primary: '#hex', scheme: 'dark' | 'light' | 'vibrant' | 'warm' | 'cool' },
    hero: { style: 'fullbleed' | 'split' | 'minimal' | 'none', overlay: 'gradient' | 'dark' | 'none' },
    gallery: { style: 'grid' | 'masonry' | 'cards' | 'scattered', showLabels: boolean, columns: 2-5, imageStyle: 'rounded' | 'polaroid' | 'shadow' },
    effects: { animations: boolean, hover: 'scale' | 'lift' | 'glow' }
  }
}
```

---

## ✅ 已完成的工作

### [v0.7.0] - 2026-01-23 - Layout Diversity

**问题：** 信息丰富了，但布局又变得固定单调。

**解决方案：** 恢复布局多样性，AI 根据内容选择最合适的布局。

**9 种布局类型：**
| Layout | Best For | 特点 |
|--------|----------|------|
| `hero-sections` | 教程、指南 | Hero 图 + 下方章节 |
| `magazine` | 旅行、美食 | 编辑风格，大小混合 |
| `cards` | 产品、集合 | 等尺寸卡片网格 |
| `timeline` | 历史、演变 | 时间线流程 |
| `comparison` | 对比、选择 | 左右并排 |
| `mosaic` | 艺术、灵感 | Pinterest 瀑布流 |
| `spotlight` | 单品、精品 | 单图聚焦 |
| `polaroid` | 怀旧、回忆 | 散落相片效果 |
| `bento` | 概览、Dashboard | 便当盒混合网格 |

**AI 选择逻辑：**
- `cat breeds` → cards (集合展示)
- `history of jazz` → timeline (时间演变)
- `minimalist interior` → mosaic (灵感墙)
- `iphone vs samsung` → comparison (对比)
- `90s nostalgia` → polaroid (怀旧风)

**文件变更：**
- `promptGenerator.ts` - 布局选择指南 + 示例
- `schema.ts` - 9 种布局 + 5 种 Hero + 6 种 Gallery
- `ImageSearchRenderer.tsx` - 所有布局渲染器

---

### [v0.6.0] - 2026-01-23 - Information Architect

**核心改变：**
- AI 不只是设计师，更是**信息架构师**
- 先理解用户意图，再策划信息，最后设计视觉
- 文字 + 图片结合，提供真正有价值的信息

**新增内容元素：**
- `headline` + `subheadline` - 标题系统
- `intro` - 简介段落
- `sections` with `title`, `description`, `highlight`
- `labels` - 图片标签
- `facts` - 有趣知识卡片
- `closing` - 结尾语

**文件变更：**
- `promptGenerator.ts` - 完全重写，Information Architect 思维
- `schema.ts` - 新的 Understanding + Content + Design 结构
- `ImageSearchRenderer.tsx` - 渲染信息 + 视觉组件
- `interactiveService.ts` - 更新日志和 fallback

---

### [v0.5.0] - 2026-01-23 - UNLEASHED (完全释放创意)

**核心改变：**
- AI 完全自由创作，不受预设布局限制
- 12 种 Gallery 风格：grid, masonry, scattered, polaroid, filmstrip, cards, bento, stack, overlap...
- 6 种 Hero 类型：fullbleed, centered, offset, collage, polaroid, magazine
- 丰富的视觉效果：zoom, parallax, float, tilt, glow, fadeIn, rotate...

**文件变更：**
- 完全重写 `promptGenerator.ts`
- 完全重写 `schema.ts`
- 完全重写 `ImageSearchRenderer.tsx`

---

### [v0.4.0] - 2026-01-23 - 10 Layouts + 6 Interactions

**新增：**
- 10 种布局：hero-flow, split-view, story-scroll, mosaic-wall, carousel-deck, comparison, timeline, spotlight, magazine, explorer
- 6 种交互：tabs, chips, carousel, accordion, spotlight, none
- 6 种 Mood：dramatic, warm, cool, playful, minimal, luxe

---

### [v0.3.0] - 2026-01-22 - Dynamic Layout System

**新增：**
- 8 种布局类型
- AI 可以选择不同布局
- 更高的温度 (0.9) 增加创意

---

### [v0.2.0] - 2026-01-22 - Gemini 风格 UI

**改进：**
- 左侧导航 + 右侧内容布局
- Hero 图片 + 网格布局
- 深色沉浸式主题
- 玻璃效果和 hover 动画

---

### [v0.1.0] - 2026-01-22 - 初始版本

**创建：**
- Interactive Dynamic View 系统
- 7 种应用类型
- AI 驱动的 UI 生成

---

## 🏗️ 当前文件结构

```
src/app/
├── catalog/
│   ├── schema.ts              # Zod Schema (Understanding + Content + Design)
│   ├── promptGenerator.ts     # AI Prompt (Information Architect)
│   └── index.ts
│
├── services/
│   └── interactiveService.ts  # AI 服务 (Gemini 2.0 Flash)
│
├── components/
│   ├── interactive/
│   │   └── ImageSearchRenderer.tsx  # 主渲染器
│   └── InteractiveDynamicTemplate.tsx  # 模板入口
│
└── ...
```

---

## 🎨 设计规范

### Intent 类型

| Intent | 含义 | 示例 |
|--------|------|------|
| `learn` | 学习知识 | "how to make sourdough" |
| `buy` | 购买比较 | "best laptops 2024" |
| `explore` | 探索发现 | "street art" |
| `compare` | 对比选择 | "iphone vs android" |
| `plan` | 规划行程 | "tokyo travel guide" |

### 内容元素

| 元素 | 用途 |
|------|------|
| `headline` | 吸引注意力的主标题 |
| `subheadline` | 补充上下文 |
| `intro` | 简短介绍 |
| `section.title` | 章节标题 |
| `section.description` | 章节说明 |
| `section.labels` | 图片标签 |
| `section.highlight` | 💡 关键提示 |
| `facts` | ✨ 有趣知识 |
| `closing` | 结尾语 |

### 颜色方案

| Scheme | 效果 |
|--------|------|
| `dark` | 深色背景，白色文字 |
| `light` | 浅色背景，深色文字 |
| `vibrant` | 鲜艳活泼 |
| `muted` | 柔和低调 |
| `warm` | 暖色调 |
| `cool` | 冷色调 |

---

## 📝 待办事项

### 高优先级
- [ ] 测试更多 query 类型
- [ ] 优化 AI prompt 生成更好的内容
- [ ] 添加真实图片搜索（目前用 Picsum）

### 中优先级
- [ ] 移动端响应式优化
- [ ] 添加更多交互（hover 详情、点击展开）
- [ ] 性能优化

### 低优先级
- [ ] 主题切换
- [ ] 用户偏好记忆
- [ ] 分享功能

---

## 🔗 相关文档

- `docs/Bing Image Search GenUI Policy.md` - 原始策略文档
- `docs/STYLE_CONTRACT.md` - 样式契约
- `docs/TOKEN_MAPPING.md` - Token 映射
- `docs/INTERACTIVE_VIEW_ARCHITECTURE.md` - 架构文档

---

*最后更新：2026-01-23*
