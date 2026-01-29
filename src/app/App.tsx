import React, { useState } from "react";
import "./globals.css";
import { BingHeader } from "./components/BingHeader";
import { DynamicView } from "./components/DynamicView";

export default function App() {
  const [currentQuery, setCurrentQuery] = useState("Whale images");
  const [searchKey, setSearchKey] = useState(0); // 用于强制刷新

  const handleSearch = (query: string) => {
    console.log('New search:', query);
    setCurrentQuery(query);
    setSearchKey(k => k + 1); // 每次搜索都增加 key，强制刷新
  };

  return (
    <div className="acf-bing-serp-images min-h-screen bg-white">
      <BingHeader initialQuery={currentQuery} onSearch={handleSearch} />
      
      <main className="pl-[160px] pr-[20px] py-[12px]">
        <section className="pt-[20px] w-full max-w-[1208px]">
          <DynamicView 
            key={searchKey} 
            query={currentQuery} 
            onNewSearch={handleSearch} 
          />
        </section>
      </main>
    </div>
  );
}
