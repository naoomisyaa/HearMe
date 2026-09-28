import React from 'react';
import { HEARME_LOGO, USER_PROFILE } from '../data/mockData';

interface HeaderProps {
  onOpenProfile: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile, activeTab }) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#f9f9ff]/90 backdrop-blur-xl border-b border-black/[0.04] transition-all">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Zone: Official HearMe logo */}
        <div className="flex items-center gap-2">
          <img
            src={HEARME_LOGO}
            alt="HearMe Logo"
            className="h-9 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Status & Profile Zone */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-semibold tracking-tight">Ready</span>
          </div>

          <button
            onClick={onOpenProfile}
            aria-label="User Profile"
            className="w-9 h-9 rounded-full ring-2 ring-blue-600/20 overflow-hidden active:scale-95 transition-transform hover:ring-blue-600/40"
          >
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
