/**
 * SemanticRenderer - 语义化 A2UI 渲染器
 * 
 * 将 SemanticA2UIDescriptor 渲染为 React 组件
 * 
 * 特点：
 * - 完全基于语义块，AI 有最大自由度
 * - 所有样式都经过 ACF Token 验证
 * - 支持嵌套块结构
 */

import React, { useState, useEffect, CSSProperties } from 'react';
import {
  SemanticA2UIDescriptor,
  SemanticBlock,
  SemanticLayout,
  ACFCompliantStyle,
  HeroBlock,
  TitleBlock,
  SubtitleBlock,
  BodyBlock,
  ImageBlock,
  ImageGridBlock,
  ImageCarouselBlock,
  MetadataBlock,
  TagsBlock,
  ActionBlock,
  DividerBlock,
  SpacerBlock,
  CardBlock,
  ListBlock,
  QuoteBlock,
  StatBlock,
  CustomBlock,
} from './types';
import { validateSemanticA2UI, getComplianceReport } from './validator';

// ============================================================================
// Props
// ============================================================================

export interface SemanticRendererProps {
  descriptor: SemanticA2UIDescriptor;
  images?: string[];
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
  onActionClick?: (action: string) => void;
  showDebugInfo?: boolean;
}

// ============================================================================
// Style Converter
// ============================================================================

/**
 * 将 ACFCompliantStyle 转换为 CSSProperties
 */
function toReactStyle(style?: ACFCompliantStyle): CSSProperties {
  if (!style) return {};
  
  const result: CSSProperties = {};
  
  // 直接复制所有属性
  Object.entries(style).forEach(([key, value]) => {
    if (value !== undefined) {
      (result as any)[key] = value;
    }
  });
  
  return result;
}

// ============================================================================
// Block Renderers
// ============================================================================

interface BlockRendererProps {
  block: SemanticBlock;
  images: string[];
  imageIndex: number;
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
  onActionClick?: (action: string) => void;
}

/** Hero 块渲染器 */
function HeroBlockRenderer({ block, images, imageIndex, onImageClick }: BlockRendererProps & { block: HeroBlock }) {
  const { content, style, gridArea } = block;
  const [isHovered, setIsHovered] = useState(false);
  
  const imageUrl = content.imageUrl || images[imageIndex] || images[0];
  
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        gridArea,
        ...toReactStyle(style),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onImageClick?.(imageUrl, content.title)}
    >
      <img
        src={imageUrl}
        alt={content.imageAlt || content.title || 'Hero image'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://picsum.photos/1200/600?random=hero';
        }}
      />
      
      {/* 叠加层 */}
      {content.overlay !== false && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: content.overlayGradient || 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
          }}
        />
      )}
      
      {/* 文字内容 */}
      {(content.title || content.subtitle) && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--acf-spacing-xl)',
            color: 'white',
            zIndex: 1,
          }}
        >
          {content.title && (
            <h1
              style={{
                margin: 0,
                fontSize: 'var(--acf-text-title1-size)',
                fontWeight: 'var(--acf-font-weight-bold)',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}
            >
              {content.title}
            </h1>
          )}
          {content.subtitle && (
            <p
              style={{
                margin: 'var(--acf-spacing-xs) 0 0',
                fontSize: 'var(--acf-text-body2-size)',
                opacity: 0.9,
              }}
            >
              {content.subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/** 标题块渲染器 */
function TitleBlockRenderer({ block }: BlockRendererProps & { block: TitleBlock }) {
  const { content, style, gridArea } = block;
  const Tag = `h${content.level || 2}` as keyof JSX.IntrinsicElements;
  
  const defaultFontSize = {
    1: 'var(--acf-text-title1-size)',
    2: 'var(--acf-text-title2-size)',
    3: 'var(--acf-text-subtitle1-size)',
    4: 'var(--acf-text-body1-size)',
    5: 'var(--acf-text-body2-size)',
    6: 'var(--acf-text-body3-size)',
  }[content.level || 2];
  
  return (
    <Tag
      style={{
        margin: 0,
        fontSize: defaultFontSize,
        fontWeight: 'var(--acf-font-weight-bold)',
        color: 'var(--acf-color-fore-neutral-primary)',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      {content.text}
    </Tag>
  );
}

/** 副标题块渲染器 */
function SubtitleBlockRenderer({ block }: BlockRendererProps & { block: SubtitleBlock }) {
  const { content, style, gridArea } = block;
  
  return (
    <p
      style={{
        margin: 0,
        fontSize: 'var(--acf-text-body2-size)',
        color: 'var(--acf-color-fore-neutral-secondary)',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      {content.text}
    </p>
  );
}

/** 正文块渲染器 */
function BodyBlockRenderer({ block }: BlockRendererProps & { block: BodyBlock }) {
  const { content, style, gridArea } = block;
  const [isExpanded, setIsExpanded] = useState(false);
  
  const text = content.text;
  const truncateAt = content.truncate || 200;
  const shouldTruncate = text.length > truncateAt && !isExpanded;
  const displayText = shouldTruncate ? text.slice(0, truncateAt) + '...' : text;
  
  return (
    <div style={{ gridArea, ...toReactStyle(style) }}>
      <p
        style={{
          margin: 0,
          fontSize: 'var(--acf-text-body3-size)',
          lineHeight: 1.7,
          color: 'var(--acf-color-fore-neutral-secondary)',
        }}
      >
        {displayText}
      </p>
      {text.length > truncateAt && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            marginTop: 'var(--acf-spacing-xs)',
            padding: '0',
            background: 'none',
            border: 'none',
            color: 'var(--acf-color-fill-accent-primary)',
            fontSize: 'var(--acf-text-caption1-size)',
            cursor: 'pointer',
          }}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

/** 单图块渲染器 */
function ImageBlockRenderer({ block, images, imageIndex, onImageClick }: BlockRendererProps & { block: ImageBlock }) {
  const { content, style, gridArea } = block;
  const imageUrl = content.url || images[imageIndex] || images[0];
  
  return (
    <figure
      style={{
        margin: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        gridArea,
        ...toReactStyle(style),
      }}
      onClick={() => onImageClick?.(imageUrl, content.caption)}
    >
      <img
        src={imageUrl}
        alt={content.alt || 'Image'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: content.objectFit || 'cover',
          aspectRatio: content.aspectRatio,
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://picsum.photos/400/300?random=${imageIndex}`;
        }}
      />
      {content.caption && (
        <figcaption
          style={{
            padding: 'var(--acf-spacing-xs)',
            fontSize: 'var(--acf-text-caption1-size)',
            color: 'var(--acf-color-fore-neutral-tertiary)',
          }}
        >
          {content.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** 图片网格块渲染器 */
function ImageGridBlockRenderer({ block, images, imageIndex, onImageClick }: BlockRendererProps & { block: ImageGridBlock }) {
  const { content, style, gridArea } = block;
  const columns = content.columns || 3;
  const gridImages = (content.images && content.images.length > 0)
    ? content.images 
    : images.slice(imageIndex, imageIndex + 9).map((url, i) => ({ url, title: `Image ${i + 1}` }));
  
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--acf-spacing-xs)',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      {gridImages.map((img, i) => (
        <div
          key={i}
          style={{
            aspectRatio: content.aspectRatio || '1',
            overflow: 'hidden',
            borderRadius: 'var(--acf-radius-m)',
            cursor: 'pointer',
          }}
          onClick={() => onImageClick?.(img.url, img.title)}
        >
          <img
            src={img.url}
            alt={img.alt || img.title || `Image ${i + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/300/300?random=${i}`;
            }}
          />
        </div>
      ))}
    </div>
  );
}

/** 图片轮播块渲染器 */
function ImageCarouselBlockRenderer({ block, images, imageIndex, onImageClick }: BlockRendererProps & { block: ImageCarouselBlock }) {
  const { content, style, gridArea } = block;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const carouselImages = (content.images && content.images.length > 0)
    ? content.images 
    : images.slice(imageIndex, imageIndex + 6).map((url, i) => ({ url, title: `Slide ${i + 1}` }));
  
  // Auto-play
  useEffect(() => {
    if (!content.autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % carouselImages.length);
    }, content.interval || 4000);
    return () => clearInterval(interval);
  }, [content.autoPlay, content.interval, carouselImages.length]);
  
  const currentImage = carouselImages[currentIndex];
  
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      <img
        src={currentImage?.url}
        alt={currentImage?.alt || currentImage?.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
        onClick={() => onImageClick?.(currentImage?.url, currentImage?.title)}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://picsum.photos/800/400?random=carousel';
        }}
      />
      
      {/* 导航点 */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--acf-spacing-m)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 'var(--acf-spacing-xs)',
        }}
      >
        {carouselImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: 'none',
              background: i === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
      
      {/* 左右箭头 */}
      <button
        onClick={() => setCurrentIndex(prev => (prev - 1 + carouselImages.length) % carouselImages.length)}
        style={{
          position: 'absolute',
          left: 'var(--acf-spacing-m)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '36px',
          height: '36px',
          borderRadius: 'var(--acf-radius-m)',
          border: 'none',
          background: 'rgba(255,255,255,0.9)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ‹
      </button>
      <button
        onClick={() => setCurrentIndex(prev => (prev + 1) % carouselImages.length)}
        style={{
          position: 'absolute',
          right: 'var(--acf-spacing-m)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '36px',
          height: '36px',
          borderRadius: 'var(--acf-radius-m)',
          border: 'none',
          background: 'rgba(255,255,255,0.9)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ›
      </button>
    </div>
  );
}

/** 元数据块渲染器 */
function MetadataBlockRenderer({ block }: BlockRendererProps & { block: MetadataBlock }) {
  const { content, style, gridArea } = block;
  
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--acf-spacing-m)',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      {content.items && content.items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--acf-spacing-2xs)',
            fontSize: 'var(--acf-text-caption1-size)',
            color: 'var(--acf-color-fore-neutral-tertiary)',
          }}
        >
          {item.icon && <span>{item.icon}</span>}
          {item.label && <span style={{ fontWeight: 'var(--acf-font-weight-medium)' }}>{item.label}:</span>}
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

/** 标签块渲染器 */
function TagsBlockRenderer({ block, onQueryClick }: BlockRendererProps & { block: TagsBlock }) {
  const { content, style, gridArea } = block;
  const variant = content.variant || 'filled';
  
  const getTagStyle = (): CSSProperties => {
    switch (variant) {
      case 'outlined':
        return {
          background: 'transparent',
          border: '1px solid var(--acf-color-stroke-accent-primary)',
          color: 'var(--acf-color-fill-accent-primary)',
        };
      case 'subtle':
        return {
          background: 'var(--acf-color-back-accent-primary)',
          color: 'var(--acf-color-fill-accent-primary)',
        };
      default:
        return {
          background: 'var(--acf-color-fill-accent-primary)',
          color: 'white',
        };
    }
  };
  
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--acf-spacing-xs)',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      {content.tags && content.tags.map((tag, i) => (
        <button
          key={i}
          onClick={() => onQueryClick?.(tag)}
          style={{
            padding: 'var(--acf-spacing-2xs) var(--acf-spacing-s)',
            borderRadius: 'var(--acf-radius-infinite)',
            fontSize: 'var(--acf-text-caption1-size)',
            fontWeight: 'var(--acf-font-weight-medium)',
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.2s ease',
            ...getTagStyle(),
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

/** 行动按钮块渲染器 */
function ActionBlockRenderer({ block, onActionClick, onQueryClick }: BlockRendererProps & { block: ActionBlock }) {
  const { content, style, gridArea } = block;
  const variant = content.variant || 'primary';
  
  const getButtonStyle = (): CSSProperties => {
    switch (variant) {
      case 'secondary':
        return {
          background: 'var(--acf-color-fill-neutral-secondary)',
          color: 'var(--acf-color-fore-neutral-primary)',
        };
      case 'subtle':
        return {
          background: 'transparent',
          color: 'var(--acf-color-fill-accent-primary)',
        };
      default:
        return {
          background: 'var(--acf-color-fill-accent-primary)',
          color: 'white',
        };
    }
  };
  
  return (
    <button
      onClick={() => {
        if (content.action) {
          onActionClick?.(content.action);
          onQueryClick?.(content.action);
        }
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--acf-spacing-xs)',
        padding: 'var(--acf-spacing-s) var(--acf-spacing-l)',
        borderRadius: 'var(--acf-radius-m)',
        fontSize: 'var(--acf-text-body3-size)',
        fontWeight: 'var(--acf-font-weight-medium)',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.2s ease',
        gridArea,
        ...getButtonStyle(),
        ...toReactStyle(style),
      }}
    >
      {content.icon && <span>{content.icon}</span>}
      {content.label}
    </button>
  );
}

/** 分隔线块渲染器 */
function DividerBlockRenderer({ block }: BlockRendererProps & { block: DividerBlock }) {
  const { content, style, gridArea } = block;
  const variant = content?.variant || 'solid';
  
  return (
    <hr
      style={{
        margin: 0,
        border: 'none',
        height: '1px',
        background: variant === 'gradient' 
          ? 'linear-gradient(90deg, transparent, var(--acf-color-stroke-neutral-secondary), transparent)'
          : 'var(--acf-color-stroke-neutral-secondary)',
        borderStyle: variant === 'dashed' ? 'dashed' : undefined,
        gridArea,
        ...toReactStyle(style),
      }}
    />
  );
}

/** 间隔块渲染器 */
function SpacerBlockRenderer({ block }: BlockRendererProps & { block: SpacerBlock }) {
  const { content, style, gridArea } = block;
  
  return (
    <div
      style={{
        height: content?.size || 'var(--acf-spacing-m)',
        gridArea,
        ...toReactStyle(style),
      }}
    />
  );
}

/** 卡片容器块渲染器 */
function CardBlockRenderer({ block, images, imageIndex, onImageClick, onQueryClick, onActionClick }: BlockRendererProps & { block: CardBlock }) {
  const { content, style, gridArea } = block;
  const variant = content?.variant || 'elevated';
  
  const getCardStyle = (): CSSProperties => {
    switch (variant) {
      case 'outlined':
        return {
          border: '1px solid var(--acf-color-stroke-neutral-secondary)',
          background: 'var(--acf-color-back-neutral-primary)',
        };
      case 'filled':
        return {
          background: 'var(--acf-color-back-neutral-secondary)',
        };
      default:
        return {
          background: 'var(--acf-color-back-neutral-primary)',
          boxShadow: 'var(--acf-elevation-1)',
        };
    }
  };
  
  return (
    <div
      style={{
        borderRadius: 'var(--acf-radius-l)',
        overflow: 'hidden',
        cursor: content?.interactive ? 'pointer' : undefined,
        transition: content?.interactive ? 'all 0.2s ease' : undefined,
        gridArea,
        ...getCardStyle(),
        ...toReactStyle(style),
      }}
      onClick={content?.interactive && content?.action ? () => onQueryClick?.(content.action!) : undefined}
    >
      {content?.children && content.children.length > 0 ? (
        content.children.map((child, i) => (
          <BlockRenderer
            key={child?.id || i}
            block={child}
            images={images}
            imageIndex={imageIndex + i}
            onImageClick={onImageClick}
            onQueryClick={onQueryClick}
            onActionClick={onActionClick}
          />
        ))
      ) : (
        <div style={{ padding: 'var(--acf-spacing-m)', color: 'var(--acf-color-fore-neutral-tertiary)' }}>
          Empty card
        </div>
      )}
    </div>
  );
}

/** 列表块渲染器 */
function ListBlockRenderer({ block, images, imageIndex, onQueryClick }: BlockRendererProps & { block: ListBlock }) {
  const { content, style, gridArea } = block;
  const variant = content?.variant || 'simple';
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--acf-spacing-s)',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      {content.items && content.items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 'var(--acf-spacing-m)',
            padding: variant === 'compact' ? 'var(--acf-spacing-xs)' : 'var(--acf-spacing-s)',
            background: 'var(--acf-color-back-neutral-secondary)',
            borderRadius: 'var(--acf-radius-m)',
            cursor: item.action ? 'pointer' : undefined,
          }}
          onClick={item.action ? () => onQueryClick?.(item.action!) : undefined}
        >
          {item.imageUrl && (
            <img
              src={item.imageUrl || images[imageIndex + i]}
              alt={item.title}
              style={{
                width: variant === 'compact' ? '40px' : '60px',
                height: variant === 'compact' ? '40px' : '60px',
                borderRadius: 'var(--acf-radius-s)',
                objectFit: 'cover',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/60/60?random=${i}`;
              }}
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 'var(--acf-text-body3-size)',
                fontWeight: 'var(--acf-font-weight-medium)',
                color: 'var(--acf-color-fore-neutral-primary)',
              }}
            >
              {item.title}
            </div>
            {item.subtitle && variant === 'detailed' && (
              <div
                style={{
                  marginTop: 'var(--acf-spacing-2xs)',
                  fontSize: 'var(--acf-text-caption1-size)',
                  color: 'var(--acf-color-fore-neutral-tertiary)',
                }}
              >
                {item.subtitle}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** 引用块渲染器 */
function QuoteBlockRenderer({ block }: BlockRendererProps & { block: QuoteBlock }) {
  const { content, style, gridArea } = block;
  
  return (
    <blockquote
      style={{
        margin: 0,
        padding: 'var(--acf-spacing-l)',
        borderLeft: '4px solid var(--acf-color-fill-accent-primary)',
        background: 'var(--acf-color-back-accent-primary)',
        borderRadius: '0 var(--acf-radius-m) var(--acf-radius-m) 0',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 'var(--acf-text-body2-size)',
          fontStyle: 'italic',
          color: 'var(--acf-color-fore-neutral-primary)',
        }}
      >
        "{content.text}"
      </p>
      {(content.author || content.source) && (
        <footer
          style={{
            marginTop: 'var(--acf-spacing-s)',
            fontSize: 'var(--acf-text-caption1-size)',
            color: 'var(--acf-color-fore-neutral-tertiary)',
          }}
        >
          {content.author && <span>— {content.author}</span>}
          {content.source && <span>, {content.source}</span>}
        </footer>
      )}
    </blockquote>
  );
}

/** 统计数字块渲染器 */
function StatBlockRenderer({ block }: BlockRendererProps & { block: StatBlock }) {
  const { content, style, gridArea } = block;
  
  const getTrendColor = () => {
    switch (content.trend) {
      case 'up': return 'var(--acf-color-back-semantic-positive)';
      case 'down': return 'var(--acf-color-back-semantic-danger)';
      default: return 'var(--acf-color-fore-neutral-tertiary)';
    }
  };
  
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--acf-spacing-l)',
        gridArea,
        ...toReactStyle(style),
      }}
    >
      {content.icon && (
        <div style={{ fontSize: '24px', marginBottom: 'var(--acf-spacing-xs)' }}>
          {content.icon}
        </div>
      )}
      <div
        style={{
          fontSize: 'var(--acf-text-title1-size)',
          fontWeight: 'var(--acf-font-weight-bold)',
          color: 'var(--acf-color-fore-neutral-primary)',
        }}
      >
        {content.value}
        {content.trend && (
          <span style={{ marginLeft: 'var(--acf-spacing-xs)', color: getTrendColor(), fontSize: '14px' }}>
            {content.trend === 'up' ? '↑' : content.trend === 'down' ? '↓' : ''}
          </span>
        )}
      </div>
      <div
        style={{
          marginTop: 'var(--acf-spacing-2xs)',
          fontSize: 'var(--acf-text-caption1-size)',
          color: 'var(--acf-color-fore-neutral-tertiary)',
        }}
      >
        {content.label}
      </div>
    </div>
  );
}

/** 自定义块渲染器 */
function CustomBlockRenderer({ block, images, imageIndex, onImageClick, onQueryClick, onActionClick }: BlockRendererProps & { block: CustomBlock }) {
  const { content, style, gridArea } = block;
  const Tag = content?.element || 'div';
  
  return (
    <Tag
      style={{
        gridArea,
        ...toReactStyle(style),
      }}
    >
      {content?.children && content.children.map((child, i) => (
        <BlockRenderer
          key={child?.id || i}
          block={child}
          images={images}
          imageIndex={imageIndex + i}
          onImageClick={onImageClick}
          onQueryClick={onQueryClick}
          onActionClick={onActionClick}
        />
      ))}
    </Tag>
  );
}

// ============================================================================
// Main Block Renderer
// ============================================================================

function BlockRenderer(props: BlockRendererProps) {
  const { block } = props;
  
  // Safety check for undefined block
  if (!block || !block.type) {
    console.warn('BlockRenderer: received undefined or invalid block');
    return null;
  }
  
  switch (block.type) {
    case 'hero':
      return <HeroBlockRenderer {...props} block={block as HeroBlock} />;
    case 'title':
      return <TitleBlockRenderer {...props} block={block as TitleBlock} />;
    case 'subtitle':
      return <SubtitleBlockRenderer {...props} block={block as SubtitleBlock} />;
    case 'body':
      return <BodyBlockRenderer {...props} block={block as BodyBlock} />;
    case 'image':
      return <ImageBlockRenderer {...props} block={block as ImageBlock} />;
    case 'image-grid':
      return <ImageGridBlockRenderer {...props} block={block as ImageGridBlock} />;
    case 'image-carousel':
      return <ImageCarouselBlockRenderer {...props} block={block as ImageCarouselBlock} />;
    case 'metadata':
      return <MetadataBlockRenderer {...props} block={block as MetadataBlock} />;
    case 'tags':
      return <TagsBlockRenderer {...props} block={block as TagsBlock} />;
    case 'action':
      return <ActionBlockRenderer {...props} block={block as ActionBlock} />;
    case 'divider':
      return <DividerBlockRenderer {...props} block={block as DividerBlock} />;
    case 'spacer':
      return <SpacerBlockRenderer {...props} block={block as SpacerBlock} />;
    case 'card':
      return <CardBlockRenderer {...props} block={block as CardBlock} />;
    case 'list':
      return <ListBlockRenderer {...props} block={block as ListBlock} />;
    case 'quote':
      return <QuoteBlockRenderer {...props} block={block as QuoteBlock} />;
    case 'stat':
      return <StatBlockRenderer {...props} block={block as StatBlock} />;
    case 'custom':
      return <CustomBlockRenderer {...props} block={block as CustomBlock} />;
    default:
      console.warn(`Unknown block type: ${(block as any).type}`);
      return null;
  }
}

// ============================================================================
// Layout Renderer
// ============================================================================

function getLayoutStyle(layout: SemanticLayout): CSSProperties {
  const style: CSSProperties = {
    maxWidth: layout.maxWidth || '1208px',
    margin: '0 auto',
    width: '100%',
  };
  
  if (layout.type === 'grid') {
    style.display = 'grid';
    if (layout.gridTemplate) {
      style.gridTemplateColumns = layout.gridTemplate;
    }
    if (layout.gridTemplateAreas) {
      style.gridTemplateAreas = layout.gridTemplateAreas.map(row => `"${row}"`).join(' ');
    }
    if (layout.gridAutoRows) {
      style.gridAutoRows = layout.gridAutoRows;
    }
  } else if (layout.type === 'flex') {
    style.display = 'flex';
    style.flexDirection = layout.flexDirection || 'column';
    style.flexWrap = layout.flexWrap;
    style.justifyContent = layout.justifyContent;
    style.alignItems = layout.alignItems;
  } else {
    // stack = vertical flex
    style.display = 'flex';
    style.flexDirection = 'column';
  }
  
  if (layout.gap) {
    style.gap = layout.gap;
  }
  if (layout.padding) {
    style.padding = layout.padding;
  }
  
  return style;
}

// ============================================================================
// Main Component
// ============================================================================

export function SemanticRenderer({
  descriptor,
  images = [],
  onImageClick,
  onQueryClick,
  onActionClick,
  showDebugInfo = false,
}: SemanticRendererProps) {
  // 如果没有 descriptor，显示空状态
  if (!descriptor) {
    return (
      <div style={{ padding: 'var(--acf-spacing-xl)', textAlign: 'center', color: 'var(--acf-color-fore-neutral-tertiary)' }}>
        No descriptor provided
      </div>
    );
  }

  // 验证描述符
  const validation = validateSemanticA2UI(descriptor, { autoFix: true });
  const validDescriptor = validation.fixedDescriptor || descriptor;
  
  // Debug info
  useEffect(() => {
    if (showDebugInfo) {
      console.log('🎨 SemanticRenderer - Validation Report:');
      console.log(getComplianceReport(validation));
    }
  }, [validation, showDebugInfo]);
  
  // 安全解构，提供默认值
  const intent = validDescriptor.intent || { primary: 'freeform', mood: 'clean', focus: 'balanced' };
  const layout = validDescriptor.layout || { type: 'stack', gap: 'var(--acf-spacing-l)' };
  const containerStyle = validDescriptor.containerStyle;
  const blocks = validDescriptor.blocks || [];
  const relatedQueries = validDescriptor.relatedQueries || [];
  
  return (
    <div
      style={{
        fontFamily: "var(--acf-font-family, 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
        ...toReactStyle(containerStyle),
      }}
    >
      {/* Debug Badge */}
      {showDebugInfo && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--acf-spacing-xs)',
            padding: 'var(--acf-spacing-xs) var(--acf-spacing-m)',
            background: validation.valid 
              ? 'var(--acf-color-back-semantic-positive)'
              : 'var(--acf-color-back-semantic-warning)',
            color: 'white',
            borderRadius: 'var(--acf-radius-m)',
            marginBottom: 'var(--acf-spacing-m)',
            fontSize: 'var(--acf-text-caption1-size)',
            fontWeight: 'var(--acf-font-weight-bold)',
          }}
        >
          <span>🎨 Semantic A2UI</span>
          <span style={{ opacity: 0.8 }}>|</span>
          <span>{intent?.primary || 'unknown'}</span>
          <span style={{ opacity: 0.8 }}>|</span>
          <span>{intent?.mood || 'unknown'}</span>
          <span style={{ opacity: 0.8 }}>|</span>
          <span>{blocks?.length || 0} blocks</span>
          {!validation.valid && (
            <>
              <span style={{ opacity: 0.8 }}>|</span>
              <span>⚠️ {validation.errors.length} errors (auto-fixed)</span>
            </>
          )}
        </div>
      )}
      
      {/* AI Reasoning */}
      {intent?.reasoning && showDebugInfo && (
        <div
          style={{
            padding: 'var(--acf-spacing-m)',
            background: 'var(--acf-color-back-accent-primary)',
            borderRadius: 'var(--acf-radius-m)',
            marginBottom: 'var(--acf-spacing-l)',
            fontSize: 'var(--acf-text-caption1-size)',
            color: 'var(--acf-color-fore-neutral-secondary)',
          }}
        >
          💡 {intent.reasoning}
        </div>
      )}
      
      {/* Main Layout */}
      <div style={getLayoutStyle(layout)}>
        {Array.isArray(blocks) && blocks.length > 0 ? (
          blocks.map((block, index) => (
            <BlockRenderer
              key={block?.id || index}
              block={block}
              images={images}
              imageIndex={index}
              onImageClick={onImageClick}
              onQueryClick={onQueryClick}
              onActionClick={onActionClick}
            />
          ))
        ) : (
          <div style={{ padding: 'var(--acf-spacing-xl)', textAlign: 'center', color: 'var(--acf-color-fore-neutral-tertiary)' }}>
            No content blocks to display
          </div>
        )}
      </div>
      
      {/* Related Queries */}
      {relatedQueries && relatedQueries.length > 0 && (
        <div
          style={{
            marginTop: 'var(--acf-spacing-xl)',
            padding: 'var(--acf-spacing-l)',
            background: 'var(--acf-color-back-neutral-secondary)',
            borderRadius: 'var(--acf-radius-l)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--acf-text-body3-size)',
              fontWeight: 'var(--acf-font-weight-bold)',
              marginBottom: 'var(--acf-spacing-m)',
              color: 'var(--acf-color-fore-neutral-primary)',
            }}
          >
            🔍 Related Searches
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--acf-spacing-xs)' }}>
            {relatedQueries.map((query, i) => (
              <button
                key={i}
                onClick={() => onQueryClick?.(query)}
                style={{
                  padding: 'var(--acf-spacing-xs) var(--acf-spacing-m)',
                  background: 'var(--acf-color-back-neutral-primary)',
                  border: '1px solid var(--acf-color-stroke-neutral-secondary)',
                  borderRadius: 'var(--acf-radius-infinite)',
                  fontSize: 'var(--acf-text-caption1-size)',
                  color: 'var(--acf-color-fill-accent-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SemanticRenderer;

