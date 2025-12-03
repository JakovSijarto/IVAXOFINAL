import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';

export const Success: React.FC = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl p-12 text-center">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl animate-[pulse_2s_ease-in-out_infinite]">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-[pulse_2s_ease-in-out_infinite]"></div>
          </div>

          <h1 className="text-4xl font-bold gradient-text mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Thank you for your subscription! You now have access to all premium content.
          </p>

          {email && (
            <div className="glass-effect rounded-xl p-6 mb-8 max-w-md mx-auto">
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Receipt sent to:
              </p>
              <p className="text-base font-bold text-slate-900">
                {email}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Use this email to access your content
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              size="lg"
              onClick={() => window.location.href = '/content'}
              className="w-full sm:w-auto"
            >
              Access Premium Content
            </Button>
            
            <div>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full sm:w-auto"
              >
                Back to Home
              </Button>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Questions? Contact us at{' '}
              <a href="mailto:support@ivaxo.com" className="font-semibold text-slate-800 hover:text-slate-900 underline">
                support@ivaxo.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
