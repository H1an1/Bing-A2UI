/**
 * Interactive Dynamic View Module
 * 
 * 交互式动态视图系统
 * - AI 生成交互式应用
 * - 状态管理 + 动态内容
 * - 像 Gemini Dynamic View
 */

// Types
export type {
  AppType,
  AppTheme,
  NavigationType,
  NavigationItem,
  Navigation,
  ContentBlockType,
  ContentBlock,
  HeroContent,
  AccordionContent,
  AccordionItem,
  ComparisonContent,
  SizeScaleContent,
  InteractiveImageContent,
  CalculatorContent,
  ContentPanel,
  InteractiveDynamicView,
  InteractiveRendererProps,
} from './types';

// Components
export {
  TimelineNav,
  SidebarListNav,
  TabsNav,
  Accordion,
  HeroBlock,
  ComparisonBlock,
  SizeScaleBlock,
  FactBox,
  ImageGrid,
  StepNavigator,
  InteractiveComponents,
} from './InteractiveComponents';

// Renderer
export { InteractiveRenderer } from './InteractiveRenderer';
export { default as InteractiveRendererDefault } from './InteractiveRenderer';

// Icons
export * from './icons';

