import { Asterisk } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#141614] border-t-2 border-[#9ACD32] py-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <Asterisk
              className="w-5 h-5 text-[#9ACD32] animate-spin"
              style={{ animationDuration: '12s' }}
            />
            <div>
              <span className="font-brat uppercase text-lg text-white block leading-snug">
                senzhao_creative.2026
              </span>
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                built with precision // full responsive acid system
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span className="uppercase text-[10px] text-gray-500">
              vanguard club collection
            </span>
            <span className="text-[#9ACD32] font-brat uppercase text-lg select-all">
              SO BRAT.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
