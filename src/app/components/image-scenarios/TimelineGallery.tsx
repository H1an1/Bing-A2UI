/**
 * TimelineGallery - Blue Period 风格模板 (108:53905)
 * 
 * 1:1 还原 Figma 设计：
 * - 左侧：时间线导航（年份 + 期间按钮 + 缩略图）
 * - 中间：标题（Libre Baskerville 斜体）+ 描述
 * - 右侧：3D 卡片扇形堆叠 + 导航箭头
 * 
 * 交互：点击不同时期在页面内切换内容，不触发 requery
 */

import React, { useState, useMemo } from 'react';

interface Period {
  year: number;
  label: string;
  thumbnail?: string;
  description?: string; // 每个时期可以有自己的描述
}

interface TimelineGalleryProps {
  title: string;
  description: string;
  periods: Period[];
  activePeriodIndex?: number;
  images: string[];
  className?: string;
  onPeriodChange?: (index: number) => void;
  onImageClick?: (url: string, index: number) => void;
}

export function TimelineGallery({
  title,
  description,
  periods,
  activePeriodIndex = 0,
  images,
  className = '',
  onPeriodChange,
  onImageClick
}: TimelineGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(activePeriodIndex);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 根据选中的时期分配图片（将图片平均分配到各个时期）
  const periodImages = useMemo(() => {
    if (!images.length || !periods.length) return [];
    
    const imagesPerPeriod = Math.max(3, Math.ceil(images.length / periods.length));
    return periods.map((_, idx) => {
      const start = idx * imagesPerPeriod;
      const end = Math.min(start + imagesPerPeriod, images.length);
      // 如果不够分，循环使用图片
      const periodImgs = images.slice(start, end);
      if (periodImgs.length < 3) {
        // 补充图片
        for (let i = periodImgs.length; i < 5; i++) {
          periodImgs.push(images[i % images.length]);
        }
      }
      return periodImgs;
    });
  }, [images, periods]);

  // 当前时期的图片
  const currentPeriodImages = periodImages[activeIndex] || images;

  // 当前时期的标题和描述
  const currentPeriod = periods[activeIndex];
  const displayTitle = currentPeriod?.label || title;
  const displayDescription = currentPeriod?.description || description;

  // 切换时期（仅页面内切换，不触发 requery）
  const handlePeriodClick = (index: number) => {
    setActiveIndex(index);
    setCurrentImageIndex(0); // 重置图片索引
    // 可选：通知父组件（但不应该触发 requery）
    onPeriodChange?.(index);
  };

  const handlePrev = () => {
    setCurrentImageIndex(prev => 
      prev > 0 ? prev - 1 : currentPeriodImages.length - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => 
      prev < currentPeriodImages.length - 1 ? prev + 1 : 0
    );
  };

  // 显示5张卡片（扇形排列）
  const getVisibleImages = () => {
    const result = [];
    const imgs = currentPeriodImages;
    for (let i = -2; i <= 2; i++) {
      const idx = (currentImageIndex + i + imgs.length) % imgs.length;
      result.push({ index: idx, offset: i, url: imgs[idx] });
    }
    return result;
  };

  return (
    <div className={`timeline-gallery ${className}`} style={styles.container}>
      {/* 左侧时间线导航 */}
      <nav style={styles.nav}>
        {periods.map((period, index) => (
          <div key={index} style={styles.navItem}>
            {/* 年份 */}
            <span style={styles.year}>{period.year}</span>
            
            {/* 时间线 */}
            <div style={styles.timeline}>
              <div style={{
                ...styles.timelineSegment,
                background: index <= activeIndex ? '#000' : 'rgba(0,0,0,0.15)'
              }} />
            </div>
            
            {/* 期间按钮 */}
            <button
              style={{
                ...styles.periodBtn,
                ...(index === activeIndex ? styles.periodBtnActive : {})
              }}
              onClick={() => handlePeriodClick(index)}
            >
              {period.thumbnail ? (
                <img 
                  src={period.thumbnail} 
                  alt={period.label}
                  style={styles.periodThumb}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div style={styles.periodThumbPlaceholder}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, hsl(${210 + index * 30}, 60%, 50%) 0%, hsl(${210 + index * 30}, 70%, 35%) 100%)`,
                    borderRadius: '50%'
                  }} />
                </div>
              )}
              <span>{period.label}</span>
            </button>
          </div>
        ))}
      </nav>

      {/* 中间内容区 */}
      <div style={styles.content}>
        {/* 标题 - Libre Baskerville 斜体，响应式字体大小 */}
        <h2 style={{
          ...styles.title,
          fontSize: displayTitle.length > 35 ? '32px' : displayTitle.length > 25 ? '38px' : displayTitle.length > 18 ? '44px' : '52px'
        }}>
          {displayTitle}
        </h2>
        
        {/* 描述 */}
        <p style={styles.description}>{displayDescription}</p>
      </div>

      {/* 右侧卡片堆叠 */}
      <div style={styles.cardsContainer}>
        <div style={styles.cards}>
          {getVisibleImages().map(({ index, offset, url }) => {
            // 扇形排列：卡片向右倾斜
            const rotation = offset * 8;
            const translateX = offset * 60;
            const translateY = Math.abs(offset) * 15;
            const scale = 1 - Math.abs(offset) * 0.08;
            const zIndex = 10 - Math.abs(offset);
            
            return (
              <div
                key={`${activeIndex}-${index}-${offset}`}
                style={{
                  ...styles.card,
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                  zIndex,
                  opacity: 1 - Math.abs(offset) * 0.15
                }}
                onClick={() => onImageClick?.(url, index)}
              >
                <img 
                  src={url} 
                  alt={`${displayTitle} ${index + 1}`} 
                  style={styles.cardImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/200/280?random=' + index;
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 导航箭头 */}
        <div style={styles.arrows}>
          <button style={styles.arrow} onClick={handlePrev} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button style={styles.arrow} onClick={handleNext} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 时期指示器 */}
        <div style={styles.periodIndicator}>
          {periods.map((_, idx) => (
            <span 
              key={idx} 
              style={{
                ...styles.indicatorDot,
                background: idx === activeIndex ? '#000' : 'rgba(0,0,0,0.2)'
              }}
              onClick={() => handlePeriodClick(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: '32px',
    padding: '32px',
    background: '#fff',
    borderRadius: '16px',
    minHeight: '400px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '1208px',
    margin: '0 auto',
    alignItems: 'flex-start', // 顶部对齐
    boxSizing: 'border-box'
  },

  // 左侧导航
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    minWidth: '160px',
    flexShrink: 0
  },

  navItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    position: 'relative'
  },

  year: {
    fontSize: '13px',
    color: 'rgba(0,0,0,0.4)',
    minWidth: '36px',
    paddingTop: '10px',
    fontWeight: 400
  },

  timeline: {
    position: 'relative',
    width: '2px',
    minHeight: '56px',
    display: 'flex',
    flexDirection: 'column'
  },

  timelineSegment: {
    flex: 1,
    transition: 'background 0.3s'
  },

  periodBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px 8px 8px',
    background: '#f5f5f5',
    border: 'none',
    borderRadius: '24px',
    fontSize: '13px',
    color: 'rgba(0,0,0,0.7)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap',
    fontWeight: 400
  },

  periodBtnActive: {
    background: '#fff',
    boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
    color: '#000',
    fontWeight: 500,
    transform: 'scale(1.02)'
  },

  periodThumb: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    objectFit: 'cover'
  },

  periodThumbPlaceholder: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    overflow: 'hidden'
  },

  // 中间内容
  content: {
    flex: '0 0 280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // 顶部对齐
    paddingTop: '8px',
    paddingRight: '16px'
  },

  title: {
    fontFamily: '"Libre Baskerville", "Georgia", "Times New Roman", serif',
    fontSize: '52px',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.15,
    margin: '0 0 20px 0',
    color: '#000',
    letterSpacing: '-0.5px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word'
  },

  description: {
    fontSize: '14px',
    lineHeight: 1.7,
    color: 'rgba(0,0,0,0.6)',
    margin: 0
  },

  // 卡片容器
  cardsContainer: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // 顶部对齐
    alignItems: 'center',
    minWidth: '380px',
    minHeight: '320px',
    overflow: 'visible'
  },

  cards: {
    position: 'relative',
    width: '100%',
    height: '300px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '20px'
  },

  card: {
    position: 'absolute',
    width: '160px',
    height: '220px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    cursor: 'pointer',
    transition: 'transform 0.4s ease, opacity 0.4s ease',
    transformOrigin: 'center bottom'
  },

  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  // 箭头
  arrows: {
    position: 'absolute',
    top: '50%',
    right: '-20px',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: '8px'
  },

  arrow: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.12)',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'rgba(0,0,0,0.5)',
    transition: 'all 0.2s'
  },

  // 时期指示器
  periodIndicator: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '6px'
  },

  indicatorDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};
