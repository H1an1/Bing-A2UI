/**
 * CardGridModule - 可复用的卡片网格模块
 * 
 * 基于 LocationCard (PlacesGrid)、EntityDetail (TopicsGrid) 的设计
 * 支持多种变体：places（地点卡片）、topics（主题卡片）、explore（探索卡片）
 */

import React, { useState } from 'react';

// ============================================================================
// Types
// ============================================================================

export type CardGridVariant = 'places' | 'topics' | 'explore' | 'simple';

export interface CardItem {
  id?: string;
  name: string;
  image: string;
  subtitle?: string;
}

export interface CardGridModuleProps {
  variant?: CardGridVariant;
  title?: string;
  items: CardItem[];
  columns?: number;
  backgroundColor?: string;
  onCardClick?: (item: CardItem, index: number) => void;
}

// ============================================================================
// CardGridModule Component
// ============================================================================

export function CardGridModule({
  variant = 'places',
  title,
  items,
  columns = 5,
  backgroundColor,
  onCardClick
}: CardGridModuleProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // 地点卡片变体 - 来自 LocationCard
  if (variant === 'places') {
    return (
      <div style={{
        display: 'flex',
        gap: '14px',
        padding: backgroundColor ? '20px' : 0,
        background: backgroundColor,
        borderRadius: backgroundColor ? '16px' : 0,
        width: '100%'
      }}>
        {items.slice(0, columns).map((item, index) => (
          <div
            key={item.id || index}
            style={{
              flex: 1,
              minWidth: 0,
              cursor: 'pointer',
              transition: 'transform 0.25s ease',
              transform: hoverIndex === index ? 'translateY(-4px)' : 'translateY(0)'
            }}
            onClick={() => onCardClick?.(item, index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={{
              width: '100%',
              height: '140px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '10px',
              background: 'rgba(255,255,255,0.3)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.35s ease',
                  transform: hoverIndex === index ? 'scale(1.05)' : 'scale(1)'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/200/140?random=${index}`;
                }}
              />
            </div>
            <span style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.4,
              color: 'rgba(0,0,0,0.85)'
            }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // 主题卡片变体 - 来自 EntityDetail
  if (variant === 'topics') {
    return (
      <div style={{
        padding: '14px 16px',
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '16px',
        width: '100%'
      }}>
        {title && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, color: '#000' }}>
              {title}
            </h3>
            <button style={{
              width: '28px', height: '28px', borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.1)', background: '#fff',
              color: 'rgba(0,0,0,0.5)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {items.slice(0, columns).map((item, index) => (
            <div
              key={item.id || index}
              style={{
                flex: 1,
                minWidth: 0,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                transform: hoverIndex === index ? 'translateY(-3px)' : 'none'
              }}
              onClick={() => onCardClick?.(item, index)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div style={{
                width: '100%',
                aspectRatio: '1.15',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '8px',
                background: '#f5f5f5'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    transform: hoverIndex === index ? 'scale(1.08)' : 'scale(1)'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/120/104?random=${index}`;
                  }}
                />
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                color: 'rgba(0,0,0,0.75)',
                textAlign: 'center',
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 探索卡片变体 - 更大的卡片
  if (variant === 'explore') {
    const gridColumns = Math.min(columns, 4);
    // 确保显示的卡片数量是列数的倍数，避免最后一行孤零零的元素
    const rawCount = items.length;
    const displayCount = rawCount >= gridColumns 
      ? Math.floor(rawCount / gridColumns) * gridColumns 
      : rawCount;
    
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: '16px',
        width: '100%'
      }}>
        {items.slice(0, displayCount).map((item, index) => (
          <div
            key={item.id || index}
            style={{
              cursor: 'pointer',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#fff',
              transition: 'all 0.25s ease',
              transform: hoverIndex === index ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow: hoverIndex === index 
                ? '0 8px 24px rgba(0,0,0,0.15)' 
                : '0 2px 8px rgba(0,0,0,0.08)'
            }}
            onClick={() => onCardClick?.(item, index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/320/200?random=${index}`;
                }}
              />
            </div>
            <div style={{ padding: '12px 14px' }}>
              <h4 style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 600,
                color: '#000',
                lineHeight: 1.4
              }}>
                {item.name}
              </h4>
              {item.subtitle && (
                <p style={{
                  margin: '4px 0 0',
                  fontSize: '12px',
                  color: 'rgba(0,0,0,0.5)'
                }}>
                  {item.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 简单变体
  if (variant === 'simple') {
    // 确保显示的卡片数量是列数的倍数
    const maxItems = columns * 2;
    const rawCount = Math.min(items.length, maxItems);
    const displayCount = rawCount >= columns 
      ? Math.floor(rawCount / columns) * columns 
      : rawCount;
    
    return (
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        width: '100%'
      }}>
        {items.slice(0, displayCount).map((item, index) => (
          <div
            key={item.id || index}
            style={{
              cursor: 'pointer',
              borderRadius: '12px',
              overflow: 'hidden',
              width: `calc(${100 / columns}% - ${12 * (columns - 1) / columns}px)`,
              transition: 'transform 0.2s ease',
              transform: hoverIndex === index ? 'scale(1.02)' : 'scale(1)'
            }}
            onClick={() => onCardClick?.(item, index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '12px' }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/200/150?random=${index}`;
                }}
              />
            </div>
            <p style={{
              margin: '8px 0 0',
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(0,0,0,0.8)'
            }}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default CardGridModule;

