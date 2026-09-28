import React from 'react';
import { AppSettings, UserDisabilityProfile } from '../types';
import { USER_PROFILE } from '../data/mockData';
import { speechService } from '../services/speechService';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenProfile: () => void;
  onOpenVisionModal: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onOpenProfile,
  onOpenVisionModal,
}) => {
  const handleTestSpeech = () => {
    speechService.triggerHaptic(20);
    speechService.speak('Ini adalah pengujian suara asisten konter HearMe Voice untuk aksesibilitas disabilitas.', {
      rate: settings.speechRate,
      pitch: settings.speechPitch,
      volume: settings.counterVolume / 100,
      voiceName: settings.voice,
    });
  };

  const disabilityModes: { id: UserDisabilityProfile; label: string; desc: string; icon: string }[] = [
    {
      id: 'tunarungu',
      label: 'Tunarungu (Deaf/Hard-of-Hearing)',
      desc: 'Prioritas transkripsi teks raksasa, indikator visual equalizer & haptik.',
      icon: 'hearing_disabled',
    },
    {
      id: 'tunawicara',
      label: 'Tunawicara (Non-vocal / Speech Impaired)',
      desc: 'Prioritas generator jawaban prediktif cepat & konversi teks ke suara instan.',
      icon: 'record_voice_over',
    },
    {
      id: 'tunanetra',
      label: 'Tunanetra (Blind / Low Vision)',
      desc: 'Prioritas pembacaan audio narasi suara otomatis, kontras tinggi & OCR dokumen.',
      icon: 'visibility',
    },
    {
      id: 'multisensory',
      label: 'Multi-Sensori (Kombinasi)',
      desc: 'Mengaktifkan seluruh kapabilitas simultan (suara, teks, haptik, dan cermin kasir).',
      icon: 'diversity_3',
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-28 gap-5 max-w-md mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-[26px] font-extrabold text-[#141b2b] tracking-tight">Pengaturan HearMe</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Kustomisasi profil disabilitas, audio konter, dan fitur kecerdasan buatan.
        </p>
      </div>

      {/* User Profile Mini Banner */}
      <div
        onClick={onOpenProfile}
        className="flex items-center justify-between p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-blue-400 transition-colors"
      >
        <div className="flex items-center gap-3">
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/20"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-900">{USER_PROFILE.fullName}</h4>
            <p className="text-xs text-blue-700 font-semibold">{USER_PROFILE.assistMode}</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
      </div>

      {/* FOKUS PROFIL DISABILITAS (Tunarungu, Tunawicara, Tunanetra) */}
      <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-xs flex flex-col gap-3">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">Mode Fokus Aksesibilitas</h3>
          <p className="text-[11px] text-slate-500">Sesuaikan tata letak dan respon audio sesuai kebutuhan Anda</p>
        </div>

        <div className="space-y-2">
          {disabilityModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                onUpdateSettings({ disabilityFocus: mode.id });
                speechService.triggerHaptic(15);
              }}
              className={`w-full p-3 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                settings.disabilityFocus === mode.id
                  ? 'bg-blue-50/80 border-blue-600 text-blue-950 ring-2 ring-blue-600/20'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  settings.disabilityFocus === mode.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{mode.icon}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{mode.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{mode.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* HearMe Voice & Audio Output Settings */}
      <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[22px]">volume_up</span>
            <h3 className="text-sm font-bold text-slate-900">HearMe Voice (TTS) &amp; Speaker</h3>
          </div>
          <button
            onClick={handleTestSpeech}
            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold active:scale-95"
          >
            Uji Suara
          </button>
        </div>

        {/* Counter Speaker Volume Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">Volume Speaker Konter</span>
            <span className="text-blue-700 font-bold">{settings.counterVolume}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={settings.counterVolume}
            onChange={(e) => onUpdateSettings({ counterVolume: Number(e.target.value) })}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Speech Rate Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">Kecepatan Bicara (Speech Rate)</span>
            <span className="text-blue-700 font-bold">{settings.speechRate.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.4"
            step="0.1"
            value={settings.speechRate}
            onChange={(e) => onUpdateSettings({ speechRate: Number(e.target.value) })}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Fitur Masa Depan & Sensor Tunanetra */}
      <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-xs flex flex-col gap-3.5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <span className="material-symbols-outlined text-purple-600 text-[22px]">hub</span>
          <h3 className="text-sm font-bold text-slate-900">Fitur Aksesibilitas Lanjutan</h3>
        </div>

        {/* Auto Detect Language */}
        <div className="flex items-center justify-between">
          <div className="pr-4">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-900">Auto Detect Language</p>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-900">
                Soon
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Mendeteksi dan menerjemahkan bahasa lisan petugas secara otomatis (Indonesia/Inggris).
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.autoDetectLanguage}
            disabled
            // onChange={(e) => onUpdateSettings({ autoDetectLanguage: e.target.checked })}
            className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
          />
        </div>

        {/* Pembaca Dokumen & Vision Shortcut */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="pr-4">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-900">HearMe Vision &amp; Document Reader</p>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-900">
                Soon
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Membaca dan menganalisis teks kamera atau dokumen cetak secara menyeluruh.
            </p>
          </div>
          <button
            onClick={onOpenVisionModal}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs shrink-0"
          >
            Buka OCR
          </button>
        </div>

        {/* Screen Reader Voice Narration (Tunanetra) */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="pr-4">
            <p className="text-xs font-bold text-slate-900">Auto Narasi Suara (Tunanetra)</p>
            <p className="text-[11px] text-slate-500">
              Membacakan ringkasan instruksi petugas langsung secara audio saat hasil muncul.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.screenReaderVoice}
            disabled
            // onChange={(e) => onUpdateSettings({ screenReaderVoice: e.target.checked })}
            className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
          />
        </div>

        {/* Haptic Feedback */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="pr-4">
            <p className="text-xs font-bold text-slate-900">Getaran Haptik Taktil</p>
            <p className="text-[11px] text-slate-500">
              Memberikan getaran pada ponsel saat transkripsi kata selesai atau audio terkirim.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.hapticFeedback}
            onChange={(e) => onUpdateSettings({ hapticFeedback: e.target.checked })}
            className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* App Information */}
      <div className="p-4 rounded-2xl bg-slate-100/80 text-center text-xs text-slate-500">
        <p className="font-bold text-slate-700">HearMe Inclusive Ecosystem v2.5</p>
        <p className="text-[11px] mt-0.5">
          Memenuhi standar aksesibilitas inklusif disabilitas rungu, wicara, dan netra.
        </p>
      </div>
    </div>
  );
};
