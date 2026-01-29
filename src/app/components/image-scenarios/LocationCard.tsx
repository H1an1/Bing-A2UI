/**
 * LocationCard - Location/City Template (108:54119)
 * 
 * Figma Design:
 * - Hero image at top
 * - Gradient overlay on hero image fades from transparent to dominant color
 * - Below hero, gradient continues from dominant color to lighter shade
 * - Places section sits on the gradient background
 */

import React, { useState, useEffect, useRef } from 'react';

interface Place {
  name: string;
  image: string;
}

interface LocationCardProps {
  name: string;
  description: string;
  heroImage: string;
  places: Place[];
  className?: string;
  onHeroClick?: () => void;
  onPlaceClick?: (place: Place, index: number) => void;
}

interface ExtractedColors {
  primary: string;
  lighter: string;
  rgb: { r: number; g: number; b: number };
  primaryRgb: { r: number; g: number; b: number };
}

function extractDominantColor(img: HTMLImageElement): ExtractedColors | null {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = 100;
    canvas.height = 30;

    ctx.drawImage(
      img,
      0, img.naturalHeight * 0.85, img.naturalWidth, img.naturalHeight * 0.15,
      0, 0, 100, 30
    );

    const imageData = ctx.getImageData(0, 0, 100, 30).data;
    
    let r = 0, g = 0, b = 0, count = 0;
    
    for (let i = 0; i < imageData.length; i += 4) {
      const brightness = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
      if (brightness > 20 && brightness < 240) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }
    }

    if (count === 0) return null;

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    const lighten = (c: number, amt: number) => Math.min(255, Math.round(c + (255 - c) * amt));
    
    const primaryR = lighten(r, 0.3);
    const primaryG = lighten(g, 0.3);
    const primaryB = lighten(b, 0.3);
    
    return {
      primary: `rgb(${primaryR}, ${primaryG}, ${primaryB})`,
      lighter: `rgb(${lighten(r, 0.55)}, ${lighten(g, 0.55)}, ${lighten(b, 0.55)})`,
      rgb: { r, g, b },
      primaryRgb: { r: primaryR, g: primaryG, b: primaryB }
    };
  } catch {
    return null;
  }
}

function generateFallbackColors(name: string): ExtractedColors {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  // Approximate RGB for HSL(h, 30%, 75%) - a lightened pastel color
  const hNorm = h / 360;
  const s = 0.3;
  const l = 0.75;
  const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const primaryR = Math.round(hueToRgb(p, q, hNorm + 1/3) * 255);
  const primaryG = Math.round(hueToRgb(p, q, hNorm) * 255);
  const primaryB = Math.round(hueToRgb(p, q, hNorm - 1/3) * 255);
  
  return {
    primary: `hsl(${h}, 30%, 75%)`,
    lighter: `hsl(${h}, 25%, 88%)`,
    rgb: { r: 200, g: 180, b: 170 },
    primaryRgb: { r: primaryR, g: primaryG, b: primaryB }
  };
}

export function LocationCard({
  name,
  description,
  heroImage,
  places,
  className = '',
  onHeroClick,
  onPlaceClick
}: LocationCardProps) {
  const [hoverPlace, setHoverPlace] = useState<number | null>(null);
  const [colors, setColors] = useState<ExtractedColors>(() => generateFallbackColors(name));
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setColors(generateFallbackColors(name));
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const extracted = extractDominantColor(img);
      if (extracted) setColors(extracted);
    };

    const separator = heroImage.includes('?') ? '&' : '?';
    img.src = `${heroImage}${separator}t=${Date.now()}`;

    return () => { img.onload = null; };
  }, [heroImage, name]);

  const handleImageLoad = () => {
    if (imgRef.current) {
      try {
        const extracted = extractDominantColor(imgRef.current);
        if (extracted) setColors(extracted);
      } catch { /* CORS */ }
    }
  };

  return (
    <div className={className} style={styles.container}>
      {/* Hero Section with image and gradient overlay */}
      <div style={styles.heroSection}>
        <img 
          ref={imgRef}
          src={heroImage} 
          alt={name}
          style={styles.heroImage}
          onClick={onHeroClick}
          crossOrigin="anonymous"
          onLoad={handleImageLoad}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/1200/400?random=hero';
          }}
        />
        
        {/* Gradient overlay removed - places section now overlays directly on hero */}
        
        {/* Text content */}
        <div style={styles.heroContent}>
          <h1 style={styles.title}>{name}</h1>
          <p style={styles.description}>{description}</p>
        </div>
      </div>

      {/* Places Section - overlays hero image with gradient fading to transparent */}
      <div 
        style={{
          ...styles.placesSection,
          marginTop: '-100px',  // Pull up to overlay on hero image
          position: 'relative',
          zIndex: 2,
          background: `linear-gradient(0deg, rgba(${colors.primaryRgb.r}, ${colors.primaryRgb.g}, ${colors.primaryRgb.b}, 1) 74%, rgba(${colors.primaryRgb.r}, ${colors.primaryRgb.g}, ${colors.primaryRgb.b}, 0) 100%)`
        }}
      >
        {places.slice(0, 5).map((place, index) => (
          <div
            key={index}
            style={{
              ...styles.placeCard,
              transform: hoverPlace === index ? 'translateY(-4px)' : 'translateY(0)'
            }}
            onClick={() => onPlaceClick?.(place, index)}
            onMouseEnter={() => setHoverPlace(index)}
            onMouseLeave={() => setHoverPlace(null)}
          >
            <div style={styles.placeImageWrapper}>
              <img 
                src={place.image} 
                alt={place.name}
                style={{
                  ...styles.placeImage,
                  transform: hoverPlace === index ? 'scale(1.05)' : 'scale(1)'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/200/160?random=${index}`;
                }}
              />
            </div>
            <span style={styles.placeName}>{place.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderRadius: '20px',
    overflow: 'hidden',
    maxWidth: '1208px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  // Hero section
  heroSection: {
    position: 'relative',
    height: '320px'
  },

  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer'
  },

  heroContent: {
    position: 'absolute',
    top: '24px',
    left: '24px',
    right: '24px',
    bottom: '92px', // places overlay 高度 - 8px
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end' // 文字往下对齐，靠近 places 区域
  },

  title: {
    fontSize: '40px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 12px 0',
    textShadow: '0 2px 20px rgba(0,0,0,0.5)'
  },

  description: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.95)',
    margin: 0,
    textShadow: '0 1px 10px rgba(0,0,0,0.4)'
    // 不限制 maxWidth，让文字不换行
  },

  // Places section - overlays hero image with gradient fading to transparent at top
  placesSection: {
    display: 'flex',
    gap: '14px',
    padding: '60px 24px 24px 24px'  // 左右 24px
  },

  placeCard: {
    flex: 1,
    minWidth: 0,
    cursor: 'pointer',
    transition: 'transform 0.25s ease'
  },

  placeImageWrapper: {
    width: '100%',
    height: '140px',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '10px',
    background: 'rgba(255,255,255,0.3)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
  },

  placeImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.35s ease'
  },

  placeName: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.4,
    color: 'rgba(0,0,0,0.85)'
  }
};
