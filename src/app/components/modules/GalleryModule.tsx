/**
 * GalleryModule - 可复用的图片网格模块
 * 
 * 基于 EntityDetail、StepCard、VisualExplorer 的图片网格设计
 * 支持多种变体：grid（网格）、masonry（瀑布流）、carousel（轮播）、filmstrip（胶片）
 */

import React, { useState, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

export type GalleryVariant = 'grid' | 'masonry' | 'carousel' | 'filmstrip';

export interface GalleryItem {
  url: string;
  title?: string;
  isVideo?: boolean;
  duration?: string;
}

export interface GalleryModuleProps {
  variant?: GalleryVariant;
  images: GalleryItem[] | string[];
  columns?: number;
  gap?: number;
  height?: number;
  onImageClick?: (url: string, index: number) => void;
}

// ============================================================================
// GalleryModule Component
// ============================================================================

export function GalleryModule({
  variant = 'grid',
  images,
  columns = 4,
  gap = 10,
  height,
  onImageClick
}: GalleryModuleProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 标准化图片数据
  const items: GalleryItem[] = images.map(img => 
    typeof img === 'string' ? { url: img } : img
  );

  // 网格变体 - 来自 EntityDetail
  if (variant === 'grid') {
    // 确保显示的图片数量是列数的倍数，避免最后一行不完整
    const maxItems = columns * 2;
    const rawCount = Math.min(items.length, maxItems);
    const displayCount = rawCount >= columns 
      ? Math.floor(rawCount / columns) * columns 
      : rawCount;
    
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        borderRadius: '12px',
        overflow: 'hidden',
        width: '100%'
      }}>
        {items.slice(0, displayCount).map((item, index) => (
          <div
            key={index}
            style={{
              aspectRatio: '4/3',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              background: '#f0f0f0',
              transform: hoverIndex === index ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
            onClick={() => onImageClick?.(item.url, index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <img 
              src={item.url} 
              alt={item.title || `Image ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/300/225?random=${index}`;
              }}
            />
            {item.title && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                color: 'white', fontSize: '12px', fontWeight: 500
              }}>
                {item.title}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 瀑布流变体
  if (variant === 'masonry') {
    const colCount = columns;
    const columnItems: GalleryItem[][] = Array.from({ length: colCount }, () => []);
    items.forEach((item, i) => {
      columnItems[i % colCount].push(item);
    });
    
    const heights = ['200px', '260px', '180px', '240px', '220px'];

    return (
      <div style={{ display: 'flex', gap: `${gap}px`, width: '100%' }}>
        {columnItems.map((column, colIndex) => (
          <div key={colIndex} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
            {column.slice(0, 3).map((item, i) => {
              const globalIndex = colIndex + i * colCount;
              return (
                <div
                  key={i}
                  style={{
                    height: heights[(colIndex + i) % heights.length],
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#f0f0f0',
                    transform: hoverIndex === globalIndex ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoverIndex === globalIndex ? '0 8px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.25s ease'
                  }}
                  onClick={() => onImageClick?.(item.url, globalIndex)}
                  onMouseEnter={() => setHoverIndex(globalIndex)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <img 
                    src={item.url} 
                    alt={item.title || `Image ${globalIndex + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/300/400?random=${globalIndex}`;
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // 轮播变体 - 来自 VisualExplorer
  if (variant === 'carousel') {
    const handleScroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const scrollAmount = 220;
        scrollRef.current.scrollBy({
          left: direction === 'right' ? scrollAmount : -scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <div 
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingRight: '40px',
            height: height ? `${height}px` : '168px'
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                flexShrink: 0,
                width: '200px',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#f0f0f0',
                transform: hoverIndex === index ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 0.2s ease'
              }}
              onClick={() => onImageClick?.(item.url, index)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <img 
                src={item.url} 
                alt={item.title || `Image ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/200/168?random=${index}`;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* 滚动按钮 */}
        <button 
          onClick={() => handleScroll('right')}
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            width: '32px', height: '32px', borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)',
            color: 'rgba(0,0,0,0.6)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    );
  }

  // 胶片变体 - 来自 TimelineGallery 风格
  if (variant === 'filmstrip') {
    return (
      <div style={{
        background: '#1a1a1a',
        borderRadius: '12px',
        padding: '16px',
        overflowX: 'auto',
        width: '100%'
      }}>
        <div style={{ display: 'flex', gap: `${gap}px` }}>
          {items.slice(0, 8).map((item, index) => (
            <div
              key={index}
              onClick={() => onImageClick?.(item.url, index)}
              style={{ flexShrink: 0, width: '180px', cursor: 'pointer' }}
            >
              {/* 胶片孔 - 上 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginBottom: '-4px', position: 'relative', zIndex: 1 }}>
                {[0, 1, 2, 3].map((j) => <div key={j} style={{ width: '8px', height: '4px', background: '#333', borderRadius: '2px' }} />)}
              </div>
              {/* 图片 */}
              <div style={{ background: '#1a1a1a', padding: '8px' }}>
                <div style={{
                  aspectRatio: '16/10',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  transform: hoverIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.2s ease'
                }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <img 
                    src={item.url} 
                    alt={item.title || `Frame ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/180/112?random=${index}`;
                    }}
                  />
                </div>
                {item.title && (
                  <div style={{ marginTop: '8px', color: 'white', fontSize: '12px', fontWeight: 600 }}>
                    {item.title}
                  </div>
                )}
              </div>
              {/* 胶片孔 - 下 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginTop: '-4px', position: 'relative', zIndex: 1 }}>
                {[0, 1, 2, 3].map((j) => <div key={j} style={{ width: '8px', height: '4px', background: '#333', borderRadius: '2px' }} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default GalleryModule;

