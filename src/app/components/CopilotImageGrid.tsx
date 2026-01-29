import React from "react";
import svgPaths from "../../imports/svg-wcdo3zh12x";
import { data } from "../data";

export function CopilotImageGrid() {
  return (
    <div className="acf-bing-serp-images__module flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-[134px] h-[16px]">
          <svg className="block w-full h-full" viewBox="0 0 134 16">
            <defs>
              <radialGradient id="paint0_radial_1_73509" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-3.9733 -4.85751 -4.56328 3.74003 13.2815 5.31134)">
                <stop offset="0.1" stopColor="#00AEFF" />
                <stop offset="0.77" stopColor="#2253CE" />
                <stop offset="1" stopColor="#0736C4" />
              </radialGradient>
              <radialGradient id="paint1_radial_1_73509" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.5819 4.56121 4.42057 -3.47834 2.46655 10.5601)">
                <stop stopColor="#FFB657" />
                <stop offset="0.63" stopColor="#FF5F3D" />
                <stop offset="0.92" stopColor="#C02B3C" />
              </radialGradient>
              <linearGradient id="paint2_linear_1_73509" x1="4.70384" y1="1.187" x2="5.53158" y2="10.7613" gradientUnits="userSpaceOnUse">
                <stop offset="0.16" stopColor="#0D91E1" />
                <stop offset="0.49" stopColor="#52B471" />
                <stop offset="0.65" stopColor="#98BD42" />
                <stop offset="0.94" stopColor="#FFC800" />
              </linearGradient>
              <linearGradient id="paint3_linear_1_73509" x1="4.78598" y1="-0.0113407" x2="5.23816" y2="10.4325" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3DCBFF" />
                <stop offset="0.25" stopColor="#0588F7" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="paint4_radial_1_73509" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-4.59431 13.147 15.7366 5.51015 14.3695 3.99529)">
                <stop offset="0.07" stopColor="#8C48FF" />
                <stop offset="0.5" stopColor="#F2598A" />
                <stop offset="0.9" stopColor="#FFB152" />
              </radialGradient>
              <linearGradient id="paint5_linear_1_73509" x1="10.9429" y1="3.37165" x2="10.9362" y2="6.21723" gradientUnits="userSpaceOnUse">
                <stop offset="0.06" stopColor="#F8ADFA" />
                <stop offset="0.71" stopColor="#A86EDD" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g>
              <g>
                <path d={svgPaths.p35379f00} fill="url(#paint0_radial_1_73509)" />
                <path d={svgPaths.p11d03080} fill="url(#paint1_radial_1_73509)" />
                <path d={svgPaths.p31598f00} fill="url(#paint2_linear_1_73509)" />
                <path d={svgPaths.p31598f00} fill="url(#paint3_linear_1_73509)" />
                <path d={svgPaths.p15cbfb00} fill="url(#paint4_radial_1_73509)" />
                <path d={svgPaths.p15cbfb00} fill="url(#paint5_linear_1_73509)" />
              </g>
              <g>
                <path d={svgPaths.p1ed17800} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p3af3500} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p2b026c00} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p20a9a800} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.pedd80c0} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p1e235200} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p392b2880} fill="black" fillOpacity="0.75" />
              </g>
              <g>
                <path d={svgPaths.p18f4c780} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p34539f00} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p2aca6300} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p16e50b00} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p3af95e00} fill="black" fillOpacity="0.75" />
                <path d={svgPaths.p2810c600} fill="black" fillOpacity="0.75" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Grid */}
      <div className="acf-bing-serp-images__image-grid">
        {data.copilot.grid.map((item, index) => (
          <div key={index} className="acf-bing-serp-images__tile overflow-hidden group">
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-[1.3] transition-transform duration-300" />
            {item.seeMore && (
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center gap-1 cursor-pointer z-10">
                <span className="text-white text-[16px] font-bold">See more</span>
                <div className="w-4 h-4 text-white">
                   <svg viewBox="0 0 16 16" className="w-full h-full"><path d={svgPaths.p267c6e00} fill="currentColor" /></svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}