/**
 * Semantic A2UI Type System
 * 
 * 基于约束的 UI 生成类型系统
 * 
 * 核心理念：
 * - Layer 1: Design Tokens (硬约束) - 颜色、间距、字体必须使用 ACF tokens
 * - Layer 2: Layout Constraints (软约束) - 最大宽度、网格系统
 * - Layer 3: Semantic Primitives (自由层) - AI 可以自由组合
 */

// ============================================================================
// ACF Token Types - 硬约束，只接受 token 格式
// ============================================================================

/** ACF 颜色 Token 类型 */
export type ACFColorToken = 
  // 前景色
  | 'var(--acf-color-fore-neutral-primary)'
  | 'var(--acf-color-fore-neutral-secondary)'
  | 'var(--acf-color-fore-neutral-tertiary)'
  | 'var(--acf-color-fore-neutral-quaternary)'
  | 'var(--acf-color-fore-accent-primary)'
  | 'var(--acf-color-fore-on-accent-alt-primary)'
  // 背景色
  | 'var(--acf-color-back-neutral-primary)'
  | 'var(--acf-color-back-neutral-secondary)'
  | 'var(--acf-color-back-accent-primary)'
  | 'var(--acf-color-back-accent-secondary)'
  // 填充色
  | 'var(--acf-color-fill-accent-primary)'
  | 'var(--acf-color-fill-accent-secondary)'
  | 'var(--acf-color-fill-accent-tertiary)'
  | 'var(--acf-color-fill-accent-alt-primary)'
  | 'var(--acf-color-fill-neutral-primary)'
  | 'var(--acf-color-fill-neutral-secondary)'
  // 描边色
  | 'var(--acf-color-stroke-neutral-primary)'
  | 'var(--acf-color-stroke-neutral-secondary)'
  | 'var(--acf-color-stroke-accent-primary)'
  // 语义色
  | 'var(--acf-color-back-semantic-positive)'
  | 'var(--acf-color-back-semantic-danger)'
  | 'var(--acf-color-back-semantic-warning)'
  // 允许透明和继承
  | 'transparent'
  | 'inherit'
  | 'currentColor'
  // 允许渐变（但颜色部分需要验证）
  | `linear-gradient(${string})`
  | `radial-gradient(${string})`;

/** ACF 间距 Token 类型 */
export type ACFSpacingToken =
  | 'var(--acf-spacing-4xs)'  // 2px
  | 'var(--acf-spacing-3xs)'  // 3px
  | 'var(--acf-spacing-2xs)'  // 4px
  | 'var(--acf-spacing-xs)'   // 8px
  | 'var(--acf-spacing-s)'    // 12px
  | 'var(--acf-spacing-m)'    // 16px
  | 'var(--acf-spacing-l)'    // 20px
  | 'var(--acf-spacing-xl)'   // 24px
  | 'var(--acf-spacing-2xl)'  // 36px
  | 'var(--acf-spacing-3xl)'  // 48px
  | '0'
  | 'auto';

/** ACF 圆角 Token 类型 */
export type ACFRadiusToken =
  | 'var(--acf-radius-s)'        // 4px
  | 'var(--acf-radius-m)'        // 8px
  | 'var(--acf-radius-l)'        // 16px
  | 'var(--acf-radius-xl)'       // 24px
  | 'var(--acf-radius-infinite)' // 9999px
  | '0'
  | '50%';

/** ACF 字体大小 Token 类型 */
export type ACFFontSizeToken =
  | 'var(--acf-text-display1-size)'     // 54px
  | 'var(--acf-text-title1-size)'       // 36px
  | 'var(--acf-text-title2-size)'       // 24px
  | 'var(--acf-text-subtitle1-size)'    // 20px
  | 'var(--acf-text-body1-size)'        // 18px
  | 'var(--acf-text-body2-size)'        // 16px
  | 'var(--acf-text-body3-size)'        // 14px
  | 'var(--acf-text-caption1-size)'     // 13px
  | 'var(--acf-text-caption2-size)'     // 11px
  | 'inherit';

/** ACF 字重 Token 类型 */
export type ACFFontWeightToken =
  | 'var(--acf-font-weight-regular)'  // 400
  | 'var(--acf-font-weight-medium)'   // 500
  | 'var(--acf-font-weight-bold)'     // 700
  | 'inherit';

/** ACF 阴影 Token 类型 */
export type ACFElevationToken =
  | 'var(--acf-elevation-0)'
  | 'var(--acf-elevation-1)'
  | 'var(--acf-elevation-2)'
  | 'var(--acf-elevation-3)'
  | 'none';

// ============================================================================
// ACF Compliant Style - 使用 Token 的样式对象
// ============================================================================

/**
 * ACF 合规样式
 * 
 * 颜色、间距、圆角、字体必须使用 Token
 * 布局属性（width, height, display 等）是自由的
 */
export interface ACFCompliantStyle {
  // === 颜色相关（必须使用 Token）===
  color?: ACFColorToken;
  backgroundColor?: ACFColorToken;
  background?: ACFColorToken | `linear-gradient(${string})` | `radial-gradient(${string})`;
  borderColor?: ACFColorToken;
  
  // === 间距相关（必须使用 Token）===
  padding?: ACFSpacingToken;
  paddingTop?: ACFSpacingToken;
  paddingRight?: ACFSpacingToken;
  paddingBottom?: ACFSpacingToken;
  paddingLeft?: ACFSpacingToken;
  margin?: ACFSpacingToken;
  marginTop?: ACFSpacingToken;
  marginRight?: ACFSpacingToken;
  marginBottom?: ACFSpacingToken;
  marginLeft?: ACFSpacingToken;
  gap?: ACFSpacingToken;
  rowGap?: ACFSpacingToken;
  columnGap?: ACFSpacingToken;
  
  // === 圆角（必须使用 Token）===
  borderRadius?: ACFRadiusToken;
  borderTopLeftRadius?: ACFRadiusToken;
  borderTopRightRadius?: ACFRadiusToken;
  borderBottomLeftRadius?: ACFRadiusToken;
  borderBottomRightRadius?: ACFRadiusToken;
  
  // === 字体（必须使用 Token）===
  fontSize?: ACFFontSizeToken;
  fontWeight?: ACFFontWeightToken;
  lineHeight?: string;  // 可以自由设置
  
  // === 阴影（必须使用 Token）===
  boxShadow?: ACFElevationToken | string;  // 允许自定义阴影，但推荐用 Token
  
  // === 自由属性（不涉及设计系统）===
  // 尺寸
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  aspectRatio?: string;
  
  // 布局
  display?: 'flex' | 'grid' | 'block' | 'inline' | 'inline-flex' | 'inline-grid' | 'none';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | 'auto';
  flex?: string;
  flexGrow?: number;
  flexShrink?: number;
  order?: number;
  
  // Grid
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gridColumn?: string;
  gridRow?: string;
  gridArea?: string;
  
  // 定位
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  inset?: string;
  
  // 边框
  border?: string;
  borderWidth?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  
  // 溢出
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
  
  // 文本
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textDecoration?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  textOverflow?: 'clip' | 'ellipsis';
  
  // 视觉效果
  opacity?: number;
  backdropFilter?: string;
  filter?: string;
  transform?: string;
  transformOrigin?: string;
  
  // 过渡动画
  transition?: string;
  animation?: string;
  
  // 其他
  cursor?: string;
  pointerEvents?: 'auto' | 'none';
  userSelect?: 'auto' | 'none' | 'text' | 'all';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

// ============================================================================
// Semantic Intent - AI 表达意图
// ============================================================================

/** AI 的设计意图 */
export interface SemanticIntent {
  /** 主要展示模式 */
  primary: 
    | 'immersive-visual'    // 沉浸式视觉体验（大图为主）
    | 'information-dense'   // 信息密集型（文字为主）
    | 'gallery-showcase'    // 图库展示（多图为主）
    | 'comparison'          // 对比展示
    | 'step-by-step'        // 步骤引导
    | 'editorial'           // 编辑/杂志风格
    | 'freeform';           // 完全自由
  
  /** 视觉氛围 */
  mood: 
    | 'dramatic'      // 戏剧性的、有冲击力的
    | 'clean'         // 干净简洁的
    | 'playful'       // 活泼有趣的
    | 'professional'  // 专业正式的
    | 'artistic'      // 艺术感的
    | 'cozy';         // 温馨舒适的
  
  /** 内容焦点 */
  focus: 
    | 'image-first'   // 图片优先
    | 'text-first'    // 文字优先
    | 'balanced';     // 平衡
  
  /** AI 的设计理由 */
  reasoning?: string;
}

// ============================================================================
// Semantic Blocks - 语义化内容块
// ============================================================================

/** 语义块类型 */
export type SemanticBlockType =
  | 'hero'           // 主视觉区域
  | 'title'          // 标题
  | 'subtitle'       // 副标题
  | 'body'           // 正文
  | 'image'          // 单图
  | 'image-grid'     // 图片网格
  | 'image-carousel' // 图片轮播
  | 'metadata'       // 元数据（来源、日期等）
  | 'tags'           // 标签
  | 'action'         // 行动按钮
  | 'divider'        // 分隔线
  | 'spacer'         // 间隔
  | 'card'           // 卡片容器
  | 'list'           // 列表
  | 'quote'          // 引用
  | 'stat'           // 统计数字
  | 'custom';        // 自定义

/** 基础语义块 */
export interface SemanticBlockBase {
  id: string;
  type: SemanticBlockType;
  style?: ACFCompliantStyle;
  gridArea?: string;  // 在 grid 布局中的位置
  className?: string; // 额外的 CSS 类名
}

/** Hero 块 */
export interface HeroBlock extends SemanticBlockBase {
  type: 'hero';
  content: {
    imageUrl: string;
    imageAlt?: string;
    title?: string;
    subtitle?: string;
    overlay?: boolean;
    overlayGradient?: string;
  };
}

/** 标题块 */
export interface TitleBlock extends SemanticBlockBase {
  type: 'title';
  content: {
    text: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

/** 副标题块 */
export interface SubtitleBlock extends SemanticBlockBase {
  type: 'subtitle';
  content: {
    text: string;
  };
}

/** 正文块 */
export interface BodyBlock extends SemanticBlockBase {
  type: 'body';
  content: {
    text: string;
    truncate?: number;  // 截断字数
  };
}

/** 单图块 */
export interface ImageBlock extends SemanticBlockBase {
  type: 'image';
  content: {
    url: string;
    alt?: string;
    caption?: string;
    aspectRatio?: string;
    objectFit?: 'cover' | 'contain' | 'fill';
  };
}

/** 图片网格块 */
export interface ImageGridBlock extends SemanticBlockBase {
  type: 'image-grid';
  content: {
    images: Array<{
      url: string;
      alt?: string;
      title?: string;
    }>;
    columns?: number;
    aspectRatio?: string;
  };
}

/** 图片轮播块 */
export interface ImageCarouselBlock extends SemanticBlockBase {
  type: 'image-carousel';
  content: {
    images: Array<{
      url: string;
      alt?: string;
      title?: string;
    }>;
    autoPlay?: boolean;
    interval?: number;
  };
}

/** 元数据块 */
export interface MetadataBlock extends SemanticBlockBase {
  type: 'metadata';
  content: {
    items: Array<{
      label?: string;
      value: string;
      icon?: string;
    }>;
  };
}

/** 标签块 */
export interface TagsBlock extends SemanticBlockBase {
  type: 'tags';
  content: {
    tags: string[];
    variant?: 'filled' | 'outlined' | 'subtle';
  };
}

/** 行动按钮块 */
export interface ActionBlock extends SemanticBlockBase {
  type: 'action';
  content: {
    label: string;
    variant?: 'primary' | 'secondary' | 'subtle';
    icon?: string;
    action?: string;  // 关联的查询或链接
  };
}

/** 分隔线块 */
export interface DividerBlock extends SemanticBlockBase {
  type: 'divider';
  content?: {
    variant?: 'solid' | 'dashed' | 'gradient';
  };
}

/** 间隔块 */
export interface SpacerBlock extends SemanticBlockBase {
  type: 'spacer';
  content?: {
    size?: ACFSpacingToken;
  };
}

/** 卡片容器块 */
export interface CardBlock extends SemanticBlockBase {
  type: 'card';
  content: {
    children: SemanticBlock[];
    variant?: 'elevated' | 'outlined' | 'filled';
    interactive?: boolean;
    action?: string;
  };
}

/** 列表块 */
export interface ListBlock extends SemanticBlockBase {
  type: 'list';
  content: {
    items: Array<{
      title: string;
      subtitle?: string;
      imageUrl?: string;
      action?: string;
    }>;
    variant?: 'simple' | 'detailed' | 'compact';
  };
}

/** 引用块 */
export interface QuoteBlock extends SemanticBlockBase {
  type: 'quote';
  content: {
    text: string;
    author?: string;
    source?: string;
  };
}

/** 统计数字块 */
export interface StatBlock extends SemanticBlockBase {
  type: 'stat';
  content: {
    value: string;
    label: string;
    icon?: string;
    trend?: 'up' | 'down' | 'neutral';
  };
}

/** 自定义块 - AI 可以自由定义结构 */
export interface CustomBlock extends SemanticBlockBase {
  type: 'custom';
  content: {
    element: 'div' | 'section' | 'article' | 'figure' | 'aside' | 'nav';
    children: SemanticBlock[];
  };
}

/** 所有语义块的联合类型 */
export type SemanticBlock =
  | HeroBlock
  | TitleBlock
  | SubtitleBlock
  | BodyBlock
  | ImageBlock
  | ImageGridBlock
  | ImageCarouselBlock
  | MetadataBlock
  | TagsBlock
  | ActionBlock
  | DividerBlock
  | SpacerBlock
  | CardBlock
  | ListBlock
  | QuoteBlock
  | StatBlock
  | CustomBlock;

// ============================================================================
// Semantic A2UI Descriptor - 完整的语义化描述
// ============================================================================

/** 布局配置 */
export interface SemanticLayout {
  /** 布局类型 */
  type: 'flex' | 'grid' | 'stack';
  
  /** Flex 布局配置 */
  flexDirection?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap';
  justifyContent?: string;
  alignItems?: string;
  
  /** Grid 布局配置 */
  gridTemplate?: string;           // e.g., "1fr 2fr 1fr"
  gridTemplateAreas?: string[];    // e.g., ["hero hero sidebar", "content content sidebar"]
  gridAutoRows?: string;
  gridAutoColumns?: string;
  
  /** 通用配置 */
  gap?: ACFSpacingToken;
  padding?: ACFSpacingToken;
  maxWidth?: string;  // 建议使用 1208px
}

/** 语义化 A2UI 描述符 - 完整结构 */
export interface SemanticA2UIDescriptor {
  /** 版本号 */
  version: '1.0';
  
  /** AI 的设计意图 */
  intent: SemanticIntent;
  
  /** 布局配置 */
  layout: SemanticLayout;
  
  /** 容器样式 */
  containerStyle?: ACFCompliantStyle;
  
  /** 内容块数组 */
  blocks: SemanticBlock[];
  
  /** 相关搜索 */
  relatedQueries?: string[];
  
  /** 颜色主题（可选） */
  colorScheme?: 'light' | 'dark' | 'accent';
}

// ============================================================================
// Validation Result
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  fixedDescriptor?: SemanticA2UIDescriptor;
}

export interface ValidationError {
  path: string;
  message: string;
  value?: any;
  suggestion?: string;
}

export interface ValidationWarning {
  path: string;
  message: string;
  suggestion?: string;
}

// ============================================================================
// ACF Token Maps - 用于验证和自动修复
// ============================================================================

export const ACF_COLOR_TOKENS = [
  'var(--acf-color-fore-neutral-primary)',
  'var(--acf-color-fore-neutral-secondary)',
  'var(--acf-color-fore-neutral-tertiary)',
  'var(--acf-color-fore-neutral-quaternary)',
  'var(--acf-color-fore-accent-primary)',
  'var(--acf-color-fore-on-accent-alt-primary)',
  'var(--acf-color-back-neutral-primary)',
  'var(--acf-color-back-neutral-secondary)',
  'var(--acf-color-back-accent-primary)',
  'var(--acf-color-back-accent-secondary)',
  'var(--acf-color-fill-accent-primary)',
  'var(--acf-color-fill-accent-secondary)',
  'var(--acf-color-fill-accent-tertiary)',
  'var(--acf-color-fill-accent-alt-primary)',
  'var(--acf-color-fill-neutral-primary)',
  'var(--acf-color-fill-neutral-secondary)',
  'var(--acf-color-stroke-neutral-primary)',
  'var(--acf-color-stroke-neutral-secondary)',
  'var(--acf-color-stroke-accent-primary)',
  'var(--acf-color-back-semantic-positive)',
  'var(--acf-color-back-semantic-danger)',
  'var(--acf-color-back-semantic-warning)',
  'transparent',
  'inherit',
  'currentColor',
] as const;

export const ACF_SPACING_TOKENS = [
  'var(--acf-spacing-4xs)',
  'var(--acf-spacing-3xs)',
  'var(--acf-spacing-2xs)',
  'var(--acf-spacing-xs)',
  'var(--acf-spacing-s)',
  'var(--acf-spacing-m)',
  'var(--acf-spacing-l)',
  'var(--acf-spacing-xl)',
  'var(--acf-spacing-2xl)',
  'var(--acf-spacing-3xl)',
  '0',
  'auto',
] as const;

export const ACF_RADIUS_TOKENS = [
  'var(--acf-radius-s)',
  'var(--acf-radius-m)',
  'var(--acf-radius-l)',
  'var(--acf-radius-xl)',
  'var(--acf-radius-infinite)',
  '0',
  '50%',
] as const;

export const ACF_FONT_SIZE_TOKENS = [
  'var(--acf-text-display1-size)',
  'var(--acf-text-title1-size)',
  'var(--acf-text-title2-size)',
  'var(--acf-text-subtitle1-size)',
  'var(--acf-text-body1-size)',
  'var(--acf-text-body2-size)',
  'var(--acf-text-body3-size)',
  'var(--acf-text-caption1-size)',
  'var(--acf-text-caption2-size)',
  'inherit',
] as const;

export const ACF_ELEVATION_TOKENS = [
  'var(--acf-elevation-0)',
  'var(--acf-elevation-1)',
  'var(--acf-elevation-2)',
  'var(--acf-elevation-3)',
  'none',
] as const;




