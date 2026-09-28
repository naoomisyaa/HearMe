import React from 'react';
import { USER_PROFILE } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">User Profile</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4 p-3 bg-blue-50/60 rounded-2xl border border-blue-100">
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="text-base font-bold text-slate-900">{USER_PROFILE.fullName}</h4>
            <p className="text-xs text-blue-700 font-semibold">{USER_PROFILE.assistMode}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{USER_PROFILE.hearingProfile}</p>
          </div>
        </div>

        {/* Accessibility Features summary */}
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-medium">Assistive Voice Profile</span>
            <span className="font-semibold text-slate-900">{USER_PROFILE.preferredVoice}</span>
          </div>
          {/* <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-medium">Dual-Facing Mirror</span>
            <span className="font-semibold text-emerald-700">Calibrated (180° Inverted)</span>
          </div> */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-medium">Hearing Aid Induction Loop</span>
            <span className="font-semibold text-blue-700">T-Coil Ready (Telecoil)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-md active:scale-98 transition-transform"
        >
          Done
        </button>
      </div>
    </div>
  );
};
