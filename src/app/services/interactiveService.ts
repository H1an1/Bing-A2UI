/**
 * AI Designer Service - 混合式动态布局
 * 
 * AI 自由组合区块，每次可能不同的组合方式
 */

import { GoogleGenAI } from "@google/genai";
import {
  DynamicView,
  validateDynamicView,
  autoFixDynamicView,
} from '../catalog/schema';
import {
  generateSystemPrompt,
  generateUserPrompt,
  generateRetryPrompt,
} from '../catalog/promptGenerator';

// Gemini API 配置 - 从环境变量读取
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const MAX_RETRIES = 2;
const MODEL_NAME = 'gemini-2.0-flash';

// ============================================================================
// 主函数
// ============================================================================

export async function generateDesign(query: string): Promise<DynamicView> {
  console.log('🎨 AIDesigner: Creating mixed view for:', query);
  
  const systemPrompt = generateSystemPrompt();
  const userPrompt = generateUserPrompt(query);
  
  let lastOutput = '';
  let lastErrors: string[] = [];
  
  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    console.log(`🎨 AIDesigner: Attempt ${attempt}/${MAX_RETRIES + 1}`);
    
    try {
      const fullPrompt = attempt === 1 
        ? userPrompt 
        : generateRetryPrompt(lastErrors.join('\n'), lastOutput);
      
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: fullPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 1.0, // High temperature for creativity!
          topP: 0.95,
        },
      });
      
      const rawText = response.text || '';
      lastOutput = rawText;
      
      // 解析 JSON
      const jsonStr = extractJSON(rawText);
      if (!jsonStr) {
        lastErrors = ['Could not extract JSON from response'];
        continue;
      }
      
      let parsed: any;
      try {
        parsed = JSON.parse(jsonStr);
      } catch (e) {
        lastErrors = ['JSON parse error: ' + (e as Error).message];
        continue;
      }
      
      // 验证
      const result = validateDynamicView(parsed);
      if (result.success && result.data) {
        console.log('🎨 AIDesigner: View created!', {
          blocks: result.data.blocks.map(b => b.type),
          intent: result.data.understanding?.intent,
        });
        return result.data;
      }
      
      // 尝试自动修复
      try {
        const fixed = autoFixDynamicView(parsed);
        console.log('🎨 AIDesigner: Auto-fixed view', {
          blocks: fixed.blocks.map(b => b.type),
        });
        return fixed;
      } catch (fixError) {
        console.error('🎨 AIDesigner: Auto-fix failed:', fixError);
      }
      
      lastErrors = result.errors;
      
    } catch (error) {
      console.error('🎨 AIDesigner: Error:', error);
      lastErrors = [(error as Error).message];
    }
  }
  
  // Fallback
  console.log('🎨 AIDesigner: Using fallback view');
  return createFallbackView(query);
}

// ============================================================================
// 辅助函数
// ============================================================================

function extractJSON(text: string): string | null {
  const trimmed = text.trim();
  
  // 直接以 { 开始
  if (trimmed.startsWith('{')) {
    let depth = 0;
    for (let i = 0; i < trimmed.length; i++) {
      if (trimmed[i] === '{') depth++;
      if (trimmed[i] === '}') depth--;
      if (depth === 0) return trimmed.substring(0, i + 1);
    }
  }
  
  // 在 markdown code block 中
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return match[1].trim();
  
  // 任意位置的 JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) return jsonMatch[0];
  
  return null;
}

function createFallbackView(query: string): DynamicView {
  // Create a simple but valid fallback
  return {
    understanding: {
      intent: 'Explore ' + query,
      approach: 'Visual gallery with image grid',
    },
    design: {
      theme: 'dark',
      accentColor: '#6366f1',
      mood: 'elegant',
    },
    blocks: [
      {
        type: 'hero',
        title: query.charAt(0).toUpperCase() + query.slice(1),
        subtitle: 'A visual exploration',
        style: 'gradient',
      },
      {
        type: 'gallery',
        title: 'Gallery',
        style: 'grid',
        columns: 4,
        imageCount: 8,
      },
    ],
  };
}

// ============================================================================
// Legacy 兼容
// ============================================================================

export async function generateDynamicView(query: string): Promise<DynamicView> {
  return generateDesign(query);
}

export async function generateInteractiveView(query: string): Promise<DynamicView> {
  return generateDesign(query);
}

export function detectInteractiveIntent(query: string) {
  return { shouldUseInteractive: true, suggestedType: 'mixed-view' };
}

export default { generateDesign, generateDynamicView, generateInteractiveView };
