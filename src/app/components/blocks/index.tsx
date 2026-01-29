/**
 * Block Components - 可组合的交互式区块
 */

import React, { useState, useMemo } from 'react';
import { Block } from '../../catalog/schema';

// ============================================================================
// 图片服务 - 优先使用传入的真实图片，fallback 到 Picsum
// ============================================================================

const CURATED_IDS = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
  100, 101, 102, 103, 104, 106, 107, 108, 109, 110, 111, 112, 113,
  200, 201, 202, 203, 204, 206, 208, 209, 210, 211, 212, 213, 214,
];

function getFallbackImageUrl(seed: string, index: number, w = 800, h = 600): string {
  const hash = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const id = CURATED_IDS[(hash + index * 7) % CURATED_IDS.length];
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

/**
 * 获取图片 URL - 优先使用传入的真实图片，没有则用 Picsum fallback
 */
function getImage(images: string[] | undefined, index: number, seed: string, w = 800, h = 600): string {
  if (images && images.length > 0) {
    // 循环使用传入的图片
    const img = images[index % images.length];
    if (img && img.trim()) {
      return img;
    }
  }
  return getFallbackImageUrl(seed, index, w, h);
}

// Legacy function for backwards compatibility
function getImageUrl(seed: string, index: number, w = 800, h = 600): string {
  return getFallbackImageUrl(seed, index, w, h);
}

// ============================================================================
// Theme Context - 使用 ACF Tokens
// ============================================================================

interface Theme {
  bg: string;
  bgCard: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  isDark: boolean;
}

export function createTheme(themeType: string, accentColor: string): Theme {
  const isDark = themeType === 'dark' || themeType === 'cool';
  
  // 使用 ACF Design Tokens
  return {
    bg: isDark 
      ? 'var(--acf-color-back-neutral-inverted, #0a0a0a)' 
      : 'var(--acf-color-back-neutral-primary, #ffffff)',
    bgCard: isDark 
      ? 'var(--acf-color-back-neutral-inverted-secondary, #141414)' 
      : 'var(--acf-color-back-neutral-primary, #ffffff)',
    text: isDark 
      ? 'var(--acf-color-fore-neutral-inverted, #ffffff)' 
      : 'var(--acf-color-fore-neutral-primary, #1a1a1a)',
    textSecondary: isDark 
      ? 'var(--acf-color-fore-neutral-inverted-secondary, rgba(255,255,255,0.7))' 
      : 'var(--acf-color-fore-neutral-secondary, rgba(0,0,0,0.6))',
    accent: accentColor || 'var(--acf-color-fill-accent-primary, #0078d4)',
    border: isDark 
      ? 'var(--acf-color-stroke-neutral-inverted, rgba(255,255,255,0.1))' 
      : 'var(--acf-color-stroke-neutral-subtle, rgba(0,0,0,0.08))',
    isDark,
  };
}

// ============================================================================
// Hero Block
// ============================================================================

interface HeroProps {
  block: Extract<Block, { type: 'hero' }>;
  theme: Theme;
  seed: string;
  images?: string[];
}

export function HeroBlock({ block, theme, seed, images }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  const image = useMemo(() => getImage(images, 0, seed + '-hero', 1600, 900), [seed, images]);
  
  const heights = { fullscreen: '80vh', split: '50vh', minimal: '35vh', gradient: '60vh' };
  
  return (
    <div style={{
      position: 'relative',
      height: heights[block.style || 'split'],
      minHeight: '280px',
      overflow: 'hidden',
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
        background: block.style === 'gradient'
          ? `linear-gradient(135deg, ${theme.accent}90 0%, transparent 50%, rgba(0,0,0,0.7) 100%)`
          : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        right: '40px',
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: block.style === 'fullscreen' ? '64px' : '48px',
          fontWeight: 800,
          margin: '0 0 8px',
          textShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}>
          {block.title}
        </h1>
        {block.subtitle && (
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '20px', margin: 0 }}>
            {block.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Interactive List Block
// ============================================================================

interface InteractiveListProps {
  block: Extract<Block, { type: 'interactive-list' }>;
  theme: Theme;
  seed: string;
  images?: string[];
  onImageClick?: (url: string) => void;
}

export function InteractiveListBlock({ block, theme, seed, images, onImageClick }: InteractiveListProps) {
  const [selectedId, setSelectedId] = useState(block.items[0]?.id || '');
  const selectedItem = block.items.find(i => i.id === selectedId) || block.items[0];
  const selectedIndex = block.items.findIndex(i => i.id === selectedId);
  
  const detailImages = useMemo(() => {
    const count = selectedItem?.imageCount || 2;
    const baseIndex = selectedIndex * 3; // Offset images for each item
    return Array.from({ length: count }, (_, i) =>
      getImage(images, baseIndex + i, `${seed}-${selectedItem?.id}`, 1000, 700)
    );
  }, [selectedItem, selectedIndex, seed, images]);
  
  if (block.layout === 'cards') {
    return (
      <div style={{ padding: '40px' }}>
        {block.title && <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700, marginBottom: '24px' }}>{block.title}</h2>}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(block.items.length, 4)}, 1fr)`, gap: '20px' }}>
          {block.items.map((item, i) => {
            const isSelected = item.id === selectedId;
            const img = getImage(images, i, `${seed}-${item.id}`, 600, 400);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                style={{
                  background: theme.bgCard,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? `2px solid ${theme.accent}` : `2px solid transparent`,
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <img src={img} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <div style={{ color: theme.text, fontWeight: 600, fontSize: '16px' }}>{item.title}</div>
                  {item.subtitle && <div style={{ color: theme.textSecondary, fontSize: '14px' }}>{item.subtitle}</div>}
                </div>
              </div>
            );
          })}
        </div>
        {selectedItem && (
          <div style={{ marginTop: '32px', padding: '24px', background: theme.bgCard, borderRadius: '16px' }}>
            <h3 style={{ color: theme.text, fontSize: '24px', margin: '0 0 12px' }}>{selectedItem.title}</h3>
            {selectedItem.description && <p style={{ color: theme.textSecondary, lineHeight: 1.7 }}>{selectedItem.description}</p>}
            {selectedItem.stats && (
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                {selectedItem.stats.map((s, i) => (
                  <div key={i} style={{ padding: '8px 16px', background: theme.accent + '20', borderRadius: '8px' }}>
                    <span style={{ color: theme.accent, fontWeight: 600 }}>{s.label}:</span> {s.value}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  // Sidebar layout (default)
  return (
    <div style={{ display: 'flex', minHeight: '500px' }}>
      {/* Sidebar */}
      <div style={{
        width: '300px',
        background: theme.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        borderRight: `1px solid ${theme.border}`,
        padding: '20px',
      }}>
        {block.title && <h3 style={{ color: theme.text, fontSize: '18px', marginBottom: '16px' }}>{block.title}</h3>}
        {block.items.map(item => {
          const isSelected = item.id === selectedId;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={{
                padding: '14px',
                marginBottom: '8px',
                borderRadius: '10px',
                cursor: 'pointer',
                background: isSelected ? theme.accent + '20' : 'transparent',
                borderLeft: isSelected ? `3px solid ${theme.accent}` : '3px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ color: isSelected ? theme.accent : theme.text, fontWeight: 600 }}>{item.title}</div>
              {item.subtitle && <div style={{ color: theme.textSecondary, fontSize: '13px' }}>{item.subtitle}</div>}
            </div>
          );
        })}
      </div>
      
      {/* Detail */}
      <div style={{ flex: 1, padding: '32px' }}>
        {selectedItem && (
          <>
            <img
              src={detailImages[0]}
              alt=""
              onClick={() => onImageClick?.(detailImages[0])}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '16px', cursor: 'pointer', marginBottom: '24px' }}
            />
            <h2 style={{ color: theme.text, fontSize: '32px', margin: '0 0 12px' }}>{selectedItem.title}</h2>
            {selectedItem.description && <p style={{ color: theme.textSecondary, fontSize: '17px', lineHeight: 1.7 }}>{selectedItem.description}</p>}
            {selectedItem.stats && (
              <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                {selectedItem.stats.map((s, i) => (
                  <div key={i} style={{ padding: '12px 20px', background: theme.bgCard, borderRadius: '10px', border: `1px solid ${theme.border}` }}>
                    <div style={{ color: theme.textSecondary, fontSize: '12px' }}>{s.label}</div>
                    <div style={{ color: theme.text, fontSize: '20px', fontWeight: 700 }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}
            {selectedItem.fact && (
              <div style={{ marginTop: '24px', padding: '16px', background: theme.accent + '10', borderRadius: '12px', borderLeft: `4px solid ${theme.accent}` }}>
                <div style={{ color: theme.accent, fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>💡 Fun Fact</div>
                <div style={{ color: theme.text }}>{selectedItem.fact}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Tabs Block
// ============================================================================

interface TabsProps {
  block: Extract<Block, { type: 'tabs' }>;
  theme: Theme;
  seed: string;
  images?: string[];
  onImageClick?: (url: string) => void;
}

export function TabsBlock({ block, theme, seed, images: externalImages, onImageClick }: TabsProps) {
  const [selectedId, setSelectedId] = useState(block.tabs[0]?.id || '');
  const selectedTab = block.tabs.find(t => t.id === selectedId) || block.tabs[0];
  const selectedIndex = block.tabs.findIndex(t => t.id === selectedId);
  
  const images = useMemo(() => {
    const count = selectedTab?.imageCount || 4;
    const baseIndex = selectedIndex * 4; // Offset images for each tab
    return Array.from({ length: count }, (_, i) =>
      getImage(externalImages, baseIndex + i, `${seed}-${selectedTab?.id}`, 600, 450)
    );
  }, [selectedTab, selectedIndex, seed, externalImages]);
  
  return (
    <div style={{ padding: '40px' }}>
      {block.title && <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '24px' }}>{block.title}</h2>}
      
      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px', borderBottom: block.style === 'underline' ? `1px solid ${theme.border}` : 'none', paddingBottom: '12px' }}>
        {block.tabs.map(tab => {
          const isSelected = tab.id === selectedId;
          const baseStyle: React.CSSProperties = {
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: 'none',
            background: 'transparent',
            fontSize: '15px',
            fontWeight: 500,
          };
          
          if (block.style === 'pills') {
            return (
              <button key={tab.id} onClick={() => setSelectedId(tab.id)} style={{
                ...baseStyle,
                background: isSelected ? theme.accent : theme.bgCard,
                color: isSelected ? '#fff' : theme.textSecondary,
                borderRadius: '20px',
              }}>
                {tab.label}
              </button>
            );
          }
          
          if (block.style === 'boxed') {
            return (
              <button key={tab.id} onClick={() => setSelectedId(tab.id)} style={{
                ...baseStyle,
                background: isSelected ? theme.bgCard : 'transparent',
                color: isSelected ? theme.text : theme.textSecondary,
                borderRadius: '8px',
                border: isSelected ? `1px solid ${theme.border}` : '1px solid transparent',
              }}>
                {tab.label}
              </button>
            );
          }
          
          // Underline (default)
          return (
            <button key={tab.id} onClick={() => setSelectedId(tab.id)} style={{
              ...baseStyle,
              color: isSelected ? theme.accent : theme.textSecondary,
              borderBottom: isSelected ? `2px solid ${theme.accent}` : '2px solid transparent',
              marginBottom: '-13px',
            }}>
              {tab.label}
            </button>
          );
        })}
      </div>
      
      {/* Content */}
      {selectedTab && (
        <>
          {selectedTab.content && <p style={{ color: theme.textSecondary, textAlign: 'center', marginBottom: '24px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>{selectedTab.content}</p>}
          
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(images.length, 4)}, 1fr)`, gap: '16px' }}>
            {images.map((img, i) => (
              <div key={i} onClick={() => onImageClick?.(img)} style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                <img src={img} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                {selectedTab.tags?.[i] && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 12px 12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', fontSize: '14px', fontWeight: 500 }}>
                    {selectedTab.tags[i]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// Timeline Block
// ============================================================================

interface TimelineProps {
  block: Extract<Block, { type: 'timeline' }>;
  theme: Theme;
  seed: string;
  images?: string[];
  onImageClick?: (url: string) => void;
}

export function TimelineBlock({ block, theme, seed, images: externalImages, onImageClick }: TimelineProps) {
  const [selectedId, setSelectedId] = useState(block.events[0]?.id || '');
  const selectedEvent = block.events.find(e => e.id === selectedId) || block.events[0];
  const selectedIndex = block.events.findIndex(e => e.id === selectedId);
  
  const images = useMemo(() => {
    const count = selectedEvent?.imageCount || 2;
    const baseIndex = selectedIndex * 2; // Offset images for each event
    return Array.from({ length: count }, (_, i) =>
      getImage(externalImages, baseIndex + i, `${seed}-${selectedEvent?.id}`, 800, 600)
    );
  }, [selectedEvent, selectedIndex, seed, externalImages]);
  
  if (block.style === 'vertical') {
    return (
      <div style={{ padding: '40px' }}>
        {block.title && <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>{block.title}</h2>}
        {block.events.map((event, i) => {
          const isSelected = event.id === selectedId;
          const img = getImage(externalImages, i, `${seed}-${event.id}`, 400, 300);
          return (
            <div key={event.id} style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div onClick={() => setSelectedId(event.id)} style={{ width: '16px', height: '16px', borderRadius: '50%', background: isSelected ? theme.accent : theme.border, cursor: 'pointer', transition: 'all 0.2s ease' }} />
                {i < block.events.length - 1 && <div style={{ width: '2px', flex: 1, background: theme.border }} />}
              </div>
              <div onClick={() => setSelectedId(event.id)} style={{ flex: 1, cursor: 'pointer', opacity: isSelected ? 1 : 0.6, transition: 'opacity 0.2s ease' }}>
                <div style={{ color: theme.accent, fontSize: '13px', fontWeight: 600 }}>{event.period}</div>
                <div style={{ color: theme.text, fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{event.title}</div>
                {isSelected && event.description && <p style={{ color: theme.textSecondary }}>{event.description}</p>}
                {isSelected && <img src={img} alt="" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', marginTop: '16px' }} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  // Horizontal (default)
  return (
    <div style={{ padding: '40px' }}>
      {block.title && <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>{block.title}</h2>}
      
      {/* Content */}
      {selectedEvent && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ color: theme.accent, fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{selectedEvent.period}</div>
            <h3 style={{ color: theme.text, fontSize: '36px', fontWeight: 800, margin: '0 0 16px' }}>{selectedEvent.title}</h3>
            {selectedEvent.description && <p style={{ color: theme.textSecondary, fontSize: '17px', lineHeight: 1.7 }}>{selectedEvent.description}</p>}
            {selectedEvent.mood && (
              <div style={{ marginTop: '20px', color: theme.textSecondary, fontSize: '14px' }}>
                <span style={{ opacity: 0.6 }}>Mood:</span> <span style={{ color: theme.accent, fontStyle: 'italic' }}>{selectedEvent.mood}</span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {images.map((img, i) => (
              <img key={i} src={img} alt="" onClick={() => onImageClick?.(img)} style={{ flex: 1, height: '300px', objectFit: 'cover', borderRadius: '12px', cursor: 'pointer' }} />
            ))}
          </div>
        </div>
      )}
      
      {/* Timeline bar */}
      <div style={{ position: 'relative', padding: '20px 0' }}>
        <div style={{ height: '2px', background: theme.border }} />
        <div style={{ position: 'absolute', top: '20px', left: 0, height: '2px', width: `${(selectedIndex / (block.events.length - 1)) * 100}%`, background: theme.accent, transition: 'width 0.3s ease' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-9px' }}>
          {block.events.map(event => {
            const isSelected = event.id === selectedId;
            return (
              <div key={event.id} onClick={() => setSelectedId(event.id)} style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: isSelected ? theme.accent : theme.bg, border: `2px solid ${isSelected ? theme.accent : theme.border}`, margin: '0 auto 8px', transition: 'all 0.2s ease' }} />
                <div style={{ color: isSelected ? theme.text : theme.textSecondary, fontSize: '13px', fontWeight: 600 }}>{event.period}</div>
                <div style={{ color: isSelected ? theme.accent : theme.textSecondary, fontSize: '11px' }}>{event.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Gallery Block
// ============================================================================

interface GalleryProps {
  block: Extract<Block, { type: 'gallery' }>;
  theme: Theme;
  seed: string;
  images?: string[];
  onImageClick?: (url: string) => void;
}

export function GalleryBlock({ block, theme, seed, images: externalImages, onImageClick }: GalleryProps) {
  const images = useMemo(() => {
    return Array.from({ length: block.imageCount || 6 }, (_, i) =>
      getImage(externalImages, i, `${seed}-gallery`, 600, 450)
    );
  }, [block.imageCount, seed, externalImages]);
  
  if (block.style === 'masonry') {
    return (
      <div style={{ padding: '40px' }}>
        {block.title && <h2 style={{ color: theme.text, fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>{block.title}</h2>}
        <div style={{ columnCount: block.columns || 3, columnGap: '16px' }}>
          {images.map((img, i) => (
            <div key={i} onClick={() => onImageClick?.(img)} style={{ marginBottom: '16px', breakInside: 'avoid', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
              <img src={img} alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (block.style === 'featured') {
    return (
      <div style={{ padding: '40px' }}>
        {block.title && <h2 style={{ color: theme.text, fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>{block.title}</h2>}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr', gap: '16px', height: '500px' }}>
          <div onClick={() => onImageClick?.(images[0])} style={{ gridRow: 'span 2', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
            <img src={images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {images.slice(1, 3).map((img, i) => (
            <div key={i} onClick={() => onImageClick?.(img)} style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Grid (default)
  return (
    <div style={{ padding: '40px' }}>
      {block.title && <h2 style={{ color: theme.text, fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>{block.title}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${block.columns || 4}, 1fr)`, gap: '16px' }}>
        {images.map((img, i) => (
          <div key={i} onClick={() => onImageClick?.(img)} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img src={img} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            {block.labels?.[i] && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 12px 12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', fontSize: '14px', fontWeight: 500 }}>
                {block.labels[i]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Steps Block
// ============================================================================

interface StepsProps {
  block: Extract<Block, { type: 'steps' }>;
  theme: Theme;
  seed: string;
  images?: string[];
  onImageClick?: (url: string) => void;
}

export function StepsBlock({ block, theme, seed, images: externalImages, onImageClick }: StepsProps) {
  const [selectedId, setSelectedId] = useState(block.steps[0]?.id || '');
  const selectedStep = block.steps.find(s => s.id === selectedId) || block.steps[0];
  const selectedIndex = block.steps.findIndex(s => s.id === selectedId);
  
  const image = useMemo(() => getImage(externalImages, selectedIndex, `${seed}-${selectedStep?.id}`, 800, 600), [selectedStep, selectedIndex, seed, externalImages]);
  
  return (
    <div style={{ padding: '40px' }}>
      {block.title && <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '32px' }}>{block.title}</h2>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>
        {/* Step list */}
        <div>
          {block.steps.map((step, i) => {
            const isSelected = step.id === selectedId;
            return (
              <div key={step.id} onClick={() => setSelectedId(step.id)} style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                marginBottom: '8px',
                borderRadius: '12px',
                cursor: 'pointer',
                background: isSelected ? theme.accent + '15' : 'transparent',
                borderLeft: isSelected ? `4px solid ${theme.accent}` : '4px solid transparent',
                transition: 'all 0.2s ease',
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isSelected ? theme.accent : 'transparent',
                  border: `2px solid ${isSelected ? theme.accent : theme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isSelected ? '#fff' : theme.textSecondary,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ color: isSelected ? theme.text : theme.textSecondary, fontWeight: 600 }}>{step.title}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Detail */}
        <div>
          <img src={image} alt="" onClick={() => onImageClick?.(image)} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '16px', cursor: 'pointer', marginBottom: '24px' }} />
          <h3 style={{ color: theme.text, fontSize: '24px', fontWeight: 700, margin: '0 0 12px' }}>Step {selectedIndex + 1}: {selectedStep?.title}</h3>
          {selectedStep?.description && <p style={{ color: theme.textSecondary, fontSize: '16px', lineHeight: 1.8 }}>{selectedStep.description}</p>}
          {selectedStep?.tip && (
            <div style={{ marginTop: '20px', padding: '16px', background: theme.accent + '15', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <span>💡</span>
              <div>
                <div style={{ color: theme.accent, fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Tip</div>
                <div style={{ color: theme.text }}>{selectedStep.tip}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Comparison Block
// ============================================================================

interface ComparisonProps {
  block: Extract<Block, { type: 'comparison' }>;
  theme: Theme;
  seed: string;
  images?: string[];
  onImageClick?: (url: string) => void;
}

export function ComparisonBlock({ block, theme, seed, images: externalImages, onImageClick }: ComparisonProps) {
  return (
    <div style={{ padding: '40px' }}>
      {block.title && <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '32px' }}>{block.title}</h2>}
      
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${block.items.length}, 1fr)`, gap: '24px' }}>
        {block.items.map((item, i) => {
          const img = getImage(externalImages, i, `${seed}-${item.id}`, 600, 400);
          return (
            <div key={item.id} style={{ background: theme.bgCard, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
              <img src={img} alt="" onClick={() => onImageClick?.(img)} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', cursor: 'pointer' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: theme.text, fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>{item.name}</h3>
                {item.description && <p style={{ color: theme.textSecondary, fontSize: '14px', margin: '0 0 16px' }}>{item.description}</p>}
                {item.stats && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {item.stats.map((s, j) => (
                      <div key={j} style={{ padding: '6px 12px', background: theme.accent + '15', borderRadius: '6px', fontSize: '13px' }}>
                        <span style={{ color: theme.textSecondary }}>{s.label}:</span> <span style={{ color: theme.text, fontWeight: 600 }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {item.pros && (
                  <div style={{ marginBottom: '12px' }}>
                    {item.pros.map((p, j) => (
                      <div key={j} style={{ color: '#22c55e', fontSize: '14px', marginBottom: '4px' }}>✓ {p}</div>
                    ))}
                  </div>
                )}
                {item.cons && (
                  <div>
                    {item.cons.map((c, j) => (
                      <div key={j} style={{ color: '#ef4444', fontSize: '14px', marginBottom: '4px' }}>✗ {c}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Info Card Block
// ============================================================================

interface InfoCardProps {
  block: Extract<Block, { type: 'info-card' }>;
  theme: Theme;
}

export function InfoCardBlock({ block, theme }: InfoCardProps) {
  const styles = {
    tip: { bg: '#fbbf24', icon: '💡' },
    fact: { bg: '#3b82f6', icon: 'ℹ️' },
    warning: { bg: '#ef4444', icon: '⚠️' },
    quote: { bg: theme.accent, icon: '❝' },
  };
  const s = styles[block.style || 'fact'];
  
  return (
    <div style={{ padding: '20px 40px' }}>
      <div style={{
        padding: '20px 24px',
        background: s.bg + '15',
        borderRadius: '12px',
        borderLeft: `4px solid ${s.bg}`,
      }}>
        {block.title && (
          <div style={{ color: s.bg, fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
            {s.icon} {block.title}
          </div>
        )}
        <div style={{ color: theme.text, fontSize: block.style === 'quote' ? '18px' : '15px', fontStyle: block.style === 'quote' ? 'italic' : 'normal', lineHeight: 1.6 }}>
          {block.content}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Stats Block
// ============================================================================

interface StatsProps {
  block: Extract<Block, { type: 'stats' }>;
  theme: Theme;
}

export function StatsBlock({ block, theme }: StatsProps) {
  if (block.style === 'bars') {
    const maxValue = Math.max(...block.stats.map(s => parseFloat(s.value) || 100));
    return (
      <div style={{ padding: '40px' }}>
        {block.title && <h3 style={{ color: theme.text, fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>{block.title}</h3>}
        {block.stats.map((stat, i) => {
          const value = parseFloat(stat.value) || 50;
          const width = (value / maxValue) * 100;
          const colors = [theme.accent, '#fbbf24', '#ef4444', '#22c55e'];
          return (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: colors[i % colors.length], fontWeight: 500 }}>{stat.label}</span>
                <span style={{ color: colors[i % colors.length] }}>{stat.value}</span>
              </div>
              <div style={{ height: '12px', background: theme.border, borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${width}%`, height: '100%', background: colors[i % colors.length], borderRadius: '6px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  // Cards (default)
  return (
    <div style={{ padding: '40px' }}>
      {block.title && <h3 style={{ color: theme.text, fontSize: '20px', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>{block.title}</h3>}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {block.stats.map((stat, i) => (
          <div key={i} style={{ padding: '24px 32px', background: theme.bgCard, borderRadius: '16px', textAlign: 'center', border: `1px solid ${theme.border}`, minWidth: '140px' }}>
            {stat.icon && <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>}
            <div style={{ color: theme.text, fontSize: '28px', fontWeight: 700 }}>{stat.value}</div>
            <div style={{ color: theme.textSecondary, fontSize: '14px' }}>{stat.label}</div>
            {stat.description && <div style={{ color: theme.textSecondary, fontSize: '12px', marginTop: '4px' }}>{stat.description}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Accordion Block
// ============================================================================

interface AccordionProps {
  block: Extract<Block, { type: 'accordion' }>;
  theme: Theme;
  seed: string;
  images?: string[];
}

export function AccordionBlock({ block, theme, seed, images: externalImages }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  
  return (
    <div style={{ padding: '40px' }}>
      {block.title && <h3 style={{ color: theme.text, fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>{block.title}</h3>}
      {block.items.map((item, i) => {
        const isOpen = openId === item.id;
        const img = getImage(externalImages, i, `${seed}-accordion-${item.id}`, 400, 300);
        return (
          <div key={item.id} style={{ marginBottom: '8px', background: theme.bgCard, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
            <div onClick={() => setOpenId(isOpen ? null : item.id)} style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}>
              <span style={{ color: theme.text, fontWeight: 600 }}>{item.title}</span>
              <span style={{ color: theme.textSecondary, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>▼</span>
            </div>
            {isOpen && (
              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ color: theme.textSecondary, margin: '0 0 16px', lineHeight: 1.6 }}>{item.content}</p>
                {item.imageCount > 0 && <img src={img} alt="" style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// Text Block
// ============================================================================

interface TextProps {
  block: Extract<Block, { type: 'text' }>;
  theme: Theme;
}

export function TextBlock({ block, theme }: TextProps) {
  if (block.style === 'quote') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <blockquote style={{ color: theme.text, fontSize: '24px', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          "{block.content}"
        </blockquote>
      </div>
    );
  }
  
  if (block.style === 'callout') {
    return (
      <div style={{ padding: '20px 40px' }}>
        <div style={{ padding: '24px', background: theme.accent + '10', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ color: theme.text, fontSize: '18px', margin: 0, lineHeight: 1.6 }}>{block.content}</p>
        </div>
      </div>
    );
  }
  
  // Paragraph
  return (
    <div style={{ padding: '20px 40px' }}>
      <p style={{ color: theme.textSecondary, fontSize: '17px', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto' }}>{block.content}</p>
    </div>
  );
}

// ============================================================================
// Divider Block
// ============================================================================

interface DividerProps {
  block: Extract<Block, { type: 'divider' }>;
  theme: Theme;
}

export function DividerBlock({ block, theme }: DividerProps) {
  if (block.style === 'line') {
    return <div style={{ padding: '20px 40px' }}><div style={{ height: '1px', background: theme.border }} /></div>;
  }
  if (block.style === 'dots') {
    return (
      <div style={{ padding: '20px 40px', textAlign: 'center' }}>
        <span style={{ color: theme.textSecondary, letterSpacing: '8px' }}>• • •</span>
      </div>
    );
  }
  // Space
  return <div style={{ height: '40px' }} />;
}

