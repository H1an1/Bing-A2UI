/**
 * StepCard - 步骤教程模板 (108:54091)
 * 
 * 精确还原 Figma 设计：
 * - 顶部：进度条（黑色线段）
 * - 左侧：标题 + 长描述 + 标签按钮
 * - 右侧：1个大视频/图片 + 6个小图网格（2列x3行）
 * - 支持步骤切换交互
 */

import React, { useState } from 'react';

interface StepImage {
  url: string;
  isVideo?: boolean;
  duration?: string;
}

interface Step {
  title: string;
  content: string;
  images: StepImage[];
}

interface StepCardProps {
  steps: Step[];
  tags: string[];
  className?: string;
  onImageClick?: (url: string, index: number) => void;
  onTagClick?: (tag: string) => void;
}

export function StepCard({
  steps,
  tags,
  className = '',
  onImageClick,
  onTagClick
}: StepCardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [hoverImage, setHoverImage] = useState<number | null>(null);
  const [hoverTag, setHoverTag] = useState<number | null>(null);
  
  const totalSteps = steps.length;
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // 第一张是大图/视频，后面6张是小图
  const mainImage = step?.images?.[0];
  const gridImages = step?.images?.slice(1, 7) || [];

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1));
  };

  if (!step) return null;

  return (
    <div className={className} style={styles.container}>
      {/* 进度条 */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>

      {/* 主内容区 - 左右布局 */}
      <div style={styles.main}>
        {/* 左侧 - 文字内容 */}
        <div style={styles.leftContent}>
          <h2 style={styles.title}>Step {currentStep + 1}: {step.title}</h2>
          <p style={styles.description}>{step.content}</p>
          
          {/* 标签按钮 */}
          <div style={styles.tags}>
            {tags.map((tag, index) => (
              <button
                key={index}
                style={{
                  ...styles.tag,
                  background: hoverTag === index ? 'rgba(0,0,0,0.04)' : 'transparent',
                  borderColor: hoverTag === index ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)'
                }}
                onClick={() => onTagClick?.(tag)}
                onMouseEnter={() => setHoverTag(index)}
                onMouseLeave={() => setHoverTag(null)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 步骤导航按钮 */}
          <div style={styles.navigation}>
            <button 
              style={{
                ...styles.navButton,
                opacity: currentStep === 0 ? 0.4 : 1,
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
              }}
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 14L6 9L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </button>
            
            <span style={styles.stepIndicator}>
              {currentStep + 1} / {totalSteps}
            </span>
            
            <button 
              style={{
                ...styles.navButton,
                opacity: currentStep === totalSteps - 1 ? 0.4 : 1,
                cursor: currentStep === totalSteps - 1 ? 'not-allowed' : 'pointer'
              }}
              onClick={handleNext}
              disabled={currentStep === totalSteps - 1}
            >
              Next
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 14L12 9L7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 右侧 - 图片区域 */}
        <div style={styles.rightContent}>
          {/* 大图/视频 */}
          <div 
            style={{
              ...styles.mainImageWrapper,
              transform: hoverImage === 0 ? 'scale(1.01)' : 'scale(1)'
            }}
            onClick={() => onImageClick?.(mainImage?.url || '', 0)}
            onMouseEnter={() => setHoverImage(0)}
            onMouseLeave={() => setHoverImage(null)}
          >
            <img 
              src={mainImage?.url} 
              alt={`${step.title} main`}
              style={styles.mainImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/400/300?random=main';
              }}
            />
            
            {/* 时长标签 - 左上角 */}
            {mainImage?.isVideo && mainImage.duration && (
              <span style={styles.durationBadge}>{mainImage.duration}</span>
            )}
            
            {/* 播放按钮 - 中间 */}
            {mainImage?.isVideo && (
              <div style={styles.playButton}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.6)" />
                  <path d="M19 15L33 24L19 33V15Z" fill="white" />
                </svg>
              </div>
            )}

            {/* 视频标题覆盖层 */}
            {mainImage?.isVideo && (
              <div style={styles.videoOverlay}>
                <span style={styles.videoTitle}>Easy Apple Pie Recipe</span>
              </div>
            )}
          </div>

          {/* 小图网格 - 2列 x 3行 */}
          <div style={styles.gridWrapper}>
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const img = gridImages[index];
              return (
                <div
                  key={index}
                  style={{
                    ...styles.gridItem,
                    transform: hoverImage === index + 1 ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onClick={() => img && onImageClick?.(img.url, index + 1)}
                  onMouseEnter={() => setHoverImage(index + 1)}
                  onMouseLeave={() => setHoverImage(null)}
                >
                  {img ? (
                    <img 
                      src={img.url} 
                      alt={`Step ${currentStep + 1} image ${index + 2}`}
                      style={styles.gridImage}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/120/120?random=${index}`;
                      }}
                    />
                  ) : (
                    <div style={styles.placeholderImage} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// 固定尺寸
const MAIN_IMAGE_HEIGHT = 340;
const GRID_GAP = 8;
const GRID_ITEM_SIZE = (MAIN_IMAGE_HEIGHT - GRID_GAP * 2) / 3; // 3行

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: '#fff',
    borderRadius: '20px',
    padding: '24px 28px 28px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '1208px',
    margin: '0 auto'
  },

  // 进度条
  progressBar: {
    height: '4px',
    background: 'rgba(0,0,0,0.08)',
    borderRadius: '2px',
    marginBottom: '28px',
    overflow: 'hidden'
  },

  progressFill: {
    height: '100%',
    background: '#000',
    borderRadius: '2px',
    transition: 'width 0.4s ease'
  },

  // 主内容
  main: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start'
  },

  // 左侧文字区
  leftContent: {
    flex: '1 1 45%',
    maxWidth: '480px'
  },

  title: {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: 1.3,
    margin: '0 0 20px 0',
    color: '#000'
  },

  description: {
    fontSize: '15px',
    lineHeight: 1.75,
    color: 'rgba(0,0,0,0.65)',
    margin: '0 0 28px 0'
  },

  // 标签
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '24px'
  },

  tag: {
    padding: '10px 18px',
    background: 'transparent',
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'rgba(0,0,0,0.75)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },

  // 步骤导航
  navigation: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: '8px'
  },

  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    background: '#f5f5f5',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#333',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },

  stepIndicator: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'rgba(0,0,0,0.5)'
  },

  // 右侧图片区
  rightContent: {
    flex: '1 1 55%',
    display: 'flex',
    gap: '10px',
    height: `${MAIN_IMAGE_HEIGHT}px`
  },

  // 大图/视频
  mainImageWrapper: {
    position: 'relative',
    flex: '1 1 65%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    background: '#e8e8e8'
  },

  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },

  durationBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    padding: '5px 10px',
    background: 'rgba(0,0,0,0.75)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 500,
    borderRadius: '6px'
  },

  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.95,
    transition: 'opacity 0.2s, transform 0.2s'
  },

  videoOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '40px 16px 16px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
  },

  videoTitle: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 600,
    textShadow: '0 1px 3px rgba(0,0,0,0.3)'
  },

  // 小图网格 - 固定尺寸
  gridWrapper: {
    flex: '0 0 auto',
    display: 'grid',
    gridTemplateColumns: `repeat(2, ${GRID_ITEM_SIZE}px)`,
    gridTemplateRows: `repeat(3, ${GRID_ITEM_SIZE}px)`,
    gap: `${GRID_GAP}px`,
    height: '100%'
  },

  gridItem: {
    width: `${GRID_ITEM_SIZE}px`,
    height: `${GRID_ITEM_SIZE}px`,
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.25s ease',
    background: '#e8e8e8'
  },

  gridImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },

  placeholderImage: {
    width: '100%',
    height: '100%',
    background: '#e8e8e8'
  }
};