/**
 * AI Data Adapter
 * 将 AI 分析结果 + Google 搜索结果 转换为组件数据
 */

import { AIAnalysisResult, ComponentType } from './openaiService';
import { GoogleSearchResult, GoogleImageResult } from './googleSearchApi';

// 组件数据类型
export interface TimelineGalleryData {
  title: string;
  description: string;
  periods: string[];
  activePeriod: string;
  yearRange: [number, number];
  currentYear: number;
  images: string[];
}

export interface LocationCardData {
  name: string;
  description: string;
  heroImage: string;
  places: Array<{ name: string; image: string }>;
}

export interface StepCardData {
  stepNumber: number;
  totalSteps: number;
  title: string;
  content: string;
  tags: string[];
  images: Array<{ url: string; isVideo: boolean }>;
}

export interface EntityDetailData {
  title: string;
  description: string;
  mainImage: string;
  source: string;
  wikiSource: boolean;
  topics: Array<{ label: string; image: string }>;
}

export interface VisualExplorerData {
  title: string;
  categories: Array<{
    name: string;
    description: string;
    hasWiki: boolean;
    images: string[];
  }>;
}

export interface CityGridData {
  title: string;
  intro: string;
  outro: string;
  cities: string[];
  activeCity: string;
  images: string[];
}

export type ComponentData = 
  | { type: 'TimelineGallery'; data: TimelineGalleryData }
  | { type: 'LocationCard'; data: LocationCardData }
  | { type: 'StepCard'; data: StepCardData }
  | { type: 'EntityDetail'; data: EntityDetailData }
  | { type: 'VisualExplorer'; data: VisualExplorerData }
  | { type: 'CityGrid'; data: CityGridData };

/**
 * 提取图片 URL
 */
function extractImageUrls(images: GoogleImageResult[], count: number = 8): string[] {
  return images
    .slice(0, count)
    .map(img => img.image?.thumbnailLink || img.link)
    .filter(Boolean);
}

/**
 * 根据 AI 分析结果和搜索结果生成组件数据
 */
export function adaptAIResultToComponents(
  aiResult: AIAnalysisResult,
  images: GoogleImageResult[],
  webResults: GoogleSearchResult[]
): ComponentData[] {
  const components: ComponentData[] = [];
  const imageUrls = extractImageUrls(images, 10);
  
  // 生成主要组件
  const primaryData = createComponentData(
    aiResult.primaryComponent,
    aiResult,
    imageUrls,
    webResults,
    false
  );
  if (primaryData) {
    components.push(primaryData);
  }

  // 生成次要组件（如果有）
  if (aiResult.secondaryComponent) {
    const secondaryData = createComponentData(
      aiResult.secondaryComponent,
      aiResult,
      imageUrls.slice(4), // 使用剩余的图片
      webResults,
      true
    );
    if (secondaryData) {
      components.push(secondaryData);
    }
  }

  return components;
}

/**
 * 创建单个组件的数据
 */
function createComponentData(
  componentType: ComponentType,
  aiResult: AIAnalysisResult,
  imageUrls: string[],
  webResults: GoogleSearchResult[],
  isSecondary: boolean
): ComponentData | null {
  const { extractedInfo, componentConfig } = aiResult;
  const config = isSecondary ? componentConfig.secondary : componentConfig.primary;

  switch (componentType) {
    case 'TimelineGallery':
      return {
        type: 'TimelineGallery',
        data: {
          title: config?.title || extractedInfo.title,
          description: config?.description || extractedInfo.description,
          periods: config?.periods || ['Early', 'Middle', 'Late', 'Modern', 'See more'],
          activePeriod: config?.activePeriod || extractedInfo.timeRange?.period || 'Early',
          yearRange: extractedInfo.timeRange?.start && extractedInfo.timeRange?.end
            ? [extractedInfo.timeRange.start, extractedInfo.timeRange.end]
            : [1900, 2000],
          currentYear: extractedInfo.timeRange?.start || 1950,
          images: imageUrls.slice(0, 6)
        }
      };

    case 'LocationCard':
      return {
        type: 'LocationCard',
        data: {
          name: config?.name || extractedInfo.locations[0] || extractedInfo.title,
          description: config?.description || extractedInfo.description,
          heroImage: imageUrls[0] || '',
          places: webResults.slice(0, 5).map((result, i) => ({
            name: result.title.split('-')[0].trim().substring(0, 40),
            image: imageUrls[i + 1] || ''
          })).filter(p => p.image)
        }
      };

    case 'StepCard':
      return {
        type: 'StepCard',
        data: {
          stepNumber: 1,
          totalSteps: config?.totalSteps || 4,
          title: config?.title || `Step 1: ${extractedInfo.title}`,
          content: config?.content || extractedInfo.description,
          tags: config?.tags || extractedInfo.keywords.slice(0, 3).map(capitalize),
          images: imageUrls.slice(0, 2).map((url, i) => ({
            url,
            isVideo: i === 0
          }))
        }
      };

    case 'EntityDetail':
      return {
        type: 'EntityDetail',
        data: {
          title: config?.title || extractedInfo.title,
          description: config?.description || extractedInfo.description,
          mainImage: imageUrls[0] || '',
          source: webResults[0]?.displayLink || 'Various sources',
          wikiSource: webResults.some(r => r.displayLink.includes('wikipedia')),
          topics: extractedInfo.keywords.slice(0, 5).map((kw, i) => ({
            label: capitalize(kw),
            image: imageUrls[i + 1] || ''
          })).filter(t => t.image)
        }
      };

    case 'VisualExplorer':
      return {
        type: 'VisualExplorer',
        data: {
          title: config?.title || `Explore ${extractedInfo.title} visually`,
          categories: webResults.slice(0, 2).map((result, i) => ({
            name: result.title.split('-')[0].trim().substring(0, 50),
            description: result.snippet.substring(0, 150) + '...',
            hasWiki: result.displayLink.includes('wikipedia'),
            images: imageUrls.slice(i * 4, i * 4 + 5)
          }))
        }
      };

    case 'CityGrid':
      return {
        type: 'CityGrid',
        data: {
          title: config?.title || `Images of ${extractedInfo.title}`,
          intro: config?.intro || 'Explore images of',
          outro: config?.outro || 'through curated photographs.',
          cities: extractedInfo.locations.length > 0 
            ? extractedInfo.locations.map(capitalize)
            : ['Gallery'],
          activeCity: extractedInfo.locations[0] ? capitalize(extractedInfo.locations[0]) : 'Gallery',
          images: imageUrls.slice(0, 8)
        }
      };

    default:
      return null;
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

