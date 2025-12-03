import React from 'react';

interface GalleryProps {
  title: string;
  items: string[];
  type: 'photo' | 'video';
  onItemClick: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ title, items, type, onItemClick }) => {
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
            className="relative aspect-square bg-slate-200 cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden group rounded-xl border-2 border-slate-600 hover:border-pink-500 shadow-lg hover:shadow-pink-500/50"
          >
            {type === 'photo' ? (
              <img
                src={item}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={item}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
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
