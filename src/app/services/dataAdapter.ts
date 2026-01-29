/**
 * Data Adapter Service
 * 将 API 搜索结果转换为各个 Image Scenario 组件需要的 props
 * 
 * 核心职责：
 * 1. 从搜索结果中提取图片 URL
 * 2. 从网页结果中提取描述文本
 * 3. 根据意图分析生成组件特定的数据结构
 */

import { GoogleSearchResult, GoogleImageResult } from './googleSearchApi';
import { MultiIntentAnalysis } from './intelligentEngine';

// ============================================================================
// 通用工具函数
// ============================================================================

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractImageUrls(images: GoogleImageResult[], count: number = 8): string[] {
  return images
    .slice(0, count)
    .map(img => img.image?.thumbnailLink || img.link)
    .filter(Boolean);
}

function extractDescription(webResults: GoogleSearchResult[]): string {
  if (webResults.length === 0) return '';
  
  // 合并前两个结果的摘要
  const snippets = webResults
    .slice(0, 2)
    .map(r => r.snippet)
    .join(' ');
  
  // 截取合适长度
  if (snippets.length > 250) {
    return snippets.substring(0, 250).trim() + '...';
  }
  return snippets;
}

// ============================================================================
// TimelineGallery 数据适配
// ============================================================================

export interface TimelineGalleryData {
  title: string;
  description: string;
  periods: string[];
  activePeriod: string;
  yearRange: [number, number];
  currentYear: number;
  images: string[];
}

export function adaptToTimelineGallery(
  query: string,
  analysis: MultiIntentAnalysis,
  images: GoogleImageResult[],
  webResults: GoogleSearchResult[]
): TimelineGalleryData {
  // 提取实体名称作为标题
  const entity = analysis.entities.find(e => e.type === 'person' || e.type === 'thing');
  const period = analysis.timeRange?.period;
  
  let title = query;
  if (entity && period) {
    title = `${capitalize(entity.value)}'s ${period}`;
  } else if (entity) {
    title = capitalize(entity.value);
  } else if (period) {
    title = period;
  }

  // 生成时期标签
  let periods = ['Early Works', 'Middle Period', 'Late Works', 'Legacy'];
  if (entity?.value.toLowerCase().includes('picasso')) {
    periods = ['Blue Period', 'Rose Period', 'Cubism', 'Surrealism', 'Late Works'];
  } else if (entity?.value.toLowerCase().includes('monet')) {
    periods = ['Early Works', 'Impressionism', 'Water Lilies', 'Giverny', 'Late Works'];
  } else if (analysis.timeRange?.period) {
    periods = [analysis.timeRange.period, 'Related Works', 'Influences', 'Legacy'];
  }

  // 年份范围
  const yearRange: [number, number] = analysis.timeRange?.start && analysis.timeRange?.end
    ? [analysis.timeRange.start, analysis.timeRange.end]
    : [1900, 2000];

  return {
    title,
    description: extractDescription(webResults) || `Explore the visual journey of ${query} through time.`,
    periods,
    activePeriod: period || periods[0],
    yearRange,
    currentYear: analysis.timeRange?.start || Math.floor((yearRange[0] + yearRange[1]) / 2),
    images: extractImageUrls(images, 6)
  };
}

// ============================================================================
// LocationCard 数据适配
// ============================================================================

export interface LocationCardData {
  name: string;
  description: string;
  heroImage: string;
  places: Array<{ name: string; image: string }>;
}

export function adaptToLocationCard(
  query: string,
  analysis: MultiIntentAnalysis,
  images: GoogleImageResult[],
  webResults: GoogleSearchResult[]
): LocationCardData {
  const location = analysis.locations[0];
  const name = location ? capitalize(location.name) : extractMainSubject(query);

  // 从搜索结果标题中提取地点名称
  const placeNames = webResults
    .slice(0, 5)
    .map(r => {
      // 尝试从标题中提取地点名称
      const match = r.title.match(/^([^-|•]+)/);
      return match ? match[1].trim() : r.title.split(' ').slice(0, 3).join(' ');
    })
    .filter(name => name.length < 40);

  // 将图片与地点名称配对
  const places = placeNames.map((placeName, i) => ({
    name: placeName,
    image: images[i + 1]?.image?.thumbnailLink || images[i + 1]?.link || ''
  })).filter(p => p.image);

  return {
    name,
    description: extractDescription(webResults) || `Discover the beauty and culture of ${name}.`,
    heroImage: images[0]?.image?.thumbnailLink || images[0]?.link || '',
    places: places.length > 0 ? places : [
      { name: `${name} Landmark 1`, image: images[1]?.image?.thumbnailLink || '' },
      { name: `${name} Landmark 2`, image: images[2]?.image?.thumbnailLink || '' },
      { name: `${name} Landmark 3`, image: images[3]?.image?.thumbnailLink || '' },
    ].filter(p => p.image)
  };
}

// ============================================================================
// StepCard 数据适配
// ============================================================================

export interface StepCardData {
  stepNumber: number;
  totalSteps: number;
  title: string;
  content: string;
  tags: string[];
  images: Array<{ url: string; isVideo: boolean }>;
}

export function adaptToStepCard(
  query: string,
  analysis: MultiIntentAnalysis,
  images: GoogleImageResult[],
  webResults: GoogleSearchResult[]
): StepCardData {
  const subject = extractMainSubject(query);
  
  // 从关键词生成标签
  const tags = analysis.keywords
    .slice(0, 3)
    .map(kw => capitalize(kw));

  return {
    stepNumber: 1,
    totalSteps: 4,
    title: `Step 1: ${subject}`,
    content: extractDescription(webResults) || `Learn how to ${query} with this comprehensive guide.`,
    tags: tags.length > 0 ? tags : ['Getting Started', 'Tips', 'Guide'],
    images: images.slice(0, 2).map((img, i) => ({
      url: img.image?.thumbnailLink || img.link,
      isVideo: i === 0 // 第一张标记为视频
    }))
  };
}

// ============================================================================
// EntityDetail 数据适配
// ============================================================================

export interface EntityDetailData {
  title: string;
  description: string;
  mainImage: string;
  source: string;
  wikiSource: boolean;
  topics: Array<{ label: string; image: string }>;
}

export function adaptToEntityDetail(
  query: string,
  analysis: MultiIntentAnalysis,
  images: GoogleImageResult[],
  webResults: GoogleSearchResult[]
): EntityDetailData {
  const entity = analysis.entities.find(e => e.type === 'person' || e.type === 'thing');
  const title = entity ? capitalize(entity.value) : extractMainSubject(query);

  // 从搜索结果中提取来源
  const wikiResult = webResults.find(r => r.displayLink.includes('wikipedia'));
  const source = wikiResult 
    ? `Wikipedia • ${wikiResult.displayLink}`
    : webResults[0]?.displayLink || 'Various sources';

  // 从关键词生成主题
  const topics = analysis.keywords.slice(0, 5).map((kw, i) => ({
    label: capitalize(kw),
    image: images[i + 1]?.image?.thumbnailLink || images[i + 1]?.link || ''
  })).filter(t => t.image);

  return {
    title,
    description: extractDescription(webResults) || `Learn about ${title} and explore related visual content.`,
    mainImage: images[0]?.image?.thumbnailLink || images[0]?.link || '',
    source,
    wikiSource: !!wikiResult,
    topics: topics.length > 0 ? topics : [
      { label: 'Overview', image: images[1]?.image?.thumbnailLink || '' },
      { label: 'Details', image: images[2]?.image?.thumbnailLink || '' },
      { label: 'Gallery', image: images[3]?.image?.thumbnailLink || '' },
    ].filter(t => t.image)
  };
}

// ============================================================================
// VisualExplorer 数据适配
// ============================================================================

export interface VisualExplorerData {
  title: string;
  categories: Array<{
    name: string;
    description: string;
    hasWiki: boolean;
    images: string[];
  }>;
}

export function adaptToVisualExplorer(
  query: string,
  analysis: MultiIntentAnalysis,
  images: GoogleImageResult[],
  webResults: GoogleSearchResult[]
): VisualExplorerData {
  const subject = extractMainSubject(query);

  // 从搜索结果中提取分类
  const categories = webResults.slice(0, 2).map((result, i) => {
    const categoryImages = images
      .slice(i * 4, i * 4 + 5)
      .map(img => img.image?.thumbnailLink || img.link)
      .filter(Boolean);

    return {
      name: result.title.split('-')[0].trim().substring(0, 50),
      description: result.snippet.substring(0, 150) + '...',
      hasWiki: result.displayLink.includes('wikipedia'),
      images: categoryImages
    };
  });

  return {
    title: `Explore ${subject} visually`,
    categories: categories.length > 0 ? categories : [
      {
        name: `Type A - ${subject}`,
        description: `Explore the first category of ${subject}.`,
        hasWiki: false,
        images: extractImageUrls(images.slice(0, 5), 5)
      },
      {
        name: `Type B - ${subject}`,
        description: `Discover another variation of ${subject}.`,
        hasWiki: false,
        images: extractImageUrls(images.slice(5, 10), 5)
      }
    ]
  };
}

// ============================================================================
// CityGrid 数据适配
// ============================================================================

export interface CityGridData {
  title: string;
  intro: string;
  outro: string;
  cities: string[];
  activeCity: string;
  images: string[];
}

export function adaptToCityGrid(
  query: string,
  analysis: MultiIntentAnalysis,
  images: GoogleImageResult[],
  webResults: GoogleSearchResult[]
): CityGridData {
  // 提取城市名称
  const cities = analysis.locations.length > 0
    ? analysis.locations.map(l => capitalize(l.name))
    : ['Los Angeles', 'Tokyo', 'Paris'];

  const activeCity = cities[0];

  return {
    title: `Images of ${extractMainSubject(query)}`,
    intro: 'Explore images of',
    outro: 'through curated photographs highlighting their unique character.',
    cities,
    activeCity,
    images: extractImageUrls(images, 8)
  };
}

// ============================================================================
// 辅助函数
// ============================================================================

function extractMainSubject(query: string): string {
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'and', 'or', 'how', 'what', 'where', 'when', 'why', 'images', 'pictures', 'photos'];
  const words = query.toLowerCase().split(/\s+/).filter(w => !stopWords.includes(w) && w.length > 2);
  return words.slice(0, 3).map(capitalize).join(' ');
}

// ============================================================================
// 主适配函数 - 根据意图选择合适的适配器
// ============================================================================

export type ComponentData = 
  | { type: 'TimelineGallery'; data: TimelineGalleryData }
  | { type: 'LocationCard'; data: LocationCardData }
  | { type: 'StepCard'; data: StepCardData }
  | { type: 'EntityDetail'; data: EntityDetailData }
  | { type: 'VisualExplorer'; data: VisualExplorerData }
  | { type: 'CityGrid'; data: CityGridData };

export function adaptSearchResults(
  query: string,
  analysis: MultiIntentAnalysis,
  images: GoogleImageResult[],
  webResults: GoogleSearchResult[]
): ComponentData[] {
  const results: ComponentData[] = [];
  const { primaryIntent, secondaryIntents } = analysis;

  // 根据主要意图选择主组件
  switch (primaryIntent) {
    case 'timeline':
    case 'evolution':
      results.push({
        type: 'TimelineGallery',
        data: adaptToTimelineGallery(query, analysis, images, webResults)
      });
      break;

    case 'location':
      results.push({
        type: 'LocationCard',
        data: adaptToLocationCard(query, analysis, images, webResults)
      });
      break;

    case 'howto':
      results.push({
        type: 'StepCard',
        data: adaptToStepCard(query, analysis, images, webResults)
      });
      break;

    case 'entity':
    case 'detail':
      results.push({
        type: 'EntityDetail',
        data: adaptToEntityDetail(query, analysis, images, webResults)
      });
      break;

    case 'exploration':
      results.push({
        type: 'VisualExplorer',
        data: adaptToVisualExplorer(query, analysis, images, webResults)
      });
      break;

    case 'gallery':
    case 'list':
    default:
      results.push({
        type: 'CityGrid',
        data: adaptToCityGrid(query, analysis, images, webResults)
      });
      break;
  }

  // 根据次要意图添加补充组件（融合展示）
  if (secondaryIntents.includes('entity') && primaryIntent !== 'entity') {
    // 添加实体详情作为补充
    results.push({
      type: 'EntityDetail',
      data: adaptToEntityDetail(query, analysis, images.slice(4), webResults)
    });
  }

  if (secondaryIntents.includes('location') && primaryIntent !== 'location' && analysis.locations.length > 0) {
    // 添加地点卡片作为补充
    results.push({
      type: 'LocationCard',
      data: adaptToLocationCard(query, analysis, images.slice(4), webResults)
    });
  }

  return results;
}

