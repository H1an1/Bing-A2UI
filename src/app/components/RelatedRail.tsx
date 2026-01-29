import React from "react";
import svgPaths from "../../imports/svg-wcdo3zh12x";
import { data } from "../data";

interface RelatedRailProps {
  title?: string;
  items?: Array<{
    title: string;
    subtitle: string;
    image: string;
  }>;
  className?: string;
}

/**
 * RelatedRail Component (RS Card)
 * 
 * RS Card 是与 Image Card 配套使用的相关搜索卡片。
 * 
 * 规格（来自 Guidelines）：
 * - 尺寸: 200 × 424px（2×4 栅格）
 * - 背景色: #f0f3ff（浅蓝色主题）
 * - 圆角: 16px（--acf-radius-l）
 * - 内边距: 20px
 * 
 * 结构：
 * - Header: 标题 (14px bold) + 展开图标 (16×16px)
 * - Item List: 项间距 12px
 * - Item: 缩略图 (48×48px, 圆角 8px) + 标题 (13px bold) + 副标题 (13px regular)
 */
export function RelatedRail({ 
  title = data.relatedRail.title, 
  items = data.relatedRail.items,
  className = ""
}: RelatedRailProps) {
  return (
    <div className={`w-[200px] h-[424px] bg-[#f0f3ff] rounded-[16px] p-5 flex flex-col overflow-hidden ${className}`}>
      {/* Header: 标题 14px bold + 展开图标 16×16px */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <span className="text-[14px] font-bold leading-[22px] text-black">
          {title}
        </span>
        <button className="w-4 h-4 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d={svgPaths.p20d71070} fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Item List: 项间距 12px */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 cursor-pointer"
          >
            {/* Thumbnail: 48×48px, 圆角 8px */}
            <div className="w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-lg overflow-hidden shrink-0">
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
                className="w-12 h-12 object-cover"
              />
            </div>
            
            {/* Info: 标题 13px bold, 副标题 13px regular */}
            <div className="flex flex-col min-w-0 leading-5">
              <span className="text-[13px] font-bold text-black truncate">
                {item.title}
              </span>
              <span className="text-[13px] font-normal text-black truncate">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * RelatedRailCompact Component
 * A compact variant of the RS Card for inline use within other sections.
 * Auto-adjusts to available width instead of fixed 200px.
 */
export function RelatedRailCompact({ 
  title = data.relatedRail.title, 
  items = data.relatedRail.items,
  className = ""
}: RelatedRailProps) {
  return (
    <div className={`acf-rs-card acf-rs-card--compact ${className}`}>
      {/* Header */}
      <div className="acf-rs-card__header">
        <span className="acf-rs-card__title">
          {title}
        </span>
        <button 
          className="acf-rs-card__expand-btn"
          aria-label="Expand related searches"
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d={svgPaths.p20d71070} fill="currentColor" />
          </svg>
        </button>
      </div>
      
      {/* Item List */}
      <div className="acf-rs-card__list">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="acf-rs-card__item"
          >
            <div className="acf-rs-card__thumb">
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
              />
            </div>
            <div className="acf-rs-card__info">
              <span className="acf-rs-card__item-title">{item.title}</span>
              <span className="acf-rs-card__item-subtitle">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
