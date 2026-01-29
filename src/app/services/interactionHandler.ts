/**
 * Interaction Handler Service
 * 处理用户交互，根据交互意图执行相应动作
 */

import { InteractionIntent, analyzeInteractionIntent } from './intentDetection';

export interface InteractionEvent {
  componentName: string;
  elementType: string;
  elementData: any;
  timestamp: number;
}

export interface InteractionAction {
  type: 'view-large' | 'dive-into' | 'switch-view' | 'play-media' | 'navigate' | 'expand' | 'none';
  payload: any;
}

/**
 * 处理用户交互
 */
export function handleInteraction(
  event: InteractionEvent,
  onAction: (action: InteractionAction) => void
): void {
  const intent = analyzeInteractionIntent(
    event.componentName,
    event.elementType,
    event.elementData
  );

  const action = createActionFromIntent(intent, event);
  onAction(action);
}

/**
 * 根据意图创建动作
 */
function createActionFromIntent(
  intent: InteractionIntent,
  event: InteractionEvent
): InteractionAction {
  switch (intent) {
    case 'view-large':
      return {
        type: 'view-large',
        payload: {
          imageUrl: event.elementData.url || event.elementData.src || event.elementData,
          alt: event.elementData.alt || '',
          componentContext: event.componentName
        }
      };

    case 'dive-into':
      return {
        type: 'dive-into',
        payload: {
          query: event.elementData.title || event.elementData.text || event.elementData.name,
          context: {
            previousComponent: event.componentName,
            previousQuery: event.elementData.parentQuery
          }
        }
      };

    case 'switch-view':
      return {
        type: 'switch-view',
        payload: {
          viewType: event.elementData.viewType || event.elementData.name,
          componentName: event.componentName,
          data: event.elementData
        }
      };

    case 'play-media':
      return {
        type: 'play-media',
        payload: {
          mediaUrl: event.elementData.url || event.elementData.src,
          mediaType: event.elementData.type || 'video',
          componentName: event.componentName
        }
      };

    case 'navigate':
      return {
        type: 'navigate',
        payload: {
          url: event.elementData.url || event.elementData.href || event.elementData,
          openInNewTab: true
        }
      };

    case 'expand':
      return {
        type: 'expand',
        payload: {
          componentName: event.componentName,
          elementId: event.elementData.id,
          expandState: event.elementData.expanded || false
        }
      };

    case 'none':
    default:
      return {
        type: 'none',
        payload: {}
      };
  }
}

/**
 * 创建交互事件包装器
 * 为组件提供统一的交互处理接口
 */
export function createInteractionWrapper(
  componentName: string,
  onAction: (action: InteractionAction) => void
) {
  return {
    onImageClick: (imageData: any) => {
      handleInteraction(
        {
          componentName,
          elementType: 'image',
          elementData: imageData,
          timestamp: Date.now()
        },
        onAction
      );
    },
    
    onTitleClick: (titleData: any) => {
      handleInteraction(
        {
          componentName,
          elementType: 'title',
          elementData: titleData,
          timestamp: Date.now()
        },
        onAction
      );
    },
    
    onTagClick: (tagData: any) => {
      handleInteraction(
        {
          componentName,
          elementType: 'tag',
          elementData: tagData,
          timestamp: Date.now()
        },
        onAction
      );
    },
    
    onTabClick: (tabData: any) => {
      handleInteraction(
        {
          componentName,
          elementType: 'tab',
          elementData: tabData,
          timestamp: Date.now()
        },
        onAction
      );
    },
    
    onLinkClick: (linkData: any) => {
      handleInteraction(
        {
          componentName,
          elementType: 'link',
          elementData: linkData,
          timestamp: Date.now()
        },
        onAction
      );
    },
    
    onPlayClick: (mediaData: any) => {
      handleInteraction(
        {
          componentName,
          elementType: 'play-button',
          elementData: mediaData,
          timestamp: Date.now()
        },
        onAction
      );
    },
    
    onExpandClick: (expandData: any) => {
      handleInteraction(
        {
          componentName,
          elementType: 'expand-button',
          elementData: expandData,
          timestamp: Date.now()
        },
        onAction
      );
    }
  };
}

/**
 * Lightbox 状态管理
 */
export interface LightboxState {
  isOpen: boolean;
  imageUrl: string;
  alt: string;
  context?: string;
}

export const createLightboxState = () => {
  let state: LightboxState = {
    isOpen: false,
    imageUrl: '',
    alt: ''
  };

  return {
    getState: () => state,
    open: (imageUrl: string, alt: string = '', context?: string) => {
      state = { isOpen: true, imageUrl, alt, context };
    },
    close: () => {
      state = { isOpen: false, imageUrl: '', alt: '' };
    }
  };
};

