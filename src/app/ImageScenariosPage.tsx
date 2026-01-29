import React from "react";
import { data } from "./data";
import {
  TimelineGallery,
  LocationCard,
  StepCard,
  EntityDetail,
  VisualExplorer,
  CityGrid
} from "./components/image-scenarios";

export default function ImageScenariosPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-[32px] font-bold text-[#1a1a1a] mb-2">
            🎨 Image Scenario Components
          </h1>
          <p className="text-[14px] text-[#666]">
            ACF Design System - Based on Figma SERP-GenIE
          </p>
        </header>

        {/* Components Grid */}
        <div className="flex flex-col gap-8">
          
          {/* 1. Timeline Gallery */}
          <section>
            <div className="inline-block bg-[rgba(0,120,212,0.1)] text-[#0078d4] text-[11px] font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Timeline Gallery
            </div>
            <TimelineGallery
              title={data.timelineGallery.title}
              description={data.timelineGallery.description}
              periods={data.timelineGallery.periods}
              activePeriod={data.timelineGallery.activePeriod}
              yearRange={data.timelineGallery.yearRange}
              currentYear={data.timelineGallery.currentYear}
              images={data.timelineGallery.images}
            />
          </section>

          {/* 2. Location Card */}
          <section>
            <div className="inline-block bg-[rgba(0,120,212,0.1)] text-[#0078d4] text-[11px] font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Location Card
            </div>
            <LocationCard
              name={data.locationCard.name}
              description={data.locationCard.description}
              heroImage={data.locationCard.heroImage}
              places={data.locationCard.places}
            />
          </section>

          {/* 3. Step Card */}
          <section>
            <div className="inline-block bg-[rgba(0,120,212,0.1)] text-[#0078d4] text-[11px] font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Step Card
            </div>
            <StepCard
              stepNumber={data.stepCard.stepNumber}
              totalSteps={data.stepCard.totalSteps}
              title={data.stepCard.title}
              content={data.stepCard.content}
              tags={data.stepCard.tags}
              images={data.stepCard.images}
            />
          </section>

          {/* 4. Entity Detail */}
          <section>
            <div className="inline-block bg-[rgba(0,120,212,0.1)] text-[#0078d4] text-[11px] font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Entity Detail
            </div>
            <EntityDetail
              title={data.entityDetail.title}
              description={data.entityDetail.description}
              mainImage={data.entityDetail.mainImage}
              source={data.entityDetail.source}
              wikiSource={data.entityDetail.wikiSource}
              topics={data.entityDetail.topics}
            />
          </section>

          {/* 5. Visual Explorer */}
          <section>
            <div className="inline-block bg-[rgba(0,120,212,0.1)] text-[#0078d4] text-[11px] font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Visual Explorer
            </div>
            <VisualExplorer
              title={data.visualExplorer.title}
              categories={data.visualExplorer.categories}
            />
          </section>

          {/* 6. City Grid */}
          <section>
            <div className="inline-block bg-[rgba(0,120,212,0.1)] text-[#0078d4] text-[11px] font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              City Grid
            </div>
            <CityGrid
              title={data.cityGrid.title}
              intro={data.cityGrid.intro}
              outro={data.cityGrid.outro}
              cities={data.cityGrid.cities}
              activeCity={data.cityGrid.activeCity}
              images={data.cityGrid.images}
            />
          </section>

        </div>
      </div>
    </div>
  );
}


