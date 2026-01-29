/**
 * Intelligent Dynamic View Engine
 * 更智能的意图分析和组件生成系统
 * 
 * 核心能力：
 * 1. 多意图融合 - 一个查询可以触发多个意图
 * 2. 动态属性生成 - 从查询中提取参数
 * 3. 组件变体 - 同一组件不同形态
 * 4. 创造性布局 - 智能组合组件
 * 5. 上下文感知 - 记住对话历史
 */

// ============================================================================
// 类型定义
// ============================================================================

export type IntentType = 
  | 'timeline'        // 时间相关
  | 'location'        // 地点相关
  | 'howto'          // 步骤/教程
  | 'entity'         // 实体/物品
  | 'comparison'     // 对比
  | 'evolution'      // 演变/历史
  | 'exploration'    // 探索/分类
  | 'gallery'        // 图片集
  | 'detail'         // 详情
  | 'list';          // 列表

export type LayoutMode = 
  | 'single'         // 单一组件
  | 'stacked'        // 垂直堆叠
  | 'side-by-side'   // 并排对比
  | 'hero-detail'    // 主图+详情
  | 'grid-list'      // 网格+列表
  | 'timeline-map'   // 时间轴+地图
  | 'comparison';    // 对比布局

export type ComponentVariant = 
  | 'default'
  | 'compact'
  | 'expanded'
  | 'comparison'
  | 'mini'
  | 'hero';

export interface ExtractedEntity {
  type: 'person' | 'place' | 'thing' | 'time' | 'event' | 'concept';
  value: string;
  confidence: number;
}

export interface ExtractedTimeRange {
  start?: number;
  end?: number;
  period?: string;
}

export interface ExtractedLocation {
  name: string;
  type: 'city' | 'country' | 'landmark' | 'region';
}

export interface MultiIntentAnalysis {
  primaryIntent: IntentType;
  secondaryIntents: IntentType[];
  confidence: number;
  entities: ExtractedEntity[];
  timeRange?: ExtractedTimeRange;
  locations: ExtractedLocation[];
  keywords: string[];
  suggestedLayout: LayoutMode;
  reasoning: string;
}

export interface DynamicComponentConfig {
  componentType: string;
  variant: ComponentVariant;
  props: Record<string, any>;
  position: 'primary' | 'secondary' | 'sidebar' | 'footer';
  size: 'full' | 'half' | 'third' | 'quarter';
  priority: number;
}

export interface IntelligentLayout {
  mode: LayoutMode;
  components: DynamicComponentConfig[];
  transitions: string[];
  contextHint: string;
}

// ============================================================================
// 实体提取器
// ============================================================================

const KNOWN_ARTISTS = ['picasso', 'monet', 'van gogh', 'da vinci', 'rembrandt', 'warhol', 'dali', 'matisse'];
const KNOWN_CITIES = ['paris', 'tokyo', 'kyoto', 'london', 'new york', 'rome', 'beijing', 'los angeles', 'hong kong', 'barcelona'];
const KNOWN_COUNTRIES = ['japan', 'france', 'italy', 'china', 'usa', 'uk', 'spain', 'germany'];
const TIME_PERIODS = ['period', 'era', 'century', 'decade', 'year', 'ancient', 'modern', 'classical', 'renaissance', 'medieval'];
const COMPARISON_WORDS = ['compare', 'vs', 'versus', 'difference', 'between', 'comparison'];
const EVOLUTION_WORDS = ['evolution', 'history', 'change', 'over time', 'development', 'progress', 'transform'];
const HOWTO_WORDS = ['how to', 'how do', 'recipe', 'tutorial', 'guide', 'step', 'instructions', 'make', 'create', 'build'];

export function extractEntities(query: string): ExtractedEntity[] {
  const lowerQuery = query.toLowerCase();
  const entities: ExtractedEntity[] = [];

  // 提取艺术家
  KNOWN_ARTISTS.forEach(artist => {
    if (lowerQuery.includes(artist)) {
      entities.push({ type: 'person', value: artist, confidence: 0.9 });
    }
  });

  // 提取城市
  KNOWN_CITIES.forEach(city => {
    if (lowerQuery.includes(city)) {
      entities.push({ type: 'place', value: city, confidence: 0.9 });
    }
  });

  // 提取国家
  KNOWN_COUNTRIES.forEach(country => {
    if (lowerQuery.includes(country)) {
      entities.push({ type: 'place', value: country, confidence: 0.85 });
    }
  });

  // 提取年份
  const yearMatch = lowerQuery.match(/\b(1[0-9]{3}|20[0-2][0-9])\b/g);
  if (yearMatch) {
    yearMatch.forEach(year => {
      entities.push({ type: 'time', value: year, confidence: 0.95 });
    });
  }

  // 提取时期
  TIME_PERIODS.forEach(period => {
    if (lowerQuery.includes(period)) {
      entities.push({ type: 'time', value: period, confidence: 0.8 });
    }
  });

  return entities;
}

export function extractTimeRange(query: string): ExtractedTimeRange | undefined {
  const lowerQuery = query.toLowerCase();
  
  // 提取年份范围 (e.g., "from 2007 to 2024")
  const rangeMatch = lowerQuery.match(/from\s+(\d{4})\s+to\s+(\d{4})/);
  if (rangeMatch) {
    return { start: parseInt(rangeMatch[1]), end: parseInt(rangeMatch[2]) };
  }

  // 提取单个年份范围 (e.g., "2007-2024")
  const dashMatch = lowerQuery.match(/(\d{4})\s*[-–]\s*(\d{4})/);
  if (dashMatch) {
    return { start: parseInt(dashMatch[1]), end: parseInt(dashMatch[2]) };
  }

  // 提取时期名称
  const periodPatterns = [
    { pattern: /blue\s*period/i, period: 'Blue Period', start: 1901, end: 1904 },
    { pattern: /rose\s*period/i, period: 'Rose Period', start: 1904, end: 1906 },
    { pattern: /cubism/i, period: 'Cubism', start: 1907, end: 1920 },
    { pattern: /renaissance/i, period: 'Renaissance', start: 1400, end: 1600 },
    { pattern: /modern\s*era/i, period: 'Modern Era', start: 1900, end: 2000 },
  ];

  for (const { pattern, period, start, end } of periodPatterns) {
    if (pattern.test(lowerQuery)) {
      return { period, start, end };
    }
  }

  return undefined;
}

export function extractLocations(query: string): ExtractedLocation[] {
  const lowerQuery = query.toLowerCase();
  const locations: ExtractedLocation[] = [];

  KNOWN_CITIES.forEach(city => {
    if (lowerQuery.includes(city)) {
      locations.push({ name: city, type: 'city' });
    }
  });

  KNOWN_COUNTRIES.forEach(country => {
    if (lowerQuery.includes(country)) {
      locations.push({ name: country, type: 'country' });
    }
  });

  // 特定地标
  const landmarks = ['eiffel tower', 'louvre', 'golden gate', 'big ben', 'colosseum', 'great wall'];
  landmarks.forEach(landmark => {
    if (lowerQuery.includes(landmark)) {
      locations.push({ name: landmark, type: 'landmark' });
    }
  });

  return locations;
}

// ============================================================================
// 多意图分析器
// ============================================================================

export function analyzeMultiIntent(query: string): MultiIntentAnalysis {
  const lowerQuery = query.toLowerCase();
  const intents: IntentType[] = [];
  let primaryIntent: IntentType = 'gallery';
  let confidence = 0.5;

  // 检测各种意图
  const intentScores: Record<IntentType, number> = {
    timeline: 0,
    location: 0,
    howto: 0,
    entity: 0,
    comparison: 0,
    evolution: 0,
    exploration: 0,
    gallery: 0.3, // 默认基础分
    detail: 0,
    list: 0
  };

  // 时间线意图
  if (TIME_PERIODS.some(p => lowerQuery.includes(p)) || /\d{4}/.test(lowerQuery)) {
    intentScores.timeline += 0.4;
  }

  // 地点意图
  if (KNOWN_CITIES.some(c => lowerQuery.includes(c)) || KNOWN_COUNTRIES.some(c => lowerQuery.includes(c))) {
    intentScores.location += 0.4;
  }
  if (['visit', 'travel', 'tourist', 'attractions', 'places'].some(w => lowerQuery.includes(w))) {
    intentScores.location += 0.3;
  }

  // How-to 意图
  if (HOWTO_WORDS.some(w => lowerQuery.includes(w))) {
    intentScores.howto += 0.6;
  }

  // 对比意图
  if (COMPARISON_WORDS.some(w => lowerQuery.includes(w))) {
    intentScores.comparison += 0.7;
  }

  // 演变意图
  if (EVOLUTION_WORDS.some(w => lowerQuery.includes(w))) {
    intentScores.evolution += 0.6;
  }

  // 探索意图
  if (['types of', 'kinds of', 'styles of', 'categories', 'explore'].some(w => lowerQuery.includes(w))) {
    intentScores.exploration += 0.5;
  }

  // 实体意图
  if (KNOWN_ARTISTS.some(a => lowerQuery.includes(a)) || ['what is', 'about', 'information'].some(w => lowerQuery.includes(w))) {
    intentScores.entity += 0.4;
  }

  // 找出主要意图和次要意图
  const sortedIntents = Object.entries(intentScores)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0.2);

  if (sortedIntents.length > 0) {
    primaryIntent = sortedIntents[0][0] as IntentType;
    confidence = sortedIntents[0][1];
  }

  const secondaryIntents = sortedIntents
    .slice(1, 3)
    .map(([intent]) => intent as IntentType);

  // 提取实体
  const entities = extractEntities(query);
  const timeRange = extractTimeRange(query);
  const locations = extractLocations(query);

  // 确定布局模式
  let suggestedLayout: LayoutMode = 'single';
  
  if (secondaryIntents.length >= 2) {
    suggestedLayout = 'stacked';
  }
  if (intentScores.comparison > 0.5) {
    suggestedLayout = 'comparison';
  }
  if (intentScores.timeline > 0.3 && intentScores.location > 0.3) {
    suggestedLayout = 'timeline-map';
  }
  if (intentScores.entity > 0.3 && (intentScores.gallery > 0.3 || intentScores.exploration > 0.3)) {
    suggestedLayout = 'hero-detail';
  }

  // 生成推理说明
  const reasoning = generateReasoning(primaryIntent, secondaryIntents, entities, locations, timeRange);

  return {
    primaryIntent,
    secondaryIntents,
    confidence,
    entities,
    timeRange,
    locations,
    keywords: extractKeywords(query),
    suggestedLayout,
    reasoning
  };
}

function extractKeywords(query: string): string[] {
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'and', 'or'];
  return query.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
}

function generateReasoning(
  primary: IntentType,
  secondary: IntentType[],
  entities: ExtractedEntity[],
  locations: ExtractedLocation[],
  timeRange?: ExtractedTimeRange
): string {
  const parts: string[] = [];

  parts.push(`Primary intent: ${primary}`);
  
  if (secondary.length > 0) {
    parts.push(`Also detected: ${secondary.join(', ')}`);
  }

  if (entities.length > 0) {
    const entityList = entities.map(e => `${e.value} (${e.type})`).join(', ');
    parts.push(`Entities: ${entityList}`);
  }

  if (locations.length > 0) {
    parts.push(`Locations: ${locations.map(l => l.name).join(', ')}`);
  }

  if (timeRange) {
    if (timeRange.period) {
      parts.push(`Time period: ${timeRange.period} (${timeRange.start}-${timeRange.end})`);
    } else if (timeRange.start && timeRange.end) {
      parts.push(`Time range: ${timeRange.start}-${timeRange.end}`);
    }
  }

  return parts.join(' | ');
}

// ============================================================================
// 动态属性生成器
// ============================================================================

export function generateDynamicProps(
  componentType: string,
  analysis: MultiIntentAnalysis,
  query: string
): Record<string, any> {
  const baseProps: Record<string, any> = {
    query,
    generatedAt: Date.now()
  };

  switch (componentType) {
    case 'TimelineGallery':
      return {
        ...baseProps,
        title: generateTitle(analysis, 'timeline'),
        description: generateDescription(analysis, query),
        periods: generatePeriods(analysis),
        yearRange: analysis.timeRange 
          ? [analysis.timeRange.start || 1900, analysis.timeRange.end || 2024] as [number, number]
          : [1900, 2024] as [number, number],
        currentYear: analysis.timeRange?.start || 1950,
        activePeriod: analysis.timeRange?.period
      };

    case 'LocationCard':
      return {
        ...baseProps,
        name: analysis.locations[0]?.name || extractMainSubject(query),
        description: generateDescription(analysis, query),
        places: generatePlaces(analysis)
      };

    case 'EntityDetail':
      return {
        ...baseProps,
        title: extractMainSubject(query),
        description: generateDescription(analysis, query),
        topics: generateTopics(analysis, query)
      };

    case 'VisualExplorer':
      return {
        ...baseProps,
        title: `Explore ${extractMainSubject(query)} visually`,
        categories: generateCategories(analysis, query)
      };

    case 'CityGrid':
      return {
        ...baseProps,
        title: generateTitle(analysis, 'gallery'),
        intro: 'Explore images of',
        outro: 'through curated photographs.',
        cities: analysis.locations.length > 0 
          ? analysis.locations.map(l => capitalizeFirst(l.name))
          : ['Los Angeles', 'Tokyo', 'Paris'],
        activeCity: analysis.locations[0]?.name ? capitalizeFirst(analysis.locations[0].name) : undefined
      };

    case 'StepCard':
      return {
        ...baseProps,
        title: `Step 1: ${extractMainSubject(query)}`,
        content: generateDescription(analysis, query),
        tags: analysis.keywords.slice(0, 3).map(capitalizeFirst),
        stepNumber: 1,
        totalSteps: 4
      };

    case 'ComparisonView':
      return {
        ...baseProps,
        title: `Comparing ${analysis.entities.map(e => e.value).join(' vs ')}`,
        items: analysis.entities.slice(0, 2).map(e => ({
          name: capitalizeFirst(e.value),
          type: e.type
        }))
      };

    default:
      return baseProps;
  }
}

function generateTitle(analysis: MultiIntentAnalysis, type: string): string {
  const entity = analysis.entities.find(e => e.type === 'person' || e.type === 'thing');
  const location = analysis.locations[0];
  const period = analysis.timeRange?.period;

  if (entity && period) {
    return `${capitalizeFirst(entity.value)}'s ${period}`;
  }
  if (entity) {
    return capitalizeFirst(entity.value);
  }
  if (location) {
    return capitalizeFirst(location.name);
  }
  if (period) {
    return period;
  }
  return 'Visual Exploration';
}

function generateDescription(analysis: MultiIntentAnalysis, query: string): string {
  // 在实际生产中，这里会调用 LLM 生成描述
  // 现在我们用模板生成
  const entity = analysis.entities[0];
  const location = analysis.locations[0];
  const period = analysis.timeRange?.period;

  if (entity && period) {
    return `Explore ${entity.value}'s ${period} through a curated collection of images and historical context.`;
  }
  if (location) {
    return `Discover the beauty and culture of ${capitalizeFirst(location.name)} through stunning visuals and detailed information.`;
  }
  return `Explore visual content related to "${query}" with interactive features and detailed information.`;
}

function generatePeriods(analysis: MultiIntentAnalysis): string[] {
  // 根据实体类型生成相关时期
  const artist = analysis.entities.find(e => e.type === 'person');
  
  if (artist?.value.includes('picasso')) {
    return ['Blue Period', 'Rose Period', 'Cubism', 'Surrealism', 'See more'];
  }
  if (artist?.value.includes('monet')) {
    return ['Early Works', 'Impressionism', 'Water Lilies', 'Late Works', 'See more'];
  }
  
  // 默认时期
  return ['Early', 'Middle', 'Late', 'Modern', 'See more'];
}

function generatePlaces(analysis: MultiIntentAnalysis): Array<{ name: string; image: string }> {
  const location = analysis.locations[0];
  
  // 根据地点生成相关景点
  const placesByLocation: Record<string, string[]> = {
    'kyoto': ['Kinkaku-ji', 'Fushimi Inari', 'Arashiyama', 'Gion District', 'Kiyomizu-dera'],
    'paris': ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées', 'Montmartre'],
    'tokyo': ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Tower', 'Meiji Shrine', 'Akihabara'],
    'london': ['Big Ben', 'Tower Bridge', 'Buckingham Palace', 'British Museum', 'Hyde Park'],
  };

  const places = location ? placesByLocation[location.name.toLowerCase()] : null;
  
  if (places) {
    return places.map(name => ({
      name,
      image: `https://images.unsplash.com/photo-1500000000000-000000000000?w=120&h=80&fit=crop&q=${encodeURIComponent(name)}`
    }));
  }

  return [
    { name: 'Popular Spot 1', image: 'https://images.unsplash.com/photo-1500000000001?w=120&h=80&fit=crop' },
    { name: 'Popular Spot 2', image: 'https://images.unsplash.com/photo-1500000000002?w=120&h=80&fit=crop' },
    { name: 'Popular Spot 3', image: 'https://images.unsplash.com/photo-1500000000003?w=120&h=80&fit=crop' },
  ];
}

function generateTopics(analysis: MultiIntentAnalysis, query: string): Array<{ label: string; image: string }> {
  const keywords = analysis.keywords.slice(0, 5);
  return keywords.map((kw, i) => ({
    label: capitalizeFirst(kw),
    image: `https://images.unsplash.com/photo-150000000000${i}?w=100&h=70&fit=crop`
  }));
}

function generateCategories(analysis: MultiIntentAnalysis, query: string): Array<{ name: string; description: string; hasWiki: boolean; images: string[] }> {
  const subject = extractMainSubject(query);
  
  return [
    {
      name: `Type A - ${subject}`,
      description: `The first variation of ${subject}, commonly found in traditional settings.`,
      hasWiki: true,
      images: Array(5).fill(0).map((_, i) => `https://images.unsplash.com/photo-15000000000${i}0?w=100&h=80&fit=crop`)
    },
    {
      name: `Type B - ${subject}`,
      description: `A modern interpretation of ${subject}, featuring contemporary elements.`,
      hasWiki: true,
      images: Array(5).fill(0).map((_, i) => `https://images.unsplash.com/photo-15000000000${i}1?w=100&h=80&fit=crop`)
    }
  ];
}

function extractMainSubject(query: string): string {
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'and', 'or', 'how', 'what', 'where', 'when', 'why', 'images', 'pictures', 'photos'];
  const words = query.toLowerCase().split(/\s+/).filter(w => !stopWords.includes(w) && w.length > 2);
  return words.slice(0, 3).map(capitalizeFirst).join(' ');
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================================
// 智能布局生成器
// ============================================================================

export function generateIntelligentLayout(analysis: MultiIntentAnalysis, query: string): IntelligentLayout {
  const components: DynamicComponentConfig[] = [];
  
  // 根据布局模式和意图组合组件
  switch (analysis.suggestedLayout) {
    case 'hero-detail':
      // 主图 + 详情布局
      components.push(createComponentConfig('EntityDetail', 'hero', 'primary', 'full', 10, analysis, query));
      if (analysis.secondaryIntents.includes('timeline')) {
        components.push(createComponentConfig('TimelineGallery', 'compact', 'secondary', 'full', 8, analysis, query));
      }
      if (analysis.secondaryIntents.includes('location')) {
        components.push(createComponentConfig('LocationCard', 'compact', 'secondary', 'half', 7, analysis, query));
      }
      break;

    case 'timeline-map':
      // 时间轴 + 地图布局
      components.push(createComponentConfig('TimelineGallery', 'default', 'primary', 'full', 10, analysis, query));
      components.push(createComponentConfig('LocationCard', 'default', 'secondary', 'full', 8, analysis, query));
      break;

    case 'comparison':
      // 对比布局
      components.push(createComponentConfig('ComparisonView', 'default', 'primary', 'full', 10, analysis, query));
      break;

    case 'stacked':
      // 堆叠布局 - 根据意图优先级排列
      const intentToComponent: Record<IntentType, string> = {
        timeline: 'TimelineGallery',
        location: 'LocationCard',
        howto: 'StepCard',
        entity: 'EntityDetail',
        comparison: 'ComparisonView',
        evolution: 'TimelineGallery',
        exploration: 'VisualExplorer',
        gallery: 'CityGrid',
        detail: 'EntityDetail',
        list: 'VisualExplorer'
      };

      // 主要意图
      const primaryComponent = intentToComponent[analysis.primaryIntent];
      components.push(createComponentConfig(primaryComponent, 'default', 'primary', 'full', 10, analysis, query));

      // 次要意图
      analysis.secondaryIntents.forEach((intent, i) => {
        const comp = intentToComponent[intent];
        if (comp && comp !== primaryComponent) {
          components.push(createComponentConfig(comp, 'compact', 'secondary', 'full', 8 - i, analysis, query));
        }
      });
      break;

    case 'single':
    default:
      // 单一组件布局
      const singleComponent = selectBestComponent(analysis);
      components.push(createComponentConfig(singleComponent, 'default', 'primary', 'full', 10, analysis, query));
      break;
  }

  // 总是添加相关搜索
  components.push({
    componentType: 'TextRail',
    variant: 'default',
    props: generateRelatedSearches(analysis, query),
    position: 'sidebar',
    size: 'quarter',
    priority: 3
  });

  return {
    mode: analysis.suggestedLayout,
    components: components.sort((a, b) => b.priority - a.priority),
    transitions: ['fadeIn', 'slideUp'],
    contextHint: analysis.reasoning
  };
}

function createComponentConfig(
  componentType: string,
  variant: ComponentVariant,
  position: 'primary' | 'secondary' | 'sidebar' | 'footer',
  size: 'full' | 'half' | 'third' | 'quarter',
  priority: number,
  analysis: MultiIntentAnalysis,
  query: string
): DynamicComponentConfig {
  return {
    componentType,
    variant,
    props: generateDynamicProps(componentType, analysis, query),
    position,
    size,
    priority
  };
}

function selectBestComponent(analysis: MultiIntentAnalysis): string {
  const mapping: Record<IntentType, string> = {
    timeline: 'TimelineGallery',
    location: 'LocationCard',
    howto: 'StepCard',
    entity: 'EntityDetail',
    comparison: 'VisualExplorer',
    evolution: 'TimelineGallery',
    exploration: 'VisualExplorer',
    gallery: 'CityGrid',
    detail: 'EntityDetail',
    list: 'VisualExplorer'
  };
  return mapping[analysis.primaryIntent] || 'CityGrid';
}

function generateRelatedSearches(analysis: MultiIntentAnalysis, query: string): Record<string, any> {
  const relatedQueries: string[] = [];

  // 基于实体生成相关搜索
  analysis.entities.forEach(entity => {
    relatedQueries.push(`${entity.value} images`);
    relatedQueries.push(`${entity.value} history`);
  });

  // 基于地点生成相关搜索
  analysis.locations.forEach(loc => {
    relatedQueries.push(`${loc.name} attractions`);
    relatedQueries.push(`${loc.name} travel guide`);
  });

  // 基于关键词生成相关搜索
  analysis.keywords.slice(0, 2).forEach(kw => {
    relatedQueries.push(`${kw} types`);
  });

  return {
    title: 'Related searches',
    items: relatedQueries.slice(0, 6)
  };
}

// ============================================================================
// 上下文链管理
// ============================================================================

export interface SearchContext {
  query: string;
  analysis: MultiIntentAnalysis;
  timestamp: number;
}

export class ContextChain {
  private history: SearchContext[] = [];
  private maxHistory = 10;

  add(query: string, analysis: MultiIntentAnalysis) {
    this.history.push({
      query,
      analysis,
      timestamp: Date.now()
    });
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  getHistory(): SearchContext[] {
    return [...this.history];
  }

  getLastContext(): SearchContext | undefined {
    return this.history[this.history.length - 1];
  }

  /**
   * 根据上下文增强当前查询分析
   */
  enhanceWithContext(currentAnalysis: MultiIntentAnalysis): MultiIntentAnalysis {
    const lastContext = this.getLastContext();
    if (!lastContext) return currentAnalysis;

    // 如果当前查询缺少实体，尝试从上下文继承
    if (currentAnalysis.entities.length === 0 && lastContext.analysis.entities.length > 0) {
      return {
        ...currentAnalysis,
        entities: lastContext.analysis.entities,
        reasoning: `${currentAnalysis.reasoning} | Inherited entities from previous query: "${lastContext.query}"`
      };
    }

    // 如果当前查询缺少地点，尝试从上下文继承
    if (currentAnalysis.locations.length === 0 && lastContext.analysis.locations.length > 0) {
      return {
        ...currentAnalysis,
        locations: lastContext.analysis.locations,
        reasoning: `${currentAnalysis.reasoning} | Inherited location from previous query: "${lastContext.query}"`
      };
    }

    return currentAnalysis;
  }

  clear() {
    this.history = [];
  }
}

// 全局上下文链实例
export const globalContextChain = new ContextChain();

