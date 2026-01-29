# General guidelines

# Answer Card Framework - Design Guidelines

## Overview
这份指南将帮助你正确使用 Answer Card Framework (ACF) 设计系统中的设计 tokens (颜色、排版、间距等) 和组件来创建卡片设计。请务必遵循这些规范以确保设计的一致性和可访问性。

---

## Bing SERP - Copilot Search Images (node 1376-16977) — Figma Make 生成规范（仅针对该设计）

> 适用范围：仅用于你提供的 Bing SERP “Whale images” 这个页面/Frame（node 1376-16977）。  
> 目的：让 Figma Make **严格复刻**设计，而不是“再设计一版”。

### ✅ 必须遵守（Hard constraints）

- **1:1 复刻**：完全按照设计 Frame 的结构与布局还原（容器宽度、左右栏、间距、圆角、图像比例、文字层级）。
- **禁止新增装饰**：**不得**新增任何设计中不存在的背景形状/渐变/blob/大色块/图案/插画。
- **禁止重构信息层级**：不要把模块改造成 Hero Banner；不要改变组件分组与层级关系。
- **只使用已有样式系统**：只使用 `globals 2.css` 中的 tokens/组件/类名；如遇到 token 缺失，**不要发明新值**，优先使用最接近的 ACF token。
- **使用页面作用域 Wrapper**：整页最外层必须包一层：
  - `<div class="acf-bing-serp-images"> ... </div>`
  - 该 wrapper 提供本设计专用的 token alias 和 SMTC stub（避免全局污染，也避免 Make “猜”）。

### ✅ 本设计的结构合同（Layout contract）

> 下面是 Make 应遵循的页面结构（保持 DOM/Frame 层级一致，避免自由发挥）。

- **页面布局**：内容区为「主内容 + 右侧 related rail」两栏布局
  - 主内容：包含 Copilot Search image module + 下方 web result（如设计所示）
  - 右侧 rail：Related search 列表卡片（缩略图 + 文本）
- **Copilot Search image module**：
  - 外层为一张卡片容器（圆角、浅背景、内部有图像网格）
  - 图像网格为固定拼图：左侧大图 + 右侧 2×2 小格（其中一个为 “See more” tile）
  - 图像使用 `object-fit: cover`，不允许拉伸变形
  - “See more” tile 是网格的一格，**不是覆盖在图上**（除非设计就是覆盖）
- **颜色**：背景为中性（白/浅灰/主题浅色），不使用额外彩色背景形状

### ✅ 推荐使用的类名（用于 Make 输出稳定）

- 页面容器：`.acf-bing-serp-images`
- 两栏布局：`.acf-bing-serp-images__layout`
- 主内容：`.acf-bing-serp-images__main`
- 右侧 rail：`.acf-bing-serp-images__rail`
- Copilot 模块卡片：`.acf-bing-serp-images__module`
- 图像拼图网格：`.acf-bing-serp-images__image-grid`
- 网格 tile：`.acf-bing-serp-images__tile`
- “See more” tile：`.acf-bing-serp-images__tile--see-more`

### ⚠️ 特别说明：忽略不在本设计里的“主题演绎”

本设计不需要根据 hero image 生成任何额外的背景装饰。若遇到 “Theme Selection / hero image” 相关描述，请**仅**用于：
- 卡片背景的轻微主题色（如 `back-accent-*` 级别）
- 可点击文本的 `fore-on-accent-alt-*` 系列

不得把“主题”理解为新增大面积彩色背景或抽象图形。

## 如何使用 ACF

### 开发集成

#### 在 HTML 中使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ACF Project</title>
  
  <!-- 引入 ACF 样式 -->
  <link rel="stylesheet" href="path/to/globals.css">
</head>
<body>
  <!-- 你的内容 -->
</body>
</html>
```

#### 在 JavaScript/打包工具中使用

```javascript
// 在你的主入口文件中 (main.js, app.js 等)
import './path/to/globals.css';
```

#### 使用 Design Tokens

ACF 使用 CSS 变量 (Custom Properties) 来管理 design tokens。所有 token 都以 `--acf-` 前缀命名：

```css
/* 使用颜色 token */
.my-element {
  color: var(--acf-color-primary-base);
  background: var(--acf-color-neutral-subtle);
}

/* 使用间距 token */
.my-card {
  padding: var(--acf-spacing-l);
  gap: var(--acf-spacing-m);
}

/* 使用圆角 token */
.my-button {
  border-radius: var(--acf-radius-m);
}
```

#### 与 Figma 的对应关系

- **Figma 变量模式** → CSS 类或 data 属性
- **Figma Token 名称** → CSS 变量名 (将 `/` 替换为 `-`)
- **组件属性** → HTML 类名或 data 属性

示例：
```
Figma: --acf/spacing/l → CSS: var(--acf-spacing-l)
Figma: --acf/color/primary/base → CSS: var(--acf-color-primary-base)
```

---

## 目录
1. [如何使用 ACF](#如何使用-acf)
2. [Design Token 系统](#design-token-系统)
3. [组件库](#组件库)
   - [Badge 组件](#badge-组件)
   - [Button 组件](#button-组件)
   - [Card 组件](#card-组件)
   - [Icon 使用指南](#icon-使用指南)
4. [Layout 布局系统](#layout-布局系统)
5. [Theme Selection (主题选择)](#theme-selection-主题选择)
6. [Typography (排版系统)](#typography-排版系统)
7. [Color Token 使用规范](#color-token-使用规范)
6. [常见卡片模式](#常见卡片模式)
7. [交互状态规范](#交互状态规范)
8. [间距系统](#间距系统)
9. [圆角系统](#圆角系统)
10. [阴影系统](#阴影系统)
11. [可访问性检查清单](#可访问性检查清单)
12. [实用技巧](#实用技巧)

---

## Design Token 系统

Design Token 是设计系统的核心构建块——它们是用稳定、自解释的名称捕获设计决策的平台无关值。Token 涵盖颜色、排版、间距、圆角、阴影和动效等设计属性。

### Token 层级架构

ACF 采用三层 Token 架构，每一层都在前一层基础上抽象构建，逐层明确具体用途：

```
静态 Token (Static Tokens)
    ↓ 引用
语义 Token (Semantic Tokens)  
    ↓ 引用
组件 Token (Component Tokens)
```

#### 1. 静态 Token (Static Tokens)

**定义**：具有固定值的基础 Token，如十六进制颜色、像素尺寸或字重。这些原始值代表值本身，但不规定用途。

**命名格式**：无前缀或使用通用颜色名称

**使用场景**：
- 探索性设计
- 当固定值在生产设计中可接受时

**示例**：
```css
/* 颜色 */
#000000          /* 纯黑 */
#ffffff          /* 纯白 */
#0078d4          /* 蓝色 */

/* 尺寸 */
4px              /* 小间距 */
8px              /* 中间距 */
16px             /* 大间距 */

/* 字重 */
400              /* Regular */
700              /* Bold */
```

#### 2. 语义 Token (Semantic Tokens)

**定义**：建立在静态 Token 之上的中间层，规定广泛的角色——如背景、前景和描边——以指导使用，但不绑定到特定控件（这留给组件 Token）。

**命名格式**：`--acf-{category}-{variant}-{state}`

**命名结构**：
- `category`: 类别（color, spacing, radius, text, etc.）
- `variant`: 变体（neutral, accent, semantic, etc.）
- `state`: 状态或层级（primary, secondary, hover, etc.）

**使用场景**：
- 探索性设计
- 当最小产品主题化能力在生产设计中可接受时
- 支持浅色和深色模式

**示例**：
```css
/* 颜色语义 Token */
--acf-color-fore-neutral-primary: #000000;           /* 主要文本色 */
--acf-color-fore-neutral-secondary: #000000cc;       /* 次要文本色 (80% 不透明) */
--acf-color-back-neutral-primary: #ffffff;           /* 主要背景色 */
--acf-color-back-accent-primary: #ebf6ff;            /* 强调背景色 */
--acf-color-stroke-neutral-primary: #00000033;       /* 边框色 (20% 不透明) */

/* 语义状态颜色 */
--acf-color-back-semantic-positive: #006d21;         /* 成功 - 绿色 */
--acf-color-back-semantic-danger: #c80000;           /* 错误 - 红色 */
--acf-color-back-semantic-warning: #be5a00;          /* 警告 - 橙色 */

/* 间距语义 Token */
--acf-spacing-xs: 8px;                               /* 超小间距 */
--acf-spacing-s: 12px;                               /* 小间距 */
--acf-spacing-m: 16px;                               /* 中间距 */
--acf-spacing-l: 20px;                               /* 大间距 */

/* 圆角语义 Token */
--acf-radius-s: 4px;                                 /* 小圆角 */
--acf-radius-m: 8px;                                 /* 中圆角 */
--acf-radius-l: 16px;                                /* 大圆角 */

/* 排版语义 Token */
--acf-text-body3-size: 14px;                         /* 小正文字号 */
--acf-text-body3-lineheight: 22px;                   /* 小正文行高 */
--acf-text-caption1-size: 13px;                      /* 标题字号 */
--acf-text-caption1-lineheight: 20px;                /* 标题行高 */
```

#### 3. 组件 Token (Component Tokens)

**定义**：最高、最具体的层级。这些 Token 以它们应用的确切控件、属性和状态命名，提供清晰、明确的指导。组件 Token 引用语义 Token 或直接引用静态值。

**命名格式**：`--acf-{component}-{property}-{variant}-{state}`

**命名结构**：
- `component`: 组件名称（button, badge, card, etc.）
- `property`: 属性（bg, text, border, padding, corner, etc.）
- `variant`: 变体（primary, secondary, small, large, etc.）
- `state`: 状态（rest, hover, pressed, disabled, etc.）

**使用场景**：
- **必需**：用于完整的产品主题化能力
- **推荐**：用于保持一致性

**示例**：
```css
/* Button 组件 Token */
--acf-button-bg-primary-rest: #515151;               /* Primary 按钮背景（默认）*/
--acf-button-bg-primary-hover: #3a3a3a;              /* Primary 按钮背景（悬停）*/
--acf-button-bg-primary-pressed: #2a2a2a;            /* Primary 按钮背景（按下）*/
--acf-button-text-primary: #ffffff;                  /* Primary 按钮文本色 */

--acf-button-padding-x-default: 12px;                /* 默认水平内边距 */
--acf-button-padding-x-small: 8px;                   /* 小尺寸水平内边距 */
--acf-button-corner-default: 8px;                    /* 默认圆角 */
--acf-button-corner-small: 4px;                      /* 小尺寸圆角 */

/* Badge 组件 Token */
--acf-badge-padding-default: 8px;                    /* 默认内边距 */
--acf-badge-padding-small: 4px;                      /* 小尺寸内边距 */
--acf-badge-corner-default: 8px;                     /* 默认圆角 */
--acf-badge-corner-small: 4px;                       /* 小尺寸圆角 */
```

### Microsoft Semantic Token System (SMTC)

ACF 在语义层采用了 **Microsoft Semantic Token System (SMTC)**。这些 Token 使用 `--smtc-` 前缀，确保未来演进的灵活性，同时不破坏当前外观，并实现体验可移植性（当体验出现在其他产品中时匹配宿主设计语言）。

**SMTC Token 示例**：
```css
/* 控件 Token */
--smtc-corner-ctrl-rest: 8px;                        /* 控件默认圆角 */
--smtc-padding-ctrl-horizontal-default: 12px;        /* 控件水平内边距 */
--smtc-padding-ctrl-text-top: 8px;                   /* 控件文本顶部内边距 */
--smtc-gap-inside-ctrl-to-secondary-icon: 4px;       /* 控件内图标间距 */

/* 文本 Token */
--smtc-text-global-caption1-font-size: 13px;         /* 全局标题字号 */
--smtc-text-global-caption1-line-height: 20px;       /* 全局标题行高 */
--smtc-text-style-default-header-weight: 700;        /* 默认标题字重 */

/* 前景色 Token */
--smtc-foreground-ctrl-on-brand-rest: #ffffff;       /* 品牌色上的文本 */
--smtc-foreground-ctrl-neutral-primary-rest: #272320; /* 中性主要文本 */

/* 背景色 Token */
--smtc-background-ctrl-brand-rest: #515151;          /* 品牌色背景（默认）*/
--smtc-background-ctrl-neutral-rest: #d7d7d7;        /* 中性背景（默认）*/
```

### 扩展 Token 系统

除了 ACF 和 SMTC Token，系统还支持特定产品的扩展：

**Bing 扩展 (`--bing-smtc-*`)**：
```css
--bing-smtc-background-ctrl-neutral-rest: #c6e2f7;   /* Bing 特定中性背景 */
--bing-smtc-foreground-ctrl-neutral-primary-alt-rest: #005ba1; /* Bing 文本色 */
```

**MAI 扩展 (`--mai-smtc-*`)**：
```css
--mai-smtc-background-ctrl-on-image-rest: #000000;   /* 图片上的背景 */
--mai-smtc-foreground-ctrl-on-image-rest: #ffffff;   /* 图片上的文本 */
```

### Token 命名约定

#### 颜色 Token

**格式**：`--acf-color-{role}-{variant}-{state}`

**角色 (role)**：
- `fore`: 前景（文本、图标）
- `back`: 背景
- `stroke`: 描边（边框）
- `fill`: 填充（实心填充）
- `page`: 页面级背景

**变体 (variant)**：
- `neutral`: 中性色系
- `accent`: 强调色系
- `semantic`: 语义色（positive, danger, warning）
- `on-accent`: 在强调色上的颜色
- `overlay`: 遮罩层

**状态/层级**：
- `primary`: 主要
- `secondary`: 次要
- `tertiary`: 第三级
- `quaternary`: 第四级
- `disabled`: 禁用

#### 间距 Token

**格式**：`--acf-spacing-{size}` 或 `--acf-padding-{context}`

**尺寸等级**：
- `4xs`: 2px（最小）
- `3xs`: 3px
- `2xs`: 4px
- `xs`: 8px
- `s`: 12px
- `m`: 16px（默认）
- `l`: 20px
- `xl`: 24px
- `2xl`: 36px
- `3xl`: 48px
- `4xl`: 80px（最大）

#### 排版 Token

**格式**：`--acf-text-{style}-{property}`

**样式层级**：
- `display1`, `display2`: 展示文本（最大）
- `title1`, `title2`: 标题
- `subtitle1`, `subtitle2`: 副标题
- `body1`, `body2`, `body3`: 正文
- `caption1`, `caption2`: 说明文字（最小）

**属性**：
- `size`: 字号
- `lineheight`: 行高
- `weight`: 字重

#### 圆角 Token

**格式**：`--acf-radius-{size}` 或 `--acf-{component}-corner-{variant}`

**尺寸等级**：
- `s`: 4px（小）
- `m`: 8px（中）
- `l`: 16px（大）
- `infinite`: 9999px（完全圆角）

### 响应式 Token

ACF 支持桌面和移动端的响应式 Token，自动根据屏幕尺寸调整：

```css
/* 定义桌面和移动端值 */
--acf-spacing-m-desktop: 16px;
--acf-spacing-m-mobile: 12px;

/* 默认使用桌面值 */
--acf-spacing-m: var(--acf-spacing-m-desktop);

/* 在小屏幕上自动切换到移动端值 */
@media (max-width: 768px) {
  :root {
    --acf-spacing-m: var(--acf-spacing-m-mobile);
  }
}
```

### Token 使用最佳实践

#### ✅ 推荐做法

**1. 优先使用组件 Token**
```css
/* ✅ 好 - 使用组件 Token */
.my-button {
  background: var(--acf-button-bg-primary-rest);
  padding: var(--acf-button-padding-x-default);
  border-radius: var(--acf-button-corner-default);
}
```

**2. 组件 Token 不存在时使用语义 Token**
```css
/* ✅ 好 - 使用语义 Token */
.custom-element {
  color: var(--acf-color-fore-neutral-primary);
  background: var(--acf-color-back-neutral-secondary);
  margin: var(--acf-spacing-m);
}
```

**3. 为自定义组件创建专用 Token**
```css
/* ✅ 好 - 为新组件定义 Token */
:root {
  --acf-tooltip-bg: var(--acf-color-back-neutral-primary);
  --acf-tooltip-text: var(--acf-color-fore-neutral-primary);
  --acf-tooltip-padding: var(--acf-spacing-xs);
}

.tooltip {
  background: var(--acf-tooltip-bg);
  color: var(--acf-tooltip-text);
  padding: var(--acf-tooltip-padding);
}
```

#### ❌ 避免做法

**1. 避免直接使用硬编码值**
```css
/* ❌ 避免 - 硬编码值 */
.my-button {
  background: #515151;
  padding: 12px;
  border-radius: 8px;
}
```

**2. 避免混用不同层级的 Token**
```css
/* ❌ 避免 - 混用静态值和 Token */
.my-element {
  color: var(--acf-color-fore-neutral-primary);  /* Token */
  background: #ffffff;                            /* 硬编码 */
  margin: 16px;                                   /* 硬编码 */
}
```

**3. 避免在非相关上下文中使用组件 Token**
```css
/* ❌ 避免 - 在卡片中使用按钮 Token */
.card {
  padding: var(--acf-button-padding-x-default);  /* 不合适 */
  border-radius: var(--acf-button-corner-default); /* 不合适 */
}

/* ✅ 好 - 使用语义 Token */
.card {
  padding: var(--acf-spacing-m);
  border-radius: var(--acf-radius-m);
}
```

### 与 Figma 的对应关系

在 Figma 中，Token 以变量形式存在，命名与 CSS 变量对应（去掉 `--` 前缀，`/` 替换为 `-`）：

| Figma 变量 | CSS 变量 | 值 |
|-----------|---------|-----|
| `acf/color/fore/neutral/primary` | `--acf-color-fore-neutral-primary` | `#000000` |
| `acf/spacing/m` | `--acf-spacing-m` | `16px` |
| `acf/button/bg/primary/rest` | `--acf-button-bg-primary-rest` | `#515151` |
| `smtc/corner/ctrl/rest` | `--smtc-corner-ctrl-rest` | `8px` |

### Token 更新和维护

当更新 Token 时：

1. **在 Figma 中更新变量值** → 自动影响所有使用该变量的设计
2. **同步到 `globals.css`** → 更新相应的 CSS 变量值
3. **测试影响范围** → 检查所有使用该 Token 的组件
4. **文档更新** → 在 guidelines.md 中记录重大更改

---

## 组件库

### Badge 组件

Badge 是一个视觉指示器，用于传达关联组件的状态或描述。它使用简短的文本、颜色和图标进行快速识别，并放置在相关内容上或附近。

#### 变体 (Variants)

##### Props（内容类型）

控制 Badge 显示的元素：

- **Icon + Text**: 包含图标和文本标签
  ```html
  <div class="acf-badge">
    <span class="acf-badge__icon">⭐</span>
    <span class="acf-badge__text">4.0</span>
  </div>
  ```

- **Text only**: 仅显示文本
  ```html
  <div class="acf-badge">
    <span class="acf-badge__text">Sponsored</span>
  </div>
  ```

- **Favicon**: 带有网站图标和文本
  ```html
  <div class="acf-badge acf-badge--favicon">
    <img class="acf-badge__favicon" src="cnn-logo.png" alt="">
    <span class="acf-badge__text">Source name</span>
  </div>
  ```

##### Fill（填充样式）

控制 Badge 的视觉权重：

- **Tint** (默认): 柔和的背景，用于次要或装饰性元数据
  - 背景: `var(--smtc-status-informative-tint-background)` → `#f5f5f5`
  - 文字: `var(--smtc-foreground-content-neutral-secondary)` → `rgba(0,0,0,0.8)`

- **Priority**: 加粗高对比度，用于重要或高优先级信息
  - 背景: `var(--bing-smtc-status-informative-neutral-background)` → `#444444`
  - 文字: `var(--bing-smtc-foreground-ctrl-on-image-switchable-rest)` → `#ffffff`

##### Size（尺寸）

- **Default**: 标准尺寸
  - 字号: `13px` (`--text-global-caption1-fontsize`)
  - 行高: `20px`
  - 内边距: `8px`
  - 圆角: `8px` (`--smtc-ctrl-badge-corner`)

- **Small**: 小尺寸，用于空间受限场景
  - 字号: `11px` (`--text-global-caption2-fontsize`)
  - 行高: `13px`
  - 内边距: `4px`
  - 圆角: `4px` (`--acf-radius-s`)

##### Font Weight（字重）

- **Regular** (默认): `font-weight: 400`
- **Heavy**: `font-weight: 700` - 用于强调重要数字或标签

##### Style（样式主题）

- **Neutral** (默认): 灰色中性色调
- **Themed**: 使用主题色（品牌蓝）
  - Tint 背景: 浅蓝
  - Priority 背景: 品牌蓝
- **Positive**: 绿色，表示成功或积极状态
- **Alert**: 红色，表示错误或危险
- **Warning**: 橙色，表示警告

##### Overlay Style（叠加模式）

- **False** (默认): Badge 随明暗模式自动调整，用于响应模式的背景
- **True**: Badge 始终使用深色样式（黑底白字），用于叠加在图片等非响应式背景上
  - 背景: `var(--mai-smtc-background-ctrl-on-image-rest)` → `#000000`
  - 文字: `var(--mai-smtc-foreground-ctrl-on-image-rest)` → `#ffffff`

#### 使用示例

##### 基础 Badge（评分）
```html
<div class="acf-badge">
  <span class="acf-badge__icon">⭐</span>
  <span class="acf-badge__text">4.0</span>
</div>
```

##### 小尺寸 Badge（赞助标签）
```html
<div class="acf-badge acf-badge--small">
  <span class="acf-badge__text">Sponsored</span>
</div>
```

##### 价格 Badge（加粗）
```html
<div class="acf-badge acf-badge--small acf-badge--heavy">
  <span class="acf-badge__text">$9,999</span>
</div>
```

##### 来源 Badge（带 Favicon）
```html
<div class="acf-badge acf-badge--favicon">
  <img class="acf-badge__favicon" src="cnn-logo.png" alt="">
  <span class="acf-badge__text">CNN</span>
</div>
```

##### 视频时长 Badge（图片上叠加）
```html
<div class="acf-badge acf-badge--overlay acf-badge--heavy">
  <span class="acf-badge__text">12:34</span>
</div>
```

#### Token 映射

```css
/* Badge 基础样式 */
.acf-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--smtc-gap-inside-ctrl-to-secondary-icon, 4px);
  
  /* 默认尺寸 */
  padding: var(--smtc-ctrl-badge-padding, 8px);
  padding-top: var(--smtc-ctrl-badge-sm-text-padding-top, 2px);
  padding-bottom: var(--smtc-ctrl-badge-sm-text-padding-bottom, 2px);
  border-radius: var(--smtc-ctrl-badge-corner, 8px);
  
  /* 默认填充 - Tint */
  background: var(--smtc-status-informative-tint-background, #f5f5f5);
  color: var(--smtc-foreground-content-neutral-secondary, rgba(0,0,0,0.8));
  
  /* 默认字体 */
  font-family: var(--fontfamily, 'Roboto', sans-serif);
  font-size: var(--text-global-caption1-fontsize, 13px);
  line-height: var(--text-global-caption1-lineheight, 20px);
  font-weight: var(--text-style-default-regular-weight, 400);
  white-space: nowrap;
}

/* 小尺寸 */
.acf-badge--small {
  padding: var(--smtc-ctrl-badge-sm-padding, 4px);
  border-radius: var(--acf-radius-s, 4px);
  font-size: var(--text-global-caption2-fontsize, 11px);
  line-height: var(--text-global-caption2-lineheight, 13px);
}

/* 加粗 */
.acf-badge--heavy {
  font-weight: var(--text-style-default-header-weight, 700);
}

/* Priority 填充 */
.acf-badge--priority {
  background: var(--bing-smtc-status-informative-neutral-background, #444444);
  color: var(--bing-smtc-foreground-ctrl-on-image-switchable-rest, #ffffff);
}

/* 叠加样式（图片上） */
.acf-badge--overlay {
  background: var(--mai-smtc-background-ctrl-on-image-rest, #000000);
  color: var(--mai-smtc-foreground-ctrl-on-image-rest, #ffffff);
}

/* 图标容器 */
.acf-badge__icon {
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 12px;
}

/* Favicon */
.acf-badge__favicon {
  width: 16px;
  height: 16px;
  border-radius: var(--smtc-corner-ctrl-sm-rest, 4px);
}
```

#### 最佳实践

✅ **使用清晰简洁的标签**，快速传达含义
```html
<!-- ✅ 好 -->
<div class="acf-badge"><span class="acf-badge__text">4.5</span></div>

<!-- ❌ 避免 -->
<div class="acf-badge"><span class="acf-badge__text">Rating: 4.5 out of 5 stars</span></div>
```

✅ **始终配对图标与文本**，避免仅使用图标
```html
<!-- ✅ 好 -->
<div class="acf-badge">
  <span class="acf-badge__icon">⭐</span>
  <span class="acf-badge__text">4.5</span>
</div>

<!-- ❌ 避免 -->
<div class="acf-badge">
  <span class="acf-badge__icon">⭐</span>
</div>
```

✅ **将 Badge 与相关内容配对**，提供即时上下文
```html
<div class="recipe-card">
  <img src="recipe.jpg" alt="Chicken drumettes">
  <!-- Badge 放在图片角落，关联明确 -->
  <div class="acf-badge" style="position: absolute; top: 8px; left: 8px;">
    <span class="acf-badge__icon">⭐</span>
    <span class="acf-badge__text">4.0</span>
  </div>
  <h3>Chicken drumettes</h3>
</div>
```

❌ **避免过度使用 Badge**，会降低视觉影响力和有效性

#### 可访问性

- Badge 应有清晰的语义，确保屏幕阅读器用户能理解
- 不要仅依赖颜色来传达意义，结合图标或文本
- 确保文本与背景有足够对比度（WCAG AA: 至少 4.5:1）

#### 深色模式支持

Badge 自动支持深色模式（当 `overlay` 为 `false` 时）：

```css
/* Light Mode */
.acf-badge {
  background: var(--smtc-status-informative-tint-background, #f5f5f5);
  color: var(--smtc-foreground-content-neutral-secondary, rgba(0,0,0,0.8));
}

/* Dark Mode (自动切换) */
@media (prefers-color-scheme: dark) {
  .acf-badge {
    background: var(--smtc-status-informative-tint-background, #262626);
    color: var(--smtc-foreground-content-neutral-secondary, rgba(255,255,255,0.8));
  }
}
```

---

## Button 组件

Button（按钮）触发一个操作或事件。按钮用于重要操作，如提交响应、确认更改或进入下一步。

### 变体类型

#### 1. Shape（形状）

**Rectangle（矩形）**
- 默认按钮形状
- 使用场景：标准界面元素

**Pill（胶囊）**
- 完全圆角的按钮形状
- 使用场景：需要更柔和、友好外观时使用

```html
<!-- Rectangle 形状 -->
<button class="acf-button">Button</button>

<!-- Pill 形状 -->
<button class="acf-button acf-button--pill">Button</button>
```

#### 2. Style（样式层次）

根据操作层次和视觉环境选择样式。

**Primary（主要）**
- 用于屏幕上的主要操作
- 深色背景，白色文本，高视觉权重

```html
<button class="acf-button acf-button--primary">Button</button>
```

**Secondary（次要）**
- 用于重要但不是主要焦点的操作
- 浅灰色背景，深色文本

```html
<button class="acf-button acf-button--secondary">Button</button>
```

**Subtle（柔和）**
- 用于低强调、可选或不常用的操作
- 极浅背景，在悬停时显示

```html
<button class="acf-button acf-button--subtle">Button</button>
```

**Outline（轮廓）**
- 用于需要在繁忙或彩色背景上对比的次要操作
- 透明背景，深色边框

```html
<button class="acf-button acf-button--outline">Button</button>
```

#### 3. State（状态）

所有按钮包含以下交互状态：

- **Default（默认）**: 初始状态
- **Hover（悬停）**: 鼠标悬停时
- **Pressed（按下）**: 点击按下时
- **Disabled（禁用）**: 不可交互状态

状态通过 CSS 伪类自动处理，无需额外类名：

```css
.acf-button:hover { /* 悬停状态 */ }
.acf-button:active { /* 按下状态 */ }
.acf-button:disabled { /* 禁用状态 */ }
```

#### 4. Is Ghost（幽灵模式）

幽灵按钮用于低强调或次要操作，最适合可选、内联或最小化的 UI 环境。

```html
<!-- 普通按钮 -->
<button class="acf-button acf-button--secondary">Button</button>

<!-- 幽灵按钮 -->
<button class="acf-button acf-button--ghost">Button</button>
```

**重要提示**：幽灵按钮的默认状态对所有样式（Primary、Secondary、Subtle、Outline）都相同。交互状态（Hover、Pressed、Disabled）与对应的样式一致。根据强调级别和上下文选择与按钮样式匹配的幽灵变体。

#### 5. With Icons（带图标）

按钮可以在标签左侧或右侧包含图标，以视觉方式强化操作。图标应增强清晰度，而不是重复标签的含义。

```html
<!-- 默认（无图标）-->
<button class="acf-button">Button</button>

<!-- 左侧图标 -->
<button class="acf-button">
  <span class="acf-button__icon-left">
    <svg width="16" height="16" fill="currentColor"><!-- icon path --></svg>
  </span>
  <span class="acf-button__text">Button</span>
</button>

<!-- 右侧图标 -->
<button class="acf-button">
  <span class="acf-button__text">Button</span>
  <span class="acf-button__icon-right">
    <svg width="16" height="16" fill="currentColor"><!-- icon path --></svg>
  </span>
</button>

<!-- 左右两侧图标 -->
<button class="acf-button">
  <span class="acf-button__icon-left">
    <svg width="16" height="16" fill="currentColor"><!-- icon path --></svg>
  </span>
  <span class="acf-button__text">Button</span>
  <span class="acf-button__icon-right">
    <svg width="16" height="16" fill="currentColor"><!-- icon path --></svg>
  </span>
</button>
```

#### 6. Sizes（尺寸）

所有类型的Button的Style都使用：alignSelf: 'center',禁止使用 width:100%。目的是hug content而不是fill container。
提供小、默认和大三种尺寸。不确定时使用默认尺寸。

**Small（小）**
- 高度：26px
- 内边距：3px 8px
- 字号：13px / 行高 20px
- 圆角：4px
- 字重：Regular (400)

```html
<button class="acf-button acf-button--small">Button</button>
```

**Default（默认）**
- 高度：36px
- 内边距：8px 12px
- 字号：13px / 行高 20px
- 圆角：8px
- 字重：Bold (700)

```html
<button class="acf-button">Button</button>
```

**Large（大）**
- 高度：46px
- 内边距：12px 16px
- 字号：14px / 行高 22px
- 圆角：8px
- 字重：Bold (700)

```html
<button class="acf-button acf-button--large">Button</button>
```

### Token 映射

| 设计属性 | Figma Token | CSS 变量 | 值 |
|---------|------------|----------|-----|
| **默认尺寸** |
| 圆角 | --smtc/corner/ctrl/rest | --acf-button-corner-default | 8px |
| 水平内边距 | --smtc/padding/ctrl/horizontal-default | --acf-button-padding-x-default | 12px |
| 顶部内边距 | --smtc/padding/ctrl/text-top | --acf-button-padding-top-default | 8px |
| 底部内边距 | --smtc/padding/ctrl/text-bottom | --acf-button-padding-bottom-default | 8px |
| 字号 | --text/global/caption1/fontsize | --acf-text-size-caption1 | 13px |
| 行高 | --text/global/caption1/lineheight | --acf-text-lineheight-caption1 | 20px |
| 字重 | --text/style/default/header/weight | --acf-text-weight-bold | 700 |
| 图标间距 | --smtc/gap/inside/ctrl/to-secondary-icon | --acf-button-gap-icon | 4px |
| **小尺寸** |
| 圆角 | --smtc/corner/ctrl/sm/rest | --acf-button-corner-small | 4px |
| 水平内边距 | --smtc/padding/ctrl-sm/horizontal-default | --acf-button-padding-x-small | 8px |
| 顶部内边距 | --smtc/padding/ctrl-sm/text-top | --acf-button-padding-top-small | 3px |
| 底部内边距 | --smtc/padding/ctrl-sm/text-bottom | --acf-button-padding-bottom-small | 3px |
| 字重 | --text/style/default/regular/weight | --acf-text-weight-regular | 400 |
| 图标间距 | --smtc/gap/between/content/xxx-small | --acf-button-gap-icon-small | 2px |
| **大尺寸** |
| 圆角 | --smtc/corner/ctrl/lg/rest | --acf-button-corner-large | 8px |
| 水平内边距 | --smtc/padding/ctrl-lg/horizontal-default | --acf-button-padding-x-large | 16px |
| 顶部内边距 | --smtc/padding/ctrl-lg/text-top | --acf-button-padding-top-large | 12px |
| 底部内边距 | --smtc/padding/ctrl-lg/text-bottom | --acf-button-padding-bottom-large | 12px |
| 字号 | --text/global/body3/fontsize | --acf-text-size-body3 | 14px |
| 行高 | --text/global/body3/lineheight | --acf-text-lineheight-body3 | 22px |
| 文本侧边距 | --bing/smtc/padding/ctrl/text-side/large | --acf-button-text-side-large | 4px |
| **Primary 样式** |
| 背景色（默认）| --bing/smtc/background/ctrl/brand/rest | --acf-button-bg-primary-rest | #515151 |
| 文本色（默认）| --smtc/foreground/ctrl/on-brand/rest | --acf-button-text-primary | #ffffff |
| **Secondary 样式** |
| 背景色（默认）| --bing/smtc/background/ctrl/neutral/rest | --acf-button-bg-secondary-rest | #d7d7d7 |
| 文本色（默认）| --bing/smtc/foreground/ctrl/neutral/primary/alt/rest | --acf-button-text-secondary | #202020 |
| **Subtle 样式** |
| 背景色（默认）| --bing/smtc/background/ctrl/active/brand/rest | --acf-button-bg-subtle-rest | #f5f5f5 |
| 文本色（默认）| --smtc/foreground/ctrl/on-subtle/rest | --acf-button-text-subtle | #202020 |
| **Outline 样式** |
| 背景色 | 透明 | transparent | rgba(255,255,255,0) |
| 边框色（默认）| --smtc/stroke/ctrl/on-outline/rest | --acf-button-border-outline | #515151 |
| 文本色（默认）| --smtc/foreground/ctrl/on-outline/rest | --acf-button-text-outline | #202020 |

### 使用示例

#### 示例 1：对话框按钮组
```html
<div class="dialog-footer">
  <button class="acf-button acf-button--outline">Cancel</button>
  <button class="acf-button acf-button--primary">Confirm</button>
</div>
```

#### 示例 2：工具栏操作
```html
<div class="toolbar">
  <button class="acf-button acf-button--subtle acf-button--small">
    <span class="acf-button__icon-left">
      <svg width="16" height="16"><!-- edit icon --></svg>
    </span>
    <span class="acf-button__text">Edit</span>
  </button>
  <button class="acf-button acf-button--subtle acf-button--small">
    <span class="acf-button__icon-left">
      <svg width="16" height="16"><!-- share icon --></svg>
    </span>
    <span class="acf-button__text">Share</span>
  </button>
</div>
```

#### 示例 3：表单提交
```html
<form>
  <!-- form fields -->
  <div class="form-actions">
    <button type="button" class="acf-button acf-button--secondary">Save Draft</button>
    <button type="submit" class="acf-button acf-button--primary">
      <span class="acf-button__text">Submit</span>
      <span class="acf-button__icon-right">
        <svg width="16" height="16"><!-- arrow icon --></svg>
      </span>
    </button>
  </div>
</form>
```

#### 示例 4：卡片操作
```html
<div class="card">
  <h3>Premium Plan</h3>
  <p>$29/month</p>
  <button class="acf-button acf-button--primary acf-button--large" style="width: 100%;">
    Upgrade Now
  </button>
</div>
```

### 最佳实践

✅ **在对话框或浮层中将主按钮放在右侧**
```html
<!-- ✅ 好 -->
<div class="dialog-actions">
  <button class="acf-button acf-button--secondary">Cancel</button>
  <button class="acf-button acf-button--primary">Confirm</button>
</div>

<!-- ❌ 避免 -->
<div class="dialog-actions">
  <button class="acf-button acf-button--primary">Confirm</button>
  <button class="acf-button acf-button--secondary">Cancel</button>
</div>
```

✅ **如果有多个同等优先级的按钮，使用 Secondary 或 Outline 样式**
```html
<!-- ✅ 好 -->
<div>
  <button class="acf-button acf-button--secondary">Option A</button>
  <button class="acf-button acf-button--secondary">Option B</button>
</div>

<!-- ❌ 避免在一组中使用多个 Primary -->
<div>
  <button class="acf-button acf-button--primary">Option A</button>
  <button class="acf-button acf-button--primary">Option B</button>
</div>
```

✅ **次要操作使用 Subtle 或 Outline 按钮，避免布局混乱**

❌ **不要为次要操作使用 Primary 按钮**

✅ **按钮标签应简洁明确**
- 使用动词表示动作：Submit、Cancel、Delete
- 避免冗长描述：Use "Delete" instead of "Delete this item"

✅ **使用图标增强清晰度，但不要重复标签含义**
```html
<!-- ✅ 好 - 图标补充含义 -->
<button class="acf-button">
  <span class="acf-button__icon-left">
    <svg><!-- download icon --></svg>
  </span>
  <span class="acf-button__text">Download</span>
</button>

<!-- ❌ 避免 - 图标重复文本 -->
<button class="acf-button">
  <span class="acf-button__icon-left">
    <svg><!-- text icon --></svg>
  </span>
  <span class="acf-button__text">Text</span>
</button>
```

#### 可访问性

- 始终使用语义化的 `<button>` 元素，而非 `<div>` 或 `<a>`
- 为仅有图标的按钮提供 `aria-label`
- 确保禁用按钮使用 `disabled` 属性而非仅样式
- 保持足够的触摸目标大小（至少 44x44px）
- 确保文本与背景有足够对比度（WCAG AA: 至少 4.5:1）

#### 深色模式支持

Button 组件通过 `@media (prefers-color-scheme: dark)` 自动适配深色模式，确保在不同主题下的可读性和对比度。

---

## Theme Selection (主题选择)

### 如何选择主题颜色

每个 SERP (Search Engine Results Page) 都有自己的主题颜色,这个颜色**由 hero image 决定**。

**核心原则:**
- 主题颜色基于页面的 hero 图片提取
- 每个卡片应与页面整体主题保持一致
- 主题颜色用于创建视觉层次和强调

### 可用主题色系

设计系统提供了以下主题色系(从 `globals.css` 获取):

```css
/* 蓝色主题 (默认) */
--acf-color-accent-primary: #0078d4
--acf-color-accent-secondary: #005a9f
--acf-color-accent-tertiary: #00487f

/* 其他可用色系 */
--acf-color-crimson-*
--acf-color-amber-*
--acf-color-gold-*
--acf-color-emerald-*
--acf-color-sea-*
--acf-color-teal-*
--acf-color-lilac-*
--acf-color-violet-*
```

---

---

## 2. Typography (字体系统)

### 2.1 字体家族 (Font Family)

ACF 设计系统使用 **Roboto** 作为主要字体:

```css
--acf-font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--acf-font-family-mono: 'Courier New', 'Courier', monospace;  /* 用于代码 */
```

**字重 (Font Weight):**
- **Regular (400):** 正文、常规文本
- **Bold (700):** 标题、强调文本

### 2.2 文本样式层次 (Text Style Hierarchy)

#### Display - 超大标题

用于最突出的文本,如页面主标题或重要数字。

**Display 1** - 最大显示文本
```css
字号: 54px
行高: 64px
字重: 700 (Bold)
用途: Hero headlines, 重要数据展示
CSS Class: .text-display1
```

**Display 2** - 次级显示文本
```css
字号: 40px
行高: 48px
字重: 700 (Bold)
用途: 副标题、重要信息
CSS Class: .text-display2
```

---

#### Title - 标题

用于页面标题和主要分节。

**Title 1** - 页面主标题
```css
字号: 36px
行高: 48px
字重: 700 (Bold)
用途: Page titles, H1
CSS Class: .text-title1
HTML: <h1>
```

**Title 2** - 分节标题
```css
字号: 24px
行高: 32px
字重: 700 (Bold)
用途: Section titles, H2
CSS Class: .text-title2
HTML: <h2>
```

---

#### Subtitle - 副标题

用于卡片标题、次级标题。

**Subtitle 1 Strong** - 大副标题
```css
字号: 20px
行高: 26px
字重: 700 (Bold)
用途: Card headers, H3
CSS Class: .text-subtitle1-strong
HTML: <h3>
```

**Subtitle 2** - 常规副标题
```css
字号: 18px
行高: 22px
字重: 400 (Regular)
用途: Subheadings
CSS Class: .text-subtitle2
```

**Subtitle 2 Strong** - 粗体副标题
```css
字号: 18px
行高: 22px
字重: 700 (Bold)
用途: Emphasized subheadings, H4
CSS Class: .text-subtitle2-strong
HTML: <h4>
```

---

#### Body - 正文

用于主要内容区域的文本。

**Body 1** - 大正文
```css
字号: 18px
行高: 28px
字重: 400 (Regular)
用途: Large body text, introductions
CSS Class: .text-body1
```

**Body 1 Strong** - 粗体大正文
```css
字号: 18px
行高: 28px
字重: 700 (Bold)
用途: Emphasized large text, H5
CSS Class: .text-body1-strong
HTML: <h5>
```

**Body 2** - 标准正文 (最常用)
```css
字号: 16px
行高: 26px
字重: 400 (Regular)
用途: Standard body text, paragraphs
CSS Class: .text-body2
HTML: <p> (默认)
```

**Body 2 Strong** - 粗体标准正文
```css
字号: 16px
行高: 26px
字重: 700 (Bold)
用途: Emphasized text, H6
CSS Class: .text-body2-strong
HTML: <h6>
```

**Body 3** - 小正文
```css
字号: 14px
行高: 22px
字重: 400 (Regular)
用途: Small body text, descriptions
CSS Class: .text-body3
```

**Body 3 Strong** - 粗体小正文
```css
字号: 14px
行高: 22px
字重: 700 (Bold)
用途: Emphasized small text
CSS Class: .text-body3-strong
```

**Body 3 Mono** - 等宽代码文本
```css
字号: 14px
行高: 22px
字重: 400 (Regular)
字体: Courier New
用途: Code snippets, technical text
CSS Class: .text-body3-mono
HTML: <code>, <pre>
```

---

#### Caption - 辅助文本

用于注释、标签、元数据等小文本。

**Caption 1** - 标准辅助文本
```css
字号: 13px
行高: 20px
字重: 400 (Regular)
用途: Captions, labels, metadata
CSS Class: .text-caption1
```

**Caption 1 Strong** - 粗体辅助文本
```css
字号: 13px
行高: 20px
字重: 700 (Bold)
用途: Emphasized captions
CSS Class: .text-caption1-strong
```

**Caption 2** - 最小文本
```css
字号: 11px
行高: 13px
字重: 400 (Regular)
用途: Footnotes, attribution, timestamps
CSS Class: .text-caption2
```

**Caption 2 Strong** - 粗体最小文本
```css
字号: 11px
行高: 13px
字重: 700 (Bold)
用途: Emphasized footnotes
CSS Class: .text-caption2-strong
```

---

### 2.3 ACF 专用文本样式

这些是 ACF 特定的文本样式,用于特定场景。

**ACF Title 1 Strong** - 卡片标题 card title
```css
字号: 14px
行高: 22px
字重: 700 (Bold)
用途: Card titles (小卡片标题)
CSS Variable: --acf-title1-strong-size
CSS Class: .text-acf-title1-strong
```

**ACF Title 2 Strong** - 卡片副标题
```css
字号: 16px
行高: 22px
字重: 700 (Bold)
用途: Card sub-titles
CSS Variable: --acf-title2-strong-size
CSS Class: .text-acf-title2-strong
```

**ACF Highlight 4** - 大数字/高亮
```css
字号: 36px
行高: 48px
字重: 700 (Bold)
用途: Large numbers, key data (如 "1851")
CSS Variable: --acf-highlight4-size
CSS Class: .text-highlight4
```

**ACF Highlight 5** - 中等高亮
```css
字号: 24px
行高: 32px
字重: 700 (Bold)
用途: Medium highlights, secondary data
CSS Variable: --acf-highlight5-size
CSS Class: .text-highlight5
```

**ACF Documentation Title** - 文档标题
```css
字号: 36px
行高: 100% (36px)
字重: 700 (Bold)
用途: Documentation headers
CSS Variable: --acf-doc-title-size
```

---

### 2.4 排版使用指南

#### 文本层次选择

**卡片设计中的典型组合:**

```
┌─────────────────────────────────────┐
│  Title: ACF Title 1 Strong (14px)  │  ← 卡片标题
│                                     │
│  Body: Body 3 (14px)                │  ← 正文内容
│  More text here...                  │
│                                     │
│  Highlight: Display 1 (54px)        │  ← 重要数字
│  ERFURT                             │
│                                     │
│  Footer: Caption 2 (11px)           │  ← 来源信息
└─────────────────────────────────────┘
```

**页面布局中的典型组合:**

```
H1: Title 1 (36px)                     ← 页面主标题
├─ H2: Title 2 (24px)                  ← 分节标题
│  ├─ H3: Subtitle 1 Strong (20px)    ← 子标题
│  │  ├─ Body 2 (16px)                ← 正文
│  │  └─ Caption 1 (13px)             ← 注释
```

#### 文本颜色搭配建议

结合 Typography 和 Color tokens:

```css
/* 主标题 - 黑色加粗 */
.card-title {
  font-size: var(--acf-title1-strong-size);
  font-weight: var(--acf-title1-strong-weight);
  line-height: var(--acf-title1-strong-lineheight);
  color: var(--acf-color-fore-neutral-primary);
}

/* 正文 - 80% 黑色 */
.card-body {
  font-size: var(--acf-text-body3-size);
  font-weight: var(--acf-text-body3-weight);
  line-height: var(--acf-text-body3-lineheight);
  color: var(--acf-color-fore-neutral-secondary);
}

/* 主题色高亮文字 */
.card-highlight {
  font-size: var(--acf-text-display1-size);
  font-weight: var(--acf-text-display1-weight);
  line-height: var(--acf-text-display1-lineheight);
  color: var(--acf-color-fore-on-accent-alt-primary);
}

/* 来源信息 - 60% 黑色 */
.card-attribution {
  font-size: var(--acf-text-caption2-size);
  font-weight: var(--acf-text-caption2-weight);
  line-height: var(--acf-text-caption2-lineheight);
  color: var(--acf-color-fore-neutral-quaternary);
}
```

#### 可访问性注意事项

- **最小字号:** 正文不应小于 14px (Body 3)
- **对比度:** 确保文本与背景对比度至少 4.5:1 (WCAG AA)
- **行高:** 正文行高应至少为字号的 1.5 倍
- **行宽:** 每行不超过 75 个字符 (中文约 40 字)

#### 响应式建议

在不同设备上,可以调整字号:

```css
/* Mobile */
@media (max-width: 768px) {
  .text-display1 { font-size: 40px; }  /* 从 54px 缩小 */
  .text-title1 { font-size: 28px; }    /* 从 36px 缩小 */
}
```

---

## 3. Color Token 使用规范

### 3.1 文本颜色 (Foreground Colors)

#### 普通文本内容

**基础层次:**
- **Primary (主要文本):** `--acf-color-fore-neutral-primary` (#000000)
  - 用于: 卡片标题、主要内容
  - 示例: Card title, Header
  
- **Secondary (次要文本):** `--acf-color-fore-neutral-secondary` (rgba(0,0,0,0.8))
  - 用于: 正文内容、描述文字
  - 示例: Body text, Descriptions
  
- **Tertiary (第三级文本):** `--acf-color-fore-neutral-tertiary` (rgba(0,0,0,0.75))
  - 用于: 辅助说明文字
  
- **Quaternary (第四级文本):** `--acf-color-fore-neutral-quaternary` (rgba(0,0,0,0.6))
  - 用于: Footnotes, Attribution, 信息来源标注

#### 主题化文本 ⚠️ 重要

**可访问性要求:** 主题化文本 **必须** 使用 `fore-on-accent-alt-*` 系列颜色来确保可访问性!

- **Clickable Text (Rest):** `--acf-color-fore-on-accent-alt-primary`
  - 用于: 链接、可点击文本的默认状态
  - 配合: `Body 2 Strong` 字体
  
- **Clickable Text (Hover):** `--acf-color-fore-on-accent-alt-secondary`
  - 用于: 链接悬停状态
  
- **Clickable Text (Press):** `--acf-color-fore-on-accent-alt-tertiary`
  - 用于: 链接按下状态

**❌ 错误示例:**
- 不要使用 `fill-accent-primary` 或 `fill-accent-secondary` 作为文本颜色
- 这会导致可访问性问题

**✅ 正确示例:**
```css
/* 可点击的主题化文本 */
.clickable-text {
  color: var(--acf-color-fore-on-accent-alt-primary);
  font-weight: 700;
}

.clickable-text:hover {
  color: var(--acf-color-fore-on-accent-alt-secondary);
}

.clickable-text:active {
  color: var(--acf-color-fore-on-accent-alt-tertiary);
}
```

#### 高亮文本

**用于突出显示重要信息:**
- **Highlight 1 (1-8 characters):** `--acf-color-fore-on-accent-alt-primary`
  - 用于: 短文本高亮、数字、城市名等
  - 配合: Display 1 (54px) 或 Subtitle 2 Strong (18px)
  - 示例: "Erfurt", "54"

---

### 2.2 背景颜色 (Background Colors)

#### 卡片背景

**主题化卡片背景:**
- **Primary:** `--acf-color-back-accent-primary`
  - 示例值: #ebf6ff (蓝色主题), #f7f0ff (紫色主题), #fff0f1 (红色主题)
  - 用于: 主要内容卡片背景
  
- **Secondary:** `--acf-color-back-accent-secondary`
  - 示例值: #ededed
  - 用于: 次要内容区域

**中性背景:**
- **Primary (白色):** `--acf-color-back-neutral-primary` (#ffffff)
  - 用于: Nested cards (嵌套卡片) 的默认状态
  
- **Secondary:** `--acf-color-back-neutral-secondary` (#f5f5f5)
  - 用于: Nested cards 的 hover 状态
  
- **Tertiary:** `--acf-color-back-neutral-tertiary`
  - 用于: Nested cards 的 press 状态

#### 可点击元素背景

**Fill Colors - 用于按钮、选项等:**
- **Rest:** `--acf-color-fill-accent-alt-primary`
  - 示例: Quiz options, Mini cards 背景
  
- **Hover:** `--acf-color-fill-accent-alt-secondary`
  
- **Press:** `--acf-color-fill-accent-alt-tertiary`

---

### 2.3 渐变 (Gradients)

#### 卡片渐变背景

**用于图片上的文字叠加:**
```css
/* 从透明到深色的渐变 */
background: linear-gradient(
  to bottom,
  var(--acf-color-back-other-transparent-dark) 45%,
  #000000 100%
);
```

#### See More Overlay 渐变

**用于内容截断提示:**
```css
/* 0% 位置 */
color: var(--acf-color-back-accent-transparent);

/* 60% 位置 */
color: var(--acf-color-back-accent-primary);
```

#### Carousel Fade 渐变

**用于横向滚动容器的边缘淡化:**
```css
/* 左侧淡化 */
background: linear-gradient(
  270deg,
  var(--acf-color-back-other-neutral-transparent-light) 0%,
  var(--acf-color-back-neutral-primary) 60%
);
```

---

### 2.4 描边颜色 (Stroke/Border Colors)

#### 标准描边

- **Primary:** `--acf-color-stroke-neutral-primary` (rgba(0,0,0,0.2))
  - 用于: 主要边框
  
- **Secondary:** `--acf-color-stroke-neutral-secondary` (rgba(0,0,0,0.1))
  - 用于: 卡片边框、分隔线
  
- **Tertiary:** `--acf-color-stroke-neutral-tertiary` (rgba(0,0,0,0.08))
  - 用于: 轻微分隔

#### 语义化描边

- **Alert (错误/警告):** `--acf-color-stroke-semantic-alert` (#c80000)
  - 用于: 错误状态、重要提示框
  
- **Success:** `--acf-color-stroke-semantic-success` (#006d21)

---

## 4. 常见卡片模式

### 4.1 Themed Text Content Card

**特征:**
- 主题化背景色
- 文本使用中性颜色系统
- 主题化文本必须使用 `fore-on-accent-alt-*`

**结构:**
```
背景: back-accent-primary (如 #ebf6ff)
├─ 标题: fore-neutral-primary (#000000) + Title 1 Strong
├─ 正文: fore-neutral-secondary (rgba(0,0,0,0.8)) + Body 3
├─ 可点击文本: fore-on-accent-alt-primary (#005ba1) + Body 2 Strong
└─ Footnote: fore-neutral-quaternary (rgba(0,0,0,0.6)) + Attribution
```

### 4.2 Highlight Text Context Card

**用于突出显示重要数字或短文本:**

```
背景: back-accent-primary
├─ 标题: fore-neutral-primary + Title 1 Strong
└─ 高亮内容: fore-on-accent-alt-primary + Display 1 (54px)
    示例: "Erfurt", "1851"
```

### 4.3 Nested Card (嵌套卡片)

**外层卡片:**
- 背景: `back-accent-primary` (主题色)
- 标题: `fore-neutral-primary`

**内层卡片 (产品卡片等):**
- **Rest:** `back-neutral-primary` (#ffffff)
- **Hover:** `back-neutral-secondary` (#f5f5f5)
- **Press:** `back-neutral-tertiary`

### 4.4 Quiz/Poll Cards (问答卡片)

**图片区域:**
- 使用渐变遮罩确保文字可读性
- 文字颜色: `fore-neutral-white-primary` (#ffffff)

**选项区域:**
- 背景: `back-accent-primary` (主题色)
- 选项按钮:
  - Rest: `fill-accent-alt-primary`
  - Hover: `fill-accent-alt-secondary`
  - Press: `fill-accent-alt-tertiary`
- 文字: `fore-neutral-secondary`

---

## 5. 交互状态规范

### Primary / Secondary / Tertiary 含义

这三个级别通常对应交互状态:
- **Primary** = Default / Rest state (默认状态)
- **Secondary** = Hover state (悬停状态)
- **Tertiary** = Pressed state (按下状态)

### 应用场景

**文本链接:**
1. Rest: `fore-on-accent-alt-primary`
2. Hover: `fore-on-accent-alt-secondary`
3. Press: `fore-on-accent-alt-tertiary`

**可点击卡片/按钮:**
1. Rest: `fill-accent-alt-primary` / `back-neutral-primary`
2. Hover: `fill-accent-alt-secondary` / `back-neutral-secondary`
3. Press: `fill-accent-alt-tertiary` / `back-neutral-tertiary`

---

## 6. 组件使用建议

### ⚠️ 重要提醒

**减少颜色变体使用,请充分利用 ACF 提供的组件和资源!**

为了减少设计不一致性,建议:
- ✅ 优先使用 Figma 组件库中的预制组件
- ✅ 使用 globals.css 中定义的 CSS 变量
- ✅ 遵循已建立的设计模式
- ❌ 避免创建新的颜色变体
- ❌ 避免硬编码颜色值

---

---

## 7. 间距系统 (Spacing System)

ACF 使用响应式间距系统,为 Desktop 和 Mobile 设备提供不同的间距值,确保在不同屏幕尺寸下的最佳视觉效果。

### 7.1 间距层级 (Spacing Scale)

我们提供 11 个间距档位,从最小的 2px 到最大的 80px (Desktop),适配各种布局需求。

#### Desktop 间距值 (>768px)

```css
--acf-spacing-4xs: 2px   /* 极小间距 - 装饰性间隔 */
--acf-spacing-3xs: 3px   /* 微小间距 - 紧密元素间距 */
--acf-spacing-2xs: 4px   /* 最小间距 - 小图标与文字 */
--acf-spacing-xs:  8px   /* 小间距 - 相关元素组 */
--acf-spacing-s:   12px  /* 标准小间距 - 元素内间距 */
--acf-spacing-m:   16px  /* 中等间距 - 卡片内边距 */
--acf-spacing-l:   20px  /* 大间距 - 卡片外边距 */
--acf-spacing-xl:  24px  /* 超大间距 - 段落间距 */
--acf-spacing-2xl: 36px  /* 特大间距 - 章节间距 */
--acf-spacing-3xl: 48px  /* 巨大间距 - 主要区域分隔 */
--acf-spacing-4xl: 80px  /* 最大间距 - 页面级间距 */
```

#### Mobile 间距值 (≤768px)

在移动设备上,间距值会自动减小以适应较小的屏幕:

```css
--acf-spacing-4xs: 2px   /* 保持不变 */
--acf-spacing-3xs: 3px   /* 保持不变 */
--acf-spacing-2xs: 3px   /* ⬇ 从 4px 减至 3px */
--acf-spacing-xs:  6px   /* ⬇ 从 8px 减至 6px */
--acf-spacing-s:   9px   /* ⬇ 从 12px 减至 9px */
--acf-spacing-m:   12px  /* ⬇ 从 16px 减至 12px */
--acf-spacing-l:   16px  /* ⬇ 从 20px 减至 16px */
--acf-spacing-xl:  16px  /* ⬇ 从 24px 减至 16px */
--acf-spacing-2xl: 26px  /* ⬇ 从 36px 减至 26px */
--acf-spacing-3xl: 34px  /* ⬇ 从 48px 减至 34px */
--acf-spacing-4xl: 56px  /* ⬇ 从 80px 减至 56px */
```

### 7.2 使用场景 (Usage Scenarios)

#### 4xs - 3xs (2-3px): 极小装饰性间距
- **用途**: 装饰线条、分隔符、非常紧密的元素
- **示例**: 
  - 图标与文字间的微调
  - 细线分隔符
  
```css
.icon-with-text {
  gap: var(--acf-spacing-4xs);
}
```

#### 2xs (4px → 3px): 最小间距
- **用途**: 小图标与文字、紧密相关的标签
- **示例**:
  - Badge 内的图标与文字
  - 紧密排列的 chips

```css
.badge {
  gap: var(--acf-spacing-2xs);
}
```

#### xs (8px → 6px): 小间距
- **用途**: 卡片内相关元素、按钮内元素
- **示例**:
  - 卡片标题与副标题
  - 按钮图标与文字
  - 表单字段组

```css
.card-header {
  gap: var(--acf-spacing-xs);
}
```

#### s (12px → 9px): 标准小间距
- **用途**: 卡片内内容区块、列表项间距
- **示例**:
  - 卡片内文本段落
  - 导航菜单项
  - 表单字段

```css
.content-section {
  margin-bottom: var(--acf-spacing-s);
}
```

#### m (16px → 12px): 中等间距
- **用途**: 卡片内边距、容器内边距
- **示例**:
  - 卡片的 padding
  - 模态框内容区
  - 工具栏高度

```css
.card {
  padding: var(--acf-spacing-m);
}
```

#### l (20px → 16px): 大间距
- **用途**: 卡片外边距、主要内容区间距
- **示例**:
  - 卡片之间的间距
  - 页面边距
  - 主要内容区的 padding

```css
.card-container {
  gap: var(--acf-spacing-l);
}
```

#### xl (24px → 16px): 超大间距
- **用途**: 段落间距、内容组间距
- **示例**:
  - 文章段落
  - 功能模块分隔
  - Hero section padding

```css
.article p {
  margin-bottom: var(--acf-spacing-xl);
}
```

#### 2xl (36px → 26px): 特大间距
- **用途**: 章节间距、主要区域分隔
- **示例**:
  - 页面章节之间
  - Feature sections
  - 大标题与内容间距

```css
.section {
  margin-bottom: var(--acf-spacing-2xl);
}
```

#### 3xl (48px → 34px): 巨大间距
- **用途**: 主要页面区域分隔
- **示例**:
  - 页头与主内容
  - 主内容与页脚
  - Landing page sections

```css
.hero-section {
  padding: var(--acf-spacing-3xl) 0;
}
```

#### 4xl (80px → 56px): 最大间距
- **用途**: 页面级大间距、特殊视觉分隔
- **示例**:
  - Landing page 大区域间距
  - 特殊页面的顶部/底部 padding
  - 视觉强调的区域分隔

```css
.landing-hero {
  padding: var(--acf-spacing-4xl) 0;
}
```

### 7.3 响应式最佳实践 (Responsive Best Practices)

#### 自动响应式
间距 tokens 会在 768px 断点自动切换,无需手动编写媒体查询:

```css
/* ✅ 推荐: 使用 token,自动响应式 */
.card {
  padding: var(--acf-spacing-m);  /* Desktop: 16px, Mobile: 12px */
  gap: var(--acf-spacing-l);       /* Desktop: 20px, Mobile: 16px */
}

/* ❌ 不推荐: 硬编码像素值 */
.card {
  padding: 16px;
}
```

#### 需要明确指定平台时
如果设计需要在某些情况下明确使用 desktop 或 mobile 值,可以直接使用带后缀的 token:

```css
/* 总是使用 desktop 值 */
.desktop-only {
  padding: var(--acf-spacing-m-desktop); /* 始终 16px */
}

/* 总是使用 mobile 值 */
.mobile-only {
  padding: var(--acf-spacing-m-mobile); /* 始终 12px */
}
```

### 7.4 常见卡片布局示例 (Common Card Layouts)

#### 基础信息卡片
```
┌─────────────────────────────────────┐
│  [m padding]                        │  ← 16px (Desktop) / 12px (Mobile)
│                                     │
│  Title                              │
│  [xs spacing]                       │  ← 8px (D) / 6px (M)
│  Subtitle                           │
│  [s spacing]                        │  ← 12px (D) / 9px (M)
│  Body content paragraph...          │
│                                     │
│  [m padding]                        │
└─────────────────────────────────────┘
```

```css
.info-card {
  padding: var(--acf-spacing-m);
}

.info-card-title {
  margin-bottom: var(--acf-spacing-xs);
}

.info-card-subtitle {
  margin-bottom: var(--acf-spacing-s);
}
```

#### 复杂交互卡片
```
┌─────────────────────────────────────┐
│  [m padding]                        │
│                                     │
│  Header Title                       │
│  [xs spacing]                       │
│  Tags [2xs] Tag1  [2xs] Tag2        │  ← Tags 之间 4px/3px
│  [l spacing]                        │  ← 主要内容分隔 20px/16px
│  Main content section               │
│  [s spacing]                        │
│  Secondary info                     │
│  [m spacing]                        │
│  [Button]                           │
│                                     │
│  [m padding]                        │
└─────────────────────────────────────┘
```

```css
.complex-card {
  padding: var(--acf-spacing-m);
}

.card-tags {
  display: flex;
  gap: var(--acf-spacing-2xs);
  margin-bottom: var(--acf-spacing-l);
}

.card-secondary {
  margin-top: var(--acf-spacing-s);
  margin-bottom: var(--acf-spacing-m);
}
```

### 7.5 Grid & Flexbox 间距 (Grid & Flexbox Spacing)

#### Flexbox gap
```css
/* 推荐: 使用 gap 属性 */
.flex-container {
  display: flex;
  gap: var(--acf-spacing-m);  /* 自动响应式 16px → 12px */
}
```

#### Grid gap
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--acf-spacing-l);  /* 自动响应式 20px → 16px */
}
```

### 7.6 避免事项 (Don'ts)

❌ **不要硬编码像素值**
```css
/* 错误 */
.card {
  padding: 16px;  /* 不会响应式调整 */
}
```

❌ **不要叠加过多间距**
```css
/* 不推荐 */
.element {
  margin: var(--acf-spacing-2xl);
  padding: var(--acf-spacing-2xl);  /* 太多空白 */
}
```

❌ **不要跳级使用间距**
```css
/* 不推荐: 从 xs 跳到 xl */
.section-1 {
  margin-bottom: var(--acf-spacing-xs);
}
.section-2 {
  margin-bottom: var(--acf-spacing-xl);  /* 视觉不连贯 */
}
```

✅ **推荐渐进式间距**
```css
.small-gap {
  margin-bottom: var(--acf-spacing-xs);
}
.medium-gap {
  margin-bottom: var(--acf-spacing-s);
}
.large-gap {
  margin-bottom: var(--acf-spacing-m);
}
```

---

## 8. 圆角系统 (Border Radius System)

ACF 使用响应式圆角系统,为 Desktop 和 Mobile 设备提供不同的圆角值,确保在不同屏幕尺寸下的最佳视觉比例。

### 8.1 圆角层级 (Border Radius Scale)

我们提供 4 个圆角档位,从小到无限大,适配各种 UI 元素的圆角需求。

#### Desktop 圆角值 (>768px)

```css
--acf-radius-s:        4px    /* 小圆角 - Tags, Small buttons, Icons */
--acf-radius-m:        8px    /* 中圆角 - Buttons, Input fields, Small cards */
--acf-radius-l:        16px   /* 大圆角 - Cards, Containers, Large UI elements */
--acf-radius-infinite: 9999px /* 完全圆角 - Pills, Avatar, Circular buttons */
```

#### Mobile 圆角值 (≤768px)

在移动设备上,圆角值会自动减小以适应较小的屏幕和元素尺寸:

```css
--acf-radius-s:        3px    /* ⬇ 从 4px 减至 3px */
--acf-radius-m:        6px    /* ⬇ 从 8px 减至 6px */
--acf-radius-l:        12px   /* ⬇ 从 16px 减至 12px */
--acf-radius-infinite: 9999px /* 保持不变 */
```

### 8.2 使用场景 (Usage Scenarios)

#### s (4px → 3px): 小圆角
**用途**: 小元素、装饰性圆角

**适用元素**:
- Tags / Badges
- Small buttons (高度 ≤ 32px)
- Tooltips
- Small icons with background
- Code blocks (inline `code`)

**示例**:
```css
.tag {
  border-radius: var(--acf-radius-s);
  padding: 2px 8px;
}

.small-badge {
  border-radius: var(--acf-radius-s);
  font-size: 11px;
}
```

**视觉效果**:
- Desktop: 微妙的圆角,保持紧凑感
- Mobile: 更紧凑,适应小屏幕

---

#### m (8px → 6px): 中圆角
**用途**: 标准 UI 元素

**适用元素**:
- Standard buttons (高度 32-40px)
- Input fields (text input, select, textarea)
- Dropdowns
- Small cards (< 300px width)
- Navigation pills
- Alert boxes

**示例**:
```css
.button {
  border-radius: var(--acf-radius-m);
  padding: 8px 16px;
}

.input-field {
  border-radius: var(--acf-radius-m);
  padding: 12px;
}

.nav-pill {
  border-radius: var(--acf-radius-m);
}
```

**最佳实践**:
```
┌────────────────┐
│  Button Text   │  ← 8px 圆角 (Desktop)
└────────────────┘     6px 圆角 (Mobile)

┌──────────────────────────┐
│ Input field...           │  ← 8px 圆角
└──────────────────────────┘
```

---

#### l (16px → 12px): 大圆角
**用途**: 主要容器和大型元素

**适用元素**:
- Content cards (标准卡片)
- Modals / Dialogs
- Large containers
- Image containers
- Feature sections
- Panel components

**示例**:
```css
.card {
  border-radius: var(--acf-radius-l);
  padding: var(--acf-spacing-m);
}

.modal {
  border-radius: var(--acf-radius-l);
  box-shadow: var(--acf-shadow-xl);
}

.image-container {
  border-radius: var(--acf-radius-l);
  overflow: hidden;
}
```

**卡片示例**:
```
┌─────────────────────────────────┐  ← 16px 圆角 (Desktop)
│                                 │     12px 圆角 (Mobile)
│  Card Title                     │
│  ─────────────                  │
│                                 │
│  Card content goes here with    │
│  some text and information...   │
│                                 │
│  [Button]                       │
│                                 │
└─────────────────────────────────┘
```

**使用场景**:
- Answer cards (主要内容卡片)
- Feature highlights
- Dashboard panels
- Settings sections

---

#### infinite (9999px → 9999px): 完全圆角
**用途**: 圆形或胶囊形元素

**适用元素**:
- Pills / Capsules
- Avatars (circular profile pictures)
- Fully rounded buttons
- Badge indicators
- Status dots
- Loading spinners

**示例**:
```css
/* 胶囊按钮 */
.pill-button {
  border-radius: var(--acf-radius-infinite);
  padding: 8px 20px;
}

/* 圆形头像 */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--acf-radius-infinite);
}

/* Platform Badge (如 Desktop/Mobile 标签) */
.platform-badge {
  border-radius: var(--acf-radius-infinite);
  padding: 8px 16px;
}
```

**视觉效果**:
```
 ┌──────────────┐
 │ Pill Button  │  ← 完全圆角胶囊形
 └──────────────┘

    ╭─────╮
    │  👤 │  ← 圆形头像
    ╰─────╯
```

---

### 8.3 组合使用 (Combining Radius with Other Tokens)

#### 卡片 + 圆角 + 阴影
```css
.elevated-card {
  border-radius: var(--acf-radius-l);
  padding: var(--acf-spacing-m);
  box-shadow: var(--acf-shadow-level-8);
  background: var(--acf-color-back-neutral-primary);
}
```

#### 按钮 + 圆角 + 间距
```css
.primary-button {
  border-radius: var(--acf-radius-m);
  padding: var(--acf-spacing-xs) var(--acf-spacing-m);
  background: var(--acf-color-back-accent-primary);
}
```

#### 输入框 + 圆角 + 描边
```css
.text-input {
  border-radius: var(--acf-radius-m);
  padding: var(--acf-spacing-s);
  border: 1px solid var(--acf-color-stroke-neutral-secondary);
}
```

---

### 8.4 响应式最佳实践 (Responsive Best Practices)

#### 自动响应式
圆角 tokens 会在 768px 断点自动切换,无需手动编写媒体查询:

```css
/* ✅ 推荐: 使用 token,自动响应式 */
.card {
  border-radius: var(--acf-radius-l);  /* Desktop: 16px, Mobile: 12px */
}

.button {
  border-radius: var(--acf-radius-m);  /* Desktop: 8px, Mobile: 6px */
}

/* ❌ 不推荐: 硬编码像素值 */
.card {
  border-radius: 16px;  /* 不会自动适应移动端 */
}
```

#### 需要明确指定平台时
如果设计需要在某些情况下明确使用 desktop 或 mobile 值:

```css
/* 总是使用 desktop 值 */
.desktop-only-card {
  border-radius: var(--acf-radius-l-desktop); /* 始终 16px */
}

/* 总是使用 mobile 值 */
.mobile-only-card {
  border-radius: var(--acf-radius-l-mobile); /* 始终 12px */
}
```

---

### 8.5 圆角与图片 (Border Radius with Images)

#### 图片容器圆角
```css
.image-card {
  border-radius: var(--acf-radius-l);
  overflow: hidden;  /* 重要:裁剪超出圆角的图片 */
}

.image-card img {
  display: block;
  width: 100%;
  height: auto;
}
```

#### 部分圆角 (Partial Radius)
```css
/* 只圆化顶部 */
.card-with-image {
  border-radius: var(--acf-radius-l) var(--acf-radius-l) 0 0;
}

/* 只圆化底部 */
.card-footer {
  border-radius: 0 0 var(--acf-radius-l) var(--acf-radius-l);
}
```

---

### 8.6 常见错误与修正 (Common Mistakes)

#### ❌ 错误: 圆角过大导致元素变形
```css
/* 不推荐 */
.small-button {
  height: 24px;
  border-radius: var(--acf-radius-l);  /* 16px 对 24px 高度过大 */
}
```

#### ✅ 正确: 选择合适的圆角大小
```css
/* 推荐 */
.small-button {
  height: 24px;
  border-radius: var(--acf-radius-s);  /* 4px 更适合小按钮 */
}
```

---

#### ❌ 错误: 忘记设置 overflow
```css
/* 图片会超出圆角 */
.image-container {
  border-radius: var(--acf-radius-l);
}
```

#### ✅ 正确: 添加 overflow: hidden
```css
.image-container {
  border-radius: var(--acf-radius-l);
  overflow: hidden;  /* 裁剪超出部分 */
}
```

---

#### ❌ 错误: 混用不同圆角大小
```css
/* 不协调 */
.container {
  border-radius: var(--acf-radius-l);
}

.container .button {
  border-radius: var(--acf-radius-s);  /* 视觉不协调 */
}
```

#### ✅ 正确: 保持层级一致
```css
/* 协调 */
.container {
  border-radius: var(--acf-radius-l);
}

.container .button {
  border-radius: var(--acf-radius-m);  /* 比容器小一级 */
}
```

---

### 8.7 圆角选择指南 (Radius Selection Guide)

#### 按元素高度选择

| 元素高度 | 推荐圆角 | 示例 |
|---------|---------|------|
| < 24px  | s (4px → 3px) | Tags, badges, small icons |
| 24-40px | m (8px → 6px) | Buttons, inputs, nav items |
| 40-60px | m or l | Large buttons, small cards |
| > 60px  | l (16px → 12px) | Cards, containers, modals |
| Any (pill shape) | infinite | Pills, avatars, capsules |

#### 按元素类型选择

```css
/* 交互元素 */
.button { border-radius: var(--acf-radius-m); }
.input { border-radius: var(--acf-radius-m); }

/* 容器元素 */
.card { border-radius: var(--acf-radius-l); }
.modal { border-radius: var(--acf-radius-l); }

/* 装饰元素 */
.tag { border-radius: var(--acf-radius-s); }
.badge { border-radius: var(--acf-radius-s); }

/* 特殊形状 */
.pill { border-radius: var(--acf-radius-infinite); }
.avatar { border-radius: var(--acf-radius-infinite); }
```

---

### 8.8 Legacy Aliases (向后兼容)

为保持向后兼容,提供以下别名:

```css
--acf-radius-sm:   等同于 --acf-radius-s
--acf-radius-md:   等同于 --acf-radius-m
--acf-radius-lg:   等同于 --acf-radius-l
--acf-radius-xl:   等同于 --acf-radius-l
--acf-radius-full: 等同于 --acf-radius-infinite
```

**推荐使用新的命名系统** (s, m, l, infinite) 以保持一致性。

---

## 9. 阴影与层级系统 (Shadow & Elevation System)

阴影系统用于创建视觉层次、表达交互状态、引导用户注意力。Answer Card Framework 提供 7 个精心设计的 elevation tokens,涵盖从静态卡片到高强度强调的所有场景。

---

### 9.1 Elevation Token 规范

#### 标准 Elevation Tokens (通用于所有平台)

| Token Name | CSS Value | 视觉描述 | 典型用途 |
|-----------|-----------|---------|---------|
| `--acf-elevation-0` | `0 0 0 1px rgba(0,0,0,0.05)` | 最轻描边,无阴影 | 默认卡片状态、平面元素 |
| `--acf-elevation-1` | `0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px 1px rgba(0,0,0,0.14)` | 轻微悬浮感 | 轻量 hover、浅层对话框 |
| `--acf-elevation-2` | `0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px 1px rgba(0,0,0,0.18)` | 标准悬浮感 | 默认 hover、卡片悬停 |
| `--acf-elevation-3` | `0 0 0 1px rgba(0,0,0,0.05), 0 4px 12px 1px rgba(0,0,0,0.14)` | 明显悬浮感 | Active/Focused 状态、浮层 |
| `--acf-elevation-4` | `-5px 4px 12px 0 rgba(0,0,0,0.1)` | 左侧方向阴影 | 特殊装饰、侧边强调 |

#### 强化 Elevation Tokens (Strong Variants)

| Token Name | CSS Value | 视觉描述 | 典型用途 |
|-----------|-----------|---------|---------|
| `--acf-elevation-strong-1` | `0 0 0 1px rgba(0,0,0,0.1)` | 加重描边,无阴影 | 高对比度分隔、重点框选 |
| `--acf-elevation-strong-2` | `0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px 1px rgba(0,0,0,0.16)` | 加重悬浮感 | 高优先级卡片、CTA 区域 |

> **注意:** Elevation tokens 在 Desktop 和 Mobile 上保持相同值,无需响应式变化。

---

### 9.2 使用场景详解

#### Elevation-0: 默认静态状态

**使用时机:**
- 卡片默认状态 (未交互)
- 需要轻微边界但不需要深度的元素
- 嵌入式卡片 (embedded cards)

**示例:**

```css
/* 基础信息卡片 - 静态展示 */
.info-card {
  background: var(--acf-back-neutral-1);
  border-radius: var(--acf-radius-l);
  box-shadow: var(--acf-elevation-0);
  padding: var(--acf-spacing-l);
}

/* 列表项 - 平铺布局 */
.list-item {
  background: var(--acf-back-neutral-0);
  box-shadow: var(--acf-elevation-0);
  padding: var(--acf-spacing-m);
}
```

**视觉效果:**
- 极轻的边界线
- 无明显阴影
- 适合密集布局

---

#### Elevation-1: 轻量悬浮

**使用时机:**
- 轻微 hover 状态
- 次要层级的浮层 (tooltips, popovers)
- 需要微妙深度提示的元素

**示例:**

```css
/* 卡片轻量 hover */
.subtle-card {
  box-shadow: var(--acf-elevation-0);
  transition: box-shadow 0.2s ease;
}

.subtle-card:hover {
  box-shadow: var(--acf-elevation-1);
}

/* 工具提示 */
.tooltip {
  background: var(--acf-back-neutral-1);
  box-shadow: var(--acf-elevation-1);
  border-radius: var(--acf-radius-m);
  padding: var(--acf-spacing-xs) var(--acf-spacing-s);
}
```

**视觉效果:**
- 轻微抬升感
- 适合非主要交互
- 不会过度吸引注意力

---

#### Elevation-2: 标准悬浮 (推荐 Hover 默认)

**使用时机:**
- 卡片标准 hover 状态 **(最常用)**
- 可点击元素的默认悬停反馈
- 中等层级的模态框、对话框

**示例:**

```css
/* 标准可交互卡片 */
.interactive-card {
  box-shadow: var(--acf-elevation-0);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.interactive-card:hover {
  box-shadow: var(--acf-elevation-2);
  transform: translateY(-2px);  /* 配合轻微位移 */
}

/* 下拉菜单 */
.dropdown-menu {
  background: var(--acf-back-neutral-0);
  border-radius: var(--acf-radius-m);
  box-shadow: var(--acf-elevation-2);
  padding: var(--acf-spacing-xs) 0;
}
```

**视觉效果:**
- 明显但不夸张的悬浮感
- 清晰的交互反馈
- **这是 hover 状态的默认推荐**

---

#### Elevation-3: 强调悬浮

**使用时机:**
- Active/Focused 状态
- 主要模态框、重要对话框
- 需要最高层级的浮层 (如表单验证弹窗)

**示例:**

```css
/* 按钮 active 状态 */
.primary-button {
  box-shadow: var(--acf-elevation-2);
  transition: box-shadow 0.15s ease;
}

.primary-button:active {
  box-shadow: var(--acf-elevation-3);
  transform: translateY(0);  /* 取消位移,表示"按下" */
}

/* 重要模态框 */
.important-modal {
  background: var(--acf-back-neutral-0);
  border-radius: var(--acf-radius-l);
  box-shadow: var(--acf-elevation-3);
  padding: var(--acf-spacing-2xl);
}

/* 聚焦输入框 */
.input-field:focus {
  outline: none;
  box-shadow: var(--acf-elevation-3);
  border-color: var(--acf-stroke-accent-default);
}
```

**视觉效果:**
- 最强烈的标准悬浮感
- 明确的"高于其他元素"信号
- 适合关键交互时刻

---

#### Elevation-4: 方向性阴影 (特殊用途)

**使用时机:**
- 侧边栏、侧边面板
- 需要方向性深度提示的元素
- 装饰性强调 (如时间线左侧阴影)

**示例:**

```css
/* 固定侧边栏 */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: var(--acf-back-neutral-0);
  box-shadow: var(--acf-elevation-4);  /* 向右投射阴影 */
  padding: var(--acf-spacing-l);
}

/* 时间线装饰 */
.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--acf-fill-accent-default);
  box-shadow: var(--acf-elevation-4);
}
```

**注意事项:**
- 阴影向 **左侧** 投射 (`-5px` X offset)
- 通常用于元素的右侧,使阴影出现在左边
- 不适合通用 hover 状态

---

#### Elevation-Strong-1: 强化边界

**使用时机:**
- 需要高对比度分隔的元素
- 选中状态的边框强调
- 深色背景上的元素分隔

**示例:**

```css
/* 选中卡片 */
.card.selected {
  box-shadow: var(--acf-elevation-strong-1);
  border-color: var(--acf-stroke-accent-default);
}

/* 高对比度容器 */
.high-contrast-container {
  background: var(--acf-back-neutral-2);
  box-shadow: var(--acf-elevation-strong-1);
  border-radius: var(--acf-radius-m);
}

/* 输入框错误状态 */
.input-field.error {
  box-shadow: var(--acf-elevation-strong-1);
  border-color: var(--acf-fore-error);
}
```

**视觉效果:**
- 更深的描边 (0.1 vs 0.05 opacity)
- 无阴影,纯边界强调
- 适合需要明确分隔的场景

---

#### Elevation-Strong-2: 强化悬浮

**使用时机:**
- 高优先级卡片 (如 featured cards)
- CTA (Call-to-Action) 区域
- 需要强烈视觉吸引的元素

**示例:**

```css
/* Featured 卡片 */
.featured-card {
  background: var(--acf-back-accent-default);
  color: var(--acf-fore-on-accent-alt-default);
  box-shadow: var(--acf-elevation-strong-2);
  border-radius: var(--acf-radius-l);
  padding: var(--acf-spacing-xl);
}

/* CTA 按钮容器 */
.cta-container {
  background: var(--acf-back-neutral-0);
  box-shadow: var(--acf-elevation-strong-2);
  border-radius: var(--acf-radius-l);
  padding: var(--acf-spacing-l);
}

/* 高优先级通知卡片 */
.priority-notification {
  background: var(--acf-back-neutral-1);
  box-shadow: var(--acf-elevation-strong-2);
  border-left: 4px solid var(--acf-fill-accent-default);
  padding: var(--acf-spacing-m) var(--acf-spacing-l);
}
```

**视觉效果:**
- 比标准 elevation-2 更强的阴影
- 更深的边界 + 更浓的投影
- **用于需要立即吸引注意力的元素**

---

### 9.3 交互状态的 Elevation 组合 (Recommended Patterns)

#### 标准卡片交互流程

```css
.card {
  /* Rest 状态 */
  box-shadow: var(--acf-elevation-0);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  /* Hover 状态 */
  box-shadow: var(--acf-elevation-2);
  transform: translateY(-2px);
}

.card:active {
  /* Active 状态 */
  box-shadow: var(--acf-elevation-3);
  transform: translateY(0);
}

.card:focus-visible {
  /* Focus 状态 */
  box-shadow: var(--acf-elevation-3);
  outline: 2px solid var(--acf-stroke-accent-default);
  outline-offset: 2px;
}
```

**状态流转:**
```
Rest (elevation-0)
  ↓ hover
Hover (elevation-2 + translateY)
  ↓ click
Active (elevation-3, no translate)
  ↓ release
Hover (elevation-2 + translateY)
  ↓ mouse leave
Rest (elevation-0)
```

---

#### 高优先级卡片交互

```css
.featured-card {
  /* Rest 已经使用 strong 变体 */
  box-shadow: var(--acf-elevation-strong-2);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.featured-card:hover {
  /* Hover 升级到 elevation-3 */
  box-shadow: var(--acf-elevation-3);
  transform: translateY(-3px);  /* 更大位移 */
}

.featured-card:active {
  /* Active 保持 elevation-3 但取消位移 */
  box-shadow: var(--acf-elevation-3);
  transform: translateY(0);
}
```

---

#### 按钮交互 (扁平到悬浮)

```css
.button {
  /* Rest: 无阴影 */
  box-shadow: none;
  background: var(--acf-fill-accent-default);
  transition: all 0.2s ease;
}

.button:hover {
  /* Hover: 添加轻微阴影 */
  box-shadow: var(--acf-elevation-1);
  background: var(--acf-fill-accent-hover);
}

.button:active {
  /* Active: 增强阴影 */
  box-shadow: var(--acf-elevation-2);
  transform: scale(0.98);
}
```

---

### 9.4 Elevation 与其他 Tokens 的组合

#### 与 Border Radius 组合

```css
/* 小元素: 小圆角 + 轻阴影 */
.tag {
  border-radius: var(--acf-radius-s);
  box-shadow: var(--acf-elevation-0);
  padding: var(--acf-spacing-3xs) var(--acf-spacing-xs);
}

/* 中等元素: 中圆角 + 标准阴影 */
.button {
  border-radius: var(--acf-radius-m);
  box-shadow: var(--acf-elevation-1);
  padding: var(--acf-spacing-s) var(--acf-spacing-m);
}

/* 大元素: 大圆角 + 强阴影 */
.card {
  border-radius: var(--acf-radius-l);
  box-shadow: var(--acf-elevation-2);
  padding: var(--acf-spacing-l) var(--acf-spacing-xl);
}
```

**原则:** 元素越大,圆角和阴影通常都应更大。

---

#### 与 Spacing 组合

```css
/* 密集布局: 最小间距 + 最轻阴影 */
.compact-list .item {
  margin-bottom: var(--acf-spacing-xs);
  box-shadow: var(--acf-elevation-0);
}

/* 标准布局: 中等间距 + 标准阴影 */
.card-grid .card {
  margin: var(--acf-spacing-m);
  box-shadow: var(--acf-elevation-1);
}

/* 宽松布局: 大间距 + 强阴影 */
.featured-section .card {
  margin: var(--acf-spacing-2xl);
  box-shadow: var(--acf-elevation-strong-2);
}
```

**原则:** 阴影越强,周围留白应越多,避免视觉拥挤。

---

#### 与 Color 组合

```css
/* 浅色背景 + 标准阴影 */
.light-card {
  background: var(--acf-back-neutral-0);
  box-shadow: var(--acf-elevation-2);
}

/* 深色背景 + 强阴影 */
.dark-card {
  background: var(--acf-back-neutral-3);
  box-shadow: var(--acf-elevation-strong-2);
  color: var(--acf-fore-neutral-reverse);
}

/* 彩色背景 + 轻阴影 (避免过重) */
.accent-card {
  background: var(--acf-back-accent-default);
  color: var(--acf-fore-on-accent-alt-default);
  box-shadow: var(--acf-elevation-1);  /* 不要用 strong,会过度强调 */
}
```

**原则:** 
- 深色/彩色背景可使用 strong 变体增强对比
- 浅色背景使用标准 elevation 即可
- 彩色卡片避免过强阴影,色彩本身已足够吸引注意

---

### 9.5 常见错误与修正

#### ❌ 错误 1: 滥用 elevation-3

```css
/* 不推荐: 所有卡片默认都用 elevation-3 */
.card {
  box-shadow: var(--acf-elevation-3);  /* 太重! */
}
```

**修正:**

```css
/* ✅ 推荐: Rest 用 0, Hover 用 2, Active 用 3 */
.card {
  box-shadow: var(--acf-elevation-0);
}

.card:hover {
  box-shadow: var(--acf-elevation-2);
}

.card:active {
  box-shadow: var(--acf-elevation-3);
}
```

---

#### ❌ 错误 2: 忽略 transition

```css
/* 不推荐: 阴影变化太突兀 */
.card:hover {
  box-shadow: var(--acf-elevation-2);  /* 无过渡动画 */
}
```

**修正:**

```css
/* ✅ 推荐: 添加平滑过渡 */
.card {
  box-shadow: var(--acf-elevation-0);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: var(--acf-elevation-2);
}
```

---

#### ❌ 错误 3: 深色背景使用标准 elevation

```css
/* 不推荐: 深色背景阴影不明显 */
.dark-card {
  background: var(--acf-back-neutral-3);
  box-shadow: var(--acf-elevation-1);  /* 几乎看不见 */
}
```

**修正:**

```css
/* ✅ 推荐: 深色背景使用 strong 或增加 border */
.dark-card {
  background: var(--acf-back-neutral-3);
  box-shadow: var(--acf-elevation-strong-2);
  /* 或添加浅色描边 */
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

#### ❌ 错误 4: elevation-4 用于通用 hover

```css
/* 不推荐: elevation-4 方向性不适合常规 hover */
.card:hover {
  box-shadow: var(--acf-elevation-4);  /* 阴影方向错误 */
}
```

**修正:**

```css
/* ✅ 推荐: elevation-4 仅用于侧边元素 */
.sidebar {
  box-shadow: var(--acf-elevation-4);  /* 侧边栏适用 */
}

.card:hover {
  box-shadow: var(--acf-elevation-2);  /* 通用 hover 用 2 */
}
```

---

#### ❌ 错误 5: 混用自定义阴影值

```css
/* 不推荐: 硬编码阴影值 */
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* 不一致! */
}
```

**修正:**

```css
/* ✅ 推荐: 始终使用 elevation tokens */
.card {
  box-shadow: var(--acf-elevation-2);
}
```

---

### 9.6 Elevation 选择决策树

```
需要阴影吗?
├─ No → 使用 background/border 分隔
└─ Yes
   │
   ├─ 元素是否可交互?
   │  ├─ No (静态展示)
   │  │  ├─ 需要轻微边界? → elevation-0
   │  │  ├─ 需要突出显示? → elevation-strong-2
   │  │  └─ 侧边栏/面板? → elevation-4
   │  │
   │  └─ Yes (可交互)
   │     │
   │     ├─ Rest 状态
   │     │  ├─ 标准元素 → elevation-0
   │     │  └─ 高优先级 → elevation-strong-1 或 elevation-strong-2
   │     │
   │     ├─ Hover 状态
   │     │  ├─ 轻量交互 (如 tooltip) → elevation-1
   │     │  ├─ 标准交互 (推荐) → elevation-2
   │     │  └─ 从 strong 出发 → elevation-3
   │     │
   │     └─ Active/Focus 状态
   │        └─ elevation-3
   │
   └─ 背景颜色?
      ├─ 浅色背景 → 使用标准 elevation
      └─ 深色背景 → 使用 elevation-strong 或添加浅色边框
```

---

### 9.7 实际案例组合

#### 案例 1: 标准文章卡片

```css
.article-card {
  /* 结构 */
  background: var(--acf-back-neutral-0);
  border-radius: var(--acf-radius-l);
  padding: var(--acf-spacing-l);
  
  /* 阴影与交互 */
  box-shadow: var(--acf-elevation-0);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.article-card:hover {
  box-shadow: var(--acf-elevation-2);
  transform: translateY(-4px);
}

.article-card:active {
  box-shadow: var(--acf-elevation-3);
  transform: translateY(-2px);
}
```

**效果:** 清晰的三级交互反馈 (rest → hover → active)

---

#### 案例 2: Featured Banner

```css
.featured-banner {
  /* 结构 */
  background: linear-gradient(
    135deg, 
    var(--acf-back-accent-default), 
    var(--acf-back-accent-hover)
  );
  color: var(--acf-fore-on-accent-alt-default);
  border-radius: var(--acf-radius-l);
  padding: var(--acf-spacing-2xl) var(--acf-spacing-xl);
  
  /* 强阴影强调 */
  box-shadow: var(--acf-elevation-strong-2);
  
  /* 周围留白 */
  margin: var(--acf-spacing-2xl) 0;
}
```

**效果:** 高视觉优先级,立即吸引注意力

---

#### 案例 3: 侧边导航面板

```css
.side-nav {
  /* 结构 */
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  background: var(--acf-back-neutral-0);
  padding: var(--acf-spacing-l) var(--acf-spacing-m);
  
  /* 方向性阴影 */
  box-shadow: var(--acf-elevation-4);
  
  /* Z-index 确保在内容之上 */
  z-index: 100;
}
```

**效果:** 向右侧投射阴影,清晰的层级关系

---

#### 案例 4: 输入框状态管理

```css
.input-field {
  /* 基础样式 */
  border: 1px solid var(--acf-stroke-neutral-rest);
  border-radius: var(--acf-radius-m);
  padding: var(--acf-spacing-s) var(--acf-spacing-m);
  
  /* 默认无阴影 */
  box-shadow: none;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.input-field:focus {
  /* Focus: 强边框 + 阴影 */
  outline: none;
  border-color: var(--acf-stroke-accent-default);
  box-shadow: var(--acf-elevation-3);
}

.input-field.error {
  /* Error: 强边框,不同颜色 */
  border-color: var(--acf-fore-error);
  box-shadow: var(--acf-elevation-strong-1);
}
```

**效果:** 清晰的表单状态反馈

---

### 9.8 性能优化建议

#### 使用 `will-change` (谨慎)

```css
/* 频繁交互的元素 */
.frequently-hovered-card {
  will-change: box-shadow, transform;
}

/* 交互完成后移除 */
.frequently-hovered-card:hover {
  /* 提示浏览器优化这些属性 */
}
```

**注意:** 不要在所有元素上使用,会消耗内存。

---

#### 避免复杂阴影叠加

```css
/* ❌ 不推荐: 多层自定义阴影 */
.card {
  box-shadow: 
    0 0 0 1px rgba(0,0,0,0.05),
    0 2px 4px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.15),
    0 8px 16px rgba(0,0,0,0.2);  /* 渲染成本高 */
}

/* ✅ 推荐: 使用单一 elevation token */
.card {
  box-shadow: var(--acf-elevation-2);  /* 已优化 */
}
```

---

### 9.9 快速参考表

| 场景 | 推荐 Elevation | 示例元素 |
|------|---------------|---------|
| 静态卡片 (默认) | `elevation-0` | Info cards, list items |
| 卡片 Hover (标准) | `elevation-2` | Article cards, product cards |
| 卡片 Active/Focus | `elevation-3` | Clicked buttons, focused inputs |
| 浮层/对话框 | `elevation-2` or `elevation-3` | Dropdowns, modals, tooltips |
| 侧边栏/面板 | `elevation-4` | Navigation drawers |
| 高优先级元素 | `elevation-strong-2` | Featured cards, CTA sections |
| 选中/错误状态 | `elevation-strong-1` | Selected items, error inputs |

---

### 9.10 Legacy Shadows (向后兼容)

```css
/* 已弃用,仅用于向后兼容 */
--acf-shadow-sm   /* 请使用 elevation-0 或 elevation-1 */
--acf-shadow-md   /* 请使用 elevation-2 */
--acf-shadow-lg   /* 请使用 elevation-3 */
--acf-shadow-xl   /* 请使用 elevation-3 */
```

**强烈推荐使用新的 `elevation-*` 系统**,以保持设计一致性和语义清晰度。

---


## 10. 可访问性检查清单

设计时务必确保:

- [ ] 主题化文本使用 `fore-on-accent-alt-*` 而非 `fill-accent-*`
- [ ] 文字与背景对比度符合 WCAG AA 标准 (最低 4.5:1)
- [ ] 可点击元素有明确的 hover/focus 状态
- [ ] 重要信息不仅仅依赖颜色传达
- [ ] 触摸目标至少 44×44px

---

## 11. 实用技巧

### 快速参考

**最常用的颜色组合:**

1. **白底卡片 + 黑字:**
   ```
   background: var(--acf-color-back-neutral-primary)
   color: var(--acf-color-fore-neutral-primary)
   ```

2. **主题色卡片 + 黑字:**
   ```
   background: var(--acf-color-back-accent-primary)
   color: var(--acf-color-fore-neutral-secondary)
   ```

3. **主题色高亮文字:**
   ```
   color: var(--acf-color-fore-on-accent-alt-primary)
   ```

### 调试技巧

如果颜色看起来不对:
1. 检查是否使用了正确的 token 前缀 (`--acf-color-`)
2. 确认是否使用了 `fore-on-accent-alt-*` 而非 `fill-accent-*` 用于文字
3. 检查是否为交互元素提供了所有三个状态 (primary/secondary/tertiary)

---

## Icon 使用指南

### 概述

ACF 设计系统遵循 MAI 规范，**严格使用 Fluent UI Icons**。图标是界面中重要的视觉元素，用于表达概念、对象或操作，必须具有功能性且易于理解。

### 🚨 重要规则

#### ✅ 必须使用

1. **仅使用 Fluent UI Icons**
   - 从 `@fluentui/svg-icons` 或 `@fluentui/react-icons` 导入
   - 使用官方发布的图标路径，不得修改

2. **单色设计**
   - 使用 `currentColor` 继承文字颜色
   - 或使用 CSS 变量实现主题适配
   - 支持明暗模式自动切换

3. **标准尺寸**
   - 仅使用：**16px, 20px, 24px, 28px, 32px, 48px**
   - 遵循 4px 基准网格系统

4. **官方路径**
   - 提取 FluentUI 源文件中的精确 `d` 属性
   - 保持路径数据完整性，不做任何修改

#### ❌ 禁止使用

1. **Emoji** - 🎯, 🏠, 👤, ⚙️, 📱, 🎬, 🛒, ❤️, ⭐, 🔧
2. **非 FluentUI 图标库** - Material Icons, FontAwesome, 自定义图标
3. **品牌色图标** - 系统 UI 中不使用特定品牌颜色
4. **自定义 SVG 路径** - 手写或近似的路径数据
5. **修改过的路径** - 更改坐标、形状的 FluentUI 图标

### 图标尺寸规范

| 尺寸 | 使用场景 | Token |
|------|---------|-------|
| 16px | 小型图标、内联文本图标 | `--acf-icon-size-16` |
| 20px | 标准控件图标、按钮图标 | `--acf-icon-size-20` |
| 24px | 大型按钮、卡片图标 | `--acf-icon-size-24` |
| 28px | 突出图标 | `--acf-icon-size-28` |
| 32px | 特大图标 | `--acf-icon-size-32` |
| 48px | 最大图标（慎用） | `--acf-icon-size-48` |

### 使用方式

#### 方式 1: 内联 SVG（推荐）

使用官方 FluentUI 路径创建内联 SVG：

```html
<!-- 20px Regular Heart Icon -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="m10.5 16.8 6.24-6.3a4.4 4.4 0 0 0-.02-6.19 4.32 4.32 0 0 0-6.16.02L10 4.87l-.56-.54a4.32 4.32 0 0 0-6.16-.02 4.4 4.4 0 0 0-.02 6.2l6.24 6.29Zm5.54-11.5c.88.88.88 2.32.01 3.2l-6.05 6.1-6.05-6.1a2.4 2.4 0 0 1 .01-3.38 2.32 2.32 0 0 1 3.3.02l1.1 1.06a.5.5 0 0 0 .7 0l1.1-1.06a2.32 2.32 0 0 1 3.3-.02l-.01.01Z"/>
</svg>

<!-- 使用 CSS 变量控制颜色 -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="var(--acf-color-icon-primary)" xmlns="http://www.w3.org/2000/svg">
  <path d="m10.5 16.8 6.24-6.3a4.4 4.4 0 0 0-.02-6.19..."/>
</svg>
```

#### 方式 2: CSS 背景图（小图标）

对于重复使用的小图标：

```css
.icon-search {
  width: 20px;
  height: 20px;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="..."/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
}
```

#### 方式 3: 图标组件（React/Vue）

```jsx
// React 示例
import { HeartRegular, SearchRegular, HomeRegular } from '@fluentui/react-icons';

function MyComponent() {
  return (
    <div>
      <HeartRegular className="icon-20" />
      <SearchRegular className="icon-24" />
      <HomeRegular className="icon-16" />
    </div>
  );
}
```

### 获取 FluentUI 图标路径

#### 方法 1: 从 NPM 包提取

```bash
# 1. 安装 FluentUI Icons
npm install @fluentui/svg-icons

# 2. 查找需要的图标
ls node_modules/@fluentui/svg-icons/icons/ | grep "heart_20"

# 3. 查看图标内容
cat node_modules/@fluentui/svg-icons/icons/heart_20_regular.svg

# 4. 复制 <path d="..."/> 中的 d 属性值
```

#### 方法 2: 在线查找

访问 [Fluent UI Icons 官网](https://react.fluentui.dev/?path=/docs/icons-catalog--page)
1. 搜索需要的图标
2. 选择尺寸（16/20/24/28/32/48）
3. 选择样式（Regular/Filled）
4. 复制 SVG 代码

### 图标颜色 Token

使用专门的图标颜色 Token 确保主题一致性：

| Token | 用途 | 示例 |
|-------|------|------|
| `--acf-color-icon-primary` | 主要图标颜色 | 导航图标、重要操作 |
| `--acf-color-icon-secondary` | 次要图标颜色 | 辅助信息图标 |
| `--acf-color-icon-disabled` | 禁用图标颜色 | 不可用状态 |
| `--acf-color-icon-on-accent` | 强调色背景上的图标 | 按钮内图标 |
| `--acf-color-icon-on-image` | 图片上的图标 | 带半透明背景 |

```css
/* 示例用法 */
.icon-primary {
  color: var(--acf-color-icon-primary, #272320);
}

.icon-secondary {
  color: var(--acf-color-icon-secondary, rgba(0,0,0,0.6));
}

.icon-disabled {
  color: var(--acf-color-icon-disabled, rgba(0,0,0,0.3));
  cursor: not-allowed;
}
```

### 图标与文字配对

图标与文字组合时需要注意对齐和间距：

```html
<!-- ✅ 推荐：图标与文字垂直居中对齐 -->
<button class="button-with-icon">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="..."/>
  </svg>
  <span>搜索</span>
</button>

<style>
.button-with-icon {
  display: inline-flex;
  align-items: center;
  gap: var(--acf-spacing-2, 8px); /* 图标与文字间距 */
}

.button-with-icon svg {
  flex-shrink: 0; /* 防止图标被压缩 */
}
</style>
```

### 常用图标参考

| 功能 | Regular (20px) | Filled (20px) |
|------|---------------|---------------|
| 搜索 | `search_20_regular` | `search_20_filled` |
| 首页 | `home_20_regular` | `home_20_filled` |
| 设置 | `settings_20_regular` | `settings_20_filled` |
| 用户 | `person_20_regular` | `person_20_filled` |
| 喜欢 | `heart_20_regular` | `heart_20_filled` |
| 分享 | `share_20_regular` | `share_20_filled` |
| 删除 | `delete_20_regular` | `delete_20_filled` |
| 编辑 | `edit_20_regular` | `edit_20_filled` |
| 添加 | `add_20_regular` | `add_20_filled` |
| 关闭 | `dismiss_20_regular` | `dismiss_20_filled` |
| 菜单 | `navigation_20_regular` | `navigation_20_filled` |
| 更多 | `more_horizontal_20_regular` | `more_horizontal_20_filled` |

### 图标样式变体

FluentUI 提供两种主要样式：

#### Regular（常规）
- 线条设计，更轻盈
- 适用于大部分界面
- 默认推荐使用

#### Filled（填充）
- 实心设计，更醒目
- 用于：
  - 选中/激活状态
  - 需要强调的操作
  - 品牌标识区域

```html
<!-- Regular 用于默认状态 -->
<svg class="icon-heart-regular">
  <path d="m10.5 16.8 6.24-6.3a4.4..."/>
</svg>

<!-- Filled 用于选中状态 -->
<svg class="icon-heart-filled">
  <path d="M9.53 2.7a4.32 4.32 0 0 1 6.15..."/>
</svg>
```

### 最佳实践

#### ✅ 推荐做法

1. **使用 currentColor 继承颜色**
   ```html
   <svg fill="currentColor">...</svg>
   ```

2. **为图标添加语义化描述**
   ```html
   <svg aria-label="搜索" role="img">...</svg>
   <!-- 或使用 title -->
   <svg><title>搜索</title><path d="..."/></svg>
   ```

3. **装饰性图标使用 aria-hidden**
   ```html
   <button>
     <svg aria-hidden="true">...</svg>
     <span>搜索</span>
   </button>
   ```

4. **保持图标简洁清晰**
   - 避免过于复杂的图标
   - 在小尺寸下保持可识别性

5. **统一使用 Regular 或 Filled**
   - 在同一界面区域保持风格一致
   - 仅在状态变化时切换样式

#### ❌ 避免做法

1. **不要混用不同图标库**
   ```html
   <!-- ❌ 错误 -->
   <i class="fa fa-heart"></i>  <!-- FontAwesome -->
   <svg><!-- Fluent UI --></svg>
   ```

2. **不要缩放非标准尺寸**
   ```css
   /* ❌ 错误 */
   svg { width: 22px; height: 22px; }
   
   /* ✅ 正确 */
   svg { width: 24px; height: 24px; }
   ```

3. **不要使用 Emoji 代替图标**
   ```html
   <!-- ❌ 错误 -->
   <span>🔍</span>
   
   <!-- ✅ 正确 -->
   <svg><!-- Fluent UI Search Icon --></svg>
   ```

4. **不要修改官方路径数据**
   ```html
   <!-- ❌ 错误：修改了路径 -->
   <path d="M10 5L15 10..."/> <!-- 自己写的 -->
   
   <!-- ✅ 正确：使用官方路径 -->
   <path d="m10.5 16.8 6.24-6.3a4.4..."/> <!-- 来自 FluentUI -->
   ```

### 响应式图标

在不同断点使用不同尺寸：

```css
.responsive-icon {
  width: 20px;
  height: 20px;
}

@media (min-width: 768px) {
  .responsive-icon {
    width: 24px;
    height: 24px;
  }
}

@media (min-width: 1024px) {
  .responsive-icon {
    width: 28px;
    height: 28px;
  }
}
```

### 图标动画

简单的交互动画提升用户体验：

```css
.icon-interactive {
  transition: transform 0.2s ease, color 0.2s ease;
}

.icon-interactive:hover {
  transform: scale(1.1);
  color: var(--acf-color-icon-primary-hover);
}

.icon-interactive:active {
  transform: scale(0.95);
}

/* 旋转动画（如加载图标） */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon-loading {
  animation: rotate 1s linear infinite;
}
```

### 可访问性

1. **为独立图标添加描述**
   ```html
   <button aria-label="搜索">
     <svg aria-hidden="true">...</svg>
   </button>
   ```

2. **图标按钮要有足够的点击区域**
   ```css
   .icon-button {
     min-width: 44px;
     min-height: 44px;
     display: flex;
     align-items: center;
     justify-content: center;
   }
   ```

3. **确保图标与背景有足够对比度**
   - 普通图标：至少 3:1
   - 交互图标：至少 4.5:1

### 性能优化

1. **重复使用的图标可以使用 CSS Sprite 或 Symbol**
   ```html
   <svg style="display: none;">
     <symbol id="icon-search" viewBox="0 0 20 20">
       <path d="..."/>
     </symbol>
     <symbol id="icon-heart" viewBox="0 0 20 20">
       <path d="..."/>
     </symbol>
   </svg>
   
   <!-- 使用 -->
   <svg width="20" height="20">
     <use href="#icon-search"/>
   </svg>
   ```

2. **小图标使用 Data URI**
   ```css
   .icon {
     background-image: url('data:image/svg+xml,...');
   }
   ```

### 调试检查清单

图标显示异常时检查：

- [ ] 是否使用了官方 FluentUI 图标？
- [ ] viewBox 是否正确（`0 0 20 20`）？
- [ ] 尺寸是否为标准值（16/20/24/28/32/48px）？
- [ ] 是否使用了 `currentColor` 或正确的颜色 Token？
- [ ] 路径数据是否完整无修改？
- [ ] 是否为 SVG 添加了 `xmlns="http://www.w3.org/2000/svg"`？
- [ ] 图标是否有足够的对比度？
- [ ] 是否添加了无障碍属性（aria-label/aria-hidden）？

### Figma 到 CSS 映射

| Figma 属性 | CSS 实现 |
|-----------|---------|
| Icon Size: 20 | `width: 20px; height: 20px;` |
| Icon Color | `fill: currentColor;` 或 `fill: var(--acf-color-icon-primary);` |
| Icon Style: Regular | 使用 `_regular` 版本 |
| Icon Style: Filled | 使用 `_filled` 版本 |

---

## 总结

遵循这些指南将帮助你:
- ✅ 创建视觉一致的卡片设计
- ✅ 确保可访问性要求
- ✅ 加快设计和开发速度
- ✅ 减少设计偏差和维护成本

如有疑问,请参考 Figma 设计库中的实际示例,或查阅 `globals.css` 中的完整 token 定义。

---

### Card

Card 是一个灵活的单容器外壳，用于显示单个内容实例。它是搜索结果页面上答案的默认布局，支持广泛的用例——从简单的文本答案到丰富的结构化内容。

**版本**：2025-01-10  
**状态**：设计未完成 🚧 | 开发未完成 🚧

#### 组件定义

Card 是一个独立且内聚的内容分组，以单一、独特的单元形式呈现。它作为多种内容类型和功能的基础容器，提供结构和组织。

#### 何时使用

- 需要将相关内容组合在一起以组织信息时
- 需要创建视觉重点或将内容与其他内容分离时
- 展示一个完整的答案或信息单元时
- 需要可交互的内容容器时（如可点击的卡片）

#### 何时不使用

- 简单的列表项不需要额外的视觉分组
- 内容不需要与周围环境区分
- 页面需要保持简洁，不需要额外的容器

---

#### 属性总览

Card 组件提供以下可配置属性：

| 属性 | 选项 | 说明 |
|------|------|------|
| **Padding** | `4 edges`（默认）、`Top & bottom`、`None` | 根据内容类型设置卡片内的内边距 |
| **Theme** | `True`（默认）、`False` | 是否使用 ACF 颜色主题 |
| **Size** | `Column`、`Row`、`CustomCol`、`CustomRow` | 确定网格中卡片的高度和宽度。CustomCol 和 CustomRow 用于具有灵活高度和宽度的内容 |
| **Corner Radius** | `All rounded`（默认）、`Top rounded`、`Bottom rounded`、`Left rounded`、`Right rounded`、多种组合 | 控制卡片的圆角样式（注意：这是遗留属性，用于组装细分卡片） |
| **Styling** | `Default`（默认）、`Hover`、`Pressed` | 控制是否有交互卡片，默认无悬停状态 |

---

#### Padding（内边距）

根据内容类型，卡片使用不同的内边距方式：

**4 edges（默认）**
- 四边都有内边距（默认 `20px`）
- 适用于大多数情况
- 为内容提供均匀的呼吸空间

```html
<div class="acf-card">
  <!-- 内容 -->
</div>
```

**Top & bottom**
- 仅顶部和底部有内边距
- 适用于连续的轮播内容
- 内容可以延伸到左右边缘

```html
<div class="acf-card acf-card--padding-vertical">
  <!-- 内容 -->
</div>
```

**None**
- 无内边距
- 适用于富媒体内容（如图片、视频）
- 内容完全填充卡片

```html
<div class="acf-card acf-card--padding-none">
  <!-- 内容 -->
</div>
```

---

#### Theme（主题）

控制卡片颜色主题。根据经验，只有包含主要内容的卡片才应该应用主题。

**True（默认）**
- 使用 ACF 颜色主题
- 背景色为 `--bing-smtc-background-card-on-primary-alt-rest` (`#ebf6ff`)
- 适用于主要内容卡片

```html
<div class="acf-card acf-card--themed">
  <!-- 内容 -->
</div>
```

**False**
- 不使用主题色
- 背景色为纯白 `--smtc-background-card-on-primary-default-rest` (`#ffffff`)
- 适用于次要或辅助内容

```html
<div class="acf-card">
  <!-- 内容 -->
</div>
```

---

#### Corner Radius（圆角）

**注意**：不要调整 radius style 属性。这是一个遗留属性，用于组装细分卡片。

默认圆角为 `16px`（`--mai-corner-card-default`），支持以下变体：

- **All rounded**（默认）：所有四个角都是圆角
- **Top rounded**：仅顶部两个角圆角
- **Bottom rounded**：仅底部两个角圆角
- **Left rounded**：仅左侧两个角圆角
- **Right rounded**：仅右侧两个角圆角
- **Left Top rounded**：仅左上角圆角
- **Right Top rounded**：仅右上角圆角
- **Left Bottom rounded**：仅左下角圆角
- **Right Bottom rounded**：仅右下角圆角
- **No Rounded**：无圆角

```html
<!-- 默认：所有角圆角 -->
<div class="acf-card">...</div>

<!-- 仅顶部圆角 -->
<div class="acf-card acf-card--radius-top">...</div>

<!-- 仅底部圆角 -->
<div class="acf-card acf-card--radius-bottom">...</div>

<!-- 无圆角 -->
<div class="acf-card acf-card--radius-none">...</div>
```

---

#### Styling（样式状态）

控制卡片的交互状态。默认无悬停状态，适用于非交互内容。

**Default（默认）**
- 无交互效果
- 背景不变
- 适用于静态内容展示

**Hover（悬停）**
- 鼠标悬停时背景色变化
- 背景变为 `--bing-smtc-background-card-on-primary-alt-hover` (`#dfecf5`)
- 提供视觉反馈

**Pressed（按下）**
- 点击时背景色变化
- 背景变为 `--bing-smtc-background-card-on-primary-alt-pressed` (`#d5e5f0`)
- 表示激活状态

```html
<!-- 可交互卡片 -->
<a href="#" class="acf-card acf-card--interactive">
  <!-- 内容 -->
</a>
```

---

#### Card Size（卡片尺寸）

卡片的宽度和高度可以配置以实现所需的尺寸。以下是一些示例尺寸：

**Small（小）**
- 宽度：`200px`
- 高度：`200px` 或 `424px`（根据内容）

**Medium（中）**
- 宽度：`312px`
- 高度：`200px` 或 `424px`（根据内容）

**Large（大）**
- 宽度：`424px`
- 高度：`200px` 或 `424px`（根据内容）

```html
<!-- 小尺寸卡片 -->
<div class="acf-card acf-card--small">...</div>

<!-- 中尺寸卡片（默认） -->
<div class="acf-card">...</div>

<!-- 大尺寸卡片 -->
<div class="acf-card acf-card--large">...</div>
```

---

#### 使用的 Design Token

Card 组件使用以下 Token：

| Token 名称 | 值 | 用途 |
|-----------|-----|------|
| `--mai-smtc-padding-card-default` | `20px` | 默认内边距 |
| `--mai-corner-card-default` | `16px` | 默认圆角 |
| `--bing-smtc-background-card-on-primary-alt-rest` | `#ebf6ff` | 主题背景色（默认） |
| `--bing-smtc-background-card-on-primary-alt-hover` | `#dfecf5` | 主题背景色（悬停） |
| `--bing-smtc-background-card-on-primary-alt-pressed` | `#d5e5f0` | 主题背景色（按下） |
| `--smtc-background-card-on-primary-default-rest` | `#ffffff` | 非主题背景色 |
| `--smtc-gap-between-content-x-small` | `8px` | 内容间距 |

---

#### 最佳实践

##### ✅ 推荐做法

**1. 为主要内容使用主题卡片**
```html
<!-- ✅ 好 - 主要答案内容使用主题 -->
<div class="acf-card acf-card--themed">
  <h3>答案标题</h3>
  <p>主要内容...</p>
</div>
```

**2. 根据内容类型选择合适的内边距**
```html
<!-- ✅ 好 - 图片内容使用无内边距 -->
<div class="acf-card acf-card--padding-none">
  <img src="..." alt="...">
</div>

<!-- ✅ 好 - 文本内容使用默认内边距 -->
<div class="acf-card">
  <p>文本内容...</p>
</div>
```

**3. 可点击的卡片添加交互状态**
```html
<!-- ✅ 好 - 链接卡片有交互反馈 -->
<a href="..." class="acf-card acf-card--interactive">
  <h3>可点击内容</h3>
</a>
```

##### ❌ 避免做法

**1. 避免嵌套多层卡片**
```html
<!-- ❌ 避免 - 多层卡片嵌套 -->
<div class="acf-card">
  <div class="acf-card">
    <div class="acf-card">
      内容
    </div>
  </div>
</div>
```

**2. 避免在非主要内容上使用主题色**
```html
<!-- ❌ 避免 - 次要内容不应使用主题色 -->
<div class="acf-card acf-card--themed">
  <small>辅助信息</small>
</div>
```

**3. 避免在静态内容上使用交互样式**
```html
<!-- ❌ 避免 - 非交互内容不需要交互样式 -->
<div class="acf-card acf-card--interactive">
  <p>静态文本</p>
</div>
```

---

#### 可访问性

- Card 应该有适当的语义结构（如果可点击，使用 `<a>` 或 `<button>`）
- 确保有足够的颜色对比度（WCAG AA: 至少 4.5:1）
- 可交互卡片应提供明确的焦点指示器
- 使用适当的 ARIA 属性描述卡片内容

#### 响应式设计

Card 支持响应式布局，在不同屏幕尺寸下自动调整：

- 桌面：保持固定宽度（200px、312px、424px）
- 平板：可能调整为 2 列布局
- 移动端：通常为单列布局，宽度占满容器

#### 与 Figma 的对应关系

在 Figma 中，Card 组件位于 "Answer Card Framework" 文件中：

| Figma 属性 | CSS 类名 | 说明 |
|-----------|---------|------|
| `Padding=4 edges` | `.acf-card` | 默认内边距 |
| `Padding=Top & bottom` | `.acf-card--padding-vertical` | 仅垂直内边距 |
| `Padding=None` | `.acf-card--padding-none` | 无内边距 |
| `Themed?=True` | `.acf-card--themed` | 使用主题色 |
| `Themed?=False` | `.acf-card` | 不使用主题色 |
| `State=Hover` | `.acf-card--interactive:hover` | 悬停状态 |
| `State=Pressed` | `.acf-card--interactive:active` | 按下状态 |

---

## Layout 布局系统

### 概述

布局系统定义了如何组织和排列界面元素，创建清晰的视觉层次和信息流。ACF 遵循 MAI 设计语言，使用响应式网格系统确保内容在不同屏幕尺寸下都能完美呈现。

### 核心原则

1. **响应式优先** - 所有布局必须适配移动端、平板和桌面
2. **4px 基准网格** - 所有尺寸、间距基于 4px 的倍数
3. **内容优先** - 布局服务于内容，而非限制内容
4. **可扫描性** - 使用间距和对齐创建清晰的视觉流
5. **一致性** - 使用统一的间距和断点系统

### 断点系统

ACF 使用以下响应式断点：

| 断点名称 | 最小宽度 | 典型设备 | 布局特点 |
|---------|---------|---------|---------|
| Mobile | 320px | 手机 | 单列布局 |
| Tablet | 768px | 平板 | 2-3 列布局 |
| Desktop | 1024px | 桌面 | 3-4 列布局 |
| Wide | 1440px | 大屏幕 | 4+ 列布局 |

```css
/* 移动优先的媒体查询 */
.container {
  /* 默认：移动端样式 */
  padding: 16px;
}

@media (min-width: 768px) {
  .container {
    /* 平板样式 */
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    /* 桌面样式 */
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

@media (min-width: 1440px) {
  .container {
    /* 大屏幕样式 */
    max-width: 1440px;
  }
}
```

### 网格系统

#### CSS Grid 布局

ACF 推荐使用 CSS Grid 进行布局，提供灵活且强大的二维布局能力。

**基础网格：**

```css
.grid-container {
  display: grid;
  gap: var(--acf-spacing-md, 16px);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

**响应式网格：**

```css
.responsive-grid {
  display: grid;
  gap: 16px;
  
  /* 移动端：1 列 */
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .responsive-grid {
    /* 平板：2 列 */
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    /* 桌面：3 列 */
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

#### Flexbox 布局

对于一维布局（行或列），使用 Flexbox：

```css
.flex-container {
  display: flex;
  gap: var(--acf-spacing-md, 16px);
  flex-wrap: wrap;
}

.flex-item {
  flex: 1 1 300px; /* grow shrink basis */
}
```

### 卡片网格模式

基于 MAI Grid Examples，ACF 提供三种主要的卡片网格模式：

#### 1. 新闻网格（News Grid）

固定行高，列数响应式变化，适合新闻、文章卡片。

```css
.news-grid {
  display: grid;
  gap: 16px;
  grid-auto-rows: 344px;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1040px;
  margin: 0 auto;
}

@media (max-width: 932px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 736px;
  }
}

@media (max-width: 648px) {
  .news-grid {
    grid-template-columns: 1fr;
    max-width: 360px;
  }
}
```

**使用场景：**
- 新闻卡片列表
- 文章摘要网格
- 内容发现页面

#### 2. Copilot 网格（Discover Feed）

混合尺寸卡片，使用 aspect-ratio 保持比例。

```css
.copilot-grid {
  display: grid;
  gap: 16px;
  grid-auto-rows: auto;
  grid-template-columns: repeat(2, 1fr);
  max-width: 816px;
  margin: 0 auto;
}

.copilot-grid .card-regular {
  aspect-ratio: 1 / 1;
}

.copilot-grid .card-featured {
  grid-column: span 2;
  aspect-ratio: 2 / 1;
  min-height: 344px;
}

@media (max-width: 648px) {
  .copilot-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 416px;
  }
  
  .copilot-grid .card-regular,
  .copilot-grid .card-featured {
    aspect-ratio: unset;
    grid-column: span 1;
  }
}
```

**使用场景：**
- 发现页面
- 混合内容展示
- 特色内容突出

#### 3. 购物网格（Product Grid）

产品卡片网格，支持横竖布局切换。

```css
.shopping-grid {
  display: grid;
  gap: 24px;
  grid-auto-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1248px;
  margin: 0 auto;
}

.shopping-grid .product-card {
  aspect-ratio: 1 / 1.8;
}

@media (max-width: 680px) {
  .shopping-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 504px) {
  .shopping-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 160px;
  }
  
  .shopping-grid .product-card {
    aspect-ratio: unset;
  }
}
```

**使用场景：**
- 电商产品列表
- 购物页面
- 商品展示

### 间距系统

使用 Token 确保一致的间距：

| Token | 值 | 使用场景 |
|-------|-----|---------|
| `--acf-spacing-xs` | 4px | 紧密间距（图标与文字） |
| `--acf-spacing-sm` | 8px | 小间距（按钮内部） |
| `--acf-spacing-md` | 16px | 默认间距（卡片间距） |
| `--acf-spacing-lg` | 24px | 大间距（区块间距） |
| `--acf-spacing-xl` | 32px | 特大间距（页面区域） |
| `--acf-spacing-2xl` | 48px | 超大间距（主要区块） |

```css
/* 使用间距 Token */
.card-grid {
  gap: var(--acf-spacing-md); /* 16px */
  padding: var(--acf-spacing-lg); /* 24px */
}

.section {
  margin-bottom: var(--acf-spacing-2xl); /* 48px */
}
```

### 容器与最大宽度

限制内容最大宽度以提升可读性：

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--acf-spacing-md);
}

.container-narrow {
  max-width: 800px; /* 适合长文本阅读 */
}

.container-wide {
  max-width: 1440px; /* 适合多列内容 */
}

.container-full {
  max-width: 100%; /* 全宽内容 */
}
```

### 对齐与定位

#### 垂直对齐

```css
/* Flexbox 垂直居中 */
.center-vertical {
  display: flex;
  align-items: center;
}

/* Grid 垂直居中 */
.grid-center-vertical {
  display: grid;
  align-items: center;
}

/* 基线对齐（推荐用于文字与图标） */
.baseline-align {
  display: flex;
  align-items: baseline;
}
```

#### 水平对齐

```css
/* Flexbox 水平居中 */
.center-horizontal {
  display: flex;
  justify-content: center;
}

/* 两端对齐 */
.space-between {
  display: flex;
  justify-content: space-between;
}

/* 均匀分布 */
.space-evenly {
  display: flex;
  justify-content: space-evenly;
}
```

### 常见布局模式

#### 1. Header + Content + Footer

```css
.page-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.page-header {
  padding: var(--acf-spacing-md);
}

.page-content {
  padding: var(--acf-spacing-lg);
}

.page-footer {
  padding: var(--acf-spacing-md);
  background: var(--acf-color-back-neutral-secondary);
}
```

#### 2. Sidebar + Content

```css
.sidebar-layout {
  display: grid;
  gap: var(--acf-spacing-lg);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .sidebar-layout {
    grid-template-columns: 250px 1fr;
  }
}

@media (min-width: 1024px) {
  .sidebar-layout {
    grid-template-columns: 300px 1fr;
  }
}
```

#### 3. 等高卡片列表

```css
.equal-height-cards {
  display: grid;
  gap: var(--acf-spacing-md);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 1fr; /* 关键：使所有行等高 */
}

.card {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1; /* 内容填充剩余空间 */
}
```

#### 4. 圣杯布局（Holy Grail）

```css
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "left content right"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: var(--acf-spacing-md);
}

.header { grid-area: header; }
.left-sidebar { grid-area: left; }
.main-content { grid-area: content; }
.right-sidebar { grid-area: right; }
.footer { grid-area: footer; }

@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas:
      "header"
      "content"
      "left"
      "right"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

### Aspect Ratio（宽高比）

使用 aspect-ratio 保持元素比例：

```css
/* 16:9 视频比例 */
.video-container {
  aspect-ratio: 16 / 9;
}

/* 1:1 正方形卡片 */
.square-card {
  aspect-ratio: 1 / 1;
}

/* 4:3 图片比例 */
.image-4-3 {
  aspect-ratio: 4 / 3;
}

/* 2:1 宽幅卡片 */
.wide-card {
  aspect-ratio: 2 / 1;
}
```

### 最佳实践

#### ✅ 推荐做法

1. **使用移动优先方法**
   ```css
   /* ✅ 正确 */
   .element {
     /* 移动端样式 */
     font-size: 14px;
   }
   
   @media (min-width: 768px) {
     .element {
       /* 平板样式 */
       font-size: 16px;
     }
   }
   ```

2. **使用间距 Token**
   ```css
   /* ✅ 正确 */
   .card {
     gap: var(--acf-spacing-md);
   }
   
   /* ❌ 错误 */
   .card {
     gap: 15px;
   }
   ```

3. **使用语义化网格区域**
   ```css
   /* ✅ 正确 */
   grid-template-areas:
     "header header"
     "sidebar content"
     "footer footer";
   ```

4. **限制内容最大宽度**
   ```css
   /* ✅ 正确 */
   .content {
     max-width: 1200px;
     margin: 0 auto;
   }
   ```

5. **使用 gap 而非 margin**
   ```css
   /* ✅ 正确 */
   .grid {
     display: grid;
     gap: 16px;
   }
   
   /* ❌ 避免 */
   .grid > * {
     margin: 8px;
   }
   ```

#### ❌ 避免做法

1. **不要使用非标准间距**
   ```css
   /* ❌ 错误 */
   gap: 13px; /* 不是 4 的倍数 */
   
   /* ✅ 正确 */
   gap: 12px; /* 或 16px */
   ```

2. **不要硬编码断点**
   ```css
   /* ❌ 错误 */
   @media (max-width: 850px) { }
   
   /* ✅ 正确 */
   @media (max-width: 768px) { }
   ```

3. **不要过度嵌套网格**
   ```css
   /* ❌ 避免 */
   .grid .nested-grid .deep-nested-grid { }
   
   /* ✅ 简化结构 */
   .grid .content { }
   ```

4. **不要忘记移动端优化**
   ```css
   /* ❌ 错误：桌面优先 */
   @media (max-width: 768px) {
     /* 移动端样式 */
   }
   
   /* ✅ 正确：移动优先 */
   @media (min-width: 768px) {
     /* 桌面样式 */
   }
   ```

### 响应式图片

```css
.responsive-image {
  width: 100%;
  height: auto;
  display: block;
}

.image-container {
  position: relative;
  overflow: hidden;
}

/* 使用 object-fit 控制图片裁剪 */
.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.contain-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

### 性能优化

1. **使用 CSS Grid 而非浮动**
   - Grid 性能更好且语义更清晰

2. **避免深层嵌套**
   - 保持 DOM 结构扁平化

3. **使用 will-change 提示浏览器**
   ```css
   .animated-grid {
     will-change: transform;
   }
   ```

4. **使用 contain 属性优化布局**
   ```css
   .card {
     contain: layout style paint;
   }
   ```

### 可访问性

1. **保持合理的阅读顺序**
   - Grid 的视觉顺序应与 DOM 顺序一致

2. **确保足够的点击区域**
   ```css
   .clickable {
     min-width: 44px;
     min-height: 44px;
   }
   ```

3. **使用语义化 HTML**
   ```html
   <main class="main-content">
     <section class="news-grid">
       <article class="news-card">...</article>
     </section>
   </main>
   ```

### 调试技巧

```css
/* 显示网格线（开发时） */
.grid-debug {
  display: grid;
  outline: 2px dashed red;
}

.grid-debug > * {
  outline: 1px solid blue;
}

/* 显示间距（开发时） */
* {
  background-color: rgba(255, 0, 0, 0.1);
}
```

### 常见问题解决

1. **Grid 列不等宽？**
   ```css
   /* 使用 minmax 确保最小宽度 */
   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
   ```

2. **卡片高度不一致？**
   ```css
   /* 使用 grid-auto-rows */
   grid-auto-rows: 1fr;
   ```

3. **间距在移动端太大？**
   ```css
   gap: var(--acf-spacing-sm);
   
   @media (min-width: 768px) {
     gap: var(--acf-spacing-md);
   }
   ```

---
## 生成代码规范

1.代码应该完全符合以下ACF设计标准。

2.代码应该完全复现设计图中展示的内容，包括各种组件、css样式、布局、字体、颜色、svg、logo、icon、图片、文字等内容。保持 CSS 样式与设计一致，但不依赖具体的文本长度。

3.代码中数据文件和Render界面的文件应该分隔开。

不要在代码中硬编码任何文字、图片或链接。把所有文本内容、图片链接、按钮文字、标题等统一放入一个单独的JSON 对象中，在一个单独的文件里引用，如data.ts。HTML 文件中只保留结构和占位符（如 {{data.title}} 或通过 JavaScript 渲染）。确保结构与样式解耦，以便后端以后可以动态替换数据。 

4.data.ts中的数据都保存在一个json对象里，该对象变量包括页面所有的数据信息。渲染页面所有数据都来源于对data.ts中json对象变量的引用。如变量名为data，设置图片链接时则使用{data.articleList[0].imgsrc}

5.在代码生成完毕后，进行以下检查

（1）代码是否有潜在的问题

（2）代码引用的静态文件（如svg/png等图片资源）是否都可以正确找到对应的文件。

（3）代码中import引入的文件是否真实存在。

（4）页面是否完全符合以下ACF设计标准，是否完全一比一复现设计图中的组件、css样式、布局、字体、颜色、svg、logo、icon、图片、文字等内容。

如果有问题的话，请修复这些问题。
