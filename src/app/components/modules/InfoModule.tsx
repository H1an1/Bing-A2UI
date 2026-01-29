/**
 * InfoModule - 可复用的信息卡片模块
 * 
 * 基于 EntityDetail 的信息卡片设计
 * 支持多种变体：card（卡片）、inline（内联）、sidebar（侧边栏）
 */

import React from 'react';

// ============================================================================
// Types
// ============================================================================

export type InfoVariant = 'card' | 'inline' | 'sidebar' | 'overlay';

export interface InfoSource {
  name: string;
  icon?: string;
}

export interface InfoModuleProps {
  variant?: InfoVariant;
  title: string;
  description: string;
  sources?: InfoSource[];
  tags?: string[];
  onTitleClick?: () => void;
  onTagClick?: (tag: string) => void;
  fillHeight?: boolean; // 是否填满父容器高度
}

// ============================================================================
// InfoModule Component
// ============================================================================

export function InfoModule({
  variant = 'card',
  title,
  description,
  sources = [],
  tags = [],
  onTitleClick,
  onTagClick,
  fillHeight = false
}: InfoModuleProps) {
  // 卡片变体 - 来自 EntityDetail
  if (variant === 'card') {
    return (
      <div style={{
        padding: '16px 20px',
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: fillHeight ? '100%' : 'auto',
        boxSizing: 'border-box'
      }}>
        <h2 
          style={{
            fontSize: '16px', fontWeight: 600, margin: '0 0 10px 0', color: '#000',
            cursor: onTitleClick ? 'pointer' : 'default'
          }}
          onClick={onTitleClick}
        >
          {title}
        </h2>
        
        <p style={{
          fontSize: '13px', lineHeight: 1.65, color: 'rgba(0,0,0,0.65)',
          margin: 0, flex: 1, overflow: 'hidden',
          display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'
        }}>
          {description}
        </p>

        {/* Sources */}
        {sources.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[0, 1].slice(0, sources.length).map((i) => (
                <div key={i} style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  border: '2px solid #fff',
                  background: i === 0 ? '#4285f4' : '#34a853',
                  marginLeft: i > 0 ? '-8px' : 0,
                  zIndex: 2 - i,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="white">
                    <circle cx="10" cy="10" r="8"/>
                  </svg>
                </div>
              ))}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              marginLeft: '12px', padding: '5px 12px',
              background: '#f5f5f5', borderRadius: '14px',
              fontSize: '12px', color: 'rgba(0,0,0,0.6)', fontWeight: 500
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3.5V6M6 6V8.5M6 6H3.5M6 6H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>{sources.length} Sources</span>
            </div>
          </div>
        )}

        {/* Tags - 如果 fillHeight 则推到底部 */}
        {tags.length > 0 && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px', 
            marginTop: fillHeight ? 'auto' : '12px',
            paddingTop: fillHeight ? '16px' : '0'
          }}>
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => onTagClick?.(tag)}
                style={{
                  padding: '6px 12px', borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.12)', background: 'transparent',
                  fontSize: '12px', color: 'rgba(0,0,0,0.7)', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 内联变体 - 更紧凑
  if (variant === 'inline') {
    return (
      <div style={{ padding: '16px 0', width: '100%' }}>
        <h3 
          style={{
            fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0', color: '#000',
            cursor: onTitleClick ? 'pointer' : 'default'
          }}
          onClick={onTitleClick}
        >
          {title}
        </h3>
        <p style={{
          fontSize: '14px', lineHeight: 1.7, color: 'rgba(0,0,0,0.6)', margin: 0
        }}>
          {description}
        </p>
        
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => onTagClick?.(tag)}
                style={{
                  padding: '6px 12px', borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.12)', background: '#f5f5f5',
                  fontSize: '13px', color: 'rgba(0,0,0,0.7)', cursor: 'pointer'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 侧边栏变体 - 来自 TimelineGallery
  if (variant === 'sidebar') {
    // 根据标题长度动态调整字体大小
    const titleLength = title.length;
    const fontSize = titleLength > 40 ? '24px' : titleLength > 25 ? '28px' : '32px';
    
    return (
      <div style={{ paddingTop: '20px', maxWidth: '260px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2 style={{
          fontFamily: '"Libre Baskerville", Georgia, serif',
          fontSize: fontSize,
          fontWeight: 400, 
          fontStyle: 'italic',
          lineHeight: 1.3, 
          margin: '0 0 16px 0', 
          color: '#000',
          letterSpacing: '-0.3px',
          wordWrap: 'break-word'
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: '13px', lineHeight: 1.65, color: 'rgba(0,0,0,0.6)', margin: '0 0 20px 0'
        }}>
          {description}
        </p>
        
        {/* 标签区域 - 填充左下角空白 */}
        {tags.length > 0 && (
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: 600, 
              color: 'rgba(0,0,0,0.4)', 
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Related Topics
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {tags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => onTagClick?.(tag)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.12)',
                    background: '#f8f8f8',
                    fontSize: '12px',
                    color: 'rgba(0,0,0,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* 来源信息 */}
        {sources.length > 0 && (
          <div style={{ marginTop: tags.length > 0 ? '16px' : 'auto', paddingTop: tags.length > 0 ? '0' : '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex' }}>
                {sources.slice(0, 2).map((source, i) => (
                  <div key={i} style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: i === 0 ? '#4285f4' : '#34a853',
                    marginLeft: i > 0 ? '-6px' : 0,
                    border: '2px solid #fff',
                    zIndex: 2 - i
                  }} />
                ))}
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.5)' }}>
                {sources.map(s => s.name).join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 叠加变体 - 透明背景
  if (variant === 'overlay') {
    return (
      <div style={{
        padding: '20px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%'
      }}>
        <h3 
          style={{
            fontSize: '18px', fontWeight: 600, margin: '0 0 10px 0', color: '#000',
            cursor: onTitleClick ? 'pointer' : 'default'
          }}
          onClick={onTitleClick}
        >
          {title}
        </h3>
        <p style={{
          fontSize: '14px', lineHeight: 1.65, color: 'rgba(0,0,0,0.65)', margin: 0
        }}>
          {description}
        </p>
      </div>
    );
  }

  return null;
}

export default InfoModule;

