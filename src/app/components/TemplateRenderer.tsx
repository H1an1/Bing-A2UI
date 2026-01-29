/**
 * Template Renderer - 基于 AI 结果的模板渲染器
 * 
 * 使用 AI 生成的动态内容填充固定的模板结构
 */

import React from 'react';
import { TemplateType, AITemplateResult } from '../services/templateService';
import { 
  TimelineGallery, 
  TimelineArc, 
  TimelineGrid, 
  StepCard, 
  LocationCard, 
  EntityDetail, 
  VisualExplorer 
} from './image-scenarios';
import { A2UIDynamicTemplate } from './A2UIDynamicTemplate';
import { AIGenerativeCanvas } from './AIGenerativeCanvas';
import { SemanticA2UITemplate } from './SemanticA2UITemplate';
import { InteractiveDynamicTemplate } from './InteractiveDynamicTemplate';
import { FreeformDynamicTemplate } from './freeform/FreeformDynamicTemplate';

interface TemplateRendererProps {
  templateType: TemplateType;
  aiResult: AITemplateResult;
  images: string[];
  query?: string;  // Required for a2ui-dynamic template
  onImageClick?: (imageUrl: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
}

export function TemplateRenderer({
  templateType,
  aiResult,
  images,
  query,
  onImageClick,
  onQueryClick
}: TemplateRendererProps) {
  const { dynamicContent } = aiResult;
  const { title, description, subItems = [], tags = [] } = dynamicContent;

  // 根据模板类型渲染对应组件
  switch (templateType) {
    case 'timeline-gallery': {
      // 生成时期数据 - 每个时期有自己的描述
      const periodDescriptions = [
        `The early phase of ${title}, characterized by foundational works and emerging style.`,
        `A period of experimentation and development in ${title}'s artistic journey.`,
        `The peak creative period, featuring masterpieces and signature techniques.`,
        `Late works showing maturity and reflection on earlier themes.`,
        `Legacy and influence on subsequent art movements.`
      ];
      
      const periods = subItems.slice(0, 5).map((label, i) => ({
        year: 1900 + i * 10,
        label,
        thumbnail: images[i],
        description: periodDescriptions[i] || `Explore ${label} works and their significance.`
      }));
      
      if (periods.length < 3) {
        periods.push(
          { year: 1940, label: 'Late Works', description: periodDescriptions[3] },
          { year: 1950, label: 'See more', description: 'Explore more artworks and periods.' }
        );
      }

      return (
        <TimelineGallery
          title={title}
          description={description}
          periods={periods}
          activePeriodIndex={0}
          images={images}
          // 不传递 onPeriodChange，时期切换只在组件内部进行，不触发 requery
          onImageClick={(url, index) => onImageClick?.(url, `${title} ${index + 1}`)}
        />
      );
    }

    case 'timeline-arc': {
      return (
        <TimelineArc
          title={title}
          description={description}
          yearStart={1890}
          yearEnd={1960}
          activeYearStart={1900}
          activeYearEnd={1910}
          images={images}
          onImageClick={(url, index) => onImageClick?.(url, `${title} ${index + 1}`)}
        />
      );
    }

    case 'timeline-grid': {
      return (
        <TimelineGrid
          title={title}
          description={description}
          yearStart={1890}
          yearEnd={1960}
          activeYearStart={1900}
          activeYearEnd={1910}
          images={images}
          onImageClick={(url, index) => onImageClick?.(url, `${title} ${index + 1}`)}
        />
      );
    }

    case 'step-card': {
      // 生成标签
      const stepTags = tags.length > 0 ? tags : ['Gluten free dough', 'Cooking Skills', 'Necessary ingredients'];
      
      // 生成多个步骤，每个步骤有不同的图片
      const steps = [
        {
          title: 'Prepare the Crust',
          content: `Mix Dry Ingredients: In a large mixing bowl, whisk together flour, sugar, and salt. Cut in Butter: Add cold butter and blend until the mixture resembles coarse crumbs. Add Water: Gradually add cold water until the dough comes together. Divide into two disks, wrap in plastic, and refrigerate for at least 1 hour.`,
          images: [
            { url: images[0] || '', isVideo: true, duration: '7:43' },
            { url: images[1] || '' },
            { url: images[2] || '' },
            { url: images[3] || '' },
            { url: images[4] || '' },
            { url: images[5] || '' },
            { url: images[6] || '' }
          ]
        },
        {
          title: 'Prepare the Filling',
          content: `Peel and slice the apples thinly. Mix with sugar, cinnamon, nutmeg, and a squeeze of lemon juice. Let the mixture sit for 15 minutes to release juices. Drain excess liquid before adding to the crust.`,
          images: [
            { url: images[7] || images[0] || '', isVideo: false },
            { url: images[8] || images[1] || '' },
            { url: images[9] || images[2] || '' },
            { url: images[10] || images[3] || '' },
            { url: images[11] || images[4] || '' },
            { url: images[12] || images[5] || '' },
            { url: images[13] || images[6] || '' }
          ]
        },
        {
          title: 'Assemble the Pie',
          content: `Roll out one disk of dough and place in a 9-inch pie dish. Add the apple filling, mounding it slightly in the center. Roll out the second disk and place on top. Crimp the edges and cut slits for steam to escape.`,
          images: [
            { url: images[14] || images[2] || '', isVideo: false },
            { url: images[15] || images[3] || '' },
            { url: images[16] || images[4] || '' },
            { url: images[17] || images[5] || '' },
            { url: images[18] || images[6] || '' },
            { url: images[19] || images[0] || '' },
            { url: images[20] || images[1] || '' }
          ]
        },
        {
          title: 'Bake and Serve',
          content: `Brush the top with egg wash and sprinkle with sugar. Bake at 375°F (190°C) for 45-50 minutes until golden brown. Let cool for at least 30 minutes before slicing. Serve warm with vanilla ice cream.`,
          images: [
            { url: images[21] || images[4] || '', isVideo: false },
            { url: images[22] || images[5] || '' },
            { url: images[23] || images[6] || '' },
            { url: images[24] || images[0] || '' },
            { url: images[25] || images[1] || '' },
            { url: images[26] || images[2] || '' },
            { url: images[27] || images[3] || '' }
          ]
        }
      ];
      
      return (
        <StepCard
          steps={steps}
          tags={stepTags}
          onImageClick={(url, index) => onImageClick?.(url, `Step image ${index + 1}`)}
          onTagClick={(tag) => onQueryClick?.(`${title} ${tag}`)}
        />
      );
    }

    case 'location-card': {
      // 生成地点数据
      const places = subItems.slice(0, 5).map((name, i) => ({
        name,
        image: images[i + 1] || ''
      }));

      return (
        <LocationCard
          name={title}
          description={description}
          heroImage={images[0] || ''}
          places={places}
          onHeroClick={() => onImageClick?.(images[0], title)}
          onPlaceClick={(place) => onQueryClick?.(`${title} ${place.name}`)}
        />
      );
    }

    case 'entity-detail': {
      // 生成主题数据
      const topics = subItems.slice(0, 5).map((label, i) => ({
        label,
        image: images[i + 1] || ''
      }));

      return (
        <EntityDetail
          pageTitle={`Images of ${title}`}
          title={title}
          description={description}
          images={images}
          imageSource="Source"
          sources={[
            { name: 'Wikipedia', icon: '' },
            { name: 'Reference', icon: '' }
          ]}
          topics={topics}
          onTitleClick={() => onQueryClick?.(title)}
          onImageClick={(url, index) => onImageClick?.(url, `${title} ${index + 1}`)}
          onTopicClick={(topic) => onQueryClick?.(`${title} ${topic.label}`)}
        />
      );
    }

    case 'visual-explorer': {
      // 分成两个类别
      const halfLength = Math.ceil(subItems.length / 2);
      const categories = [
        {
          title: subItems[0] || `${title} Type A`,
          subtitle: 'Primary Category',
          description: description.slice(0, 150) + '...',
          sources: [{ name: 'Source 1', icon: '' }, { name: 'Source 2', icon: '' }],
          images: images.slice(0, 7)
        },
        {
          title: subItems[halfLength] || `${title} Type B`,
          subtitle: 'Secondary Category',
          description: `An alternative variation with unique characteristics.`,
          sources: [{ name: 'Source 1', icon: '' }, { name: 'Source 2', icon: '' }],
          images: images.slice(7, 14).length > 0 ? images.slice(7, 14) : images.slice(0, 7)
        }
      ];

      return (
        <VisualExplorer
          pageTitle={`Explore ${title} visually`}
          categories={categories}
          onTitleClick={() => onQueryClick?.(title)}
          onCategoryClick={(category) => onQueryClick?.(`${title} ${category.title}`)}
          onImageClick={(url, catIdx, imgIdx) => onImageClick?.(url, `${categories[catIdx]?.title} ${imgIdx + 1}`)}
        />
      );
    }

    case 'a2ui-dynamic': {
      // A2UI Dynamic - AI-composed flexible layout
      // Uses the A2UI system to dynamically compose UI components
      return (
        <A2UIDynamicTemplate
          query={query || title}
          aiResult={aiResult}
          images={images}
          onImageClick={onImageClick}
          onQueryClick={onQueryClick}
        />
      );
    }

    case 'ai-canvas': {
      // AI Generative Canvas - 第9个激进模板
      // Magazine-style dynamic grid layout with cinematic presentation
      return (
        <AIGenerativeCanvas
          query={query || title}
          aiResult={aiResult}
          images={images}
          onImageClick={onImageClick}
          onQueryClick={onQueryClick}
        />
      );
    }

    case 'semantic-a2ui': {
      return (
        <SemanticA2UITemplate
          query={query || title}
          images={images}
          onImageClick={onImageClick}
          onQueryClick={onQueryClick}
          showDebugInfo={false}
        />
      );
    }

    case 'interactive-view': {
      // Interactive Dynamic View - 像 Gemini 的交互式应用
      console.log('🎯 TemplateRenderer: Rendering interactive-view with images:', {
        count: images?.length || 0,
        sample: images?.slice(0, 2)
      });
      return (
        <InteractiveDynamicTemplate
          query={query || title}
          images={images}
          onImageClick={onImageClick}
          onQueryClick={onQueryClick}
          showDebugInfo={false}
        />
      );
    }

    case 'freeform-canvas': {
      return (
        <FreeformDynamicTemplate
          query={query || title}
          images={images}
          onImageClick={onImageClick}
          onQueryClick={onQueryClick}
          showDebugInfo={false}
        />
      );
    }

    default:
      return (
        <div className="p-8 text-center text-gray-500">
          Unknown template type: {templateType}
        </div>
      );
  }
}

/**
 * 模板预览卡片
 */
interface TemplatePreviewProps {
  templateType: TemplateType;
  isSelected?: boolean;
  onClick?: () => void;
}

const TEMPLATE_INFO: Record<TemplateType, { name: string; icon: string; description: string }> = {
  'interactive-view': {
    name: 'Dynamic View',
    icon: '✨',
    description: 'AI-powered creative layouts'
  },
  'timeline-gallery': {
    name: 'Timeline Gallery',
    icon: '🎨',
    description: 'Art periods with sidebar'
  },
  'step-card': {
    name: 'Step Guide',
    icon: '📝',
    description: 'Tutorial & recipes'
  },
  'location-card': {
    name: 'Location',
    icon: '🏯',
    description: 'Travel & places'
  },
  'entity-detail': {
    name: 'Entity',
    icon: '🔍',
    description: 'Product & details'
  },
  'visual-explorer': {
    name: 'Explorer',
    icon: '🏠',
    description: 'Category browse'
  },
  'a2ui-dynamic': {
    name: 'AI Layout',
    icon: '🤖',
    description: 'Flexible AI layout'
  },
  'ai-canvas': {
    name: 'Canvas',
    icon: '🖼️',
    description: 'Magazine style'
  },
  'timeline-arc': {
    name: 'Timeline Arc',
    icon: '🌙',
    description: 'Art/History'
  },
  'timeline-grid': {
    name: 'Timeline Grid',
    icon: '📐',
    description: 'Grid layout'
  },
  'semantic-a2ui': {
    name: 'Semantic',
    icon: 'SA',
    description: 'Token-based'
  },
  'freeform-canvas': {
    name: 'Freeform',
    icon: 'FC',
    description: 'Raw HTML/CSS'
  }
};

export function TemplatePreview({ templateType, isSelected, onClick }: TemplatePreviewProps) {
  const info = TEMPLATE_INFO[templateType];
  
  return (
    <button
      onClick={onClick}
      className={`
        p-3 rounded-xl border-2 text-left transition-all w-full
        ${isSelected 
          ? 'border-purple-500 bg-purple-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }
      `}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{info.icon}</span>
        <span className={`font-semibold text-sm ${isSelected ? 'text-purple-700' : 'text-gray-800'}`}>
          {info.name}
        </span>
      </div>
      <p className="text-xs text-gray-500">{info.description}</p>
    </button>
  );
}

/**
 * 模板选择器
 */
interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelect: (template: TemplateType) => void;
}

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  // 主要模板列表（简化版）
  const templates: TemplateType[] = [
    'interactive-view',  // Dynamic View - 默认首选
    'timeline-gallery',
    'step-card',
    'location-card',
    'entity-detail',
    'visual-explorer',
  ];

  return (
    <div className="flex flex-col gap-1">
      {templates.map(template => {
        const info = TEMPLATE_INFO[template];
        const isSelected = selectedTemplate === template;
        return (
          <button
            key={template}
            onClick={() => onSelect(template)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all
              ${isSelected 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-100 text-gray-700'
              }
            `}
          >
            <span className="text-lg w-6 text-center">{info.icon}</span>
            <div>
              <div className={`font-medium text-sm ${isSelected ? 'text-indigo-700' : ''}`}>
                {info.name}
              </div>
              <div className="text-xs text-gray-400">{info.description}</div>
            </div>
            {isSelected && (
              <svg className="ml-auto w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
