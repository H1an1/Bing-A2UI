# Bing A2UI - AI-Powered Dynamic View

A dynamic, AI-powered search result visualization system inspired by Gemini's Dynamic View. This project creates interactive, context-aware UI layouts based on search queries.

## Features

- **AI-Driven Layout Generation**: Uses Gemini AI to understand query intent and generate appropriate UI layouts
- **Real Image Search**: Integrates with Google Custom Search API for real image results
- **Multiple View Templates**: Timeline, Gallery, Steps, Location, Entity, and more
- **Interactive Components**: Dynamic tabs, accordions, image grids with hover effects
- **ACF Design System**: Built with ACF (Answer Card Framework) design tokens

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 4 + ACF Design Tokens
- **AI**: Google Gemini 2.0 Flash
- **Search**: Google Custom Search API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/H1an1/Bing-A2UI.git
cd Bing-A2UI

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Configuration

Edit `.env` file with your API keys:

```env
# Google Custom Search API
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id

# Google Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key
```

#### Getting API Keys

1. **Google Custom Search API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Custom Search API"
   - Create credentials (API key)
   - Create a search engine at [Programmable Search Engine](https://programmablesearchengine.google.com/)

2. **Google Gemini API**:
   - Go to [Google AI Studio](https://aistudio.google.com/apikey)
   - Create an API key

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/       # UI components
│   │   ├── blocks/       # Reusable block components
│   │   ├── interactive/  # Interactive view components
│   │   └── image-scenarios/  # Image-focused templates
│   ├── services/         # API services
│   │   ├── googleSearchApi.ts    # Google Search integration
│   │   ├── interactiveService.ts # AI layout generation
│   │   └── templateService.ts    # Template selection
│   └── catalog/          # Schema definitions
└── styles/               # Global styles
```

## Author

**Eko_Han**

## License

MIT
