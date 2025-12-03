import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <nav className="bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-[#F81546] uppercase tracking-wide">JA SAM <span className="underline-anim">IVA</span></a>
            </div>
            <div className="flex items-center">
              <a
                href="/pricing"
                className="px-6 py-2 text-[#F81546] border-1 border-[#F81546] font-bold text-sm rounded-md hover:bg-slate-100 transition-colors uppercase"
              >
                JAVI MI SE
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};
