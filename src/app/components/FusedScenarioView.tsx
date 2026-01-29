/**
 * FusedScenarioView Component
 * 融合式场景视图 - 使用原有的 Image Scenario 组件，但以融合的方式展示
 * 
 * 核心理念：
 * 1. 使用你提供的 6 个 Image Scenario 组件
 * 2. 用真实 API 数据填充这些组件
 * 3. 组件之间有视觉和数据上的融合
 * 4. 不是简单堆叠，而是有层次的布局
 */

import React, { useState } from 'react';
import { MultiIntentAnalysis } from '../services/intelligentEngine';
import { ComponentData } from '../services/dataAdapter';

// 导入原有的 Image Scenario 组件
import { TimelineGallery } from './image-scenarios/TimelineGallery';
import { LocationCard } from './image-scenarios/LocationCard';
import { StepCard } from './image-scenarios/StepCard';
import { EntityDetail } from './image-scenarios/EntityDetail';
import { VisualExplorer } from './image-scenarios/VisualExplorer';
import { CityGrid } from './image-scenarios/CityGrid';
import { TextRail } from './TextRail';

interface FusedScenarioViewProps {
  query: string;
  analysis: MultiIntentAnalysis;
  components: ComponentData[];
  relatedQueries: string[];
  isLoading?: boolean;
  onImageClick?: (imageUrl: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
}

export function FusedScenarioView({
  query,
  analysis,
  components,
  relatedQueries,
  isLoading,
  onImageClick,
  onQueryClick
}: FusedScenarioViewProps) {
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  // 创建交互处理器
  const createInteractions = (componentType: string) => ({
    onImageClick: (data: any) => {
      onImageClick?.(data.url || data.src, data.alt || data.title);
    },
    onTitleClick: (data: any) => {
      onQueryClick?.(data.title || data.text);
    },
    onTagClick: (data: any) => {
      onQueryClick?.(data.text || data.title);
    },
    onTabClick: (data: any) => {
      // 切换视图
      console.log('Tab clicked:', data);
    }
  });

  // 渲染单个组件
  const renderComponent = (componentData: ComponentData, index: number) => {
    const { type, data } = componentData;
    const interactions = createInteractions(type);
    const isSecondary = index > 0;

    // 根据组件类型渲染
    const componentElement = (() => {
      switch (type) {
        case 'TimelineGallery':
          return (
            <TimelineGallery
              {...data}
              interactions={interactions}
            />
          );
        case 'LocationCard':
          return (
            <LocationCard
              {...data}
              interactions={interactions}
            />
          );
        case 'StepCard':
          return (
            <StepCard
              {...data}
              interactions={interactions}
            />
          );
        case 'EntityDetail':
          return (
            <EntityDetail
              {...data}
              interactions={interactions}
            />
          );
        case 'VisualExplorer':
          return (
            <VisualExplorer
              {...data}
              interactions={interactions}
            />
          );
        case 'CityGrid':
          return (
            <CityGrid
              {...data}
              interactions={interactions}
            />
          );
        default:
          return null;
      }
    })();

    if (!componentElement) return null;

    return (
      <div
        key={`${type}-${index}`}
        className={`fused-component ${isSecondary ? 'fused-component--secondary' : 'fused-component--primary'}`}
        style={{
          marginBottom: isSecondary ? '16px' : '24px',
          opacity: isSecondary ? 0.95 : 1,
          transform: isSecondary ? 'scale(0.98)' : 'scale(1)',
          transformOrigin: 'top center',
          animation: `fadeInUp 0.5s ease-out ${index * 0.15}s both`
        }}
      >
        {/* 组件标签 */}
        <div 
          className="fused-component__label"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            fontSize: '12px'
          }}
        >
          <span 
            style={{
              padding: '4px 10px',
              background: isSecondary ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: isSecondary ? '#666' : 'white',
              borderRadius: '12px',
              fontWeight: 500
            }}
          >
            {isSecondary ? 'Related' : 'Primary'} • {type}
          </span>
          
          {!isSecondary && analysis.confidence > 0.7 && (
            <span style={{ color: '#22c55e', fontSize: '11px' }}>
              ✓ High confidence match
            </span>
          )}
        </div>

        {/* 组件内容 */}
        {componentElement}

        {/* 融合连接线（非最后一个组件） */}
        {index < components.length - 1 && (
          <div 
            className="fused-connector"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 0',
              position: 'relative'
            }}
          >
            <div style={{
              width: '2px',
              height: '32px',
              background: 'linear-gradient(to bottom, #e0e0e0, transparent)',
              position: 'absolute'
            }} />
            <span style={{
              background: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '11px',
              color: '#888',
              border: '1px solid #eee',
              zIndex: 1
            }}>
              Related content
            </span>
          </div>
        )}
      </div>
    );
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="fused-scenario-loading">
        {/* 骨架屏 - 模拟组件布局 */}
        <div style={{
          background: '#f8f8f8',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '120px', height: '24px', background: '#e0e0e0', borderRadius: '12px' }} />
            <div style={{ width: '80px', height: '24px', background: '#e8e8e8', borderRadius: '12px' }} />
          </div>
          <div style={{ height: '200px', background: '#e8e8e8', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: '100px', background: '#e0e0e0', borderRadius: '8px' }} />
            ))}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', color: '#888', fontSize: '14px' }}>
          <div className="animate-pulse">Loading real search results...</div>
        </div>
      </div>
    );
  }

  // 无结果
  if (components.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px',
        color: '#666'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
        <div style={{ fontSize: '16px', fontWeight: 500 }}>No results found</div>
        <div style={{ fontSize: '14px', marginTop: '8px', color: '#888' }}>
          Try a different search query
        </div>
      </div>
    );
  }

  return (
    <div className="fused-scenario-view">
      {/* 查询上下文卡片 */}
      <div 
        className="fused-context-card"
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
            Showing results for
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e' }}>
            {query}
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '6px', 
            marginTop: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              padding: '3px 10px',
              background: '#4f6bed',
              color: 'white',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 500
            }}>
              {analysis.primaryIntent}
            </span>
            {analysis.secondaryIntents.slice(0, 2).map((intent, i) => (
              <span key={i} style={{
                padding: '3px 10px',
                background: 'white',
                color: '#666',
                borderRadius: '10px',
                fontSize: '11px',
                border: '1px solid #ddd'
              }}>
                {intent}
              </span>
            ))}
          </div>
        </div>

        {/* 快速统计 */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#4f6bed' }}>
            {components.length}
          </div>
          <div style={{ fontSize: '12px', color: '#888' }}>
            components matched
          </div>
        </div>
      </div>

      {/* 渲染所有组件 */}
      <div className="fused-components">
        {components.map((comp, i) => renderComponent(comp, i))}
      </div>

      {/* 相关搜索 */}
      {relatedQueries.length > 0 && (
        <div 
          className="fused-related-searches"
          style={{
            marginTop: '32px',
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
            🔍 Related searches
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e8f0fe';
                  e.currentTarget.style.borderColor = '#1a73e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#e0e0e0';
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fused-component--secondary {
          position: relative;
        }
        
        .fused-component--secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

