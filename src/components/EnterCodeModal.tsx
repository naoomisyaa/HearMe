import React, { useState } from 'react';
import { Venue } from '../types';
import { speechService } from '../services/speechService';

interface EnterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
}

export const EnterCodeModal: React.FC<EnterCodeModalProps> = ({
  isOpen,
  onClose,
  venues,
  onSelectVenue,
}) => {
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (code.length >= 4) return;
    speechService.playChime(600 + code.length * 50, 80);
    speechService.triggerHaptic(15);
    const newCode = code + digit;
    setCode(newCode);
    setErrorMsg('');

    if (newCode.length === 4) {
      setTimeout(() => {
        // Find matching or default to Kopi Ruang
        const match = venues.find((v) => v.id.includes(newCode)) || venues[0];
        speechService.playChime(800, 200);
        onSelectVenue(match);
        onClose();
        setCode('');
      }, 300);
    }
  };

  const handleDelete = () => {
    speechService.playChime(400, 60);
    setCode(code.slice(0, -1));
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">dialpad</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Enter Venue Code</h3>
              <p className="text-xs text-slate-500">Ask cashier or check counter card</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* 4 Digit Display */}
        <div className="flex justify-center gap-3 py-2">
          {[0, 1, 2, 3].map((idx) => {
            const char = code[idx] || '';
            const isActive = idx === code.length;
            return (
              <div
                key={idx}
                className={`w-14 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
                  char
                    ? 'bg-blue-50 border-2 border-blue-600 text-blue-700'
                    : isActive
                    ? 'border-2 border-slate-400 bg-white ring-4 ring-blue-100 animate-pulse'
                    : 'bg-slate-100 border border-slate-200 text-slate-400'
                }`}
              >
                {char}
              </div>
            );
          })}
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 text-center font-medium">{errorMsg}</p>
        )}

        <div className="text-center">
          <span className="text-[11px] text-slate-400">
            Tip: Press <button onClick={() => { setCode('1042'); handleDigit(''); }} className="text-blue-600 font-semibold underline">1042</button> for Kopi Ruang Counter 01
          </span>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 active:bg-blue-600 active:text-white border border-slate-200/80 text-xl font-bold text-slate-800 transition-all active:scale-95 shadow-sm"
            >
              {digit}
            </button>
          ))}
          <div />
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 active:bg-blue-600 active:text-white border border-slate-200/80 text-xl font-bold text-slate-800 transition-all active:scale-95 shadow-sm"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-red-100 active:text-red-700 text-slate-700 flex items-center justify-center transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">backspace</span>
          </button>
        </div>
      </div>
    </div>
  );
};
