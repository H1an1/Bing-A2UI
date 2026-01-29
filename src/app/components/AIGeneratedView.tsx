/**
 * AIGeneratedView - 真正的 A2UI 渲染器
 * 
 * 核心理念：AI 生成的 UI 结构直接渲染，不是选择预定义组件
 * AI 输出什么，就渲染什么
 * 
 * AI 生成的结构：
 * {
 *   layout: 'stacked' | 'grid' | 'split' | ...
 *   components: [
 *     {
 *       type: 'gallery' | 'card' | 'list' | 'timeline' | ...
 *       content: { title, description, items: [...] }
 *     }
 *   ]
 * }
 */

import React from 'react';
import { GeneratedUIStructure } from '../services/openaiService';
import { GoogleImageResult } from '../services/googleSearchApi';

interface AIGeneratedViewProps {
  generatedUI: GeneratedUIStructure;
  images: GoogleImageResult[];
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
}

export function AIGeneratedView({ 
  generatedUI, 
  images,
  onImageClick,
  onQueryClick 
}: AIGeneratedViewProps) {
  
  // 根据 imageQuery 获取图片
  const getImageForQuery = (imageQuery: string, index: number): string => {
    // 尝试从搜索结果中找到匹配的图片
    if (images && images.length > 0) {
      const imgIndex = index % images.length;
      return images[imgIndex]?.image?.thumbnailLink || 
             images[imgIndex]?.link ||
             `https://source.unsplash.com/400x300/?${encodeURIComponent(imageQuery)}&sig=${index}`;
    }
    return `https://source.unsplash.com/400x300/?${encodeURIComponent(imageQuery)}&sig=${index}`;
  };

  // 渲染单个 AI 生成的组件
  const renderAIComponent = (component: GeneratedUIStructure['components'][0], compIndex: number) => {
    const { type, content, position, size } = component;
    
    // 根据 AI 指定的类型动态渲染
    // 这里不是选择预定义组件，而是根据 AI 的指令直接构建 UI
    
    return (
      <div 
        key={compIndex}
        className={`ai-component ai-component--${type.toLowerCase()} ai-component--${position} ai-component--${size}`}
        style={{
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          marginBottom: '24px',
          animation: `slideUp 0.5s ease-out ${compIndex * 0.1}s both`
        }}
      >
        {/* AI 生成的标题区域 */}
        <div style={{
          padding: '24px 24px 16px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <span style={{
              padding: '4px 12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {type}
            </span>
            <span style={{
              fontSize: '11px',
              color: '#888',
              background: '#f5f5f5',
              padding: '4px 10px',
              borderRadius: '10px'
            }}>
              AI Generated
            </span>
          </div>
          
          <h2 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#1a1a2e',
            margin: 0,
            lineHeight: 1.3
          }}>
            {content.title}
          </h2>
          
          {content.subtitle && (
            <div style={{
              fontSize: '14px',
              color: '#666',
              marginTop: '4px'
            }}>
              {content.subtitle}
            </div>
          )}
          
          {content.description && (
            <p style={{
              fontSize: '14px',
              color: '#555',
              marginTop: '12px',
              lineHeight: 1.6,
              maxWidth: '800px'
            }}>
              {content.description}
            </p>
          )}
        </div>

        {/* AI 生成的内容区域 - 根据 items 动态渲染 */}
        {content.items && content.items.length > 0 && (
          <div style={{ padding: '20px' }}>
            {/* 根据组件类型选择不同的布局 */}
            {renderItemsLayout(type, content.items, compIndex)}
          </div>
        )}

        {/* 组件特定配置渲染 */}
        {content.config && Object.keys(content.config).length > 0 && (
          <div style={{
            padding: '16px 24px',
            background: '#fafafa',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {Object.entries(content.config).map(([key, value]) => (
              <div key={key} style={{
                fontSize: '12px',
                color: '#666'
              }}>
                <span style={{ fontWeight: 600 }}>{key}:</span>{' '}
                <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 根据组件类型渲染 items 的不同布局
  const renderItemsLayout = (
    type: string, 
    items: NonNullable<GeneratedUIStructure['components'][0]['content']['items']>,
    compIndex: number
  ) => {
    const typeLC = type.toLowerCase();
    
    // Timeline 类型 - 时间轴布局
    if (typeLC.includes('timeline') || typeLC.includes('gallery')) {
      return (
        <div>
          {/* 时间轴 */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            overflowX: 'auto',
            padding: '4px 0'
          }}>
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => onQueryClick?.(item.title)}
                style={{
                  padding: '8px 16px',
                  background: i === 0 ? '#1a73e8' : '#f0f0f0',
                  color: i === 0 ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {item.title}
                {item.metadata?.year && (
                  <span style={{ opacity: 0.7, marginLeft: '6px' }}>
                    ({item.metadata.year})
                  </span>
                )}
              </button>
            ))}
          </div>
          
          {/* 图片网格 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {items.map((item, i) => (
              <div
                key={item.id}
                onClick={() => onImageClick?.(getImageForQuery(item.imageQuery, compIndex * 10 + i), item.title)}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '4/3'
                }}
              >
                <img
                  src={getImageForQuery(item.imageQuery, compIndex * 10 + i)}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.title)}`;
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.title}</div>
                  {item.description && (
                    <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>
                      {item.description.slice(0, 60)}...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Step 类型 - 步骤布局
    if (typeLC.includes('step') || typeLC.includes('guide') || typeLC.includes('tutorial')) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                background: '#f8f9fa',
                borderRadius: '12px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '16px',
                flexShrink: 0
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>
                  {item.title}
                </h4>
                {item.description && (
                  <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                )}
                {item.metadata?.duration && (
                  <span style={{
                    display: 'inline-block',
                    marginTop: '8px',
                    padding: '4px 10px',
                    background: '#e8f0fe',
                    color: '#1a73e8',
                    borderRadius: '10px',
                    fontSize: '12px'
                  }}>
                    ⏱️ {item.metadata.duration}
                  </span>
                )}
              </div>
              <img
                src={getImageForQuery(item.imageQuery, compIndex * 10 + i)}
                alt={item.title}
                style={{
                  width: '120px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => onImageClick?.(getImageForQuery(item.imageQuery, compIndex * 10 + i), item.title)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/120x80?text=${i + 1}`;
                }}
              />
            </div>
          ))}
        </div>
      );
    }
    
    // Location 类型 - 地点卡片布局
    if (typeLC.includes('location') || typeLC.includes('place') || typeLC.includes('city')) {
      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              onClick={() => onQueryClick?.(item.title)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ position: 'relative', height: '160px' }}>
                <img
                  src={getImageForQuery(item.imageQuery, compIndex * 10 + i)}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/280x160?text=${encodeURIComponent(item.title)}`;
                  }}
                />
                {item.metadata?.rating && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '4px 10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    ⭐ {item.metadata.rating}
                  </div>
                )}
              </div>
              <div style={{ padding: '16px' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>
                  📍 {item.title}
                </h4>
                {item.description && (
                  <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: 1.5 }}>
                    {item.description.slice(0, 100)}...
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    // Entity/Detail 类型 - 详情布局
    if (typeLC.includes('entity') || typeLC.includes('detail') || typeLC.includes('info')) {
      const mainItem = items[0];
      const relatedItems = items.slice(1);
      
      return (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {/* 主要内容 */}
          {mainItem && (
            <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
              <img
                src={getImageForQuery(mainItem.imageQuery, compIndex * 10)}
                alt={mainItem.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  cursor: 'pointer'
                }}
                onClick={() => onImageClick?.(getImageForQuery(mainItem.imageQuery, compIndex * 10), mainItem.title)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x250?text=${encodeURIComponent(mainItem.title)}`;
                }}
              />
              <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700 }}>
                {mainItem.title}
              </h3>
              {mainItem.description && (
                <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: 1.7 }}>
                  {mainItem.description}
                </p>
              )}
            </div>
          )}
          
          {/* 相关项目 */}
          {relatedItems.length > 0 && (
            <div style={{ flex: '0 0 250px' }}>
              <h4 style={{ fontSize: '14px', color: '#888', marginBottom: '12px' }}>
                Related Topics
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedItems.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => onQueryClick?.(item.title)}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e8f0fe'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}
                  >
                    <img
                      src={getImageForQuery(item.imageQuery, compIndex * 10 + i + 1)}
                      alt={item.title}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/50x50?text=${i + 1}`;
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.title}</div>
                      {item.description && (
                        <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                          {item.description.slice(0, 40)}...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // 默认 - 网格布局
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '12px'
      }}>
        {items.map((item, i) => (
          <div
            key={item.id}
            onClick={() => onImageClick?.(getImageForQuery(item.imageQuery, compIndex * 10 + i), item.title)}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#f8f9fa'
            }}
          >
            <img
              src={getImageForQuery(item.imageQuery, compIndex * 10 + i)}
              alt={item.title}
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/180x140?text=${encodeURIComponent(item.title)}`;
              }}
            />
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 根据 AI 指定的布局渲染
  const renderLayout = () => {
    const { layout, components } = generatedUI;
    
    switch (layout) {
      case 'split':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div>
              {components.filter(c => c.position === 'main').map((c, i) => renderAIComponent(c, i))}
            </div>
            <div>
              {components.filter(c => c.position === 'sidebar').map((c, i) => renderAIComponent(c, i + 100))}
            </div>
          </div>
        );
      
      case 'grid':
        return (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '24px' 
          }}>
            {components.map((c, i) => renderAIComponent(c, i))}
          </div>
        );
      
      case 'stacked':
      default:
        return (
          <div>
            {components.map((c, i) => renderAIComponent(c, i))}
          </div>
        );
    }
  };

  return (
    <div className="ai-generated-view">
      {/* AI 设计说明 */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '1px solid #667eea30'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>🎨</span>
          <span style={{ fontWeight: 600, color: '#667eea' }}>AI Generated UI</span>
          <span style={{
            padding: '2px 8px',
            background: '#667eea',
            color: 'white',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: 600
          }}>
            {generatedUI.layout.toUpperCase()} LAYOUT
          </span>
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: '13px', 
          color: '#666',
          lineHeight: 1.5 
        }}>
          {generatedUI.reasoning}
        </p>
      </div>

      {/* 渲染 AI 生成的布局 */}
      {renderLayout()}

      {/* 相关搜索 */}
      {generatedUI.relatedQueries && generatedUI.relatedQueries.length > 0 && (
        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '16px'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
            🔍 AI Suggested Searches
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {generatedUI.relatedQueries.map((q, i) => (
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
                  cursor: 'pointer'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 动画样式 */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

