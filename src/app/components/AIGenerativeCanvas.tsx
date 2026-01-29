/**
 * AIGenerativeCanvas - 第9个激进模板
 * 
 * AI 根据查询语义动态生成 Magazine 风格布局
 * 突破现有8个模板框架，实现视觉、布局、交互的全方位创新
 */

import React, { useState, useEffect } from 'react';
import { AITemplateResult } from '../services/templateService';
import { 
  generateCanvasLayout, 
  CanvasLayout, 
  CANVAS
} from './canvas/CanvasLayoutEngine';
import { CanvasCard } from './canvas/CanvasCard';

// ============================================================================
// Types
// ============================================================================

interface AIGenerativeCanvasProps {
  query: string;
  aiResult: AITemplateResult;
  images: string[];
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
}

// ============================================================================
// CSS Keyframes (injected once)
// ============================================================================

const injectKeyframes = () => {
  const styleId = 'canvas-keyframes';
  if (document.getElementById(styleId)) return;
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes canvasSlideIn {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes canvasFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes canvasGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
      50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.5); }
    }
    
    @keyframes canvasPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;
  document.head.appendChild(style);
};

// ============================================================================
// Main Component
// ============================================================================

export function AIGenerativeCanvas({
  query,
  aiResult,
  images,
  onImageClick,
  onQueryClick
}: AIGenerativeCanvasProps) {
  const [layout, setLayout] = useState<CanvasLayout | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Inject keyframes on mount
  useEffect(() => {
    injectKeyframes();
  }, []);
  
  // Generate layout when query changes
  useEffect(() => {
    setIsLoaded(false);
    const newLayout = generateCanvasLayout(query, images.length);
    setLayout(newLayout);
    
    // Trigger loaded state after a small delay for animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [query, images.length]);
  
  // Extract content from aiResult
  const { dynamicContent } = aiResult;
  const { title, description, subItems = [], tags = [] } = dynamicContent;
  
  if (!layout) return null;
  
  // Animation delay calculator based on style
  const getAnimationDelay = (index: number): number => {
    switch (layout.animationStyle) {
      case 'stagger':
        return index * 80;
      case 'cascade':
        return index * 120;
      case 'burst':
        return Math.abs(index - layout.cells.length / 2) * 60;
      case 'wave':
        return Math.sin(index * 0.5) * 100 + index * 50;
      default:
        return index * 80;
    }
  };
  
  // Get background style based on color scheme
  const getBackgroundStyle = (): React.CSSProperties => {
    switch (layout.colorScheme) {
      case 'dark':
        return {
          background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)'
        };
      case 'vibrant':
        return {
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eeff 50%, #f0e6ff 100%)'
        };
      case 'monochrome':
        return {
          background: 'linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)'
        };
      default:
        return {
          background: '#ffffff'
        };
    }
  };

  return (
    <div style={{
      ...getBackgroundStyle(),
      borderRadius: '24px',
      padding: '24px',
      maxWidth: '1208px',
      width: '100%',
      margin: '0 auto',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Header Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.4s ease'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: layout.colorScheme === 'dark' 
            ? 'rgba(255,255,255,0.1)' 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
        }}>
          <span style={{ fontSize: '14px' }}>✨</span>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            color: '#fff',
            letterSpacing: '0.5px'
          }}>
            AI GENERATIVE CANVAS
          </span>
        </div>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          background: layout.colorScheme === 'dark' 
            ? 'rgba(255,255,255,0.05)' 
            : 'rgba(0,0,0,0.05)',
          borderRadius: '12px'
        }}>
          <span style={{ 
            fontSize: '11px', 
            color: layout.colorScheme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
            fontWeight: 500
          }}>
            {layout.style.toUpperCase()} • {layout.cells.length} CELLS
          </span>
        </div>
      </div>
      
      {/* Canvas Container */}
      <div style={{
        position: 'relative',
        width: CANVAS.WIDTH,  // 1160px (已经是去掉padding后的可用宽度)
        height: CANVAS.HEIGHT,  // 400px
        margin: '0 auto',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        {layout.cells.map((cell, index) => {
          // Generate rich content for each cell based on type
          const isHero = cell.type === 'hero';
          const isInfo = cell.type === 'info' || cell.type === 'stats';
          const isList = cell.type === 'list';
          
          // Title generation - more variety
          let cellTitle: string;
          if (isHero) {
            cellTitle = title;
          } else if (isInfo && index < 3) {
            cellTitle = subItems[index] || `About ${title}`;
          } else if (isList) {
            cellTitle = 'Related Topics';
          } else {
            // For gallery items, use subItems as titles
            const galleryIndex = layout.cells.filter((c, i) => i < index && c.type === 'gallery').length;
            cellTitle = subItems[galleryIndex] || subItems[index % subItems.length] || title;
          }
          
          // Description for info cards
          let cellDescription: string | undefined;
          if (isHero) {
            cellDescription = description;
          } else if (isInfo) {
            const descOptions = [
              `Discover the essence of ${title}. A comprehensive look at key characteristics and notable features.`,
              `Learn more about ${title} and explore its rich history and cultural significance.`,
              `An in-depth exploration of ${title}, featuring curated insights and expert perspectives.`
            ];
            cellDescription = descOptions[index % descOptions.length];
          }
          
          // Image - cycle through all available images
          const cellImage = images[index % images.length] || images[0];
          
          // Tags - provide relevant tags for info cards
          const cellTags = isList ? subItems.slice(0, 6) : (isInfo ? tags.slice(0, 4) : tags.slice(0, 2));
          
          return (
            <CanvasCard
              key={cell.id}
              cell={cell}
              image={cellImage}
              title={cellTitle}
              description={cellDescription}
              tags={cellTags}
              index={index}
              colorScheme={layout.colorScheme}
              animationDelay={getAnimationDelay(index)}
              onClick={() => onQueryClick?.(`${query} ${cellTitle}`)}
              onImageClick={(url) => onImageClick?.(url, cellTitle)}
            />
          );
        })}
      </div>
      
    </div>
  );
}

export default AIGenerativeCanvas;

