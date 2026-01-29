/**
 * Interactive Dynamic View - 类型定义
 * 
 * 核心理念：AI 生成交互式应用，不是静态内容
 * - 状态管理
 * - 导航切换
 * - 动态内容面板
 * - 实时交互
 */

// ============================================================================
// 应用类型 - AI 根据 query 选择最合适的应用框架
// ============================================================================

export type AppType = 
  | 'timeline-explorer'    // Picasso periods, 历史事件
  | 'entity-browser'       // 鲸鱼指南, 动物百科
  | 'location-guide'       // 京都指南, 城市探索
  | 'comparison-view'      // iPhone vs Galaxy
  | 'step-guide'           // 菜谱, 教程
  | 'category-explorer'    // 屋顶风格, 分类学习
  | 'gallery-showcase'     // 艺术画廊, 作品集
  | 'freeform';            // 自由布局

// ============================================================================
// 主题 - AI 可以为整个应用或单个面板设置主题
// ============================================================================

export interface AppTheme {
  mode: 'light' | 'dark' | 'auto';
  accent?: string;  // 可以是 ACF token 或具体颜色
  heroOverlay?: 'gradient-dark' | 'gradient-light' | 'solid' | 'none';
}

// ============================================================================
// 导航系统 - 控制用户如何在不同内容间切换
// ============================================================================

export type NavigationType = 
  | 'timeline'      // 底部时间线 (Picasso)
  | 'sidebar-list'  // 侧边列表 (鲸鱼)
  | 'top-tabs'      // 顶部标签 (季节, 分类)
  | 'top-nav'       // 顶部导航栏 (京都: Attractions, Map, Culture)
  | 'step-list'     // 步骤列表 (菜谱)
  | 'category-tabs' // 分类标签 (屋顶风格)
  | 'card-select';  // 卡片选择

export interface NavigationItem {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  thumbnail?: string;
  metadata?: Record<string, string | number>;
}

export interface Navigation {
  type: NavigationType;
  position: 'top' | 'bottom' | 'left' | 'right';
  items: NavigationItem[];
  style?: 'minimal' | 'detailed' | 'visual';
}

// ============================================================================
// 内容块 - 构建面板的基本单元
// ============================================================================

export type ContentBlockType =
  | 'hero'           // 全屏背景图 + 标题
  | 'title-section'  // 标题 + 描述
  | 'image-grid'     // 图片网格
  | 'image-single'   // 单张图片
  | 'text-body'      // 正文文本
  | 'accordion'      // 可展开列表
  | 'fact-box'       // 事实框 (Did You Know?)
  | 'quote'          // 引用
  | 'stats'          // 数据统计
  | 'comparison'     // 并排对比
  | 'feature-list'   // 特性列表
  | 'card-grid'      // 卡片网格
  | 'map'            // 地图占位
  | 'timer'          // 计时器
  | 'calculator'     // 计算器 (配料换算)
  | 'tags'           // 标签云
  | 'badges'         // 徽章
  | 'size-scale'     // 大小对比 (鲸鱼)
  | 'interactive-image' // 可点击标注的图片
  | 'freeform-html';    // 🆕 自由 HTML/CSS (AI 完全自由创作)

export interface ContentBlock {
  type: ContentBlockType;
  id?: string;
  content: Record<string, any>;
  style?: Record<string, string>;
  gridArea?: string;
}

// ============================================================================
// Hero 块 - 全屏背景图
// ============================================================================

export interface HeroContent {
  imageUrl?: string;
  title: string;
  subtitle?: string;
  overline?: string;  // 小标题 (1901-1904, PARIS & BARCELONA)
  badges?: Array<{ icon?: string; label: string }>;
  cta?: Array<{ label: string; action: string; variant: 'primary' | 'secondary' }>;
  overlay?: 'dark' | 'light' | 'gradient' | 'none';
}

// ============================================================================
// Accordion 块 - 可展开列表
// ============================================================================

export interface AccordionItem {
  id: string;
  icon?: string;
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export interface AccordionContent {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

// ============================================================================
// Comparison 块 - 并排对比
// ============================================================================

export interface ComparisonContent {
  left: {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    badges?: string[];
    features: Array<{ icon?: string; label: string }>;
  };
  right: {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    badges?: string[];
    features: Array<{ icon?: string; label: string }>;
  };
  winner?: 'left' | 'right' | 'tie';
  verdict?: string;
}

// ============================================================================
// Size Scale 块 - 大小对比
// ============================================================================

export interface SizeScaleContent {
  items: Array<{
    label: string;
    value: number;
    unit: string;
    color?: string;
  }>;
  maxValue?: number;
}

// ============================================================================
// Interactive Image 块 - 可点击标注
// ============================================================================

export interface InteractiveImageContent {
  imageUrl: string;
  markers: Array<{
    id: string;
    x: number;  // 百分比位置
    y: number;
    label: string;
    description?: string;
    thumbnail?: string;
  }>;
}

// ============================================================================
// Calculator 块 - 动态计算
// ============================================================================

export interface CalculatorContent {
  title: string;
  inputs: Array<{
    id: string;
    label: string;
    type: 'number' | 'select';
    default: number | string;
    min?: number;
    max?: number;
    options?: string[];
  }>;
  outputs: Array<{
    id: string;
    label: string;
    formula: string;  // 简单的计算公式，如 "guests * 100"
    unit?: string;
    icon?: string;
  }>;
}

// ============================================================================
// 内容面板 - 每个导航项对应的完整内容
// ============================================================================

export interface ContentPanel {
  id: string;
  layout: 'hero-sidebar' | 'sidebar-main' | 'full-width' | 'split' | 'grid';
  theme?: Partial<AppTheme>;  // 面板特定主题
  blocks: ContentBlock[];
  gridTemplate?: string;      // 自定义 grid-template-areas
}

// ============================================================================
// 主结构 - Interactive Dynamic View
// ============================================================================

export interface InteractiveDynamicView {
  // 元信息
  query: string;
  reasoning?: string;
  
  // 应用配置
  appType: AppType;
  theme: AppTheme;
  
  // 头部配置 (可选)
  header?: {
    logo?: { icon: string; text: string };
    navItems?: Array<{ label: string; action: string }>;
    trailing?: string;  // 右侧信息 (Data Source: NOAA)
  };
  
  // 导航系统
  navigation: Navigation;
  
  // 初始状态
  initialState: {
    activeId: string;
    [key: string]: any;
  };
  
  // 内容面板 (每个导航 ID 对应一个面板)
  panels: Record<string, ContentPanel>;
  
  // 辅助内容 (始终显示)
  sidebar?: {
    position: 'left' | 'right';
    width?: string;
    blocks: ContentBlock[];
  };
  
  // 底部内容 (始终显示)
  footer?: {
    blocks: ContentBlock[];
  };
}

// ============================================================================
// 渲染器 Props
// ============================================================================

export interface InteractiveRendererProps {
  view: InteractiveDynamicView;
  images: string[];
  onQueryClick?: (query: string) => void;
  onImageClick?: (url: string, title?: string) => void;
  showDebugInfo?: boolean;
}

