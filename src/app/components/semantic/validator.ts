/**
 * ACF Token Validator
 * 
 * 验证 AI 输出是否符合 ACF 设计系统约束
 * 提供自动修复功能
 */

import {
  SemanticA2UIDescriptor,
  SemanticBlock,
  ACFCompliantStyle,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ACF_COLOR_TOKENS,
  ACF_SPACING_TOKENS,
  ACF_RADIUS_TOKENS,
  ACF_FONT_SIZE_TOKENS,
  ACF_ELEVATION_TOKENS,
} from './types';

// ============================================================================
// Token Validation Helpers
// ============================================================================

/**
 * 检查是否是有效的 ACF 颜色 token
 */
function isValidColorToken(value: string): boolean {
  if (ACF_COLOR_TOKENS.includes(value as any)) return true;
  
  // 允许渐变，但需要进一步验证内部颜色
  if (value.startsWith('linear-gradient(') || value.startsWith('radial-gradient(')) {
    return true; // 渐变暂时放宽验证
  }
  
  // 允许 rgba 格式（用于透明度变体）
  if (value.startsWith('rgba(') && value.includes('var(--acf-')) {
    return true;
  }
  
  return false;
}

/**
 * 检查是否是有效的 ACF 间距 token
 */
function isValidSpacingToken(value: string): boolean {
  return ACF_SPACING_TOKENS.includes(value as any);
}

/**
 * 检查是否是有效的 ACF 圆角 token
 */
function isValidRadiusToken(value: string): boolean {
  return ACF_RADIUS_TOKENS.includes(value as any);
}

/**
 * 检查是否是有效的 ACF 字体大小 token
 */
function isValidFontSizeToken(value: string): boolean {
  return ACF_FONT_SIZE_TOKENS.includes(value as any);
}

/**
 * 检查是否是有效的 ACF 阴影 token
 */
function isValidElevationToken(value: string): boolean {
  if (ACF_ELEVATION_TOKENS.includes(value as any)) return true;
  // 允许自定义阴影（但会有 warning）
  return true;
}

// ============================================================================
// Auto-fix Helpers
// ============================================================================

/**
 * 将硬编码颜色转换为最接近的 ACF token
 */
function fixColor(value: string): string {
  // 常见颜色映射
  const colorMap: Record<string, string> = {
    '#000000': 'var(--acf-color-fore-neutral-primary)',
    '#000': 'var(--acf-color-fore-neutral-primary)',
    'black': 'var(--acf-color-fore-neutral-primary)',
    '#ffffff': 'var(--acf-color-back-neutral-primary)',
    '#fff': 'var(--acf-color-back-neutral-primary)',
    'white': 'var(--acf-color-back-neutral-primary)',
    '#f5f5f5': 'var(--acf-color-back-neutral-secondary)',
    '#f0f0f0': 'var(--acf-color-back-neutral-secondary)',
    '#0078d4': 'var(--acf-color-fill-accent-primary)',
    '#ebf6ff': 'var(--acf-color-back-accent-primary)',
  };
  
  const lowerValue = value.toLowerCase();
  if (colorMap[lowerValue]) {
    return colorMap[lowerValue];
  }
  
  // 如果是 hex 颜色，尝试判断是深色还是浅色
  if (value.startsWith('#')) {
    const brightness = getColorBrightness(value);
    if (brightness < 50) {
      return 'var(--acf-color-fore-neutral-primary)';
    } else if (brightness > 200) {
      return 'var(--acf-color-back-neutral-primary)';
    } else {
      return 'var(--acf-color-fore-neutral-secondary)';
    }
  }
  
  // 默认返回主要前景色
  return 'var(--acf-color-fore-neutral-primary)';
}

/**
 * 将硬编码间距转换为最接近的 ACF token
 */
function fixSpacing(value: string): string {
  const numValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  if (isNaN(numValue) || numValue === 0) return '0';
  if (numValue <= 2) return 'var(--acf-spacing-4xs)';
  if (numValue <= 3) return 'var(--acf-spacing-3xs)';
  if (numValue <= 4) return 'var(--acf-spacing-2xs)';
  if (numValue <= 8) return 'var(--acf-spacing-xs)';
  if (numValue <= 12) return 'var(--acf-spacing-s)';
  if (numValue <= 16) return 'var(--acf-spacing-m)';
  if (numValue <= 20) return 'var(--acf-spacing-l)';
  if (numValue <= 24) return 'var(--acf-spacing-xl)';
  if (numValue <= 36) return 'var(--acf-spacing-2xl)';
  return 'var(--acf-spacing-3xl)';
}

/**
 * 将硬编码圆角转换为最接近的 ACF token
 */
function fixRadius(value: string): string {
  if (value === '50%') return '50%';
  if (value === '0' || value === '0px') return '0';
  
  const numValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  if (isNaN(numValue) || numValue === 0) return '0';
  if (numValue <= 4) return 'var(--acf-radius-s)';
  if (numValue <= 8) return 'var(--acf-radius-m)';
  if (numValue <= 16) return 'var(--acf-radius-l)';
  if (numValue <= 24) return 'var(--acf-radius-xl)';
  return 'var(--acf-radius-infinite)';
}

/**
 * 将硬编码字体大小转换为最接近的 ACF token
 */
function fixFontSize(value: string): string {
  const numValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  if (isNaN(numValue)) return 'inherit';
  if (numValue >= 48) return 'var(--acf-text-display1-size)';
  if (numValue >= 32) return 'var(--acf-text-title1-size)';
  if (numValue >= 22) return 'var(--acf-text-title2-size)';
  if (numValue >= 18) return 'var(--acf-text-subtitle1-size)';
  if (numValue >= 16) return 'var(--acf-text-body2-size)';
  if (numValue >= 14) return 'var(--acf-text-body3-size)';
  if (numValue >= 12) return 'var(--acf-text-caption1-size)';
  return 'var(--acf-text-caption2-size)';
}

/**
 * 获取颜色亮度（0-255）
 */
function getColorBrightness(hex: string): number {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 128;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// ============================================================================
// Style Validation
// ============================================================================

/**
 * 验证单个样式对象
 */
function validateStyle(
  style: ACFCompliantStyle | undefined,
  path: string,
  errors: ValidationError[],
  warnings: ValidationWarning[],
  autoFix: boolean
): ACFCompliantStyle | undefined {
  if (!style) return undefined;
  
  const fixedStyle: ACFCompliantStyle = { ...style };
  
  // 验证颜色属性
  const colorProps = ['color', 'backgroundColor', 'background', 'borderColor'] as const;
  for (const prop of colorProps) {
    const value = style[prop];
    if (value && typeof value === 'string' && !isValidColorToken(value)) {
      if (autoFix) {
        (fixedStyle as any)[prop] = fixColor(value);
        warnings.push({
          path: `${path}.${prop}`,
          message: `Auto-fixed color from "${value}" to "${(fixedStyle as any)[prop]}"`,
          suggestion: `Use ACF color token instead of "${value}"`,
        });
      } else {
        errors.push({
          path: `${path}.${prop}`,
          message: `Invalid color value: "${value}"`,
          value,
          suggestion: `Use ACF color token like "var(--acf-color-fore-neutral-primary)"`,
        });
      }
    }
  }
  
  // 验证间距属性
  const spacingProps = [
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'gap', 'rowGap', 'columnGap'
  ] as const;
  for (const prop of spacingProps) {
    const value = style[prop];
    if (value && typeof value === 'string' && !isValidSpacingToken(value)) {
      if (autoFix) {
        (fixedStyle as any)[prop] = fixSpacing(value);
        warnings.push({
          path: `${path}.${prop}`,
          message: `Auto-fixed spacing from "${value}" to "${(fixedStyle as any)[prop]}"`,
          suggestion: `Use ACF spacing token instead of "${value}"`,
        });
      } else {
        errors.push({
          path: `${path}.${prop}`,
          message: `Invalid spacing value: "${value}"`,
          value,
          suggestion: `Use ACF spacing token like "var(--acf-spacing-m)"`,
        });
      }
    }
  }
  
  // 验证圆角属性
  const radiusProps = [
    'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius',
    'borderBottomLeftRadius', 'borderBottomRightRadius'
  ] as const;
  for (const prop of radiusProps) {
    const value = style[prop];
    if (value && typeof value === 'string' && !isValidRadiusToken(value)) {
      if (autoFix) {
        (fixedStyle as any)[prop] = fixRadius(value);
        warnings.push({
          path: `${path}.${prop}`,
          message: `Auto-fixed radius from "${value}" to "${(fixedStyle as any)[prop]}"`,
          suggestion: `Use ACF radius token instead of "${value}"`,
        });
      } else {
        errors.push({
          path: `${path}.${prop}`,
          message: `Invalid radius value: "${value}"`,
          value,
          suggestion: `Use ACF radius token like "var(--acf-radius-m)"`,
        });
      }
    }
  }
  
  // 验证字体大小
  if (style.fontSize && typeof style.fontSize === 'string' && !isValidFontSizeToken(style.fontSize)) {
    if (autoFix) {
      fixedStyle.fontSize = fixFontSize(style.fontSize) as any;
      warnings.push({
        path: `${path}.fontSize`,
        message: `Auto-fixed fontSize from "${style.fontSize}" to "${fixedStyle.fontSize}"`,
        suggestion: `Use ACF font size token instead of "${style.fontSize}"`,
      });
    } else {
      errors.push({
        path: `${path}.fontSize`,
        message: `Invalid fontSize value: "${style.fontSize}"`,
        value: style.fontSize,
        suggestion: `Use ACF font size token like "var(--acf-text-body3-size)"`,
      });
    }
  }
  
  // 验证阴影（只警告，不报错）
  if (style.boxShadow && typeof style.boxShadow === 'string' && !isValidElevationToken(style.boxShadow)) {
    warnings.push({
      path: `${path}.boxShadow`,
      message: `Custom boxShadow detected: "${style.boxShadow}"`,
      suggestion: `Consider using ACF elevation token like "var(--acf-elevation-1)"`,
    });
  }
  
  return autoFix ? fixedStyle : style;
}

// ============================================================================
// Block Validation
// ============================================================================

/**
 * 验证语义块
 */
function validateBlock(
  block: SemanticBlock,
  index: number,
  errors: ValidationError[],
  warnings: ValidationWarning[],
  autoFix: boolean
): SemanticBlock {
  const path = `blocks[${index}]`;
  const fixedBlock = { ...block };
  
  // 验证块样式
  if (block.style) {
    fixedBlock.style = validateStyle(block.style, `${path}.style`, errors, warnings, autoFix);
  }
  
  // 递归验证嵌套块
  if (block.type === 'card' && block.content.children) {
    fixedBlock.content = {
      ...block.content,
      children: block.content.children.map((child, childIndex) =>
        validateBlock(child, childIndex, errors, warnings, autoFix)
      ),
    };
  }
  
  if (block.type === 'custom' && block.content.children) {
    fixedBlock.content = {
      ...block.content,
      children: block.content.children.map((child, childIndex) =>
        validateBlock(child, childIndex, errors, warnings, autoFix)
      ),
    };
  }
  
  return fixedBlock as SemanticBlock;
}

// ============================================================================
// Main Validation Function
// ============================================================================

/**
 * 验证 SemanticA2UIDescriptor
 * 
 * @param descriptor - AI 生成的描述符
 * @param options - 验证选项
 * @returns 验证结果
 */
export function validateSemanticA2UI(
  descriptor: SemanticA2UIDescriptor,
  options: {
    autoFix?: boolean;  // 是否自动修复
    strict?: boolean;   // 严格模式（warnings 也视为 errors）
  } = {}
): ValidationResult {
  const { autoFix = true, strict = false } = options;
  
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // 验证版本
  if (descriptor.version !== '1.0') {
    warnings.push({
      path: 'version',
      message: `Unknown version: ${descriptor.version}`,
      suggestion: 'Use version "1.0"',
    });
  }
  
  // 验证 intent
  if (!descriptor.intent) {
    errors.push({
      path: 'intent',
      message: 'Missing required field: intent',
      suggestion: 'Add an intent object with primary, mood, and focus fields',
    });
  }
  
  // 验证 layout
  if (!descriptor.layout) {
    errors.push({
      path: 'layout',
      message: 'Missing required field: layout',
      suggestion: 'Add a layout object with type field',
    });
  } else if (descriptor.layout.gap && !isValidSpacingToken(descriptor.layout.gap)) {
    if (autoFix) {
      descriptor.layout.gap = fixSpacing(descriptor.layout.gap) as any;
      warnings.push({
        path: 'layout.gap',
        message: `Auto-fixed layout.gap`,
        suggestion: 'Use ACF spacing token',
      });
    } else {
      errors.push({
        path: 'layout.gap',
        message: `Invalid layout.gap value`,
        value: descriptor.layout.gap,
        suggestion: 'Use ACF spacing token',
      });
    }
  }
  
  // 验证 containerStyle
  const fixedContainerStyle = validateStyle(
    descriptor.containerStyle,
    'containerStyle',
    errors,
    warnings,
    autoFix
  );
  
  // 验证 blocks
  if (!descriptor.blocks || !Array.isArray(descriptor.blocks)) {
    errors.push({
      path: 'blocks',
      message: 'Missing or invalid blocks array',
      suggestion: 'Add an array of semantic blocks',
    });
  }
  
  const fixedBlocks = descriptor.blocks?.map((block, index) =>
    validateBlock(block, index, errors, warnings, autoFix)
  );
  
  // 验证最大宽度建议
  if (descriptor.layout?.maxWidth && descriptor.layout.maxWidth !== '1208px') {
    warnings.push({
      path: 'layout.maxWidth',
      message: `Non-standard maxWidth: ${descriptor.layout.maxWidth}`,
      suggestion: 'ACF recommends maxWidth of 1208px',
    });
  }
  
  // 构建修复后的描述符
  const fixedDescriptor: SemanticA2UIDescriptor = autoFix ? {
    ...descriptor,
    containerStyle: fixedContainerStyle,
    blocks: fixedBlocks || [],
  } : descriptor;
  
  // 在严格模式下，warnings 也算 errors
  const finalErrors = strict ? [...errors, ...warnings.map(w => ({
    path: w.path,
    message: w.message,
    suggestion: w.suggestion,
  }))] : errors;
  
  return {
    valid: finalErrors.length === 0,
    errors,
    warnings,
    fixedDescriptor: autoFix ? fixedDescriptor : undefined,
  };
}

// ============================================================================
// Quick Validation Helpers
// ============================================================================

/**
 * 快速检查样式是否合规
 */
export function isStyleCompliant(style: ACFCompliantStyle): boolean {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  validateStyle(style, 'style', errors, warnings, false);
  return errors.length === 0;
}

/**
 * 快速修复样式
 */
export function fixStyleTokens(style: ACFCompliantStyle): ACFCompliantStyle {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  return validateStyle(style, 'style', errors, warnings, true) || style;
}

/**
 * 获取合规性报告摘要
 */
export function getComplianceReport(result: ValidationResult): string {
  const lines: string[] = [];
  
  if (result.valid) {
    lines.push('✅ ACF Compliance: PASSED');
  } else {
    lines.push('❌ ACF Compliance: FAILED');
  }
  
  if (result.errors.length > 0) {
    lines.push(`\n🚫 Errors (${result.errors.length}):`);
    result.errors.forEach(e => {
      lines.push(`  - ${e.path}: ${e.message}`);
      if (e.suggestion) lines.push(`    → ${e.suggestion}`);
    });
  }
  
  if (result.warnings.length > 0) {
    lines.push(`\n⚠️ Warnings (${result.warnings.length}):`);
    result.warnings.forEach(w => {
      lines.push(`  - ${w.path}: ${w.message}`);
      if (w.suggestion) lines.push(`    → ${w.suggestion}`);
    });
  }
  
  return lines.join('\n');
}




