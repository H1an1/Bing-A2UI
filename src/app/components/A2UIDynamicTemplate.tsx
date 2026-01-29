/**
 * A2UI Dynamic Template - 模块化组合模板 (第 8 个模板)
 * 
 * 基于现有 7 个模板提取的模块，AI 动态组合生成独特布局
 * 每次生成可能不同，但都使用经过验证的高质量模块
 */

import React, { useState, useEffect } from 'react';
import { AITemplateResult } from '../services/templateService';
import { HeroModule, HeroVariant } from './modules/HeroModule';
import { GalleryModule, GalleryVariant } from './modules/GalleryModule';
import { InfoModule, InfoVariant } from './modules/InfoModule';
import { CardGridModule, CardGridVariant, CardItem } from './modules/CardGridModule';

// ============================================================================
// Types
// ============================================================================

interface InteractiveElement {
  id: string;
  label: string;
  relatedQuery: string;  // AI 生成的关联查询
  type: 'tag' | 'card' | 'place' | 'topic';
  isClickable: boolean;  // AI 判断是否可点击
}

interface ModuleConfig {
  type: 'hero' | 'gallery' | 'info' | 'cards';
  variant: string;
  order: number;
}

interface CompositionResult {
  modules: ModuleConfig[];
  layout: 'stack' | 'split' | 'grid';
  reasoning: string;
  // AI 生成的可交互元素及其关联查询
  interactiveElements: {
    tags: InteractiveElement[];
    cards: InteractiveElement[];
  };
}

interface A2UIDynamicTemplateProps {
  query: string;
  aiResult: AITemplateResult;
  images: string[];
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
}

// ============================================================================
// Composition Logic - 基于查询意图选择模块组合
// ============================================================================

// AI 逻辑：为元素生成智能关联查询
function generateRelatedQuery(query: string, element: string, elementType: string): string | null {
  const q = query.toLowerCase();
  const e = element.toLowerCase();
  
  // 判断这个元素是否与原查询有语义关联
  // 如果元素是查询的子集或相关概念，生成组合查询
  // 如果元素是独立概念，可能不应该关联
  
  // 地点相关
  if (/city|landmark|place|temple|tower|district|area|neighborhood/.test(e)) {
    return `${query} ${element}`;
  }
  
  // 时间/时期相关
  if (/period|era|century|year|decade|age|phase/.test(e)) {
    return `${query} during ${element}`;
  }
  
  // 风格/类型相关
  if (/style|type|category|genre|kind|variation/.test(e)) {
    return `${element} ${query}`;
  }
  
  // 活动/动作相关
  if (/visit|explore|see|experience|discover|learn|try/.test(e)) {
    return `${element} ${query}`;
  }
  
  // 属性/特征相关
  if (/famous|popular|best|top|beautiful|historic|modern|traditional/.test(e)) {
    return `${element} ${query}`;
  }
  
  // 如果是通用标签，判断是否适合组合
  // 某些标签可能不适合与原查询组合
  const genericTags = ['overview', 'info', 'more', 'all', 'general'];
  if (genericTags.some(t => e.includes(t))) {
    return null; // 不生成关联查询，点击时不触发搜索
  }
  
  // 默认：智能组合
  return `${query} ${element}`;
}

// AI 逻辑：基于查询上下文生成可交互元素
function generateInteractiveElements(query: string, aiResult: AITemplateResult): CompositionResult['interactiveElements'] {
  const { dynamicContent } = aiResult;
  const { tags = [], subItems = [] } = dynamicContent;
  
  // 为标签生成智能关联
  const interactiveTags: InteractiveElement[] = tags.map((tag, i) => {
    const relatedQuery = generateRelatedQuery(query, tag, 'tag');
    return {
      id: `tag-${i}`,
      label: tag,
      relatedQuery: relatedQuery || '',
      type: 'tag' as const,
      isClickable: relatedQuery !== null
    };
  });
  
  // 为卡片/子项生成智能关联
  const interactiveCards: InteractiveElement[] = subItems.map((item, i) => {
    const relatedQuery = generateRelatedQuery(query, item, 'card');
    return {
      id: `card-${i}`,
      label: item,
      relatedQuery: relatedQuery || '',
      type: 'card' as const,
      isClickable: relatedQuery !== null
    };
  });
  
  return { tags: interactiveTags, cards: interactiveCards };
}

function analyzeQueryAndCompose(query: string, aiResult: AITemplateResult): CompositionResult {
  const q = query.toLowerCase();
  const interactiveElements = generateInteractiveElements(query, aiResult);
  
  // 旅游/地点类
  if (/city|travel|visit|tour|landmark|temple|tower|museum|paris|tokyo|japan|kyoto|hong kong/.test(q)) {
    return {
      modules: [
        { type: 'hero', variant: 'gradient', order: 1 },
        { type: 'cards', variant: 'places', order: 2 },
        { type: 'gallery', variant: 'carousel', order: 3 }
      ],
      layout: 'stack',
      reasoning: 'Travel/Location query: Hero with gradient + Place cards + Image carousel',
      interactiveElements
    };
  }
  
  // 艺术/历史类
  if (/art|artist|painting|painter|period|picasso|monet|van gogh|renaissance|history|evolution/.test(q)) {
    return {
      modules: [
        { type: 'info', variant: 'sidebar', order: 1 },
        { type: 'gallery', variant: 'filmstrip', order: 2 },
        { type: 'cards', variant: 'topics', order: 3 }
      ],
      layout: 'split',
      reasoning: 'Art/History query: Sidebar info + Filmstrip gallery + Topic cards',
      interactiveElements
    };
  }
  
  // 教程/食谱类
  if (/how to|recipe|tutorial|step|make|cook|bake|diy|guide/.test(q)) {
    return {
      modules: [
        { type: 'info', variant: 'inline', order: 1 },
        { type: 'gallery', variant: 'grid', order: 2 },
        { type: 'cards', variant: 'explore', order: 3 }
      ],
      layout: 'stack',
      reasoning: 'Tutorial query: Inline info + Grid gallery + Explore cards',
      interactiveElements
    };
  }
  
  // 产品/实体类
  if (/product|phone|car|device|animal|species|helicopter|whale|dolphin|cat|dog/.test(q)) {
    return {
      modules: [
        { type: 'hero', variant: 'carousel', order: 1 },
        { type: 'info', variant: 'card', order: 2 },
        { type: 'cards', variant: 'topics', order: 3 }
      ],
      layout: 'grid',
      reasoning: 'Entity/Product query: Carousel hero + Info card + Topic cards',
      interactiveElements
    };
  }
  
  // 分类/风格类
  if (/types? of|styles?|design|architecture|comparison|vs|versus/.test(q)) {
    return {
      modules: [
        { type: 'hero', variant: 'overlay', order: 1 },
        { type: 'gallery', variant: 'masonry', order: 2 },
        { type: 'info', variant: 'inline', order: 3 }
      ],
      layout: 'stack',
      reasoning: 'Category/Style query: Overlay hero + Masonry gallery + Inline info',
      interactiveElements
    };
  }
  
  // 默认组合 - 通用探索
  return {
    modules: [
      { type: 'hero', variant: 'gradient', order: 1 },
      { type: 'info', variant: 'card', order: 2 },
      { type: 'gallery', variant: 'carousel', order: 3 },
      { type: 'cards', variant: 'explore', order: 4 }
    ],
    layout: 'stack',
    interactiveElements,
    reasoning: 'General query: Gradient hero + Info card + Carousel gallery + Explore cards'
  };
}

// ============================================================================
// A2UIDynamicTemplate Component
// ============================================================================

export function A2UIDynamicTemplate({
  query,
  aiResult,
  images,
  onImageClick,
  onQueryClick
}: A2UIDynamicTemplateProps) {
  const [composition, setComposition] = useState<CompositionResult | null>(null);

  useEffect(() => {
    // 分析查询并生成组合
    const result = analyzeQueryAndCompose(query, aiResult);
    setComposition(result);
    console.log('🤖 A2UI Composition:', result.reasoning);
  }, [query, aiResult]);

  if (!composition) return null;

  const { dynamicContent } = aiResult;
  const { title, description, subItems = [], tags = [] } = dynamicContent;

  // 准备卡片数据
  const cardItems: CardItem[] = subItems.slice(0, 5).map((name, i) => ({
    id: String(i),
    name,
    image: images[i + 1] || `https://picsum.photos/200/150?random=${i}`
  }));

  // 渲染单个模块
  const renderModule = (config: ModuleConfig, index: number) => {
    const key = `${config.type}-${config.variant}-${index}`;
    
    switch (config.type) {
      case 'hero':
        return (
          <HeroModule
            key={key}
            variant={config.variant as HeroVariant}
            title={title}
            description={description}
            images={images}
            height={config.variant === 'carousel' ? 360 : 320}
            onImageClick={(url) => onImageClick?.(url, title)}
            onTitleClick={() => onQueryClick?.(title)}
          />
        );
        
      case 'gallery':
        return (
          <GalleryModule
            key={key}
            variant={config.variant as GalleryVariant}
            images={images.slice(0, 12).map((url, i) => ({
              url,
              title: subItems[i] || `Image ${i + 1}`
            }))}
            columns={config.variant === 'masonry' ? 3 : 4}
            onImageClick={(url, idx) => onImageClick?.(url, `${title} ${idx + 1}`)}
          />
        );
        
      case 'info':
        return (
          <InfoModule
            key={key}
            variant={config.variant as InfoVariant}
            title={title}
            description={description}
            sources={[{ name: 'Wikipedia' }, { name: 'Reference' }]}
            tags={tags}
            fillHeight={composition.layout === 'grid'}
            onTitleClick={() => onQueryClick?.(title)}
            onTagClick={(tag) => {
              // 使用 AI 生成的关联查询
              const interactiveTag = composition.interactiveElements.tags.find(t => t.label === tag);
              if (interactiveTag?.isClickable && interactiveTag.relatedQuery) {
                onQueryClick?.(interactiveTag.relatedQuery);
              }
              // 如果 AI 判断不可点击，则不触发搜索
            }}
          />
        );
        
      case 'cards':
        return (
          <CardGridModule
            key={key}
            variant={config.variant as CardGridVariant}
            title={config.variant === 'topics' ? `Explore ${title}` : undefined}
            items={cardItems}
            columns={5}
            onCardClick={(item) => {
              // 使用 AI 生成的关联查询
              const interactiveCard = composition.interactiveElements.cards.find(c => c.label === item.name);
              if (interactiveCard?.isClickable && interactiveCard.relatedQuery) {
                onQueryClick?.(interactiveCard.relatedQuery);
              } else {
                // 如果没有预生成的查询，使用智能默认
                onQueryClick?.(`${query} ${item.name}`);
              }
            }}
          />
        );
        
      default:
        return null;
    }
  };

  // 排序模块
  const sortedModules = [...composition.modules].sort((a, b) => a.order - b.order);

  // Stack 布局 - 垂直堆叠
  if (composition.layout === 'stack') {
    return (
      <div style={containerStyle}>
        {/* AI 组合标识 */}
        <div style={badgeStyle}>
          <span>🤖</span>
          <span>AI Dynamic Composition</span>
          <span style={reasoningBadge}>{composition.modules.length} modules</span>
        </div>

        {/* 组合说明 */}
        <div style={reasoningStyle}>
          {composition.reasoning}
        </div>

        {/* 模块渲染 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1160px', overflow: 'hidden' }}>
          {sortedModules.map((module, index) => renderModule(module, index))}
        </div>
      </div>
    );
  }

  // Split 布局 - 左右分栏 (艺术类)
  if (composition.layout === 'split') {
    const leftModules = sortedModules.filter(m => m.type === 'info');
    const rightModules = sortedModules.filter(m => m.type !== 'info');
    
    return (
      <div style={containerStyle}>
        {/* AI 组合标识 */}
        <div style={badgeStyle}>
          <span>🤖</span>
          <span>AI Dynamic Composition</span>
          <span style={reasoningBadge}>{composition.modules.length} modules</span>
        </div>

        <div style={reasoningStyle}>
          {composition.reasoning}
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'stretch', maxWidth: '1160px' }}>
          {/* 左侧 - Info */}
          <div style={{ flex: '0 0 260px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            {leftModules.map((module, index) => renderModule(module, index))}
          </div>
          
          {/* 右侧 - Gallery + Cards */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'hidden' }}>
            {rightModules.map((module, index) => renderModule(module, index))}
          </div>
        </div>
      </div>
    );
  }

  // Grid 布局 - 产品类 (Hero + 右侧面板)
  if (composition.layout === 'grid') {
    const heroModule = sortedModules.find(m => m.type === 'hero');
    const otherModules = sortedModules.filter(m => m.type !== 'hero');
    
    // 计算固定高度以确保左右一致
    const fixedHeight = 480;
    
    return (
      <div style={containerStyle}>
        {/* AI 组合标识 */}
        <div style={badgeStyle}>
          <span>🤖</span>
          <span>AI Dynamic Composition</span>
          <span style={reasoningBadge}>{composition.modules.length} modules</span>
        </div>

        <div style={reasoningStyle}>
          {composition.reasoning}
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch', maxWidth: '1160px', height: fixedHeight }}>
          {/* 左侧 - Hero */}
          <div style={{ flex: '0 0 55%', minWidth: 0, overflow: 'hidden', height: '100%', borderRadius: '16px' }}>
            {heroModule && (
              <HeroModule
                key="hero-carousel-grid"
                variant="carousel"
                title={title}
                description={description}
                images={images}
                height={fixedHeight}
                onImageClick={(url) => onImageClick?.(url, title)}
                onTitleClick={() => onQueryClick?.(title)}
              />
            )}
          </div>
          
          {/* 右侧 - Info + Cards */}
          <div style={{ 
            flex: 1, 
            minWidth: 0, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            overflow: 'hidden',
            height: '100%'
          }}>
            {otherModules.map((module, index) => {
              // 为右侧模块设置 flex 使其填满空间
              if (module.type === 'info') {
                return (
                  <div key={`info-wrapper-${index}`} style={{ flex: 1, overflow: 'hidden' }}>
                    {renderModule(module, index)}
                  </div>
                );
              }
              return (
                <div key={`other-wrapper-${index}`} style={{ flexShrink: 0 }}>
                  {renderModule(module, index)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================================================
// Styles
// ============================================================================

const containerStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '20px',
  padding: '24px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  maxWidth: '1208px',
  width: '100%',
  margin: '0 auto',
  overflow: 'hidden',
  boxSizing: 'border-box'
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '20px',
  marginBottom: '12px',
  color: 'white',
  fontSize: '12px',
  fontWeight: 600
};

const reasoningBadge: React.CSSProperties = {
  padding: '2px 8px',
  background: 'rgba(255,255,255,0.2)',
  borderRadius: '10px',
  fontSize: '11px'
};

const reasoningStyle: React.CSSProperties = {
  padding: '12px 16px',
  background: '#f5f5f5',
  borderRadius: '12px',
  marginBottom: '20px',
  fontSize: '13px',
  color: 'rgba(0,0,0,0.6)',
  lineHeight: 1.5
};

export default A2UIDynamicTemplate;
