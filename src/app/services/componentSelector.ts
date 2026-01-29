/**
 * Component Selector Service
 * 根据意图分析结果，选择合适的组件并准备数据
 */

import { QueryIntent, IntentAnalysis } from './intentDetection';
import { data } from '../data';

export interface ComponentConfig {
  componentName: string;
  props: any;
  priority: number; // 0-10，用于多组件排序
  streamDelay?: number; // 流式渲染延迟（ms）
}

/**
 * 根据意图选择组件
 */
export function selectComponents(analysis: IntentAnalysis, query: string): ComponentConfig[] {
  const configs: ComponentConfig[] = [];

  switch (analysis.intent) {
    case 'timeline':
      configs.push({
        componentName: 'TimelineGallery',
        props: {
          ...data.timelineGallery,
          query
        },
        priority: 10,
        streamDelay: 300
      });
      break;

    case 'location':
      configs.push({
        componentName: 'LocationCard',
        props: {
          ...data.locationCard,
          query
        },
        priority: 10,
        streamDelay: 300
      });
      break;

    case 'howto':
      configs.push({
        componentName: 'StepCard',
        props: {
          ...data.stepCard,
          query
        },
        priority: 10,
        streamDelay: 300
      });
      break;

    case 'entity':
      configs.push({
        componentName: 'EntityDetail',
        props: {
          ...data.entityDetail,
          query
        },
        priority: 10,
        streamDelay: 300
      });
      break;

    case 'visual-explore':
      configs.push({
        componentName: 'VisualExplorer',
        props: {
          ...data.visualExplorer,
          query
        },
        priority: 10,
        streamDelay: 300
      });
      break;

    case 'city-grid':
      configs.push({
        componentName: 'CityGrid',
        props: {
          ...data.cityGrid,
          query
        },
        priority: 10,
        streamDelay: 300
      });
      break;

    case 'general':
    default:
      // 通用查询：显示 Copilot Section + WebResult
      configs.push({
        componentName: 'CopilotSection',
        props: {
          ...data.copilot,
          query
        },
        priority: 10,
        streamDelay: 200
      });
      configs.push({
        componentName: 'WebResult',
        props: {
          ...data.webResult,
          query
        },
        priority: 8,
        streamDelay: 500
      });
      break;
  }

  // 总是添加 TextRail（相关搜索建议）
  configs.push({
    componentName: 'TextRail',
    props: data.textRail,
    priority: 5,
    streamDelay: 800
  });

  // 按优先级排序
  return configs.sort((a, b) => b.priority - a.priority);
}

/**
 * 获取组件的交互配置
 * 定义每个组件支持哪些交互类型
 */
export function getInteractionConfig(componentName: string) {
  const configs: Record<string, any> = {
    TimelineGallery: {
      imageClick: 'view-large',
      periodClick: 'dive-into',
      sliderChange: 'switch-view'
    },
    LocationCard: {
      heroImageClick: 'view-large',
      placeClick: 'dive-into',
      titleClick: 'navigate'
    },
    StepCard: {
      imageClick: 'view-large',
      videoClick: 'play-media',
      tagClick: 'dive-into',
      nextStepClick: 'switch-view'
    },
    EntityDetail: {
      mainImageClick: 'view-large',
      topicClick: 'dive-into',
      sourceClick: 'navigate'
    },
    VisualExplorer: {
      imageClick: 'view-large',
      categoryClick: 'expand',
      wikiClick: 'navigate'
    },
    CityGrid: {
      imageClick: 'view-large',
      cityClick: 'switch-view',
      titleClick: 'dive-into'
    },
    CopilotSection: {
      imageClick: 'view-large',
      seeMoreClick: 'expand'
    },
    WebResult: {
      titleClick: 'navigate',
      linkClick: 'navigate',
      tabClick: 'switch-view'
    },
    TextRail: {
      itemClick: 'dive-into'
    }
  };

  return configs[componentName] || {};
}

/**
 * 模拟数据获取（在实际生产中会调用 API）
 */
export async function fetchComponentData(componentName: string, query: string): Promise<any> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

  // 返回模拟数据
  // 在实际生产中，这里会根据 query 调用搜索 API
  switch (componentName) {
    case 'TimelineGallery':
      return data.timelineGallery;
    case 'LocationCard':
      return data.locationCard;
    case 'StepCard':
      return data.stepCard;
    case 'EntityDetail':
      return data.entityDetail;
    case 'VisualExplorer':
      return data.visualExplorer;
    case 'CityGrid':
      return data.cityGrid;
    case 'CopilotSection':
      return data.copilot;
    case 'WebResult':
      return data.webResult;
    case 'TextRail':
      return data.textRail;
    default:
      return null;
  }
}

