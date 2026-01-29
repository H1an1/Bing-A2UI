/**
 * Search API Service
 * 支持 Google Custom Search API 和 Unsplash 图片 API
 */

// Google Custom Search API 配置 - 从环境变量读取
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const SEARCH_ENGINE_ID = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID || '';

export interface GoogleSearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  formattedUrl: string;
  pagemap?: {
    cse_image?: Array<{ src: string }>;
    cse_thumbnail?: Array<{ src: string; width: string; height: string }>;
    metatags?: Array<Record<string, string>>;
  };
}

export interface GoogleImageResult {
  title: string;
  link: string;
  image: {
    contextLink: string;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
  displayLink: string;
}

/**
 * 使用 Unsplash Source API 获取相关图片
 * 根据关键词返回相关图片（免费、无需 API key）
 */
function getUnsplashImages(query: string, count: number = 8): GoogleImageResult[] {
  const results: GoogleImageResult[] = [];
  
  // 清理和优化搜索词
  const searchTerm = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .slice(0, 3)
    .join(',');
  
  for (let i = 0; i < count; i++) {
    // Unsplash Source API - 根据关键词返回相关图片
    // 添加随机数防止缓存返回相同图片
    const random = Math.floor(Math.random() * 1000) + i;
    const imageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(searchTerm)}&sig=${random}`;
    const thumbUrl = `https://source.unsplash.com/400x300/?${encodeURIComponent(searchTerm)}&sig=${random}`;
    
    results.push({
      title: `${query} - Image ${i + 1}`,
      link: imageUrl,
      image: {
        contextLink: `https://unsplash.com/s/photos/${encodeURIComponent(searchTerm)}`,
        thumbnailLink: thumbUrl,
        thumbnailHeight: 300,
        thumbnailWidth: 400
      },
      displayLink: 'unsplash.com'
    });
  }
  
  return results;
}

/**
 * 获取分组相关图片
 * 每个分组使用自己的关键词搜索 - 优先使用 Google Search API
 */
export async function getGroupImages(groupTitle: string, query: string, count: number = 8): Promise<string[]> {
  // 组合分组标题和原始查询
  const searchTerm = `${groupTitle} ${query}`;
  
  // 优先使用 Google Search API
  try {
    const results = await searchImages(searchTerm, count);
    if (results.length > 0) {
      const urls = results.map(r => r.link || r.image?.thumbnailLink).filter(Boolean) as string[];
      if (urls.length > 0) {
        console.log(`✅ getGroupImages: Got ${urls.length} Google images for "${searchTerm}"`);
        return urls;
      }
    }
  } catch (error) {
    console.error(`❌ getGroupImages: Google search failed for "${searchTerm}":`, error);
  }
  
  // Fallback to Unsplash
  console.log(`⚠️ getGroupImages: Falling back to Unsplash for "${searchTerm}"`);
  const cleanTerm = searchTerm
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .slice(0, 4)
    .join(',');
  
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * 10000) + i;
    images.push(`https://source.unsplash.com/800x600/?${encodeURIComponent(cleanTerm)}&sig=${random}`);
  }
  
  return images;
}

/**
 * 生成模拟的网页搜索结果
 */
function getMockWebResults(query: string, count: number = 5): GoogleSearchResult[] {
  const templates = [
    {
      title: `${query} - Wikipedia`,
      link: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
      snippet: `${query} is a topic of significant interest. This article provides comprehensive information about ${query}, including its history, characteristics, and cultural significance.`,
      displayLink: 'en.wikipedia.org'
    },
    {
      title: `The Complete Guide to ${query} | Expert Insights`,
      link: `https://www.example.com/guide/${encodeURIComponent(query)}`,
      snippet: `Discover everything you need to know about ${query}. Our expert guide covers the basics, advanced topics, and practical tips for enthusiasts.`,
      displayLink: 'www.example.com'
    },
    {
      title: `${query}: History, Facts & More - Britannica`,
      link: `https://www.britannica.com/topic/${encodeURIComponent(query)}`,
      snippet: `Learn about ${query} from Britannica's extensive collection. Explore the historical context, key figures, and lasting impact of ${query}.`,
      displayLink: 'www.britannica.com'
    },
    {
      title: `Exploring ${query} - National Geographic`,
      link: `https://www.nationalgeographic.com/${encodeURIComponent(query)}`,
      snippet: `National Geographic takes you on a journey to explore ${query}. Stunning visuals and in-depth reporting bring this fascinating subject to life.`,
      displayLink: 'www.nationalgeographic.com'
    },
    {
      title: `${query} News, Photos and Videos - CNN`,
      link: `https://www.cnn.com/topics/${encodeURIComponent(query)}`,
      snippet: `Get the latest news, photos, and videos about ${query}. Stay informed with breaking stories and expert analysis.`,
      displayLink: 'www.cnn.com'
    }
  ];

  const baseSeed = query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return templates.slice(0, count).map((t, i) => ({
    ...t,
    formattedUrl: t.link,
    pagemap: {
      cse_thumbnail: [{
        src: `https://source.unsplash.com/160x120/?${encodeURIComponent(query)}&sig=${baseSeed + i}`,
        width: '160',
        height: '120'
      }]
    }
  }));
}

/**
 * 执行 Google 网页搜索
 */
export async function searchWeb(query: string, num: number = 10): Promise<GoogleSearchResult[]> {
  if (!SEARCH_ENGINE_ID || !GOOGLE_API_KEY) {
    console.log('📝 [Google API] Missing configuration, using mock web results');
    return getMockWebResults(query, num);
  }

  try {
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.set('key', GOOGLE_API_KEY);
    url.searchParams.set('cx', SEARCH_ENGINE_ID);
    url.searchParams.set('q', query);
    url.searchParams.set('num', String(Math.min(num, 10)));

    console.log('🔍 [Google API] Searching web for:', query);
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [Google API] Web search error:', response.status, response.statusText);
      console.error('❌ [Google API] Error details:', errorText);
      return getMockWebResults(query, num);
    }

    const data = await response.json();
    console.log('✅ [Google API] Web results:', data.searchInformation?.totalResults, 'total results');
    
    return data.items || [];
  } catch (error) {
    console.error('❌ [Google API] Web search failed:', error);
    return getMockWebResults(query, num);
  }
}

/**
 * 执行图片搜索
 */
export async function searchImages(query: string, num: number = 10): Promise<GoogleImageResult[]> {
  // 优先使用 Google API
  if (SEARCH_ENGINE_ID && GOOGLE_API_KEY) {
    try {
      const url = new URL('https://www.googleapis.com/customsearch/v1');
      url.searchParams.set('key', GOOGLE_API_KEY);
      url.searchParams.set('cx', SEARCH_ENGINE_ID);
      url.searchParams.set('q', query);
      url.searchParams.set('searchType', 'image');
      url.searchParams.set('num', String(Math.min(num, 10)));

      console.log('🖼️ [Google API] Searching images for:', query);
      console.log('🔑 [Google API] Using API Key:', GOOGLE_API_KEY.substring(0, 10) + '...');
      console.log('🔍 [Google API] Using Search Engine ID:', SEARCH_ENGINE_ID);
      
      const response = await fetch(url.toString());
      
      if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          console.log('✅ [Google API] Image results:', data.items.length, 'images found');
          // Log first image URL for debugging
          console.log('📷 [Google API] First image URL:', data.items[0]?.link);
          return data.items;
        } else {
          console.warn('⚠️ [Google API] No items in response:', data);
        }
      } else {
        const errorText = await response.text();
        console.error('❌ [Google API] Error response:', response.status, response.statusText);
        console.error('❌ [Google API] Error details:', errorText);
      }
    } catch (error) {
      console.error('❌ [Google API] Image search failed:', error);
    }
  } else {
    console.warn('⚠️ [Google API] Missing configuration - API Key:', !!GOOGLE_API_KEY, 'Search Engine ID:', !!SEARCH_ENGINE_ID);
  }

  // Fallback 到 Unsplash
  console.log('🖼️ [Fallback] Using Unsplash images for:', query);
  return getUnsplashImages(query, num);
}

/**
 * 综合搜索 - 同时获取网页和图片结果
 */
export async function comprehensiveSearch(query: string): Promise<{
  webResults: GoogleSearchResult[];
  imageResults: GoogleImageResult[];
  searchTime: number;
}> {
  const startTime = Date.now();
  
  const [webResults, imageResults] = await Promise.all([
    searchWeb(query, 5),
    searchImages(query, 8)
  ]);

  return {
    webResults,
    imageResults,
    searchTime: Date.now() - startTime
  };
}

/**
 * 提取图片 URL 列表
 */
export function extractImageUrls(results: GoogleImageResult[]): string[] {
  return results.map(r => r.image?.thumbnailLink || r.link).filter(Boolean);
}

/**
 * 从网页结果中提取缩略图
 */
export function extractThumbnailsFromWeb(results: GoogleSearchResult[]): string[] {
  return results
    .map(r => r.pagemap?.cse_thumbnail?.[0]?.src || r.pagemap?.cse_image?.[0]?.src)
    .filter((url): url is string => Boolean(url));
}
