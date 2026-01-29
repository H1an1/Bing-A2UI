/**
 * Mixed Renderer - 渲染混合式动态布局
 * 
 * 根据 blocks 数组渲染各种区块组件
 */

import React, { useMemo } from 'react';
import { DynamicView, Block } from '../catalog/schema';
import {
  createTheme,
  HeroBlock,
  InteractiveListBlock,
  TabsBlock,
  TimelineBlock,
  GalleryBlock,
  StepsBlock,
  ComparisonBlock,
  InfoCardBlock,
  StatsBlock,
  AccordionBlock,
  TextBlock,
  DividerBlock,
} from './blocks';

interface Props {
  view: DynamicView;
  images?: string[];
  onImageClick?: (url: string) => void;
  showDebugInfo?: boolean;
}

export function MixedRenderer({ view, images = [], onImageClick, showDebugInfo = false }: Props) {
  const theme = useMemo(() => {
    const t = view.design?.theme || 'dark';
    const accent = view.design?.accentColor || '#6366f1';
    return createTheme(t, accent);
  }, [view.design]);
  
  // Use query + timestamp as seed for images (to get some variety)
  const seed = useMemo(() => {
    return `${view.understanding?.intent || 'gallery'}-${Date.now() % 1000}`;
  }, [view.understanding?.intent]);
  
  // Log images being used
  console.log('🖼️ [MixedRenderer] Using images:', {
    count: images.length,
    sample: images.slice(0, 3)
  });

  const renderBlock = (block: Block, index: number) => {
    const key = `block-${index}-${block.type}`;
    
    switch (block.type) {
      case 'hero':
        return <HeroBlock key={key} block={block} theme={theme} seed={seed} images={images} />;
        
      case 'interactive-list':
        return <InteractiveListBlock key={key} block={block} theme={theme} seed={seed} images={images} onImageClick={onImageClick} />;
        
      case 'tabs':
        return <TabsBlock key={key} block={block} theme={theme} seed={seed} images={images} onImageClick={onImageClick} />;
        
      case 'timeline':
        return <TimelineBlock key={key} block={block} theme={theme} seed={seed} images={images} onImageClick={onImageClick} />;
        
      case 'gallery':
        return <GalleryBlock key={key} block={block} theme={theme} seed={seed} images={images} onImageClick={onImageClick} />;
        
      case 'steps':
        return <StepsBlock key={key} block={block} theme={theme} seed={seed} images={images} onImageClick={onImageClick} />;
        
      case 'comparison':
        return <ComparisonBlock key={key} block={block} theme={theme} seed={seed} images={images} onImageClick={onImageClick} />;
        
      case 'info-card':
        return <InfoCardBlock key={key} block={block} theme={theme} />;
        
      case 'stats':
        return <StatsBlock key={key} block={block} theme={theme} />;
        
      case 'accordion':
        return <AccordionBlock key={key} block={block} theme={theme} seed={seed} images={images} />;
        
      case 'text':
        return <TextBlock key={key} block={block} theme={theme} />;
        
      case 'divider':
        return <DividerBlock key={key} block={block} theme={theme} />;
        
      default:
        console.warn('Unknown block type:', (block as any).type);
        return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: theme.text,
    }}>
      {/* Debug Info */}
      {showDebugInfo && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          padding: '12px 16px',
          background: 'rgba(0,0,0,0.9)',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '11px',
          fontFamily: 'monospace',
          maxWidth: '280px',
        }}>
          <div style={{ marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>
            <strong>Intent:</strong> {view.understanding?.intent}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Approach:</strong> {view.understanding?.approach}
          </div>
          <div>
            <strong>Blocks ({view.blocks.length}):</strong>
            <div style={{ marginTop: '4px' }}>
              {view.blocks.map((b, i) => (
                <span key={i} style={{ 
                  display: 'inline-block',
                  padding: '2px 6px', 
                  background: theme.accent, 
                  borderRadius: '4px', 
                  margin: '2px',
                  fontSize: '10px',
                }}>
                  {b.type}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Render blocks */}
      {view.blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

export default MixedRenderer;

