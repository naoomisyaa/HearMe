import React, { useState } from 'react';
import { SAMPLE_OCR_DOCUMENTS } from '../data/mockData';
import { VisionDocumentResult } from '../types';
import { speechService } from '../services/speechService';

interface VisionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisionModal: React.FC<VisionModalProps> = ({ isOpen, onClose }) => {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_OCR_DOCUMENTS[0]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'document'>('camera');
  const [result, setResult] = useState<VisionDocumentResult | null>(null);
  const [isReadingAudio, setIsReadingAudio] = useState(false);

  if (!isOpen) return null;

  const handleScanSample = async (sample = selectedSample) => {
    setLoading(true);
    speechService.triggerHaptic(25);
    speechService.playChime(720, 150);

    try {
      const res = await fetch('/api/ai/vision-ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleType: sample.type }),
      });
      const data = await res.json();
      setResult(data);
      // Automatically read aloud for blind/tunanetra support
      handleSpeakAloud(data.audioNarration || data.readText);
    } catch {
      setResult({
        title: sample.name,
        institution: sample.institution,
        readText: 'Amoxicillin 500mg. Minum 3x sehari 1 tablet setelah makan.',
        importantWarnings: 'Wajib diminum teratur sampai habis.',
        audioNarration: 'Terdeteksi resep Amoksisilin 500 miligram, diminum tiga kali sehari setelah makan.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakAloud = (text: string) => {
    setIsReadingAudio(true);
    speechService.triggerHaptic(15);
    speechService.speak(text, {
      onEnd: () => setIsReadingAudio(false),
      onError: () => setIsReadingAudio(false),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-3 sm:p-4 text-white animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pt-safe pb-2 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
            <span className="material-symbols-outlined text-[22px]">visibility</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">HearMe Vision &amp; Document Reader</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Future Dev Preview
              </span>
            </div>
            <p className="text-[11px] text-white/60">
              Solusi Tunanetra &amp; Tunarungu membaca teks kamera dan dokumen cetak
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            speechService.speak('');
            onClose();
          }}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-90"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 gap-2 my-2">
        <button
          onClick={() => setActiveTab('camera')}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'camera'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white/10 text-white/70 hover:bg-white/15'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">photo_camera</span>
          HearMe Vision (Teks Kamera)
        </button>
        <button
          onClick={() => setActiveTab('document')}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'document'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white/10 text-white/70 hover:bg-white/15'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">document_scanner</span>
          Document Reader (Dokumen Cetak)
        </button>
      </div>

      {/* Viewport Simulation Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden rounded-3xl bg-slate-900 border border-white/15 p-4 my-1">
        {/* Reticle / Viewfinder Frame */}
        <div className="relative w-full max-w-xs aspect-[4/3] rounded-2xl border-2 border-dashed border-blue-400/50 flex flex-col items-center justify-center p-4 bg-black/40 overflow-hidden">
          {/* Laser Scanner Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse top-1/3" />

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-blue-400" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-blue-400" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-blue-400" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-blue-400" />

          <span className="material-symbols-outlined text-4xl text-blue-400 mb-2">
            {activeTab === 'camera' ? 'center_focus_strong' : 'description'}
          </span>
          <p className="text-xs font-bold text-center text-white/90">
            {activeTab === 'camera'
              ? 'Arahkan kamera ke papan nama, menu, atau label konter'
              : 'Pindai lembar resep obat dokter, karcis antrean, atau surat SOP'}
          </p>
          <span className="text-[10px] text-white/60 mt-1">
            Teknologi OCR Cepat + Screen-reader Suara Otomatis
          </span>
        </div>

        {/* Real-time OCR Audio Readout Panel */}
        {result && (
          <div className="w-full max-w-sm mt-3 p-3.5 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1.5">
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                {result.title}
              </span>
              <button
                onClick={() => handleSpeakAloud(result.audioNarration || result.readText)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
                  isReadingAudio
                    ? 'bg-emerald-600 text-white animate-pulse'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">volume_up</span>
                {isReadingAudio ? 'Membacakan...' : 'Baca Ulang Suara'}
              </button>
            </div>
            <p className="text-xs font-medium text-slate-800 leading-relaxed">
              "{result.readText}"
            </p>
            {result.importantWarnings && (
              <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-semibold">
                ⚠️ Catatan Penting: {result.importantWarnings}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sample Document Selector & Action Trigger */}
      <div className="space-y-2 pb-safe">
        <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">
          Pilih Sampel Dokumen / Label Nyata (Simulasi Cepat):
        </span>
        <div className="grid grid-cols-3 gap-2">
          {SAMPLE_OCR_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setSelectedSample(doc);
                handleScanSample(doc);
              }}
              className={`p-2.5 rounded-2xl text-left border transition-all active:scale-95 ${
                selectedSample.id === doc.id
                  ? 'bg-blue-600/30 border-blue-400 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              <span className="text-[10px] text-blue-300 font-bold block truncate">{doc.category}</span>
              <span className="text-xs font-bold text-white block truncate">{doc.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleScanSample()}
          disabled={loading}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">
            {loading ? 'hourglass_top' : 'photo_camera'}
          </span>
          {loading ? 'Memproses Citra dengan AI...' : 'Ambil Foto & Terjemahkan Teks'}
        </button>
      </div>
    </div>
  );
};
