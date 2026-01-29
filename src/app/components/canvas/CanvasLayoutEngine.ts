/**
 * CanvasLayoutEngine - AI动态布局生成引擎
 * 
 * 基于 Magazine Grid System (1208px × 424px, 11列 × 4行)
 * 根据查询语义动态生成独特的网格布局
 */

// ============================================================================
// Types
// ============================================================================

export type CellType = 'hero' | 'gallery' | 'info' | 'stats' | 'list' | 'feature';

export type CanvasStyle = 'dramatic' | 'balanced' | 'asymmetric' | 'mosaic' | 'cinematic';

export interface CanvasCell {
  id: string;
  x: number;        // 列位置 (0-10)
  y: number;        // 行位置 (0-3)
  width: number;    // 占用列数 (2-6)
  height: number;   // 占用行数 (2-4)
  type: CellType;
  variant: string;
  content?: {
    title?: string;
    description?: string;
    imageIndex?: number;
    tags?: string[];
  };
}

export interface CanvasLayout {
  cells: CanvasCell[];
  style: CanvasStyle;
  colorScheme: 'light' | 'dark' | 'vibrant' | 'monochrome';
  animationStyle: 'stagger' | 'cascade' | 'burst' | 'wave';
}

export interface QueryIntent {
  category: 'art' | 'product' | 'travel' | 'food' | 'entertainment' | 'comparison' | 'tutorial' | 'general';
  keywords: string[];
  sentiment: 'exploratory' | 'informational' | 'comparative' | 'creative';
}

// ============================================================================
// Magazine Grid Constants (from Guidelines_M2.md)
// ============================================================================

// 画布实际可用宽度 = 1208 - 48 (padding) = 1160px
const CANVAS = {
  WIDTH: 1160,        // 可用宽度 (去掉padding后)
  HEIGHT: 400,        // 高度
  COLUMNS: 10,        // 简化为10列更容易计算
  ROWS: 4,
  GAP: 8
};

// Standard card sizes from ACF Magazine system
const CARD_SIZES = {
  '2x2': { width: 2, height: 2, px: { w: 200, h: 200 } },
  '3x2': { width: 3, height: 2, px: { w: 312, h: 200 } },
  '2x4': { width: 2, height: 4, px: { w: 200, h: 424 } },
  '3x4': { width: 3, height: 4, px: { w: 312, h: 424 } },
  '4x4': { width: 4, height: 4, px: { w: 424, h: 424 } },
  '5x2': { width: 5, height: 2, px: { w: 536, h: 200 } },
  '5x4': { width: 5, height: 4, px: { w: 536, h: 424 } },
  '6x2': { width: 6, height: 2, px: { w: 648, h: 200 } },
  '6x4': { width: 6, height: 4, px: { w: 648, h: 424 } },
};

// ============================================================================
// Query Intent Analysis
// ============================================================================

export function analyzeQueryIntent(query: string): QueryIntent {
  const q = query.toLowerCase();
  
  // Art/Creative
  if (/art|artist|painting|museum|gallery|design|creative|aesthetic/.test(q)) {
    return {
      category: 'art',
      keywords: extractKeywords(q, ['art', 'painting', 'artist', 'style', 'period']),
      sentiment: 'creative'
    };
  }
  
  // Product/Comparison
  if (/vs|versus|compare|comparison|review|best|top \d+|iphone|samsung|product/.test(q)) {
    return {
      category: 'comparison',
      keywords: extractKeywords(q, ['vs', 'compare', 'best', 'review']),
      sentiment: 'comparative'
    };
  }
  
  // Travel/Location
  if (/travel|city|visit|tour|destination|hotel|flight|tokyo|paris|london/.test(q)) {
    return {
      category: 'travel',
      keywords: extractKeywords(q, ['travel', 'city', 'visit', 'destination']),
      sentiment: 'exploratory'
    };
  }
  
  // Food
  if (/food|recipe|restaurant|cuisine|cook|eat|dish|meal|street food/.test(q)) {
    return {
      category: 'food',
      keywords: extractKeywords(q, ['food', 'recipe', 'restaurant', 'cuisine']),
      sentiment: 'exploratory'
    };
  }
  
  // Entertainment
  if (/movie|film|music|game|show|series|netflix|spotify|concert/.test(q)) {
    return {
      category: 'entertainment',
      keywords: extractKeywords(q, ['movie', 'music', 'game', 'show']),
      sentiment: 'exploratory'
    };
  }
  
  // Tutorial
  if (/how to|tutorial|guide|learn|step|diy|make|build/.test(q)) {
    return {
      category: 'tutorial',
      keywords: extractKeywords(q, ['how', 'tutorial', 'guide', 'step']),
      sentiment: 'informational'
    };
  }
  
  // Default
  return {
    category: 'general',
    keywords: q.split(' ').filter(w => w.length > 3),
    sentiment: 'exploratory'
  };
}

function extractKeywords(query: string, seedWords: string[]): string[] {
  const words = query.split(/\s+/);
  return words.filter(w => w.length > 2 && !['the', 'and', 'for', 'with'].includes(w));
}

// ============================================================================
// Layout Templates (激进版本)
// ============================================================================

/**
 * Template: Dramatic Hero
 * 紧凑的信息密集布局 (10列)
 * 
 * ┌───────┬───┬───┬───┬───┐
 * │       │   │   │       │
 * │  4x4  │2x2│2x2│  2x4  │
 * │ HERO  ├───┼───┤ INFO  │
 * │       │2x2│2x2│       │
 * └───────┴───┴───┴───────┘
 */
function createDramaticHeroLayout(intent: QueryIntent): CanvasCell[] {
  return [
    { id: 'hero', x: 0, y: 0, width: 4, height: 4, type: 'hero', variant: 'cinematic' },
    { id: 'gallery-1', x: 4, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'gallery-2', x: 6, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'info-1', x: 8, y: 0, width: 2, height: 4, type: 'info', variant: 'card' },
    { id: 'gallery-3', x: 4, y: 2, width: 2, height: 2, type: 'gallery', variant: 'poster' },
    { id: 'gallery-4', x: 6, y: 2, width: 2, height: 2, type: 'gallery', variant: 'tile' },
  ];
}

/**
 * Template: Mosaic Gallery
 * 密集的马赛克布局 - 艺术类最佳 (10列)
 * 
 * ┌───┬───┬───────┬───┬───┐
 * │2x2│2x2│       │2x2│2x2│
 * ├───┼───┤  4x4  ├───┼───┤
 * │2x2│2x2│ HERO  │2x2│2x2│
 * └───┴───┴───────┴───┴───┘
 */
function createMosaicLayout(intent: QueryIntent): CanvasCell[] {
  return [
    // 左侧
    { id: 'tile-1', x: 0, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'tile-2', x: 2, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'tile-3', x: 0, y: 2, width: 2, height: 2, type: 'gallery', variant: 'poster' },
    { id: 'tile-4', x: 2, y: 2, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    // 中间 Hero
    { id: 'hero', x: 4, y: 0, width: 4, height: 4, type: 'hero', variant: 'immersive' },
    // 右侧
    { id: 'tile-5', x: 8, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'info', x: 8, y: 2, width: 2, height: 2, type: 'info', variant: 'card' },
  ];
}

/**
 * Template: Asymmetric Split
 * 不对称的分割布局 (10列)
 * 
 * ┌───────┬───┬───┬───┬───┐
 * │       │   │   │   │   │
 * │  4x4  │2x2│2x2│ 2x4  │
 * │ HERO  ├───┼───┤ INFO │
 * │       │2x2│2x2│      │
 * └───────┴───┴───┴──────┘
 */
function createAsymmetricLayout(intent: QueryIntent): CanvasCell[] {
  return [
    { id: 'hero', x: 0, y: 0, width: 4, height: 4, type: 'hero', variant: 'dramatic' },
    // 中间网格
    { id: 'tile-1', x: 4, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'tile-2', x: 6, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'tile-3', x: 4, y: 2, width: 2, height: 2, type: 'gallery', variant: 'poster' },
    { id: 'tile-4', x: 6, y: 2, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    // 右侧 Info
    { id: 'info', x: 8, y: 0, width: 2, height: 4, type: 'info', variant: 'card' },
  ];
}

/**
 * Template: Comparison Split
 * 对称的对比布局 (10列)
 * 
 * ┌─────────┬───────────┐
 * │         │           │
 * │   5x4   │    5x4    │
 * │  LEFT   │   RIGHT   │
 * │         │           │
 * └─────────┴───────────┘
 */
function createComparisonLayout(intent: QueryIntent): CanvasCell[] {
  return [
    { id: 'left', x: 0, y: 0, width: 5, height: 4, type: 'hero', variant: 'compare-left' },
    { id: 'right', x: 5, y: 0, width: 5, height: 4, type: 'hero', variant: 'compare-right' },
  ];
}

/**
 * Template: Cinematic
 * 电影感布局 - 紧凑的海报墙 (10列)
 * 
 * ┌─────────────────────────────┐
 * │          10x2 HERO          │
 * ├───┬───┬───┬───┬───┬───┬───┬─┤
 * │ P │ P │INFO│ P │ P │       │
 * └───┴───┴───┴───┴───┴───────┘
 */
function createCinematicLayout(intent: QueryIntent): CanvasCell[] {
  return [
    { id: 'banner', x: 0, y: 0, width: 10, height: 2, type: 'hero', variant: 'cinematic-wide' },
    // 底部海报墙
    { id: 'poster-1', x: 0, y: 2, width: 2, height: 2, type: 'gallery', variant: 'poster' },
    { id: 'poster-2', x: 2, y: 2, width: 2, height: 2, type: 'gallery', variant: 'poster' },
    { id: 'info', x: 4, y: 2, width: 2, height: 2, type: 'info', variant: 'card' },
    { id: 'poster-3', x: 6, y: 2, width: 2, height: 2, type: 'gallery', variant: 'poster' },
    { id: 'poster-4', x: 8, y: 2, width: 2, height: 2, type: 'gallery', variant: 'poster' },
  ];
}

/**
 * Template: Cascade
 * 瀑布流感觉的布局 (10列)
 * 
 * ┌───┬───────────┬───┬───┐
 * │   │           │   │   │
 * │2x4│   6x4     │2x2│2x2│
 * │LST│   HERO    ├───┼───┤
 * │   │           │2x2│2x2│
 * └───┴───────────┴───┴───┘
 */
function createCascadeLayout(intent: QueryIntent): CanvasCell[] {
  return [
    { id: 'sidebar', x: 0, y: 0, width: 2, height: 4, type: 'list', variant: 'vertical' },
    { id: 'hero', x: 2, y: 0, width: 4, height: 4, type: 'hero', variant: 'featured' },
    // 右侧网格
    { id: 'tile-1', x: 6, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'tile-2', x: 8, y: 0, width: 2, height: 2, type: 'gallery', variant: 'tile' },
    { id: 'info', x: 6, y: 2, width: 2, height: 2, type: 'info', variant: 'card' },
    { id: 'tile-3', x: 8, y: 2, width: 2, height: 2, type: 'gallery', variant: 'poster' },
  ];
}

// ============================================================================
// Main Layout Generator
// ============================================================================

export function generateCanvasLayout(query: string, imageCount: number = 8): CanvasLayout {
  const intent = analyzeQueryIntent(query);
  
  let cells: CanvasCell[];
  let style: CanvasStyle;
  let colorScheme: CanvasLayout['colorScheme'];
  let animationStyle: CanvasLayout['animationStyle'];
  
  // 根据查询意图选择布局
  switch (intent.category) {
    case 'art':
      cells = createMosaicLayout(intent);
      style = 'mosaic';
      colorScheme = 'monochrome';
      animationStyle = 'cascade';
      break;
      
    case 'comparison':
      cells = createComparisonLayout(intent);
      style = 'balanced';
      colorScheme = 'light';
      animationStyle = 'burst';
      break;
      
    case 'travel':
      cells = createDramaticHeroLayout(intent);
      style = 'dramatic';
      colorScheme = 'vibrant';
      animationStyle = 'wave';
      break;
      
    case 'food':
      cells = createMosaicLayout(intent);
      style = 'mosaic';
      colorScheme = 'vibrant';
      animationStyle = 'stagger';
      break;
      
    case 'entertainment':
      cells = createCinematicLayout(intent);
      style = 'cinematic';
      colorScheme = 'dark';
      animationStyle = 'cascade';
      break;
      
    case 'tutorial':
      cells = createCascadeLayout(intent);
      style = 'balanced';
      colorScheme = 'light';
      animationStyle = 'stagger';
      break;
      
    default:
      // 随机选择一个激进布局
      const layouts = [
        createDramaticHeroLayout,
        createAsymmetricLayout,
        createCascadeLayout,
        createCinematicLayout
      ];
      const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];
      cells = randomLayout(intent);
      style = 'asymmetric';
      colorScheme = 'light';
      animationStyle = 'stagger';
  }
  
  // 为每个cell分配图片索引
  cells = cells.map((cell, index) => ({
    ...cell,
    content: {
      imageIndex: index % imageCount
    }
  }));
  
  return { cells, style, colorScheme, animationStyle };
}

// ============================================================================
// Utility: Calculate pixel dimensions
// ============================================================================

export function getCellPixelDimensions(cell: CanvasCell): { width: number; height: number } {
  // 10列布局，可用宽度1160px，高度400px
  // 单元格宽度 = (1160 - 9*8) / 10 = (1160 - 72) / 10 = 108.8px
  // 单元格高度 = (400 - 3*8) / 4 = (400 - 24) / 4 = 94px
  const unitWidth = (CANVAS.WIDTH - (CANVAS.COLUMNS - 1) * CANVAS.GAP) / CANVAS.COLUMNS;
  const unitHeight = (CANVAS.HEIGHT - (CANVAS.ROWS - 1) * CANVAS.GAP) / CANVAS.ROWS;
  
  return {
    width: cell.width * unitWidth + (cell.width - 1) * CANVAS.GAP,
    height: cell.height * unitHeight + (cell.height - 1) * CANVAS.GAP
  };
}

export function getCellPosition(cell: CanvasCell): { left: number; top: number } {
  const unitWidth = (CANVAS.WIDTH - (CANVAS.COLUMNS - 1) * CANVAS.GAP) / CANVAS.COLUMNS;
  const unitHeight = (CANVAS.HEIGHT - (CANVAS.ROWS - 1) * CANVAS.GAP) / CANVAS.ROWS;
  
  return {
    left: cell.x * (unitWidth + CANVAS.GAP),
    top: cell.y * (unitHeight + CANVAS.GAP)
  };
}

export { CANVAS, CARD_SIZES };

