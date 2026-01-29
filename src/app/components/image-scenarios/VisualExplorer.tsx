/**
 * VisualExplorer - 视觉分类探索模板 (108:54208)
 * 
 * 精确还原 Figma 设计：
 * - 标题行 "Explore ... visually >" + 分页点
 * - 多个 Category 行（每个是独立卡片）
 *   - 左侧：Category 名称 + 描述 + Sources
 *   - 右侧：图片 carousel（可滚动）
 */

import React, { useState, useRef } from 'react';

interface Source {
  name: string;
  icon?: string;
}

interface Category {
  title: string;
  subtitle?: string;
  description: string;
  sources?: Source[];
  images: string[];
}

interface VisualExplorerProps {
  pageTitle: string;
  categories: Category[];
  className?: string;
  onTitleClick?: () => void;
  onCategoryClick?: (category: Category, index: number) => void;
  onImageClick?: (imageUrl: string, categoryIndex: number, imageIndex: number) => void;
}

export function VisualExplorer({
  pageTitle,
  categories,
  className = '',
  onTitleClick,
  onCategoryClick,
  onImageClick
}: VisualExplorerProps) {
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = (index: number, direction: 'left' | 'right') => {
    const container = scrollRefs.current[index];
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
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

      {/* Category 列表 */}
      <div style={styles.categoryList}>
        {categories.map((category, catIndex) => (
          <div key={catIndex} style={styles.categoryCard}>
            {/* 左侧 - Category 信息 */}
            <div style={styles.categoryInfo}>
              {/* 顶部：标题 */}
              <div style={styles.infoTop}>
                <h2 
                  style={styles.categoryTitle}
                  onClick={() => onCategoryClick?.(category, catIndex)}
                >
                  {category.title}
                  {category.subtitle && <span style={styles.categorySubtitle}> - {category.subtitle}</span>}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: '4px', flexShrink: 0 }}>
                    <path d="M4 9L7 6L4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </h2>
                
                <p style={styles.categoryDesc}>{category.description}</p>
              </div>
              
              {/* 底部：Sources */}
              <div style={styles.sourcesRow}>
                <div style={styles.sourceIcons}>
                  {[0, 1].map(i => (
                    <div 
                      key={i} 
                      style={{
                        ...styles.sourceIcon,
                        marginLeft: i > 0 ? '-6px' : 0,
                        zIndex: 2 - i,
                        background: i === 0 ? '#4285f4' : '#34a853'
                      }}
                    />
                  ))}
                </div>
                <span style={styles.sourcesBadge}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
                    <path d="M5 3V7M3 5H7" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                  {category.sources?.length || 4} Sources
                </span>
              </div>
            </div>

            {/* 右侧 - 图片 Carousel */}
            <div style={styles.carouselWrapper}>
              <div 
                ref={el => scrollRefs.current[catIndex] = el}
                style={styles.carousel}
              >
                {category.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    style={{
                      ...styles.imageCard,
                      transform: hoverImage === `${catIndex}-${imgIndex}` ? 'scale(1.03)' : 'scale(1)'
                    }}
                    onClick={() => onImageClick?.(img, catIndex, imgIndex)}
                    onMouseEnter={() => setHoverImage(`${catIndex}-${imgIndex}`)}
                    onMouseLeave={() => setHoverImage(null)}
                  >
                    <img 
                      src={img} 
                      alt={`${category.title} ${imgIndex + 1}`}
                      style={styles.image}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/160/120?random=${catIndex}-${imgIndex}`;
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* 滚动箭头 */}
              <button 
                style={styles.scrollButton}
                onClick={() => handleScroll(catIndex, 'right')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 固定尺寸
const CARD_HEIGHT = 200;
const CARD_PADDING = 16;
const IMAGE_HEIGHT = CARD_HEIGHT - CARD_PADDING * 2; // 168px - 图片高度 = 卡片高度 - 上下padding
const INFO_WIDTH = 220;

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
    marginBottom: '20px'
  },

  pageTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 700,
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

  // Category 列表
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  // 每个 Category 卡片 - 固定高度 200px
  categoryCard: {
    display: 'flex',
    gap: '20px',
    padding: `${CARD_PADDING}px`,
    background: '#fafafa',
    borderRadius: '16px',
    alignItems: 'stretch',
    height: `${CARD_HEIGHT}px`,
    boxSizing: 'border-box'
  },

  // 左侧信息区 - responsive 内容
  categoryInfo: {
    width: `${INFO_WIDTH}px`,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: '100%'
  },

  infoTop: {
    flex: 1,
    overflow: 'hidden'
  },

  categoryTitle: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 10px 0',
    color: '#000',
    cursor: 'pointer',
    lineHeight: 1.4
  },

  categorySubtitle: {
    fontWeight: 400,
    color: 'rgba(0,0,0,0.7)'
  },

  categoryDesc: {
    fontSize: '13px',
    lineHeight: 1.55,
    color: 'rgba(0,0,0,0.6)',
    margin: '0',
    flex: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical'
  },

  // Sources
  sourcesRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    flexShrink: 0
  },

  sourceIcons: {
    display: 'flex',
    alignItems: 'center'
  },

  sourceIcon: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: '2px solid #fff',
    position: 'relative'
  },

  sourcesBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    background: '#fff',
    borderRadius: '12px',
    fontSize: '11px',
    color: 'rgba(0,0,0,0.6)',
    fontWeight: 500,
    border: '1px solid rgba(0,0,0,0.08)'
  },

  // Carousel 区域 - 填满剩余高度
  carouselWrapper: {
    flex: 1,
    position: 'relative',
    minWidth: 0,
    height: '100%'
  },

  carousel: {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    paddingRight: '40px',
    height: '100%',
    alignItems: 'stretch'
  },

  // 图片卡片 - 高度填满容器
  imageCard: {
    flexShrink: 0,
    width: '200px',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    background: '#e8e8e8'
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  // 滚动按钮
  scrollButton: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.1)',
    background: 'rgba(255,255,255,0.95)',
    color: 'rgba(0,0,0,0.6)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s'
  }
};

// 隐藏滚动条的 CSS（需要通过 style 标签注入）
const hideScrollbarCSS = `
  .visual-explorer-carousel::-webkit-scrollbar {
    display: none;
  }
`;
