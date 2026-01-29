/**
 * Entity Browser Framework
 * 
 * 左侧列表 + 右侧详情
 * 适用于：鲸鱼种类、手机型号、汽车品牌等
 */

import React, { useState, useMemo } from 'react';
import { DynamicView, NavigationItem } from '../../../catalog/schema';

// ============================================================================
// 图片服务
// ============================================================================

const CURATED_IDS = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
  100, 101, 102, 103, 104, 106, 107, 108, 109, 110, 111, 112, 113,
  200, 201, 202, 203, 204, 206, 208, 209, 210, 211, 212, 213, 214,
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

export function EntityBrowser({ view, onImageClick }: Props) {
  const [selectedId, setSelectedId] = useState(view.items[0]?.id || '');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const selectedItem = useMemo(
    () => view.items.find(item => item.id === selectedId) || view.items[0],
    [view.items, selectedId]
  );
  
  const theme = view.design?.theme || 'dark';
  const isDark = theme === 'dark' || theme === 'immersive';
  const accentColor = view.design?.accentColor || '#0ea5e9';
  
  // Generate images for selected item
  const detailImages = useMemo(() => {
    const count = selectedItem?.content?.imageCount || 3;
    return Array.from({ length: count }, (_, i) => 
      getImageUrl(`${view.title}-${selectedItem?.id}`, i, 1200, 800)
    );
  }, [selectedItem, view.title]);
  
  // Generate thumbnails
  const thumbnails = useMemo(() => {
    return view.items.reduce((acc, item, i) => {
      acc[item.id] = getImageUrl(`${view.title}-thumb`, i, 120, 120);
      return acc;
    }, {} as Record<string, string>);
  }, [view.items, view.title]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: isDark ? '#0f172a' : '#fafafa',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: isDark ? '#fff' : '#0a0a0a',
    }}>
      {/* ========== 左侧导航 ========== */}
      <div style={{
        width: '320px',
        minWidth: '320px',
        background: isDark ? 'rgba(15, 23, 42, 0.95)' : '#fff',
        borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}>
        {/* Header */}
        <div style={{ padding: '24px 20px 16px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            margin: '0 0 4px',
            color: accentColor,
          }}>
            {view.title}
          </h1>
          {view.subtitle && (
            <p style={{
              fontSize: '13px',
              color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {view.subtitle}
            </p>
          )}
        </div>
        
        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
          {view.items.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setImageLoaded(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px',
                  marginBottom: '6px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: isSelected
                    ? isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                    : 'transparent',
                  border: isSelected
                    ? `2px solid ${accentColor}`
                    : '2px solid transparent',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = isDark 
                      ? 'rgba(255,255,255,0.05)' 
                      : 'rgba(0,0,0,0.03)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={thumbnails[item.id]}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: isSelected ? accentColor : (isDark ? '#fff' : '#1a1a1a'),
                    marginBottom: '2px',
                  }}>
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div style={{
                      fontSize: '13px',
                      color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                    }}>
                      {item.subtitle}
                    </div>
                  )}
                </div>
                
                {/* Arrow */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isSelected ? accentColor : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)')}
                  strokeWidth="2"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            );
          })}
        </div>
        
        {/* Did You Know */}
        {view.extra?.didYouKnow && (
          <div style={{
            margin: '12px',
            padding: '16px',
            background: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
            borderRadius: '12px',
            borderLeft: `3px solid ${accentColor}`,
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              color: accentColor,
              marginBottom: '6px',
            }}>
              ℹ️ Did You Know?
            </div>
            <p style={{
              fontSize: '13px',
              color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
              margin: 0,
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}>
              "{view.extra.didYouKnow}"
            </p>
          </div>
        )}
      </div>
      
      {/* ========== 右侧内容 ========== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedItem && (
          <>
            {/* Hero Image */}
            <div style={{
              position: 'relative',
              height: '55vh',
              minHeight: '400px',
              overflow: 'hidden',
            }}>
              <img
                src={detailImages[0]}
                alt=""
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              />
              
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)',
              }} />
              
              {/* Title on Image */}
              <div style={{
                position: 'absolute',
                bottom: '32px',
                left: '40px',
                right: '40px',
              }}>
                <h2 style={{
                  fontSize: '48px',
                  fontWeight: 800,
                  color: '#fff',
                  margin: '0 0 8px',
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}>
                  {selectedItem.content.headline}
                </h2>
                
                {/* Stats Badges */}
                {selectedItem.content.stats && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    {selectedItem.content.stats.map((stat, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '8px 16px',
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '20px',
                          fontSize: '13px',
                          color: '#fff',
                          fontWeight: 500,
                        }}
                      >
                        {stat.icon && <span style={{ marginRight: '6px' }}>{stat.icon}</span>}
                        {stat.label}: {stat.value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Expand Button */}
              <button
                onClick={() => onImageClick?.(detailImages[0])}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </div>
            
            {/* Content Area */}
            <div style={{
              flex: 1,
              padding: '32px 40px',
              display: 'grid',
              gridTemplateColumns: '1fr 300px',
              gap: '32px',
              background: isDark ? '#0f172a' : '#fff',
            }}>
              {/* Main Content */}
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  margin: '0 0 16px',
                  color: isDark ? '#fff' : '#1a1a1a',
                }}>
                  About this {view.understanding?.entityType || 'Item'}
                </h3>
                
                {selectedItem.content.description && (
                  <p style={{
                    fontSize: '16px',
                    lineHeight: 1.7,
                    color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    margin: '0 0 24px',
                  }}>
                    {selectedItem.content.description}
                  </p>
                )}
                
                {/* Facts */}
                {selectedItem.content.facts && selectedItem.content.facts.length > 0 && (
                  <div style={{
                    padding: '20px',
                    background: isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.08)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #fbbf24',
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#fbbf24',
                      marginBottom: '8px',
                    }}>
                      💡 Fun Fact
                    </div>
                    <p style={{
                      fontSize: '15px',
                      color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)',
                      margin: 0,
                      lineHeight: 1.6,
                    }}>
                      {selectedItem.content.facts[0]}
                    </p>
                  </div>
                )}
                
                {/* Additional Images */}
                {detailImages.length > 1 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '12px',
                    marginTop: '24px',
                  }}>
                    {detailImages.slice(1).map((img, i) => (
                      <div
                        key={i}
                        onClick={() => onImageClick?.(img)}
                        style={{
                          borderRadius: '10px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Size Comparison Sidebar */}
              {view.extra?.sizeComparison && (
                <div style={{
                  padding: '24px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '16px',
                  height: 'fit-content',
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    margin: '0 0 8px',
                    color: isDark ? '#fff' : '#1a1a1a',
                  }}>
                    Size Scale
                  </h4>
                  <p style={{
                    fontSize: '13px',
                    color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                    margin: '0 0 20px',
                  }}>
                    Comparing length to a School Bus (12m) and a Human (1.8m)
                  </p>
                  
                  {view.extra.sizeComparison.map((item, i) => {
                    const colors = [accentColor, '#fbbf24', '#ef4444'];
                    return (
                      <div key={i} style={{ marginBottom: '16px' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '6px',
                          fontSize: '13px',
                        }}>
                          <span style={{ color: colors[i % colors.length], fontWeight: 500 }}>
                            {item.name}
                          </span>
                          <span style={{ color: colors[i % colors.length] }}>
                            {item.value}
                          </span>
                        </div>
                        <div style={{
                          height: '12px',
                          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                          borderRadius: '6px',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            width: `${item.width}%`,
                            height: '100%',
                            background: colors[i % colors.length],
                            borderRadius: '6px',
                            transition: 'width 0.5s ease',
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EntityBrowser;

