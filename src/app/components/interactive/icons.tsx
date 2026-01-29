/**
 * Interactive View SVG Icons
 * 
 * 替代 emoji，提供专业的 SVG 图标
 */

import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// ============================================================================
// App Type Icons
// ============================================================================

export function WhaleIcon({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4C7 4 3 8 3 12c0 2.5 1.5 4.5 3.5 5.5L5 21l3-2c1.2.6 2.6 1 4 1 5 0 9-4 9-8s-4-8-9-8z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="11" r="1" fill={color}/>
      <path d="M15 12c0 1.5-1.5 3-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function TimelineIcon({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12h18M3 12l4-4M3 12l4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="12" r="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="15" cy="12" r="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="21" cy="12" r="2" fill={color}/>
    </svg>
  );
}

export function LocationIcon({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={color} strokeWidth="1.5"/>
      <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

export function CompareIcon({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="7" height="16" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="14" y="4" width="7" height="16" rx="1" stroke={color} strokeWidth="1.5"/>
      <path d="M12 8v8M10 10l2-2 2 2M10 14l2 2 2-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function StepsIcon({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="6" cy="12" r="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="6" cy="18" r="2" stroke={color} strokeWidth="1.5"/>
      <path d="M10 6h10M10 12h10M10 18h10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function CategoryIcon({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5"/>
      <rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5"/>
      <rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5"/>
      <rect x="13" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

export function GalleryIcon({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="8.5" cy="8.5" r="1.5" fill={color}/>
      <path d="M21 15l-5-5L5 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ============================================================================
// Navigation Icons
// ============================================================================

export function ChevronRightIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronDownIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronUpIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 15l-6-6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ============================================================================
// Content Icons
// ============================================================================

export function InfoIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/>
      <path d="M12 8v.01M12 11v5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function LightbulbIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21h6M12 3a6 6 0 00-4 10.5V17h8v-3.5A6 6 0 0012 3z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function WarningIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

export function CheckIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function StarIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ClockIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/>
      <path d="M12 6v6l4 2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function RulerIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="10" width="18" height="4" rx="1" stroke={color} strokeWidth="1.5"/>
      <path d="M6 10v2M9 10v3M12 10v2M15 10v3M18 10v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function WeightIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3a3 3 0 00-3 3v1h6V6a3 3 0 00-3-3z" stroke={color} strokeWidth="1.5"/>
      <path d="M5 8h14l-1 13H6L5 8z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function HeartIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ImageIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="8.5" cy="8.5" r="1.5" stroke={color} strokeWidth="1.5"/>
      <path d="M21 15l-5-5L5 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ExpandIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TestTubeIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2v6l-5 10a3 3 0 002.83 4h10.34A3 3 0 0020 18L15 8V2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 2h6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 14h12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ThoughtIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="1" fill={color}/>
      <circle cx="12" cy="8" r="1.5" fill={color}/>
      <path d="M12 12c-4 0-7 2-7 5 0 2.5 2 4.5 5 5 .8.1 1.4.1 2 0 3-.5 5-2.5 5-5 0-3-3-5-7-5z" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

export function PaletteIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" stroke={color} strokeWidth="1.5"/>
      <circle cx="6.5" cy="11.5" r="1.5" fill={color}/>
      <circle cx="9.5" cy="7.5" r="1.5" fill={color}/>
      <circle cx="14.5" cy="7.5" r="1.5" fill={color}/>
      <circle cx="17.5" cy="11.5" r="1.5" fill={color}/>
    </svg>
  );
}

// ============================================================================
// Export all icons
// ============================================================================

export const Icons = {
  // App types
  whale: WhaleIcon,
  timeline: TimelineIcon,
  location: LocationIcon,
  compare: CompareIcon,
  steps: StepsIcon,
  category: CategoryIcon,
  gallery: GalleryIcon,
  palette: PaletteIcon,
  
  // Navigation
  chevronRight: ChevronRightIcon,
  chevronDown: ChevronDownIcon,
  chevronUp: ChevronUpIcon,
  
  // Content
  info: InfoIcon,
  lightbulb: LightbulbIcon,
  warning: WarningIcon,
  check: CheckIcon,
  star: StarIcon,
  clock: ClockIcon,
  ruler: RulerIcon,
  weight: WeightIcon,
  heart: HeartIcon,
  image: ImageIcon,
  expand: ExpandIcon,
  
  // Debug / misc
  testTube: TestTubeIcon,
  thought: ThoughtIcon,
};

export default Icons;

