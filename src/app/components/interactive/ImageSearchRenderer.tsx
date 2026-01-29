/**
 * AI Design Renderer - 有结构的灵活
 */

import React, { useMemo, useState } from 'react';
import { AIDesign, Section } from '../../catalog/schema';

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

function getImageUrl(query: string, index: number, w = 800, h = 600): string {
  const hash = query.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const id = CURATED_IDS[(hash + index * 7) % CURATED_IDS.length];
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

// ============================================================================
// 主题
// ============================================================================

function createTheme(colorScheme: string, mood: string) {
  const isDark = colorScheme === 'dark' || colorScheme === 'cool';
  const isWarm = colorScheme === 'warm';
  
  const accents: Record<string, string> = {
    elegant: '#6366f1',
    playful: '#ec4899',
    dramatic: '#ef4444',
    minimal: '#737373',
    cozy: '#f59e0b',
  };
  
  return {
    bg: isDark ? '#0a0a0a' : isWarm ? '#faf5f0' : '#fafafa',
    bgCard: isDark ? '#141414' : '#ffffff',
    text: isDark ? '#ffffff' : '#0a0a0a',
    textSecondary: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
    textMuted: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
    accent: accents[mood] || '#6366f1',
    border: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    isDark,
  };
}

type Theme = ReturnType<typeof createTheme>;

// ============================================================================
// Hero
// ============================================================================

function HeroSection({
  image,
  title,
  subtitle,
  style,
  theme,
}: {
  image: string;
  title: string;
  subtitle?: string;
  style: string;
  theme: Theme;
}) {
  const [loaded, setLoaded] = useState(false);
  
  const heights: Record<string, string> = {
    fullscreen: '75vh',
    half: '50vh',
    minimal: '35vh',
  };

  return (
    <div style={{
      position: 'relative',
      height: heights[style] || '50vh',
      minHeight: '280px',
      overflow: 'hidden',
      marginBottom: '40px',
    }}>
      <img
        src={image}
        alt=""
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        right: '40px',
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: style === 'fullscreen' ? '56px' : style === 'half' ? '44px' : '32px',
          fontWeight: 800,
          lineHeight: 1.1,
          margin: '0 0 8px',
          textShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '18px',
            margin: 0,
            maxWidth: '600px',
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Section Renderers
// ============================================================================

function GridSection({
  section,
  images,
  columns = 4,
  theme,
}: {
  section: Section;
  images: string[];
  columns?: number;
  theme: Theme;
}) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {section.title && (
        <h2 style={{
          color: theme.text,
          fontSize: '24px',
          fontWeight: 700,
          margin: '0 0 20px',
        }}>
          {section.title}
        </h2>
      )}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
      }}>
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              background: theme.bgCard,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
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
              src={src}
              alt=""
              style={{
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
              }}
            />
            {section.labels?.[i] && (
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
                {section.labels[i]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MasonrySection({
  section,
  images,
  theme,
}: {
  section: Section;
  images: string[];
  theme: Theme;
}) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {section.title && (
        <h2 style={{
          color: theme.text,
          fontSize: '24px',
          fontWeight: 700,
          margin: '0 0 20px',
        }}>
          {section.title}
        </h2>
      )}
      
      <div style={{ columnCount: 3, columnGap: '16px' }}>
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              marginBottom: '16px',
              breakInside: 'avoid',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardsSection({
  section,
  images,
  theme,
}: {
  section: Section;
  images: string[];
  theme: Theme;
}) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {section.title && (
        <h2 style={{
          color: theme.text,
          fontSize: '24px',
          fontWeight: 700,
          margin: '0 0 20px',
        }}>
          {section.title}
        </h2>
      )}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(images.length, 4)}, 1fr)`,
        gap: '20px',
      }}>
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              background: theme.bgCard,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: theme.isDark 
                ? '0 4px 20px rgba(0,0,0,0.3)'
                : '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = theme.isDark 
                ? '0 16px 50px rgba(0,0,0,0.4)'
                : '0 16px 50px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = theme.isDark 
                ? '0 4px 20px rgba(0,0,0,0.3)'
                : '0 4px 20px rgba(0,0,0,0.08)';
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
              }}
            />
            {section.labels?.[i] && (
              <div style={{
                padding: '16px',
                color: theme.text,
                fontSize: '15px',
                fontWeight: 600,
                textAlign: 'center',
              }}>
                {section.labels[i]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineSection({
  section,
  images,
  index,
  theme,
}: {
  section: Section;
  images: string[];
  index: number;
  theme: Theme;
}) {
  const isLeft = index % 2 === 0;
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '32px',
      marginBottom: '48px',
      flexDirection: isLeft ? 'row' : 'row-reverse',
    }}>
      {/* 内容 */}
      <div style={{ flex: 1 }}>
        {section.title && (
          <h3 style={{
            color: theme.text,
            fontSize: '22px',
            fontWeight: 700,
            margin: '0 0 16px',
          }}>
            {section.title}
          </h3>
        )}
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(images.length, 3)}, 1fr)`,
          gap: '12px',
        }}>
          {images.map((src, i) => (
            <div key={i} style={{ borderRadius: '10px', overflow: 'hidden' }}>
              <img src={src} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
      
      {/* 时间线 */}
      <div style={{
        width: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: theme.accent,
          boxShadow: `0 0 20px ${theme.accent}50`,
        }} />
        <div style={{
          width: '2px',
          flex: 1,
          minHeight: '100px',
          background: theme.border,
        }} />
      </div>
      
      {/* 占位 */}
      <div style={{ flex: 1 }} />
    </div>
  );
}

// ============================================================================
// Main Renderer
// ============================================================================

interface Props {
  view: AIDesign;
  query?: string;
  onImageClick?: (src: string) => void;
  showDebugInfo?: boolean;
  renderPhase?: number;
}

export function ImageSearchRenderer({
  view,
  query = '',
  showDebugInfo = false,
}: Props) {
  const title = view?.title || 'Gallery';
  const subtitle = view?.subtitle;
  const layout = view?.layout || 'grid';
  const colorScheme = view?.colorScheme || 'dark';
  const mood = view?.mood || 'elegant';
  const sections = view?.sections || [{ images: 8 }];
  const showHero = view?.showHero !== false;
  const heroStyle = view?.heroStyle || 'half';
  
  const theme = useMemo(() => createTheme(colorScheme, mood), [colorScheme, mood]);
  const heroImage = useMemo(() => getImageUrl(query, 999, 1600, 900), [query]);
  
  // Generate all images
  let imageIndex = 0;
  const sectionImages = sections.map(s => {
    const count = s.images || 4;
    const imgs = Array.from({ length: count }, (_, i) => getImageUrl(query, imageIndex + i));
    imageIndex += count;
    return imgs;
  });

  return (
    <div style={{
      background: theme.bg,
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: theme.text,
    }}>
      {showDebugInfo && (
        <div style={{
          padding: '8px 16px',
          background: theme.accent,
          color: '#fff',
          fontSize: '12px',
        }}>
          Layout: {layout} | Mood: {mood} | Color: {colorScheme}
        </div>
      )}
      
      {/* Hero */}
      {showHero && (
        <HeroSection
          image={heroImage}
          title={title}
          subtitle={subtitle}
          style={heroStyle}
          theme={theme}
        />
      )}
      
      {/* No Hero Title */}
      {!showHero && (
        <div style={{ padding: '48px 40px 24px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 800, margin: 0 }}>{title}</h1>
          {subtitle && <p style={{ color: theme.textSecondary, fontSize: '18px', marginTop: '8px' }}>{subtitle}</p>}
        </div>
      )}
      
      {/* Sections */}
      <div style={{ padding: '0 40px 60px', maxWidth: '1400px', margin: '0 auto' }}>
        {sections.map((section, i) => {
          const images = sectionImages[i];
          
          if (layout === 'masonry') {
            return <MasonrySection key={i} section={section} images={images} theme={theme} />;
          }
          
          if (layout === 'cards') {
            return <CardsSection key={i} section={section} images={images} theme={theme} />;
          }
          
          if (layout === 'timeline') {
            return <TimelineSection key={i} section={section} images={images} index={i} theme={theme} />;
          }
          
          // Default: grid
          return (
            <GridSection
              key={i}
              section={section}
              images={images}
              columns={layout === 'hero-focus' && i === 0 ? 2 : 4}
              theme={theme}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ImageSearchRenderer;
