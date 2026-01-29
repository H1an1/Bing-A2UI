/**
 * A2UI Renderer - 真正的 Agent-to-UI 渲染引擎 v4
 * 
 * 遵循 ACF Guidelines:
 * 1. 最大宽度 1208px (基于 88px 单元网格)
 * 2. 使用 ACF Design Tokens (颜色、间距、圆角、阴影)
 * 3. 响应式设计 (小于 1208px 时自适应)
 */

import React, { CSSProperties, useState, useCallback, useEffect } from 'react';

// ============================================================================
// ACF Design Tokens (从 globals 2.css 提取)
// ============================================================================
const ACF_TOKENS = {
  // 最大宽度 (Figma 规范)
  maxWidth: '1208px',
  
  // 颜色
  colorForeNeutralPrimary: 'var(--acf-color-fore-neutral-primary, #000000)',
  colorForeNeutralSecondary: 'var(--acf-color-fore-neutral-secondary, rgba(0,0,0,0.8))',
  colorForeNeutralTertiary: 'var(--acf-color-fore-neutral-tertiary, rgba(0,0,0,0.75))',
  colorForeNeutralQuaternary: 'var(--acf-color-fore-neutral-quaternary, rgba(0,0,0,0.6))',
  colorBackNeutralPrimary: 'var(--acf-color-back-neutral-primary, #ffffff)',
  colorBackNeutralSecondary: 'var(--acf-color-back-neutral-secondary, #f5f5f5)',
  colorBackAccentPrimary: 'var(--acf-color-back-accent-primary, #ebf6ff)',
  colorFillAccentPrimary: 'var(--acf-color-fill-accent-primary, #0078d4)',
  colorStrokeNeutralSecondary: 'var(--acf-color-stroke-neutral-secondary, rgba(0,0,0,0.1))',
  
  // 间距
  spacingXs: 'var(--acf-spacing-xs, 8px)',
  spacingS: 'var(--acf-spacing-s, 12px)',
  spacingM: 'var(--acf-spacing-m, 16px)',
  spacingL: 'var(--acf-spacing-l, 20px)',
  spacingXl: 'var(--acf-spacing-xl, 24px)',
  spacing2xl: 'var(--acf-spacing-2xl, 36px)',
  
  // 圆角
  radiusS: 'var(--acf-radius-s, 4px)',
  radiusM: 'var(--acf-radius-m, 8px)',
  radiusL: 'var(--acf-radius-l, 16px)',
  radiusInfinite: 'var(--acf-radius-infinite, 9999px)',
  
  // 阴影
  elevation0: 'var(--acf-elevation-0, 0 0 0 1px rgba(0, 0, 0, 0.05))',
  elevation1: 'var(--acf-elevation-1, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px 1px rgba(0, 0, 0, 0.14))',
  elevation2: 'var(--acf-elevation-2, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px 1px rgba(0, 0, 0, 0.18))',
  elevation3: 'var(--acf-elevation-3, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 12px 1px rgba(0, 0, 0, 0.14))',
  
  // 字体
  fontFamily: "var(--acf-font-family, 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
  textBody3Size: 'var(--acf-text-body3-size, 14px)',
  textBody3Lineheight: 'var(--acf-text-body3-lineheight, 22px)',
  textCaption1Size: 'var(--acf-text-caption1-size, 13px)',
  textCaption1Lineheight: 'var(--acf-text-caption1-lineheight, 20px)',
  fontWeightRegular: 'var(--acf-font-weight-regular, 400)',
  fontWeightBold: 'var(--acf-font-weight-bold, 700)',
  
  // 过渡
  transitionBase: 'var(--acf-transition-base, 200ms)',
  transitionEase: 'var(--acf-transition-ease, cubic-bezier(0.4, 0, 0.2, 1))',
};

// ============================================================================
// 类型定义
// ============================================================================

export interface LayoutDescriptor {
  type: 'flex' | 'grid' | 'stack' | 'split' | 'absolute' | 'immersive';
  direction?: 'row' | 'column';
  gap?: string;
  columns?: string;
  rows?: string;
  areas?: string[];
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
  splitRatio?: string;
}

export interface DynamicStyle {
  width?: string;
  height?: string;
  minHeight?: string;
  maxWidth?: string;
  aspectRatio?: string;
  padding?: string;
  margin?: string;
  gap?: string;
  background?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  overflow?: string;
  opacity?: string;
  transform?: string;
  transition?: string;
  gridColumns?: number;
  variant?: string;
}

export type FeatureType = 
  | 'timeline' | 'timeline_horizontal' | 'timeline_filmstrip'
  | 'gallery' | 'gallery_masonry'
  | 'carousel' | 'carousel_3d'
  | 'hero' | 'hero_immersive' | 'hero_parallax'
  | 'list' | 'detail' | 'tags' | 'progress' | 'tabs' | 'slider' | 'cards' | 'cards_glass' | 'related';

export interface FeatureConfig {
  type: FeatureType;
  style?: DynamicStyle;
  data?: any;
  position?: string;
}

export interface ContentData {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    imageQuery: string;
    year?: number;
    metadata?: Record<string, any>;
  }>;
  categories?: Array<{ name: string; items?: any[] }>;
  timeline?: { periods: string[]; yearRange?: [number, number]; currentPeriod?: string };
  tags?: string[];
  source?: string;
  progress?: { current: number; total: number; title?: string; description?: string };
}

export interface A2UIDescriptor {
  layout: LayoutDescriptor;
  containerStyle?: DynamicStyle;
  features: FeatureConfig[];
  content: ContentData;
  relatedQueries?: string[];
  reasoning?: string;
}

interface A2UIRendererProps {
  descriptor: A2UIDescriptor;
  images: string[];
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
}

// ============================================================================
// 工具函数
// ============================================================================

function toCSS(style?: DynamicStyle): CSSProperties {
  if (!style) return {};
  const css: CSSProperties = {};
  const skipKeys = ['variant', 'gridColumns'];
  Object.entries(style).forEach(([key, value]) => {
    if (value && !skipKeys.includes(key)) {
      (css as any)[key] = value;
    }
  });
  return css;
}

// ============================================================================
// 特性组件 Props
// ============================================================================

interface FeatureProps {
  config: FeatureConfig;
  content: ContentData;
  images: string[];
  imageOffset: number;
  onViewImage: (url: string, title?: string) => void;
  onSwitchTab: (tab: string) => void;
  onSwitchPeriod: (period: string) => void;
  onExpandDetail: (id: string) => void;
  onNewSearch: (query: string) => void;
  onFilterByTag: (tag: string) => void;
  activeTab?: string;
  activePeriod?: string;
  expandedId?: string;
  activeTag?: string;
}

// ============================================================================
// 🎠 Carousel - 轮播组件 (遵循 ACF Image Card 规范)
// ============================================================================
function CarouselFeature({ config, content, images, imageOffset, onViewImage }: FeatureProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = content.items || [];
  const total = Math.min(items.length, images.length - imageOffset, 8);
  
  const next = () => setCurrentIndex(i => (i + 1) % total);
  const prev = () => setCurrentIndex(i => (i - 1 + total) % total);
  
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [total]);
  
  if (total <= 0) return null;
  
  return (
    <div className="acf-image-card" style={{ 
      ...toCSS(config.style), 
      position: 'relative',
      borderRadius: ACF_TOKENS.radiusL,
      overflow: 'hidden',
      background: '#000',
      width: '100%',
      maxWidth: ACF_TOKENS.maxWidth,
    }}>
      {/* 主图区域 */}
      <div style={{ position: 'relative', height: '424px', overflow: 'hidden' }}>
        {items.slice(0, total).map((item, i) => {
          const imgIndex = imageOffset + i;
          return (
            <div
              key={item.id}
              onClick={() => onViewImage(images[imgIndex], item.title)}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === currentIndex ? 1 : 0,
                transform: `scale(${i === currentIndex ? 1 : 1.05})`,
                transition: `all ${ACF_TOKENS.transitionBase} ${ACF_TOKENS.transitionEase}`,
                cursor: 'pointer'
              }}
            >
              <img 
                src={images[imgIndex]} 
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
              }} />
            </div>
          );
        })}
        
        {/* 文字信息 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: ACF_TOKENS.spacingXl, color: 'white', zIndex: 10
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: ACF_TOKENS.fontWeightBold, 
            fontFamily: ACF_TOKENS.fontFamily,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)' 
          }}>
            {items[currentIndex]?.title}
          </h2>
          {items[currentIndex]?.subtitle && (
            <p style={{ margin: '8px 0 0', fontSize: ACF_TOKENS.textBody3Size, opacity: 0.9 }}>
              {items[currentIndex].subtitle}
            </p>
          )}
        </div>
        
        {/* 导航按钮 (ACF 风格) */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          style={{
            position: 'absolute', left: ACF_TOKENS.spacingM, top: '50%', transform: 'translateY(-50%)',
            width: '36px', height: '48px', borderRadius: `${ACF_TOKENS.radiusM} 0 0 ${ACF_TOKENS.radiusM}`,
            border: 'none', background: 'rgba(255,255,255,0.95)', boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
            color: ACF_TOKENS.colorForeNeutralPrimary, fontSize: '20px', cursor: 'pointer', zIndex: 20
          }}
        >‹</button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          style={{
            position: 'absolute', right: ACF_TOKENS.spacingM, top: '50%', transform: 'translateY(-50%)',
            width: '36px', height: '48px', borderRadius: `0 ${ACF_TOKENS.radiusM} ${ACF_TOKENS.radiusM} 0`,
            border: 'none', background: 'rgba(255,255,255,0.95)', boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
            color: ACF_TOKENS.colorForeNeutralPrimary, fontSize: '20px', cursor: 'pointer', zIndex: 20
          }}
        >›</button>
      </div>
      
      {/* 缩略图导航 (ACF Carousel 风格) */}
      <div style={{
        display: 'flex', gap: ACF_TOKENS.spacingXs, padding: `${ACF_TOKENS.spacingS} ${ACF_TOKENS.spacingM}`,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', overflowX: 'auto'
      }}>
        {items.slice(0, total).map((item, i) => {
          const imgIndex = imageOffset + i;
          return (
            <div
              key={item.id}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: '72px', height: '45px', borderRadius: ACF_TOKENS.radiusS, overflow: 'hidden',
                cursor: 'pointer', opacity: i === currentIndex ? 1 : 0.5,
                transform: i === currentIndex ? 'scale(1.05)' : 'scale(1)',
                transition: `all ${ACF_TOKENS.transitionBase}`,
                border: i === currentIndex ? '2px solid white' : '2px solid transparent',
                flexShrink: 0
              }}
            >
              <img src={images[imgIndex]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 🌟 Immersive Hero - 沉浸式大图 (标签点击切换内容)
// ============================================================================
function ImmersiveHeroFeature({ config, content, images, imageOffset, onViewImage, onFilterByTag, activeTag }: FeatureProps) {
  const [isHovered, setIsHovered] = useState(false);
  const tags = content.tags || [];
  const currentTagIndex = activeTag ? tags.indexOf(activeTag) : 0;
  const displayImageIndex = imageOffset + (currentTagIndex >= 0 ? currentTagIndex : 0);
  
  return (
    <div 
      className="acf-image-card"
      style={{
        ...toCSS(config.style),
        position: 'relative',
        height: '424px', // ACF 4x 高度
        borderRadius: ACF_TOKENS.radiusL,
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%',
        maxWidth: ACF_TOKENS.maxWidth,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewImage(images[displayImageIndex], content.title)}
    >
      {/* 背景模糊图 */}
      <div style={{
        position: 'absolute', inset: '-20px',
        backgroundImage: `url(${images[displayImageIndex]})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(20px)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1.05)',
        transition: `all ${ACF_TOKENS.transitionBase} ${ACF_TOKENS.transitionEase}`
      }} />
      
      {/* 主图 */}
      <div style={{
        position: 'absolute', inset: ACF_TOKENS.spacingXl, borderRadius: ACF_TOKENS.radiusL, overflow: 'hidden',
        boxShadow: ACF_TOKENS.elevation3
      }}>
        <img 
          src={images[displayImageIndex]} 
          alt={content.title}
          style={{ 
            width: '100%', height: '100%', objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: `all ${ACF_TOKENS.transitionBase} ${ACF_TOKENS.transitionEase}`
          }}
        />
      </div>
      
      {/* 内容层 */}
      <div style={{
        position: 'absolute', inset: ACF_TOKENS.spacingXl, borderRadius: ACF_TOKENS.radiusL,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: ACF_TOKENS.spacingXl
      }}>
        <div style={{ transform: isHovered ? 'translateY(-8px)' : 'translateY(0)', transition: 'transform 0.5s' }}>
          <h1 style={{ 
            margin: 0, fontSize: '32px', fontWeight: ACF_TOKENS.fontWeightBold, 
            color: 'white', fontFamily: ACF_TOKENS.fontFamily, letterSpacing: '-0.02em' 
          }}>
            {content.title}
          </h1>
          {content.subtitle && (
            <p style={{ margin: '12px 0 0', fontSize: ACF_TOKENS.textBody3Size, color: 'rgba(255,255,255,0.8)', maxWidth: '500px' }}>
              {content.subtitle}
            </p>
          )}
          
          {/* 标签 - 点击切换内容而非搜索 (ACF Badge 风格) */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: ACF_TOKENS.spacingXs, marginTop: ACF_TOKENS.spacingM, flexWrap: 'wrap' }}>
              {tags.slice(0, 5).map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => { e.stopPropagation(); onFilterByTag(tag); }}
                  className="acf-badge"
                  style={{
                    padding: `${ACF_TOKENS.spacingXs} ${ACF_TOKENS.spacingM}`, 
                    borderRadius: ACF_TOKENS.radiusInfinite,
                    border: activeTag === tag ? '2px solid white' : '1px solid rgba(255,255,255,0.3)',
                    background: activeTag === tag ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)', color: 'white', 
                    fontSize: ACF_TOKENS.textCaption1Size,
                    cursor: 'pointer', transition: `all ${ACF_TOKENS.transitionBase}`, 
                    fontWeight: activeTag === tag ? ACF_TOKENS.fontWeightBold : ACF_TOKENS.fontWeightRegular
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 🎬 Filmstrip Timeline (ACF 风格)
// ============================================================================
function FilmstripTimelineFeature({ config, content, images, imageOffset, onViewImage, onSwitchPeriod, activePeriod }: FeatureProps) {
  const items = content.items || [];
  const timeline = content.timeline;
  const currentPeriod = activePeriod || timeline?.currentPeriod || timeline?.periods?.[0] || '';
  
  return (
    <div className="acf-timeline-gallery" style={{ 
      ...toCSS(config.style), 
      width: '100%', 
      maxWidth: ACF_TOKENS.maxWidth,
      background: '#1a1a1a',
      borderRadius: ACF_TOKENS.radiusL,
      padding: ACF_TOKENS.spacingL,
    }}>
      {timeline?.periods && (
        <div style={{ 
          display: 'flex', gap: '4px', marginBottom: ACF_TOKENS.spacingM, 
          background: '#2a2a2a', padding: '6px', borderRadius: ACF_TOKENS.radiusM 
        }}>
          {timeline.periods.map(period => (
            <button
              key={period}
              onClick={() => onSwitchPeriod(period)}
              className="acf-button"
              style={{
                flex: 1, padding: `10px ${ACF_TOKENS.spacingM}`, borderRadius: ACF_TOKENS.radiusM, border: 'none',
                background: currentPeriod === period ? ACF_TOKENS.colorFillAccentPrimary : 'transparent',
                color: 'white', fontSize: ACF_TOKENS.textCaption1Size, 
                fontWeight: currentPeriod === period ? ACF_TOKENS.fontWeightBold : ACF_TOKENS.fontWeightRegular,
                cursor: 'pointer', transition: `all ${ACF_TOKENS.transitionBase}`
              }}
            >{period}</button>
          ))}
        </div>
      )}
      
      <div style={{ 
        display: 'flex', gap: ACF_TOKENS.spacingM, overflowX: 'auto', 
        padding: `${ACF_TOKENS.spacingM} 0`, scrollSnapType: 'x mandatory' 
      }}>
        {items.slice(0, 8).map((item, i) => {
          const imgIndex = imageOffset + i;
          return (
            <div
              key={item.id}
              onClick={() => onViewImage(images[imgIndex], item.title)}
              style={{ flexShrink: 0, width: '200px', scrollSnapAlign: 'start', cursor: 'pointer' }}
            >
              {/* 胶片孔 - 上 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginBottom: '-6px', position: 'relative', zIndex: 1 }}>
                {[...Array(4)].map((_, j) => <div key={j} style={{ width: '10px', height: '6px', background: '#333', borderRadius: '2px' }} />)}
              </div>
              {/* 图片区域 */}
              <div style={{ background: '#1a1a1a', padding: ACF_TOKENS.spacingS, borderRadius: ACF_TOKENS.radiusS }}>
                <div style={{ 
                  aspectRatio: '16/10', borderRadius: '2px', overflow: 'hidden', 
                  boxShadow: '0 4px 16px rgba(0,0,0,0.4)' 
                }}>
                  <img src={images[imgIndex]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ marginTop: ACF_TOKENS.spacingXs, color: 'white' }}>
                  <div style={{ fontSize: ACF_TOKENS.textCaption1Size, fontWeight: ACF_TOKENS.fontWeightBold }}>{item.title}</div>
                  {item.year && <div style={{ fontSize: '11px', color: '#888', marginTop: '3px' }}>{item.year}</div>}
                </div>
              </div>
              {/* 胶片孔 - 下 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginTop: '-6px', position: 'relative', zIndex: 1 }}>
                {[...Array(4)].map((_, j) => <div key={j} style={{ width: '10px', height: '6px', background: '#333', borderRadius: '2px' }} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 🏛️ Horizontal Timeline (ACF 风格)
// ============================================================================
function HorizontalTimelineFeature({ config, content, images, imageOffset, onViewImage }: FeatureProps) {
  const items = content.items || [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div className="acf-card" style={{ 
      ...toCSS(config.style), 
      width: '100%', 
      maxWidth: ACF_TOKENS.maxWidth,
      background: ACF_TOKENS.colorBackNeutralPrimary,
      borderRadius: ACF_TOKENS.radiusL,
      padding: ACF_TOKENS.spacingXl,
      boxShadow: ACF_TOKENS.elevation1,
    }}>
      {content.title && (
        <h2 style={{ 
          margin: `0 0 ${ACF_TOKENS.spacingL}`, fontSize: '20px', fontWeight: ACF_TOKENS.fontWeightBold,
          color: ACF_TOKENS.colorFillAccentPrimary, fontFamily: ACF_TOKENS.fontFamily
        }}>{content.title}</h2>
      )}
      
      <div style={{ position: 'relative', padding: `${ACF_TOKENS.spacing2xl} 0` }}>
        {/* 时间轴线 */}
        <div style={{
          position: 'absolute', top: '50%', left: '32px', right: '32px', height: '3px',
          background: `linear-gradient(90deg, ${ACF_TOKENS.colorFillAccentPrimary} 0%, #764ba2 50%, #f472b6 100%)`,
          borderRadius: '2px', transform: 'translateY(-50%)'
        }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: `0 ${ACF_TOKENS.spacingM}`, position: 'relative' }}>
          {items.slice(0, 5).map((item, i) => {
            const imgIndex = imageOffset + i;
            return (
              <div
                key={item.id}
                style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'column' : 'column-reverse', alignItems: 'center', gap: ACF_TOKENS.spacingS, flex: 1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  onClick={() => onViewImage(images[imgIndex], item.title)}
                  style={{
                    width: '100px', cursor: 'pointer',
                    transform: hoveredIndex === i ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
                    transition: `all ${ACF_TOKENS.transitionBase}`
                  }}
                >
                  <div style={{
                    aspectRatio: '1', borderRadius: ACF_TOKENS.radiusM, overflow: 'hidden',
                    boxShadow: hoveredIndex === i ? ACF_TOKENS.elevation3 : ACF_TOKENS.elevation1
                  }}>
                    <img src={images[imgIndex]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ 
                    marginTop: '6px', textAlign: 'center', 
                    fontSize: '12px', fontWeight: '500', 
                    color: hoveredIndex === i ? ACF_TOKENS.colorFillAccentPrimary : ACF_TOKENS.colorForeNeutralPrimary 
                  }}>
                    {item.title}
                  </div>
                </div>
                <div style={{ width: '2px', height: '24px', background: `linear-gradient(to bottom, ${ACF_TOKENS.colorFillAccentPrimary}, #764ba2)` }} />
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: hoveredIndex === i ? ACF_TOKENS.colorFillAccentPrimary : 'white',
                  border: `3px solid ${ACF_TOKENS.colorFillAccentPrimary}`, transition: `all ${ACF_TOKENS.transitionBase}`
                }} />
                {item.year && <div style={{ fontSize: '12px', fontWeight: ACF_TOKENS.fontWeightBold, color: hoveredIndex === i ? ACF_TOKENS.colorFillAccentPrimary : ACF_TOKENS.colorForeNeutralQuaternary }}>{item.year}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 🌊 Masonry Gallery (ACF Image Card 风格)
// ============================================================================
function MasonryGalleryFeature({ config, content, images, imageOffset, onViewImage, activeTag }: FeatureProps) {
  const items = content.items || [];
  const filteredItems = activeTag 
    ? items.filter(item => item.metadata?.tags?.includes(activeTag) || item.title.toLowerCase().includes(activeTag.toLowerCase()))
    : items;
  
  const displayItems = filteredItems.slice(0, 9);
  const columns: typeof displayItems[] = [[], [], []];
  displayItems.forEach((item, i) => columns[i % 3].push(item));
  
  return (
    <div className="acf-image-card" style={{ 
      ...toCSS(config.style), 
      display: 'flex', gap: ACF_TOKENS.spacingS,
      width: '100%', maxWidth: ACF_TOKENS.maxWidth,
    }}>
      {columns.map((column, colIndex) => (
        <div key={colIndex} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: ACF_TOKENS.spacingS }}>
          {column.map((item, i) => {
            const globalIndex = colIndex + i * 3;
            const imgIndex = imageOffset + globalIndex;
            const heights = ['260px', '320px', '200px', '280px'];
            
            return (
              <div
                key={item.id}
                onClick={() => onViewImage(images[imgIndex], item.title)}
                style={{
                  height: heights[i % heights.length], borderRadius: ACF_TOKENS.radiusL, overflow: 'hidden',
                  cursor: 'pointer', position: 'relative', boxShadow: ACF_TOKENS.elevation1,
                  transition: `all ${ACF_TOKENS.transitionBase} ${ACF_TOKENS.transitionEase}`
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = ACF_TOKENS.elevation3; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ACF_TOKENS.elevation1; }}
              >
                <img src={images[imgIndex]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: ACF_TOKENS.spacingM,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', color: 'white'
                }}>
                  <div style={{ fontSize: ACF_TOKENS.textBody3Size, fontWeight: ACF_TOKENS.fontWeightBold }}>{item.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 💎 Glass Cards (ACF Card 风格)
// ============================================================================
function GlassCardsFeature({ config, content, images, imageOffset, onViewImage, onNewSearch }: FeatureProps) {
  const items = content.items || [];
  const columns = config.style?.gridColumns || 3;
  
  return (
    <div className="acf-card--themed" style={{
      ...toCSS(config.style), 
      display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: ACF_TOKENS.spacingM,
      padding: ACF_TOKENS.spacingL, background: ACF_TOKENS.colorBackAccentPrimary,
      borderRadius: ACF_TOKENS.radiusL, 
      width: '100%', maxWidth: ACF_TOKENS.maxWidth,
    }}>
      {items.slice(0, 6).map((item, i) => {
        const imgIndex = imageOffset + i;
        return (
          <div
            key={item.id}
            className="acf-card acf-card--interactive"
            style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderRadius: ACF_TOKENS.radiusL,
              overflow: 'hidden', border: `1px solid ${ACF_TOKENS.colorStrokeNeutralSecondary}`, 
              boxShadow: ACF_TOKENS.elevation1,
              transition: `all ${ACF_TOKENS.transitionBase} ${ACF_TOKENS.transitionEase}`
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = ACF_TOKENS.elevation3; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ACF_TOKENS.elevation1; }}
          >
            <div style={{ aspectRatio: '16/10', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onViewImage(images[imgIndex], item.title)}>
              <img src={images[imgIndex]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: ACF_TOKENS.spacingM }}>
              <h4 style={{
                margin: 0, fontSize: ACF_TOKENS.textBody3Size, fontWeight: ACF_TOKENS.fontWeightBold, cursor: 'pointer',
                color: ACF_TOKENS.colorFillAccentPrimary
              }} onClick={() => onNewSearch(item.title)}>{item.title}</h4>
              {item.description && <p style={{ margin: `${ACF_TOKENS.spacingXs} 0 0`, fontSize: ACF_TOKENS.textCaption1Size, color: ACF_TOKENS.colorForeNeutralTertiary, lineHeight: 1.5 }}>{item.description.slice(0, 80)}...</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 基础特性组件 (ACF 风格)
// ============================================================================

function TimelineFeature({ config, content, onSwitchPeriod, activePeriod }: FeatureProps) {
  const timeline = content.timeline;
  if (!timeline) return null;
  const currentPeriod = activePeriod || timeline?.currentPeriod || timeline?.periods?.[0] || '';
  
  return (
    <div className="acf-timeline-gallery__nav" style={{ ...toCSS(config.style), width: '100%', maxWidth: ACF_TOKENS.maxWidth }}>
      <div style={{ display: 'flex', gap: ACF_TOKENS.spacingXs, flexWrap: 'wrap' }}>
        {timeline.periods.map(period => (
          <button key={period} onClick={() => onSwitchPeriod(period)} className="acf-button" style={{
            padding: `10px ${ACF_TOKENS.spacingM}`, borderRadius: ACF_TOKENS.radiusInfinite, border: 'none',
            background: currentPeriod === period ? ACF_TOKENS.colorFillAccentPrimary : ACF_TOKENS.colorBackNeutralSecondary,
            color: currentPeriod === period ? 'white' : ACF_TOKENS.colorForeNeutralPrimary, cursor: 'pointer',
            fontWeight: currentPeriod === period ? ACF_TOKENS.fontWeightBold : ACF_TOKENS.fontWeightRegular, 
            transition: `all ${ACF_TOKENS.transitionBase}`,
            boxShadow: currentPeriod === period ? ACF_TOKENS.elevation2 : 'none'
          }}>{period}</button>
        ))}
      </div>
    </div>
  );
}

function GalleryFeature({ config, content, images, imageOffset, onViewImage }: FeatureProps) {
  const items = content.items || [];
  const columns = config.style?.gridColumns || 4;
  
  return (
    <div className="acf-image-card__grid" style={{ 
      ...toCSS(config.style), 
      display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '2px',
      borderRadius: ACF_TOKENS.radiusL, overflow: 'hidden',
      width: '100%', maxWidth: ACF_TOKENS.maxWidth,
    }}>
      {items.slice(0, 8).map((item, i) => {
        const imgIndex = imageOffset + i;
        return (
          <div key={item.id} onClick={() => onViewImage(images[imgIndex], item.title)} style={{
            aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer',
            position: 'relative', transition: `all ${ACF_TOKENS.transitionBase}`
          }}
            onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) (img as HTMLElement).style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) (img as HTMLElement).style.transform = 'scale(1)'; }}
          >
            <img src={images[imgIndex]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: `transform ${ACF_TOKENS.transitionBase}` }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: ACF_TOKENS.spacingXs,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', fontSize: '12px', fontWeight: '500'
            }}>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
}

function HeroFeature({ config, content, images, imageOffset, onViewImage }: FeatureProps) {
  return (
    <div className="acf-image-card" style={{ 
      ...toCSS(config.style), 
      position: 'relative', height: '320px', borderRadius: ACF_TOKENS.radiusL, overflow: 'hidden', 
      cursor: 'pointer', boxShadow: ACF_TOKENS.elevation2,
      width: '100%', maxWidth: ACF_TOKENS.maxWidth,
    }}
      onClick={() => onViewImage(images[imageOffset], content.title)}
    >
      <img src={images[imageOffset]} alt={content.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: ACF_TOKENS.spacingXl,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: 'white'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: ACF_TOKENS.fontWeightBold }}>{content.title}</h2>
        {content.subtitle && <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: ACF_TOKENS.textBody3Size }}>{content.subtitle}</p>}
      </div>
    </div>
  );
}

function DetailFeature({ config, content, expandedId, onExpandDetail }: FeatureProps) {
  const isExpanded = expandedId === 'detail';
  const description = content.description || '';
  const needsTruncate = description.length > 200;
  
  return (
    <div className="acf-card" style={{ 
      ...toCSS(config.style), 
      padding: ACF_TOKENS.spacingL, background: ACF_TOKENS.colorBackNeutralSecondary, 
      borderRadius: ACF_TOKENS.radiusL,
      width: '100%', maxWidth: ACF_TOKENS.maxWidth,
    }}>
      {content.title && <h2 style={{ margin: `0 0 ${ACF_TOKENS.spacingM}`, fontSize: '18px', fontWeight: ACF_TOKENS.fontWeightBold }}>{content.title}</h2>}
      {description && (
        <p style={{ margin: 0, fontSize: ACF_TOKENS.textBody3Size, lineHeight: 1.8, color: ACF_TOKENS.colorForeNeutralSecondary }}>
          {isExpanded ? description : description.slice(0, 200)}{needsTruncate && !isExpanded && '...'}
        </p>
      )}
      {needsTruncate && (
        <button onClick={() => onExpandDetail(isExpanded ? '' : 'detail')} className="acf-button acf-button--primary" style={{
          marginTop: ACF_TOKENS.spacingS, padding: `${ACF_TOKENS.spacingXs} ${ACF_TOKENS.spacingM}`,
          background: ACF_TOKENS.colorFillAccentPrimary, border: 'none', borderRadius: ACF_TOKENS.radiusInfinite, 
          color: 'white', fontSize: ACF_TOKENS.textCaption1Size, cursor: 'pointer'
        }}>{isExpanded ? '收起' : '展开更多'}</button>
      )}
    </div>
  );
}

function TagsFeature({ config, content, onNewSearch }: FeatureProps) {
  const tags = content.tags || [];
  return (
    <div style={{ ...toCSS(config.style), display: 'flex', flexWrap: 'wrap', gap: ACF_TOKENS.spacingXs, width: '100%', maxWidth: ACF_TOKENS.maxWidth }}>
      {tags.map(tag => (
        <button key={tag} onClick={() => onNewSearch(tag)} className="acf-badge" style={{
          padding: `${ACF_TOKENS.spacingXs} ${ACF_TOKENS.spacingM}`, borderRadius: ACF_TOKENS.radiusInfinite, 
          border: `2px solid ${ACF_TOKENS.colorFillAccentPrimary}`, background: 'transparent',
          color: ACF_TOKENS.colorFillAccentPrimary, fontSize: ACF_TOKENS.textCaption1Size, 
          fontWeight: '500', cursor: 'pointer', transition: `all ${ACF_TOKENS.transitionBase}`
        }}
          onMouseEnter={e => { e.currentTarget.style.background = ACF_TOKENS.colorFillAccentPrimary; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ACF_TOKENS.colorFillAccentPrimary; }}
        >{tag}</button>
      ))}
    </div>
  );
}

function ListFeature({ config, content, images, imageOffset, onExpandDetail, onNewSearch, expandedId }: FeatureProps) {
  const items = content.items || [];
  return (
    <div style={{ ...toCSS(config.style), display: 'flex', flexDirection: 'column', gap: ACF_TOKENS.spacingS, width: '100%', maxWidth: ACF_TOKENS.maxWidth }}>
      {items.slice(0, 5).map((item, i) => {
        const isExpanded = expandedId === item.id;
        const imgIndex = imageOffset + i;
        return (
          <div key={item.id} className="acf-card" style={{ padding: ACF_TOKENS.spacingM, background: ACF_TOKENS.colorBackNeutralSecondary, borderRadius: ACF_TOKENS.radiusM }}>
            <div style={{ display: 'flex', gap: ACF_TOKENS.spacingM, cursor: 'pointer' }} onClick={() => onExpandDetail(isExpanded ? '' : item.id)}>
              <img src={images[imgIndex]} alt={item.title} style={{ width: '64px', height: '64px', borderRadius: ACF_TOKENS.radiusM, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: ACF_TOKENS.fontWeightBold, fontSize: ACF_TOKENS.textBody3Size }}>{item.title}</div>
                {item.subtitle && <div style={{ fontSize: '12px', color: ACF_TOKENS.colorForeNeutralQuaternary, marginTop: '3px' }}>{item.subtitle}</div>}
              </div>
            </div>
            {isExpanded && item.description && (
              <div style={{ marginTop: ACF_TOKENS.spacingM, paddingTop: ACF_TOKENS.spacingM, borderTop: `1px solid ${ACF_TOKENS.colorStrokeNeutralSecondary}` }}>
                <p style={{ margin: 0, fontSize: ACF_TOKENS.textCaption1Size, color: ACF_TOKENS.colorForeNeutralTertiary }}>{item.description}</p>
                <button onClick={() => onNewSearch(item.title)} className="acf-button acf-button--primary" style={{ marginTop: ACF_TOKENS.spacingS, padding: `${ACF_TOKENS.spacingXs} ${ACF_TOKENS.spacingM}`, background: ACF_TOKENS.colorFillAccentPrimary, color: 'white', border: 'none', borderRadius: ACF_TOKENS.radiusM, cursor: 'pointer', fontSize: '12px' }}>搜索更多</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CardsFeature({ config, content, images, imageOffset, onViewImage, onNewSearch }: FeatureProps) {
  const items = content.items || [];
  const columns = config.style?.gridColumns || 3;
  return (
    <div style={{ ...toCSS(config.style), display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: ACF_TOKENS.spacingM, width: '100%', maxWidth: ACF_TOKENS.maxWidth }}>
      {items.slice(0, 6).map((item, i) => {
        const imgIndex = imageOffset + i;
        return (
          <div key={item.id} className="acf-card acf-card--interactive" style={{ background: 'white', borderRadius: ACF_TOKENS.radiusL, overflow: 'hidden', boxShadow: ACF_TOKENS.elevation1, transition: `all ${ACF_TOKENS.transitionBase}` }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = ACF_TOKENS.elevation3; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ACF_TOKENS.elevation1; }}
          >
            <div style={{ aspectRatio: '16/10', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onViewImage(images[imgIndex], item.title)}>
              <img src={images[imgIndex]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: ACF_TOKENS.spacingM }}>
              <h4 style={{ margin: 0, fontSize: ACF_TOKENS.textBody3Size, fontWeight: ACF_TOKENS.fontWeightBold, cursor: 'pointer' }} onClick={() => onNewSearch(item.title)}>{item.title}</h4>
              {item.description && <p style={{ margin: `${ACF_TOKENS.spacingXs} 0 0`, fontSize: ACF_TOKENS.textCaption1Size, color: ACF_TOKENS.colorForeNeutralQuaternary }}>{item.description.slice(0, 70)}...</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TabsFeature({ config, content, onSwitchTab, activeTab }: FeatureProps) {
  const categories = content.categories || [];
  const currentTab = activeTab || categories?.[0]?.name || '';
  return (
    <div style={{ ...toCSS(config.style), width: '100%', maxWidth: ACF_TOKENS.maxWidth }}>
      <div style={{ display: 'flex', gap: '6px', background: ACF_TOKENS.colorBackNeutralSecondary, padding: '5px', borderRadius: ACF_TOKENS.radiusM }}>
        {categories.map(cat => (
          <button key={cat.name} onClick={() => onSwitchTab(cat.name)} className="acf-button" style={{
            flex: 1, padding: `10px ${ACF_TOKENS.spacingM}`, borderRadius: ACF_TOKENS.radiusM, border: 'none',
            background: currentTab === cat.name ? 'white' : 'transparent',
            color: currentTab === cat.name ? ACF_TOKENS.colorFillAccentPrimary : ACF_TOKENS.colorForeNeutralQuaternary, 
            fontWeight: currentTab === cat.name ? ACF_TOKENS.fontWeightBold : ACF_TOKENS.fontWeightRegular,
            cursor: 'pointer', transition: `all ${ACF_TOKENS.transitionBase}`, 
            boxShadow: currentTab === cat.name ? ACF_TOKENS.elevation1 : 'none'
          }}>{cat.name}</button>
        ))}
      </div>
    </div>
  );
}

function ProgressFeature({ config, content }: FeatureProps) {
  const progressData = content.progress || { current: 1, total: 5 };
  const progress = (progressData.current / progressData.total) * 100;
  return (
    <div style={{ ...toCSS(config.style), width: '100%', maxWidth: ACF_TOKENS.maxWidth }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: ACF_TOKENS.textCaption1Size, fontWeight: '500' }}>
        <span>Step {progressData.current} of {progressData.total}</span>
        <span style={{ color: ACF_TOKENS.colorFillAccentPrimary }}>{Math.round(progress)}%</span>
      </div>
      <div style={{ height: '6px', background: ACF_TOKENS.colorBackNeutralSecondary, borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${ACF_TOKENS.colorFillAccentPrimary} 0%, #764ba2 100%)`, transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}

function RelatedFeature({ config, content, onNewSearch }: FeatureProps) {
  const items = content.items?.slice(0, 4) || [];
  return (
    <div style={{ ...toCSS(config.style), width: '100%', maxWidth: ACF_TOKENS.maxWidth }}>
      <h4 style={{ margin: `0 0 ${ACF_TOKENS.spacingS}`, fontSize: ACF_TOKENS.textBody3Size, fontWeight: ACF_TOKENS.fontWeightBold, color: ACF_TOKENS.colorForeNeutralPrimary }}>🔗 Related Topics</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: ACF_TOKENS.spacingXs }}>
        {items.map(item => (
          <button key={item.id} onClick={() => onNewSearch(item.title)} className="acf-badge" style={{
            padding: `${ACF_TOKENS.spacingXs} ${ACF_TOKENS.spacingM}`, borderRadius: ACF_TOKENS.radiusInfinite, border: 'none',
            background: ACF_TOKENS.colorBackAccentPrimary, color: ACF_TOKENS.colorFillAccentPrimary, 
            fontSize: ACF_TOKENS.textCaption1Size, fontWeight: '500', cursor: 'pointer'
          }}>{item.title}</button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 主渲染器
// ============================================================================

export function A2UIRenderer({ descriptor, images, onImageClick, onQueryClick }: A2UIRendererProps) {
  const { layout, containerStyle, features, content, relatedQueries, reasoning } = descriptor;
  
  const [activeTab, setActiveTab] = useState<string | undefined>(content?.categories?.[0]?.name);
  const [activePeriod, setActivePeriod] = useState<string | undefined>(content?.timeline?.currentPeriod || content?.timeline?.periods?.[0]);
  const [expandedId, setExpandedId] = useState<string | undefined>();
  const [activeTag, setActiveTag] = useState<string | undefined>();
  
  const handleViewImage = useCallback((url: string, title?: string) => onImageClick?.(url, title), [onImageClick]);
  const handleSwitchTab = useCallback((tab: string) => setActiveTab(tab), []);
  const handleSwitchPeriod = useCallback((period: string) => setActivePeriod(period), []);
  const handleExpandDetail = useCallback((id: string) => setExpandedId(id), []);
  const handleNewSearch = useCallback((query: string) => onQueryClick?.(query), [onQueryClick]);
  const handleFilterByTag = useCallback((tag: string) => {
    setActiveTag(prev => prev === tag ? undefined : tag);
  }, []);
  
  const getImageOffset = (index: number): number => index * 6;
  
  const renderFeature = (feature: FeatureConfig, index: number) => {
    const props: FeatureProps = {
      config: feature,
      content,
      images,
      imageOffset: getImageOffset(index),
      onViewImage: handleViewImage,
      onSwitchTab: handleSwitchTab,
      onSwitchPeriod: handleSwitchPeriod,
      onExpandDetail: handleExpandDetail,
      onNewSearch: handleNewSearch,
      onFilterByTag: handleFilterByTag,
      activeTab,
      activePeriod,
      expandedId,
      activeTag
    };
    
    switch (feature.type) {
      case 'carousel': case 'carousel_3d': return <CarouselFeature key={index} {...props} />;
      case 'hero_immersive': case 'hero_parallax': return <ImmersiveHeroFeature key={index} {...props} />;
      case 'timeline_filmstrip': return <FilmstripTimelineFeature key={index} {...props} />;
      case 'timeline_horizontal': return <HorizontalTimelineFeature key={index} {...props} />;
      case 'gallery_masonry': return <MasonryGalleryFeature key={index} {...props} />;
      case 'cards_glass': return <GlassCardsFeature key={index} {...props} />;
      case 'timeline': return <TimelineFeature key={index} {...props} />;
      case 'gallery': return <GalleryFeature key={index} {...props} />;
      case 'hero': return <HeroFeature key={index} {...props} />;
      case 'detail': return <DetailFeature key={index} {...props} />;
      case 'tags': return <TagsFeature key={index} {...props} />;
      case 'list': return <ListFeature key={index} {...props} />;
      case 'cards': return <CardsFeature key={index} {...props} />;
      case 'tabs': return <TabsFeature key={index} {...props} />;
      case 'progress': return <ProgressFeature key={index} {...props} />;
      case 'related': return <RelatedFeature key={index} {...props} />;
      case 'slider': return <TimelineFeature key={index} {...props} />;
      default: return null;
    }
  };
  
  const isSplitLayout = layout.type === 'split' || layout.type === 'grid';
  const splitRatio = layout.splitRatio || '1:1';
  
  return (
    <div className="a2ui-container" style={{ 
      width: '100%', 
      maxWidth: ACF_TOKENS.maxWidth, // 限制最大宽度 1208px
      margin: '0 auto', // 居中
      fontFamily: ACF_TOKENS.fontFamily,
    }}>
      {/* AI 设计说明 (ACF Card 风格) */}
      {reasoning && (
        <div className="acf-card acf-card--themed" style={{
          padding: ACF_TOKENS.spacingL, marginBottom: ACF_TOKENS.spacingL, borderRadius: ACF_TOKENS.radiusL,
          background: ACF_TOKENS.colorBackAccentPrimary, border: `1px solid ${ACF_TOKENS.colorStrokeNeutralSecondary}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: ACF_TOKENS.spacingXs, marginBottom: ACF_TOKENS.spacingXs }}>
            <span style={{ fontSize: '18px' }}>✨</span>
            <span style={{ fontWeight: ACF_TOKENS.fontWeightBold, color: ACF_TOKENS.colorFillAccentPrimary, fontSize: ACF_TOKENS.textBody3Size }}>AI Generated Layout</span>
            <span className="acf-badge acf-badge--themed" style={{ padding: '3px 10px', background: ACF_TOKENS.colorFillAccentPrimary, color: 'white', borderRadius: ACF_TOKENS.radiusM, fontSize: '10px', fontWeight: ACF_TOKENS.fontWeightBold }}>
              {layout.type.toUpperCase()}
            </span>
            <span className="acf-badge acf-badge--positive" style={{ padding: '3px 10px', background: '#006d21', color: 'white', borderRadius: ACF_TOKENS.radiusM, fontSize: '10px', fontWeight: ACF_TOKENS.fontWeightBold }}>
              {features.length} FEATURES
            </span>
          </div>
          <p style={{ margin: 0, fontSize: ACF_TOKENS.textCaption1Size, color: ACF_TOKENS.colorForeNeutralTertiary, lineHeight: 1.5 }}>{reasoning}</p>
        </div>
      )}

      {/* 主布局容器 (ACF Card 风格) */}
      <div 
        className="a2ui-layout acf-card"
        style={{
          display: isSplitLayout && features.length >= 2 ? 'grid' : 'flex',
          flexDirection: 'column',
          gridTemplateColumns: isSplitLayout ? splitRatio.split(':').map(r => `${r}fr`).join(' ') : undefined,
          gap: layout.gap || ACF_TOKENS.spacingXl,
          background: containerStyle?.background || ACF_TOKENS.colorBackNeutralPrimary,
          borderRadius: containerStyle?.borderRadius || ACF_TOKENS.radiusL,
          padding: containerStyle?.padding || ACF_TOKENS.spacingXl,
          boxShadow: containerStyle?.boxShadow || ACF_TOKENS.elevation1,
          alignItems: isSplitLayout ? 'start' : undefined,
          width: '100%',
          maxWidth: ACF_TOKENS.maxWidth,
        }}
      >
        {features.map((feature, i) => (
          <div key={i} className="a2ui-feature-wrapper" style={{ position: 'relative', width: '100%' }}>
            {renderFeature(feature, i)}
          </div>
        ))}
      </div>

      {/* 相关搜索 (ACF 风格) */}
      {relatedQueries && relatedQueries.length > 0 && (
        <div className="acf-card" style={{ 
          marginTop: ACF_TOKENS.spacingXl, padding: ACF_TOKENS.spacingL, 
          background: ACF_TOKENS.colorBackNeutralSecondary, borderRadius: ACF_TOKENS.radiusL 
        }}>
          <div style={{ fontSize: ACF_TOKENS.textBody3Size, fontWeight: ACF_TOKENS.fontWeightBold, marginBottom: ACF_TOKENS.spacingM, color: ACF_TOKENS.colorForeNeutralPrimary }}>🔍 Related Searches</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: ACF_TOKENS.spacingXs }}>
            {relatedQueries.map((q, i) => (
              <button key={i} onClick={() => handleNewSearch(q)} className="acf-button acf-button--subtle" style={{
                padding: `${ACF_TOKENS.spacingXs} ${ACF_TOKENS.spacingM}`, background: 'white', 
                border: `1px solid ${ACF_TOKENS.colorStrokeNeutralSecondary}`, borderRadius: ACF_TOKENS.radiusInfinite,
                fontSize: ACF_TOKENS.textCaption1Size, color: ACF_TOKENS.colorFillAccentPrimary, 
                cursor: 'pointer', transition: `all ${ACF_TOKENS.transitionBase}`, fontWeight: '500'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = ACF_TOKENS.colorFillAccentPrimary; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'transparent'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = ACF_TOKENS.colorFillAccentPrimary; e.currentTarget.style.borderColor = ACF_TOKENS.colorStrokeNeutralSecondary; }}
              >{q}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
