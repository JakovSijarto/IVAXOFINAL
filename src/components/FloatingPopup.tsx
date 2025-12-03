import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FloatingPopup: React.FC = () => {
  const navigate = useNavigate();

  return (
<div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
  <div
    className="
      w-36 h-36 rounded-full
      bg-pink-600
      relative overflow-hidden
      cursor-pointer
      hover:scale-110 transition-all duration-300
      shadow-2xl border-4 border-white
      hover:shadow-pink-500/50
      flex flex-col justify-start
    "
    onClick={() => navigate('/pricing')}
  >

    {/* BACKGROUND IMAGE */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    ></div>

    {/* LIGHT PINK OVERLAY + MICRO BLUR */}
    <div className="absolute inset-0 bg-pink-600/40 backdrop-blur-[0.2px]"></div>

    {/* BUTTON AT TOP */}
    <div className="relative z-10 pt-3 px-2 w-full text-center">
      <button
        className="
          w-full text-[10px] font-bold text-white
          bg-black/40 backdrop-blur-xl
          py-1.5 rounded-full border border-white/20
          shadow-md hover:bg-black/60 transition-all
        "
      >
        NAZOVI ME
      </button>
    </div>

  </div>
</div>


  );
};
