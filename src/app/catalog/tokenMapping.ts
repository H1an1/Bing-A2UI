/**
 * Token Mapping - 语义槽位 → 设计 Token
 * 
 * AI 输出语义意图 (styleSpec)，这里映射到实际 CSS 值
 * Renderer 使用这些 token 而不是硬编码值
 */

import { StyleSpec, StylePreset, ThemeMode, Density, SurfaceTreatment } from './schema';

// ============================================================================
// Design Tokens
// ============================================================================

export interface DesignTokens {
  // Typography
  typography: {
    heroTitle: { fontSize: string; fontWeight: number; lineHeight: number };
    sectionTitle: { fontSize: string; fontWeight: number; lineHeight: number };
    body: { fontSize: string; fontWeight: number; lineHeight: number };
    meta: { fontSize: string; fontWeight: number; lineHeight: number };
  };
  
  // Colors
  color: {
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    surface: {
      page: string;
      module: string;
      overlay: string;
    };
    stroke: {
      subtle: string;
    };
    accent: {
      active: string;
    };
    onImage: {
      text: string;
      scrim: string;
    };
  };
  
  // Shape
  radius: {
    ctrl: string;
    card: string;
  };
  
  // Elevation
  elevation: {
    0: string;
    1: string;
    2: string;
    3: string;
  };
  
  // Spacing
  gap: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  
  pad: {
    card: string;
    ctrl: string;
  };
  
  // Transition
  transition: {
    fast: string;
    base: string;
  };
}

// ============================================================================
// Light Theme Tokens
// ============================================================================

const lightTokens: DesignTokens = {
  typography: {
    heroTitle: { fontSize: '32px', fontWeight: 700, lineHeight: 1.2 },
    sectionTitle: { fontSize: '16px', fontWeight: 600, lineHeight: 1.4 },
    body: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5 },
    meta: { fontSize: '11px', fontWeight: 400, lineHeight: 1.4 },
  },
  color: {
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
    },
    surface: {
      page: '#ffffff',
      module: '#f9fafb',
      overlay: 'rgba(255, 255, 255, 0.85)',
    },
    stroke: {
      subtle: '#e5e7eb',
    },
    accent: {
      active: '#0ea5e9',
    },
    onImage: {
      text: '#ffffff',
      scrim: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
    },
  },
  radius: {
    ctrl: '6px',
    card: '12px',
  },
  elevation: {
    0: 'none',
    1: '0 1px 3px rgba(0, 0, 0, 0.1)',
    2: '0 4px 6px rgba(0, 0, 0, 0.1)',
    3: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  gap: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
  pad: {
    card: '16px',
    ctrl: '8px',
  },
  transition: {
    fast: '0.15s ease',
    base: '0.2s ease',
  },
};

// ============================================================================
// Dark Theme Tokens
// ============================================================================

const darkTokens: DesignTokens = {
  typography: lightTokens.typography, // Same typography
  color: {
    text: {
      primary: '#f9fafb',
      secondary: '#9ca3af',
      tertiary: '#6b7280',
    },
    surface: {
      page: '#111827',
      module: '#1f2937',
      overlay: 'rgba(31, 41, 55, 0.9)',
    },
    stroke: {
      subtle: '#374151',
    },
    accent: {
      active: '#38bdf8',
    },
    onImage: {
      text: '#ffffff',
      scrim: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
    },
  },
  radius: lightTokens.radius,
  elevation: {
    0: 'none',
    1: '0 1px 3px rgba(0, 0, 0, 0.3)',
    2: '0 4px 6px rgba(0, 0, 0, 0.3)',
    3: '0 10px 15px rgba(0, 0, 0, 0.4)',
  },
  gap: lightTokens.gap,
  pad: lightTokens.pad,
  transition: lightTokens.transition,
};

// ============================================================================
// Preset Modifiers
// ============================================================================

interface PresetModifiers {
  density: Density;
  surfaceElevation: 0 | 1 | 2 | 3;
  gapMultiplier: number;
  padMultiplier: number;
}

const presetModifiers: Record<StylePreset, PresetModifiers> = {
  clean: {
    density: 'standard',
    surfaceElevation: 1,
    gapMultiplier: 1,
    padMultiplier: 1,
  },
  immersive: {
    density: 'airy',
    surfaceElevation: 2,
    gapMultiplier: 1.25,
    padMultiplier: 1.25,
  },
  editorial: {
    density: 'airy',
    surfaceElevation: 1,
    gapMultiplier: 1.5,
    padMultiplier: 1.25,
  },
  data: {
    density: 'standard',
    surfaceElevation: 1,
    gapMultiplier: 1,
    padMultiplier: 1,
  },
};

// ============================================================================
// Density Modifiers
// ============================================================================

const densityModifiers: Record<Density, number> = {
  dense: 0.75,
  standard: 1,
  airy: 1.25,
};

// ============================================================================
// Token Resolver
// ============================================================================

export interface ResolvedTokens extends DesignTokens {
  // Additional computed values
  computed: {
    moduleBackground: string;
    moduleElevation: string;
    moduleRadius: string;
  };
}

/**
 * 根据 StyleSpec 解析设计 Token
 */
export function resolveTokens(styleSpec: StyleSpec): ResolvedTokens {
  // 1. 选择主题
  const baseTokens = styleSpec.themeMode === 'dark' ? darkTokens : lightTokens;
  
  // 2. 获取预设修改器
  const preset = presetModifiers[styleSpec.stylePreset];
  
  // 3. 获取密度修改器
  const densityMod = densityModifiers[styleSpec.density];
  
  // 4. 计算间距
  const gapMod = preset.gapMultiplier * densityMod;
  const padMod = preset.padMultiplier * densityMod;
  
  const computedGap = {
    xs: `${Math.round(4 * gapMod)}px`,
    sm: `${Math.round(8 * gapMod)}px`,
    md: `${Math.round(12 * gapMod)}px`,
    lg: `${Math.round(16 * gapMod)}px`,
  };
  
  const computedPad = {
    card: `${Math.round(16 * padMod)}px`,
    ctrl: `${Math.round(8 * padMod)}px`,
  };
  
  // 5. 计算表面处理
  let moduleBackground: string;
  let moduleElevation: string;
  let moduleRadius: string;
  
  switch (styleSpec.surfaceTreatment) {
    case 'flat':
      moduleBackground = 'transparent';
      moduleElevation = baseTokens.elevation[0];
      moduleRadius = '0';
      break;
    case 'glass':
      moduleBackground = baseTokens.color.surface.overlay;
      moduleElevation = baseTokens.elevation[2];
      moduleRadius = baseTokens.radius.card;
      break;
    case 'card':
    default:
      moduleBackground = baseTokens.color.surface.module;
      moduleElevation = baseTokens.elevation[preset.surfaceElevation];
      moduleRadius = baseTokens.radius.card;
      break;
  }
  
  return {
    ...baseTokens,
    gap: computedGap,
    pad: computedPad,
    computed: {
      moduleBackground,
      moduleElevation,
      moduleRadius,
    },
  };
}

// ============================================================================
// Default StyleSpec
// ============================================================================

export const defaultStyleSpec: StyleSpec = {
  themeMode: 'light',
  stylePreset: 'clean',
  density: 'standard',
  surfaceTreatment: 'card',
  accentPolicy: 'neutral',
  imageTextPolicy: 'scrimRequired',
};

// ============================================================================
// Style Utilities
// ============================================================================

/**
 * 生成 CSS 变量对象
 */
export function generateCSSVariables(tokens: ResolvedTokens): Record<string, string> {
  return {
    '--text-primary': tokens.color.text.primary,
    '--text-secondary': tokens.color.text.secondary,
    '--text-tertiary': tokens.color.text.tertiary,
    '--surface-page': tokens.color.surface.page,
    '--surface-module': tokens.color.surface.module,
    '--surface-overlay': tokens.color.surface.overlay,
    '--stroke-subtle': tokens.color.stroke.subtle,
    '--accent-active': tokens.color.accent.active,
    '--on-image-text': tokens.color.onImage.text,
    '--on-image-scrim': tokens.color.onImage.scrim,
    '--radius-ctrl': tokens.radius.ctrl,
    '--radius-card': tokens.radius.card,
    '--elevation-module': tokens.computed.moduleElevation,
    '--gap-xs': tokens.gap.xs,
    '--gap-sm': tokens.gap.sm,
    '--gap-md': tokens.gap.md,
    '--gap-lg': tokens.gap.lg,
    '--pad-card': tokens.pad.card,
    '--pad-ctrl': tokens.pad.ctrl,
    '--transition-fast': tokens.transition.fast,
    '--transition-base': tokens.transition.base,
  };
}




