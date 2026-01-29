/**
 * Gemini A2UI Service - 真正的 Agent-to-UI 实现
 * 
 * 核心理念：
 * 1. AI 基于现有的 6 个 Image Scenario 组件进行"举一反三"
 * 2. AI 生成组件的 props（不是创造新的 UI 结构）
 * 3. 遵循 ACF Design System 的规范
 * 4. 智能组合多个组件
 */

import { GoogleGenAI } from "@google/genai";

// Gemini API 配置 - 从环境变量读取
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// 初始化 Gemini 客户端
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// 可用的组件类型（你提供的 6 个组件）
export type ComponentType = 
  | 'TimelineGallery' 
  | 'LocationCard' 
  | 'StepCard' 
  | 'EntityDetail' 
  | 'VisualExplorer' 
  | 'CityGrid';

// 组件 Props 接口（基于你现有组件的 props）
export interface TimelineGalleryProps {
  title: string;
  description: string;
  periods: string[];
  activePeriod?: string;
  yearRange: [number, number];
  currentYear?: number;
  images: string[]; // 将由搜索 API 填充
}

export interface LocationCardProps {
  title: string;
  description: string;
  mainImage: string;
  locations: Array<{
    name: string;
    subtitle?: string;
    image: string;
  }>;
}

export interface StepCardProps {
  title: string;
  description: string;
  tags: string[];
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription: string;
  image: string;
  duration?: string;
}

export interface EntityDetailProps {
  title: string;
  description: string;
  mainImage: string;
  source?: string;
  relatedTopics: Array<{
    title: string;
    image: string;
  }>;
}

export interface VisualExplorerProps {
  title: string;
  description: string;
  categories: Array<{
    name: string;
    count?: number;
    images: string[];
  }>;
  activeCategory?: string;
}

export interface CityGridProps {
  title: string;
  intro: string;
  outro: string;
  cities: string[];
  activeCity?: string;
  images: string[];
}

// 设计微调参数
export interface StyleConfig {
  // TimelineGallery
  navPosition?: 'left' | 'top' | 'hidden';
  showSlider?: boolean;
  gridColumns?: 2 | 3 | 4;
  theme?: 'light' | 'accent';
  
  // LocationCard
  heroSize?: 'large' | 'medium' | 'small';
  listStyle?: 'vertical' | 'horizontal' | 'grid';
  showSubtitle?: boolean;
  
  // StepCard
  progressStyle?: 'bar' | 'dots' | 'numbers';
  imagePosition?: 'right' | 'bottom' | 'background';
  showDuration?: boolean;
  
  // EntityDetail
  layout?: 'horizontal' | 'vertical';
  imageRatio?: '1:1' | '16:9' | '4:3';
  showSource?: boolean;
  topicsCount?: 3 | 4 | 5;
  
  // VisualExplorer
  navStyle?: 'dots' | 'tabs' | 'pills';
  imagesPerCategory?: 2 | 3 | 4;
  showDescription?: boolean;
  
  // CityGrid
  gridLayout?: 'masonry' | 'uniform' | 'featured';
  columns?: 3 | 4 | 5;
  showCaptions?: boolean;
  textPosition?: 'top' | 'overlay';
}

// AI 生成的组件配置
export interface GeneratedComponent {
  type: ComponentType;
  props: TimelineGalleryProps | LocationCardProps | StepCardProps | EntityDetailProps | VisualExplorerProps | CityGridProps;
  style?: StyleConfig; // 设计微调参数
  imageQueries: string[]; // 用于搜索图片的关键词
}

// AI 生成的 UI 结构
export interface GeneratedUIStructure {
  layout: 'single' | 'stacked' | 'split';
  components: GeneratedComponent[];
  relatedQueries: string[];
  reasoning: string;
}

// AI 分析结果
export interface AIAnalysisResult {
  primaryComponent: ComponentType;
  secondaryComponent?: ComponentType;
  reasoning: string;
  confidence: number;
  extractedInfo: {
    title: string;
    description: string;
    entities: string[];
    locations: string[];
    timeRange?: { start?: number; end?: number; period?: string };
    keywords: string[];
    suggestedSearchQueries: string[];
  };
  componentConfig: {
    primary: Record<string, any>;
    secondary?: Record<string, any>;
  };
  generatedUI?: GeneratedUIStructure;
}

// A2UI System Prompt - 基于现有组件的举一反三 + 设计微调
const A2UI_SYSTEM_PROMPT = `你是一个 A2UI 系统，负责为搜索查询选择最合适的 UI 组件，生成内容，并进行设计微调。

## 核心理念
1. 理解 6 个参考组件的**设计特性**，而不是死板套用
2. 根据用户查询进行**内容创作**和**设计微调**
3. 输出必须是有效的 JSON

## 可用组件及其特性

### 1. TimelineGallery - 时间轴画廊
**核心特性**：时间轴导航、时期切换、年份滑块、图片网格
**适用**：历史演变、艺术时期、人物生涯、产品迭代、事件发展
**Props**:
- title, description, periods[], yearRange[start, end]
**设计微调 (style)**:
- navPosition: "left" | "top" | "hidden" (导航位置)
- showSlider: boolean (是否显示年份滑块)
- gridColumns: 2 | 3 | 4 (图片网格列数)
- theme: "light" | "accent" (主题色)

### 2. LocationCard - 地点卡片
**核心特性**：大图展示、地点列表、描述文字
**适用**：旅游景点、餐厅推荐、地标建筑、城市介绍
**Props**:
- title, description, locations[{name, subtitle}]
**设计微调 (style)**:
- heroSize: "large" | "medium" | "small" (主图大小)
- listStyle: "vertical" | "horizontal" | "grid" (列表样式)
- showSubtitle: boolean (是否显示副标题)

### 3. StepCard - 步骤卡片
**核心特性**：步骤编号、进度条、标签分类、操作说明
**适用**：教程、食谱、DIY指南、操作步骤、流程说明
**Props**:
- title, content, tags[], stepNumber, totalSteps
**设计微调 (style)**:
- progressStyle: "bar" | "dots" | "numbers" (进度样式)
- imagePosition: "right" | "bottom" | "background" (图片位置)
- showDuration: boolean (是否显示时长)

### 4. EntityDetail - 实体详情
**核心特性**：主图、详细描述、相关主题探索、来源标注
**适用**：人物介绍、产品详情、概念解释、百科知识
**Props**:
- title, description, source, relatedTopics[{title}]
**设计微调 (style)**:
- layout: "horizontal" | "vertical" (布局方向)
- imageRatio: "1:1" | "16:9" | "4:3" (图片比例)
- showSource: boolean (是否显示来源)
- topicsCount: 3 | 4 | 5 (相关主题数量)

### 5. VisualExplorer - 视觉探索器
**核心特性**：分类导航、多图展示、类别切换、描述文字
**适用**：分类浏览、类型对比、风格探索、产品分类
**Props**:
- title, categories[{name, description}]
**设计微调 (style)**:
- navStyle: "dots" | "tabs" | "pills" (导航样式)
- imagesPerCategory: 2 | 3 | 4 (每类图片数)
- showDescription: boolean (是否显示分类描述)

### 6. CityGrid - 城市/图片网格
**核心特性**：城市/分类切换、流畅文案、图片网格
**适用**：图片集、城市风光、摄影作品、通用图片展示
**Props**:
- title, intro, outro, cities[]
**设计微调 (style)**:
- gridLayout: "masonry" | "uniform" | "featured" (网格布局)
- columns: 3 | 4 | 5 (列数)
- showCaptions: boolean (是否显示图片标题)
- textPosition: "top" | "overlay" (文字位置)

## 输出格式

{
  "layout": "single 或 stacked",
  "components": [
    {
      "type": "组件名称（必须是上面6个之一）",
      "props": {
        // 对应组件的内容 props
      },
      "style": {
        // 设计微调参数（可选，根据查询特点调整）
      },
      "imageQueries": ["具体的图片搜索关键词"]
    }
  ],
  "relatedQueries": ["相关搜索1", "相关搜索2", "相关搜索3"],
  "reasoning": "选择这个组件的理由，以及设计微调的考虑"
}

## 设计微调原则
1. **根据内容量调整**：内容多用更多列/更大空间，内容少用紧凑布局
2. **根据视觉重点调整**：图片为主用大图，文字为主用小图
3. **根据用户意图调整**：浏览型用网格，学习型用详情，对比型用分类
4. **保持 ACF 设计语言**：使用 ACF 的圆角、间距、颜色规范

## 示例

查询: "Picasso Blue Period"
输出:
{
  "layout": "single",
  "components": [
    {
      "type": "TimelineGallery",
      "props": {
        "title": "Picasso's Blue Period (1901-1904)",
        "description": "The Blue Period is a term used to define the works produced by Spanish painter Pablo Picasso between 1901 and 1904. During this period, Picasso painted essentially monochromatic paintings in shades of blue and blue-green.",
        "periods": ["Early Works", "Blue Period", "Rose Period", "Cubism", "Late Works"],
        "yearRange": [1901, 1904]
      },
      "imageQueries": ["Picasso The Old Guitarist 1903", "Picasso La Vie 1903", "Picasso Blue Period paintings", "Picasso The Tragedy 1903"]
    }
  ],
  "relatedQueries": ["Picasso Rose Period", "Pablo Picasso artworks", "Cubism art movement"],
  "reasoning": "用户搜索的是毕加索的蓝色时期，这是一个有明确时间范围的艺术时期，TimelineGallery 最适合展示这种时间演变的内容。"
}

查询: "best ramen in Tokyo"
输出:
{
  "layout": "single",
  "components": [
    {
      "type": "LocationCard",
      "props": {
        "title": "Best Ramen Restaurants in Tokyo",
        "description": "Tokyo is home to some of the world's finest ramen shops. From rich tonkotsu to light shoyu, discover the must-visit ramen spots in Japan's capital.",
        "locations": [
          {"name": "Ichiran Shibuya", "subtitle": "Famous for solo dining booths"},
          {"name": "Fuunji", "subtitle": "Best tsukemen in Shinjuku"},
          {"name": "Rokurinsha", "subtitle": "Tokyo Station favorite"},
          {"name": "Afuri", "subtitle": "Light yuzu shio ramen"}
        ]
      },
      "imageQueries": ["Ichiran ramen Tokyo", "Fuunji tsukemen Shinjuku", "Tokyo ramen shop interior", "Japanese tonkotsu ramen"]
    }
  ],
  "relatedQueries": ["Tokyo food guide", "Japanese ramen types", "Shibuya restaurants"],
  "reasoning": "用户在寻找东京的拉面店，这是地点推荐类查询，LocationCard 最适合展示多个地点及其特色。"
}`;

/**
 * 调用 Gemini API 生成组件配置
 */
export async function analyzeWithAI(query: string): Promise<AIAnalysisResult> {
  console.log('🤖 Calling Gemini API for A2UI generation:', query);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `${A2UI_SYSTEM_PROMPT}

用户搜索查询: "${query}"

请选择最合适的组件并生成 props。只输出 JSON，不要其他内容。`,
    });

    const content = response.text;
    console.log('🤖 Gemini response:', content);
    
    if (!content) {
      throw new Error('No content in Gemini response');
    }

    // 清理响应
    let jsonContent = content.trim();
    if (jsonContent.startsWith('```json')) {
      jsonContent = jsonContent.slice(7);
    }
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.slice(3);
    }
    if (jsonContent.endsWith('```')) {
      jsonContent = jsonContent.slice(0, -3);
    }
    jsonContent = jsonContent.trim();

    console.log('📦 Cleaned JSON:', jsonContent);
    
    const generatedUI = JSON.parse(jsonContent) as GeneratedUIStructure;
    const analysisResult = convertToAnalysisResult(query, generatedUI);
    console.log('✅ A2UI Result:', analysisResult);
    
    return analysisResult;

  } catch (error: any) {
    console.error('❌ Gemini A2UI generation failed:', error);
    console.error('Error details:', error?.message);
    return getDefaultAnalysis(query);
  }
}

/**
 * 将生成的 UI 结构转换为分析结果
 */
function convertToAnalysisResult(query: string, generatedUI: GeneratedUIStructure): AIAnalysisResult {
  const primaryComponent = generatedUI.components[0]?.type || 'CityGrid';
  const secondaryComponent = generatedUI.components[1]?.type;
  
  const mainProps = generatedUI.components[0]?.props as any;
  
  return {
    primaryComponent,
    secondaryComponent,
    reasoning: generatedUI.reasoning || 'AI-generated component selection',
    confidence: 0.9,
    extractedInfo: {
      title: mainProps?.title || query,
      description: mainProps?.description || `Explore ${query}`,
      entities: [],
      locations: mainProps?.locations?.map((l: any) => l.name) || [],
      timeRange: mainProps?.yearRange ? { start: mainProps.yearRange[0], end: mainProps.yearRange[1] } : undefined,
      keywords: generatedUI.components[0]?.imageQueries || [],
      suggestedSearchQueries: generatedUI.relatedQueries || []
    },
    componentConfig: {
      primary: generatedUI.components[0]?.props || {},
      secondary: generatedUI.components[1]?.props
    },
    generatedUI
  };
}

/**
 * 默认分析（当 AI 调用失败时）
 */
function getDefaultAnalysis(query: string): AIAnalysisResult {
  const lowerQuery = query.toLowerCase();
  
  let primaryComponent: ComponentType = 'CityGrid';
  
  if (lowerQuery.includes('period') || lowerQuery.includes('history') || lowerQuery.includes('evolution') || lowerQuery.includes('timeline')) {
    primaryComponent = 'TimelineGallery';
  } else if (lowerQuery.includes('how to') || lowerQuery.includes('recipe') || lowerQuery.includes('tutorial') || lowerQuery.includes('guide') || lowerQuery.includes('steps')) {
    primaryComponent = 'StepCard';
  } else if (lowerQuery.includes('visit') || lowerQuery.includes('travel') || lowerQuery.includes('attractions') || lowerQuery.includes('places') || lowerQuery.includes('best') || lowerQuery.includes('restaurant')) {
    primaryComponent = 'LocationCard';
  } else if (lowerQuery.includes('what is') || lowerQuery.includes('about') || lowerQuery.includes('who is') || lowerQuery.includes('explain')) {
    primaryComponent = 'EntityDetail';
  } else if (lowerQuery.includes('types of') || lowerQuery.includes('kinds of') || lowerQuery.includes('styles') || lowerQuery.includes('categories')) {
    primaryComponent = 'VisualExplorer';
  }

  const defaultUI: GeneratedUIStructure = {
    layout: 'single',
    components: [
      {
        type: primaryComponent,
        props: getDefaultProps(primaryComponent, query),
        imageQueries: [query, `${query} images`, `${query} photos`]
      }
    ],
    relatedQueries: [`${query} images`, `${query} guide`, `best ${query}`],
    reasoning: 'Fallback analysis (AI unavailable) - using keyword-based component selection'
  };

  return {
    primaryComponent,
    reasoning: defaultUI.reasoning,
    confidence: 0.5,
    extractedInfo: {
      title: query,
      description: `Explore visual content about ${query}.`,
      entities: [],
      locations: [],
      keywords: [query],
      suggestedSearchQueries: defaultUI.relatedQueries
    },
    componentConfig: {
      primary: defaultUI.components[0].props
    },
    generatedUI: defaultUI
  };
}

/**
 * 获取默认的组件 props
 */
function getDefaultProps(type: ComponentType, query: string): any {
  switch (type) {
    case 'TimelineGallery':
      return {
        title: query,
        description: `Explore the history and evolution of ${query}.`,
        periods: ['Early', 'Middle', 'Late', 'Modern'],
        yearRange: [1900, 2000]
      };
    case 'LocationCard':
      return {
        title: `Discover ${query}`,
        description: `Find the best places and attractions related to ${query}.`,
        locations: [
          { name: 'Location 1', subtitle: 'Popular spot' },
          { name: 'Location 2', subtitle: 'Must visit' },
          { name: 'Location 3', subtitle: 'Hidden gem' }
        ]
      };
    case 'StepCard':
      return {
        title: `How to ${query}`,
        description: `Step by step guide for ${query}.`,
        tags: ['Guide', 'Tutorial'],
        currentStep: 1,
        totalSteps: 5,
        stepTitle: 'Getting Started',
        stepDescription: `First step in learning about ${query}.`
      };
    case 'EntityDetail':
      return {
        title: query,
        description: `Learn everything about ${query}. This comprehensive guide covers all aspects.`,
        source: 'Wikipedia',
        relatedTopics: [
          { title: 'Related Topic 1' },
          { title: 'Related Topic 2' },
          { title: 'Related Topic 3' }
        ]
      };
    case 'VisualExplorer':
      return {
        title: `Types of ${query}`,
        description: `Explore different categories and styles of ${query}.`,
        categories: [
          { name: 'Category 1', count: 10 },
          { name: 'Category 2', count: 8 },
          { name: 'Category 3', count: 6 }
        ]
      };
    case 'CityGrid':
    default:
      return {
        title: query,
        intro: 'Discover the beauty of',
        outro: 'through stunning images',
        cities: [query, `${query} City`, `${query} Area`]
      };
  }
}

/**
 * 流式调用
 */
export async function* streamAnalyzeWithAI(query: string): AsyncGenerator<Partial<AIAnalysisResult>> {
  yield { reasoning: '🤔 AI 正在分析查询...', confidence: 0 };
  const result = await analyzeWithAI(query);
  yield result;
}

/**
 * 检查 API 可用性
 */
export async function checkAPIAvailability(): Promise<boolean> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Hello',
    });
    return !!response.text;
  } catch {
    return false;
  }
}

export const openaiService = {
  analyzeWithAI,
  streamAnalyzeWithAI,
  checkAPIAvailability
};
