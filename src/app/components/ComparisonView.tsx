/**
 * ComparisonView Component
 * 动态生成的对比视图组件
 * 用于展示两个或多个实体的并排对比
 */

import React, { useState } from "react";

interface ComparisonItem {
  name: string;
  type: string;
  image?: string;
  description?: string;
  attributes?: Array<{ label: string; value: string }>;
}

interface ComparisonViewProps {
  title: string;
  items: ComparisonItem[];
  className?: string;
  interactions?: any;
}

export function ComparisonView({
  title,
  items,
  className = "",
  interactions
}: ComparisonViewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 生成模拟数据（在实际生产中会从 API 获取）
  const enrichedItems = items.map((item, i) => ({
    ...item,
    image: item.image || `https://images.unsplash.com/photo-150000000000${i}?w=300&h=200&fit=crop`,
    description: item.description || `${item.name} is a fascinating subject with unique characteristics.`,
    attributes: item.attributes || [
      { label: 'Origin', value: 'Unknown' },
      { label: 'Type', value: item.type },
      { label: 'Notable for', value: 'Various features' },
    ]
  }));

  const handleItemClick = (item: ComparisonItem, index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    if (interactions?.onTitleClick) {
      interactions.onTitleClick({
        title: item.name,
        text: item.name,
        type: 'comparison-item'
      });
    }
  };

  const handleImageClick = (item: ComparisonItem) => {
    if (interactions?.onImageClick) {
      interactions.onImageClick({
        url: item.image,
        alt: item.name,
        type: 'comparison-image'
      });
    }
  };

  return (
    <div className={`acf-comparison-view ${className}`}>
      {/* Header */}
      <div className="acf-comparison-view__header">
        <h2 className="acf-comparison-view__title">{title}</h2>
        <div className="acf-comparison-view__subtitle">
          Side-by-side comparison
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="acf-comparison-view__grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(enrichedItems.length, 3)}, 1fr)`,
        gap: '24px',
        marginTop: '20px'
      }}>
        {enrichedItems.map((item, i) => (
          <div
            key={i}
            className={`acf-comparison-view__item ${activeIndex === i ? 'active' : ''}`}
            style={{
              background: activeIndex === i ? '#f0f7ff' : '#f8f9fa',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              border: activeIndex === i ? '2px solid #4f6bed' : '2px solid transparent',
              cursor: 'pointer'
            }}
            onClick={() => handleItemClick(item, i)}
          >
            {/* Item Image */}
            <div
              className="acf-comparison-view__item-image"
              style={{
                height: '160px',
                backgroundImage: `url('${item.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick(item);
              }}
            />

            {/* Item Content */}
            <div style={{ padding: '16px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '8px'
              }}>
                {item.name}
              </h3>

              <p style={{
                fontSize: '14px',
                color: '#666',
                lineHeight: 1.5,
                marginBottom: '12px'
              }}>
                {item.description}
              </p>

              {/* Attributes */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {item.attributes?.map((attr, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      padding: '4px 0',
                      borderBottom: j < (item.attributes?.length || 0) - 1 ? '1px solid #eee' : 'none'
                    }}
                  >
                    <span style={{ color: '#888' }}>{attr.label}</span>
                    <span style={{ color: '#333', fontWeight: 500 }}>{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Indicator */}
            {activeIndex === i && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#4f6bed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                  <path d="M11.5 4L5.5 10L2.5 7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Summary */}
      {enrichedItems.length >= 2 && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
            💡 Quick Insight
          </div>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>
            {enrichedItems[0].name} and {enrichedItems[1]?.name || 'others'} share some similarities 
            but differ in key aspects. Click on each item to explore more details.
          </div>
        </div>
      )}
    </div>
  );
}

