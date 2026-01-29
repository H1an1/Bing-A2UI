/**
 * Timeline Explorer Framework
 * 
 * 底部时间轴 + 内容区域
 * 适用于：艺术时期、历史事件、产品演进等
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

export function TimelineExplorer({ view, onImageClick }: Props) {
  const [selectedId, setSelectedId] = useState(view.items[0]?.id || '');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const selectedItem = useMemo(
    () => view.items.find(item => item.id === selectedId) || view.items[0],
    [view.items, selectedId]
  );
  
  const selectedIndex = view.items.findIndex(item => item.id === selectedId);
  
  const theme = view.design?.theme || 'immersive';
  const accentColor = view.design?.accentColor || '#d4a574';
  
  // Generate images for selected item
  const detailImages = useMemo(() => {
    const count = selectedItem?.content?.imageCount || 3;
    return Array.from({ length: count }, (_, i) => 
      getImageUrl(`${view.title}-${selectedItem?.id}`, i, 1000, 700)
    );
  }, [selectedItem, view.title]);

  // Background image (blurred)
  const bgImage = useMemo(
    () => getImageUrl(`${view.title}-${selectedItem?.id}-bg`, 0, 1920, 1080),
    [selectedItem, view.title]
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Image (Blurred) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.25,
        filter: 'blur(30px)',
        transition: 'background-image 0.5s ease',
      }} />
      
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)',
      }} />
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              {view.title}
            </h1>
            {view.subtitle && (
              <p style={{
                fontSize: '12px',
                color: accentColor,
                margin: '4px 0 0',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}>
                {view.subtitle}
              </p>
            )}
          </div>
          
          {/* Period Badge */}
          {selectedItem?.period && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 500,
              }}>
                {selectedItem.period}
              </span>
            </div>
          )}
        </div>
        
        {/* Main Content Area */}
        <div style={{
          flex: 1,
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '40px',
          alignItems: 'center',
        }}>
          {/* Left: Text Content */}
          <div>
            <h2 style={{
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: 1.05,
              margin: '0 0 24px',
              color: accentColor,
            }}>
              {selectedItem?.content.headline}
            </h2>
            
            {selectedItem?.content.description && (
              <p style={{
                fontSize: '17px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.8)',
                margin: '0 0 28px',
              }}>
                {selectedItem.content.description}
              </p>
            )}
            
            {/* Tags/Mood */}
            {selectedItem?.content.tags && selectedItem.content.tags.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '24px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '4px',
                  }}>
                    Mood
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: accentColor,
                  }}>
                    {selectedItem.content.tags[0]}
                  </div>
                </div>
                
                {selectedItem.content.tags[1] && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '4px',
                    }}>
                      Key Color
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '15px',
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: accentColor,
                      }} />
                      {selectedItem.content.tags[1]}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Action Button */}
            <button style={{
              marginTop: '32px',
              padding: '14px 24px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
            }}>
              💡 Enable Curatorial Insights
            </button>
          </div>
          
          {/* Right: Images */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'flex-end',
          }}>
            {detailImages.slice(0, 2).map((img, i) => (
              <div
                key={i}
                onClick={() => onImageClick?.(img)}
                style={{
                  width: i === 0 ? '55%' : '35%',
                  aspectRatio: i === 0 ? '4/5' : '3/4',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  position: 'relative',
                  transform: i === 1 ? 'translateY(30px)' : 'none',
                }}
              >
                <img
                  src={img}
                  alt=""
                  onLoad={i === 0 ? () => setImageLoaded(true) : undefined}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                />
                
                {/* Attribution */}
                {i === 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    padding: '6px 10px',
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    Getty Images
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Timeline */}
        <div style={{
          padding: '24px 40px 32px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '0',
          }}>
            {view.items.map((item, i) => {
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
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '0 24px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Dot */}
                  <div style={{
                    width: isSelected ? '20px' : '12px',
                    height: isSelected ? '20px' : '12px',
                    borderRadius: '50%',
                    background: isSelected ? accentColor : 'rgba(255,255,255,0.3)',
                    border: isSelected ? `3px solid ${accentColor}40` : 'none',
                    marginBottom: '12px',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 0 20px ${accentColor}60` : 'none',
                  }} />
                  
                  {/* Period */}
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isSelected ? '#fff' : 'rgba(255,255,255,0.5)',
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.period || item.title}
                  </div>
                  
                  {/* Title */}
                  <div style={{
                    fontSize: '11px',
                    color: isSelected ? accentColor : 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.period ? item.title : ''}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Timeline Line */}
          <div style={{
            position: 'relative',
            height: '2px',
            background: 'rgba(255,255,255,0.15)',
            marginTop: '-48px',
            marginBottom: '48px',
            marginLeft: '60px',
            marginRight: '60px',
          }}>
            {/* Progress */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${(selectedIndex / (view.items.length - 1)) * 100}%`,
              background: accentColor,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineExplorer;

