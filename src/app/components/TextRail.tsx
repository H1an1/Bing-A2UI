import React from "react";
import svgPaths from "../../imports/svg-wcdo3zh12x";
import { data } from "../data";

/**
 * TextRail Component
 * Displays a list of text-based related search suggestions.
 * Used in the right rail section of the SERP.
 * Uses ACF design tokens for consistent styling.
 */
export function TextRail() {
  return (
    <aside className="acf-text-rail">
      <h2 className="acf-text-rail__title">
        {data.textRail.title}
      </h2>
      <div className="acf-text-rail__list">
        {data.textRail.items.map((item, i) => (
          <a 
            key={i} 
            href="#"
            className="acf-text-rail__item"
          >
            <span className="acf-text-rail__icon">
              <svg viewBox="0 0 16 16" className="w-full h-full">
                <path d={svgPaths.pbccfb00} fill="currentColor" />
              </svg>
            </span>
            <span className="acf-text-rail__item-text">{item}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
