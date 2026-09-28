import React from 'react';
import { VenueInstitutionData } from '../types';
import { speechService } from '../services/speechService';

interface InstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  venueName: string;
  data?: VenueInstitutionData;
}

export const InstitutionModal: React.FC<InstitutionModalProps> = ({
  isOpen,
  onClose,
  venueName,
  data,
}) => {
  if (!isOpen) return null;

  const handleReadAloud = (text: string) => {
    speechService.triggerHaptic(15);
    speechService.speak(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
              <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900">Institution Customization</h3>
                {/* <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  MVP Active
                </span> */}
              </div>
              <p className="text-[11px] text-slate-500">{venueName} · Basis Data Terhubung</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Linked Status */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-purple-950 block">
                {data?.organizationName || venueName}
              </span>
              <span className="text-[11px] text-purple-800">
                Kode Institusi: <strong className="font-mono">{data?.institutionCode || 'INST-LINK-01'}</strong>
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-white/90 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Tersinkron
            </span>
          </div>

          {/* Peta Lokasi Khusus & Panduan Tunanetra */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[20px]">explore</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Peta Lokasi Khusus (Panduan Taktil)
                </h4>
              </div>
              <button
                onClick={() => handleReadAloud(`Panduan lokasi: ${data?.floorMap.room}. ${data?.floorMap.description}`)}
                className="text-[11px] text-blue-600 font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">volume_up</span>
                Dengarkan
              </button>
            </div>
            <p className="text-xs font-semibold text-slate-900">{data?.floorMap.room}</p>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {data?.floorMap.description || 'Loket pelayanan utama dapat diakses langsung dari jalur guiding block pintu masuk.'}
            </p>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-slate-400">pin_drop</span>
              <span>Posisi Loket: {data?.floorMap.counterLocation}</span>
            </div>
          </div>

          {/* SOP Pelayanan Disabilitas Internal */}
          {/* <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">menu_book</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  SOP &amp; Alur Layanan Internal
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">Verifikasi Resmi</span>
            </div>

            {data?.sopHighlights.map((sop, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{sop.serviceName}</span>
                  <button
                    onClick={() => handleReadAloud(`${sop.serviceName}. ${sop.flow.join('. ')}. ${sop.priorityNotice}`)}
                    className="text-[11px] text-blue-600 font-bold hover:underline"
                  >
                    Suarakan SOP
                  </button>
                </div>
                <div className="space-y-1">
                  {sop.flow.map((step, sIdx) => (
                    <p key={sIdx} className="text-xs text-slate-700 leading-snug">
                      {step}
                    </p>
                  ))}
                </div>
                <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 font-medium">
                  <strong>Catatan Hak Khusus:</strong> {sop.priorityNotice}
                </div>
              </div>
            ))}
          </div> */}

          {/* Penanggung Jawab Konter */}
          <div className="p-3 rounded-xl bg-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Petugas Pendamping: <strong>{data?.contactPerson || 'Staf Front Office'}</strong></span>
            <span className="text-[11px] text-blue-600 font-semibold">Terkoneksi</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-sm shadow-md active:scale-98 transition-transform"
        >
          Tutup Basis Data Institusi
        </button>
      </div>
    </div>
  );
};
