import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { stripeProducts } from '../stripe-config';

export const Pricing: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handlePurchase = async (priceId: string) => {
    try {
      setLoading(priceId);
      setError('');

      // --- CALL BACKEND LIVE FUNCTION ---
      const res = await fetch('/supabase/functions/stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (!data.url) {
        throw new Error('Checkout nije uspio.');
      }

      // --- REDIRECT TO LIVE STRIPE CHECKOUT ---
      window.location.href = data.url;

    } catch (err: any) {
      setError(err.message || 'Došlo je do greške.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Layout>
      {/* === BACKGROUND WRAPPER === */}
      <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1b2343] via-[#304d91] to-[#0d1224] overflow-hidden pt-[70px]">

        {/* Animated ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)] animate-pulse"></div>

        {/* Glow circle */}
        <div className="absolute w-[500px] h-[500px] bg-pink-500/30 blur-[150px] rounded-full animate-pulse"></div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm animate-ping top-1/3 left-1/4"></div>
          <div className="absolute w-3 h-3 bg-pink-400/30 rounded-full blur-md animate-pulse top-2/3 left-2/3"></div>
          <div className="absolute w-1 h-1 bg-blue-200/20 rounded-full blur-sm animate-ping top-1/5 left-3/5"></div>
        </div>

        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full z-20 px-4">
            <Alert type="error" message={error} onClose={() => setError('')} />
          </div>
        )}

        {/* === DESKTOP ULTRA CLEAN LAYOUT === */}
        <div className="relative w-full max-w-6xl mx-auto px-6 z-10">

          {stripeProducts.map((product) => (
            <div
              key={product.priceId}
              className="
                group
                backdrop-blur-2xl bg-white/5
                border border-white/10 rounded-[32px]
                shadow-[0_0_40px_rgba(0,0,0,0.6)]
                overflow-hidden transition-all duration-500
                flex flex-col md:flex-row md:h-[80vh]
                hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
              "
            >

              {/* NEON BORDER */}
              <div className="absolute inset-0 rounded-[32px] border-[3px] border-transparent pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-[spin_6s_linear_infinite] opacity-40"></div>
              </div>

              {/* === LEFT SIDE (IMAGE) === */}
              <div className="relative w-full md:w-1/2 h-[55vh] md:h-full overflow-hidden">

                <img
                  src="/image1.png"
                  alt="Premium content"
                  className="
                    absolute w-full h-full object-cover object-bottom
                    brightness-[1.12] contrast-[1.12] saturate-[1.15]
                    scale-[1.05] transition-all duration-[2000ms]
                  "
                  style={{
                    objectPosition: "50% 100%",
                    filter: "drop-shadow(0px 10px 35px rgba(0,0,0,0.4))"
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                <div className="absolute top-5 left-5 px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-extrabold text-2xl rounded-full shadow-2xl animate-bounce">
                  -97%
                </div>
              </div>

              {/* === RIGHT SIDE === */}
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center">

                <p className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">PRIČAJ SA MNOM</p>

                <div className="flex items-center justify-center gap-4 mb-10">
                  <span className="text-6xl font-extrabold text-white drop-shadow-xl">
                    {product.currencySymbol}{product.price.toFixed(2)}
                  </span>
                  <span className="text-3xl text-red-300 line-through font-semibold">
                    {product.currencySymbol}29.99
                  </span>
                </div>

                <div className="relative group">
                  <Button
                    className="
                      w-full py-5 text-2xl font-bold rounded-2xl
                      bg-gradient-to-br from-slate-900 to-black
                      shadow-xl hover:shadow-2xl transition-all duration-300
                    "
                    onClick={() => handlePurchase(product.priceId)}
                    loading={loading === product.priceId}
                    disabled={loading !== null}
                  >
                    <span className="relative z-10">PRETPLATI SE</span>

                    <span className="
                      absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                      translate-x-[-100%] group-hover:translate-x-[100%]
                      transition-transform duration-[1200ms] ease-in-out skew-x-[20deg]
                    "></span>
                  </Button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </Layout>
  );
};
