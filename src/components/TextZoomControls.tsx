import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTextZoom } from '@/contexts/TextZoomContext';

const TextZoomControls: React.FC = () => {
  const { textZoom, adjustTextSize } = useTextZoom();

  return (
    <div className="fixed top-4 right-4 z-[100] bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-slate-200">
      <div className="text-slate-800 text-lg font-semibold text-center mb-2">Text Size</div>
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => adjustTextSize(false)}
          className="w-12 h-12 bg-slate-300 rounded-lg text-slate-800 text-xl font-bold hover:bg-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={textZoom === 1}
          aria-label="Decrease text size"
        >
          <Minus size={20} />
        </button>
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-800 font-bold text-lg">
          {textZoom}
        </div>
        <button
          onClick={() => adjustTextSize(true)}
          className="w-12 h-12 bg-slate-300 rounded-lg text-slate-800 text-xl font-bold hover:bg-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={textZoom === 5}
          aria-label="Increase text size"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default TextZoomControls;