/**
 * TimelineArc - Blue Period 弧形画廊模板 (108:53965)
 * 
 * 1:1 还原 Figma 设计：
 * - 顶部：水平时间轴（1890-1960）
 * - 中间：弧形图片排列（中间大，两边小有倾斜）
 * - 底部：标题 + 描述
 */

import React, { useState, useRef } from 'react';

interface TimelineArcProps {
  title: string;
  description: string;
  yearStart: number;
  yearEnd: number;
  activeYearStart: number;
  activeYearEnd: number;
  images: string[];
  className?: string;
  onImageClick?: (url: string, index: number) => void;
  onYearClick?: (year: number) => void;
  onRangeChange?: (startYear: number, endYear: number) => void;
}

export function TimelineArc({
  title,
  description,
  yearStart = 1890,
  yearEnd = 1960,
  activeYearStart = 1900,
  activeYearEnd = 1910,
  images,
  className = '',
  onImageClick,
  onYearClick,
  onRangeChange
}: TimelineArcProps) {
  // 内部状态管理 active 区间
  const [currentActiveStart, setCurrentActiveStart] = useState(activeYearStart);
  const [currentActiveEnd, setCurrentActiveEnd] = useState(activeYearEnd);
  const [isDragging, setIsDragging] = useState(false);
  
  // 使用 ref 存储拖拽状态，避免闭包问题
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startYear: 0,
    currentStart: activeYearStart,
    currentEnd: activeYearEnd
  });
  
  const years: number[] = [];
  for (let y = yearStart; y <= yearEnd; y += 10) {
    years.push(y);
  }

  // 计算时间轴上的位置百分比
  const getYearPosition = (year: number) => {
    return ((year - yearStart) / (yearEnd - yearStart)) * 100;
  };

  // 根据鼠标位置计算最近的年份
  const getYearFromPosition = (clientX: number): number => {
    if (!trackRef.current) return yearStart;
    
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const year = yearStart + percentage * (yearEnd - yearStart);
    
    // 吸附到最近的10年
    const snappedYear = Math.round(year / 10) * 10;
    return Math.max(yearStart, Math.min(yearEnd, snappedYear));
  };

  // 鼠标事件
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const startYear = getYearFromPosition(e.clientX);
    
    // 更新 ref 和 state
    dragStateRef.current = {
      isDragging: true,
      startYear: startYear,
      currentStart: startYear,
      currentEnd: startYear
    };
    setIsDragging(true);
    setCurrentActiveStart(startYear);
    setCurrentActiveEnd(startYear);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStateRef.current.isDragging) return;
      
      const currentYear = getYearFromPosition(moveEvent.clientX);
      const start = Math.min(dragStateRef.current.startYear, currentYear);
      const end = Math.max(dragStateRef.current.startYear, currentYear);
      
      dragStateRef.current.currentStart = start;
      dragStateRef.current.currentEnd = end;
      
      setCurrentActiveStart(start);
      setCurrentActiveEnd(end);
    };
    
    const handleMouseUp = () => {
      if (dragStateRef.current.isDragging) {
        onRangeChange?.(dragStateRef.current.currentStart, dragStateRef.current.currentEnd);
      }
      
      dragStateRef.current.isDragging = false;
      setIsDragging(false);
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // 触摸事件
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    const startYear = getYearFromPosition(e.touches[0].clientX);
    
    dragStateRef.current = {
      isDragging: true,
      startYear: startYear,
      currentStart: startYear,
      currentEnd: startYear
    };
    setIsDragging(true);
    setCurrentActiveStart(startYear);
    setCurrentActiveEnd(startYear);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || !dragStateRef.current.isDragging) return;
    
    const currentYear = getYearFromPosition(e.touches[0].clientX);
    const start = Math.min(dragStateRef.current.startYear, currentYear);
    const end = Math.max(dragStateRef.current.startYear, currentYear);
    
    dragStateRef.current.currentStart = start;
    dragStateRef.current.currentEnd = end;
    
    setCurrentActiveStart(start);
    setCurrentActiveEnd(end);
  };

  const handleTouchEnd = () => {
    if (dragStateRef.current.isDragging) {
      onRangeChange?.(dragStateRef.current.currentStart, dragStateRef.current.currentEnd);
    }
    
    dragStateRef.current.isDragging = false;
    setIsDragging(false);
  };

  // 点击年份的处理（单击选择单个10年区间）
  const handleYearClick = (year: number, e: React.MouseEvent) => {
    e.stopPropagation(); // 防止触发track的拖拽
    const newStart = year;
    const newEnd = Math.min(year + 10, yearEnd);
    setCurrentActiveStart(newStart);
    setCurrentActiveEnd(newEnd);
    onYearClick?.(year);
    onRangeChange?.(newStart, newEnd);
  };

  const activeStartPos = getYearPosition(currentActiveStart);
  const activeEndPos = getYearPosition(currentActiveEnd);

  // 根据选择的时间范围计算显示的图片
  // 将图片按时间区间分组，选择的区间决定显示哪些图片
  const getImagesForRange = () => {
    const totalYears = yearEnd - yearStart;
    const startIndex = Math.floor(((currentActiveStart - yearStart) / totalYears) * images.length);
    const endIndex = Math.ceil(((currentActiveEnd - yearStart) / totalYears) * images.length);
    
    // 获取该范围内的图片，确保至少有 9 张
    let rangeImages = images.slice(startIndex, Math.max(endIndex, startIndex + 9));
    
    // 如果不够 9 张，循环补充
    while (rangeImages.length < 9 && images.length > 0) {
      rangeImages = [...rangeImages, ...images.slice(0, 9 - rangeImages.length)];
    }
    
    return rangeImages.slice(0, 9);
  };
  
  const visibleImages = getImagesForRange();
  
  // 根据时间范围生成动态标题
  const dynamicTitle = `${title} (${currentActiveStart}-${currentActiveEnd})`;

  return (
    <div className={`timeline-arc ${className}`}>
      {/* 时间轴 - 支持拖拽选择 */}
      <div className="timeline-arc__timeline">
        <div 
          ref={trackRef}
          className={`timeline-arc__track ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 背景虚线 */}
          <div className="timeline-arc__track-bg" />
          
          {/* 激活区间实线 */}
          <div 
            className="timeline-arc__track-active"
            style={{
              left: `${activeStartPos}%`,
              width: `${Math.max(activeEndPos - activeStartPos, 0)}%`
            }}
          />
          
          {/* 年份点和标签 - 可点击 */}
          {years.map((year) => {
            const isActive = year >= currentActiveStart && year <= currentActiveEnd;
            const pos = getYearPosition(year);
            return (
              <div 
                key={year}
                className={`timeline-arc__year ${isActive ? 'active' : ''}`}
                style={{ left: `${pos}%` }}
                onClick={(e) => handleYearClick(year, e)}
              >
                <div className={`timeline-arc__dot ${isActive ? 'active' : ''}`} />
                <span className={`timeline-arc__label ${isActive ? 'active' : ''}`}>
                  {year}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 弧形图片画廊 */}
      <div className="timeline-arc__gallery">
        {visibleImages.map((img, index) => {
          const offset = index - 4; // -4 到 4
          const isCenter = offset === 0;
          
          return (
            <div
              key={index}
              className={`timeline-arc__card ${isCenter ? 'center' : ''}`}
              style={{
                '--offset': offset,
                '--abs-offset': Math.abs(offset)
              } as React.CSSProperties}
              onClick={() => onImageClick?.(img, index)}
            >
              <img src={img} alt={`${title} ${index + 1}`} />
            </div>
          );
        })}
      </div>

      {/* 标题和描述 - 根据选择的时间范围动态更新 */}
      <div className="timeline-arc__content">
        <h2 className="timeline-arc__title">{dynamicTitle}</h2>
        <p className="timeline-arc__desc">{description}</p>
      </div>

      <style>{`
        .timeline-arc {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 24px;
          background: #fff;
          border-radius: 16px;
          max-width: 1208px;
          margin: 0 auto;
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
        }

        /* 时间轴 */
        .timeline-arc__timeline {
          width: 100%;
          max-width: 700px;
          margin-bottom: 32px;
        }

        .timeline-arc__track {
          position: relative;
          height: 40px;
          display: flex;
          align-items: center;
          cursor: crosshair;
          padding: 10px 0;
          margin: -10px 0;
        }

        .timeline-arc__track.dragging {
          cursor: grabbing;
        }

        .timeline-arc__track-bg {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 2px;
          background: repeating-linear-gradient(
            to right,
            rgba(0, 0, 0, 0.15) 0px,
            rgba(0, 0, 0, 0.15) 4px,
            transparent 4px,
            transparent 8px
          );
        }

        .timeline-arc__track-active {
          position: absolute;
          top: 50%;
          height: 4px;
          background: linear-gradient(90deg, #000 0%, #333 100%);
          transform: translateY(-50%);
          border-radius: 2px;
          transition: left 0.1s ease, width 0.1s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .timeline-arc__track.dragging .timeline-arc__track-active {
          transition: none;
          background: #000;
        }

        .timeline-arc__year {
          position: absolute;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 4px;
          transition: transform 0.2s ease;
        }

        .timeline-arc__year:hover {
          transform: translateX(-50%) scale(1.1);
        }

        .timeline-arc__year:hover .timeline-arc__dot {
          border-color: #000;
          background: rgba(0, 0, 0, 0.1);
        }

        .timeline-arc__year:hover .timeline-arc__label {
          color: #000;
        }

        .timeline-arc__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid rgba(0, 0, 0, 0.2);
          transition: all 0.3s;
        }

        .timeline-arc__dot.active {
          background: #000;
          border-color: #000;
          width: 12px;
          height: 12px;
        }

        .timeline-arc__label {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.4);
          transition: all 0.3s;
          user-select: none;
        }

        .timeline-arc__label.active {
          color: #000;
          font-weight: 600;
        }

        /* 弧形画廊 */
        .timeline-arc__gallery {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
          padding: 20px 0;
          width: 100%;
          max-width: 1160px;
          overflow: hidden;
        }

        .timeline-arc__card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          flex-shrink: 0;
        }

        .timeline-arc__card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* 中间卡片 - 最大 */
        .timeline-arc__card.center {
          width: 180px;
          height: 240px;
          border-radius: 16px;
        }

        /* 两侧卡片 - 根据距离递减 */
        .timeline-arc__card:not(.center) {
          width: calc(70px + (4 - var(--abs-offset)) * 12px);
          height: calc(100px + (4 - var(--abs-offset)) * 18px);
          transform: rotate(calc(var(--offset) * 3deg));
        }

        .timeline-arc__card:hover {
          transform: translateY(-8px) rotate(0deg);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .timeline-arc__card.center:hover {
          transform: translateY(-8px) scale(1.02);
        }

        /* 内容 */
        .timeline-arc__content {
          text-align: center;
          max-width: 700px;
        }

        .timeline-arc__title {
          font-family: 'Libre Baskerville', 'Georgia', serif;
          font-size: 36px;
          font-weight: 400;
          font-style: italic;
          margin: 0 0 16px 0;
          color: #000;
        }

        .timeline-arc__desc {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.6);
          margin: 0;
        }

        @media (max-width: 768px) {
          .timeline-arc__gallery {
            gap: 8px;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 20px;
          }

          .timeline-arc__card.center {
            width: 150px;
            height: 200px;
          }

          .timeline-arc__card:not(.center) {
            width: 80px;
            height: 110px;
          }

          .timeline-arc__title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}

