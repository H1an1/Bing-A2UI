import React, { useState, FormEvent } from "react";
import svgPaths from "../../imports/svg-wcdo3zh12x";
import { data } from "../data";

// Icon mapping for scope tabs
const scopeIcons: Record<string, string> = {
  "All": svgPaths.p37ec8700,
  "Images": svgPaths.p267c6e00,
  "Videos": svgPaths.p267c6e00,
  "Maps": svgPaths.p267c6e00,
  "News": svgPaths.p267c6e00,
  "Shopping": svgPaths.p267c6e00,
};

interface BingHeaderProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export function BingHeader({ initialQuery = data.header.query, onSearch }: BingHeaderProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };
  return (
    <header className="bg-white flex flex-col w-full">
      {/* Top Bar */}
      <div className="flex items-center w-full h-[56px] px-5 gap-4">
        {/* Microsoft Bing Logo */}
        <div className="w-[116px] h-[18.4px] shrink-0">
          <svg className="block w-full h-full" viewBox="0 0 116 18.4">
            <g>
              {/* Microsoft logo mark */}
              <g>
                <path d={svgPaths.p10797200} fill="#F26522" />
                <path d={svgPaths.p35e60f00} fill="#8DC63F" />
                <path d={svgPaths.p3ff34e00} fill="#00AEEF" />
                <path d={svgPaths.p2e909900} fill="#FFC20E" />
              </g>
              {/* Bing text */}
              <path d={svgPaths.p1b3c6e00} fill="#77787B" />
              {/* Additional Bing logo paths */}
              <g>
                <path d={svgPaths.p39652a80} fill="#77787B" />
                <path d={svgPaths.pa62acf0} fill="#77787B" />
                <path d={svgPaths.paa5a700} fill="#77787B" />
                <path d={svgPaths.p2053b500} fill="#77787B" />
              </g>
            </g>
          </svg>
        </div>

        {/* Search Box Container */}
        <form className="flex-grow max-w-[650px]" onSubmit={handleSubmit}>
          <div className="h-[44px] bg-white rounded-full shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(0,0,0,0.05)] flex items-center px-4 gap-3 hover:shadow-[0px_4px_8px_1px_rgba(0,0,0,0.14),0px_0px_0px_1px_rgba(0,0,0,0.05)] transition-shadow">
            {/* Search Icon */}
            <button 
              type="submit"
              className="w-5 h-5 text-black/60 shrink-0 hover:text-black/80 cursor-pointer transition-colors"
              aria-label="Search"
            >
              <svg viewBox="0 0 20 20" className="w-full h-full">
                <path d={svgPaths.p37ee9180} fill="currentColor" />
              </svg>
            </button>
            
            {/* Search Input */}
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent outline-none text-[16px] leading-[22px] text-black placeholder:text-black/40"
              placeholder="Search the web"
            />
            
            {/* Action Icons */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Microphone */}
              <button 
                type="button"
                className="w-5 h-5 text-[#4F6BED] hover:opacity-80 transition-opacity" 
                aria-label="Voice search"
              >
                <svg viewBox="0 0 20 20" className="w-full h-full">
                  <path d={svgPaths.p5fb3300} fill="currentColor" />
                </svg>
              </button>
              {/* Camera/Visual Search */}
              <button 
                type="button"
                className="w-5 h-5 text-[#4F6BED] hover:opacity-80 transition-opacity" 
                aria-label="Visual search"
              >
                <svg viewBox="0 0 20 20" className="w-full h-full">
                  <path d={svgPaths.p1ad03880} fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* Deep Search Button */}
        <button className="bg-[#f0f3ff] hover:bg-[#e4ebff] rounded-full px-3 py-2 flex items-center gap-1.5 transition-colors shrink-0">
          <div className="w-4 h-4 text-[#3C51B4]">
            <svg viewBox="0 0 17 19" className="w-full h-full">
              <path d={svgPaths.p1c8bbc00} fill="currentColor" />
              <path d={svgPaths.p29efd4b0} fill="currentColor" />
              <path d={svgPaths.p2a8cbbe0} fill="currentColor" />
            </svg>
          </div>
          <span className="text-[#3c51b4] text-[13px] font-bold leading-[20px]">{data.header.deepSearch}</span>
        </button>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-6 shrink-0">
          {/* Sign In Button */}
          <button className="bg-[#f5f5f5] hover:bg-[#e8e8e8] rounded-full px-4 py-2 text-[13px] font-bold text-[#202020] leading-[20px] transition-colors">
            {data.header.signIn}
          </button>
          
          {/* Rewards */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="text-[14px] text-black/75 leading-[22px]">{data.header.rewards}</span>
            <div className="w-6 h-6 border-2 border-[#4f6bed] rounded-full flex items-center justify-center group-hover:bg-[#f0f3ff] transition-colors">
              <svg viewBox="0 0 16 16" className="w-4 h-4 text-[#4f6bed]">
                <path d={svgPaths.p1227b000} fill="currentColor" />
              </svg>
            </div>
          </div>
          
          {/* Menu */}
          <button className="w-6 h-6 text-black/60 hover:text-black/80 transition-colors" aria-label="Menu">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d={svgPaths.p1be66400} fill="currentColor" />
              <path d={svgPaths.p18b26000} fill="currentColor" />
              <path d={svgPaths.p183ee1c0} fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scopes Bar */}
      <nav className="w-full border-b border-black/10">
        <div className="pl-[160px]">
          <div className="flex items-center gap-6">
            {data.header.scopes.map((scope, i) => {
              const isActive = scope.label === "All";
              return (
                <a
                  key={i}
                  href="#"
                  className={`flex items-center gap-1.5 py-2.5 px-1 border-b-[3px] transition-colors ${
                    isActive 
                      ? 'border-[#4f6bed]' 
                      : 'border-transparent hover:border-black/20'
                  }`}
                >
                  {/* Icon for each scope */}
                  <div className={`w-4 h-4 ${isActive ? 'text-[#4f6bed]' : 'text-[#767676]'}`}>
                    <svg viewBox="0 0 16 16" className="w-full h-full">
                      <path d={scopeIcons[scope.label] || svgPaths.p37ec8700} fill="currentColor" />
                    </svg>
                  </div>
                  <span className={`text-[11px] uppercase tracking-wide ${
                    isActive 
                      ? 'text-[#4f6bed] font-bold' 
                      : 'text-black/75 hover:text-black'
                  }`}>
                    {scope.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
