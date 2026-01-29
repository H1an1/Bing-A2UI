/**
 * Step Guide Framework
 * 
 * 左侧步骤列表 + 右侧详情
 * 适用于：教程、食谱、流程指南等
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

export function StepGuide({ view, onImageClick }: Props) {
  const [selectedId, setSelectedId] = useState(view.items[0]?.id || '');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const selectedItem = useMemo(
    () => view.items.find(item => item.id === selectedId) || view.items[0],
    [view.items, selectedId]
  );
  
  const selectedIndex = view.items.findIndex(item => item.id === selectedId);
  
  const theme = view.design?.theme || 'light';
  const isDark = theme === 'dark';
  const accentColor = view.design?.accentColor || '#d97706';
  
  // Generate images for selected item
  const detailImages = useMemo(() => {
    const count = selectedItem?.content?.imageCount || 2;
    return Array.from({ length: count }, (_, i) => 
      getImageUrl(`${view.title}-${selectedItem?.id}`, i, 1000, 700)
    );
  }, [selectedItem, view.title]);

  // Calculate totals if stats exist
  const hasIngredients = selectedItem?.content?.stats && selectedItem.content.stats.length > 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark ? '#0f0f0f' : '#f5f5f0',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: isDark ? '#fff' : '#1a1a1a',
    }}>
      {/* Header Section */}
      {selectedIndex === 0 && (
        <div style={{
          padding: '60px 40px 40px',
          background: isDark ? '#141414' : '#fff',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 800,
              margin: '0 0 8px',
              textAlign: 'center',
            }}>
              {selectedItem?.content.headline || view.title}
            </h1>
            
            {selectedItem?.content.description && (
              <p style={{
                fontSize: '18px',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                textAlign: 'center',
                margin: '0 0 40px',
              }}>
                {selectedItem.content.description}
              </p>
            )}
            
            {/* Ingredients/Stats Card */}
            {hasIngredients && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                alignItems: 'stretch',
              }}>
                {/* Quantity Selector (decorative) */}
                <div style={{
                  padding: '24px 32px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                  borderRadius: '16px',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                    marginBottom: '12px',
                  }}>
                    How many guests?
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                  }}>
                    <button style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: 'none',
                      background: accentColor + '20',
                      color: accentColor,
                      fontSize: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      −
                    </button>
                    <span style={{ fontSize: '32px', fontWeight: 700, minWidth: '40px' }}>2</span>
                    <button style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: 'none',
                      background: accentColor + '20',
                      color: accentColor,
                      fontSize: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      +
                    </button>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                    marginTop: '8px',
                  }}>
                    Hungry guests? Add an extra portion just in case.
                  </div>
                </div>
                
                {/* Ingredients */}
                <div style={{
                  padding: '24px 32px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : '#fffdf5',
                  borderRadius: '16px',
                  border: `2px dashed ${accentColor}40`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                }}>
                  {selectedItem.content.stats.map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: isDark ? '#fff' : '#1a1a1a',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: accentColor,
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 40px',
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 700,
          textAlign: 'center',
          margin: '0 0 12px',
        }}>
          {selectedIndex === 0 ? 'Step 2: The Method' : selectedItem?.content.headline}
        </h2>
        <p style={{
          fontSize: '16px',
          color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
          textAlign: 'center',
          margin: '0 0 48px',
        }}>
          Follow these steps for perfect results every time.
        </p>
        
        {/* Steps Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '48px',
        }}>
          {/* Left: Step List */}
          <div>
            {view.items.map((item, i) => {
              const isSelected = item.id === selectedId;
              const stepNum = item.step || i + 1;
              
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setImageLoaded(false);
                  }}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    marginBottom: '8px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: isSelected
                      ? isDark ? 'rgba(255,255,255,0.08)' : '#fff'
                      : 'transparent',
                    borderLeft: isSelected
                      ? `4px solid ${accentColor}`
                      : '4px solid transparent',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected
                      ? isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
                      : 'none',
                  }}
                >
                  {/* Step Number */}
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isSelected ? accentColor : 'transparent',
                    border: `2px solid ${isSelected ? accentColor : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isSelected ? '#fff' : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'),
                    flexShrink: 0,
                  }}>
                    {stepNum}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: isSelected ? (isDark ? '#fff' : '#1a1a1a') : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'),
                      marginBottom: '4px',
                    }}>
                      {stepNum}. {item.title}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                    }}>
                      {item.subtitle || (item.content.description?.substring(0, 40) + '...')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Right: Detail */}
          <div>
            {/* Image */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '24px',
              boxShadow: isDark ? '0 8px 40px rgba(0,0,0,0.4)' : '0 8px 40px rgba(0,0,0,0.1)',
            }}>
              <img
                src={detailImages[0]}
                alt=""
                onLoad={() => setImageLoaded(true)}
                onClick={() => onImageClick?.(detailImages[0])}
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              />
            </div>
            
            {/* Text Content */}
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              margin: '0 0 12px',
            }}>
              {selectedItem?.content.headline}
            </h3>
            
            {selectedItem?.content.description && (
              <p style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                margin: '0 0 20px',
              }}>
                {selectedItem.content.description}
              </p>
            )}
            
            {/* Tip */}
            {selectedItem?.content.facts && selectedItem.content.facts.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '12px',
                padding: '16px 20px',
                background: accentColor + '15',
                borderRadius: '12px',
              }}>
                <span style={{ fontSize: '18px' }}>💡</span>
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: accentColor,
                    marginBottom: '4px',
                  }}>
                    Tip:
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                  }}>
                    {selectedItem.content.facts[0]}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepGuide;

