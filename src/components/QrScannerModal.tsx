import React, { useState } from 'react';
import { Venue } from '../types';
import { speechService } from '../services/speechService';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  venues,
  onSelectVenue,
}) => {
  const [flashlight, setFlashlight] = useState(false);
  const [scanning, setScanning] = useState(true);

  if (!isOpen) return null;

  const handleScanTag = (v: Venue) => {
    setScanning(false);
    speechService.playChime(780, 150);
    speechService.triggerHaptic(30);
    setTimeout(() => {
      onSelectVenue(v);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 text-white animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-safe">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold tracking-tight">Scan Counter Tag</span>
          <span className="text-[11px] text-white/60">Align QR code within the frame</span>
        </div>
        <button
          onClick={() => setFlashlight(!flashlight)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${
            flashlight ? 'bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/30' : 'bg-white/10 text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {flashlight ? 'flashlight_on' : 'flashlight_off'}
          </span>
        </button>
      </div>

      {/* Viewfinder Target */}
      <div className="flex-1 flex flex-col items-center justify-center my-6">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center overflow-hidden bg-black/40">
          {/* Laser scanning beam */}
          {scanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#60a5fa] animate-pulse top-1/2 -translate-y-1/2" />
          )}

          {/* Corner Guides */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg" />

          {/* Center assist prompt */}
          <div className="text-center p-4">
            <span className="material-symbols-outlined text-4xl text-blue-400 mb-2">qr_code_scanner</span>
            <p className="text-xs font-semibold text-white/80">Scanning NFC / Optical Tag</p>
          </div>
        </div>

        <p className="text-xs text-white/60 mt-4 text-center max-w-xs">
          Point at HearMe acrylic kiosk plate or counter sticker to link instantly.
        </p>
      </div>

      {/* Simulated Demo Counter Tags */}
      <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-4 pb-safe">
        <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider block mb-2">
          Nearby Counter Transmitters (Demo Tap):
        </span>
        <div className="flex flex-col gap-2">
          {venues.slice(0, 3).map((v) => (
            <button
              key={v.id}
              onClick={() => handleScanTag(v)}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-blue-600/30 border border-white/10 active:scale-98 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-10 h-10 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{v.name}</h4>
                  <p className="text-xs text-white/60">{v.counter} · {v.audioMode}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                Connect
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
