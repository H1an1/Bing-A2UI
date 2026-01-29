/**
 * Bing Image Search GenUI Validator v4 + Style Linter
 * 
 * 验证规则：
 * - 内容 Policy v4 规则
 * - 样式 linter (STYLE_CONTRACT)
 */

import { ImageSearchViewSchema, ImageSearchView, StyleSpec } from './schema';

// ============================================================================
// 类型定义
// ============================================================================

export interface ValidationResult {
  success: boolean;
  data?: ImageSearchView;
  errors: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  code: string;
}

// ============================================================================
// 禁止词列表
// ============================================================================

const BANNED_GROUP_WORDS = [
  'others', 'other', 'more', 'misc', 'miscellaneous',
  'general', 'stuff', 'various', 'mixed',
];

const BANNED_CATEGORY_MODIFIERS = [
  'popular', 'trending', 'nice', 'good', 'aesthetic', 'best', 'top',
];

// ============================================================================
// 验证函数
// ============================================================================

export function validateImageSearchView(input: unknown): ValidationResult {
  const result = ImageSearchViewSchema.safeParse(input);
  
  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }
  
  const errors: ValidationError[] = result.error.errors.map(err => ({
    path: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));
  
  return { success: false, errors };
}

/**
 * 格式化错误给 AI
 */
export function formatErrorsForAI(errors: ValidationError[]): string {
  if (errors.length === 0) return '';
  
  const lines = ['Your output has validation errors:', ''];
  errors.forEach((err, i) => {
    lines.push(`${i + 1}. "${err.path || 'root'}": ${err.message}`);
  });
  lines.push('', 'Please regenerate valid JSON.');
  return lines.join('\n');
}

// ============================================================================
// 自动修复
// ============================================================================

export function tryAutoFix(input: any): { fixed: any; autoFixApplied: string[] } {
  const autoFixApplied: string[] = [];
  const fixed = JSON.parse(JSON.stringify(input));
  
  // 1. 默认 browseMode
  if (!fixed.browseMode) {
    fixed.browseMode = 'browse';
    autoFixApplied.push('Set browseMode to "browse"');
  }
  
  // 2. 默认 showNormalGrid
  if (fixed.showNormalGrid === undefined) {
    fixed.showNormalGrid = true;
    autoFixApplied.push('Set showNormalGrid to true');
  }
  
  // 3. 非分组模式缺少 microSummary
  if (fixed.mode === 'non-grouped' && !fixed.microSummary) {
    fixed.microSummary = {
      text: 'Various images matching your search.',
    };
    autoFixApplied.push('Added default microSummary');
  }
  
  // 4. 分组模式不应有 microSummary (Text Layer Exclusivity)
  if (fixed.mode === 'grouped' && fixed.microSummary) {
    delete fixed.microSummary;
    autoFixApplied.push('Removed microSummary (Text Layer Exclusivity)');
  }
  
  // 5. 分组模式默认 groupStyle
  if (fixed.mode === 'grouped' && !fixed.groupStyle) {
    fixed.groupStyle = 'swimlane';
    autoFixApplied.push('Set groupStyle to "swimlane"');
  }
  
  // 6. 修复 group
  if (fixed.mode === 'grouped' && fixed.groups) {
    fixed.groups = fixed.groups.map((g: any, i: number) => {
      let id = g.id || `group-${i}`;
      let title = g.title || `Group ${i + 1}`;
      
      // 清理禁止词
      const words = title.toLowerCase().split(/\s+/);
      const hasBanned = words.some((w: string) =>
        BANNED_GROUP_WORDS.includes(w) || BANNED_CATEGORY_MODIFIERS.includes(w)
      );
      if (hasBanned) {
        title = id.replace(/-/g, ' ').replace(/^\w/, (c: string) => c.toUpperCase());
        autoFixApplied.push(`Replaced banned title with "${title}"`);
      }
      
      // 限制为 2 words
      const titleWords = title.split(/\s+/);
      if (titleWords.length > 2) {
        title = titleWords.slice(0, 2).join(' ');
        autoFixApplied.push(`Truncated title to 2 words: "${title}"`);
      }
      
      // Swimlane: 6-8 images
      let imageCount = g.imageCount || 8;
      if (fixed.groupStyle === 'swimlane') {
        imageCount = Math.min(Math.max(imageCount, 6), 8);
      }
      
      return { ...g, id, title, imageCount };
    });
    
    // 确保 ID 唯一
    const seenIds = new Set<string>();
    fixed.groups = fixed.groups.map((g: any, i: number) => {
      let id = g.id;
      while (seenIds.has(id)) {
        id = `${g.id}-${i}`;
      }
      seenIds.add(id);
      return { ...g, id };
    });
  }
  
  // 7. Focus 模式默认 focusConfig
  if (fixed.browseMode === 'focus' && !fixed.focusConfig) {
    fixed.focusConfig = { layout: 'hero-peek', heroCount: 1 };
    autoFixApplied.push('Added default focusConfig');
  }
  
  // 8. 默认 styleSpec
  if (!fixed.styleSpec) {
    fixed.styleSpec = {
      themeMode: 'light',
      stylePreset: 'clean',
      density: 'standard',
      surfaceTreatment: 'card',
      accentPolicy: 'neutral',
      imageTextPolicy: 'scrimRequired',
    };
    autoFixApplied.push('Added default styleSpec');
  }
  
  // 9. 修复 fromHeroImage accent policy
  if (fixed.styleSpec?.accentPolicy === 'fromHeroImage') {
    const preset = fixed.styleSpec?.stylePreset;
    if (preset !== 'immersive' && preset !== 'editorial') {
      fixed.styleSpec.accentPolicy = 'neutral';
      autoFixApplied.push('Changed accentPolicy to neutral (fromHeroImage only with immersive/editorial)');
    }
  }
  
  // 10. Focus 模式推荐 immersive
  if (fixed.browseMode === 'focus' && fixed.styleSpec?.stylePreset === 'clean') {
    fixed.styleSpec.stylePreset = 'immersive';
    fixed.styleSpec.surfaceTreatment = 'glass';
    fixed.styleSpec.density = 'airy';
    autoFixApplied.push('Changed stylePreset to immersive for Focus mode');
  }
  
  return { fixed, autoFixApplied };
}

/**
 * 验证 + 自动修复
 */
export function validateWithAutoFix(input: unknown): ValidationResult & { autoFixApplied: string[] } {
  let result = validateImageSearchView(input);
  
  if (result.success) {
    return { ...result, autoFixApplied: [] };
  }
  
  const { fixed, autoFixApplied } = tryAutoFix(input);
  result = validateImageSearchView(fixed);
  
  if (result.success) {
    console.log('🔧 Auto-fix applied:', autoFixApplied);
  }
  
  return { ...result, autoFixApplied };
}

// ============================================================================
// Policy 合规检查 v4
// ============================================================================

export function checkPolicyCompliance(view: ImageSearchView): string[] {
  const warnings: string[] = [];
  
  // === 内容规则 ===
  
  // 1. 微摘要检查
  if (view.mode === 'non-grouped' && view.microSummary) {
    const text = view.microSummary.text;
    
    if (/\b(19|20)\d{2}\b/.test(text)) {
      warnings.push('Micro-summary contains year - avoid verifiable facts');
    }
    
    if (/\b(is|was|are)\s+(a|an|the)\s+/i.test(text)) {
      warnings.push('Micro-summary may assert identity - use observable phenomena only');
    }
    
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 20) {
      warnings.push(`Micro-summary has ${wordCount} words (max 20)`);
    }
  }
  
  // 2. 分组标题检查
  if (view.mode === 'grouped' && view.groups) {
    for (const group of view.groups) {
      const words = group.title.toLowerCase().split(/\s+/);
      
      for (const word of words) {
        if (BANNED_GROUP_WORDS.includes(word)) {
          warnings.push(`Group "${group.title}" contains banned word "${word}"`);
        }
        if (BANNED_CATEGORY_MODIFIERS.includes(word)) {
          warnings.push(`Group "${group.title}" contains banned modifier "${word}"`);
        }
      }
      
      if (words.length > 2) {
        warnings.push(`Group "${group.title}" exceeds 2 words`);
      }
    }
    
    const titles = view.groups.map(g => g.title.toLowerCase());
    if (new Set(titles).size !== titles.length) {
      warnings.push('Group titles are not mutually exclusive');
    }
  }
  
  // 3. Swimlane 图片数量
  if (view.mode === 'grouped' && view.groupStyle === 'swimlane' && view.groups) {
    for (const group of view.groups) {
      if (group.imageCount < 6 || group.imageCount > 8) {
        warnings.push(`Swimlane group "${group.title}" has ${group.imageCount} images (should be 6-8)`);
      }
    }
  }
  
  // 4. Focus 模式检查
  if (view.browseMode === 'focus' && !view.focusConfig) {
    warnings.push('Focus mode requires focusConfig');
  }
  
  // 5. 分组后网格
  if (view.mode === 'grouped' && view.showNormalGrid === false) {
    warnings.push('Grouped mode must be followed by normal results grid');
  }
  
  // === 样式规则 (Style Linter) ===
  
  if (view.styleSpec) {
    const style = view.styleSpec;
    
    // 6. fromHeroImage 只能配合 immersive/editorial
    if (style.accentPolicy === 'fromHeroImage') {
      if (style.stylePreset !== 'immersive' && style.stylePreset !== 'editorial') {
        warnings.push('fromHeroImage accent only allowed with immersive/editorial preset');
      }
    }
    
    // 7. Focus 模式推荐 immersive
    if (view.browseMode === 'focus' && style.stylePreset === 'clean') {
      warnings.push('Focus mode usually benefits from immersive or editorial preset');
    }
    
    // 8. 分组模式 + glass 推荐 dark theme
    if (view.mode === 'grouped' && style.surfaceTreatment === 'glass' && style.themeMode === 'light') {
      warnings.push('Glass surface treatment often looks better with dark theme');
    }
  }
  
  return warnings;
}

// ============================================================================
// Style Linter (HOW_TO_USE 定义的检查)
// ============================================================================

export interface StyleLintResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * 样式 Linter
 * 
 * 检查规则 (来自 HOW_TO_USE.md):
 * 1. 不能有原始 CSS 值 (hex, px)
 * 2. 图片上的文字必须有 scrim
 * 3. accent 不能用于大面积
 * 4. 最多 3 个排版层级
 * 5. hover 标签必须单行省略
 */
export function runStyleLinter(styleSpec: StyleSpec): StyleLintResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // 检查是否包含原始 CSS 值
  const styleString = JSON.stringify(styleSpec);
  
  // 检查 hex 颜色
  if (/#[0-9a-fA-F]{3,8}\b/.test(styleString)) {
    errors.push('Raw CSS value detected: hex color. Use semantic roles only.');
  }
  
  // 检查 px 值
  if (/\d+px\b/.test(styleString)) {
    errors.push('Raw CSS value detected: px unit. Use semantic roles only.');
  }
  
  // imageTextPolicy 必须是 scrimRequired
  if (styleSpec.imageTextPolicy !== 'scrimRequired') {
    errors.push('imageTextPolicy must be "scrimRequired"');
  }
  
  // accentPolicy 验证
  if (styleSpec.accentPolicy === 'fromHeroImage') {
    if (styleSpec.stylePreset !== 'immersive' && styleSpec.stylePreset !== 'editorial') {
      errors.push('fromHeroImage accent only allowed with immersive/editorial preset');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
