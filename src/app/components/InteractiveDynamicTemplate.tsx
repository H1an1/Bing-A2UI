/**
 * Interactive Dynamic Template
 * 
 * AI 自由组合区块，每次可能不同的组合方式
 */

import React, { useState, useEffect } from 'react';
import { MixedRenderer } from './MixedRenderer';
import { generateDesign } from '../services/interactiveService';
import { DynamicView } from '../catalog/schema';

// ============================================================================
// Loading - 扇形卡牌
// ============================================================================

function CardLoading({ query }: { query: string }) {
  const [activeCard, setActiveCard] = useState(0);
  const [thinking, setThinking] = useState(0);
  const cardCount = 7;
  
  const thoughts = [
    'Understanding your query...',
    'Designing the experience...',
    'Choosing the best blocks...',
    'Creating something unique...',
  ];
  
  useEffect(() => {
    const cardTimer = setInterval(() => setActiveCard(c => (c + 1) % cardCount), 500);
    const thinkTimer = setInterval(() => setThinking(t => (t + 1) % thoughts.length), 1000);
    return () => { clearInterval(cardTimer); clearInterval(thinkTimer); };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--acf-color-back-neutral-primary, #ffffff)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* 扇形卡牌 */}
      <div style={{ position: 'relative', width: '260px', height: '160px', marginBottom: '40px' }}>
        {Array.from({ length: cardCount }, (_, i) => {
          const angle = (i - Math.floor(cardCount / 2)) * 11;
          const isActive = i === activeCard;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '0',
                width: '90px',
                height: '120px',
                borderRadius: 'var(--acf-radius-m, 8px)',
                background: 'var(--acf-color-back-neutral-primary, #ffffff)',
                boxShadow: isActive 
                  ? '0 20px 50px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)'
                  : '0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                transform: `translateX(-50%) rotate(${angle}deg) translateY(${isActive ? -20 : 0}px) scale(${isActive ? 1.08 : 1})`,
                transformOrigin: 'bottom center',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: isActive ? 10 : cardCount - Math.abs(i - activeCard),
                border: '1px solid var(--acf-color-stroke-neutral-subtle, rgba(0,0,0,0.06))',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '10px',
                border: '1px solid var(--acf-color-stroke-neutral-subtle, rgba(0,0,0,0.04))',
                borderRadius: 'var(--acf-radius-s, 4px)',
                background: 'var(--acf-color-back-neutral-secondary, #fafafa)',
              }} />
            </div>
          );
        })}
      </div>
      
      {/* 文字 */}
      <div style={{ textAlign: 'center', color: 'var(--acf-color-fore-neutral-primary, #1a1a1a)' }}>
        <div style={{ fontSize: 'var(--acf-text-body3-size, 14px)', opacity: 0.5, marginBottom: 'var(--acf-spacing-xs, 8px)' }}>
          {thoughts[thinking]}
        </div>
        <div style={{ fontSize: 'var(--acf-text-body2-size, 18px)', fontWeight: 500 }}>
          "{query}"
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 主组件
// ============================================================================

interface Props {
  query: string;
  images?: string[];
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
  showDebugInfo?: boolean;
}

export function InteractiveDynamicTemplate({
  query,
  images,
  onImageClick,
  showDebugInfo = false,
}: Props) {
  const [view, setView] = useState<DynamicView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    async function create() {
      if (!query) {
        setError('No query');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      setView(null);
      
      try {
        const result = await generateDesign(query);
        if (isMounted) {
          console.log('🎨 Generated view:', {
            intent: result.understanding?.intent,
            approach: result.understanding?.approach,
            blocks: result.blocks.map(b => b.type),
          });
          setView(result);
        }
      } catch (err: any) {
        console.error('Design failed:', err);
        if (isMounted) {
          setError(err?.message || 'Failed');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    create();
    return () => { isMounted = false; };
  }, [query]);
  
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    generateDesign(query)
      .then(result => {
        console.log('🎨 Retry generated:', result.blocks.map(b => b.type));
        setView(result);
      })
      .catch(err => setError(err?.message || 'Retry failed'))
      .finally(() => setIsLoading(false));
  };
  
  if (isLoading) {
    return <CardLoading query={query} />;
  }
  
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        background: 'var(--acf-color-back-neutral-primary, #ffffff)',
        color: 'var(--acf-color-fore-neutral-primary, #1a1a1a)',
      }}>
        <div style={{ color: 'var(--acf-color-fore-danger, #d13438)', marginBottom: 'var(--acf-spacing-m, 16px)', fontSize: 'var(--acf-text-body2-size, 16px)' }}>
          {error}
        </div>
        <button
          onClick={handleRetry}
          style={{
            padding: '12px 28px',
            background: 'var(--acf-color-fill-accent-primary, #0078d4)',
            color: 'var(--acf-color-fore-on-accent, white)',
            border: 'none',
            borderRadius: 'var(--acf-radius-m, 10px)',
            cursor: 'pointer',
            fontSize: 'var(--acf-text-body3-size, 15px)',
            fontWeight: 500,
          }}
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (!view) {
    return null;
  }
  
  console.log('🖼️ [InteractiveDynamicTemplate] Passing images to MixedRenderer:', {
    count: images?.length || 0,
    sample: images?.slice(0, 3)
  });
  
  return (
    <MixedRenderer
      view={view}
      images={images}
      onImageClick={url => onImageClick?.(url)}
      showDebugInfo={showDebugInfo}
    />
  );
}

export default InteractiveDynamicTemplate;
