import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = images[0];
    img.onload = () => {
      setIsImageLoading(false);
      setLoadedImages(new Set([0]));
    };
  }, [images]);

  useEffect(() => {
    if (isImageLoading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        if (!loadedImages.has(nextIndex)) {
          const img = new Image();
          img.src = images[nextIndex];
          img.onload = () => {
            setLoadedImages((prev) => new Set(prev).add(nextIndex));
          };
        }
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length, isImageLoading, loadedImages, images]);

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 border-b-4 border-pink-500 shadow-2xl" style={{ height: '450px' }}>
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-16 h-16 border-8 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-full flex items-center justify-center"
          >
            <img
              src={image}
              alt={`Slajd ${index + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-pink-500 w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
