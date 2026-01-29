/**
 * Intent Detection Service
 * 分析用户查询，识别搜索意图，决定使用哪些组件展示结果
 */

export type QueryIntent = 
  | 'timeline'        // 时间线类查询（历史、演变）
  | 'location'        // 地点类查询（旅游、景点）
  | 'howto'          // 步骤类查询（教程、食谱）
  | 'entity'         // 实体详情类查询（人物、物品）
  | 'visual-explore' // 分类探索类查询（类型、风格）
  | 'city-grid'      // 城市网格类查询（地点图集）
  | 'general';       // 通用查询

export type InteractionIntent =
  | 'view-large'     // 查看大图
  | 'dive-into'      // 深入探索（触发新搜索）
  | 'switch-view'    // 切换视图/标签
  | 'play-media'     // 播放媒体
  | 'navigate'       // 跳转到来源
  | 'expand'         // 展开/收起
  | 'none';          // 无特定意图

export interface IntentAnalysis {
  intent: QueryIntent;
  confidence: number; // 0-1 置信度
  keywords: string[];
  suggestedComponent: string;
  reasoning: string; // 解释为什么选择这个意图
}

/**
 * 分析查询意图
 * 在实际生产中，这里会调用 LLM API
 * 现在我们先用规则引擎模拟
 */
export function analyzeQueryIntent(query: string): IntentAnalysis {
  const lowerQuery = query.toLowerCase().trim();
  
  // Timeline 时间线类
  const timelineKeywords = ['period', 'history', 'evolution', 'timeline', 'era', 'year', 'century', 'time'];
  if (timelineKeywords.some(kw => lowerQuery.includes(kw))) {
    return {
      intent: 'timeline',
      confidence: 0.9,
      keywords: timelineKeywords.filter(kw => lowerQuery.includes(kw)),
      suggestedComponent: 'TimelineGallery',
      reasoning: 'Query contains temporal/historical keywords'
    };
  }

  // Location 地点类
  const locationKeywords = ['visit', 'tourist', 'travel', 'places', 'attractions', 'landmarks', 'temple', 'palace'];
  const cityNames = ['kyoto', 'paris', 'tokyo', 'london', 'new york', 'beijing'];
  if (locationKeywords.some(kw => lowerQuery.includes(kw)) || 
      cityNames.some(city => lowerQuery.includes(city))) {
    return {
      intent: 'location',
      confidence: 0.85,
      keywords: [...locationKeywords, ...cityNames].filter(kw => lowerQuery.includes(kw)),
      suggestedComponent: 'LocationCard',
      reasoning: 'Query is about a location or tourist destination'
    };
  }

  // How-to 步骤类
  const howtoKeywords = ['how to', 'recipe', 'step', 'guide', 'tutorial', 'instructions', 'make', 'prepare'];
  if (howtoKeywords.some(kw => lowerQuery.includes(kw))) {
    return {
      intent: 'howto',
      confidence: 0.88,
      keywords: howtoKeywords.filter(kw => lowerQuery.includes(kw)),
      suggestedComponent: 'StepCard',
      reasoning: 'Query asks for step-by-step instructions'
    };
  }

  // Entity 实体详情类
  const entityKeywords = ['what is', 'about', 'information', 'detail', 'specs', 'specifications'];
  const entityTypes = ['helicopter', 'aircraft', 'car', 'building', 'monument', 'person'];
  if (entityKeywords.some(kw => lowerQuery.includes(kw)) || 
      entityTypes.some(type => lowerQuery.includes(type))) {
    return {
      intent: 'entity',
      confidence: 0.82,
      keywords: [...entityKeywords, ...entityTypes].filter(kw => lowerQuery.includes(kw)),
      suggestedComponent: 'EntityDetail',
      reasoning: 'Query seeks detailed information about a specific entity'
    };
  }

  // Visual Explore 分类探索类
  const exploreKeywords = ['types of', 'kinds of', 'styles of', 'categories', 'variations', 'explore'];
  if (exploreKeywords.some(kw => lowerQuery.includes(kw))) {
    return {
      intent: 'visual-explore',
      confidence: 0.87,
      keywords: exploreKeywords.filter(kw => lowerQuery.includes(kw)),
      suggestedComponent: 'VisualExplorer',
      reasoning: 'Query wants to explore different types or categories'
    };
  }

  // City Grid 城市网格类
  const cityGridKeywords = ['famous cities', 'cities to visit', 'city images', 'urban', 'metropolis'];
  if (cityGridKeywords.some(kw => lowerQuery.includes(kw))) {
    return {
      intent: 'city-grid',
      confidence: 0.84,
      keywords: cityGridKeywords.filter(kw => lowerQuery.includes(kw)),
      suggestedComponent: 'CityGrid',
      reasoning: 'Query is about multiple cities or urban imagery'
    };
  }

  // General 通用
  return {
    intent: 'general',
    confidence: 0.6,
    keywords: [],
    suggestedComponent: 'CopilotSection', // 默认使用 Copilot Section
    reasoning: 'No specific pattern detected, using general image grid'
  };
}

/**
 * 分析交互意图
 * 根据上下文（组件类型、元素类型、用户行为）判断用户想做什么
 */
export function analyzeInteractionIntent(
  componentType: string,
  elementType: string,
  context?: any
): InteractionIntent {
  // 图片点击 - 通常是查看大图
  if (elementType === 'image' || elementType === 'thumbnail') {
    return 'view-large';
  }

  // 标签/按钮点击 - 通常是切换视图
  if (elementType === 'tab' || elementType === 'tag' || elementType === 'chip') {
    return 'switch-view';
  }

  // 标题/链接点击 - 通常是深入探索
  if (elementType === 'title' || elementType === 'link' || elementType === 'card-body') {
    return 'dive-into';
  }

  // 播放按钮 - 播放媒体
  if (elementType === 'play-button' || elementType === 'video') {
    return 'play-media';
  }

  // 外部链接 - 跳转
  if (elementType === 'external-link' || elementType === 'source-link') {
    return 'navigate';
  }

  // 展开按钮 - 展开/收起
  if (elementType === 'expand-button' || elementType === 'see-more') {
    return 'expand';
  }

  // 默认：深入探索
  return 'dive-into';
}

/**
 * 模拟流式响应
 * 在实际生产中，这里会使用 Vercel AI SDK 的 streamUI
 */
export async function* streamIntentAnalysis(query: string): AsyncGenerator<Partial<IntentAnalysis>> {
  // 模拟延迟和流式返回
  yield { intent: undefined, confidence: 0 };
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const result = analyzeQueryIntent(query);
  
  yield { intent: result.intent, confidence: 0.3 };
  await new Promise(resolve => setTimeout(resolve, 150));
  
  yield { intent: result.intent, confidence: 0.6, keywords: result.keywords };
  await new Promise(resolve => setTimeout(resolve, 150));
  
  yield result;
}

