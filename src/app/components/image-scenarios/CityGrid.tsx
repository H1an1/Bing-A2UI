import React, { useState } from "react";

interface CityGridProps {
  title: string;
  intro: string;
  outro: string;
  cities: string[];
  activeCity?: string;
  images: string[];
  className?: string;
  onCityChange?: (city: string) => void;
  interactions?: any;
}

export function CityGrid({
  title,
  intro,
  outro,
  cities,
  activeCity,
  images,
  className = "",
  onCityChange,
  interactions
}: CityGridProps) {
  const [active, setActive] = useState(activeCity || cities[0]);

  const handleCityClick = (city: string) => {
    setActive(city);
    onCityChange?.(city);
    if (interactions?.onTagClick) {
      interactions.onTagClick({ 
        text: city, 
        title: `${city} images`,
        type: 'city'
      });
    }
  };

  const handleImageClick = (img: string, index: number) => {
    if (interactions?.onImageClick) {
      interactions.onImageClick({ 
        url: img, 
        alt: `${active} ${index + 1}`,
        type: 'image'
      });
    }
  };

  return (
    <div className={`acf-city-grid ${className}`}>
      {/* Header */}
      <div className="acf-city-grid__header">
        <span className="acf-city-grid__title">
          {title}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </span>
        <span className="acf-city-grid__intro">{intro}</span>
        {cities.map((city, i) => (
          <React.Fragment key={city}>
            {i > 0 && <span className="acf-city-grid__separator">{i === cities.length - 1 ? ', and ' : ', '}</span>}
            <button 
              className={`acf-city-grid__pill ${active === city ? 'active' : ''}`}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </button>
          </React.Fragment>
        ))}
        <span className="acf-city-grid__intro">{outro}</span>
      </div>

      {/* Image Grid */}
      <div className="acf-city-grid__images">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="acf-city-grid__image cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleImageClick(img, i)}
          >
            <img src={img} alt={`${active} ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}


