/**
 * EntityDetail - 实体详情模板 (108:54161)
 * 
 * 精确还原 Figma 设计：
 * - 标题行 "Images of Bell Cobra helicopter >" + 分页点
 * - 左侧：Hero 大图 + Source标签 + 导航按钮
 * - 右侧：两个卡片（高度总和 = Hero高度）
 *   - 上方卡片：标题 + 描述 + Sources徽章
 *   - 下方卡片：Explore 标题 + 5个等宽主题卡片
 */

import React, { useState } from 'react';

interface Source {
  icon?: string;
  name: string;
}

interface Topic {
  label: string;
  image: string;
}

interface EntityDetailProps {
  pageTitle: string;
  title: string;
  description: string;
  images: string[];
  imageSource?: string;
  sources?: Source[];
  topics: Topic[];
  className?: string;
  onTitleClick?: () => void;
  onImageClick?: (url: string, index: number) => void;
  onTopicClick?: (topic: Topic, index: number) => void;
}

export function EntityDetail({
  pageTitle,
  title,
  description,
  images,
  imageSource = 'www.lorem.com',
  sources = [],
  topics,
  className = '',
  onTitleClick,
  onImageClick,
  onTopicClick
}: EntityDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTopic, setActiveTopic] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className={className} style={styles.container}>
      {/* 标题行 */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle} onClick={onTitleClick}>
          {pageTitle}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '6px' }}>
            <path d="M5 11L9 7L5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </h1>
        <div style={styles.pagination}>
          {[0, 1, 2].map(i => (
            <span key={i} style={styles.dot} />
          ))}
        </div>
      </div>

      {/* 主内容区 - 左右布局 */}
      <div style={styles.main}>
        {/* 左侧 Hero 大图 */}
        <div style={styles.heroContainer}>
          <div style={styles.heroWrapper}>
            <img 
              src={images[currentIndex]} 
              alt={title}
              style={styles.heroImage}
              onClick={() => onImageClick?.(images[currentIndex], currentIndex)}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/600/400?random=hero';
              }}
            />
            
            {/* Source 标签 - 左下角 */}
            <div style={styles.sourceTag}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" fill="#4285f4"/>
                <path d="M4 7H10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M7 4V10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Source · {imageSource}</span>
            </div>

            {/* 导航按钮 - 右下角 */}
            <div style={styles.navButtons}>
              <button style={styles.navBtn} onClick={handlePrev}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button style={styles.navBtn} onClick={handleNext}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 右侧 - 两个卡片 */}
        <div style={styles.rightPanel}>
          {/* 上方卡片 - 信息卡 */}
          <div style={styles.infoCard}>
            <h2 style={styles.infoTitle}>{title}</h2>
            <p style={styles.infoDesc}>{description}</p>

            {/* Sources 徽章 */}
            <div style={styles.sourcesRow}>
              <div style={styles.sourceIcons}>
                {[0, 1].map(i => (
                  <div key={i} style={{
                    ...styles.sourceIcon,
                    marginLeft: i > 0 ? '-8px' : 0,
                    zIndex: 2 - i,
                    background: i === 0 ? '#4285f4' : '#34a853'
                  }}>
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="white">
                      <circle cx="10" cy="10" r="8"/>
                    </svg>
                  </div>
                ))}
              </div>
              <div style={styles.sourcesBadge}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M6 3.5V6M6 6V8.5M6 6H3.5M6 6H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>{sources.length || 4} Sources</span>
              </div>
            </div>
          </div>

          {/* 下方卡片 - Explore 卡 */}
          <div style={styles.exploreCard}>
            {/* Explore 标题行 */}
            <div style={styles.exploreHeader}>
              <h3 style={styles.exploreTitle}>Explore {title}</h3>
              <button style={styles.exploreArrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* 5个等宽主题卡片 */}
            <div style={styles.topicsGrid}>
              {topics.slice(0, 5).map((topic, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.topicItem,
                    transform: activeTopic === index ? 'translateY(-3px)' : 'none'
                  }}
                  onClick={() => onTopicClick?.(topic, index)}
                  onMouseEnter={() => setActiveTopic(index)}
                  onMouseLeave={() => setActiveTopic(null)}
                >
                  <div style={styles.topicImageWrapper}>
                    <img 
                      src={topic.image} 
                      alt={topic.label}
                      style={{
                        ...styles.topicImage,
                        transform: activeTopic === index ? 'scale(1.08)' : 'scale(1)'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/120/90?random=${index}`;
                      }}
                    />
                  </div>
                  <span style={styles.topicLabel}>{topic.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 固定高度，确保左右对齐
const HERO_HEIGHT = 360;
const CARD_GAP = 12;
const INFO_CARD_HEIGHT = 180;
const EXPLORE_CARD_HEIGHT = HERO_HEIGHT - INFO_CARD_HEIGHT - CARD_GAP;

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: '#fff',
    borderRadius: '20px',
    padding: '20px 24px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '1208px',
    margin: '0 auto'
  },

  // 标题行
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },

  pageTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,
    color: '#000',
    cursor: 'pointer'
  },

  pagination: {
    display: 'flex',
    gap: '8px'
  },

  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    border: '1.5px solid rgba(0,0,0,0.25)',
    background: 'transparent'
  },

  // 主内容区
  main: {
    display: 'flex',
    gap: '20px',
    alignItems: 'stretch'  // 让左右高度一致
  },

  // 左侧 Hero
  heroContainer: {
    flex: '0 0 55%',
    maxWidth: '55%'
  },

  heroWrapper: {
    position: 'relative',
    height: `${HERO_HEIGHT}px`,
    borderRadius: '16px',
    overflow: 'hidden',
    background: '#f0f0f0'
  },

  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'transform 0.4s ease'
  },

  sourceTag: {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#fff'
  },

  navButtons: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    display: 'flex',
    gap: '4px'
  },

  navBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s'
  },

  // 右侧面板
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: `${CARD_GAP}px`,
    height: `${HERO_HEIGHT}px`  // 与 Hero 等高
  },

  // 上方信息卡
  infoCard: {
    height: `${INFO_CARD_HEIGHT}px`,
    padding: '16px 20px',
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column'
  },

  infoTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 10px 0',
    color: '#000'
  },

  infoDesc: {
    fontSize: '13px',
    lineHeight: 1.65,
    color: 'rgba(0,0,0,0.65)',
    margin: 0,
    flex: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical'
  },

  sourcesRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '12px'
  },

  sourceIcons: {
    display: 'flex',
    alignItems: 'center'
  },

  sourceIcon: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: '2px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },

  sourcesBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginLeft: '12px',
    padding: '5px 12px',
    background: '#f5f5f5',
    borderRadius: '14px',
    fontSize: '12px',
    color: 'rgba(0,0,0,0.6)',
    fontWeight: 500
  },

  // 下方 Explore 卡
  exploreCard: {
    flex: 1,
    padding: '14px 16px',
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column'
  },

  exploreHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },

  exploreTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: 0,
    color: '#000'
  },

  exploreArrow: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#fff',
    color: 'rgba(0,0,0,0.5)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },

  // 主题网格 - 5个等宽
  topicsGrid: {
    flex: 1,
    display: 'flex',
    gap: '10px'
  },

  topicItem: {
    flex: 1,
    minWidth: 0,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    display: 'flex',
    flexDirection: 'column'
  },

  topicImageWrapper: {
    width: '100%',
    aspectRatio: '1.15',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '8px',
    background: '#f5f5f5'
  },

  topicImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },

  topicLabel: {
    fontSize: '11px',
    fontWeight: 500,
    color: 'rgba(0,0,0,0.75)',
    textAlign: 'center',
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }
};
