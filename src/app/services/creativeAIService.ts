/**
 * Creative AI Service - 真正的 AI 自由创作
 * 
 * AI 理解 query 本质，然后生成任何形式的交互体验
 * 不再局限于固定模板！
 */

import { GoogleGenAI } from "@google/genai";

// Gemini API 配置 - 从环境变量读取
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export interface CreativeOutput {
  understanding: string;  // AI 对 query 的理解
  concept: string;        // 创意概念
  html: string;           // 生成的 HTML
  css: string;            // 生成的 CSS
  js: string;             // 生成的 JavaScript
}

const CREATIVE_PROMPT = `You are a creative AI designer who creates UNIQUE interactive experiences.

## YOUR MISSION
For any query, you must:
1. **UNDERSTAND** - What is the ESSENCE of this query? What does the user REALLY want to know/feel/experience?
2. **IMAGINE** - What would be the MOST creative, unexpected, delightful way to explain/show this?
3. **CREATE** - Generate HTML/CSS/JS to bring that vision to life!

## THINK CREATIVELY!

| Query | Essence | Creative Approach |
|-------|---------|-------------------|
| "fly rubbing hands" | Cleaning behavior | Mini-game where you ARE the fly, shake off particles |
| "earth rotation" | Motion in space | Draggable 3D earth with day/night cycle |
| "how coffee is made" | Transformation process | Interactive timeline with animated transitions |
| "color psychology" | Emotional impact | Let user FEEL colors by changing the entire UI |
| "music beat" | Rhythm concept | Clickable drums that teach timing |
| "cat breeds" | Visual differences | Swipeable cards with fun facts that reveal on tap |
| "sunset" | Beauty, tranquility | Animated gradient that shifts through golden hour |
| "Hawaii" | Paradise feeling | Immersive full-screen beach with ambient sounds |

## YOUR OUTPUT FORMAT

You must output a JSON object with:
{
  "understanding": "1-2 sentences explaining what user REALLY wants",
  "concept": "Your creative vision - what unique experience will you create?",
  "html": "Clean HTML structure (no <html>, <head>, <body> tags - just the content)",
  "css": "All CSS styles (will be scoped automatically)",
  "js": "JavaScript for interactivity (optional, keep it simple and safe)"
}

## RULES

1. **NO BORING LAYOUTS** - Don't just show images in a grid. Create an EXPERIENCE!
2. **INTERACTIVITY** - Let users click, drag, hover, play
3. **ANIMATION** - Use CSS animations and transitions liberally
4. **SURPRISE** - Do something unexpected that makes users go "wow!"
5. **SELF-CONTAINED** - All code must work standalone
6. **SAFE JS** - No external scripts, no fetch, no localStorage. Only DOM manipulation and animations.
7. **USE PLACEHOLDER IMAGES** - Use https://picsum.photos/WIDTH/HEIGHT for any images

## EXAMPLES OF GOOD CREATIVITY

### "butterfly lifecycle"
Don't: Grid of 4 images (egg, caterpillar, chrysalis, butterfly)
Do: Animated timeline where clicking each stage morphs into the next with particle effects

### "piano keys"
Don't: Image of a piano
Do: Playable piano keys that light up and make visual feedback

### "northern lights"
Don't: Photos of aurora
Do: Generative canvas animation with flowing colors that respond to mouse movement

### "origami crane"
Don't: Step-by-step images
Do: 3D CSS paper that folds as you scroll

## CSS TIPS

- Use CSS variables for theming
- Use \`animation\` and \`@keyframes\` for motion
- Use \`transform\` for smooth interactions
- Use \`backdrop-filter: blur()\` for glass effects
- Use gradients liberally
- Dark themes often look more immersive

## JS TIPS

- Keep it simple - vanilla JS only
- Use event listeners for interactivity
- requestAnimationFrame for smooth animations
- Simple state management with variables

Output JSON only. Be CREATIVE!`;

export async function generateCreativeExperience(query: string): Promise<CreativeOutput> {
  const prompt = `${CREATIVE_PROMPT}

Query: "${query}"

Think deeply about what makes "${query}" interesting, then create something AMAZING and UNEXPECTED!

Output JSON only:`;

  try {
    console.log('🎨 Creative AI thinking about:', query);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 1.0, // 最大创意！
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });
    
    const text = response.text || '';
    
    // 提取 JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    console.log('🎨 Creative concept:', parsed.concept);
    
    return {
      understanding: parsed.understanding || 'Exploring ' + query,
      concept: parsed.concept || 'Interactive experience',
      html: parsed.html || '<div class="center">Loading...</div>',
      css: parsed.css || '.center { display: flex; justify-content: center; align-items: center; min-height: 400px; }',
      js: parsed.js || '',
    };
  } catch (error) {
    console.error('Creative AI failed:', error);
    
    // Fallback - 简单但美观的展示
    return {
      understanding: `Exploring "${query}"`,
      concept: 'Visual exploration with interactive elements',
      html: `
        <div class="fallback-container">
          <div class="glow"></div>
          <h1 class="title">${query}</h1>
          <p class="subtitle">Click anywhere to create magic</p>
          <div class="particles"></div>
        </div>
      `,
      css: `
        .fallback-container {
          min-height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          user-select: none;
        }
        .title {
          font-size: 52px;
          font-weight: 800;
          color: white;
          text-transform: capitalize;
          z-index: 1;
          text-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
          animation: float 3s ease-in-out infinite;
        }
        .subtitle {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          z-index: 1;
          margin-top: 16px;
        }
        .glow {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite;
        }
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          animation: particleFade 1s ease-out forwards;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes particleFade {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
      `,
      js: `
        const container = document.querySelector('.fallback-container');
        const particles = document.querySelector('.particles');
        
        container.addEventListener('click', (e) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const angle = (i / 12) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
            particle.style.background = 'hsl(' + (Math.random() * 60 + 220) + ', 70%, 60%)';
            particles.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
          }
        });
      `,
    };
  }
}
