/**
 * Dynamic View Schema - 混合式动态布局
 * 
 * AI 自由组合多种区块，每次可能不同的组合方式
 */

import { z } from 'zod';

// ============================================================================
// Block Types - 各种可组合的区块
// ============================================================================

// Hero 区块
const HeroBlockSchema = z.object({
  type: z.literal('hero'),
  title: z.string(),
  subtitle: z.string().optional(),
  style: z.enum(['fullscreen', 'split', 'minimal', 'gradient']).default('split'),
});

// 可交互列表区块 (点击切换详情)
const InteractiveListBlockSchema = z.object({
  type: z.literal('interactive-list'),
  title: z.string().optional(),
  layout: z.enum(['sidebar', 'cards', 'horizontal']).default('sidebar'),
  items: z.array(z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    imageCount: z.number().default(2),
    stats: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    fact: z.string().optional(),
  })),
});

// Tabs 区块
const TabsBlockSchema = z.object({
  type: z.literal('tabs'),
  title: z.string().optional(),
  style: z.enum(['underline', 'pills', 'boxed']).default('underline'),
  tabs: z.array(z.object({
    id: z.string(),
    label: z.string(),
    content: z.string().optional(),
    imageCount: z.number().default(4),
    tags: z.array(z.string()).optional(),
  })),
});

// Timeline 区块
const TimelineBlockSchema = z.object({
  type: z.literal('timeline'),
  title: z.string().optional(),
  style: z.enum(['horizontal', 'vertical', 'dots']).default('horizontal'),
  events: z.array(z.object({
    id: z.string(),
    period: z.string(),
    title: z.string(),
    description: z.string().optional(),
    imageCount: z.number().default(2),
    mood: z.string().optional(),
  })),
});

// 图片网格区块
const GalleryBlockSchema = z.object({
  type: z.literal('gallery'),
  title: z.string().optional(),
  style: z.enum(['grid', 'masonry', 'featured', 'carousel']).default('grid'),
  columns: z.number().min(2).max(6).default(4),
  imageCount: z.number().min(2).max(12).default(6),
  labels: z.array(z.string()).optional(),
});

// 步骤区块
const StepsBlockSchema = z.object({
  type: z.literal('steps'),
  title: z.string().optional(),
  style: z.enum(['numbered', 'icons', 'cards']).default('numbered'),
  steps: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    imageCount: z.number().default(1),
    tip: z.string().optional(),
  })),
});

// 对比区块
const ComparisonBlockSchema = z.object({
  type: z.literal('comparison'),
  title: z.string().optional(),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    imageCount: z.number().default(1),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    stats: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
  })).min(2).max(4),
});

// 信息卡片区块
const InfoCardBlockSchema = z.object({
  type: z.literal('info-card'),
  style: z.enum(['tip', 'fact', 'warning', 'quote']).default('fact'),
  title: z.string().optional(),
  content: z.string(),
  icon: z.string().optional(),
});

// 统计数据区块
const StatsBlockSchema = z.object({
  type: z.literal('stats'),
  title: z.string().optional(),
  style: z.enum(['cards', 'inline', 'bars']).default('cards'),
  stats: z.array(z.object({
    label: z.string(),
    value: z.string(),
    icon: z.string().optional(),
    description: z.string().optional(),
  })),
});

// Accordion 区块
const AccordionBlockSchema = z.object({
  type: z.literal('accordion'),
  title: z.string().optional(),
  items: z.array(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    imageCount: z.number().default(1),
  })),
});

// 文字区块
const TextBlockSchema = z.object({
  type: z.literal('text'),
  style: z.enum(['paragraph', 'quote', 'callout']).default('paragraph'),
  content: z.string(),
});

// 分割线
const DividerBlockSchema = z.object({
  type: z.literal('divider'),
  style: z.enum(['line', 'space', 'dots']).default('space'),
});

// ============================================================================
// Union of all blocks
// ============================================================================

const BlockSchema = z.discriminatedUnion('type', [
  HeroBlockSchema,
  InteractiveListBlockSchema,
  TabsBlockSchema,
  TimelineBlockSchema,
  GalleryBlockSchema,
  StepsBlockSchema,
  ComparisonBlockSchema,
  InfoCardBlockSchema,
  StatsBlockSchema,
  AccordionBlockSchema,
  TextBlockSchema,
  DividerBlockSchema,
]);

export type Block = z.infer<typeof BlockSchema>;

// ============================================================================
// Dynamic View - 主结构
// ============================================================================

export const DynamicViewSchema = z.object({
  // AI 理解
  understanding: z.object({
    intent: z.string(),
    approach: z.string(), // AI 解释为什么选择这种组合
  }),
  
  // 全局设计
  design: z.object({
    theme: z.enum(['light', 'dark', 'warm', 'cool']).default('dark'),
    accentColor: z.string().default('#6366f1'),
    mood: z.string().optional(),
  }).optional(),
  
  // 区块数组 - AI 自由组合
  blocks: z.array(BlockSchema).min(1).max(10),
});

export type DynamicView = z.infer<typeof DynamicViewSchema>;

// ============================================================================
// Validation
// ============================================================================

export function validateDynamicView(input: unknown): {
  success: boolean;
  data?: DynamicView;
  errors: string[];
} {
  const result = DynamicViewSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }
  return { 
    success: false, 
    errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`) 
  };
}

// ============================================================================
// Auto-fix
// ============================================================================

export function autoFixDynamicView(input: any): DynamicView {
  // 确保基本结构
  const fixed: DynamicView = {
    understanding: {
      intent: input?.understanding?.intent || 'explore',
      approach: input?.understanding?.approach || 'visual exploration',
    },
    design: {
      theme: input?.design?.theme || 'dark',
      accentColor: input?.design?.accentColor || '#6366f1',
      mood: input?.design?.mood,
    },
    blocks: [],
  };
  
  // 处理 blocks
  if (Array.isArray(input?.blocks) && input.blocks.length > 0) {
    fixed.blocks = input.blocks.map((block: any, i: number) => {
      // 确保每个 block 有 type
      if (!block?.type) {
        return { type: 'gallery', imageCount: 6, title: `Section ${i + 1}` };
      }
      return block;
    }).filter((b: any) => b?.type);
  }
  
  // 如果没有 blocks，创建默认的
  if (fixed.blocks.length === 0) {
    fixed.blocks = [
      { type: 'hero', title: 'Gallery', style: 'minimal' },
      { type: 'gallery', imageCount: 8, style: 'grid', columns: 4 },
    ];
  }
  
  return fixed;
}

// ============================================================================
// Legacy Support
// ============================================================================

export interface AIDesign {
  title?: string;
  subtitle?: string;
  layout?: string;
  colorScheme?: string;
  mood?: string;
  sections?: Array<{ title?: string; images: number; labels?: string[] }>;
  showHero?: boolean;
  heroStyle?: string;
  content?: any;
  hero?: any;
  understanding?: any;
  design?: any;
}

export interface NavigationItem {
  id: string;
  title: string;
  subtitle?: string;
  content: {
    headline: string;
    description?: string;
    imageCount?: number;
    stats?: Array<{ label: string; value: string }>;
    facts?: string[];
    tags?: string[];
  };
}
