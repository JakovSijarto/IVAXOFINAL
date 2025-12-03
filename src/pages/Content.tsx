import React, { useEffect, useState, useRef } from "react";
import { Button } from "../components/ui/Button";

export const Content: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState<number | null>(null);
  const autoPlayRef = useRef<any>(null);

  const galleryItems = [
    { type: "image", src: "/image1.png" },
    { type: "image", src: "/image1.png" },
    { type: "image", src: "/image1.png" },
    { type: "image", src: "/image1.png" },
    { type: "video", src: "/1202.mp4" },
    { type: "video", src: "/1202.mp4" },
  ];

  // BACK BUTTON LOCK
  useEffect(() => {
    const preventNavigation = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", preventNavigation);

    const handlePopState = () => window.history.pushState(null, "", window.location.pathname);
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", preventNavigation);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // AUTOPLAY SLIDESHOW
  useEffect(() => {
    if (carouselIndex === null) return;

    autoPlayRef.current = setInterval(() => {
      setCarouselIndex((prev) =>
        prev === galleryItems.length - 1 ? 0 : prev! + 1
      );
    }, 4500);

    return () => clearInterval(autoPlayRef.current);
  }, [carouselIndex]);

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (carouselIndex === null) return;

      if (e.key === "ArrowRight")
        setCarouselIndex((prev) => (prev! + 1) % galleryItems.length);

      if (e.key === "ArrowLeft")
        setCarouselIndex((prev) =>
          prev === 0 ? galleryItems.length - 1 : prev! - 1
        );

      if (e.key === "Escape") setCarouselIndex(null);
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [carouselIndex]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1b2343] via-[#304d91] to-[#0d1224] overflow-hidden">

      {/* BACKGROUND PARTICLES */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,0,120,0.15),transparent_70%)] animate-pulse"></div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute w-2 h-2 bg-white/20 blur-sm rounded-full top-1/4 left-1/3 animate-ping"></div>
        <div className="absolute w-3 h-3 bg-pink-400/30 blur-md rounded-full top-2/3 left-2/3 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-blue-200/20 blur-sm rounded-full top-1/5 left-3/5 animate-ping"></div>
      </div>

      {/* NAVBAR */}
      <nav className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-rose-600 bg-clip-text text-transparent">
            Premium Sadržaj
          </h1>
        </div>
      </nav>

      {/* MAIN */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto py-16 px-6">

          {/* HEADER */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent mb-6">
              Dobrodošao!
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Uživaj u ekskluzivnom premium sadržaju koji se stalno ažurira.
            </p>
          </div>

          {/* ULTRA GALLERY V3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className="
                  relative group cursor-pointer overflow-hidden rounded-3xl 
                  border border-white/10 backdrop-blur-2xl shadow-xl
                  hover:scale-[1.06] hover:-rotate-1 duration-500
                  hover:shadow-[0_0_60px_rgba(255,0,150,0.35)]
                "
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    className="w-full h-72 object-cover group-hover:scale-125 transition-all duration-700"
                  />
                ) : (
                  <video
                    src={item.src}
                    muted
                    playsInline
                    className="w-full h-72 object-cover group-hover:scale-125 transition-all duration-700"
                  />
                )}

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all"></div>

                {/* LENS FLARE */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/30 blur-3xl rounded-full"></div>

                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold tracking-wide opacity-80">
                  Pogledaj
                </p>
              </div>
            ))}
          </div>

          {/* FULLSCREEN VIEWER */}
          {carouselIndex !== null && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] flex items-center justify-center">

              {/* CLOSE */}
              <button
                className="absolute top-5 right-5 text-white text-4xl hover:scale-125"
                onClick={() => setCarouselIndex(null)}
              >
                ✕
              </button>

              {/* PREVIOUS */}
              <button
                className="absolute left-4 text-white text-5xl hover:scale-125"
                onClick={() =>
                  setCarouselIndex(
                    carouselIndex === 0 ? galleryItems.length - 1 : carouselIndex - 1
                  )
                }
              >
                ‹
              </button>

              {/* NEXT */}
              <button
                className="absolute right-4 text-white text-5xl hover:scale-125"
                onClick={() =>
                  setCarouselIndex(
                    (carouselIndex + 1) % galleryItems.length
                  )
                }
              >
                ›
              </button>

              {/* MAIN MEDIA */}
              <div className="max-w-5xl w-full px-6">
                {galleryItems[carouselIndex].type === "image" ? (
                  <img
                    src={galleryItems[carouselIndex].src}
                    className="w-full max-h-[90vh] rounded-3xl object-contain shadow-2xl"
                  />
                ) : (
                  <video
                    src={galleryItems[carouselIndex].src}
                    autoPlay
                    loop
                    muted={false}
                    controls
                    className="w-full max-h-[90vh] rounded-3xl object-contain shadow-2xl"
                  />
                )}
              </div>

              {/* THUMBNAILS UNDER */}
              <div className="absolute bottom-6 flex gap-4 overflow-x-auto px-4">
                {galleryItems.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`
                      w-16 h-16 rounded-xl overflow-hidden border-2
                      cursor-pointer transition-all
                      ${i === carouselIndex ? "border-pink-500 scale-110" : "border-white/20"}
                    `}
                  >
                    {item.type === "image" ? (
                      <img src={item.src} className="w-full h-full object-cover" />
                    ) : (
                      <video src={item.src} className="w-full h-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOTTOM CARD */}
          <div className="mt-20 backdrop-blur-2xl bg-white/10 border border-pink-300/20 shadow-2xl p-10 rounded-3xl">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
              Uskoro Još Više
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Novi sadržaj, live sesije i ekskluzivna izdanja dolaze uskoro.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};
