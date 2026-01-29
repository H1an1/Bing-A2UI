/**
 * Interactive Components - 交互式组件库
 * 
 * 这些组件支持状态切换、用户交互、动态内容更新
 */

import React, { useState, useEffect, CSSProperties } from 'react';
import {
  Navigation,
  NavigationItem,
  ContentBlock,
  HeroContent,
  AccordionContent,
  ComparisonContent,
  SizeScaleContent,
  InteractiveImageContent,
  CalculatorContent,
  AppTheme,
} from './types';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InfoIcon,
  LightbulbIcon,
  WarningIcon,
  CheckIcon,
  ImageIcon,
} from './icons';

// ============================================================================
// 样式工具
// ============================================================================

const tokens = {
  // Typography
  fontFamily: "var(--bing-smtc-text-family, 'Roboto', -apple-system, sans-serif)",
  display1: { size: 'var(--bing-smtc-text-display1-size)', lineHeight: 'var(--bing-smtc-text-display1-lineheight)' },
  title1: { size: 'var(--bing-smtc-text-title1-size)', lineHeight: 'var(--bing-smtc-text-title1-lineheight)' },
  title2: { size: 'var(--bing-smtc-text-title2-size)', lineHeight: 'var(--bing-smtc-text-title2-lineheight)' },
  subtitle1: { size: 'var(--bing-smtc-text-subtitle1-strong-size)', lineHeight: 'var(--bing-smtc-text-subtitle1-strong-lineheight)' },
  body1: { size: 'var(--bing-smtc-text-body1-size)', lineHeight: 'var(--bing-smtc-text-body1-lineheight)' },
  body2: { size: 'var(--bing-smtc-text-body2-size)', lineHeight: 'var(--bing-smtc-text-body2-lineheight)' },
  body3: { size: 'var(--bing-smtc-text-body3-size)', lineHeight: 'var(--bing-smtc-text-body3-lineheight)' },
  caption1: { size: 'var(--bing-smtc-text-caption1-size)', lineHeight: 'var(--bing-smtc-text-caption1-lineheight)' },
  
  // Colors
  textPrimary: 'var(--smtc-foreground-content-neutral-primary)',
  textSecondary: 'var(--smtc-foreground-content-neutral-secondary)',
  textTertiary: 'var(--bing-smtc-foreground-content-neutral-tertiary)',
  textOnDark: 'var(--bing-smtc-foreground-content-white)',
  
  bgPrimary: 'var(--smtc-background-container-primary)',
  bgSecondary: 'var(--smtc-background-container-secondary)',
  bgTertiary: 'var(--smtc-background-container-tertiary)',
  bgCard: 'var(--smtc-background-card-on-primary-default-rest)',
  bgCardHover: 'var(--smtc-background-card-on-primary-default-hover)',
  
  ctrlBrand: 'var(--smtc-background-ctrl-brand-rest)',
  ctrlBrandHover: 'var(--smtc-background-ctrl-brand-hover)',
  ctrlNeutral: 'var(--bing-smtc-background-ctrl-neutral-rest)',
  ctrlSubtle: 'var(--smtc-background-ctrl-subtle-rest)',
  
  stroke: 'var(--smtc-stroke-content-neutral-secondary)',
  strokeLight: 'var(--smtc-stroke-content-neutral-tertiary)',
  
  // Spacing
  gap2xs: 'var(--smtc-gap-between-content-2xs)',
  gapXs: 'var(--smtc-gap-between-content-x-small)',
  gapS: 'var(--smtc-gap-between-content-small)',
  gapM: 'var(--smtc-gap-between-content-medium)',
  gapL: 'var(--smtc-gap-between-content-x-large)',
  gapXl: 'var(--smtc-gap-between-content-xx-large)',
  
  padding: 'var(--mai-smtc-padding-card-default)',
  
  // Border radius
  radiusS: 'var(--smtc-corner-ctrl-sm-rest)',
  radiusM: 'var(--smtc-corner-ctrl-rest)',
  radiusL: 'var(--smtc-corner-card-rest)',
  radiusInfinite: 'var(--smtc-corner-ctrl-infinite)',
  
  // Shadows
  elevation0: 'var(--acf-elevation-0)',
  elevation1: 'var(--acf-elevation-1)',
  elevation2: 'var(--acf-elevation-2)',
  elevation3: 'var(--acf-elevation-3)',
  
  // Transitions
  transitionFast: 'var(--acf-transition-fast, 150ms)',
  transitionBase: 'var(--acf-transition-base, 200ms)',
  ease: 'var(--acf-transition-ease, cubic-bezier(0.4, 0, 0.2, 1))',
};

// ============================================================================
// Timeline Navigation (底部时间线 - Picasso style)
// ============================================================================

interface TimelineNavProps {
  items: NavigationItem[];
  activeId: string;
  onSelect: (id: string) => void;
  accentColor?: string;
}

export function TimelineNav({ items, activeId, onSelect, accentColor = '#d4a84b' }: TimelineNavProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.gapL,
      padding: `${tokens.gapL} 0`,
      position: 'relative',
    }}>
      {/* 连接线 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        right: '10%',
        height: '2px',
        background: 'rgba(255,255,255,0.2)',
        transform: 'translateY(-12px)',
      }} />
      
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: tokens.gapXs,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: tokens.gapS,
              transition: `all ${tokens.transitionBase} ${tokens.ease}`,
              opacity: isActive ? 1 : 0.6,
            }}
          >
            {/* 圆点 */}
            <div style={{
              width: isActive ? '16px' : '10px',
              height: isActive ? '16px' : '10px',
              borderRadius: '50%',
              background: isActive ? accentColor : 'rgba(255,255,255,0.4)',
              border: isActive ? `3px solid ${accentColor}` : 'none',
              boxShadow: isActive ? `0 0 12px ${accentColor}` : 'none',
              transition: `all ${tokens.transitionBase} ${tokens.ease}`,
            }} />
            
            {/* 年份 */}
            <span style={{
              fontSize: tokens.body3.size,
              fontWeight: isActive ? 700 : 400,
              color: tokens.textOnDark,
            }}>
              {item.label}
            </span>
            
            {/* 副标题 */}
            {item.sublabel && (
              <span style={{
                fontSize: tokens.caption1.size,
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {item.sublabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Sidebar List Navigation (侧边列表 - Whale style)
// ============================================================================

interface SidebarListNavProps {
  items: NavigationItem[];
  activeId: string;
  onSelect: (id: string) => void;
  images?: string[];
  theme?: 'light' | 'dark';
}

export function SidebarListNav({ items, activeId, onSelect, images = [], theme = 'dark' }: SidebarListNavProps) {
  const isDark = theme === 'dark';
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.gapXs,
    }}>
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.gapM,
              padding: tokens.gapS,
              background: isActive 
                ? (isDark ? 'rgba(255,255,255,0.1)' : tokens.bgSecondary)
                : 'transparent',
              border: 'none',
              borderRadius: tokens.radiusM,
              cursor: 'pointer',
              transition: `all ${tokens.transitionBase} ${tokens.ease}`,
              textAlign: 'left',
            }}
          >
            {/* 缩略图 */}
            {(item.thumbnail || images[index]) && (
              <img
                src={item.thumbnail || images[index]}
                alt={item.label}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: isActive ? '2px solid #00d4ff' : '2px solid transparent',
                }}
              />
            )}
            
            {/* 文字 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: tokens.body3.size,
                fontWeight: isActive ? 700 : 400,
                color: isDark ? tokens.textOnDark : tokens.textPrimary,
              }}>
                {item.label}
              </div>
              {item.sublabel && (
                <div style={{
                  fontSize: tokens.caption1.size,
                  color: isDark ? 'rgba(255,255,255,0.6)' : tokens.textTertiary,
                }}>
                  {item.sublabel}
                </div>
              )}
            </div>
            
            {/* 箭头 */}
            <ChevronRightIcon 
              size={18} 
              color={isActive ? '#00d4ff' : (isDark ? 'rgba(255,255,255,0.4)' : tokens.textTertiary)}
            />
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Tabs Navigation (顶部标签)
// ============================================================================

interface TabsNavProps {
  items: NavigationItem[];
  activeId: string;
  onSelect: (id: string) => void;
  variant?: 'underline' | 'filled' | 'pills';
  accentColor?: string;
}

export function TabsNav({ items, activeId, onSelect, variant = 'underline', accentColor = '#c41e3a' }: TabsNavProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: variant === 'pills' ? tokens.gapS : tokens.gapL,
      borderBottom: variant === 'underline' ? `1px solid ${tokens.stroke}` : 'none',
    }}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        
        const baseStyle: CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          gap: tokens.gapXs,
          padding: variant === 'pills' 
            ? `${tokens.gapXs} ${tokens.gapM}` 
            : `${tokens.gapS} 0`,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: `all ${tokens.transitionBase} ${tokens.ease}`,
          fontSize: tokens.body3.size,
          fontWeight: isActive ? 700 : 400,
        };
        
        const variantStyles: Record<string, CSSProperties> = {
          underline: {
            color: isActive ? accentColor : tokens.textSecondary,
            borderBottom: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
            marginBottom: '-1px',
          },
          filled: {
            color: isActive ? tokens.textOnDark : tokens.textSecondary,
            background: isActive ? accentColor : 'transparent',
            borderRadius: tokens.radiusM,
          },
          pills: {
            color: isActive ? accentColor : tokens.textSecondary,
            background: isActive ? `${accentColor}15` : 'transparent',
            borderRadius: tokens.radiusInfinite,
            border: isActive ? `1px solid ${accentColor}` : '1px solid transparent',
          },
        };
        
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{ ...baseStyle, ...variantStyles[variant] }}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Accordion (可展开列表)
// ============================================================================

interface AccordionProps {
  items: AccordionContent['items'];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(items.filter(i => i.defaultOpen).map(i => i.id))
  );
  
  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.gapXs,
    }}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            style={{
              border: `1px solid ${tokens.stroke}`,
              borderRadius: tokens.radiusM,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => toggle(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: tokens.gapS,
                padding: tokens.gapM,
                background: tokens.bgCard,
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {item.icon && (
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
              )}
              <span style={{
                flex: 1,
                fontSize: tokens.body2.size,
                fontWeight: 500,
                color: tokens.textPrimary,
              }}>
                {item.title}
              </span>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: `transform ${tokens.transitionBase} ${tokens.ease}`,
              }}>
                <ChevronDownIcon size={16} color={tokens.textTertiary} />
              </span>
            </button>
            
            {isOpen && (
              <div style={{
                padding: `0 ${tokens.gapM} ${tokens.gapM}`,
                fontSize: tokens.body3.size,
                lineHeight: tokens.body3.lineHeight,
                color: tokens.textSecondary,
              }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// Hero Block (全屏背景图)
// ============================================================================

interface HeroBlockProps {
  content: HeroContent;
  imageUrl?: string;
  height?: string;
}

export function HeroBlock({ content, imageUrl, height = '100vh' }: HeroBlockProps) {
  // Safety check for content
  if (!content) {
    return (
      <div style={{ height, background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white' }}>Loading...</span>
      </div>
    );
  }
  
  const bgImage = content.imageUrl || imageUrl;
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height,
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      isolation: 'isolate',  // Create new stacking context
    }}>
      {/* 背景图 */}
      {bgImage && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      )}
      
      {/* 渐变遮罩 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: content.overlay === 'dark' 
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
          : content.overlay === 'light'
          ? 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.7))'
          : content.overlay === 'gradient'
          ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)'
          : 'none',
      }} />
      
      {/* 内容 */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: tokens.gapXl,
        maxWidth: '800px',
      }}>
        {/* Overline */}
        {content.overline && (
          <div style={{
            fontSize: tokens.caption1.size,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: tokens.gapS,
          }}>
            {content.overline}
          </div>
        )}
        
        {/* Title */}
        <h1 style={{
          fontSize: tokens.display1.size,
          lineHeight: tokens.display1.lineHeight,
          fontWeight: 700,
          color: tokens.textOnDark,
          margin: 0,
          fontFamily: 'Georgia, serif',
        }}>
          {content.title}
        </h1>
        
        {/* Subtitle */}
        {content.subtitle && (
          <p style={{
            fontSize: tokens.body1.size,
            lineHeight: tokens.body1.lineHeight,
            color: 'rgba(255,255,255,0.9)',
            marginTop: tokens.gapM,
            marginBottom: 0,
          }}>
            {content.subtitle}
          </p>
        )}
        
        {/* Badges */}
        {content.badges && content.badges.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: tokens.gapS,
            marginTop: tokens.gapL,
          }}>
            {content.badges.map((badge, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: tokens.gapXs,
                  padding: `${tokens.gapXs} ${tokens.gapS}`,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: tokens.radiusInfinite,
                  fontSize: tokens.caption1.size,
                  color: tokens.textOnDark,
                }}
              >
                {badge.icon && <span>{badge.icon}</span>}
                {badge.label}
              </span>
            ))}
          </div>
        )}
        
        {/* CTAs */}
        {content.cta && content.cta.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: tokens.gapM,
            marginTop: tokens.gapL,
          }}>
            {content.cta.map((btn, i) => (
              <button
                key={i}
                style={{
                  padding: `${tokens.gapS} ${tokens.gapL}`,
                  background: btn.variant === 'primary' ? '#c41e3a' : 'rgba(255,255,255,0.15)',
                  color: tokens.textOnDark,
                  border: 'none',
                  borderRadius: tokens.radiusInfinite,
                  fontSize: tokens.body3.size,
                  fontWeight: 500,
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Comparison Block (并排对比)
// ============================================================================

interface ComparisonBlockProps {
  content: ComparisonContent;
  images?: string[];
}

export function ComparisonBlock({ content, images = [] }: ComparisonBlockProps) {
  // 安全获取 left 和 right
  const left = content?.left || { title: 'Item A' };
  const right = content?.right || { title: 'Item B' };
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: tokens.gapL,
      alignItems: 'start',
    }}>
      {/* Left */}
      <div style={{
        background: tokens.bgCard,
        borderRadius: tokens.radiusL,
        overflow: 'hidden',
        boxShadow: tokens.elevation1,
      }}>
        {(left.imageUrl || images[0]) && (
          <img
            src={left.imageUrl || images[0]}
            alt={left.title || 'Left item'}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        )}
        <div style={{ padding: tokens.padding }}>
          <h3 style={{
            fontSize: tokens.title2.size,
            fontWeight: 700,
            color: tokens.textPrimary,
            margin: 0,
          }}>
            {left.title || 'Item A'}
          </h3>
          {left.subtitle && (
            <p style={{
              fontSize: tokens.body3.size,
              color: tokens.textTertiary,
              margin: `${tokens.gapXs} 0 0`,
            }}>
              {left.subtitle}
            </p>
          )}
          {left.features && Array.isArray(left.features) && (
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: `${tokens.gapM} 0 0`,
            }}>
              {left.features.map((f: any, i: number) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.gapXs,
                  fontSize: tokens.body3.size,
                  color: tokens.textSecondary,
                  padding: `${tokens.gap2xs} 0`,
                }}>
                  <span style={{ color: '#22c55e' }}>✓</span>
                  {f?.label || f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* VS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        background: tokens.bgSecondary,
        borderRadius: '50%',
        fontSize: tokens.body3.size,
        fontWeight: 700,
        color: tokens.textTertiary,
        marginTop: '120px',
      }}>
        VS
      </div>
      
      {/* Right */}
      <div style={{
        background: tokens.bgCard,
        borderRadius: tokens.radiusL,
        overflow: 'hidden',
        boxShadow: tokens.elevation1,
      }}>
        {(right.imageUrl || images[1]) && (
          <img
            src={right.imageUrl || images[1]}
            alt={right.title || 'Right item'}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        )}
        <div style={{ padding: tokens.padding }}>
          <h3 style={{
            fontSize: tokens.title2.size,
            fontWeight: 700,
            color: tokens.textPrimary,
            margin: 0,
          }}>
            {right.title || 'Item B'}
          </h3>
          {right.subtitle && (
            <p style={{
              fontSize: tokens.body3.size,
              color: tokens.textTertiary,
              margin: `${tokens.gapXs} 0 0`,
            }}>
              {right.subtitle}
            </p>
          )}
          {right.features && Array.isArray(right.features) && (
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: `${tokens.gapM} 0 0`,
            }}>
              {right.features.map((f: any, i: number) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.gapXs,
                  fontSize: tokens.body3.size,
                  color: tokens.textSecondary,
                  padding: `${tokens.gap2xs} 0`,
                }}>
                  <span style={{ color: '#3b82f6' }}>✓</span>
                  {f?.label || f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Size Scale Block (大小对比条)
// ============================================================================

interface SizeScaleBlockProps {
  content: SizeScaleContent;
}

export function SizeScaleBlock({ content }: SizeScaleBlockProps) {
  const max = content.maxValue || Math.max(...content.items.map(i => i.value));
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.gapM,
    }}>
      {content.items.map((item, i) => (
        <div key={i}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: tokens.gapXs,
          }}>
            <span style={{
              fontSize: tokens.body3.size,
              fontWeight: 500,
              color: item.color || '#00d4ff',
            }}>
              {item.label}
            </span>
            <span style={{
              fontSize: tokens.body3.size,
              color: item.color || '#00d4ff',
            }}>
              {item.value}{item.unit}
            </span>
          </div>
          <div style={{
            height: '8px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: tokens.radiusS,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${(item.value / max) * 100}%`,
              height: '100%',
              background: item.color || '#00d4ff',
              borderRadius: tokens.radiusS,
              transition: `width ${tokens.transitionBase} ${tokens.ease}`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Fact Box (事实框)
// ============================================================================

interface FactBoxProps {
  icon?: string;
  title: string;
  content: string;
  variant?: 'info' | 'tip' | 'warning';
}

export function FactBox({ icon, title, content, variant = 'info' }: FactBoxProps) {
  const colors = {
    info: { bg: 'rgba(0,212,255,0.1)', border: '#00d4ff' },
    tip: { bg: 'rgba(255,193,7,0.1)', border: '#ffc107' },
    warning: { bg: 'rgba(255,87,34,0.1)', border: '#ff5722' },
  };
  
  const c = colors[variant];
  
  // Get icon component based on variant
  const IconComponent = variant === 'info' ? InfoIcon : variant === 'tip' ? LightbulbIcon : WarningIcon;
  
  return (
    <div style={{
      background: c.bg,
      borderLeft: `4px solid ${c.border}`,
      borderRadius: `0 ${tokens.radiusM} ${tokens.radiusM} 0`,
      padding: tokens.gapM,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.gapXs,
        marginBottom: tokens.gapXs,
      }}>
        <IconComponent size={18} color={c.border} />
        <span style={{
          fontSize: tokens.body3.size,
          fontWeight: 700,
          color: c.border,
        }}>
          {title}
        </span>
      </div>
      <p style={{
        margin: 0,
        fontSize: tokens.body3.size,
        lineHeight: tokens.body3.lineHeight,
        color: tokens.textOnDark,
        fontStyle: 'italic',
      }}>
        {content}
      </p>
    </div>
  );
}

// ============================================================================
// Image Grid (图片网格)
// ============================================================================

interface ImageGridProps {
  images: Array<{ url: string; title: string; subtitle?: string }>;
  columns?: number;
  onImageClick?: (url: string, title: string) => void;
}

export function ImageGrid({ images, columns = 3, onImageClick }: ImageGridProps) {
  // 过滤掉没有有效 URL 的图片
  const validImages = (images || []).filter(img => img && img.url);
  
  if (validImages.length === 0) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: tokens.gapM,
      }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              aspectRatio: '4/3',
              borderRadius: tokens.radiusL,
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              fontSize: '14px',
            }}
          >
            No image
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: tokens.gapM,
    }}>
      {validImages.map((img, i) => (
        <div
          key={i}
          onClick={() => onImageClick?.(img.url, img.title)}
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            borderRadius: tokens.radiusL,
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: tokens.elevation1,
          }}
        >
          <img
            src={img.url}
            alt={img.title || 'Image'}
            onError={(e) => {
              // 图片加载失败时显示占位符
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.style.background = 
                'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)';
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: `transform ${tokens.transitionBase} ${tokens.ease}`,
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: tokens.gapM,
          }}>
            <div style={{
              fontSize: tokens.body2.size,
              fontWeight: 700,
              color: tokens.textOnDark,
            }}>
              {img.title}
            </div>
            {img.subtitle && (
              <div style={{
                fontSize: tokens.caption1.size,
                color: 'rgba(255,255,255,0.8)',
              }}>
                {img.subtitle}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Step Navigator (步骤导航)
// ============================================================================

interface StepNavigatorProps {
  steps: Array<{ id: string; title: string; subtitle?: string }>;
  activeId: string;
  onSelect: (id: string) => void;
  accentColor?: string;
}

export function StepNavigator({ steps, activeId, onSelect, accentColor = '#f59e0b' }: StepNavigatorProps) {
  const activeIndex = steps.findIndex(s => s.id === activeId);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.gap2xs,
    }}>
      {steps.map((step, i) => {
        const isActive = step.id === activeId;
        const isPast = i < activeIndex;
        
        return (
          <button
            key={step.id}
            onClick={() => onSelect(step.id)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: tokens.gapS,
              padding: tokens.gapS,
              background: 'transparent',
              border: 'none',
              borderLeft: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              transition: `all ${tokens.transitionBase} ${tokens.ease}`,
            }}
          >
            <div style={{
              fontSize: tokens.body3.size,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? accentColor : (isPast ? tokens.textTertiary : tokens.textSecondary),
            }}>
              <div>{step.title}</div>
              {step.subtitle && (
                <div style={{
                  fontSize: tokens.caption1.size,
                  fontWeight: 400,
                  color: tokens.textTertiary,
                  marginTop: tokens.gap2xs,
                }}>
                  {step.subtitle}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Freeform HTML Block (AI 完全自由创作)
// ============================================================================

interface FreeformHtmlBlockProps {
  html: string;
  css?: string;
  images?: string[];
}

export function FreeformHtmlBlock({ html, css = '', images = [] }: FreeformHtmlBlockProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shadowRootRef = React.useRef<ShadowRoot | null>(null);
  
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    // 创建 Shadow DOM
    if (!shadowRootRef.current) {
      shadowRootRef.current = containerRef.current.attachShadow({ mode: 'open' });
    }
    
    const shadow = shadowRootRef.current;
    
    // 处理图片占位符
    let processedHtml = html;
    images.forEach((url, i) => {
      processedHtml = processedHtml
        .replace(new RegExp(`\\{\\{image${i}\\}\\}`, 'g'), url)
        .replace(new RegExp(`\\{\\{IMAGE_${i}\\}\\}`, 'g'), url);
    });
    
    // 安全处理：移除 script 和内联事件
    processedHtml = processedHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '');
    
    // ACF Tokens CSS
    const tokensCss = `
      :host {
        --smtc-foreground-content-neutral-primary: #1a1a1a;
        --smtc-foreground-content-neutral-secondary: #5f5f5f;
        --bing-smtc-foreground-content-neutral-tertiary: #8f8f8f;
        --bing-smtc-foreground-content-white: #ffffff;
        --smtc-foreground-content-accent-primary: #0078d4;
        --smtc-background-container-primary: #ffffff;
        --smtc-background-container-secondary: #f5f5f5;
        --smtc-stroke-content-neutral-secondary: #e0e0e0;
        --smtc-gap-between-content-x-small: 4px;
        --smtc-gap-between-content-small: 8px;
        --smtc-gap-between-content-medium: 16px;
        --smtc-gap-between-content-x-large: 24px;
        --smtc-corner-ctrl-rest: 8px;
        --smtc-corner-card-rest: 12px;
        --bing-smtc-text-family: 'Roboto', -apple-system, sans-serif;
        --acf-transition-base: 200ms;
        display: block;
        font-family: var(--bing-smtc-text-family);
      }
      .freeform-content * { box-sizing: border-box; }
      .freeform-content img { max-width: 100%; height: auto; }
    `;
    
    // 注入到 Shadow DOM
    shadow.innerHTML = `
      <style>${tokensCss}${css}</style>
      <div class="freeform-content">${processedHtml}</div>
    `;
  }, [html, css, images]);
  
  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '100px',
        borderRadius: tokens.radiusL,
        overflow: 'hidden',
      }}
    />
  );
}

// ============================================================================
// Export all
// ============================================================================

export const InteractiveComponents = {
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
};

export default InteractiveComponents;

