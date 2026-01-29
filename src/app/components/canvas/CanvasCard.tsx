/**
 * CanvasCard - 激进风格的画布卡片组件
 * 
 * 使用 ACF tokens 但组合更大胆：
 * - 渐变背景、混合圆角、多层阴影
 * - 激进的 hover 效果和过渡动画
 */

import React, { useState } from 'react';
import { CanvasCell, getCellPixelDimensions, getCellPosition } from './CanvasLayoutEngine';

// ============================================================================
// Types
// ============================================================================

export interface CanvasCardProps {
  cell: CanvasCell;
  image?: string;
  title?: string;
  description?: string;
  tags?: string[];
  index: number;
  colorScheme: 'light' | 'dark' | 'vibrant' | 'monochrome';
  animationDelay?: number;
  onClick?: () => void;
  onImageClick?: (url: string) => void;
}

// ============================================================================
// Style Generators (using ACF tokens philosophy)
// ============================================================================

const getColorSchemeStyles = (scheme: CanvasCardProps['colorScheme'], isHero: boolean) => {
  switch (scheme) {
    case 'dark':
      return {
        background: isHero 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(180deg, #1f1f1f 0%, #2d2d2d 100%)',
        textColor: '#ffffff',
        secondaryText: 'rgba(255,255,255,0.7)',
        accent: '#e94560',
        border: 'rgba(255,255,255,0.1)'
      };
    case 'vibrant':
      return {
        background: isHero
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)',
        textColor: isHero ? '#ffffff' : '#1a1a2e',
        secondaryText: isHero ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.6)',
        accent: '#667eea',
        border: 'rgba(102,126,234,0.2)'
      };
    case 'monochrome':
      return {
        background: isHero
          ? 'linear-gradient(180deg, #2c3e50 0%, #1a1a1a 100%)'
          : '#ffffff',
        textColor: isHero ? '#ffffff' : '#000000',
        secondaryText: isHero ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
        accent: '#3498db',
        border: 'rgba(0,0,0,0.08)'
      };
    default: // light
      return {
        background: isHero
          ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          : '#ffffff',
        textColor: '#000000',
        secondaryText: 'rgba(0,0,0,0.6)',
        accent: '#0078d4',
        border: 'rgba(0,0,0,0.08)'
      };
  }
};

// ============================================================================
// Sub-Components
// ============================================================================

// Hero Card - 大型主视觉卡片
function HeroCard({ 
  cell, image, title, description, colorScheme, animationDelay, onClick, onImageClick 
}: CanvasCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = getCellPixelDimensions(cell);
  const position = getCellPosition(cell);
  const colors = getColorSchemeStyles(colorScheme, true);
  
  const isCinematic = cell.variant === 'cinematic' || cell.variant === 'cinematic-wide';
  const isImmersive = cell.variant === 'immersive';
  
  return (
    <div
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: isCinematic ? '0' : isImmersive ? '24px' : '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: isHovered 
          ? '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)' 
          : '0 8px 32px rgba(0,0,0,0.15)',
        zIndex: isHovered ? 10 : 1,
        animation: `canvasSlideIn 0.6s ease-out ${animationDelay}ms both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => image && onImageClick?.(image)}
    >
      {/* Background Image */}
      {image && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.6s ease-out',
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
        }} />
      )}
      
      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isCinematic
          ? 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)'
          : 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)',
        opacity: isHovered ? 0.9 : 1,
        transition: 'opacity 0.3s ease'
      }} />
      
      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: isCinematic ? '32px 40px' : '24px',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.3s ease'
      }}>
        {title && (
          <h2 style={{
            margin: 0,
            fontSize: isCinematic ? '36px' : dimensions.width > 400 ? '28px' : '22px',
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            lineHeight: 1.2,
            letterSpacing: '-0.5px'
          }}>
            {title}
          </h2>
        )}
        {description && (
          <p style={{
            margin: '12px 0 0',
            fontSize: '15px',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.5,
            maxWidth: '600px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {description}
          </p>
        )}
      </div>
      
      {/* Hover Glow Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }} />
    </div>
  );
}

// Gallery Card - 图片展示卡片
function GalleryCard({
  cell, image, title, colorScheme, animationDelay, onImageClick
}: CanvasCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = getCellPixelDimensions(cell);
  const position = getCellPosition(cell);
  
  const isTile = cell.variant === 'tile';
  const isPoster = cell.variant === 'poster';
  const isMini = cell.variant === 'mini';
  
  return (
    <div
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: isMini ? '6px' : isPoster ? '12px' : isTile ? '10px' : '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: isHovered 
          ? '0 12px 32px rgba(0,0,0,0.2)' 
          : '0 4px 12px rgba(0,0,0,0.08)',
        animation: `canvasSlideIn 0.5s ease-out ${animationDelay}ms both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => image && onImageClick?.(image)}
    >
      {image && (
        <img
          src={image}
          alt={title || 'Gallery image'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.4s ease-out'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/${Math.round(dimensions.width)}/${Math.round(dimensions.height)}?random=${cell.id}`;
          }}
        />
      )}
      
      {/* Always show title overlay on gallery cards (except mini) */}
      {!isMini && title && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: isTile ? '8px 10px' : '12px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
          opacity: isPoster && !isHovered ? 0 : 1,
          transform: isPoster ? (isHovered ? 'translateY(0)' : 'translateY(100%)') : 'translateY(0)',
          transition: 'all 0.3s ease'
        }}>
          <span style={{ 
            color: '#fff', 
            fontSize: isTile ? '11px' : '13px', 
            fontWeight: 600,
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {title}
          </span>
        </div>
      )}
      
      {/* Mini variant - subtle gradient */}
      {isMini && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.4) 100%)',
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease'
        }} />
      )}
    </div>
  );
}

// Info Card - 信息展示卡片
function InfoCard({
  cell, title, description, tags, colorScheme, animationDelay, onClick
}: CanvasCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = getCellPixelDimensions(cell);
  const position = getCellPosition(cell);
  const colors = getColorSchemeStyles(colorScheme, false);
  
  const isCompact = cell.variant === 'compact';
  const isStats = cell.variant === 'stats';
  const isDivider = cell.variant === 'divider';
  const isSmall = dimensions.width < 150 || dimensions.height < 150;
  
  if (isDivider) {
    return (
      <div
        style={{
          position: 'absolute',
          left: position.left,
          top: position.top,
          width: dimensions.width,
          height: dimensions.height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          animation: `canvasSlideIn 0.5s ease-out ${animationDelay}ms both`
        }}
      >
        <span style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#fff',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          VS
        </span>
      </div>
    );
  }
  
  // Stats variant - show numbers/metrics
  if (isStats) {
    const stats = [
      { label: 'Views', value: '2.4M' },
      { label: 'Likes', value: '45K' },
      { label: 'Saves', value: '12K' }
    ];
    
    return (
      <div
        style={{
          position: 'absolute',
          left: position.left,
          top: position.top,
          width: dimensions.width,
          height: dimensions.height,
          borderRadius: '12px',
          overflow: 'hidden',
          background: colors.background,
          border: `1px solid ${colors.border}`,
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
          animation: `canvasSlideIn 0.5s ease-out ${animationDelay}ms both`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ padding: '12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <h4 style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: colors.secondaryText, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Stats
          </h4>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: colors.secondaryText }}>{stat.label}</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: colors.accent }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: isSmall ? '10px' : '14px',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        boxShadow: isHovered 
          ? '0 10px 28px rgba(0,0,0,0.12)' 
          : '0 2px 8px rgba(0,0,0,0.05)',
        animation: `canvasSlideIn 0.5s ease-out ${animationDelay}ms both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={{ 
        padding: isCompact || isSmall ? '10px' : '14px', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {title && (
          <h3 style={{
            margin: 0,
            fontSize: isSmall ? '12px' : isCompact ? '13px' : '15px',
            fontWeight: 700,
            color: colors.textColor,
            lineHeight: 1.25,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h3>
        )}
        
        {description && !isSmall && (
          <p style={{
            margin: '6px 0 0',
            fontSize: '12px',
            color: colors.secondaryText,
            lineHeight: 1.45,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: isCompact ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {description}
          </p>
        )}
        
        {tags && tags.length > 0 && !isSmall && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '4px', 
            marginTop: 'auto',
            paddingTop: '8px'
          }}>
            {tags.slice(0, isCompact ? 2 : 3).map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '3px 8px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: colors.accent,
                  background: `${colors.accent}12`,
                  borderRadius: '10px'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Feature Card - 特色宽卡片
function FeatureCard({
  cell, image, title, description, colorScheme, animationDelay, onImageClick
}: CanvasCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = getCellPixelDimensions(cell);
  const position = getCellPosition(cell);
  const colors = getColorSchemeStyles(colorScheme, false);
  
  const isWide = cell.variant === 'wide' || cell.variant === 'banner';
  
  return (
    <div
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: isWide ? 'row' : 'column',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        boxShadow: isHovered 
          ? '0 12px 32px rgba(0,0,0,0.12)' 
          : '0 2px 8px rgba(0,0,0,0.05)',
        animation: `canvasSlideIn 0.6s ease-out ${animationDelay}ms both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => image && onImageClick?.(image)}
    >
      {/* Image Section */}
      {image && (
        <div style={{
          width: isWide ? '40%' : '100%',
          height: isWide ? '100%' : '60%',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          <img
            src={image}
            alt={title || 'Feature'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s ease'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/400/200?random=${cell.id}`;
            }}
          />
        </div>
      )}
      
      {/* Content Section */}
      <div style={{
        flex: 1,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {title && (
          <h3 style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 700,
            color: colors.textColor
          }}>
            {title}
          </h3>
        )}
        {description && (
          <p style={{
            margin: '8px 0 0',
            fontSize: '13px',
            color: colors.secondaryText,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

// List Card - 列表卡片
function ListCard({
  cell, title, tags, colorScheme, animationDelay, onClick
}: CanvasCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = getCellPixelDimensions(cell);
  const position = getCellPosition(cell);
  const colors = getColorSchemeStyles(colorScheme, false);
  
  const isVertical = cell.variant === 'vertical';
  const isCompact = cell.variant === 'compact' || dimensions.width < 120;
  const isNarrow = dimensions.width < 150;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: isNarrow ? '10px' : '14px',
        overflow: 'hidden',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        boxShadow: isHovered 
          ? '0 8px 24px rgba(0,0,0,0.1)' 
          : '0 2px 8px rgba(0,0,0,0.05)',
        animation: `canvasSlideIn 0.5s ease-out ${animationDelay}ms both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ 
        padding: isNarrow ? '10px 8px' : '12px', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {title && !isCompact && (
          <h4 style={{
            margin: '0 0 8px',
            fontSize: isNarrow ? '10px' : '11px',
            fontWeight: 700,
            color: colors.secondaryText,
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            {title}
          </h4>
        )}
        
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          gap: isNarrow ? '4px' : '6px',
          overflow: 'hidden'
        }}>
          {tags?.slice(0, isVertical ? 8 : isNarrow ? 5 : 4).map((tag, i) => (
            <div
              key={i}
              style={{
                padding: isNarrow ? '5px 6px' : '6px 10px',
                fontSize: isNarrow ? '10px' : '12px',
                fontWeight: 500,
                color: colors.textColor,
                background: `${colors.accent}08`,
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              onClick={() => onClick?.()}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main CanvasCard Component
// ============================================================================

export function CanvasCard(props: CanvasCardProps) {
  const { cell } = props;
  
  switch (cell.type) {
    case 'hero':
      return <HeroCard {...props} />;
    case 'gallery':
      return <GalleryCard {...props} />;
    case 'info':
      return <InfoCard {...props} />;
    case 'feature':
      return <FeatureCard {...props} />;
    case 'list':
      return <ListCard {...props} />;
    case 'stats':
      return <InfoCard {...props} />;
    default:
      return <GalleryCard {...props} />;
  }
}

export default CanvasCard;

