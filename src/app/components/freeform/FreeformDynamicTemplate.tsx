/**
 * Freeform Dynamic Template - AI 完全自由创作
 * 
 * 不受任何预定义组件限制
 * AI 直接生成 HTML/CSS
 */

import React, { useState, useEffect } from 'react';
import { FreeformRenderer } from './FreeformRenderer';
import { FreeformView, generateFreeformView } from '../../services/freeformService';
import { GalleryIcon, WarningIcon } from '../interactive/icons';

// ============================================================================
// Props
// ============================================================================

interface FreeformDynamicTemplateProps {
  query: string;
  images: string[];
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
  showDebugInfo?: boolean;
}

// ============================================================================
// Loading State
// ============================================================================

function LoadingState() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '500px',
      gap: '24px',
      fontFamily: "'Roboto', -apple-system, sans-serif",
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      borderRadius: '16px',
      color: 'white',
    }}>
      {/* Animated Canvas */}
      <div style={{
        position: 'relative',
        width: '120px',
        height: '120px',
      }}>
        {/* Outer ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#8b5cf6',
          borderRadius: '50%',
          animation: 'spin 2s linear infinite',
        }} />
        {/* Middle ring */}
        <div style={{
          position: 'absolute',
          inset: '15px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderBottomColor: '#06b6d4',
          borderRadius: '50%',
          animation: 'spin 1.5s linear infinite reverse',
        }} />
        {/* Inner ring */}
        <div style={{
          position: 'absolute',
          inset: '30px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#f59e0b',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        {/* Center icon */}
        <div style={{
          position: 'absolute',
          inset: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}>
          <GalleryIcon size={24} color="#ffffff" />
        </div>
      </div>
      
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '8px',
          background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          AI Canvas
        </div>
        <div style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)',
        }}>
          Creating something unique for you...
        </div>
      </div>
      
      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>
    </div>
  );
}

// ============================================================================
// Error State
// ============================================================================

function ErrorState({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '16px',
      padding: '32px',
      fontFamily: "'Roboto', sans-serif",
      background: '#fef2f2',
      borderRadius: '16px',
      border: '1px solid #fecaca',
    }}>
      <WarningIcon size={48} color="#dc2626" />
      <div style={{
        fontSize: '18px',
        fontWeight: 600,
        color: '#dc2626',
      }}>
        Creation Failed
      </div>
      <div style={{
        fontSize: '14px',
        color: '#6b7280',
        textAlign: 'center',
        maxWidth: '400px',
      }}>
        {error}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '10px 28px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function FreeformDynamicTemplate({
  query,
  images,
  onImageClick,
  onQueryClick,
  showDebugInfo = false,
}: FreeformDynamicTemplateProps) {
  const [view, setView] = useState<FreeformView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generationTime, setGenerationTime] = useState(0);
  
  // Generate freeform view when query changes
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
      setView(null);
      
      const startTime = Date.now();
      
      try {
        console.log('🎨 FreeformDynamicTemplate: Generating for:', query);
        const result = await generateFreeformView(query, images);
        
        if (isMounted) {
          setView(result);
          setGenerationTime(Date.now() - startTime);
          console.log('🎨 FreeformDynamicTemplate: Done in', Date.now() - startTime, 'ms');
        }
      } catch (err: any) {
        console.error('🎨 FreeformDynamicTemplate: Failed:', err);
        if (isMounted) {
          setError(err?.message || 'Failed to generate freeform view');
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
  }, [query, images]);
  
  // Retry handler
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    generateFreeformView(query, images)
      .then(setView)
      .catch(err => setError(err?.message || 'Retry failed'))
      .finally(() => setIsLoading(false));
  };
  
  // Handle interaction
  const handleInteraction = (action: string, data?: any) => {
    console.log('🎨 Interaction:', action, data);
  };
  
  // Loading
  if (isLoading) {
    return <LoadingState />;
  }
  
  // Error
  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }
  
  // No view
  if (!view) {
    return <ErrorState error="No view generated" onRetry={handleRetry} />;
  }
  
  // Render
  return (
    <div style={{
      width: '100%',
      fontFamily: "'Roboto', -apple-system, sans-serif",
    }}>
      {/* Generation Info Badge */}
      {showDebugInfo && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
          borderRadius: '8px',
          marginBottom: '16px',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
        }}>
          <GalleryIcon size={16} color="white" />
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            color: 'white',
          }}>
            Freeform AI Canvas
          </span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>|</span>
          <span style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.9)',
          }}>
            {generationTime}ms
          </span>
          {view.title && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>|</span>
              <span style={{
                padding: '2px 8px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '4px',
                fontSize: '10px',
                color: 'white',
                fontWeight: 600,
              }}>
                {view.title}
              </span>
            </>
          )}
        </div>
      )}
      
      {/* Main Renderer */}
      <FreeformRenderer
        view={view}
        images={images}
        onInteraction={handleInteraction}
        showDebugInfo={showDebugInfo}
      />
    </div>
  );
}

export default FreeformDynamicTemplate;




