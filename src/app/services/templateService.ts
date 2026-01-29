/**
 * Template Service - AI-driven template selection service
 * 
 * Uses Gemini AI to analyze query intent and select the most appropriate template
 * With retry mechanism and timeout control
 */

// Gemini API 配置 - 从环境变量读取
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// 配置
const AI_TIMEOUT = 15000;  // 15秒超时
const MAX_RETRIES = 2;     // 最多重试2次

// 模板类型定义
export type TemplateType = 
  | 'timeline-gallery'
  | 'timeline-arc'
  | 'timeline-grid'
  | 'step-card'
  | 'location-card'
  | 'entity-detail'
  | 'visual-explorer'
  | 'a2ui-dynamic'       // 8th option - AI dynamically composes UI modules
  | 'ai-canvas'          // 9th option - AI Generative Canvas (激进模板)
  | 'semantic-a2ui'      // 10th option - Semantic A2UI (最大自由度 + Token 约束)
  | 'interactive-view'   // 11th option - Interactive Dynamic View (像 Gemini!)
  | 'freeform-canvas';   // 12th option - 完全自由！AI 直接生成 HTML/CSS

// 模板配置
export interface TemplateConfig {
  type: TemplateType;
  title: string;
  description: string;
  imageCount: number;
  imageQueries: string[];
}

// AI 返回的结果
export interface AITemplateResult {
  template: TemplateType;
  reason: string;
  dynamicContent: {
    title: string;
    description: string;
    subItems?: string[];
    tags?: string[];
  };
  imageQueries: string[];
}

// AI Prompt - Simplified version for faster response, ALL ENGLISH output
const TEMPLATE_SELECTION_PROMPT = `Select the most appropriate UI template and generate content. ALL OUTPUT MUST BE IN ENGLISH.

Template options (choose the BEST fit):
- timeline-gallery: Artist works, art movements, historical evolution (e.g., "Picasso Blue Period")
- step-card: Recipes, tutorials, DIY, step-by-step guides (e.g., "how to make apple pie")
- location-card: City travel, attractions, landmarks (e.g., "Kyoto temples", "Paris attractions")
- entity-detail: Single product/animal/object details (e.g., "iPhone 15", "humpback whale")
- visual-explorer: Design styles, architecture types, category comparison (e.g., "types of chairs")
- a2ui-dynamic: Use this for:
  * Multi-faceted queries that need BOTH visual gallery AND detailed info (e.g., "exploring ocean wildlife")
  * Comparison queries (e.g., "cats vs dogs")
  * Queries that don't fit well into other templates
  * When you want to showcase content from multiple perspectives
- ai-canvas: Use this for RADICAL/CREATIVE presentations:
  * Entertainment queries (movies, music, games) - cinematic magazine layout
  * Visual-heavy content that deserves dramatic presentation
  * When you want maximum visual impact with dynamic grid layouts
  * Complex topics that benefit from information-dense magazine-style display
- semantic-a2ui: Use this for MAXIMUM AI CREATIVITY with design system constraints:
  * When you want complete freedom to design unique layouts
  * Abstract concepts that need creative visualization
  * Exploratory queries where standard templates feel limiting
  * When you want to experiment with novel UI compositions
  * Best for: "exploring AI art", "understanding quantum physics", "future of technology"
- interactive-view: Use this for INTERACTIVE EXPLORATION like Gemini Dynamic View:
  * Content with multiple aspects to explore (e.g., "whale species", "Picasso periods")
  * Guides and explorations with navigation (e.g., "Kyoto travel guide")
  * Comparisons with side-by-side views
  * Step-by-step content with progress tracking
  * Best for: queries where users want to INTERACT and EXPLORE, not just read
- freeform-canvas: Use this for TOTAL CREATIVE FREEDOM - AI generates raw HTML/CSS:
  * When you want to create something completely unique
  * Experimental visualizations and data displays
  * Complex interactive experiences
  * When all other templates feel too restrictive
  * Best for: "visualize solar system", "explain machine learning", creative presentations

Return JSON (no code blocks), ALL IN ENGLISH:
{"template":"template_name","reason":"brief reason in English","dynamicContent":{"title":"Title in English","description":"Description in English (2-3 sentences)","subItems":["Item 1","Item 2","Item 3","Item 4","Item 5"],"tags":["Tag 1","Tag 2"]},"imageQueries":["search term 1","search term 2","search term 3","search term 4","search term 5","search term 6","search term 7","search term 8"]}

Query: `;

/**
 * 带超时的 fetch
 */
async function fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * 使用 AI 检测最合适的模板（带重试）
 */
export async function detectTemplateWithAI(query: string): Promise<AITemplateResult> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`🔄 Retry attempt ${attempt}/${MAX_RETRIES}...`);
        await new Promise(r => setTimeout(r, 1000)); // 等待1秒后重试
      }
      
      console.log('🤖 AI analyzing query:', query);
      
      const response = await fetchWithTimeout(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: TEMPLATE_SELECTION_PROMPT + query }] }],
            generationConfig: {
              temperature: 0.3,  // 低温度，更稳定
              maxOutputTokens: 512
            }
          })
        },
        AI_TIMEOUT
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      console.log('🤖 AI response received');

      // 解析 JSON
      const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const result: AITemplateResult = JSON.parse(cleanJson);

      // 验证模板类型
      const validTemplates: TemplateType[] = [
        'timeline-gallery', 'timeline-arc', 'timeline-grid',
        'step-card', 'location-card', 'entity-detail', 'visual-explorer',
        'a2ui-dynamic', 'ai-canvas', 'semantic-a2ui'
      ];
      
      if (!validTemplates.includes(result.template)) {
        result.template = 'entity-detail';
      }

      console.log('✅ AI selected:', result.template, '-', result.reason);
      return result;

    } catch (error) {
      lastError = error as Error;
      console.warn(`⚠️ Attempt ${attempt + 1} failed:`, lastError.message);
    }
  }

  // 所有重试都失败，使用关键词匹配
  console.log('❌ AI failed after retries, using keyword fallback');
  return getFallbackResult(query);
}

/**
 * 备用方案：关键词匹配（增强版）
 */
function getFallbackResult(query: string): AITemplateResult {
  const template = detectTemplateByKeywords(query);
  const mainTopic = extractMainTopic(query);
  
  return {
    template,
    reason: 'Keyword matching',
    dynamicContent: {
      title: mainTopic,
      description: generateDescription(mainTopic, template),
      subItems: generateDefaultSubItems(template, mainTopic),
      tags: generateTags(mainTopic, template)
    },
    imageQueries: generateImageQueries(query, template)
  };
}

/**
 * 关键词匹配
 */
function detectTemplateByKeywords(query: string): TemplateType {
  const q = query.toLowerCase();
  
  // 艺术相关
  if (/art|artist|painting|painter|period|picasso|monet|van gogh|renaissance|impressioni|艺术|画家|绘画|梵高|莫奈/.test(q)) {
    return 'timeline-gallery';
  }
  
  // 教程/食谱
  if (/how to|recipe|tutorial|step|make|cook|bake|diy|guide|如何|食谱|教程|做法|制作/.test(q)) {
    return 'step-card';
  }
  
  // 地点/旅游
  if (/city|travel|visit|tour|landmark|temple|tower|museum|旅游|城市|景点|旅行|参观/.test(q)) {
    return 'location-card';
  }
  
  // 分类/风格
  if (/types? of|styles?|design|architecture|种类|类型|风格|建筑|设计/.test(q)) {
    return 'visual-explorer';
  }
  
  // 默认：实体详情
  return 'entity-detail';
}

/**
 * 生成描述
 */
function generateDescription(topic: string, template: TemplateType): string {
  const descriptions: Record<TemplateType, string> = {
    'timeline-gallery': `Explore the artistic journey and masterpieces of ${topic}. Discover different periods and styles that defined this remarkable body of work.`,
    'timeline-arc': `A curated collection showcasing the evolution of ${topic} through time.`,
    'timeline-grid': `Browse through the extensive gallery of ${topic} artworks.`,
    'step-card': `Follow this detailed guide to ${topic}. Each step is carefully explained with visual instructions to help you succeed.`,
    'location-card': `Discover the beauty and culture of ${topic}. Explore iconic landmarks, hidden gems, and must-visit attractions.`,
    'entity-detail': `Learn everything about ${topic}. Explore detailed specifications, features, history, and related topics.`,
    'visual-explorer': `Explore different types and styles of ${topic}. Compare variations and find inspiration for your needs.`,
    'a2ui-dynamic': `Discover ${topic} through an AI-composed dynamic visual experience. Explore multiple perspectives, comparisons, and curated content.`,
    'ai-canvas': `Experience ${topic} through a revolutionary magazine-style canvas. Immersive visuals, dynamic layouts, and cinematic presentation.`,
    'semantic-a2ui': `Explore ${topic} through a uniquely AI-designed experience. Maximum creative freedom with perfect design consistency.`
  };
  return descriptions[template];
}

/**
 * 生成默认子项目
 */
function generateDefaultSubItems(template: TemplateType, topic: string): string[] {
  switch (template) {
    case 'timeline-gallery':
    case 'timeline-arc':
    case 'timeline-grid':
      return ['Early Period', 'Development Phase', 'Peak Period', 'Late Works', 'Legacy'];
    case 'step-card':
      return ['Preparation', 'Key Techniques', 'Pro Tips'];
    case 'location-card':
      return [`${topic} Landmark`, `Historic Site`, `Local Attraction`, `Scenic View`, `Cultural Spot`];
    case 'entity-detail':
      return ['Overview', 'Specifications', 'Features', 'History', 'Gallery'];
    case 'visual-explorer':
      return ['Traditional Style', 'Modern Style', 'Classic Design', 'Contemporary'];
    case 'a2ui-dynamic':
      return ['Highlights', 'Gallery', 'Details', 'Related', 'Explore More'];
    case 'ai-canvas':
      return ['Featured', 'Spotlight', 'Collection', 'Showcase', 'Highlights', 'Gallery'];
    case 'semantic-a2ui':
      return ['Overview', 'Explore', 'Discover', 'Learn', 'Gallery', 'Related'];
    default:
      return [];
  }
}

/**
 * 生成标签
 */
function generateTags(topic: string, template: TemplateType): string[] {
  const base = [topic];
  switch (template) {
    case 'timeline-gallery':
      return [...base, 'Art', 'Gallery', 'Collection'];
    case 'step-card':
      return [...base, 'Tutorial', 'Guide', 'DIY'];
    case 'location-card':
      return [...base, 'Travel', 'Tourism', 'Explore'];
    case 'entity-detail':
      return [...base, 'Details', 'Info', 'Specs'];
    case 'visual-explorer':
      return [...base, 'Types', 'Styles', 'Design'];
    case 'a2ui-dynamic':
      return [...base, 'Explore', 'Discover', 'Visual'];
    case 'ai-canvas':
      return [...base, 'Cinematic', 'Visual', 'Magazine', 'Featured'];
    case 'semantic-a2ui':
      return [...base, 'Creative', 'AI-Designed', 'Unique', 'Explore'];
    default:
      return base;
  }
}

/**
 * 提取主题词
 */
function extractMainTopic(query: string): string {
  return query
    .replace(/images?\s*(of)?/gi, '')
    .replace(/pictures?\s*(of)?/gi, '')
    .replace(/how\s+to\s+(make|cook|bake)?/gi, '')
    .replace(/types?\s+of/gi, '')
    .replace(/recipe\s+for/gi, '')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * 生成图片搜索查询
 */
function generateImageQueries(query: string, template: TemplateType): string[] {
  const clean = query.replace(/images?\s*(of)?/gi, '').trim();
  const base = [clean, `${clean} photo`, `${clean} picture`];
  
  const extras: Record<TemplateType, string[]> = {
    'timeline-gallery': ['artwork', 'painting', 'gallery', 'masterpiece', 'famous'],
    'timeline-arc': ['artwork', 'collection', 'series'],
    'timeline-grid': ['artwork', 'gallery', 'collection'],
    'step-card': ['tutorial', 'step by step', 'ingredients', 'process', 'result'],
    'location-card': ['landmark', 'scenic', 'aerial view', 'tourist', 'attraction'],
    'entity-detail': ['detail', 'close up', 'front view', 'side view', 'action'],
    'visual-explorer': ['type 1', 'type 2', 'traditional', 'modern', 'style'],
    'a2ui-dynamic': ['highlight', 'feature', 'gallery', 'detail', 'overview', 'collection', 'famous', 'popular'],
    'ai-canvas': ['cinematic', 'dramatic', 'featured', 'spotlight', 'hero', 'poster', 'magazine', 'editorial'],
    'semantic-a2ui': ['creative', 'artistic', 'visual', 'design', 'concept', 'abstract', 'innovative', 'unique']
  };
  
  return [...base, ...extras[template].map(e => `${clean} ${e}`)];
}

/**
 * 根据 AI 结果生成模板配置
 */
export function generateTemplateConfig(aiResult: AITemplateResult): TemplateConfig {
  return {
    type: aiResult.template,
    title: aiResult.dynamicContent.title,
    description: aiResult.dynamicContent.description,
    imageCount: aiResult.imageQueries.length,
    imageQueries: aiResult.imageQueries
  };
}
