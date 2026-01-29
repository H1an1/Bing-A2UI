/**
 * Semantic A2UI Module
 * 
 * 基于约束的 AI UI 生成系统
 * - 最大的 AI 创作自由度
 * - ACF Token 保证设计一致性
 */

// Types
export type {
  // Token Types
  ACFColorToken,
  ACFSpacingToken,
  ACFRadiusToken,
  ACFFontSizeToken,
  ACFFontWeightToken,
  ACFElevationToken,
  
  // Style Types
  ACFCompliantStyle,
  
  // Semantic Types
  SemanticIntent,
  SemanticBlockType,
  SemanticBlock,
  SemanticLayout,
  SemanticA2UIDescriptor,
  
  // Block Types
  HeroBlock,
  TitleBlock,
  SubtitleBlock,
  BodyBlock,
  ImageBlock,
  ImageGridBlock,
  ImageCarouselBlock,
  MetadataBlock,
  TagsBlock,
  ActionBlock,
  DividerBlock,
  SpacerBlock,
  CardBlock,
  ListBlock,
  QuoteBlock,
  StatBlock,
  CustomBlock,
  
  // Validation Types
  ValidationResult,
  ValidationError,
  ValidationWarning,
} from './types';

// Token Constants
export {
  ACF_COLOR_TOKENS,
  ACF_SPACING_TOKENS,
  ACF_RADIUS_TOKENS,
  ACF_FONT_SIZE_TOKENS,
  ACF_ELEVATION_TOKENS,
} from './types';

// Validator
export {
  validateSemanticA2UI,
  isStyleCompliant,
  fixStyleTokens,
  getComplianceReport,
} from './validator';

// Renderer
export { SemanticRenderer, default as SemanticRendererDefault } from './SemanticRenderer';
export type { SemanticRendererProps } from './SemanticRenderer';




