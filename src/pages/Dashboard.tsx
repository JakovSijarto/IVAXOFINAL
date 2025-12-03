import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Carousel } from '../components/Carousel';
import { Gallery } from '../components/Gallery';
import { FloatingPopup } from '../components/FloatingPopup';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const carouselImages = [
    '/image5.webp',
    '/image6.jpg',
    '/image7.webp',
    '/image8.jpg'
  ];

  const photoGallery = [
    '/image2.png',
    '/image3.png',
    '/image1.png',
    '/image4.png',
  ];


  const handleGalleryClick = () => {
    navigate('/pricing');
  };

  return (
    <Layout>
  <FloatingPopup />

  {/* ===== HERO CAROUSEL WITH GLOW ===== */}
  <div className="relative w-full">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,120,0.15),transparent_70%)] blur-3xl"></div>

    <Carousel images={carouselImages} />
  </div>

  {/* ===== INTRO SECTION (NEON ULTRA+) ===== */}
  <div className="relative bg-gradient-to-br from-[#1b2343] via-[#304d91] to-[#0d1224] text-white py-20 px-6 overflow-hidden">

    {/* background particles */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm animate-ping top-1/4 left-1/3"></div>
      <div className="absolute w-3 h-3 bg-pink-400/30 rounded-full blur-md animate-pulse top-2/3 left-2/3"></div>
      <div className="absolute w-1 h-1 bg-blue-200/20 rounded-full blur-sm animate-ping top-1/5 left-3/5"></div>
    </div>

    <div className="relative max-w-4xl mx-auto text-center z-10">
  <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 via-rose-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg mb-10 uppercase tracking-wide">
    ĆAO, JA SAM IVA!
  </h2>

  <p className="text-xl md:text-2xl mb-6 leading-relaxed text-white/80">
    Tražiš uzbuđenje i zadovoljstvo? Na pravom si mestu. Dozvoli mi da te vodim kroz
    moje najvrelije fantazije i snove.
  </p>

  <p className="text-xl md:text-2xl mb-3 font-semibold text-pink-300">
    Šta te čeka unutra?
  </p>

  <p className="text-lg md:text-xl mb-6 text-white/70">
    Stotine ekskluzivnih hardkor scena, hiljade premium fotografija.
  </p>

  <p className="text-lg md:text-xl text-white/80 mb-10">
    Nadam se da ćemo se videti unutra. ❤️
  </p>

  {/* ULTRA+ CTA BUTTON */}
 <a href="/pricing" className="relative inline-block group">
  <Button
    className="
      px-10 py-4 text-2xl font-extrabold
      rounded-2xl bg-gradient-to-br from-slate-900 to-black
      shadow-xl hover:shadow-2xl transition-all duration-300
      relative overflow-hidden
    "
  >
    <span className="relative z-10">Pogledaj Pretplatu</span>

    <span className="
      absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
      translate-x-[-100%] group-hover:translate-x-[100%]
      transition-transform duration-[1200ms] ease-in-out
      skew-x-[20deg]
    "></span>

    <span className="
      absolute inset-0 rounded-2xl
      shadow-[0_0_20px_5px_rgba(255,255,255,0.15)]
      group-hover:shadow-[0_0_40px_10px_rgba(255,255,255,0.3)]
      transition-all
    "></span>
  </Button>
</a>

</div>

  </div>

  {/* ===== VIDEO SECTION (GLASS + NEON FRAME) ===== */}
  <div className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] py-24 px-6 overflow-hidden">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,0,90,0.15),transparent_70%)] blur-2xl"></div>

    <div className="relative max-w-4xl mx-auto z-10">
      <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

        {/* neon border */}
        <div className="absolute inset-0 rounded-3xl border-[3px] border-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 opacity-40 animate-[spin_6s_linear_infinite]"></div>
        </div>

<a
  href="/pricing"
  className="relative block w-full max-w-md mx-auto cursor-pointer group select-none"
>

  <div className="
    relative overflow-hidden rounded-[36px]
    shadow-[0_0_80px_rgba(0,0,0,0.8)]
    border border-white/10
    transition-all duration-700
    group-hover:scale-[1.015] group-hover:shadow-[0_0_120px_rgba(255,0,120,0.35)]
    perspective-[2000px]
  ">

    {/* BACKGROUND GLOW */}
    <div className="absolute inset-0 z-[0] bg-[radial-gradient(circle_at_50%_30%,rgba(255,0,120,0.20),transparent_70%)] blur-3xl"></div>

    {/* BOKEH PARTICLES */}
    <div className="absolute inset-0 pointer-events-none z-[1] opacity-60">
      <div className="absolute w-4 h-4 bg-white/10 blur-xl rounded-full animate-ping top-[20%] left-[25%]"></div>
      <div className="absolute w-3 h-3 bg-pink-400/15 blur-lg rounded-full animate-pulse top-[55%] left-[70%]"></div>
      <div className="absolute w-2 h-2 bg-blue-300/15 blur-md rounded-full animate-ping top-[35%] left-[50%]"></div>
    </div>

    {/* MAIN VIDEO */}
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="
        relative z-[3]
        w-full h-[88vh] object-cover
        brightness-[1.12] contrast-[1.1] saturate-[1.1]
        scale-[1.06] group-hover:scale-[1.09]
        transition-all duration-[2200ms] ease-out
      "
      src="/1202.mp4"
    ></video>

    {/* OVERLAYS */}
    <div className="absolute inset-0 z-[4] bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none"></div>
    <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/10 via-transparent to-black/30 pointer-events-none"></div>

    {/* FILM GRAIN */}
    <div
      className="absolute inset-0 z-[5] opacity-[0.08] mix-blend-overlay pointer-events-none"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
      }}
    ></div>

    {/* NEON BORDER — OPACITY REDUCED */}
    <div className="absolute inset-0 rounded-[36px] border-[3px] border-transparent z-[6] pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-[spin_12s_linear_infinite] opacity-10"></div>
    </div>

    {/* CTA CARD AT BOTTOM — ALWAYS VISIBLE */}
    <div className="
      absolute bottom-0 left-0 w-full z-[10]
      bg-black/60 backdrop-blur-xl
      border-t border-white/10
      px-6 py-5
      flex flex-col items-center gap-3
    ">

      <p className="text-white/90 text-lg font-semibold tracking-wide">
        Spreman za pristup ekskluzivnom sadržaju?
      </p>

      <div className="
        bg-gradient-to-r from-pink-600 to-purple-600
        text-white font-bold text-lg
        px-8 py-3 rounded-full shadow-xl
        tracking-wide
      ">
        PRETPLATI SE SADA
      </div>

    </div>

  </div>
</a>





      </div>
    </div>
  </div>

  {/* ===== WHAT YOU GET FOR 1 EURO (NEON HEADER) ===== */}
  <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-red-600 py-12 shadow-2xl px-12" >
    <h3 className="text-4xl md:text-5xl font-extrabold text-white text-center uppercase tracking-wider drop-shadow-xl animate-pulse">
      ŠTO SVE DOBIJEŠ ZA 1 €
    </h3>
  </div>

  {/* ===== PHOTO GALLERY ===== */}
  <div className="bg-[#0f172a]">
    <Gallery
      title="SLIKE"
      items={photoGallery}
      type="photo"
      onItemClick={handleGalleryClick}
    />
  </div>

</Layout>

  );
};
