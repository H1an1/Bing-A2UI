/**
 * Tabbed Sections Framework
 * 
 * 顶部 tabs + 内容区域
 * 适用于：分类浏览、旅游指南、产品类别等
 */

import React, { useState, useMemo } from 'react';
import { DynamicView } from '../../../catalog/schema';

// ============================================================================
// 图片服务
// ============================================================================

const CURATED_IDS = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  100, 101, 102, 103, 104, 106, 107, 108, 109, 110, 111, 112, 113,
];

function getImageUrl(seed: string, index: number, w = 800, h = 600): string {
  const hash = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const id = CURATED_IDS[(hash + index * 7) % CURATED_IDS.length];
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

// ============================================================================
// Types
// ============================================================================

interface Props {
  view: DynamicView;
  onImageClick?: (url: string) => void;
}

// ============================================================================
// Main Component
// ============================================================================

export function TabbedSections({ view, onImageClick }: Props) {
  const [selectedId, setSelectedId] = useState(view.items[0]?.id || '');
  
  const selectedItem = useMemo(
    () => view.items.find(item => item.id === selectedId) || view.items[0],
    [view.items, selectedId]
  );
  
  const theme = view.design?.theme || 'light';
  const isDark = theme === 'dark';
  const accentColor = view.design?.accentColor || '#dc2626';
  
  // Generate images for selected item
  const detailImages = useMemo(() => {
    const count = selectedItem?.content?.imageCount || 6;
    return Array.from({ length: count }, (_, i) => 
      getImageUrl(`${view.title}-${selectedItem?.id}`, i, 800, 600)
    );
  }, [selectedItem, view.title]);

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark ? '#0f0f0f' : '#fafafa',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: isDark ? '#fff' : '#1a1a1a',
    }}>
      {/* Header with Tabs */}
      <div style={{
        background: isDark ? '#141414' : '#fff',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
        }}>
          {/* Title Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '24px' }}>🏛️</span>
              <h1 style={{
                fontSize: '22px',
                fontWeight: 700,
                margin: 0,
                letterSpacing: '1px',
              }}>
                {view.title}
              </h1>
            </div>
            
            {/* Nav Tabs */}
            <nav style={{
              display: 'flex',
              gap: '8px',
            }}>
              {view.items.map(item => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    style={{
                      padding: '10px 18px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: isSelected 
                        ? (isDark ? '#fff' : '#1a1a1a')
                        : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {item.title}
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-1px',
                        left: '18px',
                        right: '18px',
                        height: '3px',
                        background: accentColor,
                        borderRadius: '2px 2px 0 0',
                      }} />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 40px',
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 700,
            margin: '0 0 8px',
          }}>
            {selectedItem?.content.headline}
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: accentColor,
            margin: '16px auto',
            borderRadius: '2px',
          }} />
          {selectedItem?.content.description && (
            <p style={{
              fontSize: '17px',
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
              margin: 0,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {selectedItem.content.description}
            </p>
          )}
        </div>
        
        {/* Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {detailImages.slice(0, 6).map((img, i) => {
            const tags = selectedItem?.content?.tags || [];
            const label = tags[i];
            
            return (
              <div
                key={i}
                onClick={() => onImageClick?.(img)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: isDark 
                    ? '0 4px 20px rgba(0,0,0,0.3)'
                    : '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 12px 40px rgba(0,0,0,0.4)'
                    : '0 12px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 4px 20px rgba(0,0,0,0.3)'
                    : '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                  }}
                />
                
                {/* Overlay with Title */}
                {label && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '40px 20px 20px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    color: '#fff',
                  }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}>
                      {label}
                    </div>
                  </div>
                )}
                
                {/* Expand Icon */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.7,
                  transition: 'opacity 0.2s ease',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Facts */}
        {selectedItem?.content.facts && selectedItem.content.facts.length > 0 && (
          <div style={{
            padding: '32px',
            background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
            borderRadius: '20px',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: accentColor,
              marginBottom: '12px',
            }}>
              📍 Did You Know?
            </div>
            <p style={{
              fontSize: '18px',
              color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
              margin: 0,
              fontStyle: 'italic',
            }}>
              {selectedItem.content.facts[0]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabbedSections;

