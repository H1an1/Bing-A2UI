/**
 * SemanticA2UITemplate - 第10个模板
 * 
 * 将 Semantic A2UI 系统集成到模板系统中
 * - 调用 AI 生成语义化 UI 描述
 * - 使用 SemanticRenderer 渲染
 * - 显示验证和调试信息
 */

import React, { useState, useEffect } from 'react';
import { SemanticRenderer } from './semantic/SemanticRenderer';
import { SemanticA2UIDescriptor } from './semantic/types';
import { generateSemanticA2UI } from '../services/semanticA2UIService';

// ============================================================================
// Props
// ============================================================================

interface SemanticA2UITemplateProps {
  query: string;
  images: string[];
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
  showDebugInfo?: boolean;
}

// ============================================================================
// Loading State Component
// ============================================================================

function LoadingState() {
  return (
    <div
      style={{
        maxWidth: '1208px',
        margin: '0 auto',
        padding: 'var(--acf-spacing-xl)',
        background: 'var(--acf-color-back-neutral-primary)',
        borderRadius: 'var(--acf-radius-xl)',
        boxShadow: 'var(--acf-elevation-1)',
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--acf-spacing-xs)',
          padding: 'var(--acf-spacing-xs) var(--acf-spacing-m)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 'var(--acf-radius-m)',
          marginBottom: 'var(--acf-spacing-l)',
        }}
      >
        <span style={{ animation: 'pulse 1.5s infinite' }}>🎨</span>
        <span
          style={{
            fontSize: 'var(--acf-text-caption1-size)',
            fontWeight: 'var(--acf-font-weight-bold)',
            color: 'white',
          }}
        >
          Semantic A2UI - Generating...
        </span>
      </div>

      {/* Skeleton Loader */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--acf-spacing-l)' }}>
        {/* Hero Skeleton */}
        <div
          style={{
            height: '300px',
            borderRadius: 'var(--acf-radius-l)',
            background: 'linear-gradient(90deg, var(--acf-color-back-neutral-secondary) 25%, var(--acf-color-back-accent-primary) 50%, var(--acf-color-back-neutral-secondary) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
        
        {/* Content Skeleton */}
        <div style={{ display: 'flex', gap: 'var(--acf-spacing-l)' }}>
          <div
            style={{
              flex: 2,
              height: '150px',
              borderRadius: 'var(--acf-radius-m)',
              background: 'var(--acf-color-back-neutral-secondary)',
            }}
          />
          <div
            style={{
              flex: 1,
              height: '150px',
              borderRadius: 'var(--acf-radius-m)',
              background: 'var(--acf-color-back-neutral-secondary)',
            }}
          />
        </div>

        {/* Tags Skeleton */}
        <div style={{ display: 'flex', gap: 'var(--acf-spacing-xs)' }}>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              style={{
                width: '80px',
                height: '32px',
                borderRadius: 'var(--acf-radius-infinite)',
                background: 'var(--acf-color-back-neutral-secondary)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// Error State Component
// ============================================================================

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div
      style={{
        maxWidth: '1208px',
        margin: '0 auto',
        padding: 'var(--acf-spacing-xl)',
        background: 'var(--acf-color-back-neutral-primary)',
        borderRadius: 'var(--acf-radius-xl)',
        boxShadow: 'var(--acf-elevation-1)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: 'var(--acf-spacing-l)' }}>⚠️</div>
      <h3
        style={{
          margin: '0 0 var(--acf-spacing-m)',
          fontSize: 'var(--acf-text-title2-size)',
          fontWeight: 'var(--acf-font-weight-bold)',
          color: 'var(--acf-color-fore-neutral-primary)',
        }}
      >
        Generation Error
      </h3>
      <p
        style={{
          margin: '0 0 var(--acf-spacing-l)',
          fontSize: 'var(--acf-text-body3-size)',
          color: 'var(--acf-color-fore-neutral-tertiary)',
        }}
      >
        {error}
      </p>
      <button
        onClick={onRetry}
        style={{
          padding: 'var(--acf-spacing-s) var(--acf-spacing-xl)',
          background: 'var(--acf-color-fill-accent-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--acf-radius-m)',
          fontSize: 'var(--acf-text-body3-size)',
          fontWeight: 'var(--acf-font-weight-medium)',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function SemanticA2UITemplate({
  query,
  images,
  onImageClick,
  onQueryClick,
  showDebugInfo = false,
}: SemanticA2UITemplateProps) {
  const [descriptor, setDescriptor] = useState<SemanticA2UIDescriptor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generationTime, setGenerationTime] = useState<number>(0);

  // Generate UI when query changes
  useEffect(() => {
    let isMounted = true;
    
    async function generate() {
      if (!query) {
        setError('No query provided');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      const startTime = Date.now();
      
      try {
        console.log('🎨 SemanticA2UITemplate: Generating for query:', query);
        const result = await generateSemanticA2UI(query);
        
        if (isMounted && result) {
          setDescriptor(result);
          setGenerationTime(Date.now() - startTime);
          console.log('🎨 SemanticA2UITemplate: Generation complete in', Date.now() - startTime, 'ms');
          console.log('🎨 SemanticA2UITemplate: Result:', JSON.stringify(result.intent));
        } else if (isMounted) {
          setError('AI returned empty result');
        }
      } catch (err: any) {
        console.error('🎨 SemanticA2UITemplate: Generation failed:', err);
        if (isMounted) {
          setError(err?.message || 'AI generation failed');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    generate();
    
    return () => {
      isMounted = false;
    };
  }, [query]);

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={() => {
          setError(null);
          setIsLoading(true);
          generateSemanticA2UI(query)
            .then(setDescriptor)
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
        }}
      />
    );
  }

  // No descriptor
  if (!descriptor) {
    return <LoadingState />;
  }

  return (
    <div
      style={{
        maxWidth: '1208px',
        margin: '0 auto',
        fontFamily: "var(--acf-font-family, 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      }}
    >
      {/* Generation Info Badge */}
      {showDebugInfo && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--acf-spacing-xs)',
            padding: 'var(--acf-spacing-xs) var(--acf-spacing-m)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 'var(--acf-radius-m)',
            marginBottom: 'var(--acf-spacing-m)',
            boxShadow: 'var(--acf-elevation-2)',
          }}
        >
          <span>🎨</span>
          <span
            style={{
              fontSize: 'var(--acf-text-caption1-size)',
              fontWeight: 'var(--acf-font-weight-bold)',
              color: 'white',
            }}
          >
            Semantic A2UI
          </span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>|</span>
          <span
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {generationTime}ms
          </span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>|</span>
          <span
            style={{
              padding: '2px 8px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 'var(--acf-radius-s)',
              fontSize: '10px',
              color: 'white',
              fontWeight: 'var(--acf-font-weight-bold)',
            }}
          >
            {descriptor.intent.primary.toUpperCase()}
          </span>
          <span
            style={{
              padding: '2px 8px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 'var(--acf-radius-s)',
              fontSize: '10px',
              color: 'white',
            }}
          >
            {descriptor.intent.mood}
          </span>
        </div>
      )}

      {/* Main Renderer */}
      <SemanticRenderer
        descriptor={descriptor}
        images={images}
        onImageClick={onImageClick}
        onQueryClick={onQueryClick}
        showDebugInfo={showDebugInfo}
      />
    </div>
  );
}

export default SemanticA2UITemplate;

