import React from 'react';

interface BottomNavProps {
  activeTab: 'home' | 'talk' | 'history' | 'settings';
  setActiveTab: (tab: 'home' | 'talk' | 'history' | 'settings') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabClass = (tab: 'home' | 'talk' | 'history' | 'settings') =>
  `flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[56px] transition-all ${
    activeTab === tab
      ? 'text-blue-700 font-bold'
      : 'text-slate-500 hover:text-slate-800'
  }`;
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-2xl border-t border-black/[0.05] shadow-[0_-4px_24px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex justify-around items-center h-20 px-3 max-w-md mx-auto">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          // className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[56px] transition-colors ${
          //   activeTab === 'home' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          className={tabClass('home')}
          
        >
          <span className="material-symbols-outlined text-[24px]">home</span>
          <span className="text-[11px] font-semibold tracking-tight">Home</span>
        </button>

        {/* Talk (Special Highlighted Center Button) */}
        <button
          onClick={() => setActiveTab('talk')}
          // className={`flex flex-col items-center justify-center gap-1 min-w-[66px] min-h-[56px] px-3.5 py-1.5 rounded-full shadow-md transition-all active:scale-95 ${
          //   activeTab === 'talk'
          //     ? 'bg-blue-600 text-white shadow-blue-600/30 ring-4 ring-blue-100'
          //     : 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20'
          // }`}
          className={tabClass('talk')}
        >
          <span className="material-symbols-outlined text-[26px]">graphic_eq</span>
          <span className="text-[11px] font-bold tracking-tight">Talk</span>
        </button>

        {/* History Tab */}
        <button
          onClick={() => setActiveTab('history')}
          // className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[56px] transition-colors ${
          //   activeTab === 'history' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          // }`}
          className={tabClass('history')}
        >
          <span className="material-symbols-outlined text-[24px]">schedule</span>
          <span className="text-[11px] font-semibold tracking-tight">History</span>
        </button>

        {/* Settings Tab */}
        <button
          onClick={() => setActiveTab('settings')}
          // className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[56px] transition-colors ${
          //   activeTab === 'settings' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          // }`}
          className={tabClass('settings')}
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <span className="text-[11px] font-semibold tracking-tight">Settings</span>
        </button>
      </div>
    </nav>
  );
};
