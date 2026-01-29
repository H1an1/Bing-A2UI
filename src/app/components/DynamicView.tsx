/**
 * DynamicView Container - 默认使用 Dynamic View
 */

import React, { useState, useEffect, useCallback } from 'react';
import { TemplateType } from '../services/templateService';
import { searchImages } from '../services/googleSearchApi';
import { TemplateRenderer, TemplateSelector } from './TemplateRenderer';

interface DynamicViewProps {
  query: string;
  onNewSearch?: (query: string) => void;
}

type LoadingStage = 'idle' | 'loading' | 'done' | 'error';

export function DynamicView({ query, onNewSearch }: DynamicViewProps) {
  const [template, setTemplate] = useState<TemplateType>('interactive-view');
  const [images, setImages] = useState<string[]>([]);
  const [stage, setStage] = useState<LoadingStage>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showSwitch, setShowSwitch] = useState(false);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: ''
  });

  const handleImageClick = useCallback((imageUrl: string, title?: string) => {
    setLightbox({ isOpen: true, imageUrl, title: title || '' });
  }, []);

  const handleQueryClick = useCallback((newQuery: string) => {
    if (onNewSearch) onNewSearch(newQuery);
  }, [onNewSearch]);

  const handleTemplateChange = useCallback((newTemplate: TemplateType) => {
    setTemplate(newTemplate);
    setShowSwitch(false);
  }, []);

  // 加载流程
  useEffect(() => {
    if (!query) return;

    const load = async () => {
      setError(null);
      setImages([]);
      setStage('loading');

      try {
        // 生成 Picsum 图片（稳定、快速）
        const baseSeed = query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const picsumImages = Array.from({ length: 12 }, (_, i) => 
          `https://picsum.photos/seed/${baseSeed + i}/800/600`
        );
        
        let finalImages = picsumImages;

        // 尝试 Google 搜索（异步，不阻塞）
        try {
          const searchPromises = [query, `${query} photo`, `${query} beautiful`].map(q => 
            searchImages(q, 4).then(r => {
              console.log(`🔍 [DynamicView] Search results for "${q}":`, r.length, 'images');
              // Google Image Search API 返回的图片 URL 在 link 字段
              return r.map(img => {
                const url = img.link;
                console.log(`📷 [DynamicView] Image URL:`, url);
                return url;
              });
            }).catch((e) => {
              console.error(`❌ [DynamicView] Search failed for "${q}":`, e);
              return [];
            })
          );
          const results = await Promise.all(searchPromises);
          const googleImages = results.flat().filter(Boolean);
          
          console.log(`✅ [DynamicView] Total Google images:`, googleImages.length);
          console.log(`📷 [DynamicView] Google image URLs:`, googleImages);
          
          if (googleImages.length > 0) {
            // 用 Google 图片替换 Picsum 图片
            googleImages.forEach((img, i) => {
              if (img && i < finalImages.length) {
                finalImages[i] = img;
              }
            });
            console.log(`✅ [DynamicView] Final images (after Google replacement):`, finalImages);
          }
        } catch (e) {
          console.log('Google search failed, using Picsum', e);
        }
        
        setImages(finalImages);
        setStage('done');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStage('error');
      }
    };

    load();
  }, [query]);

  // 加载动画
  if (stage === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-indigo-500"></div>
        </div>
        <div className="mt-6 text-gray-600 font-medium">Creating your view...</div>
        <div className="mt-2 text-sm text-gray-400">{query}</div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <div className="font-medium text-lg">Something went wrong</div>
        <div className="text-sm mt-1">{error}</div>
        <button
          className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // 主视图
  return (
    <div className="dynamic-view relative">
      {/* 右上角切换按钮 */}
      <div className="absolute top-0 right-0 z-50">
        <button
          onClick={() => setShowSwitch(!showSwitch)}
          className="px-3 py-1.5 bg-black/5 hover:bg-black/10 text-gray-600 text-sm rounded-lg backdrop-blur-sm transition-all flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Switch View
        </button>
        
        {showSwitch && (
          <div className="absolute top-full right-0 mt-2 p-3 bg-white rounded-xl shadow-xl border border-gray-200 min-w-[200px]">
            <div className="text-xs text-gray-400 mb-2 font-medium">CHOOSE VIEW</div>
            <TemplateSelector
              selectedTemplate={template}
              onSelect={handleTemplateChange}
            />
          </div>
        )}
      </div>

      {/* 渲染 */}
      {stage === 'done' && (
        <TemplateRenderer
          templateType={template}
          aiResult={{
            template,
            confidence: 1,
            reason: '',
            title: query,
            description: '',
            imageQueries: [query],
            subItems: [],
            dynamicContent: {
              title: query,
              description: '',
              subItems: [],
              tags: [],
            },
          }}
          images={images}
          query={query}
          onImageClick={handleImageClick}
          onQueryClick={handleQueryClick}
        />
      )}

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox({ isOpen: false, imageUrl: '', title: '' })}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl"
            onClick={() => setLightbox({ isOpen: false, imageUrl: '', title: '' })}
          >
            ×
          </button>
          
          <div className="max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.imageUrl}
              alt={lightbox.title}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            {lightbox.title && (
              <div className="mt-4 text-center text-white text-lg max-w-lg mx-auto">
                {lightbox.title}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
