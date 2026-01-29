/**
 * FusedView Component
 * 融合式视图 - 不是简单堆叠，而是有机融合的展示
 * 
 * 核心理念：
 * 1. 图片和文字内容交织展示
 * 2. 上下文流动，不是孤立的块
 * 3. 根据数据自适应布局
 * 4. 交互式探索，点击任何元素都能深入
 */

import React, { useState } from 'react';
import { GoogleSearchResult, GoogleImageResult } from '../services/googleSearchApi';
import { MultiIntentAnalysis } from '../services/intelligentEngine';

interface FusedViewProps {
  query: string;
  analysis: MultiIntentAnalysis;
  images: GoogleImageResult[];
  webResults: GoogleSearchResult[];
  relatedQueries: string[];
  isLoading?: boolean;
  onImageClick?: (image: GoogleImageResult) => void;
  onQueryClick?: (query: string) => void;
  onLinkClick?: (url: string) => void;
}

export function FusedView({
  query,
  analysis,
  images,
  webResults,
  relatedQueries,
  isLoading,
  onImageClick,
  onQueryClick,
  onLinkClick
}: FusedViewProps) {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // 根据意图生成智能标题
  const generateTitle = () => {
    const entity = analysis.entities.find(e => e.type === 'person' || e.type === 'thing');
    const location = analysis.locations[0];
    const period = analysis.timeRange?.period;

    if (entity && period) {
      return `${capitalize(entity.value)}'s ${period}`;
    }
    if (entity && location) {
      return `${capitalize(entity.value)} in ${capitalize(location.name)}`;
    }
    if (location) {
      return `Exploring ${capitalize(location.name)}`;
    }
    if (entity) {
      return capitalize(entity.value);
    }
    return `Results for "${query}"`;
  };

  // 根据意图生成描述
  const generateDescription = () => {
    const webSnippets = webResults.slice(0, 2).map(r => r.snippet).join(' ');
    if (webSnippets.length > 200) {
      return webSnippets.substring(0, 200) + '...';
    }
    return webSnippets || `Explore visual and textual content about ${query}.`;
  };

  // 渲染融合式图片网格
  const renderFusedImageGrid = () => {
    if (images.length === 0) return null;

    // 创建不规则的融合布局
    const gridAreas = images.length >= 6 
      ? `"a a b c" "a a d e" "f g h i"`
      : images.length >= 4
      ? `"a a b" "a a c" "d e f"`
      : `"a b" "c d"`;

    return (
      <div 
        className="fused-image-grid"
        style={{
          display: 'grid',
          gridTemplateAreas: gridAreas,
          gridTemplateColumns: images.length >= 6 ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 140px)',
          gap: '8px',
          marginBottom: '24px'
        }}
      >
        {images.slice(0, 9).map((img, i) => {
          const areaNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
          return (
            <div
              key={i}
              className="fused-image-item"
              style={{
                gridArea: areaNames[i],
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={() => setHoveredImage(i)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => onImageClick?.(img)}
            >
              <img
                src={img.image?.thumbnailLink || img.link}
                alt={img.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                className={hoveredImage === i ? 'scale-105' : ''}
              />
              
              {/* Hover overlay with title */}
              {hoveredImage === i && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    color: 'white'
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.3 }}>
                    {img.title.length > 60 ? img.title.substring(0, 60) + '...' : img.title}
                  </div>
                  <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '2px' }}>
                    {img.displayLink}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // 渲染融合式内容区
  const renderFusedContent = () => {
    if (webResults.length === 0) return null;

    return (
      <div className="fused-content">
        {/* 主要内容卡片 - 融合第一个结果和图片 */}
        <div 
          className="fused-hero-card"
          style={{
            display: 'grid',
            gridTemplateColumns: images.length > 0 ? '1fr 200px' : '1fr',
            gap: '20px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)',
            borderRadius: '16px',
            marginBottom: '20px'
          }}
        >
          <div>
            <h2 style={{ 
              fontSize: '22px', 
              fontWeight: 700, 
              color: '#1a1a2e',
              marginBottom: '8px',
              lineHeight: 1.3
            }}>
              {generateTitle()}
            </h2>
            
            <p style={{ 
              fontSize: '14px', 
              color: '#4a4a6a',
              lineHeight: 1.6,
              marginBottom: '16px'
            }}>
              {generateDescription()}
            </p>

            {/* 实体标签 */}
            {analysis.entities.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                {analysis.entities.map((entity, i) => (
                  <span
                    key={i}
                    onClick={() => onQueryClick?.(entity.value)}
                    style={{
                      padding: '4px 12px',
                      background: 'white',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#5c6bc0',
                      cursor: 'pointer',
                      border: '1px solid #e0e0e0',
                      transition: 'all 0.2s ease'
                    }}
                    className="hover:bg-indigo-50 hover:border-indigo-300"
                  >
                    {entity.type === 'person' ? '👤' : entity.type === 'place' ? '📍' : '🏷️'} {capitalize(entity.value)}
                  </span>
                ))}
              </div>
            )}

            {/* 时间范围指示器 */}
            {analysis.timeRange && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'white',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#666'
              }}>
                <span>⏱️</span>
                <span>{analysis.timeRange.period || `${analysis.timeRange.start} - ${analysis.timeRange.end}`}</span>
              </div>
            )}
          </div>

          {/* 侧边特色图片 */}
          {images.length > 0 && (
            <div 
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => onImageClick?.(images[0])}
            >
              <img
                src={images[0].image?.thumbnailLink || images[0].link}
                alt={images[0].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
        </div>

        {/* 融合式结果列表 - 图文交织 */}
        <div className="fused-results">
          {webResults.slice(0, 4).map((result, i) => (
            <div
              key={i}
              className="fused-result-item hover:shadow-md hover:border-indigo-100"
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '12px',
                background: 'white',
                border: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => onLinkClick?.(result.link)}
            >
              {/* 结果缩略图 */}
              {result.pagemap?.cse_thumbnail?.[0] && (
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img
                    src={result.pagemap.cse_thumbnail[0].src}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#666',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px'
                  }}>
                    🌐
                  </span>
                  {result.displayLink}
                </div>
                
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1a0dab',
                  marginBottom: '6px',
                  lineHeight: 1.3
                }}>
                  {result.title}
                </h3>
                
                <p style={{
                  fontSize: '13px',
                  color: '#545454',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {result.snippet}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染相关搜索 - 流动式标签
  const renderRelatedQueries = () => {
    if (relatedQueries.length === 0) return null;

    return (
      <div 
        className="fused-related"
        style={{
          marginTop: '24px',
          padding: '20px',
          background: '#fafafa',
          borderRadius: '16px'
        }}
      >
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 600, 
          color: '#333',
          marginBottom: '12px'
        }}>
          Related searches
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {relatedQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => onQueryClick?.(q)}
              style={{
                padding: '8px 16px',
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                fontSize: '13px',
                color: '#1a73e8',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="hover:bg-blue-50 hover:border-blue-300"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="fused-view-loading">
        <div style={{
          display: 'grid',
          gridTemplateAreas: `"a a b c" "a a d e"`,
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 140px)',
          gap: '8px',
          marginBottom: '24px'
        }}>
          {['a', 'b', 'c', 'd', 'e'].map((area, i) => (
            <div
              key={i}
              style={{
                gridArea: area,
                borderRadius: '12px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
              }}
            />
          ))}
        </div>
        
        <div style={{
          padding: '20px',
          background: '#f8f8f8',
          borderRadius: '16px'
        }}>
          <div style={{ height: '24px', width: '60%', background: '#e0e0e0', borderRadius: '4px', marginBottom: '12px' }} />
          <div style={{ height: '16px', width: '100%', background: '#e8e8e8', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ height: '16px', width: '80%', background: '#e8e8e8', borderRadius: '4px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="fused-view">
      {/* 融合式图片网格 */}
      {renderFusedImageGrid()}
      
      {/* 融合式内容区 */}
      {renderFusedContent()}
      
      {/* 相关搜索 */}
      {renderRelatedQueries()}
    </div>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

