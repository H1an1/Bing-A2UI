/**
 * Interactive Renderer - 交互式动态视图渲染引擎
 * 
 * 核心功能：
 * - 状态管理（activeId）
 * - 导航切换
 * - 动态面板渲染
 * - 内容块组合
 */

import React, { useState, useEffect, CSSProperties } from 'react';
import {
  InteractiveDynamicView,
  InteractiveRendererProps,
  ContentPanel,
  ContentBlock,
  Navigation,
  AppTheme,
  HeroContent,
  AccordionContent,
  ComparisonContent,
  SizeScaleContent,
} from './types';
import {
  TimelineNav,
  SidebarListNav,
  TabsNav,
  Accordion,
  HeroBlock,
  ComparisonBlock,
  SizeScaleBlock,
  FactBox,
  ImageGrid,
  StepNavigator,
  FreeformHtmlBlock,
} from './InteractiveComponents';
import { TestTubeIcon, ThoughtIcon } from './icons';

// ============================================================================
// 样式常量
// ============================================================================

const tokens = {
  fontFamily: "var(--bing-smtc-text-family, 'Roboto', -apple-system, sans-serif)",
  title1: { size: 'var(--bing-smtc-text-title1-size)', lineHeight: 'var(--bing-smtc-text-title1-lineheight)' },
  title2: { size: 'var(--bing-smtc-text-title2-size)', lineHeight: 'var(--bing-smtc-text-title2-lineheight)' },
  subtitle1: { size: 'var(--bing-smtc-text-subtitle1-strong-size)', lineHeight: 'var(--bing-smtc-text-subtitle1-strong-lineheight)' },
  body2: { size: 'var(--bing-smtc-text-body2-size)', lineHeight: 'var(--bing-smtc-text-body2-lineheight)' },
  body3: { size: 'var(--bing-smtc-text-body3-size)', lineHeight: 'var(--bing-smtc-text-body3-lineheight)' },
  caption1: { size: 'var(--bing-smtc-text-caption1-size)', lineHeight: 'var(--bing-smtc-text-caption1-lineheight)' },
  
  textPrimary: 'var(--smtc-foreground-content-neutral-primary)',
  textSecondary: 'var(--smtc-foreground-content-neutral-secondary)',
  textTertiary: 'var(--bing-smtc-foreground-content-neutral-tertiary)',
  textOnDark: 'var(--bing-smtc-foreground-content-white)',
  
  bgPrimary: 'var(--smtc-background-container-primary)',
  bgSecondary: 'var(--smtc-background-container-secondary)',
  bgCard: 'var(--smtc-background-card-on-primary-default-rest)',
  
  stroke: 'var(--smtc-stroke-content-neutral-secondary)',
  
  gapXs: 'var(--smtc-gap-between-content-x-small)',
  gapS: 'var(--smtc-gap-between-content-small)',
  gapM: 'var(--smtc-gap-between-content-medium)',
  gapL: 'var(--smtc-gap-between-content-x-large)',
  gapXl: 'var(--smtc-gap-between-content-xx-large)',
  
  padding: 'var(--mai-smtc-padding-card-default)',
  
  radiusM: 'var(--smtc-corner-ctrl-rest)',
  radiusL: 'var(--smtc-corner-card-rest)',
  
  elevation1: 'var(--acf-elevation-1)',
  elevation2: 'var(--acf-elevation-2)',
  
  transitionBase: 'var(--acf-transition-base, 200ms)',
  ease: 'var(--acf-transition-ease, cubic-bezier(0.4, 0, 0.2, 1))',
};

// ============================================================================
// Navigation Renderer
// ============================================================================

interface NavRendererProps {
  navigation: Navigation;
  activeId: string;
  onSelect: (id: string) => void;
  images: string[];
  theme: AppTheme;
}

function NavigationRenderer({ navigation, activeId, onSelect, images, theme }: NavRendererProps) {
  const { type, items } = navigation;
  
  switch (type) {
    case 'timeline':
      return (
        <TimelineNav
          items={items}
          activeId={activeId}
          onSelect={onSelect}
          accentColor={theme.accent || '#d4a84b'}
        />
      );
    
    case 'sidebar-list':
      return (
        <SidebarListNav
          items={items}
          activeId={activeId}
          onSelect={onSelect}
          images={images}
          theme={theme.mode}
        />
      );
    
    case 'top-tabs':
    case 'category-tabs':
      return (
        <TabsNav
          items={items}
          activeId={activeId}
          onSelect={onSelect}
          variant="underline"
          accentColor={theme.accent || '#c41e3a'}
        />
      );
    
    case 'top-nav':
      return (
        <TabsNav
          items={items}
          activeId={activeId}
          onSelect={onSelect}
          variant="pills"
          accentColor={theme.accent}
        />
      );
    
    case 'step-list':
      return (
        <StepNavigator
          steps={items.map(i => ({ id: i.id, title: i.label, subtitle: i.sublabel }))}
          activeId={activeId}
          onSelect={onSelect}
          accentColor={theme.accent || '#f59e0b'}
        />
      );
    
    case 'card-select':
      return (
        <div style={{ display: 'flex', gap: tokens.gapM, flexWrap: 'wrap' }}>
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                padding: tokens.gapM,
                background: activeId === item.id ? tokens.bgSecondary : tokens.bgCard,
                border: `2px solid ${activeId === item.id ? (theme.accent || '#3b82f6') : 'transparent'}`,
                borderRadius: tokens.radiusL,
                cursor: 'pointer',
                textAlign: 'left',
                minWidth: '150px',
              }}
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail || images[i]}
                  alt={item.label}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: tokens.radiusM,
                    marginBottom: tokens.gapS,
                  }}
                />
              )}
              <div style={{ fontSize: tokens.body3.size, fontWeight: 600, color: tokens.textPrimary }}>
                {item.label}
              </div>
              {item.sublabel && (
                <div style={{ fontSize: tokens.caption1.size, color: tokens.textTertiary }}>
                  {item.sublabel}
                </div>
              )}
            </button>
          ))}
        </div>
      );
    
    default:
      return null;
  }
}

// ============================================================================
// Content Block Renderer
// ============================================================================

interface BlockRendererProps {
  block: ContentBlock;
  images: string[];
  imageIndex: number;
  theme: AppTheme;
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
}

function ContentBlockRenderer({ block, images, imageIndex, theme, onImageClick, onQueryClick }: BlockRendererProps) {
  // Safety checks
  if (!block) {
    console.warn('ContentBlockRenderer: received undefined block');
    return null;
  }
  
  const { type, content, style = {} } = block;
  
  if (!type || !content) {
    console.warn('ContentBlockRenderer: block missing type or content', block);
    return null;
  }
  
  const isDark = theme?.mode === 'dark';
  
  const blockStyle: CSSProperties = {
    gridArea: block.gridArea,
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };
  
  switch (type) {
    case 'hero':
      return (
        <div style={blockStyle}>
          <HeroBlock
            content={content as HeroContent}
            imageUrl={images?.[imageIndex]}
            height="60vh"
          />
        </div>
      );
    
    case 'title-section':
      return (
        <div style={{ ...blockStyle, marginBottom: tokens.gapL }}>
          {content.overline && (
            <div style={{
              fontSize: tokens.caption1.size,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: theme.accent || '#c41e3a',
              marginBottom: tokens.gapXs,
            }}>
              {content.overline}
            </div>
          )}
          <h2 style={{
            fontSize: tokens.title1.size,
            lineHeight: tokens.title1.lineHeight,
            fontWeight: 700,
            color: isDark ? tokens.textOnDark : tokens.textPrimary,
            margin: 0,
          }}>
            {content.title}
          </h2>
          {content.description && (
            <p style={{
              fontSize: tokens.body2.size,
              lineHeight: tokens.body2.lineHeight,
              color: isDark ? 'rgba(255,255,255,0.8)' : tokens.textSecondary,
              marginTop: tokens.gapS,
              marginBottom: 0,
            }}>
              {content.description}
            </p>
          )}
        </div>
      );
    
    case 'image-single':
      const imgUrl = content.url || images[imageIndex];
      return (
        <div
          style={{
            ...blockStyle,
            position: 'relative',
            borderRadius: tokens.radiusL,
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => onImageClick?.(imgUrl, content.title)}
        >
          <img
            src={imgUrl}
            alt={content.title || 'Image'}
            style={{
              width: '100%',
              height: content.height || '400px',
              objectFit: 'cover',
            }}
          />
          {content.caption && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: tokens.gapM,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              color: tokens.textOnDark,
              fontSize: tokens.caption1.size,
              fontStyle: 'italic',
            }}>
              "{content.caption}"
            </div>
          )}
        </div>
      );
    
    case 'image-grid':
      // 只有当 content.images 有实际内容时才使用它，否则用传入的 images 数组
      const hasContentImages = content.images && content.images.length > 0;
      const gridImages = hasContentImages 
        ? content.images 
        : images.slice(imageIndex, imageIndex + (content.count || 6)).map((url, i) => ({
            url,
            title: `Image ${i + 1}`,
            subtitle: '',
          }));
      
      console.log('🖼️ ImageGrid:', { 
        hasContentImages, 
        gridImagesCount: gridImages.length, 
        totalImagesAvailable: images.length,
        imageIndex 
      });
      
      return (
        <div style={blockStyle}>
          <ImageGrid
            images={gridImages}
            columns={content.columns || 3}
            onImageClick={onImageClick}
          />
        </div>
      );
    
    case 'text-body':
      return (
        <div style={{
          ...blockStyle,
          fontSize: tokens.body2.size,
          lineHeight: tokens.body2.lineHeight,
          color: isDark ? 'rgba(255,255,255,0.9)' : tokens.textSecondary,
        }}>
          {content.text}
          {content.highlight && (
            <div style={{
              marginTop: tokens.gapM,
              padding: tokens.gapM,
              background: isDark ? 'rgba(255,193,7,0.1)' : '#fffbe6',
              borderLeft: '4px solid #ffc107',
              borderRadius: `0 ${tokens.radiusM} ${tokens.radiusM} 0`,
            }}>
              <strong style={{ color: '#f59e0b' }}>💡 {content.highlight.title}</strong>
              <p style={{ margin: `${tokens.gapXs} 0 0`, fontSize: tokens.body3.size }}>
                {content.highlight.text}
              </p>
            </div>
          )}
        </div>
      );
    
    case 'accordion':
      return (
        <div style={blockStyle}>
          <Accordion
            items={(content as AccordionContent).items}
            allowMultiple={content.allowMultiple}
          />
        </div>
      );
    
    case 'fact-box':
      return (
        <div style={blockStyle}>
          <FactBox
            icon={content.icon}
            title={content.title}
            content={content.text}
            variant={content.variant || 'info'}
          />
        </div>
      );
    
    case 'comparison':
      return (
        <div style={blockStyle}>
          <ComparisonBlock
            content={content as ComparisonContent}
            images={images.slice(imageIndex, imageIndex + 2)}
          />
        </div>
      );
    
    case 'size-scale':
      return (
        <div style={{
          ...blockStyle,
          background: isDark ? 'rgba(255,255,255,0.05)' : tokens.bgSecondary,
          padding: tokens.padding,
          borderRadius: tokens.radiusL,
        }}>
          {content.title && (
            <h4 style={{
              fontSize: tokens.subtitle1.size,
              fontWeight: 700,
              color: isDark ? tokens.textOnDark : tokens.textPrimary,
              marginBottom: tokens.gapM,
            }}>
              {content.title}
            </h4>
          )}
          {content.description && (
            <p style={{
              fontSize: tokens.caption1.size,
              color: isDark ? 'rgba(255,255,255,0.6)' : tokens.textTertiary,
              marginBottom: tokens.gapM,
            }}>
              {content.description}
            </p>
          )}
          <SizeScaleBlock content={content as SizeScaleContent} />
        </div>
      );
    
    case 'stats':
      return (
        <div style={{
          ...blockStyle,
          display: 'grid',
          gridTemplateColumns: `repeat(${content.columns || 3}, 1fr)`,
          gap: tokens.gapM,
        }}>
          {content.items?.map((stat: any, i: number) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: tokens.gapM,
                background: isDark ? 'rgba(255,255,255,0.05)' : tokens.bgCard,
                borderRadius: tokens.radiusM,
              }}
            >
              {stat.icon && <div style={{ fontSize: '24px', marginBottom: tokens.gapXs }}>{stat.icon}</div>}
              <div style={{
                fontSize: tokens.title2.size,
                fontWeight: 700,
                color: theme.accent || (isDark ? '#00d4ff' : '#3b82f6'),
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: tokens.caption1.size,
                color: isDark ? 'rgba(255,255,255,0.6)' : tokens.textTertiary,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      );
    
    case 'badges':
      return (
        <div style={{
          ...blockStyle,
          display: 'flex',
          flexWrap: 'wrap',
          gap: tokens.gapS,
        }}>
          {content.items?.map((badge: any, i: number) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: tokens.gapXs,
                padding: `${tokens.gapXs} ${tokens.gapS}`,
                background: isDark ? 'rgba(255,255,255,0.1)' : tokens.bgSecondary,
                borderRadius: tokens.radiusM,
                fontSize: tokens.caption1.size,
                color: isDark ? tokens.textOnDark : tokens.textPrimary,
              }}
            >
              {badge.icon && <span>{badge.icon}</span>}
              {badge.label}
            </span>
          ))}
        </div>
      );
    
    case 'tags':
      return (
        <div style={{
          ...blockStyle,
          display: 'flex',
          flexWrap: 'wrap',
          gap: tokens.gapXs,
        }}>
          {content.tags?.map((tag: string, i: number) => (
            <button
              key={i}
              onClick={() => onQueryClick?.(tag)}
              style={{
                padding: `${tokens.gapXs} ${tokens.gapS}`,
                background: 'transparent',
                border: `1px solid ${tokens.stroke}`,
                borderRadius: '9999px',
                fontSize: tokens.caption1.size,
                color: theme.accent || '#3b82f6',
                cursor: 'pointer',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      );
    
    case 'feature-list':
      return (
        <div style={{
          ...blockStyle,
          background: isDark ? 'rgba(255,255,255,0.05)' : tokens.bgCard,
          borderRadius: tokens.radiusL,
          padding: tokens.padding,
          boxShadow: tokens.elevation1,
        }}>
          {content.title && (
            <h4 style={{
              fontSize: tokens.subtitle1.size,
              fontWeight: 700,
              color: isDark ? tokens.textOnDark : tokens.textPrimary,
              marginBottom: tokens.gapM,
              display: 'flex',
              alignItems: 'center',
              gap: tokens.gapXs,
            }}>
              {content.icon && <span>{content.icon}</span>}
              {content.title}
            </h4>
          )}
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {content.items?.map((item: any, i: number) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: tokens.gapS,
                  padding: `${tokens.gapXs} 0`,
                  fontSize: tokens.body3.size,
                  color: isDark ? 'rgba(255,255,255,0.8)' : tokens.textSecondary,
                }}
              >
                <span style={{ color: theme.accent || '#22c55e' }}>•</span>
                {item.label || item}
              </li>
            ))}
          </ul>
        </div>
      );
    
    case 'freeform-html':
      // AI 完全自由创作的 HTML/CSS
      return (
        <div style={{ ...blockStyle, overflow: 'hidden' }}>
          <FreeformHtmlBlock
            html={content.html || ''}
            css={content.css || ''}
            images={images}
          />
        </div>
      );
    
    case 'step-list':
      // AI 可能把 step-list 当成内容块用了，渲染为有序列表
      const steps = content.items || content.steps || [];
      return (
        <div style={blockStyle}>
          <ol style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            counterReset: 'step',
          }}>
            {steps.map((step: any, i: number) => (
              <li key={i} style={{
                display: 'flex',
                gap: tokens.gapM,
                padding: `${tokens.gapM} 0`,
                borderBottom: i < steps.length - 1 ? `1px solid ${tokens.stroke}` : 'none',
              }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  background: theme.accent || '#3b82f6',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: tokens.caption1.size,
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <div>
                  <div style={{
                    fontSize: tokens.body3.size,
                    fontWeight: 600,
                    color: isDark ? tokens.textOnDark : tokens.textPrimary,
                  }}>
                    {step.title || step.label || step}
                  </div>
                  {step.description && (
                    <div style={{
                      fontSize: tokens.caption1.size,
                      color: isDark ? 'rgba(255,255,255,0.6)' : tokens.textTertiary,
                      marginTop: tokens.gapXs,
                    }}>
                      {step.description}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    
    default:
      console.warn(`Unknown content block type: ${type}`);
      return null;
  }
}

// ============================================================================
// Panel Renderer
// ============================================================================

interface PanelRendererProps {
  panel: ContentPanel;
  images: string[];
  theme: AppTheme;
  onImageClick?: (url: string, title?: string) => void;
  onQueryClick?: (query: string) => void;
}

function PanelRenderer({ panel, images, theme, onImageClick, onQueryClick }: PanelRendererProps) {
  // Safety checks
  if (!panel) {
    console.warn('PanelRenderer: received undefined panel');
    return null;
  }
  
  const safeBlocks = panel.blocks || [];
  const safeImages = images || [];
  const safeTheme = theme || { mode: 'light' };
  
  const panelTheme = { ...safeTheme, ...panel.theme };
  
  const getLayoutStyle = (): CSSProperties => {
    switch (panel.layout) {
      case 'hero-sidebar':
        return {
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: tokens.gapL,
        };
      case 'sidebar-main':
        return {
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: tokens.gapL,
        };
      case 'split':
        return {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: tokens.gapL,
        };
      case 'grid':
        return {
          display: 'grid',
          gridTemplateColumns: panel.gridTemplate || 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: tokens.gapM,
        };
      case 'full-width':
      default:
        return {
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.gapL,
        };
    }
  };
  
  return (
    <div style={{
      ...getLayoutStyle(),
      isolation: 'isolate',  // Create new stacking context
    }}>
      {safeBlocks.map((block, i) => (
        <ContentBlockRenderer
          key={block?.id || i}
          block={block}
          images={safeImages}
          imageIndex={i}
          theme={panelTheme}
          onImageClick={onImageClick}
          onQueryClick={onQueryClick}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Main Renderer
// ============================================================================

export function InteractiveRenderer({
  view,
  images,
  onQueryClick,
  onImageClick,
  showDebugInfo = false,
}: InteractiveRendererProps) {
  // Safety check for view
  const safeView = view || {} as InteractiveDynamicView;
  const safeInitialState = safeView.initialState || { activeId: 'default' };
  const safeNavigation = safeView.navigation || { type: 'top-tabs', position: 'top', items: [] };
  const safePanels = safeView.panels || {};
  const safeTheme = safeView.theme || { mode: 'light' };
  const safeImages = images || [];
  
  const [activeId, setActiveId] = useState(safeInitialState.activeId);
  const [state, setState] = useState(safeInitialState);
  
  // 当 view 变化时重置状态
  useEffect(() => {
    if (view?.initialState?.activeId) {
      setActiveId(view.initialState.activeId);
      setState(view.initialState);
    }
  }, [view]);
  
  const activePanel = safePanels[activeId];
  const isDark = safeTheme.mode === 'dark';
  
  // 获取容器样式
  const getContainerStyle = (): CSSProperties => {
    return {
      fontFamily: tokens.fontFamily,
      background: isDark ? '#0f172a' : tokens.bgPrimary,
      color: isDark ? tokens.textOnDark : tokens.textPrimary,
      minHeight: '100vh',
    };
  };
  
  // 获取主内容区布局
  const getMainLayoutStyle = (): CSSProperties => {
    const nav = safeNavigation;
    
    if (nav.position === 'left' && safeView.sidebar?.position !== 'left') {
      return {
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: tokens.gapL,
      };
    }
    
    if (nav.position === 'right' || safeView.sidebar?.position === 'right') {
      return {
        display: 'grid',
        gridTemplateColumns: `1fr ${safeView.sidebar?.width || '300px'}`,
        gap: tokens.gapL,
      };
    }
    
    return {};
  };
  
  return (
    <div style={getContainerStyle()}>
      {/* Debug Info */}
      {showDebugInfo && (
        <div style={{
          padding: tokens.gapM,
          background: 'rgba(99, 102, 241, 0.1)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.gapS }}>
            <TestTubeIcon size={18} color="#6366f1" />
            <strong>Interactive Dynamic View</strong>
            <span style={{ opacity: 0.6 }}>|</span>
            <span>Type: {safeView.appType || 'unknown'}</span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span>Active: {activeId}</span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span>Panels: {Object.keys(safePanels).length}</span>
          </div>
          {safeView.reasoning && (
            <p style={{ margin: `${tokens.gapXs} 0 0`, fontSize: tokens.caption1.size, opacity: 0.8, display: 'flex', alignItems: 'center', gap: tokens.gapXs }}>
              <ThoughtIcon size={16} color="#6366f1" />
              {safeView.reasoning}
            </p>
          )}
        </div>
      )}
      
      {/* Header */}
      {safeView.header && (
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${tokens.gapS} ${tokens.gapL}`,
          background: isDark ? 'rgba(255,255,255,0.05)' : tokens.bgCard,
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : tokens.stroke}`,
        }}>
          {safeView.header.logo && (
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.gapXs }}>
              <span style={{ fontSize: '24px' }}>{safeView.header.logo.icon}</span>
              <span style={{ fontSize: tokens.subtitle1.size, fontWeight: 700 }}>
                {safeView.header.logo.text}
              </span>
            </div>
          )}
          
          {safeView.header.navItems && (
            <nav style={{ display: 'flex', gap: tokens.gapL }}>
              {safeView.header.navItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onQueryClick?.(item.action)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: tokens.body3.size,
                    color: isDark ? 'rgba(255,255,255,0.8)' : tokens.textSecondary,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
          
          {safeView.header.trailing && (
            <span style={{ fontSize: tokens.caption1.size, color: tokens.textTertiary }}>
              {safeView.header.trailing}
            </span>
          )}
        </header>
      )}
      
      {/* Top Navigation */}
      {(safeNavigation.position === 'top') && (
        <div style={{
          padding: `${tokens.gapM} ${tokens.gapL}`,
          background: isDark ? 'transparent' : tokens.bgCard,
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : tokens.stroke}`,
        }}>
          <NavigationRenderer
            navigation={safeNavigation}
            activeId={activeId}
            onSelect={setActiveId}
            images={safeImages}
            theme={safeTheme}
          />
        </div>
      )}
      
      {/* Main Content */}
      <div style={{
        padding: safeNavigation.position === 'bottom' ? 0 : tokens.gapL,
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        ...getMainLayoutStyle(),
      }}>
        {/* Left Navigation */}
        {safeNavigation.position === 'left' && (
          <aside style={{
            padding: tokens.gapM,
            background: isDark ? 'rgba(255,255,255,0.03)' : tokens.bgSecondary,
            borderRadius: tokens.radiusL,
            height: 'fit-content',
            position: 'relative',
            zIndex: 1,
          }}>
            <NavigationRenderer
              navigation={safeNavigation}
              activeId={activeId}
              onSelect={setActiveId}
              images={safeImages}
              theme={safeTheme}
            />
            
            {/* Sidebar fact box if present */}
            {safeView.sidebar && safeView.sidebar.position === 'left' && (
              <div style={{ marginTop: tokens.gapL }}>
                {(safeView.sidebar.blocks || []).map((block, i) => (
                  <ContentBlockRenderer
                    key={block?.id || i}
                    block={block}
                    images={safeImages}
                    imageIndex={i}
                    theme={safeTheme}
                    onImageClick={onImageClick}
                    onQueryClick={onQueryClick}
                  />
                ))}
              </div>
            )}
          </aside>
        )}
        
        {/* Main Panel */}
        <main style={{ 
          flex: 1, 
          minWidth: 0,
          position: 'relative',
          zIndex: 2,
        }}>
          {activePanel ? (
            <PanelRenderer
              panel={activePanel}
              images={safeImages}
              theme={safeTheme}
              onImageClick={onImageClick}
              onQueryClick={onQueryClick}
            />
          ) : (
            <div style={{
              padding: tokens.gapXl,
              textAlign: 'center',
              color: tokens.textTertiary,
            }}>
              No content for "{activeId}"
            </div>
          )}
        </main>
        
        {/* Right Sidebar */}
        {safeView.sidebar && safeView.sidebar.position === 'right' && (
          <aside style={{
            padding: tokens.gapM,
            background: isDark ? 'rgba(255,255,255,0.03)' : tokens.bgSecondary,
            borderRadius: tokens.radiusL,
            height: 'fit-content',
          }}>
            {(safeView.sidebar.blocks || []).map((block, i) => (
              <ContentBlockRenderer
                key={block?.id || i}
                block={block}
                images={safeImages}
                imageIndex={i}
                theme={safeTheme}
                onImageClick={onImageClick}
                onQueryClick={onQueryClick}
              />
            ))}
          </aside>
        )}
      </div>
      
      {/* Bottom Navigation */}
      {safeNavigation.position === 'bottom' && (
        <div style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 100,
          padding: `${tokens.gapS} ${tokens.gapL}`,
          background: isDark 
            ? 'linear-gradient(to top, rgba(15,23,42,0.98), rgba(15,23,42,0.95))'
            : 'linear-gradient(to top, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
          backdropFilter: 'blur(12px)',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : tokens.stroke}`,
        }}>
          <NavigationRenderer
            navigation={safeNavigation}
            activeId={activeId}
            onSelect={setActiveId}
            images={safeImages}
            theme={safeTheme}
          />
        </div>
      )}
      
      {/* Footer */}
      {safeView.footer && (
        <footer style={{
          padding: tokens.gapL,
          background: isDark ? 'rgba(255,255,255,0.03)' : tokens.bgSecondary,
          marginTop: tokens.gapXl,
        }}>
          {(safeView.footer.blocks || []).map((block, i) => (
            <ContentBlockRenderer
              key={block?.id || i}
              block={block}
              images={safeImages}
              imageIndex={i}
              theme={safeTheme}
              onImageClick={onImageClick}
              onQueryClick={onQueryClick}
            />
          ))}
        </footer>
      )}
    </div>
  );
}

export default InteractiveRenderer;

