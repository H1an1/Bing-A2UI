import React from "react";
import svgPaths from "../../imports/svg-wcdo3zh12x";
import { data } from "../data";

/**
 * WebResult Component
 * Displays a single web search result with attribution, title, snippet, sitelinks tabs.
 * Uses ACF design tokens for consistent styling.
 */
export function WebResult() {
  return (
    <article className="acf-web-result">
      {/* Header / Attribution */}
      <div className="acf-web-result__attribution">
        <div className="acf-web-result__favicon">
          {/* Favicon placeholder */}
          <div className="w-4 h-4 rounded-[var(--acf-radius-s)] bg-[var(--acf-color-back-neutral-tertiary)]" />
        </div>
        <div className="acf-web-result__source">
          <span className="acf-web-result__site-name">Site name lorem ipsum</span>
          <div className="acf-web-result__url-row">
            <span className="acf-web-result__url">{data.webResult.url}</span>
            <svg viewBox="0 0 8 8" className="acf-web-result__url-chevron">
              <path d={svgPaths.p50f600} fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Title */}
      <a href="#" className="acf-web-result__title">
        {data.webResult.title}
      </a>

      {/* Snippet */}
      <div className="acf-web-result__snippet">
        <span className="acf-web-result__meta">
          <span className="acf-badge acf-badge--small">Web</span>
          <span className="acf-web-result__date">{data.webResult.date}</span>
          <span className="acf-web-result__separator">·</span>
        </span>
        <span>{data.webResult.snippet}</span>
      </div>

      {/* Sitelinks Tabs */}
      <nav className="acf-web-result__tabs">
        <button className="acf-web-result__tab-nav acf-web-result__tab-nav--prev" aria-label="Previous tabs">
          <svg viewBox="0 0 16 16" className="w-4 h-4">
            <path d={svgPaths.p3fbb7800} fill="currentColor" />
          </svg>
        </button>
        <div className="acf-web-result__tabs-list no-scrollbar">
          {data.webResult.tabs.map((tab, i) => (
            <button 
              key={i} 
              className={`acf-web-result__tab ${i === 0 ? 'acf-web-result__tab--active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="acf-web-result__tab-nav acf-web-result__tab-nav--next" aria-label="Next tabs">
          <svg viewBox="0 0 16 16" className="w-4 h-4">
            <path d={svgPaths.p37de0780} fill="currentColor" />
          </svg>
        </button>
      </nav>

      {/* Footer Link */}
      <a href="#" className="acf-web-result__footer-link">
        {data.webResult.footerLink}
      </a>
    </article>
  );
}
