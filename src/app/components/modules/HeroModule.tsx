/**
 * HeroModule - 可复用的 Hero 大图模块
 * 
 * 基于 LocationCard 和 EntityDetail 的 Hero 设计
 * 支持多种变体：gradient（渐变）、overlay（叠加）、clean（简洁）
 */

import React, { useState, useEffect, useRef } from 'react';

// 颜色提取工具
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

// ============================================================================
// HeroModule Props
// ============================================================================

export type HeroVariant = 'gradient' | 'overlay' | 'clean' | 'carousel';

export interface HeroModuleProps {
  variant?: HeroVariant;
  title: string;
  description?: string;
  images: string[];
  height?: number;
  onImageClick?: (url: string) => void;
  onTitleClick?: () => void;
}

// ============================================================================
// HeroModule Component
// ============================================================================

export function HeroModule({
  variant = 'gradient',
  title,
  description,
  images,
  height = 320,
  onImageClick,
  onTitleClick
}: HeroModuleProps) {
  const [colors, setColors] = useState<ExtractedColors>(() => generateFallbackColors(title));
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const heroImage = images[currentIndex] || images[0] || '';

  useEffect(() => {
    setColors(generateFallbackColors(title));
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const extracted = extractDominantColor(img);
      if (extracted) setColors(extracted);
    };

    const separator = heroImage.includes('?') ? '&' : '?';
    img.src = `${heroImage}${separator}t=${Date.now()}`;

    return () => { img.onload = null; };
  }, [heroImage, title]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // 渐变变体 - 来自 LocationCard
  if (variant === 'gradient') {
    return (
      <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', width: '100%' }}>
        <div style={{ position: 'relative', height: `${height}px` }}>
          <img 
            ref={imgRef}
            src={heroImage} 
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => onImageClick?.(heroImage)}
            crossOrigin="anonymous"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/1200/400?random=hero';
            }}
          />
          
          {/* 文字内容 */}
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 10 }}>
            <h1 
              style={{
                fontSize: '40px', fontWeight: 700, color: '#fff',
                margin: '0 0 10px 0', textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                cursor: onTitleClick ? 'pointer' : 'default'
              }}
              onClick={onTitleClick}
            >
              {title}
            </h1>
            {description && (
              <p style={{
                fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.95)',
                margin: 0, maxWidth: '800px', textShadow: '0 1px 10px rgba(0,0,0,0.4)'
              }}>
                {description}
              </p>
            )}
          </div>
        </div>
        
        {/* 渐变底部区域 */}
        <div style={{
          marginTop: '-60px',
          height: '60px',
          position: 'relative',
          zIndex: 2,
          background: `linear-gradient(0deg, rgba(${colors.primaryRgb.r}, ${colors.primaryRgb.g}, ${colors.primaryRgb.b}, 1) 50%, rgba(${colors.primaryRgb.r}, ${colors.primaryRgb.g}, ${colors.primaryRgb.b}, 0) 100%)`
        }} />
      </div>
    );
  }

  // 轮播变体 - 来自 EntityDetail
  if (variant === 'carousel') {
    return (
      <div style={{
        position: 'relative',
        height: `${height}px`,
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#f0f0f0',
        width: '100%'
      }}>
        <img 
          src={heroImage} 
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => onImageClick?.(heroImage)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/600/400?random=hero';
          }}
        />
        
        {/* Source 标签 */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px',
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 12px', background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)', borderRadius: '8px',
          fontSize: '12px', color: '#fff'
        }}>
          <span>Source · Image {currentIndex + 1}</span>
        </div>

        {/* 导航按钮 */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: '12px', right: '12px',
            display: 'flex', gap: '4px'
          }}>
            <button onClick={handlePrev} style={navBtnStyle}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={handleNext} style={navBtnStyle}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  // 叠加变体
  if (variant === 'overlay') {
    return (
      <div style={{
        position: 'relative',
        height: `${height}px`,
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%'
      }}>
        <img 
          src={heroImage} 
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => onImageClick?.(heroImage)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/1200/400?random=hero';
          }}
        />
        
        {/* 渐变叠加层 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
        }} />
        
        {/* 文字内容 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '24px', color: 'white'
        }}>
          <h1 
            style={{ 
              margin: 0, fontSize: '28px', fontWeight: 700,
              cursor: onTitleClick ? 'pointer' : 'default'
            }}
            onClick={onTitleClick}
          >
            {title}
          </h1>
          {description && (
            <p style={{ margin: '8px 0 0', fontSize: '14px', opacity: 0.9, maxWidth: '600px' }}>
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 简洁变体
  return (
    <div style={{
      position: 'relative',
      height: `${height}px`,
      borderRadius: '16px',
      overflow: 'hidden',
      width: '100%'
    }}>
      <img 
        src={heroImage} 
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
        onClick={() => onImageClick?.(heroImage)}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://picsum.photos/1200/400?random=hero';
        }}
      />
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  width: '36px', height: '36px', borderRadius: '8px',
  border: 'none', background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(10px)', color: '#fff', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center'
};

export default HeroModule;

