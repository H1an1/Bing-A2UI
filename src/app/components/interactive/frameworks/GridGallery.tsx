/**
 * Grid Gallery Framework
 * 
 * 简单的图片网格展示
 * 适用于：风景、灵感、美学内容等
 */

import React, { useMemo, useState } from 'react';
import { DynamicView } from '../../../catalog/schema';

// ============================================================================
// 图片服务
// ============================================================================

const CURATED_IDS = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
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

export function GridGallery({ view, onImageClick }: Props) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  
  const theme = view.design?.theme || 'dark';
  const isDark = theme === 'dark' || theme === 'immersive';
  const accentColor = view.design?.accentColor || '#6366f1';
  
  // Calculate total images needed
  const totalImages = useMemo(() => {
    return view.items.reduce((sum, item) => sum + (item.content?.imageCount || 4), 0);
  }, [view.items]);
  
  // Generate all images
  const allImages = useMemo(() => {
    let index = 0;
    const sections: Array<{ title?: string; images: string[]; tags?: string[] }> = [];
    
    for (const item of view.items) {
      const count = item.content?.imageCount || 4;
      const images = Array.from({ length: count }, (_, i) => 
        getImageUrl(`${view.title}-${item.id}`, index + i)
      );
      sections.push({
        title: item.title,
        images,
        tags: item.content?.tags,
      });
      index += count;
    }
    
    return sections;
  }, [view.items, view.title]);
  
  // Hero image
  const heroImage = useMemo(
    () => getImageUrl(`${view.title}-hero`, 999, 1600, 900),
    [view.title]
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark ? '#0a0a0a' : '#fafafa',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: isDark ? '#fff' : '#1a1a1a',
    }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '50vh',
        minHeight: '320px',
        overflow: 'hidden',
      }}>
        <img
          src={heroImage}
          alt=""
          onLoad={() => setHeroLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: heroLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
        
        {/* Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
        }} />
        
        {/* Title */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          right: '40px',
        }}>
          <h1 style={{
            fontSize: '52px',
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 8px',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}>
            {view.title}
          </h1>
          {view.subtitle && (
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
              maxWidth: '500px',
            }}>
              {view.subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '48px 40px',
      }}>
        {allImages.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: '48px' }}>
            {section.title && (
              <h2 style={{
                fontSize: '24px',
                fontWeight: 700,
                margin: '0 0 20px',
                color: isDark ? '#fff' : '#1a1a1a',
              }}>
                {section.title}
              </h2>
            )}
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
            }}>
              {section.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => onImageClick?.(img)}
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
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
                  
                  {/* Label */}
                  {section.tags?.[i] && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '24px 14px 14px',
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}>
                      {section.tags[i]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridGallery;

