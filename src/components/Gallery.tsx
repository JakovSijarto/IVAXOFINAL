import React, { useState } from 'react';

interface GalleryProps {
  title: string;
  items: string[];
  type: 'photo' | 'video';
  onItemClick: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ title, items, type, onItemClick }) => {
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());

  const handleItemLoad = (index: number) => {
    setLoadedItems((prev) => new Set(prev).add(index));
  };

  return (
    <div className="w-full">
      <div className="bg-slate-900 py-8 mb-0 border-b-4 border-pink-500">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-4 p-2 md:p-4 bg-slate-800">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={onItemClick}
            className="relative aspect-square bg-slate-700 cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden group rounded-xl border-2 border-slate-600 hover:border-pink-500 shadow-lg hover:shadow-pink-500/50"
          >
            {!loadedItems.has(index) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
              </div>
            )}
            {type === 'photo' ? (
              <img
                src={item}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => handleItemLoad(index)}
                style={{ opacity: loadedItems.has(index) ? 1 : 0 }}
              />
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={item}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedData={() => handleItemLoad(index)}
                  style={{ opacity: loadedItems.has(index) ? 1 : 0 }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
