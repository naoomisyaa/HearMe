import React, { useState } from 'react';
import { Venue, Message } from '../types';
import { speechService } from '../services/speechService';

interface ClerkMirrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
  messages: Message[];
  onAddMessage: (sender: 'staff' | 'user', text: string) => void;
}

export const ClerkMirrorModal: React.FC<ClerkMirrorModalProps> = ({
  isOpen,
  onClose,
  venue,
  messages,
  onAddMessage,
}) => {
  const [quickInput, setQuickInput] = useState('');

  if (!isOpen) return null;

  const latestUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
  const latestStaffMsg = [...messages].reverse().find((m) => m.sender === 'staff');

  const clerkCommonResponses = [
    "Dine-in atau Takeaway?",
    "Susu oat tersedia (+5rb)",
    "Total pembayaran Rp 42.000",
    "Silakan tap kartu / QRIS",
    "Mohon tunggu sekitar 3 menit",
    "Terima kasih! Silakan duduk",
  ];

  const handleClerkTap = (response: string) => {
    speechService.triggerHaptic(15);
    onAddMessage('staff', response);
  };

  const handleUserSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onAddMessage('user', quickInput.trim());
    speechService.speak(quickInput.trim());
    setQuickInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-2 sm:p-4 select-none animate-in fade-in duration-200">
      {/* ================= TOP SECTION: INVERTED 180° FACING THE CLERK ================= */}
      <div className="flex-1 bg-slate-900 border-2 border-blue-500/40 rounded-3xl p-5 text-white flex flex-col justify-between rotate-180 transform transition-transform shadow-2xl relative overflow-hidden">
        {/* Ambient indicator */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-400 text-[22px]">screen_rotation</span>
            <span className="text-xs font-bold tracking-wider uppercase text-blue-300">
              Layar Konter Kasir · Menghadap Petugas
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            Teks Pelanggan (Disabilitas)
          </span>
        </div>

        {/* Large Patron Message Box for Clerk */}
        <div className="my-auto py-3">
          <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">
            Pesan / Permintaan Pelanggan:
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-snug tracking-tight">
            {latestUserMsg ? `"${latestUserMsg.text}"` : '"Halo! Saya siap memesan / berkonsultasi."'}
          </p>
        </div>

        {/* Clerk 1-Tap Rapid Response Pill Row */}
        <div>
          <span className="text-[11px] text-slate-400 uppercase font-semibold mb-2 block">
            Ketuk untuk menjawab tanpa bicara keras:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {clerkCommonResponses.map((resp, idx) => (
              <button
                key={idx}
                onClick={() => handleClerkTap(resp)}
                className="text-left text-xs sm:text-sm font-semibold p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white border border-slate-700 active:scale-95 transition-all text-slate-200"
              >
                {resp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MIDDLE SEPARATOR CONTROLS ================= */}
      <div className="py-2 flex items-center justify-between px-3">
        <div className="flex items-center gap-2 text-white/80 text-xs">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">sync_alt</span>
          <span>Dual-facing counter mode aktif (180°)</span>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold active:scale-95 transition-all flex items-center gap-1 shadow-lg"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
          Kembali ke Mode Normal
        </button>
      </div>

      {/* ================= BOTTOM SECTION: FACING PATRON (NORMAL ORIENTATION) ================= */}
      <div className="flex-1 bg-white rounded-3xl p-5 flex flex-col justify-between shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Pandangan Anda · {venue.name} ({venue.counter})
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Binaural Assist Aktif</span>
        </div>

        {/* Clerk Latest Response for User */}
        <div className="my-auto py-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 uppercase">Petugas Membalas:</span>
            {latestStaffMsg && (
              <span className="text-[11px] text-slate-400">({latestStaffMsg.timestamp})</span>
            )}
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {latestStaffMsg ? `"${latestStaffMsg.text}"` : '"Mendengarkan ucapan petugas di loket..."'}
          </p>
        </div>

        {/* User Quick Composer */}
        <form onSubmit={handleUserSend} className="flex gap-2 items-center">
          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder="Ketik balasan Anda untuk dibalik ke layar petugas..."
            className="flex-1 h-12 px-4 rounded-2xl bg-slate-100 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="h-12 px-5 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};
