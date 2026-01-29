/**
 * TimelineGrid - Blue Period Grid Template (108:54012)
 * 
 * Figma Design:
 * - Top: Horizontal timeline (1890-1960)
 * - Left: Image grid (1 large vertical + 3 top + 2 bottom)
 * - Right: Title + Description
 */

import React, { useState } from 'react';

interface TimelineGridProps {
  title: string;
  description: string;
  yearStart?: number;
  yearEnd?: number;
  activeYearStart?: number;
  activeYearEnd?: number;
  images: string[];
  className?: string;
  onImageClick?: (url: string, index: number) => void;
}

export function TimelineGrid({
  title,
  description,
  yearStart = 1890,
  yearEnd = 1960,
  activeYearStart = 1900,
  activeYearEnd = 1910,
  images,
  className = '',
  onImageClick
}: TimelineGridProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  const years = [];
  for (let y = yearStart; y <= yearEnd; y += 10) {
    years.push(y);
  }

  const getYearPosition = (year: number) => {
    return ((year - yearStart) / (yearEnd - yearStart)) * 100;
  };

  const activeStartPos = getYearPosition(activeYearStart);
  const activeEndPos = getYearPosition(activeYearEnd);

  // 6 images: 1 large + 3 top row + 2 bottom row
  const largeImage = images[0];
  const topRowImages = images.slice(1, 4);
  const bottomRowImages = images.slice(4, 6);

  return (
    <div className={className} style={styles.container}>
      {/* Timeline */}
      <div style={styles.timeline}>
        <div style={styles.track}>
          {/* Dashed background line */}
          <div style={styles.trackBg} />
          
          {/* Active solid line */}
          <div 
            style={{
              ...styles.trackActive,
              left: `${activeStartPos}%`,
              width: `${activeEndPos - activeStartPos}%`
            }}
          />
          
          {/* Year dots and labels */}
          {years.map((year) => {
            const isActive = year >= activeYearStart && year <= activeYearEnd;
            const pos = getYearPosition(year);
            return (
              <div 
                key={year}
                style={{
                  ...styles.yearMarker,
                  left: `${pos}%`
                }}
              >
                <div style={{
                  ...styles.dot,
                  ...(isActive ? styles.dotActive : {})
                }} />
                <span style={{
                  ...styles.yearLabel,
                  ...(isActive ? styles.yearLabelActive : {})
                }}>
                  {year}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        {/* Left: Image grid */}
        <div style={styles.gallery}>
          {/* Large vertical image */}
          <div 
            style={{
              ...styles.largeImage,
              transform: hoverIndex === 0 ? 'scale(1.02)' : 'scale(1)'
            }}
            onClick={() => onImageClick?.(largeImage, 0)}
            onMouseEnter={() => setHoverIndex(0)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <img 
              src={largeImage} 
              alt={`${title} 1`}
              style={styles.img}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/300/400?random=0';
              }}
            />
          </div>

          {/* Right side grid */}
          <div style={styles.rightGrid}>
            {/* Top row - 3 images */}
            <div style={styles.topRow}>
              {topRowImages.map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.smallImage,
                    transform: hoverIndex === idx + 1 ? 'scale(1.03)' : 'scale(1)'
                  }}
                  onClick={() => onImageClick?.(img, idx + 1)}
                  onMouseEnter={() => setHoverIndex(idx + 1)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <img 
                    src={img} 
                    alt={`${title} ${idx + 2}`}
                    style={styles.img}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/200/160?random=${idx + 1}`;
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom row - 2 images */}
            <div style={styles.bottomRow}>
              {bottomRowImages.map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.bottomImage,
                    flex: idx === 0 ? 1.5 : 1,  // First one wider
                    transform: hoverIndex === idx + 4 ? 'scale(1.03)' : 'scale(1)'
                  }}
                  onClick={() => onImageClick?.(img, idx + 4)}
                  onMouseEnter={() => setHoverIndex(idx + 4)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <img 
                    src={img} 
                    alt={`${title} ${idx + 5}`}
                    style={styles.img}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/200/160?random=${idx + 4}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div style={styles.content}>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.desc}>{description}</p>
        </div>
      </div>
    </div>
  );
}

const GALLERY_HEIGHT = 340;
const GAP = 10;

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 24px',
    background: '#fff',
    borderRadius: '16px',
    maxWidth: '1208px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  // Timeline
  timeline: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto 28px'
  },

  track: {
    position: 'relative',
    height: '50px',
    display: 'flex',
    alignItems: 'center'
  },

  trackBg: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '12px',
    height: '2px',
    background: 'repeating-linear-gradient(to right, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 4px, transparent 4px, transparent 8px)'
  },

  trackActive: {
    position: 'absolute',
    top: '11px',
    height: '3px',
    background: '#000',
    borderRadius: '2px'
  },

  yearMarker: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },

  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#fff',
    border: '2px solid rgba(0,0,0,0.2)',
    transition: 'all 0.3s'
  },

  dotActive: {
    width: '12px',
    height: '12px',
    background: '#000',
    borderColor: '#000'
  },

  yearLabel: {
    fontSize: '13px',
    color: 'rgba(0,0,0,0.4)',
    fontWeight: 400
  },

  yearLabelActive: {
    color: '#000',
    fontWeight: 600
  },

  // Main content
  main: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start'
  },

  // Gallery - left side
  gallery: {
    display: 'flex',
    gap: `${GAP}px`,
    height: `${GALLERY_HEIGHT}px`,
    flex: '1 1 60%',
    maxWidth: '600px'
  },

  // Large vertical image
  largeImage: {
    width: '180px',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    flexShrink: 0,
    background: '#f0f0f0'
  },

  // Right side grid
  rightGrid: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: `${GAP}px`,
    height: '100%'
  },

  // Top row - 3 images
  topRow: {
    display: 'flex',
    gap: `${GAP}px`,
    height: `${(GALLERY_HEIGHT - GAP) / 2}px`
  },

  smallImage: {
    flex: 1,
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    background: '#f0f0f0'
  },

  // Bottom row - 2 images
  bottomRow: {
    display: 'flex',
    gap: `${GAP}px`,
    height: `${(GALLERY_HEIGHT - GAP) / 2}px`
  },

  bottomImage: {
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    background: '#f0f0f0'
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  // Content - right side
  content: {
    flex: '0 0 320px',
    paddingTop: '40px'
  },

  title: {
    fontFamily: "'Libre Baskerville', 'Georgia', serif",
    fontSize: '42px',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.15,
    margin: '0 0 24px 0',
    color: '#000'
  },

  desc: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: 'rgba(0,0,0,0.6)',
    margin: 0
  }
};
