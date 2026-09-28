import React from 'react';
import { Venue, Phrase } from '../types';
import { speechService } from '../services/speechService';

interface HomeScreenProps {
  venues: Venue[];
  savedPhrases: Phrase[];
  onStartConversation: (venue?: Venue) => void;
  onOpenQrScanner: () => void;
  onOpenEnterCode: () => void;
  onOpenPhrasesModal: () => void;
  onOpenClerkMirror: () => void;
  onOpenVisionModal: () => void;
  onOpenInstitutionModal: (venue: Venue) => void;
  onSeeAllHistory: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  venues,
  savedPhrases,
  onStartConversation,
  onOpenQrScanner,
  onOpenEnterCode,
  onOpenPhrasesModal,
  onOpenClerkMirror,
  onOpenVisionModal,
  onOpenInstitutionModal,
  onSeeAllHistory,
}) => {
  const handleQuickPhraseClick = (text: string) => {
    speechService.triggerHaptic(15);
    speechService.speak(text);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-28 gap-5 max-w-md mx-auto">
      {/* ================= Header Greeting & Disability Multi-Badge ================= */}
      <section className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between pb-1">
          <span className="text-[12px] font-bold text-[#006a61] uppercase tracking-wider">
            Halo, Zara Putri
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] border border-[#006a61]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-tight">Tunarungu &amp; Tunanetra Ready</span>
          </div>
        </div>
        <h2 className="text-[27px] leading-[34px] tracking-tight font-extrabold text-[#141b2b]">
          Komunikasi Aksesibel di Setiap Konter
        </h2>
        <p className="text-xs text-slate-500">
          HearMe Talk (Suara ke Teks) · HearMe Voice (Teks ke Suara) · AI Summarize
        </p>
      </section>

      {/* ================= Hero Feature Card (Start Conversation MVP) ================= */}
      <section
        id="heroStartCard"
        onClick={() => onStartConversation(venues[0])}
        className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-[0_12px_32px_-6px_rgba(20,27,43,0.08),0_2px_8px_rgba(20,27,43,0.03)] border border-slate-100 transition-transform active:scale-[0.99] cursor-pointer group"
      >
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-100/60 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-100/50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col justify-between gap-4 min-h-[155px]">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 shadow-sm border border-blue-100/80">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                forum
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100/90 text-slate-700 text-xs font-semibold border border-slate-200/50">
              <span className="material-symbols-outlined text-[14px] text-amber-600">bolt</span>
              <span className="text-[11px]">HearMe Talk &amp; Voice MVP</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 pt-1">
            <div className="flex flex-col gap-1 max-w-[215px]">
              <h3 className="text-xl font-bold text-[#141b2b] tracking-tight group-hover:text-blue-700 transition-colors">
                Mulai Komunikasi Konter
              </h3>
              <p className="text-[13px] leading-snug text-slate-600">
                Transkripsi live dua arah, AI ringkas, dan cermin 180° kasir.
              </p>
            </div>
            <button
              aria-label="Start Conversation Now"
              className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(29,78,216,0.35)] transition-all group-hover:scale-105 active:scale-90 shrink-0"
            >
              <span className="material-symbols-outlined text-[28px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= Quick Action 3-Col Grid ================= */}
      <section className="grid grid-cols-3 gap-2.5">
        {/* Scan QR */}
        <button
          onClick={onOpenQrScanner}
          className="p-3 rounded-2xl bg-white shadow-xs border border-slate-100 text-left transition-all active:scale-[0.97] hover:bg-slate-50 flex flex-col justify-between h-28"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-[#006a61] border border-teal-100">
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </div>
          <div>
            <span className="text-[13px] font-bold text-[#141b2b] block">Scan QR</span>
            <span className="text-[10px] text-slate-500">Kiosk &amp; Karcis</span>
          </div>
        </button>

        {/* Enter Code */}
        <button
          onClick={onOpenEnterCode}
          className="p-3 rounded-2xl bg-white shadow-xs border border-slate-100 text-left transition-all active:scale-[0.97] hover:bg-slate-50 flex flex-col justify-between h-28"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 border border-amber-100">
            <span className="material-symbols-outlined text-[20px]">dialpad</span>
          </div>
          <div>
            <span className="text-[13px] font-bold text-[#141b2b] block">Kode PIN</span>
            <span className="text-[10px] text-slate-500">4-digit konter</span>
          </div>
        </button>

        {/* HearMe Vision & Document Reader (Future Dev) */}
        <button
          onClick={onOpenVisionModal}
          className="p-3 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/70 shadow-xs border border-blue-200/70 text-left transition-all active:scale-[0.97] hover:bg-blue-100/50 flex flex-col justify-between h-28 relative overflow-hidden"
        >
          <span className="absolute top-1.5 right-1.5 px-1 py-0.2 rounded text-[8px] font-bold bg-amber-400 text-amber-950">
            New
          </span>
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px]">visibility</span>
          </div>
          <div>
            <span className="text-[13px] font-bold text-blue-950 block">Vision / OCR</span>
            <span className="text-[10px] text-blue-800">Baca Dokumen</span>
          </div>
        </button>
      </section>

      {/* ================= Live Mode Previews & Quick Phrases Pill Strip ================= */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-slate-500 uppercase tracking-wider font-bold">
              Frasa Pintar Disabilitas
            </span>
          </div>
          <button
            onClick={onOpenPhrasesModal}
            className="text-[12px] text-[#006a61] font-bold hover:underline"
          >
            Kelola / Tambah
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar -mx-4 px-4">
          {savedPhrases.map((phrase) => (
            <button
              key={phrase.id}
              onClick={() => handleQuickPhraseClick(phrase.text)}
              title="Ketuk untuk langsung bersuara"
              className="flex items-center gap-1.5 px-3.5 h-10 rounded-full bg-white border border-slate-200/80 shadow-xs text-slate-900 text-xs font-semibold whitespace-nowrap active:scale-95 transition-all hover:bg-slate-50 hover:border-blue-400 group"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006a61] group-hover:text-blue-600">
                {phrase.category === 'cafe'
                  ? 'local_cafe'
                  : phrase.category === 'pharmacy'
                  ? 'medication'
                  : phrase.category === 'assistive'
                  ? 'accessibility_new'
                  : 'record_voice_over'}
              </span>
              <span>"{phrase.text}"</span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= Recent Conversations & Institution Integration List ================= */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold text-[#141b2b]">Loket &amp; Riwayat Terkini</h3>
            <span className="text-[11px] text-slate-500">Basis Data SOP &amp; Peta Lokasi Institusi</span>
          </div>
          <button
            onClick={onSeeAllHistory}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
          >
            Lihat Semua
          </button>
        </div>

        {/* Conversation Card List */}
        <div className="flex flex-col gap-2.5">
          {venues.map((venue) => (
            <article
              key={venue.id}
              className="p-3.5 rounded-3xl bg-white shadow-[0_2px_8px_rgba(20,27,43,0.03)] border border-slate-100 hover:border-blue-200 transition-all flex flex-col gap-2"
            >
              <div
                onClick={() => onStartConversation(venue)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-slate-200">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    {venue.status === 'active' && (
                      <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[15px] font-bold text-[#141b2b] truncate group-hover:text-blue-700 transition-colors">
                        {venue.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {venue.counter}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {venue.lastActive} · {venue.messagesCount} pesan tersimpan
                    </p>
                    <p className="text-[11px] text-[#006a61] font-semibold truncate">
                      {venue.audioMode}
                    </p>
                  </div>
                </div>

                <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-blue-600">
                  chevron_right
                </span>
              </div>

              {/* Institution Quick Info Badge & Action */}
              {venue.institutionData && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-purple-900 font-medium truncate max-w-[210px]">
                    <span className="material-symbols-outlined text-[15px] text-purple-700">apartment</span>
                    <span className="truncate">{venue.institutionData.organizationName}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInstitutionModal(venue);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-[11px] flex items-center gap-1 active:scale-95 transition-transform shrink-0"
                  >
                    <span>Lihat SOP</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ================= Dual Display Handoff Tip Box ================= */}
      <section
        onClick={onOpenClerkMirror}
        className="p-4 rounded-3xl bg-blue-50/80 border border-blue-100/90 flex items-center gap-3.5 cursor-pointer hover:bg-blue-100/80 transition-colors active:scale-99 shadow-xs"
      >
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-600/20">
          <span className="material-symbols-outlined text-[20px]">screen_rotation</span>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-blue-950 font-bold">Dual-Display Clerk Mirror</span>
            <span className="text-[11px] text-blue-700 font-bold">Uji Coba</span>
          </div>
          <span className="text-[12px] text-slate-600 leading-snug">
            Putar layar 180° otomatis untuk dibaca kasir secara langsung tanpa tukar perangkat.
          </span>
        </div>
      </section>
    </div>
  );
};
