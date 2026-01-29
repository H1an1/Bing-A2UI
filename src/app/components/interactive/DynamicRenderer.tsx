/**
 * Dynamic Renderer - 根据 framework 渲染对应的交互式组件
 */

import React from 'react';
import { DynamicView } from '../../catalog/schema';
import {
  EntityBrowser,
  TimelineExplorer,
  StepGuide,
  TabbedSections,
  GridGallery,
} from './frameworks';

interface Props {
  view: DynamicView;
  onImageClick?: (url: string) => void;
}

export function DynamicRenderer({ view, onImageClick }: Props) {
  const framework = view.framework || 'grid-gallery';
  
  console.log('🎨 DynamicRenderer: Rendering framework:', framework);
  
  switch (framework) {
    case 'entity-browser':
      return <EntityBrowser view={view} onImageClick={onImageClick} />;
      
    case 'timeline-explorer':
      return <TimelineExplorer view={view} onImageClick={onImageClick} />;
      
    case 'step-guide':
      return <StepGuide view={view} onImageClick={onImageClick} />;
      
    case 'tabbed-sections':
      return <TabbedSections view={view} onImageClick={onImageClick} />;
      
    case 'comparison-view':
      // TODO: Implement comparison view
      return <EntityBrowser view={view} onImageClick={onImageClick} />;
      
    case 'grid-gallery':
    default:
      return <GridGallery view={view} onImageClick={onImageClick} />;
  }
}

export default DynamicRenderer;

